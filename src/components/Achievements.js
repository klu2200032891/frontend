import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function Achievements() {
  const achievements = [
    "Winner of Inter-College Coding Competition 2023",
    "Participated in National Level Hackathon 2024",
    "Secured 2nd place in University Chess Championship 2022",
    "Organized the Annual Tech Fest, Samyak 2023",
    "Completed Leadership Training Program by XYZ Foundation",
    "Volunteered at the Social Innovation Conference 2023"
  ];

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
          Your Achievements
        </Typography>

        <Typography variant="h6" gutterBottom>
          Here are your extracurricular achievements:
        </Typography>

        {/* Achievement Cards */}
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {achievements.map((achievement, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    Achievement {index + 1}
                  </Typography>
                  <Typography variant="body1">
                    {achievement}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
