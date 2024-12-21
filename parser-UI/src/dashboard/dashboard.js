import React, { useEffect, useState }  from 'react';
import { getAuth } from "firebase/auth";
import { signOutFromGoogle } from "../services/firebase";
import { AppBar, Toolbar, Typography, Button, Container, Box, Card, Avatar, Menu, MenuItem , IconButton} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import AppTheme from '../shared-theme/AppTheme';

import  HeaderApp from './header'
function Dashboard(props) {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

    // Handle menu actions
    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        console.log("Uploaded file:", file);
        // Connect to backend API for file upload
      }
    };

  const handleGoogleSignOut = async () => {
    // Call the signInWithGoogle function and pass navigate to it
    await signOutFromGoogle(navigate);
  };
  return (

    <AppTheme {...props}>
    <CssBaseline enableColorScheme />
    < HeaderApp/>
    <Box sx={{ flexGrow: 1 }}>
      {/* Menu Bar */}

      {/* Resume Upload Section */}
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Upload Your Resume
        </Typography>
        <Button variant="contained" component="label">
          Choose File
          <input
            type="file"
            hidden
            accept=".pdf,.docx,.txt"
            onChange={handleFileUpload}
          />
        </Button>
      </Container>
    </Box>

  </AppTheme>
  );
}

export default Dashboard;
