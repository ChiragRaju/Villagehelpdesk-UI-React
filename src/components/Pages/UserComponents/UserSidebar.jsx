import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import { Toolbar } from '@mui/material';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Link } from '@mui/material';
import { useAuth } from '../../../context/AuthContext'; // Adjust the path

const drawerWidth = 240;

export default function UserSidebar() {
  const { user, logout } = useAuth(); // Access user information and logout function from AuthContext
  const linkStyle = {
    textDecoration: 'none',
    color: '#ffff',
    '&:hover': {
      color: '#1976D2',
    },
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar style={{ marginTop: '20px', marginLeft: '50px', marginBottom: '10px' }}>
          {user && <Avatar alt="U" src={user.avatar} sx={{ width: 100, height: 100 }} style={{ alignSelf: 'center' }} />}
        </Toolbar>

        {user && <Typography style={{ alignSelf: 'center', marginBottom: '40px' }}>{user.email}</Typography>}

        <List>
          {[<Link href="/IssueRaised" sx={linkStyle}>Issue Raising</Link>, <Link href="/status" sx={linkStyle}>Status</Link>].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}

          {user && ( // Only show logout if the user is authenticated
            <ListItemButton onClick={logout} disablePadding>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={<Link href="/" sx={linkStyle}>Logout</Link>} />
            </ListItemButton>
          )}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
