import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";

function App() {
  return (
    <div>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My AI Product
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ textAlign: "center", marginTop: 8 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to My AI Product
        </Typography>
        <Typography variant="body1" paragraph>
          Upload your resume, explore personalized job recommendations, and get a complete preparation plan to ace your next opportunity.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Get Started
        </Button>
      </Container>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#f5f5f5", padding: 2, marginTop: 8, textAlign: "center" }}>
        <Typography variant="body2">© 2024 My AI Product. All rights reserved.</Typography>
      </Box>
    </div>
  );
}

export default App;
