// PerfusionOrASLSection.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, FormControlLabel, Checkbox, Stack, Button, Radio, RadioGroup, TextField, Grid, Alert } from '@mui/material';
import { SendIcon } from 'lucide-react';
import axios from 'axios';
import authHeader from '../../../services/auth-header';
import Notifications from '../../../components/shared/Notifications';
import apiServices from "../../../services/api-services";
import SubmitButtons from '../../../components/shared/SubmitButtons';

const PerfusionOrASLSection = ({   id , handleChange2, handleChangecheck }) => {



  
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const SequencePerfusionInitData={
    status:"Non",
     
    Details:[],
    matricule: id,
     }
  const [SequencePerfusionData, setSequencePerfusionData] = useState({
   status:"",
    
   Details:[],
   matricule: id,
    });

    const [checkZone, setCheckZone] = useState({

AucuneG :false,
AucuneD:false,

HypoperfusionG :false,
HypoperfusionD :false,



ATAG :false,
ATAD :false,
FHSG :false,
FHSD :false,


HyperperfusionG :false,
HyperperfusionD :false,


     
    });


    const [isEditable, setIsEditable] = useState(false);


    const toggleEditMode = () => {
      setIsEditable((prev) => !prev);
    };


  
    

  
    useEffect(() => {
      const fetchData = async () => {
      const data = await apiServices.loadDossierDetails(setSequencePerfusionData,"imagerie/sequenceperfusion",setIsDataAvailable,setError,id);
      if(data){
      setCheckZone({
        AucuneD : data.Details.includes("Aucune Droite"),

        AucuneG:data.Details.includes("Aucune Gauche"),

        HypoperfusionG:data.Details.includes("Hypoperfusion Gauche"),
        HypoperfusionD:data.Details.includes("Hypoperfusion Droite"),
        ATAG:data.Details.includes("ATA Gauche"),
        ATAD:data.Details.includes("ATA Droite"),
        FHSG:data.Details.includes("FHS Gauche"),
        FHSD:data.Details.includes("FHS  Droite"),
        HyperperfusionG:data.Details.includes("Hyperperfusion Gauche"),
        HyperperfusionD:data.Details.includes("Hyperperfusion Droite"),
       
    
        


       
      });
    }
      }
      fetchData();
      }, []);
     

      const handleSubmit = (e) => {
        let updatedSequencePerfusionData = SequencePerfusionData;
    
        if (SequencePerfusionData.status === "Non") {
          // update the fileds with initials values 
          updatedSequencePerfusionData = SequencePerfusionInitData;
          setSequencePerfusionData(SequencePerfusionInitData); 
        }
        apiServices.handleSubmit(e,updatedSequencePerfusionData,"imagerie/sequenceperfusion",setSuccessMessage,isDataAvailable,setIsDataAvailable,setIsEditable,setError,id);
       }

    return (

      <form onSubmit={handleSubmit}>
        <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
        <Stack direction="row" spacing={4} alignItems="center">
            <Typography variant="h6">Séquence de perfusion ou ASL</Typography>
           
  {/* Oui / Non Radio Group */}
  <RadioGroup row name="status" defaultValue="Non" value={SequencePerfusionData.status} onChange={(event) => handleChange2(event, setSequencePerfusionData)}>
                <FormControlLabel value="Oui" control={<Radio />} label="Oui"  disabled={!isEditable} />
                <FormControlLabel value="Non" control={<Radio />} label="Non"   disabled={!isEditable}/>
            </RadioGroup>
</Stack>

{error && <Alert severity="error">{error}</Alert>}

{SequencePerfusionData.status =="Oui" &&
  <>
            {/* Anomalie */}

  
      <Typography
      variant='h6'
       sx={{
    
        flexShrink: 0, // Prevents the label from shrinking when the container size changes
      margin:3,
        textAlign: "center", // Center align text within the fixed width
      }}
      >
        Anomalie
      </Typography>





 {/* Checkboxes */}
            <Box sx={{ mt: 2 }}>
        {[
          { label: "Aucune", name: "Aucune" , id:"Aucune"},
          { label: "Hypoperfusion", name: "Hypoperfusion", id:"Hypoperfusion" },
          { label: "ATA", name: "ATA" , id:"ATA"},
          { label: "FHS", name: "FHS", id:"FHS" },
         
          { label: "Hyperperfusion", name: "Hyperperfusion", id:"Hyperperfusion" },
         
        ].map((item, index) => (
          <Stack direction="row" spacing={4} alignItems="center" justifyContent="center" mb={3}>
            <FormControlLabel
              control={
                <Checkbox
                  name={item.name + " Gauche"}
                  disabled={!isEditable}
                  id={item.id + "G"}
                  checked={checkZone[item.id +"G"]}
      onChange={(event) => handleChangecheck(event, SequencePerfusionData,setSequencePerfusionData,setCheckZone,"Details")}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="G" // Label for left checkbox
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
              {item.label}
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  name={item.name + " Droite"}
                  disabled={!isEditable}
                  id={item.id + "D"}
                  checked={checkZone[item.id +"D"]}
                  onChange={(event) => handleChangecheck(event, SequencePerfusionData,setSequencePerfusionData,setCheckZone,"Details")}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="D" // Label for right checkbox
              labelPlacement="end"
            />
        </Stack>
        ))}
      </Box>
      </>}
          
                <SubmitButtons isDataAvailable={isDataAvailable} setIsEditable={setIsEditable} isEditable={isEditable}/>

          {successMessage && (
<Notifications Message={successMessage} setMessage={setSuccessMessage}/>
)}
        </Box>
        </form>
    );
};

export default PerfusionOrASLSection;
