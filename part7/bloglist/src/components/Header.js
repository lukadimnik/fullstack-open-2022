import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/userReducer';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';

const pages = [
  { name: 'home', url: '/' },
  { name: 'users', url: '/users' },
  { name: 'blogs', url: '/' },
];

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              BLOGS
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              {user.name} logged in
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            ></Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => navigate(page.url)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <Button
                  onClick={() => dispatch(logout())}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    backgroundColor: 'red',
                  }}
                  variant="outlined"
                >
                  LOGOUT
                </Button>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
