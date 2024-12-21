import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material"; // Adjust the path as needed
import SignInSide from "./sign-in-side/SignInSide"
import AppRouter from "./router";
import Footer from "./footer/license"
function App() {
  return (
    <div>
        <AppRouter />
        <Footer />
    </div>
  );
}

export default App;
