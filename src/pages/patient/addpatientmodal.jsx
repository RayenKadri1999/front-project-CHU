




import authHeader from "../../services/auth-header";

import { Box, Button, FormControlLabel, Grid, RadioGroup, TextField ,Radio, styled, Typography, Stack, Alert} from "@mui/material";
import React, { useState } from "react";
import apiServices from "../../services/api-services";



const AddPatientForm = ({handleClose,setSuccessMessage}) => {
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


  const handleChange = (e) => {
    const { name, value } = e.target;

    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    apiServices.handleSubmitModal(e,patientData,"patient",setSuccessMessage,true,handleClose,setError);
   }

 


 


  return (
    <form onSubmit={handleSubmit}>
  {error && <Alert severity="error">{error}</Alert>}
    <Typography variant="h4" gutterBottom> Nouveau Dossier </Typography>
      
        <Grid container spacing={2}>
        <Grid item xs={12}>
        <TextField
                label="Numéro dossier"
                type="text"
                name="_id"
                value={patientData._id}
                onChange={handleChange}
                required
                margin="normal"
                fullWidth
              />
              </Grid>
          <Grid item xs={12}>
           
                <Stack direction="row" spacing={4} alignItems="center" mb={1}>
               
                  <TextField
                    label="Nom"
                    type="text"
                    name="Nom"
                    value={patientData.Nom}
                    onChange={handleChange}
                    required
                    margin="normal"
                    fullWidth
                  />
               

          
                  <TextField
                    label="Prenom"
                    type="text"
                    name="Prenom"
                    value={patientData.Prenom}
                    onChange={handleChange}
                    required
                    margin="normal"
                    fullWidth
                  />
             
             </Stack>
               </Grid>

               <Grid item xs={12}>
           <Stack direction="row" spacing={4} alignItems="center" mb={1}>
                
                  <TextField
                    label="Date de Naissance"
                    name="dateNaissance"
                    type="date"
                    value={patientData.dateNaissance}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                    sx={{ flex: 1 }} // This makes the TextField take up 50% of the width
                  />
                

                    <RadioGroup
                      aria-label="sexe"
                      name="sexe"
                      value={patientData.sexe}
                      fullWidth
                      onChange={handleChange}
                      style={{ flexDirection: "row"  }} // Arrange radio buttons horizontally
                      sx={{ flex: 1 }} // This makes the RadioGroup take up 50% of the width
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
              
                    </Stack>

                </Grid>

                <Grid item xs={12}>
            <Stack direction="row" spacing={4} alignItems="center" mb={1}>

             
              <TextField
                label="Aidant Principal"
                name="aidantPrincipal"
                value={patientData.aidantPrincipal}
                onChange={handleChange}
                required
                    margin="normal"
                fullWidth
              />

<TextField
                label="Numero Aidant Principal"
                name="numeroAidantPrincipal"
                value={patientData.numeroAidantPrincipal}
                onChange={handleChange}
                required
                fullWidth
              />
              </Stack>

</Grid>



              <Grid item xs={12}>
              <Stack direction="row" spacing={4} alignItems="center" mb={1}>
              <TextField
                  label="Email"
                  name="email"
                  value={patientData.email}
                  onChange={handleChange}
                
                  fullWidth
                />
                <TextField
                  label="Téléphone"
                  name="telephone"
                  value={patientData.telephone}
                  onChange={handleChange}
                  
                  fullWidth
                />   
            {/* </Box> */}
    </Stack>

</Grid>
<Grid item xs={12}>
<TextField
                      label="Adresse"
                      name="Adresse"
                      type="text"
                      value={patientData.Adresse}
                      onChange={handleChange}
                     
                      required
                      fullWidth
                      />
          </Grid>
       
          </Grid>
   



  
    <Box  sx={{ display: "flex", justifyContent: "flex-end", gap: 2,mt: 3 }}>
      <Button
       
       type="submit"
       variant="contained"
       color="primary"
      
       
       style={{ marginLeft: "5px" }}
     >
       Créer
     </Button>

 
  <Button
       
       
       variant="contained"
       color="primary"
       onClick={handleClose}
       style={{ marginLeft: "5px" }}
       >
       Annuler
       </Button>  
       </Box>
     
    </form>
    
  );
};

export default AddPatientForm;