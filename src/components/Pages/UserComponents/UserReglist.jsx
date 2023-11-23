import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { tableCellClasses } from '@mui/material/TableCell';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Button } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const UserReglist = () => {
  const url = "http://localhost:8000/api/auth/users";
  const [userData, setUserData] = useState([]);

  // Function for fetching data
  const fetchInfo = () => {
    return axios.get(url)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div>
       <div style={{marginBottom:"10px",marginTop:"10px"}}>
      <Link to='/AdminDashboard'>
      <Button  variant="contained" color="primary">Back</Button>
      </Link>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <StyledTableCell />
              <StyledTableCell>Firstname</StyledTableCell>
              <StyledTableCell>Lastname</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>City</StyledTableCell>
              <StyledTableCell>Pincode</StyledTableCell>
              <StyledTableCell>State</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map(user => (
              <StyledTableRow key={user.id}>
                <StyledTableCell />
                <StyledTableCell>{user.firstName}</StyledTableCell>
                <StyledTableCell>{user.lastName}</StyledTableCell>
                <StyledTableCell>{user.phoneNumber}</StyledTableCell>
                <StyledTableCell>{user.city}</StyledTableCell>
                <StyledTableCell>{user.pincode}</StyledTableCell>
                <StyledTableCell>{user.state}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserReglist;
