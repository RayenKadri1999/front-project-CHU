import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidenav from "../../components/shared/Sidenav";
import Navbar from "../../components/shared/Navbar";
import "../../App.css";
import authHeader from "../../services/auth-header";
import {
  Box,
  Grid,
  RadioGroup,
  TextField,
  Stack,
  createTheme,
  ThemeProvider,
  Button,
  FormControlLabel,
  Radio,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0E8388",
    },
  },
});

const PatientForm = () => {
  const navigate = useNavigate();
  
  const [patientData, setPatientData] = useState({
    Nom: "",
    Prenom: "",
    sexe: "",
    dateNaissance: "",
    _id: "",
    aidantPrincipal: "",
    numeroAidantPrincipal: "",
    signatureDocteur: "",
  });
  const [createSuccess, setCreateSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/patient/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": authHeader()["x-access-token"],
        },
        body: JSON.stringify(patientData),
      });

      if (response.status === 201) {
        toast.success("Patient created successfully!", { position: "top-right" });
        setCreateSuccess(true);

        // Clear the form after success
        setPatientData({
          Nom: "",
          Prenom: "",
          sexe: "",
          dateNaissance: "",
          _id: "",
          aidantPrincipal: "",
          numeroAidantPrincipal: "",
          signatureDocteur: "",
        });

        // Delay for 2 seconds before navigating
        setTimeout(() => {
          navigate(`/afficherHospitalisations/${encodeURIComponent(patientData._id)}`);
        }, 2000);
      } else {
        const errorData = await response.json();
        console.error("Patient creation failed:", errorData);
        toast.error(`Failed to create patient: ${errorData.message || "An error occurred"}`, {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error("An unexpected error occurred. Please try again later.", {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <ToastContainer />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Nouveau patient :</h1>
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
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <div>
                      <TextField
                        label="Nom"
                        type="text"
                        name="Nom"
                        value={patientData.Nom}
                        onChange={handleChange}
                        required
                        margin="normal"
                      />
                    </div>
                    <div>
                      <TextField
                        label="Prénom"
                        type="text"
                        name="Prenom"
                        value={patientData.Prenom}
                        onChange={handleChange}
                        required
                        margin="normal"
                      />
                    </div>
                    <div>
                      <TextField
                        label="Date de Naissance"
                        name="dateNaissance"
                        type="date"
                        value={patientData.dateNaissance}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        required
                      />
                    </div>
                    <Box sx={{ m: 1, width: "25ch" }}>
                      <RadioGroup
                        aria-label="sexe"
                        name="sexe"
                        value={patientData.sexe}
                        onChange={handleChange}
                        style={{ flexDirection: "row" }}
                      >
                        <FormControlLabel
                          value="homme"
                          control={<Radio />}
                          label="Homme"
                        />
                        <FormControlLabel
                          value="femme"
                          control={<Radio />}
                          label="Femme"
                        />
                      </RadioGroup>
                    </Box>
                  </Box>
                  <TextField
                    label="Numéro de dossier"
                    type="text"
                    name="_id"
                    value={patientData._id}
                    onChange={handleChange}
                    required
                    margin="normal"
                  />
                  <TextField
                    label="Aidant Principal"
                    name="aidantPrincipal"
                    value={patientData.aidantPrincipal}
                    onChange={handleChange}
                    
                  />
                  <TextField
                    label="Numero Aidant Principal"
                    name="numeroAidantPrincipal"
                    value={patientData.numeroAidantPrincipal}
                    onChange={handleChange}
                    
                  />
                  <TextField
                    label="Signature Docteur"
                    name="signatureDocteur"
                    value={patientData.signatureDocteur}
                    onChange={handleChange}
                  />
                </Box>
              </Grid>
            </Grid>
            <ThemeProvider theme={theme}>
              <Stack direction="row" spacing={2}>
                <div style={{ marginLeft: "auto" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                    className="button"
                  >
                    Enregistrer
                  </Button>{" "}
                </div>
              </Stack>
            </ThemeProvider>
            {createSuccess && (
              <div style={{ marginTop: "10px", color: "green" }}>
                Patient créé avec succès !
              </div>
            )}
          </form>
        </Box>
      </Box>
    </>
  );
};

export default PatientForm;
