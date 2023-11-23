// FeedbackList.js
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { useFeedback } from '../../../context/FeedbackContext';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  /* your styles here */
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  /* your styles here */
}));

const FeedbackList = () => {
  const { userData } = useFeedback();

  return (
    <>
      <div style={{ marginBottom: '10px', marginTop: '10px' }}>
        <Link to='/AdminDashboard'>
          <Button variant="contained" color="primary">
            Back
          </Button>
        </Link>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <StyledTableCell />
              <StyledTableCell>Email Id</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>PhoneNumber</StyledTableCell>
              <StyledTableCell>Message</StyledTableCell>
              <StyledTableCell>IssueId</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell />
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.status}</StyledTableCell>
                <StyledTableCell>{user.phoneNumber}</StyledTableCell>
                <StyledTableCell>{user.message}</StyledTableCell>
                <StyledTableCell>{user.issueId}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default FeedbackList;
