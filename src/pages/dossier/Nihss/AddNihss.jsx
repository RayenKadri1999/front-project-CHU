import React from "react";


import Box from "@mui/material/Box";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import  { useState,useEffect } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ArrowBack from '@mui/icons-material/ArrowBack';

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";


import dayjs from "dayjs";


import { FormControlLabel, Radio, RadioGroup, Typography,Grid, MenuItem, Select, Alert } from "@mui/material";
import { SendIcon,PlusIcon, InfoIcon } from "lucide-react";

import authHeader from "../../../services/auth-header";
import PdfButton from "../../../components/shared/PdfButton";
import apiServices from "../../../services/api-services";
function AddNihss({handleClose,id,setSuccessMessage}) {


  


  const theme = createTheme({
    palette: {
      primary: {
        main: "#0E8388",
      },
    },
  });



 



  const [NihssData, setNihssData] = useState({
    
    categorie: '',

  // Date and Heure
  date: new Date(),


  // Total auto.
  totalAuto: '',

  // Subcategories
  vigilance: '',//0..4
  orientation: '',//0..4
  commandes: '',//0..4
  oculomotricite: '',//0..4
  champVisuel: '',//0..4
  paralysieFaciale: '',//0..4
//tous les champs //0..4


  // Sa Motricité membre sup.G
  motriciteMembreSupG: '',

  // Motricité membre sup. (D)
  motriciteMembreSupD: '',

  // Motricité membre int. (G)
  motriciteMembreIntG: '',

  // Motricité membre int. (D)
  motriciteMembreIntD: '',

  ataxie: '',
  sensibilite: '',
  langage: '',
  dysarthrie: '',
  extinctionNegligence: '',
  matricule: id,
   
  });
  const valueRange = {
    vigilance: 3,
    orientation: 2,
    commandes: 2,
    oculomotricite: 2,
    champVisuel: 3,
    paralysieFaciale: 3,
    motriciteMembreSupG: 4,
    motriciteMembreSupD: 4,
    motriciteMembreIntG: 4,
    motriciteMembreIntD: 4,
    ataxie: 2,
    sensibilite: 2,
    langage: 3,
    dysarthrie: 2,
    extinctionNegligence: 2,
  };
  

  const [error, setError] = useState(null);

 

  const handleChangeDate =(name) => (value) =>  {
    
    console.log(NihssData[name]);
    const updatedDateTime = dayjs(NihssData[name]).set('year', value.year())
    .set('month', value.month())
    .set('date', value.date());
    console.log((updatedDateTime));


   
    setNihssData((prevData) => ({
      
      ...prevData,
      [name]: updatedDateTime,
    })
    );
  
  };
  const handleChangeTime =(name) => (value)  => {
   
    const updatedDateTime = dayjs(NihssData[name]).set('hour', value.hour())
    .set('minute', value.minute());
  
    
    
    setNihssData((prevData) => ({
      ...prevData,
      [name]:updatedDateTime ,
    })
    );
  };
  const totalCalc = () => {
    const total = [
      'vigilance',
      'orientation',
      'commandes',
      'oculomotricite',
      'champVisuel',
      'paralysieFaciale',
      'motriciteMembreSupG',
      'motriciteMembreSupD',
      'motriciteMembreIntG',
      'motriciteMembreIntD',
      'ataxie',
      'sensibilite',
      'langage',
      'dysarthrie',
      'extinctionNegligence',
    ].reduce((acc, key) => {
      const value = parseInt(NihssData[key], 10);
      return acc + (isNaN(value) ? 0 : value);
    }, 0);

    setNihssData((prevState) => ({
      ...prevState,
      totalAuto: total,
    }));
  };

  useEffect(() => {
    totalCalc();
  }, [NihssData]);


  const [createSuccess, setCreateSuccess] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNihssData((prevData) => ({
      ...prevData,
      [name]: value,
    })
    );
  };

  const handleSubmit = (e) => {
    
    apiServices.handleSubmitModal(e,NihssData,"nihss",setSuccessMessage,true,handleClose,setError);
   }

  
  return (
    <>
  
   

  {error && <Alert severity="error">{error}</Alert>}
  <Stack direction="row" alignItems="center" spacing={4}   >
        
        <Typography variant="h4" > Nouveau NIHSS </Typography>
       
    <PdfButton pdfUrl="/pdf/ScoreNIHSS.pdf"  />
      </Stack>
     <form onSubmit={handleSubmit}>
         <Box
           sx={{ display: "flex", flexDirection: "row", alignItems: "center"  }}>
  
   

 

<Box sx={{ p: 2 }}>
  <Grid container spacing={2} alignItems="center">


   {/* Example 1: Label with Two Related Fields */}
   <Grid item xs={4} >
     
      <Typography variant="h6" >  Categorie  </Typography>
     
   </Grid>
 
     <Grid item xs={8}>
       <TextField
         fullWidth
         label="Categorie"
         type="text"
         name="categorie"
         value={NihssData.categorie}
         onChange={handleChange}
required
         margin="normal"
       />
   
     
   </Grid>

   

   {/* Example 2: Label with Two Related Fields */}
   <Grid item xs={4}>
   <Typography variant="h6" >  Date  </Typography>
     
   </Grid>
   
     <Grid item xs={8}>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
     <DatePicker
      format="DD/MM/YYYY"
                        label="Date.."
                        name="date"
                        onChange={handleChangeDate('date')}


                         value={dayjs(NihssData.date)}
                      />
                      </LocalizationProvider>
       
     </Grid>
     
 


   <Grid item xs={4} >
   <Typography variant="h6" >  Heure  </Typography>
   </Grid>
  
     <Grid item xs={8}>
       
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["TimePicker"]}>
                        <TimePicker
                      label="Heure"
                         
                        required
                          value={dayjs(NihssData.date)}
                          
                          onChange={handleChangeTime('date')}
                  
                        
                        />
                      </DemoContainer>
                    </LocalizationProvider>
    
     
   </Grid>


   {/* Repeat similar structure for other labels and fields */}
   {[
       { label: 'Vigilance', name1: 'vigilance' },
       { label: 'Orientation', name1: 'orientation' },
       { label: 'Commandes', name1: 'commandes' },
       { label: 'Oculomotricité', name1: 'oculomotricite' },
       { label: 'Champ visuel', name1: 'champVisuel' },
       { label: 'Paralysie faciale', name1: 'paralysieFaciale' },

       { label: 'Motricité membre sup. (G)', name1: 'motriciteMembreSupG' },
       { label: 'Motricité membre sup. (D)', name1: 'motriciteMembreSupD' },

       { label: 'Motricité membre inf. (G)', name1: 'motriciteMembreIntG' },
       { label: 'Motricité membre inf. (D)', name1: 'motriciteMembreIntD' },

       { label: 'Ataxie', name1: 'ataxie' },
       { label: 'Sensibilité', name1: 'sensibilite' },
       { label: 'Langage', name1: 'langage' },
       { label: 'Dysarthrie', name1: 'dysarthrie' },

       { label: 'Extinction / Négligence', name1: 'extinctionNegligence' },
     // Add other fields similarly
   ].map((group, index) => (
     <React.Fragment key={index}>
       <Grid item xs={4} >

       <Typography variant="h6" >  {group.label}  </Typography>

       </Grid>
      
       <Grid item xs={8}>
            <Select
              labelId={`select-${group.name1}`}
              id={`select-${group.name1}`}
              value={NihssData[group.name1]}
              onChange={handleChange}
              name={group.name1}
              label={`${group.label}`}
              required
              fullWidth
            >
              {/* Dynamically generate the MenuItems based on the max value from valueRange */}
              {[...Array(valueRange[group.name1] + 1).keys()].map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </Grid>

        
       
     </React.Fragment>
   ))}



 {/* Total */}
 <Grid item xs={4} >
  
  <Typography variant="h4" >  Total  </Typography>

</Grid>

<Grid item xs={8}>
  <TextField
    fullWidth
    label="Total"
    type="number"
    name="totalAuto"
    value={NihssData.totalAuto}
  
   disabled={true}
    margin="normal"
  />
</Grid>


 </Grid>
</Box>




</Box>
<Box height={30} />
               <Stack direction="row" spacing={2}>
                  
              
                   <Button
                     type="submit"
                     variant="contained"
                     endIcon={<SendIcon />}
                     className="button"
                    
                   >
                     Enregistrer
                   </Button>{" "}
                   
           

                 {/* </div> */}
               </Stack>
           </form>
           
  
   
          
         
        
        
      

      
    </>
  )
}

export default AddNihss




