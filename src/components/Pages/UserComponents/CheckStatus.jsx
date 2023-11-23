// CheckIssueStatus.js
import React, { useEffect } from 'react';
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
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useIssue, IssueProvider } from '../../../context/IssueContext';

const CheckIssueStatus = () => {
  const { user } = useAuth();
  const fullname = user?.email || '';
  const { userIssues, error, fetchUserIssues } = useIssue();

  useEffect(() => {
    fetchUserIssues(fullname);
  }, [fetchUserIssues, fullname]);

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
                        <RouterLink
                          to={`/Feedback?email=${fullname}&issueId=${issue.issueId}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <Button variant="contained" color="primary" style={btnstyle}>
                            Feedback Form
                          </Button>
                        </RouterLink>
                      ) : " not resolved"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
      {error && <Typography variant="body1" color="error">{error}</Typography>}
    </div>
  );
};

const CheckIssueStatusWithContext = () => {
  return (
    <IssueProvider>
      <CheckIssueStatus />
    </IssueProvider>
  );
};

export default CheckIssueStatusWithContext;
