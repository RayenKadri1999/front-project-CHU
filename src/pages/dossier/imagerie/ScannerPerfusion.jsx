// PerfusionScanner.js

import React, { useEffect, useState } from 'react';
import { Box, Typography, FormControlLabel, Checkbox, Stack, Button, Radio, RadioGroup, TextField, Grid, FormLabel, FormControl, Alert } from '@mui/material';
import { SendIcon } from 'lucide-react';

import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import authHeader from '../../../services/auth-header';
import Notifications from '../../../components/shared/Notifications';
import apiServices from "../../../services/api-services";
import SubmitButtons from '../../../components/shared/SubmitButtons';


const PerfusionScanner = ({ id, handleChange2 }) => {


    
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [scannerPerfusionData, setScannerPerfusionData] = useState({
    status: "",
    DateScanner: new Date(),
   
   
    matricule: id,

  });
  const scannerPerfusionDataInit = {
    status: "Non",
    DateScanner: "",
   
   
    matricule: id,

  };
  const toggleEditMode = () => {
    setIsEditable((prev) => !prev);
  };



  

  

   
  useEffect(() => {
 
    apiServices.loadDossierDetails(setScannerPerfusionData,"imagerie/scannerperfusion",setIsDataAvailable,setError,id);
    
    }, []);
   

    const handleSubmit = (e) => {
      
        let updatedscannerPerfusionData = scannerPerfusionData;
    
        if (scannerPerfusionData.status === "Non") {
          // update the fileds with initials values 
          updatedscannerPerfusionData = scannerPerfusionDataInit;
          setScannerPerfusionData(scannerPerfusionDataInit); 
        }
      apiServices.handleSubmit(e,updatedscannerPerfusionData,"imagerie/scannerperfusion",setSuccessMessage,isDataAvailable,setIsDataAvailable,setIsEditable,setError,id);
     }


  const handleChangeDate = (name) => (value) => {
    const updatedDateTime = dayjs(scannerPerfusionData[name])
      .set("year", value.year())
      .set("month", value.month())
      .set("date", value.date());
    setScannerPerfusionData((prevData) => ({
      ...prevData,
      [name]: updatedDateTime,
    }));
  };

  const handleChangeTime = (name) => (value) => {
    const updatedDateTime = dayjs(scannerPerfusionData[name])
      .set("hour", value.hour())
      .set("minute", value.minute());
      setScannerPerfusionData((prevData) => ({
      ...prevData,
      [name]: updatedDateTime,
    }));
  };

    return (
      <form onSubmit={handleSubmit}>
        <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
            <Typography variant="h6">Scanner de perfusion</Typography>
            {error && <Alert severity="info">{error}</Alert>}
{/* Oui / Non Radio Group */}
<RadioGroup row name="status" defaultValue="Non" value={scannerPerfusionData.status} onChange={(event) => handleChange2(event, setScannerPerfusionData)}>
                <FormControlLabel value="Oui" control={<Radio disabled={!isEditable}  />} label="Oui" />
                <FormControlLabel value="Non" control={<Radio disabled={!isEditable}  />} label="Non" />
            </RadioGroup>

            {scannerPerfusionData.status =="Oui" &&
  <>

           
      {/* Scanner Date */}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, mt: 2 ,mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="effectué le"
            value={dayjs(scannerPerfusionData.DateScanner)}
            onChange={handleChangeDate('DateScanner')}
             format="DD/MM/YYYY"
            renderInput={(params) => <TextField {...params} />}
            disabled={!isEditable}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="à"
                  value={dayjs(scannerPerfusionData.DateScanner)}
                onChange={handleChangeTime("DateScanner")}
                disabled={!isEditable}
                />
                 </LocalizationProvider>
      
      </Box>
</>
}
           
                <SubmitButtons isDataAvailable={isDataAvailable} setIsEditable={setIsEditable} isEditable={isEditable}/>          {successMessage && (
<Notifications Message={successMessage} setMessage={setSuccessMessage}/>
)}
        </Box>
        </form>
    );
};

export default PerfusionScanner;
