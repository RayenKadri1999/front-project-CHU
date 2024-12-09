import React, { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "../../services/auth-header";
import {
  Box,
  Grid,
  TextField,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Navbar from "../../components/shared/Navbar";
import Sidenav from "../../components/shared/Sidenav";
import { useNavigate, useParams } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0E8388",
    },
  },
});

const ModifyUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    role: "",
    // Add other fields as needed
  });

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/api/user/${id}`,{ headers: authHeader() });
      console.log(result.data)
      setUserData(result.data);
    } catch (error) {
      alert(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/api/user/update/${id}`,
        userData,{ headers: authHeader() }
      );

      if (response.status === 200) {
        // User updated successfully
        setUpdateSuccess(true);
        console.log("User updated successfully!");

        // Redirect to the user list page
        navigate("/afficherUsers");
      } else {
        const errorData = await response.json();
        console.error("User update failed:", errorData);
        // Handle other errors
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      // Handle other errors
    }
  };

  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <ThemeProvider theme={theme}>
            <h1 className="mt-5 ml-5">Modifier Utilisateur</h1>
            <form onSubmit={handleSubmit}>
              <Grid container>
                <Grid item xs>
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      label="Username"
                      type="text"
                      name="username"
                      value={userData.username}
                      onChange={handleChange}
                      required
                      margin="normal"
                    />
                    <TextField
                      label="Email"
                      type="text"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      required
                      margin="normal"
                    />
                    <TextField
                      label="Role"
                      type="text"
                      name="role"
                      value={userData.role}
                      onChange={handleChange}
                      required
                      margin="normal"
                    />
                    {/* Add other fields as needed */}
                  </Box>
                </Grid>
              </Grid>
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
              {updateSuccess && (
              <div style={{ marginTop: "10px", color: "green" }}>
                User updated successfully!
              </div>
            )}
            </form>
          </ThemeProvider>
        </Box>
      </Box>
    </>
  );
};

export default ModifyUser;
