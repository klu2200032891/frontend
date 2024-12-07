import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, Grid, Paper, Card, CardContent, Divider, Chip, TextField, Snackbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';

const ViewAchievements = ({ setPage }) => {
  const theme = useTheme();
  const [achievements, setAchievements] = useState([]);
  const [editAchievement, setEditAchievement] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    place: '',
    category: '',
    achievementType: '',
    level: '',
    participants: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Fetch achievements data from the backend
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail'); 
        console.log(userEmail)// Fetch email from localStorage
        if (!userEmail) {
          setSnackbarSeverity('warning');
          setSnackbarMessage('No email found in local storage!');
          setSnackbarOpen(true);
          return;
        }
  
        const response = await axios.get(`http://localhost:8080/api/achievements/email/${userEmail}`);
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
  

  // Handle update button click - Show the form with the achievement data
  const handleUpdate = (achievement) => {
    setEditAchievement(achievement);
    setFormData({
      title: achievement.title,
      date: achievement.date,
      place: achievement.place,
      category: achievement.category,
      achievementType: achievement.achievementType,
      level: achievement.level,
      participants: achievement.participants
    });
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission to update the achievement
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/achievements/${editAchievement.id}`, formData);
      const updatedAchievement = response.data;

      setAchievements((prevAchievements) =>
        prevAchievements.map((achievement) =>
          achievement.id === updatedAchievement.id ? updatedAchievement : achievement
        )
      );

      setEditAchievement(null); 
      setSnackbarSeverity('success');
      setSnackbarMessage('Achievement updated successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error updating achievement:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error updating achievement!');
      setSnackbarOpen(true);
    }
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/achievements/${id}`);
      setAchievements((prev) => prev.filter((achievement) => achievement.id !== id));
      setSnackbarSeverity('success');
      setSnackbarMessage('Achievement deleted successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting achievement:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error deleting achievement!');
      setSnackbarOpen(true);
    }
  };

  // Handle Snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box component="main" sx={{ maxWidth: 'lg', margin: 'auto', padding: theme.spacing(2) }}>
      <Paper
        elevation={6}
        sx={{
          padding: theme.spacing(4),
          backgroundColor: theme.palette.background.default,
          textAlign: 'center',
          borderRadius: '8px',
        }}
      >
        {/* Back Button */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setPage('city')}
          sx={{ marginBottom: theme.spacing(3) }}
        >
          Back
        </Button>

        <Typography component="h1" variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
          Your Achievements
        </Typography>
        <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
          Below are the achievements you have added.
        </Typography>

        {/* Achievement list */}
        <Box sx={{ marginTop: theme.spacing(4) }}>
          {achievements.length > 0 ? (
            <Grid container spacing={4}>
              {achievements.map((achievement) => (
                <Grid item xs={12} sm={6} md={4} key={achievement.id}>
                  <Card
                    sx={{
                      borderRadius: '12px',
                      boxShadow: theme.shadows[5],
                      '&:hover': {
                        boxShadow: theme.shadows[10],
                        transform: 'scale(1.02)',
                        transition: '0.3s',
                      },
                    }}
                  >
                    <CardContent sx={{ padding: theme.spacing(3) }}>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.primary.dark }}>
                        {achievement.title}
                      </Typography>

                      <Divider sx={{ marginY: theme.spacing(2) }}>
                        <Chip label="Details" color="primary" />
                      </Divider>

                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Date:
                          </Typography>
                          <Typography variant="body1">{achievement.date}</Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Place:
                          </Typography>
                          <Typography variant="body1">{achievement.place}</Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Category:
                          </Typography>
                          <Typography variant="body1">{achievement.category}</Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Type:
                          </Typography>
                          <Typography variant="body1">{achievement.achievementType}</Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Level:
                          </Typography>
                          <Typography variant="body1">{achievement.level}</Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Participants:
                          </Typography>
                          <Typography variant="body1">{achievement.participants}</Typography>
                        </Grid>
                      </Grid>

                      {/* Update and Delete Buttons */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: theme.spacing(2) }}>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ flex: 1, marginRight: theme.spacing(1) }}
                          onClick={() => handleUpdate(achievement)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          sx={{ flex: 1 }}
                          onClick={() => handleDelete(achievement.id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="h6">No achievements added yet.</Typography>
          )}
        </Box>
      </Paper>

      {/* Update Achievement Form */}
      {editAchievement && (
        <Paper
          elevation={6}
          sx={{
            padding: theme.spacing(4),
            marginTop: theme.spacing(4),
            backgroundColor: theme.palette.background.default,
            textAlign: 'center',
            borderRadius: '8px',
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
            Update Achievement
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date"
                  variant="outlined"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Place"
                  variant="outlined"
                  name="place"
                  value={formData.place}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Category"
                  variant="outlined"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Achievement Type"
                  variant="outlined"
                  name="achievementType"
                  value={formData.achievementType}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Level"
                  variant="outlined"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Participants"
                  variant="outlined"
                  name="participants"
                  value={formData.participants}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
            </Grid>

            <Box sx={{ marginTop: theme.spacing(2) }}>
              <Button variant="contained" color="primary" type="submit" sx={{ width: '100%' }}>
                Save Changes
              </Button>
            </Box>
          </form>
        </Paper>
      )}

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default ViewAchievements;
