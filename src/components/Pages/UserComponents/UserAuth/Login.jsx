import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';
import './Login.css';
import { useNavigate } from 'react-router-dom'; 

import { useAuth } from '../../../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate(); 

  const {login,loading}=useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    // Use a regular expression for basic email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password,
      });
      if (response.status === 200) {
        const token = response.data.token;
        login(token);
        toast.success('Login successful');

        setTimeout(() => {
          navigate('/userdashboard');
        }, 2000);
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      toast.error('Invalid credentials', {
        position: 'top-right',
      });
      setError('An error occurred');
      console.error(error);
    }
  };
  

 
  const btnstyle = {
    margin: '8px 0',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#168d63',
    },
  };

  return (
    <Grid>
      <form onSubmit={handleSubmit}>
      <Paper elevation={19} className="paper-container">
  <Grid align='center'>
    <Avatar className="avatar-container">
      <LockIcon />
    </Avatar>
    <h2>Sign In</h2>
    <Typography variant='caption' gutterBottom>
      User Email is Your UserName
    </Typography>
  </Grid>
          <TextField
            label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            fullWidth
            required
            style={{ margin: '10px 0' }}
            InputProps={{
            className: 'input-field', // Add a class for custom styling
            }}
          />
          <TextField
            style={{ margin: '10px 0' }}
            label='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Password'
            type={showPassword ? 'text' : 'password'}
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              className: 'input-field', // Add a class for custom styling
            }}
          />
          {error && <div className="error-message">{error}</div>}
          <Button
            type='submit'
            color='primary'
            variant='contained'
            style={btnstyle}
            fullWidth
          >
            Sign in
          </Button>
          <Typography >
                     <Link href="/forgot-password" >
                        Forgot password ?
                     </Link>
                </Typography>
          <Typography>
            {' '}
            Do you have an account ?
            <Link href='/UserRegistration'>Sign Up </Link>
          </Typography>
          <ToastContainer />
        </Paper>
      </form>
    </Grid>
  );
};

export default Login;
