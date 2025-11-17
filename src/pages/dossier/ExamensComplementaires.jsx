import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import { createTheme, ThemeProvider } from "@mui/material/styles";




// import Sidenav from "../../components/shared/Sidenav ";



import { useNavigate, useParams } from "react-router-dom";

import { Checkbox, FormControlLabel, FormGroup, FormLabel, Grid, Radio, RadioGroup, Alert, TextField, Typography } from "@mui/material";
import SubmitButtons from "../../components/shared/SubmitButtons";
import Notifications from "../../components/shared/Notifications";
import apiServices from "../../services/api-services";
import { useComments } from "../../hooks/useComments";
import SectionCommentaires from "./sectionCommentaires";
import axios from "axios";
import authHeader from "../../services/auth-header";

export default function ExamensComplementaires({ mode = "Edit", tabName }) {
 
   const { idDossier,id} = useParams();
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0E8388",
      },
    },
  });

  const [isEditable, setIsEditable] = useState(false);
  const [isDataAvailable, setIsDataAvailable] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  
  const [examensComplementairesData, setExamensComplementairesData] = useState({

    TélémétrieCardiaque:false,
    DescTélémétrieCardiaque:'',
    ETT: false,
    DescETT:'',
    
    ETO : false,
    DescETO:'',


      Arteriographie : false,
    DescArteriographie:'',

    HolterRythmique : false,
    DescHolterRythmique : '',
        
    EDTSA : false,
    DescEDTSA : '',
    EDTC:false,
      DescEDTC:'',
    AutreExamens : false,
    DescAutreExamens : '',

    matricule: id,
      
     
  });

  // Comments functionality - separate from form data
  const {
      comments,
      addComment,
      editComment,
      deleteComment,
      loading: commentsLoading
  } = useComments('ExamensComplementaires', id, null); // No refresh callback to avoid form interference

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

  const cleanData = (data) => {
        // Create a new object to avoid mutating the original one
        let cleanedData = { ...data };
        delete cleanedData._id;
        delete cleanedData.__v;
        // Loop through the keys of the data
        Object.keys(cleanedData).forEach(key => {
            // Remove fields that have an empty string or are unselected (null or undefined)
            if (cleanedData[key] === "" || cleanedData[key] === null || cleanedData[key] === undefined) {
                delete cleanedData[key];
            }
        });

        return cleanedData;
    };
  const handleChangeText = (e) => {
    const { name, value } = e.target;

    
      console.log(name,value)
    setExamensComplementairesData((prevData) => ({
      ...prevData,
      [name]: value,
    })
    );
  
  
  };


 

  const handleChangecheck = (e) => {
    const { name, checked } = e.target;
    console.log(name,checked)
    setExamensComplementairesData((prevData) => ({
      ...prevData,
      [name]: checked,
    })
    );
    if (!checked) { 
      
    setExamensComplementairesData((prevData) => ({
      ...prevData,
      [`Desc${name}`]: '',
    })
    );
  }

 
  };
 

  const handleSubmit = (e) => {
    apiServices.handleSubmit(e,examensComplementairesData,"examenscomplementaires",setSuccessMessage,isDataAvailable,setIsDataAvailable,setIsEditable,setError,id);
    }
    
    
    
    
    
       useEffect(() => {
        console.log(idDossier,id)
        apiServices.loadDossierDetails(setExamensComplementairesData,"examenscomplementaires",setIsDataAvailable,setError,id);
     
      }, []);

  // Approval function
  const approveExamensComplementaires = async () => {
      try {
          const response = await axios.put(
              `/api/review/ExamensComplementaires/${id}/approve`,
              {},
              { headers: authHeader() }
          );
          if (response.status === 200) {
              setSuccessMessage('Section approved successfully');
              // Refresh data to get updated approval status
              apiServices.loadDossierDetails(setExamensComplementairesData, "examenscomplementaires", setIsDataAvailable, setError, id);
          }
      } catch (error) {
          console.error('Error approving section:', error);
          setError('Failed to approve section');
      }
  };

  return (
<>

    
<ThemeProvider theme={theme}>
  
    <Box sx={{ display: "flex" }}>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <form onSubmit={handleSubmit}>
      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error.includes('404') || error.includes('not found') 
            ? 'Aucune donnée trouvée pour ce patient. Vous pouvez créer un nouveau dossier en cliquant sur "Modifier".' 
            : error}
        </Alert>
      )}
    
      
    
    <div >
      

          <Typography variant="h4" gutterBottom marginBottom={6}>
          Examens Complémentaires
            </Typography>

          <FormGroup>
         <Grid container spacing={2}>
          
            
             <Grid item xs={6}>
              <FormControlLabel 
              control=
                  {<Checkbox
                      name="ETT"
                      disabled={!isEditable}
                      checked={examensComplementairesData.ETT} 
                      onChange={handleChangecheck} 
                      inputProps={{ 'aria-label': 'controlled' }}
                      />}
               label="ETT" />
             
             <TextField  
                    name="DescETT"
                    disabled={!isEditable || !examensComplementairesData.ETT}
                    value={examensComplementairesData.DescETT} 
                  onChange={handleChangeText}
                  multiline
                  rows={6}
                  variant="outlined"
                  fullWidth
                />

</Grid>

