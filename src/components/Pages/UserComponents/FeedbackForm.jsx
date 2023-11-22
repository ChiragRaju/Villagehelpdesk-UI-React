import React, { useState, useEffect } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const FeedbackForm = () => {
  const navigate = useNavigate();

  const [email, setUserId] = useState('');
  const [issueId, setIssueId] = useState('');
  const [status, setStatus] = useState('resolved');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userIdParam = searchParams.get('email');
  const issueIdParam = searchParams.get('issueId');

  useEffect(() => {
    if (userIdParam && issueIdParam) {
      setUserId(userIdParam);
      setIssueId(issueIdParam);
    }
  }, [userIdParam, issueIdParam]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the form is valid
    if (!e.target.checkValidity()) {
      // If the form is not valid, trigger form validation and return
      e.target.reportValidity();
      return;
    }

    // Prepare the feedback data
    const feedbackData = {
      email,
      issueId,
      status,
      phoneNumber,
      message,
    };

    try {
      // Make the API call to submit feedback
      const response = await fetch('http://localhost:8000/feedback/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Reset the form fields and show success message
      setStatus('');
      setPhoneNumber('');
      setMessage('');
      setErrors(null);

      // Use navigate properly
      navigate('/userdashboard');

      // For demonstration purposes, displaying a success message
      toast.success('Feedback submitted successfully');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setErrors('Error submitting feedback. Please try again.');
    }
  };

  const paperStyle = {
    padding: 20,
    height: '100vh',
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
            <AssignmentIcon />
          </Avatar>
          <h2>Submit Feedback</h2>
          <Typography variant="caption" gutterBottom>
            Provide feedback for Issues
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          {/* Use form element and onSubmit */}
          <TextField
            label="User ID"
            value={email}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            style={{ marginTop: 20 + 'px', marginBottom: 10 + 'px' }}
            label="Issue ID"
            value={issueId}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              label="Status"
              labelId="status-label"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="resolved">Resolved</MenuItem>
            </Select>
          </FormControl>
          <TextField
            style={{ marginTop: 20 + 'px', marginBottom: 10 + 'px' }}
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            required
          />
          <TextField
            style={{ marginTop: 20 + 'px', marginBottom: 10 + 'px' }}
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            multiline
            rows={1}
            fullWidth
            required
          />
          {errors && <div>{errors}</div>}
          <Button type="submit" color="primary" variant="contained" style={btnstyle} fullWidth>
            Submit Feedback
          </Button>
        </form>
      </Paper>
      <ToastContainer />
    </Grid>
  );
};

export default FeedbackForm;
