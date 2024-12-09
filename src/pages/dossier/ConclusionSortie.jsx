import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import {Button, IconButton, TextareaAutosize, Typography, Alert, FormLabel} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Delete as DeleteIcon } from '@mui/icons-material';
import authHeader from "../../services/auth-header";
import PdfButton from "../../components/shared/PdfButton";

import Notifications from "../../components/shared/Notifications";
import SubmitButtons from "../../components/shared/SubmitButtons";
import apiServices from "../../services/api-services";
import ModalDialog from "./ModalDialog";
import AddNihssForm from "./AddNihssForm";
import DetailsNihssForm from "./DetailsNihssForm";
export default function ConclusionSortie() {
  const {  idDossier,id } = useParams();
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
  const [idNihss, setidNihss] = useState();
  const [conclusionSortieData, setConclusionSortieData] = useState({
    NIHSSValue: '',
    mRsSortie: '',
    idNIHSS:'',
    LastSortie: '',
    ModeSortie: '',
    TraitementSortie: [''], 
    RecommandationsSortie: [''],
    Conclusion: '',
    matricule: id,
  });


const [NihssData, setNihssData] = useState({
    
  categorie: '',
  date: new Date(),

  totalAuto: '',

  vigilance: '',
  orientation: '',
  commandes: '',
  oculomotricite: '',
  champVisuel: '',
  paralysieFaciale: '',


  motriciteMembreSupG: '',


  motriciteMembreSupD: '',

  motriciteMembreIntG: '',


  motriciteMembreIntD: '',

  ataxie: '',

  sensibilite: '',

  langage: '',

  dysarthrie: '',

  extinctionNegligence: '',

  matricule: id,

   
  });

  const [openAdd, setOpenAdd] = useState(false)
  const [openDetails, setOpenDetails] = useState(false)

  const handleOpen = (setOpenfunc) => {
    setOpenfunc(true)
  }

  const handleClose = (setOpenfunc) => {
    setOpenfunc(false)
  }


 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConclusionSortieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };





  // const handleSubmit = (e) => {
  //   apiServices.handleSubmit(e,conclusionSortieData,"conclusionsortie",setSuccessMessage,isDataAvailable,setIsDataAvailable,setIsEditable,setError,id);
  //  }


