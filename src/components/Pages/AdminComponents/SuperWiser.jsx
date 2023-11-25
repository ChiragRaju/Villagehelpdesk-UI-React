import React, { useState } from "react";
import { Grid, Paper, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SupervisorForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const handleSupervisorCreation = async () => {
    try {
      // Basic validation
      if (!name || !email || !phone || !address || !role) {
        toast.error("Please fill in all fields");
        return;
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Invalid email format");
        return;
      }

      const response = await axios.post(
        "https://villagehelpdeskapi.onrender.com/supervisors",
        {
          name,
          email,
          phone,
          address,
          role,
        }
      );

      if (response.status === 201) {
        toast.success("Supervisor created successfully");
        // Reset form fields after successful creation
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setRole("");
        // Navigate after a delay to give time for the success message
        setTimeout(() => {
          navigate("/AdminDashboard");
        }, 1000);
      } else {
        toast.error("Failed to create supervisor");
      }
    } catch (error) {
      toast.error("Error creating supervisor");
      console.error(error);
    }
  };

  const paperStyle = {
    padding: 20,
    height: "90vh",
    width: "25vw",
    margin: "20px auto",
    marginTop: "50px",
    transition: "box-shadow 0.3s, transform 0.3s",
    "&:hover": {
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      transform: "scale(1.02)",
    },
  };

  const btnstyle = {
    margin: "8px 0",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#168d63",
    },
  };

  return (
    <Grid>
      <Paper elevation={19} style={paperStyle}>
        <Grid align="center">
          <h2>Create Supervisor</h2>
        </Grid>
        <form>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter supervisor name"
            fullWidth
            required
            style={{ margin: "10px 0" }}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter supervisor email"
            fullWidth
            required
            style={{ margin: "10px 0" }}
          />
          <TextField
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter supervisor phone"
            fullWidth
            required
            style={{ margin: "10px 0" }}
          />
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter supervisor address"
            fullWidth
            required
            style={{ margin: "10px 0" }}
          />
          <TextField
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter supervisor role"
            fullWidth
            required
            style={{ margin: "10px 0" }}
          />
          <Button
            type="button"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={handleSupervisorCreation}
          >
            Create Supervisor
          </Button>
        </form>
      </Paper>
      <ToastContainer />
    </Grid>
  );
};

export default SupervisorForm;
