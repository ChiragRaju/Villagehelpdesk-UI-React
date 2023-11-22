// ComplaintList.js

import React, { useState, useEffect } from 'react';
import Stack from '@mui/joy/Stack';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Fab from '@mui/material/Fab';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { Link } from 'react-router-dom';
import SuperWiserList from './SuperWiserList';
import IssueList from './IssueList';

const ComplaintList = () => {
  const [numIssues, setNumIssues] = useState(null);
  const [numPending, setNumPending] = useState(0);
  const [numResolved, setNumResolved] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/issues/allissues')
      .then((response) => {
        const numberOfIssues = response.data.length;
        const pendingIssues = response.data.filter((issue) => issue.status === 'pending');
        const resolvedIssues = response.data.filter((issue) => issue.status === 'resolved');

        setNumPending(pendingIssues.length);
        setNumResolved(resolvedIssues.length);
        setNumIssues(numberOfIssues);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [bg, setBg] = useState('dark');

  const darkTheme = createTheme({
    palette: {
      mode: bg,
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack direction="row" spacing={10}>
                  <Card
                    sx={{
                      width: 25 + '%',
                      height: 100,
                      transition: 'transform 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Total Complaints
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          {numIssues}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                  <Card
                    sx={{
                      width: 25 + '%',
                      height: 100,
                      transition: 'transform 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <CardActionArea>
                      <CardContent>
                        <Typography style={{ color: 'red' }} gutterBottom variant="h5" component="div">
                          Pending
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          {numPending}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                  <Card
                    sx={{
                      width: 25 + '%',
                      height: 100,
                      transition: 'transform 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <CardActionArea>
                      <CardContent>
                        <Typography style={{ color: 'blue' }} gutterBottom variant="h5" component="div">
                          Resolved
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          {numResolved}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
            <Box height={20} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card
                  sx={{
                    height: 70 + 'vh',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <CardContent>
                    List of Complaints
                    <IssueList />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Fab size="small" color="secondary" aria-label="add">
              <Brightness4Icon onClick={() => setBg(bg === 'light' ? 'dark' : 'light')} />
            </Fab>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default ComplaintList;
