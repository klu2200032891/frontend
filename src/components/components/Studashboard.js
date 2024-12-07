import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export default function Studashboard({ setPage }) {
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Student Dashboard
        </Typography>

        <Typography variant="h6" gutterBottom>
          Welcome to your extracurricular achievements dashboard!
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setPage('Achievements')} // Redirect to Achievements
          >
            View Achievements
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ ml: 2 }}
            onClick={() => setPage('Profile')} // Redirect to Profile
          >
            View Profile
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
            onClick={() => setPage('Events')} // Redirect to Events
          >
            View Upcoming Events
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 1 }}
            onClick={() => setPage('Resources')} // Redirect to Resources page
          >
            View Resources
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setPage('Studashboard')} // Redirect back to Student Dashboard
          >
            Back to Student Dashboard
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
