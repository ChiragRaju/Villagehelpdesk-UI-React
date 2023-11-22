import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';
// import loginPage from '../../../../assets/loginPage.jpg';
import { useNavigate } from 'react-router-dom';
import "./Admin.css"
import { useAuth } from '../../../../context/AuthContext';



function AdminLogin() {
  const navigate = useNavigate(); 
  

  const {Adminlogin,loading}=useAuth();
  const [email, setPhonenumber] = useState('');
  const [password, setAadharnumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  

 /**
  * @param {}
  * @returns 
  */

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/admin/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        Adminlogin(token);
        toast.success('Successfully logged in');
        // Redirect to AdminDashboard page
        setInterval(() => {
          navigate('/AdminDashboard');
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

  
  
  const paperStyle = { padding: '30px 20px', width: 30 + 'vw', margin: '20px auto'};
  // const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: '#1bbd7e' };


  const marginBottom = { marginBottom: 20 };
  return (
    <div className='login-container'>
    <Grid >
      <Paper elevation={20} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}>
            <AddCircleOutlineIcon />
          </Avatar>
          <h2>Admin Login</h2>
          <Typography variant='caption' gutterBottom>
            Only Admin Should Login
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            style={marginBottom}
            fullWidth
            label='Email'
            placeholder='Enter your Email'
            onChange={(e) => setPhonenumber(e.target.value)}
            required
          />
          <TextField
            style={marginBottom}
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label='Password'
            placeholder='Enter your password'
            onChange={(e) => setAadharnumber(e.target.value)}
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
            }}
          />

          <Button type='submit' variant='contained' color='primary'>
            Login
          </Button>
        </form>
      </Paper>
      <ToastContainer />
    </Grid>
    </div>
  );
}

export default AdminLogin;
