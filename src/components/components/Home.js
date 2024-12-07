import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';

function Home({ setPage }) {
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
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Box
          sx={{
            backgroundColor: '#3f51b5',
            color: 'white',
            padding: '80px 0',
            textAlign: 'center',
            backgroundImage: 'url(https://images.unsplash.com/photo-1506784365847-bbad939e9335)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
            mb: 6,
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: 700, fontSize: '3rem', letterSpacing: '1px' }}>
            Welcome to BeyondBooks
          </Typography>
          <Typography variant="h5" sx={{ mt: 2, fontSize: '1.2rem', fontWeight: 500 }}>
            Student Extracurricular Activity Management System
          </Typography>

          {/* SignIn Buttons */}
          <Box sx={{ mt: 4 }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  padding: '10px 30px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: '50px',
                  transition: '0.3s',
                  '&:hover': {
                    backgroundColor: '#303f9f',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                  },
                }}
                onClick={() => setPage('Signin')}
              >
                Student SignIn
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  mt: 2,
                  padding: '10px 30px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: '50px',
                  transition: '0.3s',
                  '&:hover': {
                    backgroundColor: '#d32f2f',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                  },
                }}
                onClick={() => setPage('Signin')}
              >
                Admin SignIn
              </Button>
            </motion.div>
          </Box>
        </Box>
      </motion.div>

      {/* Content Section */}
      <Container sx={{ mt: 6 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 600, fontSize: '2rem' }}>
          About the Platform
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <Box
                sx={{
                  backgroundColor: 'white',
                  boxShadow: 3,
                  borderRadius: 2,
                  padding: 3,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: '0.3s',
                  '&:hover': {
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                  },
                }}
                onClick={() => window.location.href = 'https://www.google.com'}
              >
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  Centralized Tracking
                </Typography>
                <Typography sx={{ fontSize: '1rem' }}>
                  Centralize the tracking and management of student extracurricular activities.
                </Typography>
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <Box
                sx={{
                  backgroundColor: 'white',
                  boxShadow: 3,
                  borderRadius: 2,
                  padding: 3,
                  textAlign: 'left',
                  transition: '0.3s',
                  '&:hover': {
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  Streamlined Processes
                </Typography>
                <Typography sx={{ fontSize: '1rem' }}>
                  Streamline the process of updating and verifying achievement records.
                </Typography>
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Box
                sx={{
                  backgroundColor: 'white',
                  boxShadow: 3,
                  borderRadius: 2,
                  padding: 3,
                  textAlign: 'left',
                  transition: '0.3s',
                  '&:hover': {
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  Monitor Progress
                </Typography>
                <Typography sx={{ fontSize: '1rem' }}>
                  Offer students a simple way to monitor their extracurricular progress.
                </Typography>
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Box
                sx={{
                  backgroundColor: 'white',
                  boxShadow: 3,
                  borderRadius: 2,
                  padding: 3,
                  textAlign: 'left',
                  transition: '0.3s',
                  '&:hover': {
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  Analytical Tools
                </Typography>
                <Typography sx={{ fontSize: '1rem' }}>
                  Equip administrators with tools to generate reports and analyze participation data.
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Conclusion Section */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Box
          sx={{
            padding: '60px 0',
            textAlign: 'center',
            backgroundColor: '#3f51b5',
            color: 'white',
            boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h5" sx={{ fontSize: '1.5rem', fontWeight: 500 }}>
            Join us in developing a well-rounded profile that showcases your achievements!
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
}

export default Home;
