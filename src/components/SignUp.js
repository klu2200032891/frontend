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
import Select from '@mui/material/Select'; 
import MenuItem from '@mui/material/MenuItem'; 
import axios from 'axios'; 

const defaultTheme = createTheme(); 

export default function SignUp({ setPage }) { 
  const handleSubmit = (event) => { 
    event.preventDefault(); 
    const data = new FormData(event.currentTarget); 
    axios.post("http://localhost:8080/user", { 
      name: data.get('name'), 
      role: data.get('role'), 
      email: data.get('email'), 
      password: data.get('password') 
    }).then((res) => { 
      console.log(res.data); 
    }).catch((error) => { 
      console.error("Error submitting form!", error); 
    }); 
  }; 

  return ( 
    <ThemeProvider theme={defaultTheme}> 
      <Container component="main" maxWidth="xs"> 
        <CssBaseline /> 
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> 
            <LockOutlinedIcon /> 
          </Avatar> 
          <Typography component="h1" variant="h5"> 
            Student Sign up 
          </Typography> 
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}> 
            <Grid container spacing={2}> 
              <Grid item xs={12} sm={6}> 
                <TextField 
                  autoComplete="given-name" 
                  name="name" 
                  required 
                  fullWidth 
                  id="name" 
                  label="Name" 
                  autoFocus 
                /> 
              </Grid> 
              <Grid item xs={12} sm={6}> 
                <Select 
                  fullWidth 
                  labelId="role-label" 
                  id="role" 
                  name="role" 
                  defaultValue={0} 
                > 
                  <MenuItem value={1}>Admin</MenuItem> 
                  <MenuItem value={2}>User</MenuItem> 
                  <MenuItem value={0}>Guest</MenuItem> 
                </Select> 
              </Grid> 
              <Grid item xs={12}> 
                <TextField 
                  required 
                  fullWidth 
                  id="email" 
                  label="Email Address" 
                  name="email" 
                  autoComplete="email" 
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
                /> 
              </Grid> 
              <Grid item xs={12}> 
                <FormControlLabel 
                  control={<Checkbox value="allowExtraEmails" color="primary" />} 
                  label="I want to receive inspiration, marketing promotions, and updates via email." 
                /> 
              </Grid> 
            </Grid> 
            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              sx={{ mt: 3, mb: 2 }} 
            > 
              Sign Up 
            </Button> 
            <Grid container justifyContent="flex-end"> 
              <Grid item> 
                {/* Update the onClick handler to navigate to SignIn */}
                <Link href="#" variant="body2" onClick={() => setPage("Signin")}> 
                  Already have an account? Sign in 
                </Link> 
              </Grid> 
            </Grid> 
          </Box> 
        </Box> 
      </Container> 
    </ThemeProvider> 
  ); 
}
