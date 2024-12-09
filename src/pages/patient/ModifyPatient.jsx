import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/shared/Navbar";
import Sidenav from "../../components/shared/Sidenav";
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
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0E8388",
    },
  },
});

const ModifyPatient = () => {
  const { id } = useParams();
  const [patientData, setPatientData] = useState({
    Nom: "",
    Prenom: "",
    sexe: "",
    Adresse:"",
    dateNaissance: "",
    matricule: "",
    aidantPrincipal: "",
    numeroAidantPrincipal: "",
    signatureDocteur: "",
    email:"",
    telephone:""
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/patient/get/${id}`,{ headers: authHeader() } );
        setPatientData(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, [id]);

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
      const response = await  fetch(`http://localhost:3000/api/patient/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'x-access-token': authHeader()['x-access-token']
        },
        body: JSON.stringify(patientData)
      });

      if (response.status === 200) {
        // Patient updated successfully
        setUpdateSuccess(true);
       console.log("Patient updated successfully!");
      } else {
        console.log("Patient update failed:", response.data);
        // Handle other errors
      }
    } catch (error) {
      console.log(`Error in handleSubmit: ${error}`);
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
          <h1>Modifier Patient :</h1>
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
                    <div>
                    <TextField
                      label="Adresse"
                      name="Adresse"
                      type="text"
                      value={patientData.Adresse}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      required
                      />
                    </div>

                    <Box sx={{ m: 1, width: "25ch" }}>
                      <div>
                      <RadioGroup
                      aria-label="sexe"
                      name="sexe"
                      value={patientData.sexe}
                      onChange={handleChange}
                      style={{ flexDirection: 'row' }} // Arrange radio buttons horizontally
                        >
                      <FormControlLabel value="homme" control={<Radio />} label="Homme" />
                      <FormControlLabel value="femme" control={<Radio />} label="Femme" />
                      </RadioGroup>
                      </div>
                    </Box>
                  </Box>

                  <TextField
                    label="Matricule"
                    type="text"
                    name="matricule"
                    value={patientData.matricule}
                    onChange={handleChange}
                    required
                    margin="normal"
                  />
                  <TextField
                    label="Aidant Principal"
                    name="aidantPrincipal"
                    value={patientData.aidantPrincipal}
                    onChange={handleChange}
                    required
                  />
                    <TextField
                    label="Numero Aidant Principal"
                    name="numeroAidantPrincipal"
                    value={patientData.numeroAidantPrincipal}
                    onChange={handleChange}
                    required
                  />
                   <TextField
                      label="Signature Docteur"
                      name="signatureDocteur"
                      value={patientData.signatureDocteur}
                      onChange={handleChange}
                      required   
                    />

                      <TextField
                      label="Email"
                      name="email"
                      value={patientData.email}
                      onChange={handleChange}
                      required
                    />
                    <TextField
                      label="Telephone"
                      name="telephone"
                      value={patientData.telephone}
                      onChange={handleChange}
                      required
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
            {updateSuccess && (
              <div style={{ marginTop: "10px", color: "green" }}>
                Patient updated successfully!
              </div>
            )}
          </form>
        </Box>
      </Box>
    </>
  );
};

export default ModifyPatient;
