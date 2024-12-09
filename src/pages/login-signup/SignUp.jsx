import React, { useState } from "react";
import generateRandomPassword from "../../utils/passwordUtils";
import {  Typography } from "@mui/material";
import authHeader from "../../services/auth-header";

import {  useNavigate } from "react-router-dom";
import {
  Box,

  TextField,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
const theme = createTheme({
  palette: {
    primary: {
      main: "#0E8388",
    },
  },
});
const SignUp = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
  });
  const navigate = useNavigate();
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGeneratePassword = () => {
    const randomPassword = generateRandomPassword();
    setUserData((prevData) => ({
      ...prevData,
      password: randomPassword,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/signup",{
        method: "POST",
        headers: {
          ...authHeader(),
          "Content-Type": "application/json",        
        },
        
        
        body: JSON.stringify(userData),
      });

      if (response.status === 201) {
        // User signed up successfully, show confirmation message
        setSignupSuccess(true);

        // Clear the form or perform any other actions as needed
        setUserData({
          username: "",
          email: "",
          role: "",
          password: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Signup failed:", errorData);
        // Handle other errors
      }
    } catch (error) {
      console.error("Error in handleSignUp:", error);
      // Handle other errors
    }
  };

  return (
    <Box sx={{ ml: 5, mt: 5 }}>
      <Typography variant="h4">Sign Up</Typography>
      <form onSubmit={handleSignUp} sx={{ mt: 3 }}>
        <TextField
          label="Username"
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          required
          margin="normal"
        />
        <br />
        <TextField
          label="Email"
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
          margin="normal"
        />
        <br />
        <TextField
          label="Role"
          type="text"
          name="role"
          value={userData.role}
          onChange={handleChange}
          required
          margin="normal"
        />
        <br />
        
          <ThemeProvider theme={theme}>
            <Box mt={2} display="flex" alignItems="center">
              <TextField
                label="Password"
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
                margin="normal"
              />
              <Button
                type="button"
                variant="outlined"
                onClick={handleGeneratePassword}
                sx={{ ml: 2 }}
              >
                Generate Password
              </Button>
            </Box>
          </ThemeProvider>
          {userData.password && (
            <Typography variant="body2" mt={2}>
              Generated Password: {userData.password}
            </Typography>
          )}
          <br />
       
       

        
  <ThemeProvider theme={theme}>
                <Box mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="button"
                  >
                    Enregistrer
                  </Button>{" "}
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/afficherUsers")}
                  >
                    Annuler
                  </Button>
                </Box>
              </ThemeProvider>

        {signupSuccess && (
          <Typography variant="body2" sx={{ mt: 2, color: "green" }}>
            Account created successfully! Check your email for credentials.
          </Typography>
        )}
      </form>
    </Box>
  );
};

export default SignUp;
