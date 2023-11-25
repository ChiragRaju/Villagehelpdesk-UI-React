import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const UserSignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",

    pincode: "",
    state: "",
    city: "",
  });
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // const validateAadhar = (aadhar) => {
  //   const aadharRegex =/^\d{4}-\d{4}-\d{4}$/;
  //   return aadharRegex.test(aadhar);
  // };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    // Check for required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "phoneNumber",
      "pincode",
      "state",
      "city",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`${field} is required`);
        return;
      }
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      toast.error("Invalid email format");
      return;
    }

    // Validate Aadhar number format
    // if (!validateAadhar(formData.aadharCard)) {
    //   toast.error('Invalid Aadhar number format');
    //   return;
    // }

    // Validate password length
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await fetch(
        "https://villagehelpdeskapi.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 201) {
        console.log("User signed up successfully");
        toast.success("User signed up successfully");
        setTimeout(() => {
          navigate("/Login");
        }, 2000); // Navigate to the login page
      } else if (response.status === 400) {
        toast.error("Fields required");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      toast.error("An error occurred", {
        position: "top-right",
      });
      setError("An error occurred");
      console.error(error);
    }
  };

  const paperStyle = {
    padding: "30px 20px",
    width: 30 + "vw",
    margin: "20px auto",
  };

  return (
    <Grid container justifyContent="center">
      <Paper elevation={20} sx={paperStyle}>
        <Grid align="center">
          <Avatar style={{ backgroundColor: "#1bbd7e" }}>
            <AddCircleOutlineIcon />
          </Avatar>
          <Typography variant="h4">Sign Up</Typography>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account!
          </Typography>
        </Grid>

        <form onSubmit={handleSignUp}>
          <TextField
            fullWidth
            label="First Name"
            placeholder="Enter your first name"
            name="firstName"
            onChange={handleFormChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Last Name"
            placeholder="Enter your last name"
            name="lastName"
            onChange={handleFormChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            placeholder="Enter your email"
            name="email"
            onChange={handleFormChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Phone Number"
            placeholder="Enter your phone number"
            name="phoneNumber"
            onChange={handleFormChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            name="password"
            onChange={handleFormChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ marginBottom: 2 }}
          />
          {/* <TextField
          fullWidth
          label="Aadhar Number"
          placeholder="XXXX-XXXX-XXXX"
          name="aadharCard"
          onChange={handleFormChange}
          sx={{ marginBottom: 2 }}
        /> */}
          <TextField
            fullWidth
            label="Pincode"
            placeholder="Enter your Pincode"
            name="pincode"
            onChange={handleFormChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="State"
            placeholder="Enter your state"
            name="state"
            onChange={handleFormChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="City"
            placeholder="Enter your city"
            name="city"
            onChange={handleFormChange}
            sx={{ marginBottom: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Sign up
          </Button>
        </form>
      </Paper>
      <ToastContainer />
    </Grid>
  );
};

export default UserSignUp;
