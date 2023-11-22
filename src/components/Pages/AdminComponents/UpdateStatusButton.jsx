import React, { useState, useEffect } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import LockIcon from '@mui/icons-material/Lock';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateStatusButton = () => {
  const [userId, setUserId] = useState('');
  const [issueId, setIssueId] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [updateStatusMessage, setUpdateStatusMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userIdParam = searchParams.get('userId');
  const issueIdParam = searchParams.get('issueId');

  useEffect(() => {
    if (userIdParam && issueIdParam) {
      setUserId(userIdParam);
      setIssueId(issueIdParam);
    }
  }, [userIdParam, issueIdParam]);

  const handleUpdateStatus = () => {
    const apiUrl = `http://localhost:8000/api/issues/update-issue-status/${userId}/${issueId}`;

    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newStatus }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUpdateStatusMessage(data.message);
        setNewStatus(data.status);
        toast.success(' Status Updated successfully');
        setInterval(() => {
         navigate ('/AdminDashboard');
        }, 1000);
        setError(null);
      })
      .catch((err) => {
        setError('Error updating status. Please try again.');
        setUpdateStatusMessage(null);
      });
  };

  const paperStyle = {
    padding: 20,
    height: '80vh',
    width: '25vw',
    margin: '20px auto',
    marginTop: '50px',
  };

  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnstyle = { margin: '8px 0' };

  return (
    <Grid>
      <Paper elevation={19} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockIcon />
          </Avatar>
          <h2>Update Status</h2>
          <Typography variant="caption" gutterBottom>
            Update Status for Issues
          </Typography>
        </Grid>
        <TextField
         
          label="UserId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User Id"
          fullWidth
          required
          InputProps={{ readOnly: true}}
        
        />
        <TextField
          style={{ marginTop: 20 + 'px', marginBottom: 10 + 'px' }}
          label="Issue ID"
          value={issueId}
          onChange={(e) => setIssueId(e.target.value)}
          placeholder="Enter Issue Id"
          fullWidth
          InputProps={{ readOnly: true}}
         
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select label="status" labelId="demo-simple-select-label" value={newStatus} onChange={(e) => setNewStatus(e.target.value)} fullWidth>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
          </Select>
        </FormControl>  
        {error && <div>{error}</div>}
        <Button type="submit" onClick={handleUpdateStatus} color="primary" variant="contained" style={btnstyle} fullWidth>
          Update Status
        </Button>
      </Paper>
      <ToastContainer />
    </Grid>
  );
};

export default UpdateStatusButton;
