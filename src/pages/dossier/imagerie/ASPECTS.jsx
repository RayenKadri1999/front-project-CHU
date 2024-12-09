// AspectsSection.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, FormControlLabel, Checkbox, Stack, Button, TextField, Alert } from '@mui/material';
import { SendIcon } from 'lucide-react';
import authHeader from '../../../services/auth-header';
import axios from 'axios';
import Notifications from '../../../components/shared/Notifications';
import apiServices from "../../../services/api-services";
import SubmitButtons from '../../../components/shared/SubmitButtons';
import PdfButton from "../../../components/shared/PdfButton";

const AspectsSection = ({ id ,handleChange2 ,handleChangecheck }) => {


  const [AspectsData, setAspectsData] = useState({
  
    AspectsNumber:"",
    AspectsDetails:[],
    matricule: id,
    });

    const [checkZone, setCheckZone] = useState({


      
      ProfondD :false,
      ProfondG :false,
      SuperficielAntérieurD : false,
      SuperficielAntérieurG : false,
      SuperficielPostérieurD : false,
      SuperficielPostérieurG : false,
     
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
const [isDataAvailable, setIsDataAvailable] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const toggleEditMode = () => {
        setIsEditable((prev) => !prev);
      };

      useEffect(() => {
      const fetchData = async () => {
      const data = await apiServices.loadDossierDetails(setAspectsData,"imagerie/aspects",setIsDataAvailable,setError,id);
      if(data){
      setCheckZone({
          ProfondD : data.AspectsDetails.includes("Profond Droite"),
          ProfondG:data.AspectsDetails.includes("Profond Gauche"),
          SuperficielAntérieurG:data.AspectsDetails.includes("Superficiel Antérieur Gauche"),
          SuperficielAntérieurD:data.AspectsDetails.includes("Superficiel Antérieur Droite"),
          SuperficielPostérieurG:data.AspectsDetails.includes("Superficiel Postérieur Gauche"),
          SuperficielPostérieurD:data.AspectsDetails.includes("Superficiel Postérieur Droite"),
      
        });
      }
      }
      fetchData();
      }, []);
     

      const handleSubmit = (e) => {
        apiServices.handleSubmit(e,AspectsData,"imagerie/aspects",setSuccessMessage,isDataAvailable,setIsDataAvailable,setIsEditable,setError,id);
       }
      
      
      
     
      
    
    
  return (

    <form onSubmit={handleSubmit}>
    <Box mb={3}  sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
            <Typography variant="h6">ASPECTS
                <PdfButton pdfUrl="/pdf/Aspect.pdf"  />
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
                required
                type="number"
                name="AspectsNumber"
                
                value={AspectsData.AspectsNumber}
                onChange={(event) => handleChange2(event, setAspectsData)}
                disabled={!isEditable}
              />
        
            <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "16px", // Adjust spacing as needed
        }}
      >
            

{/* Double Checkboxes */}

<Typography
        sx={{
          
          marginRight: "80px",
          marginLeft: "8px",
          flexShrink: 0, // Prevents the label from shrinking when the container size changes
          width: "200px", // Fixed width for label text
          textAlign: "center", // Center align text within the fixed width
        }}
      >
       Artère Cérébrale Moyenne
      </Typography>

</Box>
<Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "16px", // Adjust spacing as needed
        }}
      >
            

{/* Double Checkboxes */}
<FormControlLabel
  control={
    <Checkbox
    
      name="Profond Gauche"
      disabled={!isEditable}
      id="ProfondG"
      checked={checkZone.ProfondG}
      onChange={(event) => handleChangecheck(event, AspectsData,setAspectsData,setCheckZone,"AspectsDetails")}
      inputProps={{ "aria-label": "controlled" }}
    />
  }
  label="G" // Label for first checkbox
  labelPlacement="end"
/>

