"use client"
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Link,
} from "@mui/material";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter()
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.100", display: "flex", flexDirection: "column" }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Google Forms
          </Typography>
          <Button color="primary">Go to Forms</Button>
          <Button variant="contained" color="primary" sx={{ ml: 2 }}>
            Try Forms for Work
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, bgcolor: "background.paper", py: 10 }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom align="center">
            Get insights quickly, with Google Forms
          </Typography>
          <Typography variant="h6" color="textSecondary" align="center" sx={{ mb: 4 }}>
            Easily create and share online forms and surveys, and analyze responses in real-time.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 8 }}>
            <Button variant="contained" size="large" color="primary">
              Try Forms for Work
            </Button>
            <Button variant="outlined" size="large" color="primary">
              Go to Forms
            </Button>
          </Box>

          <Box
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              overflow: "hidden",
              maxWidth: "100%",
              mx: "auto",
            }}
          >
            <img
              src="background.png"
              alt="Screenshot placeholder"
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        </Container>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Don’t have an account?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="outlined" color="primary" size="large" onClick={() => {router.push("/user/signin")}} >
              Sign In
            </Button>
            <Button variant="contained" color="primary" size="large"onClick={() => {router.push("/user/signup")}} >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>

      <Box component="footer" sx={{ bgcolor: "grey.800", py: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="grey.400" align="center">
            &copy; {new Date().getFullYear()} Google Forms. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
