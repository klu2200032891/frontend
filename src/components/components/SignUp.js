import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';


const defaultTheme = createTheme();

export default function SignUp({ setPage }) {
  const [userName, setUserName] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (passwordError) {
      alert('Please enter a valid strong password.');
      return;
    }

    axios
      .post('http://localhost:8080/user', {
        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
      })
      .then((res) => {
        setUserName(data.get('name'));
        setSignUpSuccess(true);
        setOpenSnackbar(true);

        setTimeout(() => {
          setOpenSnackbar(false);
          setPage('Signin');
        }, 2000);
      })
      .catch((error) => {
        console.error('Error submitting form!', error);
      });
  };

  const validatePassword = (value) => {
    setPassword(value);

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!strongPasswordRegex.test(value)) {
      setPasswordError(
        'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.'
      );
    } else {
      setPasswordError('');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #e3f2fd, #7986cb)',
            borderRadius: 3,
            padding: 4,
            boxShadow: 6,
            minHeight: '70vh',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            animation: 'glow 1.5s infinite alternate',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent)',
              animation: 'blinking 2s infinite',
              borderRadius: 3,
            },
            '@keyframes glow': {
              '0%': { boxShadow: '0 0 10px #7986cb, 0 0 20px #7986cb' },
              '100%': { boxShadow: '0 0 20px #283593, 0 0 40px #283593' },
            },
            '@keyframes blinking': {
              '0%, 100%': { opacity: 0.5 },
              '50%': { opacity: 1 },
            },
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#ff5252' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontWeight: 700, mb: 1, color: '#283593' }}
          >
            Student Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 2, width: '100%' }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle sx={{ color: '#7986cb' }} />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ style: { color: '#283593' } }}
                  sx={{
                    input: { color: '#283593' },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      '& fieldset': { borderColor: '#283593' },
                      '&:hover fieldset': { borderColor: '#5c6bc0' },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: '#7986cb' }} />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ style: { color: '#283593' } }}
                  sx={{
                    input: { color: '#283593' },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      '& fieldset': { borderColor: '#283593' },
                      '&:hover fieldset': { borderColor: '#5c6bc0' },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => validatePassword(e.target.value)}
                  error={!!passwordError}
                  helperText={
                    passwordError ||
                    'Must be 8+ characters, include uppercase, lowercase, number, and special character.'
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: '#7986cb' }} />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ style: { color: '#283593' } }}
                  sx={{
                    input: { color: '#283593' },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      '& fieldset': { borderColor: '#283593' },
                      '&:hover fieldset': { borderColor: '#5c6bc0' },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions, and updates via email."
                  sx={{ color: '#283593' }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: '#ff5252',
                '&:hover': {
                  bgcolor: '#ff867f',
                  transform: 'scale(1.05)',
                  boxShadow: '0 5px 15px rgba(255, 82, 82, 0.5)',
                },
                borderRadius: 3,
                paddingY: 1.2,
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => setPage('Signin')}
                  sx={{ color: '#283593', fontWeight: 'bold' }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>

          {signUpSuccess && (
            <Typography
              variant="h6"
              sx={{
                mt: 3,
                textAlign: 'center',
                color: '#4caf50',
                fontWeight: 'bold',
              }}
            >
              Welcome, {userName}! You will be redirected to the Sign In page
              shortly.
            </Typography>
          )}

          <Snackbar
            open={openSnackbar}
            autoHideDuration={2000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={() => setOpenSnackbar(false)}
              severity="success"
              sx={{
                width: '100%',
                backgroundColor: '#43a047',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              User added successfully!
            </MuiAlert>
          </Snackbar>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
