import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';

function Home({ store }) {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: '#3f51b5',
          color: 'black',
          padding: '60px 0',
          textAlign: 'center',
          backgroundImage: 'url(https://images.unsplash.com/photo-1506784365847-bbad939e9335)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 700 }}>
          Welcome to ClubHub
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Student Extracurricular Activity Management System
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={() => store.dispatch({ type: "page", data: "Signin" })}>
          SignIn
        </Button>
      </Box>

      {/* Content Section */}
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          About the Platform
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: 'white',
                boxShadow: 3,
                borderRadius: 2,
                padding: 3,
                textAlign: 'left',
                cursor: 'pointer',
              }}
              onClick={() => window.location.href = 'https://www.google.com'}
            >
              <Typography variant="h5" sx={{ mb: 2 }}>
                Centralized Tracking
              </Typography>
              <Typography>
                Centralize the tracking and management of student extracurricular activities.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: 'white',
                boxShadow: 3,
                borderRadius: 2,
                padding: 3,
                textAlign: 'left',
              }}
            >
              <Typography variant="h5" sx={{ mb: 2 }}>
                Streamlined Processes
              </Typography>
              <Typography>
                Streamline the process of updating and verifying achievement records.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: 'white',
                boxShadow: 3,
                borderRadius: 2,
                padding: 3,
                textAlign: 'left',
              }}
            >
              <Typography variant="h5" sx={{ mb: 2 }}>
                Monitor Progress
              </Typography>
              <Typography>
                Offer students a simple way to monitor their extracurricular progress.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: 'white',
                boxShadow: 3,
                borderRadius: 2,
                padding: 3,
                textAlign: 'left',
              }}
            >
              <Typography variant="h5" sx={{ mb: 2 }}>
                Analytical Tools
              </Typography>
              <Typography>
                Equip administrators with tools to generate reports and analyze participation data.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Conclusion Section */}
      <Box
        sx={{
          padding: '40px 0',
          textAlign: 'center',
          backgroundColor: '#3f51b5',
          color: 'white',
        }}
      >
        <Typography variant="h5">
          Join us in developing a well-rounded profile that showcases your achievements!
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;
