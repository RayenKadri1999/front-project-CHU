import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import apiServices from "../../services/api-services";
import SubmitButtons from "../../components/shared/SubmitButtons";
import Notifications from "../../components/shared/Notifications";

const PatientDetails = ({mode = "Edit"}) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0E8388",
      },
    },
  });

  const { idDossier } = useParams();

  const [isEditable, setIsEditable] = useState(false);
  const [isDataAvailable, setIsDataAvailable] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  const [patientData, setPatientData] = useState({
    numeroDossier: "",
    Nom: "",
    Prenom: "",
    sexe: "",
    Adresse: null,
    dateNaissance: "",
    matricule: null,
    aidantPrincipal: null,
    numeroAidantPrincipal: null,
    signatureDocteur: null,
    email: null,
    telephone: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Define required fields that should never be null
    const requiredFields = ['numeroDossier', 'Nom', 'Prenom', 'sexe', 'dateNaissance'];
    
    // For optional fields, set to null if empty, otherwise use the value
    const processedValue = requiredFields.includes(name) 
      ? value 
      : (value === '' ? null : value);
    
    setPatientData((prevData) => ({
      ...prevData,
      [name]: processedValue,
    }));
  };

  const handleSubmit = (e) => {
    // Filter out null, undefined, and empty string values
    const filteredPatientData = {};
    Object.keys(patientData).forEach(key => {
      if (patientData[key] !== null && patientData[key] !== undefined && patientData[key] !== '') {
        filteredPatientData[key] = patientData[key];
      }
    });

    apiServices.handleSubmit(
        e,
        filteredPatientData,
        "patient",
        setSuccessMessage,
        isDataAvailable,
        setIsDataAvailable,
        setIsEditable,
        setError,
        idDossier
    );
  };

  useEffect(() => {
    apiServices.loadDossierDetails(
        setPatientData,
        "patient",
        setIsDataAvailable,
        setError,
        idDossier
    );
  }, []);

  return (
      <ThemeProvider theme={theme}>
        <Box sx={{ padding: 3 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <Typography variant="h4" gutterBottom>
            Détails du Patient
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                    label="Numéro Dossier"
                    type="text"
                    name="numeroDossier"
                    value={patientData.numeroDossier}
                    onChange={handleChange}
                    disabled={!isEditable}
                    fullWidth
                    margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                    label="Nom"
                    type="text"
                    name="Nom"
                    value={patientData.Nom}
                    onChange={handleChange}
                    disabled={!isEditable}
                    fullWidth
                    margin="normal"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                    label="Prénom"
                    type="text"
                    name="Prenom"
                    value={patientData.Prenom}
                    onChange={handleChange}
                    disabled={!isEditable}
                    fullWidth
                    margin="normal"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                    label="Date de Naissance"
                    name="dateNaissance"
                    type="date"
                    value={patientData.dateNaissance}
                    onChange={handleChange}
                    disabled={!isEditable}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                    label="Adresse"
                    name="Adresse"
                    type="text"
                    value={patientData.Adresse || ''}
                    onChange={handleChange}
                    disabled={!isEditable}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  Sexe
                </Typography>
                <RadioGroup
                    aria-label="sexe"
                    name="sexe"
                    value={patientData.sexe}
                    onChange={handleChange}
                    row
                >
                  <FormControlLabel
                      value="homme"
                      control={<Radio />}
                      label="Homme"
                      disabled={!isEditable}
                  />
                  <FormControlLabel
                      value="femme"
                      control={<Radio />}
                      label="Femme"
                      disabled={!isEditable}
                  />
                </RadioGroup>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                    label="Aidant Principal"
                    name="aidantPrincipal"
                    value={patientData.aidantPrincipal || ''}
                    onChange={handleChange}
                    disabled={!isEditable}
                    fullWidth
                    margin="normal"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                    label="Numero Aidant Principal"
                    name="numeroAidantPrincipal"
                    value={patientData.numeroAidantPrincipal || ''}
                    onChange={handleChange}
                    disabled={!isEditable}
                    fullWidth
                    margin="normal"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                    label="Téléphone"
                    name="telephone"
                    value={patientData.telephone || ''}
                    onChange={handleChange}
                    disabled={!isEditable}
                    fullWidth
                    margin="normal"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                    label="Email"
                    name="email"
                    value={patientData.email || ''}
                    onChange={handleChange}
                    disabled={!isEditable}
                    fullWidth
                    margin="normal"
                />
              </Grid>
            </Grid>

            <SubmitButtons
                isDataAvailable={isDataAvailable}
                setIsEditable={setIsEditable}
                isEditable={isEditable}
                
            />

            {successMessage && (
                <Notifications
                    Message={successMessage}
                    setMessage={setSuccessMessage}
                />
            )}
          </form>
        </Box>
      </ThemeProvider>
  );
};

export default PatientDetails;
