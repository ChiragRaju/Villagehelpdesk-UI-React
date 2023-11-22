import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  IconButton
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const paperStyle = { padding: '30px 20px', width: '30vw', margin: '20px auto' };
const avatarStyle = { backgroundColor: '#1bbd7e' };
const marginBottom = { marginBottom: 20 };

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/auth/reset-password', {
        email,
        otp,
        newPassword,
      });

      setMessage(response.data.message);

      // If the OTP is correct and passwords match, navigate to the login page
      if (response.status === 200) {
       toast.success("Password Reset Successful");
       setInterval(()=>{ navigate('/Login')},1000);
       
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred.');
    }
  };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Reset Password</h2>
          <Typography variant='caption' gutterBottom>
            Enter the OTP sent to your email and set a new password
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            style={marginBottom}
            fullWidth
            label='Email'
            placeholder='Enter your Email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            style={marginBottom}
            fullWidth
            label='OTP'
            placeholder='Enter your OTP'
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
           <TextField
            style={marginBottom}
            fullWidth
            label='New Password'
            placeholder='Enter your new password'
            type={showNewPassword ? 'text' : 'password'}
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownNewPassword}
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            style={marginBottom}
            fullWidth
            label='Confirm Password'
            placeholder='Confirm your new password'
            type={showConfirmPassword ? 'text' : 'password'}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type='submit' variant='contained' color='primary'>
            Update Password
          </Button>

          {message && (
            <Typography variant='body2' style={{ marginTop: 10 }}>
              {message}
            </Typography>
          )}

          {/* Display a message for incorrect OTP entries */}
          {message.includes('Invalid') && (
            <Typography variant='body2' style={{ marginTop: 10, color: 'red' }}>
              Please enter the correct OTP.
            </Typography>
          )}
        </form>
      </Paper>
      <ToastContainer/>
    </Grid>
  );
};

export default ResetPassword;