const handleSubmitDetNihss= async (e) => {
    e.preventDefault();
    const url = isDataAvailable
    ? `http://localhost:3000/api/nihss/update/${conclusionSortieData.idNIHSS}`
    : `http://localhost:3000/api/nihss/create`;
  const method = isDataAvailable ? "POST" : "POST";

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": authHeader()["x-access-token"],
      },
      body: JSON.stringify(NihssData),
    });
   


      if (response.status === 201) {
        let submitedconcData=conclusionSortieData;
 
        console.log("Nihss  updated successfully!");

        if(!isDataAvailable){ 
          // ONLY FOR FIRST CREATION
        const { nihssId } = await response.json();
        console.log(nihssId);
        submitedconcData.idNIHSS=nihssId;
      

       
        }
        submitedconcData.NIHSSValue=NihssData.totalAuto;
        apiServices.handleSubmit(e,conclusionSortieData,"conclusionsortie",setSuccessMessage,isDataAvailable,setIsDataAvailable,setIsEditable,setError,id);
        setConclusionSortieData(submitedconcData)
      } else {
      
        setError("Veuillez valider Nihss ")
      }
    } catch (error) {
      setError("Erreur :", error.message);

    }
  };

  const handleSubmit = (e) => {
    handleSubmitDetNihss(e); // Call the second function
   
  };
   useEffect(() => {
    apiServices.loadDossierDetails(setConclusionSortieData,"conclusionsortie",setIsDataAvailable,setError,id)
  }, []);


  useEffect(() => {
    setidNihss(conclusionSortieData.idNIHSS);
  }, [conclusionSortieData.idNIHSS]);
 
  
    // Handle change for each TextField
    const handleChange2 = (index, event) => {
      const {name ,value} = event.target;
      const newT_RSortie = [...conclusionSortieData[name]];
      newT_RSortie[index] = value;
      setConclusionSortieData({
        ...conclusionSortieData,
        [name]: newT_RSortie,
      });
    };
  
    // Add new TextField
    const addTextField = (name) => {
      setConclusionSortieData({
        ...conclusionSortieData,
        [name]: [...conclusionSortieData[name], ''], // Add an empty string to the array
      });
    };
  
    // Remove a TextField by index
    const removeTextField = (index,name) => {
      const newRecommandationSortie = conclusionSortieData[name].filter(
        (_, i) => i !== index
      );
      setConclusionSortieData({
        ...conclusionSortieData,
        [name]: newRecommandationSortie,
      });
    };

    
  return (
    <ThemeProvider theme={theme}>

<div className="App">
 
 <ModalDialog open={openAdd}
  handleClose={() => handleClose(setOpenAdd)} 

 FormComponent={AddNihssForm} 

formProps={{                  // Pass the props that the form needs
  setData:setConclusionSortieData,

setNihssData:setNihssData,
setSuccessMessage:setSuccessMessage,
}}
/>
 <ModalDialog open={openDetails} handleClose={() => handleClose(setOpenDetails)}  FormComponent={DetailsNihssForm}
 formProps={{                  // Pass the props that the form needs
   idNihss,
   setData:  setConclusionSortieData,
   setNihssData:setNihssData,
   setSuccessMessage:setSuccessMessage,
}}

 />
</div>


      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <form onSubmit={handleSubmit}>
          

            <Typography variant="h4" gutterBottom>
              Conclusion Sortie
            </Typography>
            {error && <Alert severity="info">{error}</Alert>}
           

            <Typography variant="h6" gutterBottom mt={3}>
              Conclusion
            </Typography>
            <TextareaAutosize
              minRows={8}
              name="Conclusion"
              value={conclusionSortieData.Conclusion}
              onChange={handleChange}
              disabled={!isEditable}
              style={{ width: "100%", padding: 8  ,marginBottom:20 }}
            />

            <Typography variant="h6" gutterBottom>
            Nihss/LAST/mRS
            </Typography>
            <Grid container spacing={2} sx={{alignItems:'center'}}>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  type="number"
                  name="NIHSSValue"
                  label="Nihss Sortie"
                  value={conclusionSortieData.NIHSSValue}
                  onChange={handleChange}
                  disabled={true}
                  fullWidth
                />
                 </Grid>

                 <Grid item xs={2} sm={1}>
                  {!isDataAvailable ? (
         
            <Button
              variant="contained"
              color="primary"
              onClick={ () => handleOpen(setOpenAdd)}
              sx={{ minWidth: 40, height: 40 }} 
               disabled={!isEditable}
            >+
            </Button>
                   ) : ( 
           <Button
            variant="contained"
            color="primary"
            onClick={ () => handleOpen(setOpenDetails)}
            sx={{ minWidth: 40, height: 40 }} 
              disabled={!isEditable}
          >...
          </Button>
        
                )
              
      }
        </Grid>
              
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  type="number"
                  name="LastSortie"
                  label="LAST Sortie"
                  value={conclusionSortieData.LastSortie}
                  onChange={handleChange}
                  InputProps={{
                  
                    endAdornment:     <PdfButton pdfUrl="/pdf/LAST.pdf"  />,
                 
                    readOnly: !isEditable,
                  }}
                  disabled={!isEditable}
                  fullWidth
                />
                 
              </Grid>

             



            </Grid>


              <FormControl display="flex" alignItems="center"  sx={{ mt: 2 ,width: '50%'}}>
                  <FormLabel>Mode Sortie </FormLabel>
                  <Select
                      name="ModeSortie"
                      value={conclusionSortieData.ModeSortie}
                      onChange={handleChange}
                      disabled={!isEditable}
                  >
                      <MenuItem value="A domicile">A domicile</MenuItem>
                      <MenuItem value="Transfert dans un autre service">Transfert dans un autre service</MenuItem>
                      <MenuItem value="Décés">Décés</MenuItem>
                  </Select>
              </FormControl>
<Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
            <Typography variant="h6" gutterBottom mt={1}>
              Traitement Sortie
            </Typography>

            {conclusionSortieData.TraitementSortie.map((value, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
  
            label={`Traitement Sortie ${index + 1}`}
            value={value}
            name="TraitementSortie"
            onChange={(e) => handleChange2(index, e)}
            fullWidth
            margin="normal"
            disabled={!isEditable}
          />

          <IconButton
            onClick={() => removeTextField(index,"TraitementSortie")}
            aria-label="delete"
            color="primary"
            disabled={!isEditable}
        
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ))}

      {/* Button to add a new TextField */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => addTextField("TraitementSortie")}
        disabled={!isEditable}
      >
        +
      </Button>

      </Box>

      <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
      <Typography variant="h6" gutterBottom mt={1}>
               Recommandations Sortie
            </Typography>

            {/* <FormControl fullWidth sx={{ mt:  2}}>
              <InputLabel id="select-label">Recommandations Sortie</InputLabel>
              <Select
                labelId="select-label"
                name="RecommandationsSortie"
                value={conclusionSortieData.RecommandationsSortie}
                onChange={handleChange}
                label="Recommandations Sortie"
                disabled={!isEditable}
              >
                <MenuItem value="ajustementTherapeutique">Ajustement Thérapeutique</MenuItem>
                <MenuItem value="examensComplementaires">Examens Complémentaires</MenuItem>
              </Select>
            </FormControl> */}

            {conclusionSortieData.RecommandationsSortie.map((value, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
  
            label={`Recommandation Sortie ${index + 1}`}
            value={value}
            name="RecommandationsSortie"
            onChange={(e) => handleChange2(index, e)}
            fullWidth
            margin="normal"
            disabled={!isEditable}
          />

          <IconButton
            onClick={() => removeTextField(index,"RecommandationsSortie")}
            aria-label="delete"
            color="primary"
            disabled={!isEditable}
        
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ))}

      {/* Button to add a new TextField */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => addTextField("RecommandationsSortie")}
        disabled={!isEditable}
      >
        +
      </Button>

      </Box>
<SubmitButtons isDataAvailable={isDataAvailable} setIsEditable={setIsEditable} isEditable={isEditable}/>

{successMessage && (
  <Notifications Message={successMessage} setMessage={setSuccessMessage}/>
  )}

          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
