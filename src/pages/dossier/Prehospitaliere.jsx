import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import { SendIcon } from "lucide-react";
import { useParams } from "react-router-dom";

import dayjs from "dayjs";

import SubmitButtons from "../../components/shared/SubmitButtons";
import Notifications from "../../components/shared/Notifications";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import apiServices from "../../services/api-services";



export default function Prehospitaliere({ commonState }) {
   const { idDossier,id} = useParams();
  const [isEditable, setIsEditable] = useState(false);
  const [isDataAvailable, setIsDataAvailable] = useState(true);
  const [showOtherTextField, setShowOtherTextField] = useState(false);
  const [showOtherTextField2, setShowOtherTextField2] = useState(false);
  const [prehospitaliereData, setPrehospitaliereData] = useState({
    matricule: id,
    quiAppelNeurologue: "",
    dateDebutSymptome: new Date(),
    dateAppelNeurologue: new Date(),
    motifAppel: "",
    autre1: "",
    autre2: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const theme = createTheme({
    palette: {
      primary: {
        main: "#0E8388",
      },
    },
  });


  // Fetch existing data
  
 

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrehospitaliereData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "quiAppelNeurologue") {
      if( value === "Autre"){
      setShowOtherTextField(true);
    
    }else{
      setShowOtherTextField(false);
      setPrehospitaliereData((prevData) => ({
        ...prevData,
        autre1: "",
      }));
    }
    } else if (name === "motifAppel") {
      if( value === "Autre motif"){
        setShowOtherTextField2(true);
      
      }else{
        setShowOtherTextField2(false);
        setPrehospitaliereData((prevData) => ({
          ...prevData,
          autre2: "",
        }));
      }
  
    }
  };

  const handleDateChange = (name) => (value) => {
    const updatedDateTime = dayjs(prehospitaliereData[name])
      .set("year", value.year())
      .set("month", value.month())
      .set("date", value.date());
    setPrehospitaliereData((prevData) => ({
      ...prevData,
      [name]: updatedDateTime,
    }));
  };

  const handleTimeChange = (name) => (value) => {
    const updatedDateTime = dayjs(prehospitaliereData[name])
      .set("hour", value.hour())
      .set("minute", value.minute());
    setPrehospitaliereData((prevData) => ({
      ...prevData,
      [name]: updatedDateTime,
    }));
  };



 const handleSubmit = (e) => {
    apiServices.handleSubmit(e,prehospitaliereData,"prehospitaliere",setSuccessMessage,isDataAvailable,setIsDataAvailable,setIsEditable,setError,id);
   }

   useEffect(() => {
    apiServices.loadDossierDetails(setPrehospitaliereData,"prehospitaliere",setIsDataAvailable,setError,id)
  }, []);


  useEffect(() => {
    if (prehospitaliereData.autre1) setShowOtherTextField(true);
    if (prehospitaliereData.autre2) setShowOtherTextField2(true);
  }, [prehospitaliereData]);



  return (
    <>
     <ThemeProvider theme={theme}>
      <Box component="main" sx={{ display: "flex",flexDirection: "column" ,flexGrow: 1, p: 3 }}>
        

         
          

          <form onSubmit={handleSubmit}>
            <Typography variant="h4">Phase
            Préhospitalière</Typography>
            {error && <Alert severity="info">{error}</Alert>}
            <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
            <FormControl component="fieldset">
              <FormLabel>Qui a appelé le neurologue:</FormLabel>
              <RadioGroup
                row
                name="quiAppelNeurologue"
                value={prehospitaliereData.quiAppelNeurologue}
                onChange={handleChange}
              >
                <FormControlLabel value="SAMU" control={<Radio />} label="SAMU" disabled={!isEditable} />
                <FormControlLabel
                  value="Urgences Sahloul"
                  control={<Radio />}
                  label="Urgences Sahloul"
                  disabled={!isEditable}
                />
                <FormControlLabel
                  value="Urgences Hached"
                  control={<Radio />}
                  label="Urgences Hached"
                  disabled={!isEditable}
                />
                <FormControlLabel
                  value="Consultations externes"
                  control={<Radio />}
                  label="Consultations externes"
                  disabled={!isEditable}
                />
                <FormControlLabel value="Autre" control={<Radio />} label="Autre" disabled={!isEditable} />
              </RadioGroup>
            </FormControl>
           

            {showOtherTextField && (
              <TextField
                label="Autre (précisez)"
                required
                name="autre1"
                fullWidth
                sx={{ mt: 2 }}
                value={prehospitaliereData.autre1}
                onChange={handleChange}
                disabled={!isEditable}
              />
            )}

</Box>

<Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
            <Box sx={{ mt: 2 }}>
              <FormLabel>Date du début des Symptômes:</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Le.."
                   format="DD/MM/YYYY"
                  value={dayjs(prehospitaliereData.dateDebutSymptome)}
                  onChange={handleDateChange("dateDebutSymptome")}
                  readOnly={!isEditable}
                  sx={{ mt: 1, width: "100%" }}
                />
              </LocalizationProvider>
            </Box>
          
            <Box sx={{ mt: 2 }}>
              <FormLabel>Heure du début des Symptômes:</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Heure"
                  value={dayjs(prehospitaliereData.dateDebutSymptome)}
                  onChange={handleTimeChange("dateDebutSymptome")}
                  readOnly={!isEditable}
                  sx={{ mt: 1, width: "100%" }}
                />
              </LocalizationProvider>
            </Box>

            <Box sx={{ mt: 2 }}>
              <FormLabel>Date d'appel du Neurologue:</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Le.."
                   format="DD/MM/YYYY"
                  value={dayjs(prehospitaliereData.dateAppelNeurologue)}
                  onChange={handleDateChange("dateAppelNeurologue")}
                  readOnly={!isEditable}
                  sx={{ mt: 1, width: "100%" }}
                />
              </LocalizationProvider>
            </Box>

            <Box sx={{ mt: 2 }}>
              <FormLabel>Heure d'appel du Neurologue:</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Heure"
                  value={dayjs(prehospitaliereData.dateAppelNeurologue)}
                  onChange={handleTimeChange("dateAppelNeurologue")}
                  readOnly={!isEditable}
                  sx={{ mt: 1, width: "100%" }}
                />
              </LocalizationProvider>
            </Box>
            </Box>

            <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
            <FormControl component="fieldset" >
              <FormLabel>Motif de l'appel:</FormLabel>
              <RadioGroup
                row
                name="motifAppel"
                value={prehospitaliereData.motifAppel}
                onChange={handleChange}
              >
               <FormControlLabel value="Lourdeur d'un hemicorps" control={<Radio />} label="Lourdeur d'un hemicorps" disabled={!isEditable} />
                <FormControlLabel value="Trouble de langage" control={<Radio />} label="Trouble de langage" disabled={!isEditable} />
                <FormControlLabel value="Trouble de l'élocution" control={<Radio />} label="Trouble de l'élocution" disabled={!isEditable} />
                <FormControlLabel value="Trouble visuel" control={<Radio />} label="Trouble visuel" disabled={!isEditable} />
                <FormControlLabel value="Cephalées" control={<Radio />} label="Cephalées" disabled={!isEditable} />
                <FormControlLabel value="Vertiges" control={<Radio />} label="Vertiges" disabled={!isEditable} />
                <FormControlLabel value="Trouble de la conscience" control={<Radio />} label="Trouble de la conscience" disabled={!isEditable} />
                <FormControlLabel value="Autre motif" control={<Radio />} label="Autre motif" disabled={!isEditable} />
              </RadioGroup>
            </FormControl>
           
            {showOtherTextField2 && (
              <TextField
                label="Autre Motif (précisez)"
                required
                name="autre2"
                fullWidth
                sx={{ mt: 2 }}
                value={prehospitaliereData.autre2}
                onChange={handleChange}
                disabled={!isEditable}
              />
            )}
</Box>
            <SubmitButtons isDataAvailable={isDataAvailable} setIsEditable={setIsEditable} isEditable={isEditable}/>


            {successMessage && (
           <Notifications Message={successMessage} setMessage={setSuccessMessage}/>
            )}

            
          </form>
        </Box>
      
      </ThemeProvider>
    </>
  );
}
