


import React from "react";


import Box from "@mui/material/Box";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import  { useState } from "react";

import axios from "axios";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextareaAutosize } from '@mui/base';




import FormControl from "@mui/material/FormControl";



import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function Decision() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0E8388",
      },
    },
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const handlePrevious = () => {
    // Use the `pop` method to navigate to the previous page
    navigate(-1);
  };
  const [patientRecordData, setPatientRecordData] = useState({
    
    heureFin: '',
    heuredebut: '',
    dateEntree: '',
   
  });
  const [createSuccess, setCreateSuccess] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/api/patient/createPatientRecord/${id}`, patientRecordData);

      if (response.status === 200) {
        // Patient updated successfully
        setCreateSuccess(true);
        console.log("Patient record create successfully!");
      } else {
        console.error("Patient record create failed:", response.data);
        // Handle other errors
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      // Handle other errors
    }
  };
  const [Autonomie, setAutonomie] = React.useState("");

  const handleAutonomieChange = (event) => {
    setAutonomie(event.target.value);
  };
  return (
    <>
         <ThemeProvider theme={theme}>
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
       

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            
          <h1>Décision thérapeutique initiale </h1>
          
          <form onSubmit={handleSubmit}>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center"  }}>
         

            <Box sx={{ m: 1, width: "25ch" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" required>
                Double anti agrégation plaquettaire 
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Autonomie}
                  label="Autonomie"
                  onChange={handleAutonomieChange}
                >
                  <MenuItem value={1}>Clopidogrel </MenuItem>
                  <MenuItem value={2}> Ticagrelor </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ m: 1, width: "25ch" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" required>
                Anticoagulation curative
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Autonomie}
                  label="Autonomie"
                  onChange={handleAutonomieChange}
                >
                  <MenuItem value={1}>AOD </MenuItem>
                  <MenuItem value={2}> Heparine </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <div>
              {" "}
              <TextField required id="outlined-required" label="Thrombolyse IV" />
            </div>






          <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date de TIV"
              slotProps={{
                textField: {
                  helperText: "",
                },
                

              }}
              value={patientRecordData.dateEntree}
            />
          </LocalizationProvider>
          </div>
          

         
          <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker"]}>
              <TimePicker label="Heure TIV" value={patientRecordData.heureDebut} />
            </DemoContainer>
          </LocalizationProvider>
</div>

<Box sx={{ m: 1, width: "25ch" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" required>
                Molécule utilisée
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Autonomie}
                  label="Autonomie"
                  onChange={handleAutonomieChange}
                >
                  <MenuItem value={1}>Actilyse  </MenuItem>
                  <MenuItem value={2}>Metalyse </MenuItem>
                </Select>
              </FormControl>
            </Box>


            
              <TextField required id="outlined-required" label="
Posologie
 " />
          
              <TextField required id="outlined-required" label="Delai door to neddle" />
           
              </Box>
<Box height={10} />

         
            </form>
        
        </Box>
        </Box>
</ThemeProvider>
      
    </>
  );
}
