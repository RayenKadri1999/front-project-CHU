import { Button, styled, TextField, Typography, FormControl, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import Box from "@mui/material/Box";

import Stack from "@mui/material/Stack";

import  React, { useState,useEffect } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";


import dayjs from "dayjs";


import { Grid } from "@mui/material";
import { Send } from "lucide-react";

import authHeader from "../../services/auth-header";
import PdfButton from "../../components/shared/PdfButton";
const AddNihssForm = ({handleClose,setData,setNihssData,setSuccessMessage}) => {

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

  
  useEffect(() => {
    totalCalc();
  }, [PreData]);
 

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
  const [error, setError] = useState(null);
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

  // useEffect(() => {
  //   setPreData((prevState) => ({
  //     ...prevState,  // Keep the existing values
  //     ...NihssData     // Overwrite with values from PreData (only if they exist in PreData)
  //   }));
  // }, []);


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
  //     const response = await fetch("http://localhost:3000/api/nihss/create", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         'x-access-token': authHeader()['x-access-token']
  //       },
  //       body: JSON.stringify(PreData)
  //     });


  //     if (response.status === 201) {
  //       // Patient updated successfully
  //       setCreateSuccess(true);
  //       console.log("Patient record create successfully!");
  //       const { nihssId } = await response.json();

  //       setExamenCliniqueData(prevData => ({
  //         ...prevData,
  //         NIHSSInitial: PreData.totalAuto,
  //         idNIHSS:nihssId,
  //       }));
      
  //       handleClose();
  //     } else {
  //       console.error("Patient record create failed:", response);
  //       handleClose();
  //     }
  //   } catch (error) {
  //     console.error("Error in handleSubmit:", error);
  //     handleClose();
  //   }
  // };
  const renderRadioGroup = (label, fieldName, maxValue) => (
    <React.Fragment>
      <Grid item xs={4}>
        <Typography variant="h6" sx={{ fontWeight: 'medium', color: '#333' }}>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <RadioGroup 
            row 
            value={PreData[fieldName]} 
            onChange={(e) => setPreData(prevData => ({ ...prevData, [fieldName]: e.target.value }))}
            sx={{ gap: 1 }}
          >
            {[...Array(maxValue + 1).keys()].map((value) => (
              <Box
                key={value}
                sx={{
                  border: PreData[fieldName] == value.toString() 
                    ? '2px solid #0E8388' 
                    : '1px solid #ccc',
                  borderRadius: 1,
                  backgroundColor: PreData[fieldName] == value.toString() 
                    ? '#e8f5f4' 
                    : 'white',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: PreData[fieldName] == value.toString() 
                      ? '#d1f2f0' 
                      : '#f5f5f5',
                    borderColor: '#0E8388'
                  }
                }}
              >
                <FormControlLabel
                  value={value.toString()}
                  control={
                    <Radio
                      sx={{ 
                        color: '#0E8388',
                        '&.Mui-checked': {
                          color: '#0E8388',
                        }
                      }}
                    />
                  }
                  label={
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: PreData[fieldName] == value.toString() ? 'bold' : 'normal',
                        minWidth: '20px',
                        textAlign: 'center'
                      }}
                    >
                      {value.toString()}
                    </Typography>
                  }
                  sx={{ 
                    m: 0,
                    p: 1,
                    minWidth: '60px',
                    justifyContent: 'center'
                  }}
                />
              </Box>
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>
    </React.Fragment>
  );

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
          NIHSSValue: PreData.totalAuto,
         
        }));

      
        handleClose();
      
     
  };

  return (
    
    
     <form onSubmit={handleSubmit}>
        <Box
           sx={{ display: "flex", flexDirection: "row", alignItems: "center"  }}>
            <Typography variant="h4" > Nouveau NIHSS </Typography>
            <PdfButton pdfUrl="../../../public/pdf/ScoreNIHSS.pdf"  />
  
   </Box>
      
         <Box
           sx={{ display: "flex", flexDirection: "row", alignItems: "center",p: 2  }}>
  
   
 <Grid container spacing={2} alignItems="center">

   {/* Example 1: Label with Two Related Fields */}
  
  
   <Grid item xs={4} >
       <Typography variant="h6" >  Categorie  </Typography>
   </Grid>

   
     <Grid item xs={8} >
       <TextField
         fullWidth
         label="Categorie"
         type="text"
         name="categorie"
         value={PreData.categorie}
         onChange={handleChange}
required
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
                        required
                      
                         value={dayjs(PreData.date)}
                          format="DD/MM/YYYY"
                      />
                      </LocalizationProvider>
       
     </Grid>
     



   <Grid item xs={4}>
   

       <Typography variant="h6" >  Heure  </Typography>
     
   </Grid>

     <Grid item xs={8}>
       
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["TimePicker"]}>
                        <TimePicker
                      label="Heure"
                         
                      required
                          value={dayjs(PreData.date)}
                          
                          onChange={handleChangeTime('date')}
                  
                        
                        />
                      </DemoContainer>
                    </LocalizationProvider>
     </Grid>
     
 


   {/* NIHSS Fields with Radio Buttons */}
   {renderRadioGroup("Vigilance", "vigilance", valueRange.vigilance)}
   {renderRadioGroup("Orientation", "orientation", valueRange.orientation)}
   {renderRadioGroup("Commandes", "commandes", valueRange.commandes)}
   {renderRadioGroup("Oculomotricité", "oculomotricite", valueRange.oculomotricite)}
   {renderRadioGroup("Champ Visuel", "champVisuel", valueRange.champVisuel)}
   {renderRadioGroup("Paralysie Faciale", "paralysieFaciale", valueRange.paralysieFaciale)}
   {renderRadioGroup("Motricité Membre Sup (G)", "motriciteMembreSupG", valueRange.motriciteMembreSupG)}
   {renderRadioGroup("Motricité Membre Sup (D)", "motriciteMembreSupD", valueRange.motriciteMembreSupD)}
   {renderRadioGroup("Motricité Membre Int (G)", "motriciteMembreIntG", valueRange.motriciteMembreIntG)}
   {renderRadioGroup("Motricité Membre Int (D)", "motriciteMembreIntD", valueRange.motriciteMembreIntD)}
   {renderRadioGroup("Ataxie", "ataxie", valueRange.ataxie)}
   {renderRadioGroup("Sensibilité", "sensibilite", valueRange.sensibilite)}
   {renderRadioGroup("Langage", "langage", valueRange.langage)}
   {renderRadioGroup("Dysarthrie", "dysarthrie", valueRange.dysarthrie)}
   {renderRadioGroup("Extinction Négligence", "extinctionNegligence", valueRange.extinctionNegligence)}


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
                     endIcon={<Send />}
                     className="button"
                    
                   >
                     Enregistrer
                   </Button>{" "}
                   
           

                 {/* </div> */}
               </Stack>
           </form>
  );
};
export default AddNihssForm;