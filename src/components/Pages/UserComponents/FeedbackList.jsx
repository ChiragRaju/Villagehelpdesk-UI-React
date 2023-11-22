import * as React from 'react';
import { useState,useEffect } from 'react';

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
import {  createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import  { tableCellClasses } from '@mui/material/TableCell';



import axios from 'axios';





//testing purpose

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


export default function FeedbackList() {
  const [bg, setBg] = useState("dark");

  const darkTheme = createTheme({
      palette: {
          mode:bg,
      },
  });

 const url="http://localhost:8000/feedback/get-feedback";
 const [userData,setuserData]=useState([]);
//FUNCTION FOR FECTHING DATA
const fetchInfo=()=>{
  return axios.get(url)
  .then((res) => {
    setuserData(res.data)
    // console.log(res.data)
   console.log(userData)
  })

};
useEffect(()=>{
  fetchInfo();
},[]);

  return (
    <>
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
              <StyledTableCell>Email Id</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>PhoneNumber</StyledTableCell>
              <StyledTableCell>Message</StyledTableCell>
              <StyledTableCell>IssueId</StyledTableCell>
         
          </TableRow>
        </TableHead>
        <TableBody>
         
          
        {   userData.map((user,index)=>{
              return(
                <>
                 <StyledTableRow key={index}>
                 <StyledTableCell />
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.status}</StyledTableCell>
                <StyledTableCell>{user.phoneNumber}</StyledTableCell>
                <StyledTableCell>{user.message}</StyledTableCell>
                <StyledTableCell>{user.issueId}</StyledTableCell>
         
                </StyledTableRow>
                </>
               
              )
            })
}
          
        </TableBody>
      </Table>
      
    </TableContainer>
    
   
    </>
  );
}