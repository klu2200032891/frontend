import React, { useEffect, useState } from 'react';
import {
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Divider,
  Chip,
  Snackbar,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import { QRCodeCanvas } from 'qrcode.react';

const AchievementsDisplay = ({ setPage }) => {
  const theme = useTheme();
  const [achievements, setAchievements] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
          setSnackbarSeverity('warning');
          setSnackbarMessage('No email found in local storage!');
          setSnackbarOpen(true);
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/api/achievements/email/${userEmail}`
        );
        setAchievements(response.data);
      } catch (error) {
        console.error('Error fetching achievements:', error);
        setSnackbarSeverity('error');
        setSnackbarMessage('Failed to load achievements.');
        setSnackbarOpen(true);
      }
    };

    fetchAchievements();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      component="main"
      sx={{
        maxWidth: 'lg',
        margin: 'auto',
        padding: theme.spacing(4),
        animation: 'fadeIn 1s ease-in-out',
        '@keyframes fadeIn': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: theme.spacing(6),
          backgroundImage: 'linear-gradient(135deg, #89f7fe, #66a6ff)',
          textAlign: 'center',
          borderRadius: '16px',
          boxShadow: theme.shadows[8],
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setPage('city')}
          sx={{
            marginBottom: theme.spacing(3),
            boxShadow: theme.shadows[4],
            textTransform: 'none',
          }}
        >
          Back
        </Button>

        <Typography
          component="h1"
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#ffffff',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          Your Achievements
        </Typography>

        <Typography
          variant="h6"
          sx={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: theme.spacing(4) }}
        >
          Celebrate your milestones and share your story.
        </Typography>

        <Box>
          {achievements.length > 0 ? (
            <Grid container spacing={4}>
              {achievements.map((achievement) => (
                <Grid item xs={12} sm={6} md={4} key={achievement.id}>
                  <Card
                    sx={{
                      borderRadius: '16px',
                      backgroundImage: 'linear-gradient(135deg, #ffe259, #ffa751)',
                      color: '#ffffff',
                      boxShadow: theme.shadows[6],
                      transform: 'scale(1)',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        boxShadow: theme.shadows[12],
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <CardContent sx={{ padding: theme.spacing(3), textAlign: 'center' }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 'bold',
                          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        {achievement.title}
                      </Typography>

                      <Divider sx={{ marginY: theme.spacing(2) }}>
                        <Chip label="Details" color="primary" />
                      </Divider>

                      <Typography variant="body1" sx={{ marginBottom: theme.spacing(1) }}>
                        <strong>Date:</strong> {achievement.date}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Place:</strong> {achievement.place}
                      </Typography>

                      <Divider sx={{ marginY: theme.spacing(2) }}>
                        <Chip label="QR Code" color="secondary" />
                      </Divider>
                      <QRCodeCanvas
                        value={JSON.stringify(achievement)}
                        size={128}
                        style={{ margin: 'auto' }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography
              variant="h6"
              sx={{ color: '#ffffff', marginTop: theme.spacing(4) }}
            >
              No achievements added yet.
            </Typography>
          )}
        </Box>
      </Paper>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default AchievementsDisplay;
