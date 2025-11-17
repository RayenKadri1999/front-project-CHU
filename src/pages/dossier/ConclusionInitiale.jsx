import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
 Stack,
 Button,
 ThemeProvider,
  TextField,
  createTheme,
  Grid,
  Typography,
  Alert,
  
} from "@mui/material";

import Notifications from "../../components/shared/Notifications";
import SubmitButtons from "../../components/shared/SubmitButtons";
import apiServices from "../../services/api-services";
import { useComments } from "../../hooks/useComments";
import SectionCommentaires from "./sectionCommentaires";
import authHeader from "../../services/auth-header";


export default function ConclusionInitiale({mode = "Edit", tabName}) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0E8388",
      },
    },
  });

  const navigate = useNavigate();
  const {  idDossier,id } = useParams();
  const [isEditable, setIsEditable] = useState(false);
  const [isDataAvailable, setIsDataAvailable] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [ConclusionInitialeData, setConclusionInitialeData] = useState({
    
    ECG: "",
    TP: "",
    Ratio_TCA: "",
    
    INR:"",
    Plaquettes: "",
    Hémoglobine: "",
    Dosage: "",
    matricule: id,

    Conclusion:"",
  });

  // Comments functionality - separate from form data
  const {
    comments,
    addComment,
    editComment,
    deleteComment,
    loading: commentsLoading
  } = useComments('ConclusionInitiale', id, null); // No refresh callback to avoid form interference

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

  const ApproveConclusionInitiale = () => {
    axios.put(
      `http://localhost:3000/api/review/${tabName}/${ConclusionInitialeData?._id || ""}/reviewInfo/state`,
      { status: "Accepté" },
      { headers: authHeader() }
    );
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    
    setConclusionInitialeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 
  
  const handleSubmit = (e) => {
    apiServices.handleSubmit(e,ConclusionInitialeData,"conclusioninitiale",setSuccessMessage,isDataAvailable,setIsDataAvailable,setIsEditable,setError,id);
   }





   function loadConclusionInitialeDetails() {
    apiServices.loadDossierDetails(setConclusionInitialeData,"conclusioninitiale",setIsDataAvailable,setError,id);
   }

   useEffect(() => {
    loadConclusionInitialeDetails();
  }, []);


  return (


    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit}>
      <Typography variant="h4">Bilan  Initiale</Typography>

      {error && <Alert severity="info">{error}</Alert>}
      
<Box height={10} />
<Box sx={{ display: "flex",flexDirection: "column", }}>
<Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
<Typography variant="h6" gutterBottom>
            Bilan Initial
          </Typography>
            <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField   fullWidth type ="number" id="outlined-required" label="ECG  " name="ECG" disabled={!isEditable}  onChange={handleChange2} value={ConclusionInitialeData.ECG}  sx={{ m: 1 }} />
           
              <TextField  fullWidth type ="number" id="outlined-required" label="TP "  name="TP" disabled={!isEditable}  onChange={handleChange2} value={ConclusionInitialeData.TP}   sx={{ m: 1 }} />
           
              <TextField  fullWidth type ="number"  id="outlined-required" label="Ratio TCA "name="Ratio_TCA" sx={{ m: 1 }} disabled={!isEditable} onChange={handleChange2} value={ConclusionInitialeData.Ratio_TCA} />
              </Grid>
              <Grid item xs={6}>
              <TextField  fullWidth  type ="number" id="outlined-required"  name="INR" label="INR" disabled={!isEditable}  onChange={handleChange2} value={ConclusionInitialeData.INR}  sx={{ m: 1 }} />
              
              <TextField  fullWidth type ="number" id="outlined-required" name="Plaquettes" label="Plaquettes" disabled={!isEditable}  onChange={handleChange2} value={ConclusionInitialeData.Plaquettes}  sx={{ m: 1 }} />
           
              <TextField  fullWidth type ="number" id="outlined-required" name="Hémoglobine" label="Hémoglobine" disabled={!isEditable}  onChange={handleChange2} value={ConclusionInitialeData.Hémoglobine}  sx={{ m: 1 }} />
              </Grid>
              <Grid item xs={6}>
              <TextField  fullWidth type ="number" id="outlined-required" name="Dosage" label=" Dosage spécifique" disabled={!isEditable}  onChange={handleChange2} value={ConclusionInitialeData.Dosage}  sx={{ m: 1 }} />
           </Grid>
           </Grid>
</Box>
           <Box sx={{ m: 1,mt:5 }}>
                <TextField
                  name="Conclusion"
                  label="Conclusion initiale"
                  disabled={!isEditable}
                  value={ConclusionInitialeData.Conclusion}
                  onChange={handleChange2}
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
              </Box>
          </Box>       


          <SubmitButtons 
            handleSubmit={handleSubmit}
            isDataAvailable={isDataAvailable} 
            setIsEditable={setIsEditable} 
            isEditable={isEditable} 
            onSubmitComment={handleAddCommentSafe}
            mode={mode}
            onApprove={ApproveConclusionInitiale}
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

          </ThemeProvider>


);
}
