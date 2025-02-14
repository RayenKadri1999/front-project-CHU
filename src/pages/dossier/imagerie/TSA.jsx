// TSASection.js

import React, { useEffect, useState } from 'react';
import { Box, Typography, FormControlLabel, Checkbox, Stack, Button, Radio, RadioGroup, TextField, Grid, Alert } from '@mui/material';
import { SendIcon } from 'lucide-react';
import axios from 'axios';
import authHeader from '../../../services/auth-header';
import Notifications from '../../../components/shared/Notifications';
import apiServices from "../../../services/api-services";
import SubmitButtons from '../../../components/shared/SubmitButtons';
const TSASection = ({ id,handleChange2, handleChangecheck }) => {


  const TSADataInit ={
    status: "Non",
  
    matricule: id,

    AnomalieGauche:"",
    AnomalieDroite:"",
  };
  const [TSAData, setTSAData] = useState({
    status:"",
    AnomalieGauche:"",
    AnomalieDroite:"",
    matricule: id,
    
    });

    const [isDataAvailable, setIsDataAvailable] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [isEditable, setIsEditable] = useState(false);


    const toggleEditMode = () => {
      setIsEditable((prev) => !prev);
    };

    



  useEffect(() => {
    
    apiServices.loadDossierDetails(setTSAData,"imagerie/tsa",setIsDataAvailable,setError,id);
    
    }, []);
   

    const handleSubmit = (e) => {
      let updatedTSAData = TSAData;
    
    if (TSAData.status === "Non") {
      // update the fileds with initials values 
      updatedTSAData = TSADataInit;
      setTSAData(TSADataInit); 
    }
      apiServices.handleSubmit(e,updatedTSAData,"imagerie/tsa",setSuccessMessage,isDataAvailable,setIsDataAvailable,setIsEditable,setError,id);
     }


    return (

      
    <form onSubmit={handleSubmit}>
        <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
        <Stack direction="row" spacing={4} alignItems="center">
            <Typography variant="h6">TSA</Typography>
          
            {/* Oui / Non Radio Group */}
            <RadioGroup row name="status" defaultValue="Non" value={TSAData.status} onChange={(event) => handleChange2(event, setTSAData)}>
                <FormControlLabel value="Oui" control={<Radio />} label="Oui"   disabled={!isEditable}/>
                <FormControlLabel value="Non" control={<Radio />} label="Non"  disabled={!isEditable} />
            </RadioGroup>
</Stack>
{error && <Alert severity="error">{error}</Alert>}

{TSAData.status =="Oui" &&
  <>
        
{/* Anomalie */}

    
      <Typography
        variant='h6'
        sx={{


          flexShrink: 0, // Prevents the label from shrinking when the container size changes
          margin: 3,
          textAlign: "center", // Center align text within the fixed width
        }}
      >
        Anomalie
      </Typography>




      <Stack direction="row" spacing={4} alignItems="center" justifyContent="center" mb={1}>
  <RadioGroup
    
    name="AnomalieGauche"
    value={TSAData.AnomalieGauche}
    onChange={(event) => handleChange2(event, setTSAData)}
  >
    {[
  { value: "Aucune", label: "G" },
  { value: "Non significative (<50%)", label: "G" },
  { value: "Significative (>50%)", label: "G" },
  { value: "Occlusion", label: "G" },
  { value: "Aspect dysplasique", label: "G" },
        { value: "Artère carotidienne", label: "G" },
        { value: "Artère vertébrale", label: "G" }
].map((option, index) => (
      <FormControlLabel
        key={index}
        value={option.value}

        control={<Radio />}
        label={option.label}
        disabled={!isEditable}
      />
    ))}
  </RadioGroup>
  <Stack direction="column" spacing={2} alignItems="center">
  {[
     "Aucune",
  "Non significative (<50%)",
  "Significative (>50%)",
  "Occlusion",
  "Aspect dysplasique",
      "Artère cartidienne ",
      "Artère Vertébrale "
 
].map((label, index) => (
    <Typography
      key={index}
      sx={{
        flexShrink: 0, // Prevents the label from shrinking when the container size changes
        width: "280px", // Fixed width for label text
        textAlign: "center" // Center align text within the fixed width
      }}
    >
      {label}
    </Typography>
  ))}
</Stack>
<RadioGroup
    
    name="AnomalieDroite"
    value={TSAData.AnomalieDroite}
    onChange={(event) => handleChange2(event, setTSAData)}
  >
    {[
  { value: "Aucune", label: "D" },
  { value: "Non significative (<50%)", label: "D" },
  { value: "Significative (>50%)", label: "D" },
  { value: "Occlusion", label: "D" },
  { value: "Aspect dysplasique", label: "D" },
        { value: "Artère carotidienne", label: "D" },
        { value: "Artère vertébrale", label: "D" }
].map((option, index) => (
      <FormControlLabel
        key={index}
        value={option.value}
        control={<Radio />}
        required
        label={option.label}
        disabled={!isEditable}
      />
    ))}
  </RadioGroup>

</Stack>
</>
}

           
      <SubmitButtons isDataAvailable={isDataAvailable} setIsEditable={setIsEditable} isEditable={isEditable}/>
          {successMessage && (
<Notifications Message={successMessage} setMessage={setSuccessMessage}/>
)}
        </Box>
        </form>
    );
};

export default TSASection;
