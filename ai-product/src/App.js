import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material"; // Adjust the path as needed
import SignInSide from "./sign-in-side/SignInSide"
import AppRouter from "./router";
function App() {
  return (
    <div>
        <AppRouter />
    </div>
  );
}

export default App;
