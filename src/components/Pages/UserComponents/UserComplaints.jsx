import React, { useState, useEffect } from "react";
import { Grid, Paper, Avatar, TextField, Button, Link } from "@mui/material";
import { green } from "@mui/material/colors";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const UserComplaints = () => {
  const navigate = useNavigate();

  const fullname = jwtDecode(localStorage.getItem("authToken")).email;

  console.log(fullname);
  const [userId, setEmail] = useState(fullname);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [issues, setIssues] = useState([]);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // const handleUserEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const fetchIssues = async () => {
    try {
      const response = await fetch("/api/issues");
      if (response.ok) {
        const data = await response.json();
        setIssues(data);
      } else {
        console.error("Failed to fetch issues");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const diffToast = () => {
    toast.success("Issue Raised redirecting to userdashboard", {
      position: "top-right",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if ("geolocation" in navigator) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        fetch(url)
          .then((res) => res.json())
          .then(async (data) => {
            // Wrap the .then() block in an async function
            const { city, state, suburb, postcode } = data.address;
            const { display_name } = data;
            console.log(display_name);

            const formData = new FormData();

            formData.append("userId", userId);
            formData.append("description", description);
            formData.append("image", image);
            formData.append("latitude", latitude);
            formData.append("longitude", longitude);
            formData.append("city", city);
            formData.append("state", state);
            formData.append("suburb", suburb);
            formData.append("display_name", display_name);
            formData.append("postcode", postcode);

            const response = await fetch(
              "https://villagehelpdeskapi.onrender.com/api/issues/report-issue",
              {
                method: "POST",
                body: formData,
              }
            );

            if (response.ok) {
              const responseData = await response.text();
              console.log(responseData);
              diffToast();
              setTimeout(() => {
                navigate("/userdashboard");
              }, 1000);
            } else {
              console.error(
                "Failed to report issue:",
                response.status,
                response.statusText
              );
              alert("Issue reporting failed");
            }
          });
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong");
      }
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const paperStyle = {
    padding: 20,
    height: "80vh",
    width: "25vw",
    margin: "20px auto",
    marginTop: "50px",
    border: "1px solid black",
  };

  const btnstyle = { margin: "8px 0" };

  return (
    <div>
      <Grid>
        <form onSubmit={handleSubmit}>
          <Paper elevation={19} style={paperStyle} className="container">
            <Grid align="center">
              <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                <AssignmentIcon />
              </Avatar>
              <h2>Issue Raising</h2>
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                style={{ marginBottom: '10px' }}
                label='UserId'
                multiline
                // rows={4}
                placeholder='Type UserName'
                variant='outlined'
                fullWidth
                required
                value={userId}
                onChange={handleUserEmailChange}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                style={{ marginBottom: "20px" }}
                label="Issue"
                multiline
                rows={3}
                placeholder="Type your message here"
                variant="outlined"
                fullWidth
                required
                value={description}
                onChange={handleDescriptionChange}
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="image" className="form-label">
                Upload Image
              </label>
              <input
                type="file"
                id="images"
                className="form-control"
                name="images"
                style={{ marginBottom: "20px" }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </Grid>

            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
            >
              Submit with Location
            </Button>

            <ToastContainer />
          </Paper>
        </form>
        <ul>
          {issues.map((issue, index) => (
            <li key={index}>
              <p>{issue.description}</p>
              <img src={`/${issue.image}`} alt={`Issue ${index}`} />
            </li>
          ))}
        </ul>
      </Grid>
    </div>
  );
};