<Typography
        sx={{
          marginRight: "80px",
          marginLeft: "8px",
          flexShrink: 0, // Prevents the label from shrinking when the container size changes
          width: "200px", // Fixed width for label text
          textAlign: "center", // Center align text within the fixed width
        }}
      >
       Profond
      </Typography>

<FormControlLabel
  control={
    <Checkbox
      name="Profond Droite"
      disabled={!isEditable}
      id="ProfondD"
      checked={checkZone.ProfondD}
      onChange={(event) => handleChangecheck(event, AspectsData,setAspectsData,setCheckZone,"AspectsDetails")}
      inputProps={{ "aria-label": "controlled" }}
    />
  }
  label="D" // Label for second checkbox
  labelPlacement="end"
/>
</Box>

<Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "16px", // Adjust spacing as needed
        }}
      >
            

{/* Double Checkboxes */}
<FormControlLabel
  control={
    <Checkbox
    
      name="Superficiel Antérieur Gauche"
      disabled={!isEditable}
      id="SuperficielAntérieurG"
      checked={checkZone.SuperficielAntérieurG}
      onChange={(event) => handleChangecheck(event, AspectsData,setAspectsData,setCheckZone,"AspectsDetails")}
      inputProps={{ "aria-label": "controlled" }}
    />
  }
  label="G" // Label for first checkbox
  labelPlacement="end"
/>

<Typography
        sx={{
          marginRight: "80px",
          marginLeft: "8px",
          flexShrink: 0, // Prevents the label from shrinking when the container size changes
          width: "200px", // Fixed width for label text
          textAlign: "center", // Center align text within the fixed width
        }}
      >
        Superficiel Antérieur
      </Typography>

<FormControlLabel
  control={
    <Checkbox
      name="Superficiel Antérieur Droite"
      disabled={!isEditable}
      id="SuperficielAntérieurD"
      checked={checkZone.SuperficielAntérieurD}
      onChange={(event) => handleChangecheck(event, AspectsData,setAspectsData,setCheckZone,"AspectsDetails")}
      inputProps={{ "aria-label": "controlled" }}
    />
  }
  label="D" // Label for second checkbox
  labelPlacement="end"
/>
</Box>

<Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "16px", // Adjust spacing as needed
        }}
      >
            

{/* Double Checkboxes */}
<FormControlLabel
  control={
    <Checkbox
    
      name="Superficiel Postérieur Gauche"
      disabled={!isEditable}
      id="SuperficielPostérieurG"
      checked={checkZone.SuperficielPostérieurG}
      onChange={(event) => handleChangecheck(event, AspectsData,setAspectsData,setCheckZone,"AspectsDetails")}
      inputProps={{ "aria-label": "controlled" }}
    />
  }
  label="G" // Label for first checkbox
  labelPlacement="end"
/>

<Typography
        sx={{
          marginRight: "80px",
          marginLeft: "8px",
          flexShrink: 0, // Prevents the label from shrinking when the container size changes
          width: "200px", // Fixed width for label text
          textAlign: "center", // Center align text within the fixed width
        }}
      >
       Superficiel Postérieur
      </Typography>

<FormControlLabel
  control={
    <Checkbox
      name="Superficiel Postérieur Droite"
      disabled={!isEditable}
      id="SuperficielPostérieurD"
      checked={checkZone.SuperficielPostérieurD}
      onChange={(event) => handleChangecheck(event, AspectsData,setAspectsData,setCheckZone,"AspectsDetails")}
      inputProps={{ "aria-label": "controlled" }}
    />
  }
  label="D" // Label for second checkbox
  labelPlacement="end"
/>
</Box>

    <SubmitButtons isDataAvailable={isDataAvailable} setIsEditable={setIsEditable} isEditable={isEditable}/>
          {successMessage && (
<Notifications Message={successMessage} setMessage={setSuccessMessage}/>
)}
          </Box>

          </form>
  );
};

export default AspectsSection;
