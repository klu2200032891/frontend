import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import img4 from './img5.avif'; // Main page background image

const defaultTheme = createTheme();

export default function SignIn({ setPage, setUserEmail }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (email === '2200032891cseh@gmail.com' && password === 'Harsha') {
      setPage('AdminPanel');
      setErrorMessage('Admin recognized!');
    } else {
      try {
        const response = await axios.post('http://localhost:8080/login', { email, password });

        if (response.status === 200) {
          localStorage.setItem('userEmail', email);
          setUsername(response.data);
          setUserEmail(email);
          setLoginSuccess(true);
          setErrorMessage('');
          setTimeout(() => setPage('City'), 1000);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            setErrorMessage('Invalid credentials. Please try again.');
          } else if (error.response.status === 500) {
            setErrorMessage('Server error. Please try again later.');
          } else {
            setErrorMessage('An unexpected error occurred. Please try again.');
          }
        } else {
          setErrorMessage('Network error. Please check your connection.');
        }
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: `url(${img4})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3))',
          },
        }}
      >
        <Container component="main" maxWidth="xs" sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: 3,
              padding: 4,
              boxShadow: 6,
              minHeight: '70vh',
              justifyContent: 'center',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: 10,
              },
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#ff5252', boxShadow: 3 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#283593' }}>
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
              {errorMessage && (
                <Typography color="error" sx={{ textAlign: 'center', mb: 2, fontWeight: 'bold' }}>
                  {errorMessage}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#ff5252',
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <Box component="span" sx={{ color: '#ff5252', pl: 1 }}>
                      @
                    </Box>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#ff5252',
                    },
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: 'linear-gradient(to right, #ff5252, #ff867f)',
                  '&:hover': { bgcolor: '#ff867f' },
                  boxShadow: 3,
                  fontWeight: 600,
                }}
              >
                Sign In
              </Button>
            </Box>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" sx={{ fontWeight: 600, color: '#283593' }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  sx={{ fontWeight: 600, color: '#283593', '&:hover': { textDecoration: 'underline' } }}
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}