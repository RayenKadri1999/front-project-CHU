
import React from "react";


import Box from "@mui/material/Box";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import  { useState,useEffect } from "react";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextareaAutosize } from '@mui/base';

import dayjs from "dayjs";


import { FormControlLabel, Radio, RadioGroup, Typography,Grid, MenuItem, Select } from "@mui/material";
import { SendIcon,PlusIcon } from "lucide-react";


import authHeader from "../../services/auth-header";
import PdfButton from "../../components/shared/PdfButton";
function DetailsNihssForm({handleClose,idNihss,setData,setNihssData,setSuccessMessage}) {


  


  const theme = createTheme({
    palette: {
      primary: {
        main: "#0E8388",
      },
    },
  });



 



//   const [NihssData, setNihssData] = useState({
    
//     categorie: '',

//   // Date and Heure
//   date: new Date(),


//   // Total auto.
//   totalAuto: '',

//   // Subcategories
//   vigilance: '',//0..4
//   orientation: '',//0..4
//   commandes: '',//0..4
//   oculomotricite: '',//0..4
//   champVisuel: '',//0..4
//   paralysieFaciale: '',//0..4
// //tous les champs //0..4


//   // Sa Motricité membre sup.G
//   motriciteMembreSupG: '',

//   // Motricité membre sup. (D)
//   motriciteMembreSupD: '',

//   // Motricité membre int. (G)
//   motriciteMembreIntG: '',

//   // Motricité membre int. (D)
//   motriciteMembreIntD: '',

//   ataxie: '',
//   sensibilite: '',
//   langage: '',
//   dysarthrie: '',
//   extinctionNegligence: '',
//   patient: '',
   
//   });


const [PreData, setPreData] = useState({
    
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

 
}); 
const [error, setError] = useState(null);
  const loadNihssDetails = async () => {
console.log(idNihss)
    try {
      const result = await axios.get(`http://localhost:3000/api/nihss/getDetails/${idNihss}`,{ headers: authHeader() });
 

      
      if (result.data) {
        setPreData(result.data);
      
      }

    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    loadNihssDetails();
    
  }, []);
  

 

  const handleChangeDate =(name) => (value) =>  {
    
    console.log(PreData[name]);
    const updatedDateTime = dayjs(PreData[name]).set('year', value.year())
    .set('month', value.month())
    .set('date', value.date());
    console.log((updatedDateTime));


   
    setPreData((prevData) => ({
      
      ...prevData,
      [name]: updatedDateTime,
    })
    );
  
  };
  const handleChangeTime =(name) => (value)  => {
   
    const updatedDateTime = dayjs(PreData[name]).set('hour', value.hour())
    .set('minute', value.minute());
  
    
    
    setPreData((prevData) => ({
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
      const value = parseInt(PreData[key], 10);
      return acc + (isNaN(value) ? 0 : value);
    }, 0);

    setPreData((prevState) => ({
      ...prevState,
      totalAuto: total,
    }));
  };

  useEffect(() => {
    totalCalc();
  }, [PreData]);


  const [createSuccess, setCreateSuccess] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreData((prevData) => ({
      ...prevData,
      [name]: value,
    })
    );
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch(`http://localhost:3000/api/nihss/update/${idNihss}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         'x-access-token': authHeader()['x-access-token']
  //       },
  //       body: JSON.stringify(PreData)
  //     });


  //     if (response.status === 201) {
  
  //       setCreateSuccess(true);
  //       console.log("Nihss  updated successfully!");
  //       setExamenCliniqueData(prevData => ({
  //         ...prevData,
  //         NIHSSInitial: PreData.totalAuto,
  //       }));
  //       handleClose();

  //     } else {
  //       console.error("Nihss update failed:", response);
  //       handleClose();
  //     }
  //   } catch (error) {
  //     console.error("Error in handleSubmit:", error);
  //     handleClose();
  //   }
  // };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
        // Patient updated successfully
        setCreateSuccess(true);
     
        setNihssData((prevState) => ({
          ...prevState,  // Keep the existing values
          ...PreData     // Overwrite with values from PreData (only if they exist in PreData)
        }));
      
        setData(prevData => ({
          ...prevData,
          NIHSSInitial: PreData.totalAuto,
         
        }));

      
        handleClose();
      
     
  };

  return (
    <>
     
    
        
         <form onSubmit={handleSubmit}>
         <Stack direction="row" alignItems="center" spacing={4}   >
            <Typography variant="h4" > Details NIHSS </Typography>
            <PdfButton pdfUrl="../../../public/pdf/ScoreNIHSS.pdf"  />
  
   </Stack>
   
    <Box
      sx={{ display: "flex", flexDirection: "row", alignItems: "center" ,p: 2 }}>


 <Grid container spacing={2} alignItems="center">

  
   <Grid item xs={4}>
   
     <Typography variant="h6" >  Categorie  </Typography>
     
   </Grid>
     <Grid item xs={8}>
       <TextField
         fullWidth
         label="Categorie"
         type="text"
         name="categorie"
         value={PreData.categorie}
         onChange={handleChange}

         margin="normal"
       />
     </Grid>
     
   


  
   

   {/* Example 2: Label with Two Related Fields */}
   <Grid item xs={4} >
   <Typography variant="h6" >  Date  </Typography>
   </Grid>

 
     <Grid item xs={8}>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
     <DatePicker
                        label="Date.."
                        name="date"
                        onChange={handleChangeDate('date')}
 format="DD/MM/YYYY"
                        // slotProps={{
                        //   textField: {
                        //     helperText: "",
                            
                        //   },
                        // }}

                         value={dayjs(PreData.date)}
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
                         
                        
                          value={dayjs(PreData.date)}
                          
                          onChange={handleChangeTime('date')}
                  
                        
                        />
                      </DemoContainer>
                    </LocalizationProvider>
     </Grid>
   


   {/* Repeat similar structure for other labels and fields */}
   {[
   { label: 'Vigilance', name1: 'vigilance'},
   { label: 'Orientation', name1: 'orientation'},
   { label: 'Commandes', name1: 'commandes' },
   { label: 'Oculomotricite', name1: 'oculomotricite' },
   { label: 'Champ Visuel', name1: 'champVisuel'},
   { label: 'Paralysie Faciale', name1: 'paralysieFaciale' },

   { label: 'Motricite Membre Sup (G)', name1: 'motriciteMembreSupG'},
   { label: 'Motricite Membre Sup (D)', name1: 'motriciteMembreSupD' },

   { label: 'Motricite Membre Int (G)', name1: 'motriciteMembreIntG' },
   { label: 'Motricite Membre Int (D)', name1: 'motriciteMembreIntD' },
   
   { label: 'Ataxie', name1: 'ataxie' },
   { label: 'Sensibilite', name1: 'sensibilite' },
   { label: 'Langage', name1: 'langage' },
   { label: 'Dysarthrie', name1: 'dysarthrie'},
   
   { label: 'Extinction Negligence', name1: 'extinctionNegligence' },

     // Add other fields similarly
   ].map((group, index) => (
     <React.Fragment key={index}>
        <Grid item xs={4} >
        
        
        <Typography variant="h6" >  {group.label}  </Typography>
    
    </Grid>
      
         <Grid item xs={8} >
          
            <Select
                 labelId="demosimpleselectlabel"
                 id="demosimpleselect"
                 value={PreData[group.name1]}
                 onChange={handleChange}
                 name={group.name1}
                 label={`${group.label} 1`}
          
                 fullWidth
                 
               >
                  <MenuItem value={0}>0 </MenuItem>
                 <MenuItem value={1}>1 </MenuItem>
                 <MenuItem value={2}>2  </MenuItem>
                 <MenuItem value={3}>3 </MenuItem>
                 <MenuItem value={4}>4  </MenuItem>
               </Select>
         </Grid>
        

     </React.Fragment>
   ))}

<Grid item xs={4} >
  
  <Typography variant="h4" >  Total  </Typography>

</Grid>
<Grid item xs={8}>
  <TextField
    fullWidth
    label="Total"
    type="number"
    name="totalAuto"
    value={PreData.totalAuto}
  
   disabled={true}
    margin="normal"
  />
</Grid>
 </Grid>


 


               
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

export default DetailsNihssForm




