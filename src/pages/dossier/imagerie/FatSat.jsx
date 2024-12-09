// FatSatSection.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, FormControlLabel, Checkbox, Stack, Button, Radio, RadioGroup, TextField, Grid, Alert } from '@mui/material';
import { SendIcon } from 'lucide-react';
import axios from 'axios';
import authHeader from '../../../services/auth-header';
import Notifications from '../../../components/shared/Notifications';
import apiServices from "../../../services/api-services";
import SubmitButtons from '../../../components/shared/SubmitButtons';

const FatSatSection = ({ id, handleChange2, handleChangecheck }) => {
  const [isDataAvailable, setIsDataAvailable] = useState(false);


  const fat_SATDataInit ={
    status: "Normal",
  
    matricule: id,

    AnomalieGauche:"",
    AnomalieDroite:"",
  };
  const [fat_SATData, setFat_SATData] = useState({
    status: "",
  
    matricule: id,

    AnomalieGauche:"",
    AnomalieDroite:"",


  });




  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const toggleEditMode = () => {
    setIsEditable((prev) => !prev);
  };








  useEffect(() => {

    apiServices.loadDossierDetails(setFat_SATData, "imagerie/fatsat", setIsDataAvailable, setError, id);

  }, []);


  const handleSubmit = (e) => {
    let updatedFat_SATData = fat_SATData;
    
    if (fat_SATData.status === "Normal") {
      // update the fileds with initials values 
      updatedFat_SATData = fat_SATDataInit;
      setFat_SATData(fat_SATDataInit); 
    }
    apiServices.handleSubmit(e, updatedFat_SATData, "imagerie/fatsat", setSuccessMessage, isDataAvailable,setIsDataAvailable, setIsEditable, setError, id);
  }


  return (


    <form onSubmit={handleSubmit}>
      <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>

        <Stack direction="row" spacing={4} alignItems="center">
          <Typography variant="h6">Fat-SAT</Typography>


          {/* Normal / Anormal Radio Group */}
          <RadioGroup row name="status" defaultValue="Normal" value={fat_SATData.status} onChange={(event) => handleChange2(event, setFat_SATData)}>
            <FormControlLabel value="Normal" control={<Radio />} label="Normal"   disabled={!isEditable}/>
            <FormControlLabel value="Anormal" control={<Radio />} label="Anormal"   disabled={!isEditable}/>
          </RadioGroup>
        </Stack>
        {error && <Alert severity="error">{error}</Alert>}

{fat_SATData.status =="Anormal" &&
<>
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
    value={fat_SATData.AnomalieGauche}
    onChange={(event) => handleChange2(event, setFat_SATData)}
  >
    {[
   { value: "Aucune", label: "G" },
   { value: "Hématome de paroi / dissection", label: "G" },
   { value: "Doute sur une hémorrage intraplaque", label: "G" },
      { value: "Artère cartidienne ", label: "G" },
      { value: "Artère Vertébrale ", label: "G" },
].map((option, index) => (
      <FormControlLabel
        key={index}
        required
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
  "Hématome de paroi / dissection",
  "Doute sur une hémorrage intraplaque",
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
    value={fat_SATData.AnomalieDroite}
    onChange={(event) => handleChange2(event, setFat_SATData)}
  >
    {[
      { value: "Aucune", label: "D" },
      { value: "Hématome de paroi / dissection", label: "D" },
      { value: "Doute sur une hémorrage intraplaque", label: "D" },
      { value: "Artère cartidienne ", label: "D" },
      { value: "Artère Vertébrale ", label: "D" },
].map((option, index) => (
      <FormControlLabel
        key={index}
        value={option.value}
        required
        control={<Radio />}
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
          <Notifications Message={successMessage} setMessage={setSuccessMessage} />
        )}
      </Box>
    </form>
  );
};

export default FatSatSection;
