import { useState,useEffect} from 'react';
import axios from 'axios';
import Sidenav from './Sidenav';
import Stack from '@mui/joy/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Fab from '@mui/material/Fab';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Chart from './MyChart';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import SuperWiserList from './SuperWiserList';
import UserReglist from '../UserComponents/UserReglist';
import FeedbackList from '../UserComponents/FeedbackList';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
   
 
  } from '@mui/material';
 
  import { styled } from '@mui/material/styles';
  import  { tableCellClasses } from '@mui/material/TableCell';
  
  
  

  
  
  
  
  
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
  

const AdminDashboard = () => {
    const [bg, setBg] = useState("dark");

    const darkTheme = createTheme({
        palette: {
            mode: bg,
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
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Box sx={{ display: "flex" }}>
                    <Sidenav />
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Stack direction="row" spacing={2}>
                                    <Card
                                        sx={{
                                            maxWidth: "49%",
                                            height: 150,
                                            transition: "transform 0.3s",
                                            "&:hover": {
                                                transform: "scale(1.05)",
                                            },
                                        }}
                                    >
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Complaints
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    All new Complaints will be here in this section
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Link to='/ComplaintsList' style={{ textDecoration: 'none' }}>
                                                <Button size="small" color="primary">
                                                    Go To New Complaints
                                                </Button>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                    <Card
                                        sx={{
                                            maxWidth: "49%",
                                            height: 150,
                                            transition: "transform 0.3s",
                                            "&:hover": {
                                                transform: "scale(1.05)",
                                            },
                                        }}
                                    >
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Supervisers
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                   Adding Supervisers list to solve the problem
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Link to='/superwiser' style={{ textDecoration: 'none' }}>
                                                <Button size="small" color="primary">
                                                   Add Supervisers
                                                </Button>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                </Stack>
                            </Grid>
                            <Grid item xs={4}>
                                <Stack spacing={2}>
                                    <Card
                                        sx={{
                                            maxWidth: 345,
                                            transition: "transform 0.3s",
                                            "&:hover": {
                                                transform: "scale(1.05)",
                                            },
                                        }}
                                    >
                                        <CardActionArea>
                                            <Link to='/SuperwiserList' style={{ textDecoration: 'none' }}>
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        Superviser
                                                    </Typography>
                                                </CardContent>
                                            </Link>
                                        </CardActionArea>
                                    </Card>
                                    <Card
                                        sx={{
                                            maxWidth: 345,
                                            transition: "transform 0.3s",
                                            "&:hover": {
                                                transform: "scale(1.05)",
                                            },
                                        }}
                                    >
                                        <CardActionArea>
                                            <Link to='/issuelist' style={{ textDecoration: 'none' }}>
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        Issue Listing
                                                    </Typography>
                                                </CardContent>
                                            </Link>
                                        </CardActionArea>
                                    </Card>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Box height={0} />
                        <Grid container spacing={4}>
                            <Grid item xs={8}>
                                <Card
                                    sx={{
                                        height: "70vh",
                                        transition: "transform 0.3s",
                                        "&:hover": {
                                            transform: "scale(1.05)",
                                        },
                                    }}
                                >
                                    <CardContent>
                                        Feedback List
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
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card
                                    sx={{
                                        maxWidth: 345,
                                        height: "60vh",
                                        marginTop:"40px",
                                        transition: "transform 0.3s",
                                        "&:hover": {
                                            transform: "scale(1.05)",
                                           
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Chart />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Fab size="small" color="secondary" aria-label="add" >
                            <Brightness4Icon onClick={() => setBg(bg === "light" ? "dark" : "light")} />
                        </Fab>
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    );
};

export default AdminDashboard;
