import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import MyImage from './logo.png';

const StudentAppBar = ({ setPage }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const settings = ['Profile'];
  const navOptions = ['Achievements', 'Events', 'Resources'];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleButtonClick = (option) => {
    if (option === 'Achievements') {
      alert('Navigating to Add Achievement section!');
    } else {
      alert(`You clicked on: ${option}`);
    }
  };

  const handleLogout = () => {
    alert('Logging out...');
    setPage('Signin');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'linear-gradient(45deg, #3f51b5, #2196f3)' }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={MyImage}
              alt="Logo"
              style={{ height: '40px', marginRight: '10px' }}
            />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', letterSpacing: '.1rem' }}>
              Student Dashboard
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {navOptions.map((option) => (
              <Button
                key={option}
                onClick={() => handleButtonClick(option)}
                sx={{ color: 'white', '&:hover': { backgroundColor: '#e0e0e0' } }}
              >
                {option}
              </Button>
            ))}
            <Button
              onClick={handleLogout}
              sx={{ color: 'white', fontWeight: 'bold', '&:hover': { backgroundColor: '#e57373' } }}
            >
              Logout
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" sx={{ width: 40, height: 40 }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default StudentAppBar;
