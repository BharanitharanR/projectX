import React from "react";
import { getAuth } from "firebase/auth";
import { signOutFromGoogle } from "../firebase";
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleGoogleSignOut = async () => {
    // Call the signInWithGoogle function and pass navigate to it
    await signOutFromGoogle(navigate);
  };
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>User: {user?.displayName || "Unknown User"}</p>
      <p>Email: {user?.email || "No Email"}</p>
      <Button onClick={handleGoogleSignOut}>Logout</Button>
    </div>
  );
}

export default Dashboard;
