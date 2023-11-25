import React, { useState, useEffect } from "react";
import axios from "axios";
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

import { useNavigate } from "react-router-dom";

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function IssueList() {
  const [issues, setIssues] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const navigate = useNavigate();

  const url = "https://villagehelpdeskapi.onrender.com/api/issues/allissues";

  const fetchInfo = () => {
    return axios
      .get(url)
      .then((res) => {
        setIssues(res.data);
        setImages(res.data[0].image);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleSendNotification = (issue) => {
    // Set the selected issue when the button is clicked
    setSelectedIssue(issue);
  };

  const handleNavigateToSendNotification = (userId, issueId) => {
    // Navigate to NotificationSenderComponent with userId and issueId
    navigate(`/send-notifications?userId=${userId}&issueId=${issueId}`);
  };

  return (
    <div>
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
            <TableRow>
              <StyledTableCell>UserId</StyledTableCell>
              <StyledTableCell>IssueId</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>State</StyledTableCell>
              <StyledTableCell>City</StyledTableCell>
              <StyledTableCell>Road</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Update Status</StyledTableCell>
              <StyledTableCell>Notification</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issues
              .sort((a, b) => {
                // Custom sorting function to put "resolved" status at the end
                if (a.status === "resolved" && b.status !== "resolved") {
                  return 1;
                } else if (a.status !== "resolved" && b.status === "resolved") {
                  return -1;
                } else {
                  return 0;
                }
              })
              .map((issue) => (
                <StyledTableRow key={issue.id}>
                  <StyledTableCell>{issue.userId}</StyledTableCell>
                  <StyledTableCell>{issue.id}</StyledTableCell>
                  <StyledTableCell>{issue.description}</StyledTableCell>
                  <StyledTableCell>
                    <a
                      href={`https://villagehelpdeskapi.onrender.com/${issue.image}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={`https://villagehelpdeskapi.onrender.com/${issue.image}`}
                        alt="Not uploaded"
                        width="20"
                        height="20"
                      />
                    </a>
                  </StyledTableCell>
                  <StyledTableCell>{issue.state}</StyledTableCell>
                  <StyledTableCell>{issue.city}</StyledTableCell>
                  <StyledTableCell>{issue.suburb}</StyledTableCell>
                  <StyledTableCell>{issue.display_name}</StyledTableCell>
                  <StyledTableCell>{issue.status}</StyledTableCell>
                  <StyledTableCell>
                    <Link
                      to={`/update-status?userId=${issue.userId}&issueId=${issue.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="contained" color="primary">
                        Update Status
                      </Button>
                    </Link>
                  </StyledTableCell>
                  {/* <TableCell>
                  <Link
                    to={`/notification-sender?userId=${issue.userId}&issueId=${issue.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button variant="contained" color="primary">
                     Send Notification
                    </Button>
                  </Link>
                 
                </TableCell> */}
                  <TableCell>
                    {/* Render button only if the status is resolved */}
                    {issue.status === "resolved" ? (
                      <Link
                        to={`/send-notifications?userId=${issue.userId}&issueId=${issue.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            handleSendNotification(issue.userId, issue.id)
                          }
                        >
                          Send Notification
                        </Button>
                      </Link>
                    ) : (
                      "Not Solved"
                    )}
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default IssueList;