<Grid item xs={6}>

              <FormControlLabel 
              
               control=
                  {<Checkbox
                          name="ETO"
                          disabled={!isEditable}
                          checked={examensComplementairesData.ETO} 
                          onChange={handleChangecheck}
                          inputProps={{ 'aria-label': 'controlled' }} 
                    />} 
               label="ETO" />
           
 <TextField  
                    name="DescETO"
                    disabled={!isEditable || !examensComplementairesData.ETO}
                    value={examensComplementairesData.DescETO} 
                  onChange={handleChangeText}
                  multiline
                  rows={6}
                  variant="outlined"
                  fullWidth
                />

</Grid>

<Grid item xs={6}>



              <FormControlLabel  
              control={
                  <Checkbox
                      name="TélémétrieCardiaque"
                      disabled={!isEditable}
                      checked={examensComplementairesData.TélémétrieCardiaque} 
                      onChange={handleChangecheck} 
                      inputProps={{ 'aria-label': 'controlled' }}
                      />}
               label="Télémétrie Cardiaque" />
             
   <TextField  
                   disabled={!isEditable || !examensComplementairesData.TélémétrieCardiaque}
                       name="DescTélémétrieCardiaque"
                       value={examensComplementairesData.DescTélémétrieCardiaque} 
                  onChange={handleChangeText}
                  multiline
                  rows={6}
                  variant="outlined"
                  fullWidth
                />

</Grid>

<Grid item xs={6}>


              <FormControlLabel  
              control=
                  {<Checkbox 
                    name="Arteriographie"
                    disabled={!isEditable}
                    checked={examensComplementairesData.Arteriographie}
                    onChange={handleChangecheck}
                    inputProps={{ 'aria-label': 'controlled' }}
                    />
                    }
               label="Artériographie" />
                
               <TextField  
                  disabled={!isEditable || !examensComplementairesData.Arteriographie}
                     name="DescArteriographie"
                  value={examensComplementairesData.DescArteriographie}
                  onChange={handleChangeText}
                  multiline
                  rows={6}
                  variant="outlined"
                  fullWidth
                />


</Grid>


<Grid item xs={6}>


              <FormControlLabel  
              control=
                  {<Checkbox 
                    name="HolterRythmique"
                    disabled={!isEditable}
                    checked={examensComplementairesData.HolterRythmique} 
                    onChange={handleChangecheck}
                    inputProps={{ 'aria-label': 'controlled' }}
                    />
                    }
               label=" Holter Rythmique" />
                
               <TextField  
                  disabled={!isEditable || !examensComplementairesData.HolterRythmique }
                     name="DescHolterRythmique"
                  value={examensComplementairesData.DescHolterRythmique} 
                  onChange={handleChangeText}
                  multiline
                  rows={6}
                  variant="outlined"
                  fullWidth
                />


</Grid>


<Grid item xs={6}>


              <FormControlLabel  
              control=
                  {<Checkbox 
                    name="EDTSA"
                    disabled={!isEditable}
                    checked={examensComplementairesData.EDTSA}
                    onChange={handleChangecheck}
                    inputProps={{ 'aria-label': 'controlled' }}
                    />
                    }
               label="EDTSA " />
                
               <TextField  
                  disabled={!isEditable || !examensComplementairesData.EDTSA }
                     name="DescEDTSA"
                  value={examensComplementairesData.DescEDTSA}
                  onChange={handleChangeText}
                  multiline
                  rows={6}
                  variant="outlined"
                  fullWidth
                />
</Grid>
             <Grid item xs={6}>
    <FormControlLabel
        control=
            {<Checkbox
                name="EDTC"
                disabled={!isEditable}
                checked={examensComplementairesData.EDTC}
                onChange={handleChangecheck}
                inputProps={{ 'aria-label': 'controlled' }}
            />
            }
        label="EDTC " />

    <TextField
        disabled={!isEditable || !examensComplementairesData.EDTC }
        name="DescEDTC"
        value={examensComplementairesData.DescEDTC}
        onChange={handleChangeText}
        multiline
        rows={6}
        variant="outlined"
        fullWidth
    />


</Grid>


<Grid item xs={6}>


              <FormControlLabel  
              control=
                  {<Checkbox 
                    name="AutreExamens"
                    disabled={!isEditable}
                    checked={examensComplementairesData.AutreExamens} 
                    onChange={handleChangecheck}
                    inputProps={{ 'aria-label': 'controlled' }}
                    />
                    }
               label="Autre examens" />
                
               <TextField  
                  disabled={!isEditable || !examensComplementairesData.AutreExamens }
                     name="DescAutreExamens"
                  value={examensComplementairesData.DescAutreExamens} 
                  onChange={handleChangeText}
                  multiline
                  rows={6}
                  variant="outlined"
                  fullWidth
                />


</Grid>


       
        
           
    
            
            </Grid>
            </FormGroup>
          <Box height={10} />

          
        {/* </Box> */}
      

  
        <SubmitButtons 
            handleSubmit={handleSubmit}
            isDataAvailable={isDataAvailable} 
            setIsEditable={setIsEditable} 
            isEditable={isEditable} 
            onSubmitComment={handleAddCommentSafe}
            mode={mode}
            onApprove={approveExamensComplementaires}
            tabName={tabName}
        />

{successMessage && (
  <Notifications Message={successMessage} setMessage={setSuccessMessage}/>
  )}

                </div>
             
      
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
      </Box>
      </ThemeProvider>
      </>    
  );
}
