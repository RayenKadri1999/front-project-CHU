




import authHeader from "../../services/auth-header";
 import axios from 'axios';
import { Box, Button, FormControlLabel, Grid, RadioGroup, TextField ,Radio, styled, Typography, Stack, Alert} from "@mui/material";
import React, { useEffect, useState } from "react";
import apiServices from "../../services/api-services";
import SubmitButtons from "../../components/shared/SubmitButtons";



const DetailsPatientForm = ({handleClose,setSuccessMessage,idDossier}) => {
  const [patientData, setPatientData] = useState({
    Nom: "",
    Prenom: "",
    sexe: "",
    email:"",
    telephone:"",
    dateNaissance: "",
    Adresse: "",
    aidantPrincipal: "",
    numeroAidantPrincipal: "",
    _id:"",
  });
  const [error, setError] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [isDataAvailable, setIsDataAvailable] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    
    apiServices.loadDossierDetails(setPatientData,"patient",setIsDataAvailable,setError,idDossier)
  }, []);

  



  const handleSubmit = (e) => {
    apiServices.handleSubmitModal(e,patientData,"patient",setSuccessMessage,false,handleClose,setError,idDossier);
   }
 


  return (
    <form onSubmit={handleSubmit}>
  {error && <Alert severity="error">{error}</Alert>}
    <Typography variant="h4" gutterBottom> Details Dossier </Typography>
      
   
     
      
      <Grid container spacing={1}>
      <Grid item xs={12} >
          <TextField
            label="Numéro Dossier"
          
            name="_id"
            required
            onChange={handleChange}
            value={patientData._id}
            disabled={!isEditable}
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} >
        <Stack direction="row" spacing={4} alignItems="center" mb={1}>
        
          <TextField
            label="Nom"
            onChange={handleChange}
            required
            name="Nom"
            value={patientData.Nom}
            disabled={!isEditable}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        
          <TextField
            label="Prénom"
            onChange={handleChange}
            name="Prenom"
            required
            value={patientData.Prenom}
            disabled={!isEditable}
            fullWidth
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
      

</Stack>
</Grid>
<Grid item xs={12} >
<Stack direction="row" spacing={4} alignItems="center" mb={1}>

          <TextField
            label="Date de Naissance"
            name="dateNaissance"
            required
            type="date"
            onChange={handleChange}
            value={patientData.dateNaissance}
            disabled={!isEditable}
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
          />
       
          <TextField
            label="Adresse"
            name="Adresse"
            required
            onChange={handleChange}
            value={patientData.Adresse}
            disabled={!isEditable}
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
          />
      
</Stack>
</Grid>
<Grid item xs={12} >
<Stack direction="row" spacing={4} alignItems="center" mb={1}>
        
      
        
          <RadioGroup
            aria-label="sexe"
            name="sexe"
            required
            fullWidth
            onChange={handleChange}
            style={{ flexDirection: "row"  }} 
            sx={{ flex: 1 }} 
            value={patientData.sexe}
            row
          >
            <FormControlLabel value="homme" control={<Radio />} label="Homme" disabled={!isEditable} />
            <FormControlLabel value="femme" control={<Radio />} label="Femme" disabled={!isEditable} />
          </RadioGroup>
          <TextField
            label="Téléphone"
            name="telephone"
            value={patientData.telephone}
            disabled={!isEditable}
            fullWidth
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1 }} // This makes the TextField take up 50% of the width
            margin="normal"
          />
         
      
        </Stack>
        </Grid>

        <Grid item xs={12}>
          
        <Stack direction="row" spacing={4} alignItems="center" mb={1}>
        <TextField
            label="Aidant Principal"
            name="aidantPrincipal"
            value={patientData.aidantPrincipal}
           disabled={!isEditable}
            fullWidth
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
          <TextField
            label="Numero Aidant Principal"
            name="numeroAidantPrincipal"
            value={patientData.numeroAidantPrincipal}
            disabled={!isEditable}
            fullWidth
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
       
     
       
        </Stack>
        </Grid>

        <Grid item xs={12} >
        <Stack direction="row" spacing={4} alignItems="center" mb={1}>
          <TextField
            label="Email"
            name="email"
            value={patientData.email}
            disabled={!isEditable}
            fullWidth
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
       
        </Stack>

        </Grid>


      </Grid>
   
   



  
    {isDataAvailable && 
<SubmitButtons isDataAvailable={isDataAvailable} setIsEditable={setIsEditable} isEditable={isEditable}/>
     }
    </form>
    
  );
};

export default DetailsPatientForm;


// import React, { useEffect, useState } from 'react';
// import { Box, Grid, TextField, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import authHeader from '../../services/auth-header';
// import { createTheme, ThemeProvider } from "@mui/material/styles";
