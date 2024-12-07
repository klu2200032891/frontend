import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Paper, MenuItem, Snackbar, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

const AddAchievements = ({ setPage }) => {
  const theme = useTheme();
  const [achievement, setAchievement] = useState({
    title: '',
    date: '',
    place: '',
    category: '',
    achievementType: '',
    level: '',
    participants: '',
    email: '' // Added email field
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAchievement({ ...achievement, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAchievement = {
      title: achievement.title,
      date: achievement.date,
      place: achievement.place,
      category: achievement.category,
      achievementType: achievement.achievementType,
      level: achievement.level,
      participants: achievement.participants,
      email: achievement.email // Include email field in submission
    };

    try {
      const response = await axios.post('http://localhost:8080/api/achievements/add', newAchievement);
      if (response.status === 200) {
        setSnackbar({ open: true, message: 'Achievement added successfully!', severity: 'success' });

        // Clear the form fields
        setAchievement({
          title: '',
          date: '',
          place: '',
          category: '',
          achievementType: '',
          level: '',
          participants: '',
          email: '' // Clear email field as well
        });

        // Redirect to City.js after 2 seconds
        setTimeout(() => {
          setPage('City');
        }, 2000);
      }
    } catch (error) {
      console.error('Error:', error);
      setSnackbar({ open: true, message: 'Error adding achievement', severity: 'error' });
    }
  };

  // Close the Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const categories = [
    'Sports',
    'University Event',
    'Hackathon',
    'Cultural Fest',
    'Technical Symposium',
    'Community Service',
    'Other',
  ];

  const achievementTypes = ['Individual', 'Team'];
  const levels = ['College', 'University', 'State', 'National', 'International'];

  return (
    <Box component="main" sx={{ maxWidth: 'md', margin: 'auto', padding: theme.spacing(3) }}>
      <Paper elevation={4} sx={{ padding: theme.spacing(4), backgroundColor: '#f5f5f5' }}>
        <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Add New Achievement
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Achievement Title"
                variant="outlined"
                name="title"
                value={achievement.title}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                variant="outlined"
                name="date"
                value={achievement.date}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Place"
                variant="outlined"
                name="place"
                value={achievement.place}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Category"
                variant="outlined"
                name="category"
                value={achievement.category}
                onChange={handleChange}
                required
              >
                {categories.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Achievement Type"
                variant="outlined"
                name="achievementType"
                value={achievement.achievementType}
                onChange={handleChange}
                required
              >
                {achievementTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Level"
                variant="outlined"
                name="level"
                value={achievement.level}
                onChange={handleChange}
                required
              >
                {levels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Number of Participants"
                variant="outlined"
                name="participants"
                value={achievement.participants}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={achievement.email}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  width: '100%',
                  height: '50px',
                  fontSize: '16px',
                  backgroundColor: '#1976d2',
                  '&:hover': { backgroundColor: '#115293' },
                }}
              >
                Add Achievement
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  width: '100%',
                  height: '50px',
                  fontSize: '16px',
                  '&:hover': { backgroundColor: '#e0e0e0' },
                }}
                onClick={() => setPage('City')}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Snackbar for Success/Error Message */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddAchievements;
