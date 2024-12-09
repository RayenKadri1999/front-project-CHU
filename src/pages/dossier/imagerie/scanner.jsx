// ScannerSection.js
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Stack,
  Button,
  Radio,
  RadioGroup,
  TextField,
  FormControl,
  FormLabel,
  Grid,
  Alert,
  Checkbox,
  Select, MenuItem
} from '@mui/material';
import { SendIcon } from 'lucide-react';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import authHeader from '../../../services/auth-header';
import { CheckBox, Description } from '@mui/icons-material';
import Notifications from '../../../components/shared/Notifications';
import apiServices from "../../../services/api-services";
import SubmitButtons from '../../../components/shared/SubmitButtons';
import PdfButton from "../../../components/shared/PdfButton";

const ScannerSection = ({ id, handleChange2 }) => {


  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [checkZone, setCheckZone] = useState({
    troncbasilaire :false,   
  });
  const scannerDataInit = {
    status: "Non",
    DateScanner: "",
   
    AngioscanTSA_Willis:"",
    Occlusin:"",
    Stenose:"",
    stenoseRatio: '',

    Description:"",

    ACGauche:"",
    ACDroite:"",
     
    troncbasilaire:"non",

    AVGauche:"",
    AVDroite:"",
   

    AngioTSAGacuhe :"",
    AngioTSADroite:"",
   

    matricule: id,

  };
  const [scannerData, setScannerData] = useState({
    status: "",
    DateScanner: new Date(),
   
    AngioscanTSA_Willis:"",
    Occlusin:"",
    Stenose:"",
    StenosePercent: "",
    Description:"",
    Score: 0,
    ACGauche:"",
    ACDroite:"",
     
    troncbasilaire:"non",

    AVGauche:"",
    AVDroite:"",

    AngioWillisGauche:"",
    AngioWillisDroite:"",


    matricule: id,

  });
  const toggleEditMode = () => {
    setIsEditable((prev) => !prev);
  };



  useEffect(() => {
    const fetchData = async () => {
      const data = await apiServices.loadDossierDetails(setScannerData,"imagerie/scanner",setIsDataAvailable,setError,id)
      if(data){
      setCheckZone({
      troncbasilaire : data.troncbasilaire ==="oui",
    });
  }
}
fetchData();
  }, []);

  const handleSubmit = (e) => {
    let updatedScannerData = scannerData;
    
    if (scannerData.status === "Non") {
      // update the fileds with initials values 
      updatedScannerData = scannerDataInit;
      setScannerData(scannerDataInit); 
    }else if (scannerData.AngioscanTSA_Willis === "Normal") {
      updatedScannerData.Occlusin_sténose = "";
        updatedScannerData.ACGauche = "";
        updatedScannerData.ACDroite = "";
        updatedScannerData.troncbasilaire = "non"; // Assuming this is fixed as "non"
        updatedScannerData.AVGauche = "";
        updatedScannerData.AVDroite = "";
        updatedScannerData.AngioTSAGacuhe = "";
        updatedScannerData.AngioTSADroite = "";
        setScannerData(updatedScannerData); 
        setCheckZone((prevData) => ({
          ...prevData,
          troncbasilaire: false,
      }));
    }
    // Use updatedScannerData instead of the state directly
    apiServices.handleSubmit(e, updatedScannerData, "imagerie/scanner", setSuccessMessage, isDataAvailable,setIsDataAvailable, setIsEditable, setError, id);
}
  const handleChangeDate = (name) => (value) => {
    const updatedDateTime = dayjs(scannerData[name])
      .set("year", value.year())
      .set("month", value.month())
      .set("date", value.date());
    setScannerData((prevData) => ({
      ...prevData,
      [name]: updatedDateTime,
    }));
  };

  const handleChangeTime = (name) => (value) => {
    const updatedDateTime = dayjs(scannerData[name])
      .set("hour", value.hour())
      .set("minute", value.minute());
      setScannerData((prevData) => ({
      ...prevData,
      [name]: updatedDateTime,
    }));
  };

  const handleChangecheck = (e) => {
    const { name, checked } = e.target;
    

    if (checked) {
      setCheckZone((prevData) => ({
            ...prevData,
            [name]: true,
        }));

        // Update the key in imagerieData with the new name added
       

        setScannerData((prevData) => ({
            ...prevData,
            [name]: "oui",
        }));
    } else {
      setCheckZone((prevData) => ({
            ...prevData,
            [name]: false,
        }));

     

        setScannerData((prevData) => ({
            ...prevData,
            [name]: "non",
        }));
    }
};

  return (
    <form onSubmit={handleSubmit}>
    <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
    <Stack direction="row" spacing={4} alignItems="center">
      <Typography variant="h6">Scanner</Typography>
     
 {/* Oui / Non Radio Group */}
 <RadioGroup row name="status" defaultValue="Non" value={scannerData.status}    onChange={(event) => handleChange2(event, setScannerData)}>
                <FormControlLabel value="Oui" control={<Radio />} label="Oui" disabled={!isEditable} />
                <FormControlLabel value="Non" control={<Radio />} label="Non" disabled={!isEditable} />
            </RadioGroup>
            
</Stack>
{error && <Alert severity="info">{error}</Alert>}
{scannerData.status == "Oui" &&
<>
      {/* Scanner Date */}
      <Box sx={{ display:"flex", mt: 2,mb:3 }}> 
      <Grid container spacing={1}>
      <Grid item xs={6}>
        <LocalizationProvider  dateAdapter={AdapterDayjs}>
        
          <DatePicker
            label="effectué le"
            fullwidth
            required
             format="DD/MM/YYYY"
            value={dayjs(scannerData.DateScanner)}
            onChange={handleChangeDate('DateScanner')}
            renderInput={(params) => <TextField {...params} />}
            disabled={!isEditable}
            sx={{display:"flex"}}
          />
            
        </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="à"
                  required
                  value={dayjs(scannerData.DateScanner)}
                onChange={handleChangeTime("DateScanner")}
                disabled={!isEditable}
                sx={{display:"flex"}}
                />
                 </LocalizationProvider>
                 </Grid>
                 <Grid item xs={12}>
                 <TextField
                label="Description"
              
                name="Description"
                fullWidth
                sx={{ mt: 2 }}
                value={scannerData.Description}
                onChange={(event) => handleChange2(event, setScannerData)}
                disabled={!isEditable}
              />
              </Grid>
      </Grid>
      </Box>
  <Box sx={{ mt: 3 }}>
      <Grid item xs={12}>
        <FormControl fullWidth
                     label="Score">

          <Select
              label="Score"
              labelId="score-select-label"
              id="score-select"
              value={scannerData.Score || ''}
              onChange={(event) => setScannerData(prev => ({ ...prev, Score: event.target.value }))}
              disabled={!isEditable}
              displayEmpty

          >

            <MenuItem value="" disabled>
               Score Aspect


            </MenuItem>
            <PdfButton pdfUrl="/pdf/score_aspect.pdf"  />

            {[...Array(11).keys()].map((score) => (

                <MenuItem key={score} value={score}>
                  {score}
                </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

  </Box>




{/* AngioscanTSA Willis Section */}
      <Stack direction="row" spacing={4} alignItems="center" mb={5}>
       
        
      <Typography 
        variant='h6'
          sx={{
        
          flexShrink: 0, // Prevents the label from shrinking when the container size changes
         
          textAlign: "center", // Center align text within the fixed width
        }}>Angioscan TSA+Willis</Typography>

        <RadioGroup
            row
            value={scannerData.AngioscanTSA_Willis}
            name="AngioscanTSA_Willis"
            onChange={(event) => handleChange2(event, setScannerData)}
          >
            <FormControlLabel value="Normal" control={<Radio />} label="Normal" disabled={!isEditable}     required />
            <FormControlLabel value="Anormal" control={<Radio />} label="Anormal" disabled={!isEditable}     required />
          </RadioGroup>
 </Stack>
 {scannerData.AngioscanTSA_Willis == "Anormal" &&
 <>
      {/* occlusion */}
      <Stack direction="column" spacing={1} alignItems="center" justifyContent="center" mb={4}>
      
        <Typography 
        variant='h6'
          sx={{
        
          flexShrink: 0, // Prevents the label from shrinking when the container size changes
         
          textAlign: "center", // Center align text within the fixed width
        }}>Occlusin </Typography>
        
            <RadioGroup
                row
                name="Occlusin"
                value={scannerData.Occlusin}
                onChange={(event) => handleChange2(event, setScannerData)}
                sx={{
                 
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "24px", // Space between the radio buttons for better visual separation
                }}
              >

                <FormControlLabel
                  value="Oui"
                  control={<Radio />}
                  label="Oui"
                  disabled={!isEditable}
                />
                <FormControlLabel
                  value="Non"
                  control={<Radio />}
                  label="Non"
                  disabled={!isEditable}
                />

              </RadioGroup>
   </Stack>
   <Stack direction="column" spacing={1} alignItems="center" justifyContent="center" mb={4}>

     <Typography
         variant='h6'
         sx={{

           flexShrink: 0, // Prevents the label from shrinking when the container size changes

           textAlign: "center", // Center align text within the fixed width
         }}>Sténose </Typography>

     <RadioGroup
         row
         name="Stenose"
         value={scannerData.Stenose}
         onChange={(event) => handleChange2(event, setScannerData)}         sx={{

           display: "flex",
           justifyContent: "center",
           alignItems: "center",
           gap: "24px", // Space between the radio buttons for better visual separation
         }}
     >

       <FormControlLabel
           value="Oui"
           control={<Radio />}
           label="Oui"
           disabled={!isEditable}
       />
       <FormControlLabel
           value="Non"
           control={<Radio />}
           label="Non"
           disabled={!isEditable}
       />

     </RadioGroup>
   </Stack>
   {scannerData.Stenose === "Oui" && (
       <Stack direction="column" spacing={1} alignItems="center" justifyContent="center" mb={4}>
         <RadioGroup
             row
             name="StenosePercent"
             value={scannerData.StenosePercent}
             onChange={(event) => handleChange2(event, setScannerData)}
             sx={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               gap: "24px",
             }}
         >
           <FormControlLabel
               value=">50%"
               control={<Radio />}
               label=">50%"
               disabled={!isEditable}
           />
           <FormControlLabel
               value="<50%"
               control={<Radio />}
               label="<50%"
               disabled={!isEditable}
           />
         </RadioGroup>
       </Stack>
   )}


   <Stack direction="column" spacing={1} alignItems="center" justifyContent="center" mb={1}>
     <Typography
         variant='h6'
         sx={{

           flexShrink: 0, // Prevents the label from shrinking when the container size changes
           marginBottom:2,
           marginTop:4,
           textAlign: "center", // Center align text within the fixed width
         }}
     >
       Angio de polygone de Willis
     </Typography>

     <Stack direction="row" spacing={4} alignItems="center" justifyContent="center" >
       <RadioGroup

           name="AngioWillisGacuhe"
           value={scannerData.AngioWillisGauche}
           onChange={(event) => handleChange2(event, setScannerData)}
       >
         {[
           { value: "Anomalies de l'artère sylvienne", label: "G" },
           { value: "Anomalies de l'artère cérébrale antérieure", label: "G" },
           { value: "Anomalies de l'artère cérébrale postérieure", label: "G" },


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
       <Stack direction="column" spacing={2} alignItems="center">
         {[
           "Anomalies de l'artère sylvienne",
           "Anomalies de l'artère cérébrale antérieure",
           "Anomalies de l'artère cérébrale postérieure",



         ].map((label, index) => (
             <Typography
                 key={index}
                 sx={{
                   flexShrink: 0, // Prevents the label from shrinking when the container size changes
                   width: "350px", // Fixed width for label text
                   textAlign: "center" // Center align text within the fixed width
                 }}
             >
               {label}
             </Typography>
         ))}
       </Stack>
       <RadioGroup

           name="AngioWillisDroite"
           value={scannerData.AngioWillisDroite}
           onChange={(event) => handleChange2(event, setScannerData)}
       >
         {[
           { value: "Anomalies de l'artère sylvienne", label: "D" },
           { value: "Anomalies de l'artère cérébrale antérieure", label: "D" },
           { value: "Anomalies de l'artère cérébrale postérieure", label: "D" },

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

     <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" mb={1}>

       <FormControlLabel
           value="oui"

           control={  <Checkbox
               name="troncbasilaire"
               disabled={!isEditable}

               checked={checkZone.troncbasilaire}
               onChange={handleChangecheck}
               inputProps={{ "aria-label": "controlled" }}
           />}
           label=""
           disabled={!isEditable}
       />

       <Typography
           sx={{

             flexShrink: 0, // Prevents the label from shrinking when the container size changes
             width: "490px", // Fixed width for label text
             textAlign: "center", // Center align text within the fixed width
           }}
       >
         tronc basilaire

       </Typography>

     </Stack>

   </Stack>


{/* AngioTSA */}





      {/* Anomalie caro */}

    
   
      <Typography
      variant='h6'
       sx={{
      
        flexShrink: 0, // Prevents the label from shrinking when the container size changes
        marginBottom:2,
        marginTop:4,
        textAlign: "center", // Center align text within the fixed width
      }}
      >
        Anomalie Carotidienne
      </Typography>

  



<Stack direction="row" spacing={4} alignItems="center" justifyContent="center" mb={1}>
  <RadioGroup
    
    name="ACGauche"
    value={scannerData.ACGauche}
    onChange={(event) => handleChange2(event, setScannerData)}
  >
    {[
  { value: "Portion sous bulbaire", label: "G" },
  { value: "Intracrânienne", label: "G" },
  { value: "Aspect dysplasique", label: "G" }
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
  <Stack direction="column" spacing={2} alignItems="center">
  {[
     "Portion sous bulbaire",
  "Intracrânienne",
  "Aspect dysplasique",
 
 
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
    
    name="ACDroite"
    value={scannerData.ACDroite}
    onChange={(event) => handleChange2(event, setScannerData)}
  >
    {[
        { value: "Portion sous bulbaire", label: "G" },
        { value: "Intracrânienne", label: "G" },
        { value: "Aspect dysplasique", label: "G" }
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



 {/* ************2eme anomalie**************** */}



            
      {/* Anomalie vertébrale*/}

     
  
      <Typography
  variant='h6'
  sx={{
 
   flexShrink: 0, // Prevents the label from shrinking when the container size changes
   marginBottom:2,
   marginTop:4,
   textAlign: "center", // Center align text within the fixed width
 }}
 >
        Anomalie vertébrale
      </Typography>


      <Stack direction="row" spacing={4} alignItems="center" justifyContent="center" mb={1}>
  <RadioGroup
    
    name="AVGauche"
    value={scannerData.AVGauche}
    onChange={(event) => handleChange2(event, setScannerData)}
  >
    {[
  { value: "V0", label: "G" },
  { value: "V1", label: "G" },
  { value: "V2", label: "G" },
  { value: "V3", label: "G" },
      { value: "V4", label: "G" },
  
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
  <Stack direction="column" spacing={2} alignItems="center">
  {[
     "V0",
  "V1",
  "V2",
  "V3",
      "V4"
 
 
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
    
    name="AVDroite"
    value={scannerData.AVDroite}
    onChange={(event) => handleChange2(event, setScannerData)}
  >
    {[
  { value: "V0", label: "D" },
  { value: "V1", label: "D" },
  { value: "V2", label: "D" },
  { value: "V3", label: "D" },
      { value: "V4", label: "D" },
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

export default ScannerSection;
