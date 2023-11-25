import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

import axios from "axios";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function SuperWiserList() {
  const [bg, setBg] = useState("dark");

  const url = "https://villagehelpdeskapi.onrender.com/supervisors";
  const [userData, setUserData] = useState([]);

  // FUNCTION FOR FETCHING DATA
  const fetchInfo = () => {
    return axios
      .get(url)
      .then((res) => {
        setUserData(res.data);
        console.log(userData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <>
      <div style={{ marginBottom: "10px", marginTop: "10px" }}>
        <Link to="/AdminDashboard">
          <Button variant="contained" color="primary">
            Back
          </Button>
        </Link>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell />
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Phone</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="right">Role</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {userData.map((user, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell />
                <StyledTableCell>{user.name}</StyledTableCell>
                <StyledTableCell align="right">{user.email}</StyledTableCell>
                <StyledTableCell align="right">{user.phone}</StyledTableCell>
                <StyledTableCell align="right">{user.address}</StyledTableCell>
                <StyledTableCell align="right">{user.role}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
