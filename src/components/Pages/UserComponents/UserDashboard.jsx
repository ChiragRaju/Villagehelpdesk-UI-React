import React, { useState } from "react";
import UserSidebar from "./UserSidebar";
import { Box } from "@mui/material";
import Stack from "@mui/joy/Stack";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Fab from "@mui/material/Fab";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";

const responsiveDesign = {
  width: { xs: 100 + "%", lg: 50 + "%", md: 50 + "%", sm: 30 + "%" },
  height: { xs: 300, lg: 150, md: 170, sm: 150 },
};

const cardStyle = {
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
};

const buttonStyle = {
  "&:hover": {
    backgroundColor: "#2E3B4E", // Change color on hover
  },
};

const stackContainer = {
  marginTop: "20px",
  marginBottom: "20px",
};

function UserDashboard() {
  const [bg, setBg] = useState("dark");

  const darkTheme = createTheme({
    palette: {
      mode: bg,
    },
  });

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box sx={{ display: "flex" }}>
          <UserSidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12}>
                <Stack direction="row" spacing={22} style={stackContainer}>
                  <Card sx={{ ...responsiveDesign, ...cardStyle }}>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Issue Raising
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          All New Issues can be raised in this section
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Link
                        to="/IssueRaised"
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          size="small"
                          color="primary"
                          style={buttonStyle}
                        >
                          Raise Your Complaints
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                  <Card sx={{ ...responsiveDesign, ...cardStyle }}>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Status of complaints
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Status of all complaints
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Link to="/status" style={{ textDecoration: "none" }}>
                        <Button
                          size="small"
                          color="primary"
                          style={buttonStyle}
                        >
                          Check Status
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
            <Box height={20} />
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12}>
                <Card
                  sx={{
                    height: "80vh",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardContent>Descriptions</CardContent>
                </Card>
              </Grid>
            </Grid>
            <Fab size="small" color="secondary" aria-label="add">
              <Brightness4Icon
                onClick={() => setBg(bg === "light" ? "dark" : "light")}
              />
            </Fab>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default UserDashboard;
