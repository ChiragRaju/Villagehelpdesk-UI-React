// NotificationSenderComponent.jsx
import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";

const NotificationSenderComponent = ({ onSendNotification }) => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [issueId, setIssueId] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  // Use the useLocation hook to get parameters from the URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userIdParam = searchParams.get("userId");
  const issueIdParam = searchParams.get("issueId");

  useEffect(() => {
    // Set the state with parameters from the URL
    setUserId(userIdParam);
    setIssueId(issueIdParam);
  }, [userIdParam, issueIdParam]);

  const handleSendNotification = async () => {
    try {
      setLoading(true);

      // Validate that userId and issueId are not empty before sending
      if (!userId || !issueId) {
        console.error("User ID and Issue ID are required");
        return;
      }

      // Fetch latitude and longitude based on userId and issueId
      const issuesResponse = await axios.get(
        "https://villagehelpdeskapi.onrender.com/api/issues/allissues"
      );
      const issues = issuesResponse.data;

      // Find the issue with the matching userId and issueId
      const selectedIssue = issues.find(
        (issue) => issue.userId === userId && issue.id === issueId
      );

      if (!selectedIssue) {
        console.error("Issue not found for the provided User ID and Issue ID");
        return;
      }

      // Use latitude and longitude from the selected issue to send the notification
      const { latitude, longitude } = selectedIssue;

      // Filter issues within 1km radius
      const filteredLocations = issues.filter((issue) => {
        const distance = calculateDistance(
          latitude,
          longitude,
          issue.latitude,
          issue.longitude
        );

        // Assuming 1km radius
        return distance <= 1;
      });

      if (filteredLocations.length === 0) {
        console.log("Users not found in 1km radius");
        setNotificationMessage("Users not found in 1km radius");
        return;
      }

      // Send a request to the notification endpoint with latitude and longitude
      await axios.get(
        `https://villagehelpdeskapi.onrender.com/locations/sendNotifications?latitude=${latitude}&longitude=${longitude}`
      );

      console.log("Notification sent successfully");
      setNotificationMessage("Notification sent successfully");
    } catch (error) {
      console.error("Error sending notification:", error);
      setNotificationMessage("Error sending notification. Please try again.");
    } finally {
      setLoading(false);
      // If a callback function is provided, invoke it with the selected issue
      if (onSendNotification) {
        onSendNotification({ userId, issueId });
      }
    }
  };

  const paperStyle = {
    padding: 20,
    height: "auto",
    width: "300px",
    margin: "20px auto",
  };

  const inputStyle = {
    width: "100%",
    margin: "10px 0",
  };

  const buttonStyle = {
    marginTop: "20px",
  };

  return (
    <Grid container justifyContent="center">
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h5" gutterBottom>
          Notification Sender
        </Typography>
        <TextField
          style={inputStyle}
          label="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          variant="outlined"
          InputProps={{ readOnly: true }}
        />
        <TextField
          style={inputStyle}
          label="Issue ID"
          value={issueId}
          onChange={(e) => setIssueId(e.target.value)}
          variant="outlined"
          InputProps={{ readOnly: true }}
        />
        {notificationMessage && (
          <Typography color="error" variant="caption" gutterBottom>
            {notificationMessage}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendNotification}
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? "Sending..." : "Send Notification"}
        </Button>
      </Paper>
    </Grid>
  );
};

export default NotificationSenderComponent;

// Add this utility function at the bottom or in a separate utility file

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};
