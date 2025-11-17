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
import { useParams } from "react-router-dom";
import axios from "axios";
import authHeader from "../../services/auth-header";

import dayjs from "dayjs";

import SubmitButtons from "../../components/shared/SubmitButtons";
import Notifications from "../../components/shared/Notifications";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import apiServices from "../../services/api-services";
import { useComments } from "../../hooks/useComments";
import SectionCommentaires from "./sectionCommentaires";



export default function Prehospitaliere({ mode = "Edit", tabName }) {
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

  // Comments functionality - separate from form data
  const {
    comments,
    addComment,
    editComment,
    deleteComment,
    loading: commentsLoading
  } = useComments('Prehospitaliere', id, null); // No refresh callback to avoid form interference

  // Separate comment handler that doesn't trigger form validation
  const handleAddCommentSafe = async (message) => {
    try {
      await addComment(message);
      // Don't refresh form data, only comments
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('Failed to add comment');
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.accessToken;
  };

  // Clean data to fix enum values before sending to backend
  const cleanDataForSubmission = (data) => {
    const cleanedData = { ...data };
    
    // Fix enum values that might be from old data
    if (cleanedData.quiAppelNeurologue === "Autre") {
      cleanedData.quiAppelNeurologue = "Autres";
    }
    if (cleanedData.motifAppel === "Autre motif") {
      cleanedData.motifAppel = "Autres";
    }
    
    return cleanedData;
  };

  // Clean data when loading from backend to handle legacy values
  const cleanDataFromBackend = (data) => {
    if (!data) return data;
    
    const cleanedData = { ...data };
    
    // Keep old values for display but don't change them in state
    // The form will show the old values, but when saved, they'll be cleaned
    return cleanedData;
  };

  // Approval function
  const ApprovePrehospitaliere = async () => {
    try {
      const response = await axios.put(
        `/api/review/Prehospitaliere/${id}/approve`,
        {},
        { headers: authHeader() }
      );
      if (response.status === 200) {
        setSuccessMessage('Section approved successfully');
        // Refresh data to get updated approval status
        loadPrehospitaliereDetails();
      }
    } catch (error) {
      console.error('Error approving section:', error);
      setError('Failed to approve section');
    }
  };

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
      if( value === "Autres"){
      setShowOtherTextField(true);
    
    }else{
      setShowOtherTextField(false);
      setPrehospitaliereData((prevData) => ({
        ...prevData,
        autre1: "",
      }));
    }
    } else if (name === "motifAppel") {
      if( value === "Autres"){
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
    e.preventDefault(); // Ensure we prevent default form submission
    console.log('Form submission triggered - this should only happen for actual form saves, NOT for comments');
    const cleanedData = cleanDataForSubmission(prehospitaliereData);
    apiServices.handleSubmit(e,cleanedData,"prehospitaliere",setSuccessMessage,isDataAvailable,setIsDataAvailable,setIsEditable,setError,id);
   }

   function loadPrehospitaliereDetails() {
    // Custom loading function that cleans legacy data
    const originalSetData = setPrehospitaliereData;
    const cleaningSetData = (data) => {
      if (data) {
        // Clean enum values from loaded data
        const cleanedData = { ...data };
        if (cleanedData.quiAppelNeurologue === "Autre") {
          cleanedData.quiAppelNeurologue = "Autres";
        }
        if (cleanedData.motifAppel === "Autre motif") {
          cleanedData.motifAppel = "Autres";
        }
        originalSetData(cleanedData);
      } else {
        originalSetData(data);
      }
    };
    
    apiServices.loadDossierDetails(cleaningSetData,"prehospitaliere",setIsDataAvailable,setError,id);
   }

   useEffect(() => {
    loadPrehospitaliereDetails();
  }, []);


  useEffect(() => {
    // Show "other" text fields based on current values (including legacy values)
    if (prehospitaliereData.autre1) setShowOtherTextField(true);
    if (prehospitaliereData.autre2) setShowOtherTextField2(true);
    
    // Also handle legacy enum values
    if (prehospitaliereData.quiAppelNeurologue === "Autre" || prehospitaliereData.quiAppelNeurologue === "Autres") {
      setShowOtherTextField(true);
    }
    if (prehospitaliereData.motifAppel === "Autre motif" || prehospitaliereData.motifAppel === "Autres") {
      setShowOtherTextField2(true);
    }
  }, [prehospitaliereData]);



  return (
    <>
     <ThemeProvider theme={theme}>
      <Box ponent="main" sx={{ display: "flex",flexDirection: "column" ,flexGrow: 1, p: 3 }}>
        

         
          

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
                <FormControlLabel value="Autres" control={<Radio />} label="Autres" disabled={!isEditable} />
              </RadioGroup>
            </FormControl>
           

            {showOtherTextField && (
              <TextField
                label="Autre (précisez)"

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
                <FormControlLabel value="Autres" control={<Radio />} label="Autres" disabled={!isEditable} />
              </RadioGroup>
            </FormControl>
           
            {showOtherTextField2 && (
              <TextField
                label="Autre Motif (précisez)"

                name="autre2"
                fullWidth
                sx={{ mt: 2 }}
                value={prehospitaliereData.autre2}
                onChange={handleChange}
                disabled={!isEditable}
              />
            )}
</Box>

            <SubmitButtons 
              handleSubmit={handleSubmit}
              isDataAvailable={isDataAvailable} 
              setIsEditable={setIsEditable} 
              isEditable={isEditable} 
              mode={mode}
              onApprove={ApprovePrehospitaliere}
              onSubmitComment={handleAddCommentSafe}
              tabName={tabName}
            />
            {successMessage && (
           <Notifications Message={successMessage} setMessage={setSuccessMessage}/>
            )}

            
          </form>

          {/* Comments Section - Completely separate from form */}
          {isAuthenticated() && (
            <SectionCommentaires
              comments={comments}
              onEditComment={editComment}
              onDeleteComment={deleteComment}
              loading={commentsLoading}
            />
          )}
        </Box>
      
      </ThemeProvider>
    </>
  );
}
