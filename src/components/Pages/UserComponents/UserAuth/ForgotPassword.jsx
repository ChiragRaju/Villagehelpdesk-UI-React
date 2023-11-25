import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const paperStyle = {
  padding: "30px 20px",
  width: 30 + "vw",
  margin: "20px auto",
};
const avatarStyle = { backgroundColor: "#1bbd7e" };

const marginBottom = { marginBottom: 20 };

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://villagehelpdeskapi.onrender.com/api/auth/forgot-password",
        {
          email,
        }
      );
      localStorage.setItem("email", email);

      setMessage(response.data.message);
      console.log(response);

      // Redirect to the reset password page if the email is valid
      if (response.status === 200) {
        <div>Otp Sent</div>;
        setInterval(() => {
          navigate("/reset-password");
        }, 2000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred.";

      if (errorMessage.includes("not found")) {
        setMessage(errorMessage);
        // Redirect to the home page
        setInterval(() => {
          navigate("/");
        }, 2000);
      }
    }
  };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <MailOutlineIcon />
          </Avatar>
          <h2>Forgot Password</h2>
          <Typography variant="caption" gutterBottom>
            Enter your email to receive a password reset link
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            style={marginBottom}
            fullWidth
            label="Email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit" variant="contained" color="primary">
            Send Reset Link
          </Button>

          {message && (
            <Typography variant="body2" style={{ marginTop: 10 }}>
              {message}
            </Typography>
          )}

          {/* Display a message for incorrect email entries */}
          {message.includes("valid") && (
            <Typography variant="body2" style={{ marginTop: 10, color: "red" }}>
              Please provide a valid email address.
            </Typography>
          )}
        </form>
      </Paper>
    </Grid>
  );
};

export default ForgotPassword;
