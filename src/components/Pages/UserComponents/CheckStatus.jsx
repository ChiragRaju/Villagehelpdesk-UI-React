import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import { useAuth } from '../../../context/AuthContext';

const CheckIssueStatus = () => {
  const { user } = useAuth();
  const fullname = user?.email || '';
  const [userIssues, setUserIssues] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleCheckStatus();
  }, []);

  const handleCheckStatus = () => {
    if (!fullname) {
      setError('User ID is required.');
      return;
    }

    // Fetch issue details when the user clicks the check status button
    fetch(`http://localhost:8000/api/issues/check-issue-status/${fullname}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setUserIssues([]);
        } else {
          setUserIssues(data.userIssues);
          setError(null);
        }
      })
      .catch((error) => {
        console.error('Error fetching issue details:', error);
        setError('User not found. Error fetching issue details.');
        setUserIssues([]);
      });
  };

  const btnstyle = { margin: '8px 0' };

  return (
    <div>
      <div style={{ marginBottom: '10px', marginTop: '10px' }}>
        <Link to='/userdashboard'>
          <Button variant="contained" color="primary">Back</Button>
        </Link>
      </div>
      {userIssues.length === 0 ? (
        <Typography variant="h6">No Issues Found. You have not raised any issues.</Typography>
      ) : (
        <Grid>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>IssueID</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Created Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Feedback Form</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userIssues.map((issue) => (
                  <TableRow key={issue.issueId}>
                    <TableCell />
                    <TableCell>{issue.issueId}</TableCell>
                    <TableCell>{issue.description}</TableCell>
                    <TableCell>{issue.createdDate}</TableCell>
                    <TableCell>{issue.status}</TableCell>
                    <TableCell>
                      {issue.status === 'resolved' ? (
                        <Link
                          to={`/Feedback?email=${fullname}&issueId=${issue.issueId}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <Button variant="contained" color="primary" style={btnstyle}>
                            Feedback Form
                          </Button>
                        </Link>
                      ) : " not resolved"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </div>
  );
};

export default CheckIssueStatus;
