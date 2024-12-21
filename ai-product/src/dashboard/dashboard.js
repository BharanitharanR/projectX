import React, { useEffect, useState }  from 'react';
import { getAuth } from "firebase/auth";
import { signOutFromGoogle } from "../firebase";
import { AppBar, Toolbar, Typography, Button, Container, Box, Card, Avatar, Menu, MenuItem , IconButton} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
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
    <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
    <Stack
      direction="column"
      component="main"
      sx={[
        {
          justifyContent: 'center',
          height: 'calc((1 - var(--template-frame-height, 0)) * 100%)',
          marginTop: 'max(40px - var(--template-frame-height, 0px), 0px)',
          minHeight: '100%',
        },
        (theme) => ({
          '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            zIndex: -1,
            inset: 0,
            backgroundImage:
              'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
            backgroundRepeat: 'no-repeat',
            ...theme.applyStyles('dark', {
              backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
            }),
          },
        }),
      ]}
    >
      <Stack
        direction={{ xs: 'column-reverse', md: 'row' }}
        sx={{
          justifyContent: 'center',
          gap: { xs: 6, sm: 12 },
          p: 2,
          mx: 'auto',
        }}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            gap: { xs: 6, sm: 12 },
            p: { xs: 2, sm: 4 },
            m: 'auto',
          }}
        >
    <Box sx={{ flexGrow: 1 }}>
      {/* Menu Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          {user && (
            <>
              <IconButton onClick={handleMenuOpen} size="large">
                <Avatar alt={user.displayName} src={user.photoURL} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  {user.displayName || "User"}
                </MenuItem>
                <MenuItem onClick={handleGoogleSignOut}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

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
        </Stack>
      </Stack>
    </Stack>

  </AppTheme>
  );
}

export default Dashboard;
