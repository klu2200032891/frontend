import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import AddAchievements from './AddAchievements';
import ViewAchievements from './ViewAchievements';
import FetchEvents from './FetchEvents';
import AchievementsDisplay from './AchievementsDisplay';

export default function City({ email }) {
  const theme = useTheme();
  const [page, setPage] = useState('City');
  const userEmail = email;

  const renderPage = () => {
    switch (page) {
      case 'AddAchievements':
        return <AddAchievements setPage={setPage} />;
      case 'ViewAchievements':
        return <ViewAchievements setPage={setPage} />;
      case 'FetchEvents':
        return <FetchEvents setPage={setPage} email={userEmail}/>;
      case 'AchievementsDisplay':
        return <AchievementsDisplay setPage={setPage} />;
      case 'Profile':
        return <Typography variant="h6">Profile Page</Typography>;
      case 'Events':
        return <Typography variant="h6">Events Page</Typography>;
      case 'Resources':
        return <Typography variant="h6">Resources Page</Typography>;
      default:
        return (
          <Box
            component="main"
            sx={{
              maxWidth: 'lg',
              margin: 'auto',
              animation: 'fadeIn 1s ease-in-out',
              '@keyframes fadeIn': {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
          >
            <Paper
              elevation={8}
              sx={{
                padding: theme.spacing(6),
                backgroundImage: 'linear-gradient(135deg, #f6d365, #fda085)',
                textAlign: 'center',
                borderRadius: '16px',
                boxShadow: theme.shadows[6],
                transform: 'scale(1.02)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: theme.shadows[12],
                },
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  color: '#fff',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
                }}
              >
                Extracurricular Achievements Dashboard
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: '#ffffff',
                  marginBottom: theme.spacing(2),
                  textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
                }}
              >
                Welcome to your dashboard! Explore, manage, and showcase your achievements.
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  marginTop: theme.spacing(2),
                  fontWeight: '500',
                  color: '#fff',
                  textShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)',
                }}
              >
                Logged in as: {userEmail}
              </Typography>
            </Paper>

            <Grid container spacing={4} sx={{ marginTop: theme.spacing(6) }}>
              {[ // Dynamic configuration for cards
                {
                  title: 'View Achievements',
                  description: 'See your accomplishments and celebrate your journey.',
                  bg: '#6a11cb',
                  hoverBg: '#3b5998',
                  action: 'ViewAchievements',
                },
                {
                  title: 'Add Achievements',
                  description: 'Add new milestones to your profile.',
                  bg: '#f6a192',
                  hoverBg: '#d45079',
                  action: 'AddAchievements',
                },
                {
                  title: 'QR Codes',
                  description: 'View and share your achievements interactively.',
                  bg: '#5f72be',
                  hoverBg: '#4357ad',
                  action: 'AchievementsDisplay',
                },
                {
                  title: 'Fetch Events',
                  description: 'Discover upcoming opportunities.',
                  bg: '#ff7e5f',
                  hoverBg: '#feb47b',
                  action: 'FetchEvents',
                },
              ].map((item, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card
                    sx={{
                      maxWidth: 345,
                      borderRadius: '16px',
                      backgroundColor: item.bg,
                      boxShadow: theme.shadows[6],
                      transform: 'scale(1)',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        backgroundColor: item.hoverBg,
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', color: '#fff' }}>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: 'bold' }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          marginTop: theme.spacing(1),
                          opacity: 0.9,
                        }}
                      >
                        {item.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
                      <Button
                        variant="contained"
                        sx={{
                          textTransform: 'none',
                          fontSize: '16px',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          backgroundColor: '#fff',
                          color: item.bg,
                          '&:hover': {
                            backgroundColor: item.hoverBg,
                            color: '#fff',
                          },
                        }}
                        onClick={() => setPage(item.action)}
                      >
                        Explore
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
    }
  };

  return <>{renderPage()}</>;
}