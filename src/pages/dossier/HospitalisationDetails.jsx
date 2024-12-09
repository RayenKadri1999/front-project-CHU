import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SendIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import apiServices from "../../services/api-services";
import SubmitButtons from "../../components/shared/SubmitButtons";
import Notifications from "../../components/shared/Notifications";



const HospitalisationDetails = () => {
  const { id } = useParams();



  const theme = createTheme({
    palette: {
      primary: {
        main: "#0E8388",
      },
    },
  });


  const [isEditable, setIsEditable] = useState(false);
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [HospitalisationData, setHospitalisationData] = useState({
    entreeFaitPar: "",
    sortieFaitPar: "",
    _id:"",
    dateEntree: "",
    dateSortie: "",
    TypeAVC:"",
    status:"",
dossier:"",
  })

  const [successMessage, setSuccessMessage] = useState("");

  const [error, setError] = useState(null);


 

  

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHospitalisationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeDate = (name) => (value) => {
    const updatedDateTime = dayjs(HospitalisationData[name])
      .set("year", value.year())
      .set("month", value.month())
      .set("date", value.date());
    setHospitalisationData((prevData) => ({
      ...prevData,
      [name]: updatedDateTime,
    }));
  };

  const handleSubmit = (e) => {
    apiServices.handleSubmit(e,HospitalisationData,"hospitalisation",setSuccessMessage,isDataAvailable,setIsDataAvailable,setIsEditable,setError,id);
   }



   useEffect(() => {
    apiServices.loadDossierDetails(setHospitalisationData,"hospitalisation",setIsDataAvailable,setError,id);
  }, []);



  return (
    <>
        <ThemeProvider theme={theme}>
      <Box height={45} />
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" gutterBottom marginBottom={5}>
             Détails de l'hospitalisation 
            </Typography>
            {error && <Alert severity="info">{error}</Alert>}

            <Grid container spacing={2}>
              
        <Grid item xs={12} >
          <TextField
            label="Matricule"
            type="text"
            name="_id"
            disabled={true}
            value={HospitalisationData._id}
       
            fullWidth
            margin="normal"
          />
        </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  label="Entrée faite par"
                  name="entreeFaitPar"
                  value={HospitalisationData.entreeFaitPar}
                  onChange={handleChange}
                  disabled={!isEditable}
                  fullWidth
               
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                     required
                    label="Date Entrée"
                    disabled={!isEditable}
                    value={dayjs(HospitalisationData.dateEntree)}
                    onChange={handleChangeDate('dateEntree')}
                    sx={{display:"flex"}}
                     format="DD/MM/YYYY"
                  />
                </LocalizationProvider>
              </Grid>


              <Grid item xs={12} md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Type AVC</FormLabel>
                  <RadioGroup
                      value={HospitalisationData.TypeAVC}
                      name="TypeAVC"
                      // Remove onChange handler for read-only
                  >
                    <FormControlLabel
                        value="Infarctus cérébral"
                        control={<Radio />}
                        label="Infarctus cérébral"
                        // Disable the option to make it read-only
                        disabled={true}
                        checked={HospitalisationData.TypeAVC === "Infarctus cérébral"}
                    />
                    <FormControlLabel
                        value="Hématome cérébral"
                        control={<Radio />}
                        label="Hématome cérébral"
                        // Disable the option to make it read-only
                        disabled={true}
                        checked={HospitalisationData.TypeAVC === "Hématome cérébral"}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>


              
              <Grid item xs={6} md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Status</FormLabel>
                  <RadioGroup
                    value={HospitalisationData.status}
                    name="status"
                    onChange={handleChange}
                    
                  >
                    <FormControlLabel
                      value="En cours"
                      control={<Radio />}
                      label="En cours"
                      disabled={!isEditable}
                      checked={HospitalisationData.status === "En cours"}
                    />
                    <FormControlLabel
                      value="Finie"
                      control={<Radio />}
                      label="Finie"
                      disabled={!isEditable}
                      checked={HospitalisationData.status === "Finie"}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
       

{ HospitalisationData.status ==="Finie" &&
<>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  label="Sortie Fait Par"
                  name="sortieFaitPar"
                  value={HospitalisationData.sortieFaitPar}
                  onChange={handleChange}
                  disabled={!isEditable}
                  fullWidth
              
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    required
                    label="Date Sortie"
                    disabled={!isEditable}
                    value={dayjs(HospitalisationData.dateSortie)}
                    onChange={handleChangeDate('dateSortie')}
                   sx={{display:"flex"}}
                       format="DD/MM/YYYY"
                  />
                </LocalizationProvider>
              </Grid>
              </>
              }
              </Grid>

              <SubmitButtons isDataAvailable={isDataAvailable} setIsEditable={setIsEditable} isEditable={isEditable}/>

              {successMessage && (
                <Notifications Message={successMessage} setMessage={setSuccessMessage}/>
                )}

         
          </form>
        </Box>
      </Box>
      </ThemeProvider>
    </>
  );
};

export default HospitalisationDetails;
