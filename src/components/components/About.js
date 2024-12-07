import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  backgroundColor: '#f3f4f6',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  backgroundColor: '#6200ea',
  color: 'white',
  '&:hover': {
    backgroundColor: '#3700b3',
  },
}));

export default function About() {
  const handleLearnMore = () => {
    window.open('https://youtu.be/mwabBCAWdzI?si=cLXR3TzIoZ66CkT0', '_blank');
  };

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
        <StyledPaper elevation={3}>
          <Typography component="h1" variant="h4" gutterBottom align="center" color="primary">
            About This Project
          </Typography>
          <Typography variant="body1" gutterBottom>
            This project is designed to help students manage and showcase their extracurricular achievements. 
            It provides a platform where students can keep track of their involvement in various activities 
            such as sports, competitions, and other events beyond academics.
          </Typography>
          <Typography variant="body1" gutterBottom>
            The application includes features like:
          </Typography>
          <ul>
            <li>Student Registration and Profile Management</li>
            <li>Tracking Extracurricular Achievements</li>
            <li>Admin Management of Achievements and User Information</li>
            <li>Interactive Dashboard for Viewing and Updating Information</li>
          </ul>
          <Typography variant="body1" gutterBottom>
            Developed using modern technologies such as React for the frontend, Spring Boot for the backend, 
            and MySQL for the database. This project aims to streamline the process of documenting student 
            achievements and providing a digital showcase for future opportunities.
          </Typography>
          <StyledButton onClick={handleLearnMore} variant="contained">
            Learn More
          </StyledButton>
        </StyledPaper>
      </Box>
    </Container>
  );
}
