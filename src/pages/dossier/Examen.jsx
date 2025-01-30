import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { FormControlLabel, FormLabel, Radio, RadioGroup, Alert, Typography, Select,InputLabel,MenuItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { SendIcon } from "lucide-react";
import authHeader from "../../services/auth-header";
import SubmitButtons from "../../components/shared/SubmitButtons";
import Notifications from "../../components/shared/Notifications";
import apiServices from "../../services/api-services";
import { Delete as DeleteIcon } from '@mui/icons-material';
import ModalDialog from "./ModalDialog";
import AddNihssForm from './AddNihssForm';
import DetailsNihssForm from "./DetailsNihssForm";
import PdfButton from "../../components/shared/PdfButton";


const theme = createTheme({
  palette: {
    primary: {
      main: "#0E8388",
    },
  },
});

export default function ExamenClinique() {
   const { idDossier,id} = useParams();

  const [isEditable, setIsEditable] = useState(false);
  const [isDataAvailable, setIsDataAvailable] = useState(true);
  const [idNihss, setidNihss] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  const [examenCliniqueData, setExamenCliniqueData] = useState({
    NIHSSValue: '',
    idNIHSS:'',
    LASTInitial: '',
    ResultExamenNeuroInitial:"",
    TA: '',
    Dextro: '',
    AuscultationCardiaque: '',
    AuscultationPulmonaire: '',
    SouffleCarotidien: '',
    ResultsExamenGeneral:"",
    testDeglutition: {
      testDone: null,
      hasTrouble: null,
      typeOfTrouble: '',
    },
    Description: '',
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

//tous les champs //0..4

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
    const cleanData = (data) => {
        // Create a new object to avoid mutating the original one
        let cleanedData = { ...data };
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

  const [openAdd, setOpenAdd] = useState(false)
  const [openDetails, setOpenDetails] = useState(false)

  const handleOpen = (setOpenfunc) => {
    setOpenfunc(true)
  }

  const handleClose = (setOpenfunc) => {
    setOpenfunc(false)
  }



    const handleChange = (event) => {
        const { name, value } = event.target;

        setExamenCliniqueData((prevData) => {
            // Handle the change for testDeglutition attributes
            if (name === 'testDeglutition.testDone') {
                if (value === '') {
                    // If testDone is not selected, reset testDeglutition to null
                    return {
                        ...prevData,
                        testDeglutition: null,
                    };
                } else if (value === false) {
                    // If testDone is selected as "Non", set testDone to false and other fields to null
                    return {
                        ...prevData,
                        testDeglutition: {
                            testDone: false,
                            hasTrouble: null,
                            typeOfTrouble: null, // Ensure typeOfTrouble is null when testDone is false
                        },
                    };
                }
            }

            // If other parts of testDeglutition are modified, update only the specific attribute
            if (name === 'testDeglutition.hasTrouble' || name === 'testDeglutition.typeOfTrouble') {
                return {
                    ...prevData,
                    testDeglutition: {
                        ...prevData.testDeglutition,
                        [name.split('.').pop()]: value, // Update the correct property in testDeglutition
                    },
                };
            }

            // For other fields, just return the updated data
            return {
                ...prevData,
                [name]: value,
            };
        });
    };

  // const handleSubmit1 = (e) => {
  //   apiServices.handleSubmit(e,examenCliniqueData,"examenclinique",setSuccessMessage,isDataAvailable,setIsDataAvailable,setIsEditable,setError,id);
  //  }


  const handleSubmitDetNihss = async (e) => {
    e.preventDefault();
    const url = isDataAvailable
        ? `http://localhost:3000/api/nihss/update/${examenCliniqueData.idNIHSS}`
        : `http://localhost:3000/api/nihss/create`;

    const method = isDataAvailable ? "PUT" : "POST";  // Use PUT for updates

    try {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "x-access-token": authHeader()["x-access-token"],
            },
            body: JSON.stringify(NihssData),
        });

        if (response.status === 201 || response.status === 200) {
            let submitedexamenData = examenCliniqueData;

            console.log("Nihss updated successfully!");

            if (!isDataAvailable) {
                const { nihssId } = await response.json();
                console.log(nihssId);
                submitedexamenData.idNIHSS = nihssId;
            }
            const cleanedexamenData = cleanData(submitedexamenData);

            cleanedexamenData.NIHSSValue = NihssData.totalAuto;
            setExamenCliniqueData(cleanedexamenData); // Update state before submission
            apiServices.handleSubmit(e, cleanedexamenData, "examenclinique", setSuccessMessage, isDataAvailable, setIsDataAvailable, setIsEditable, setError, id);
        } else {
            setError("Veuillez valider Nihss");
        }
    } catch (error) {
        console.error("Error in handleSubmit:", error);
    }
};



  const handleSubmit = (e) => {
    handleSubmitDetNihss(e); // Call the second function

  };

   useEffect(() => {

    apiServices.loadDossierDetails(setExamenCliniqueData,"examenclinique",setIsDataAvailable,setError,id)

  }, []);

  useEffect(() => {
  setidNihss(examenCliniqueData.idNIHSS);
}, [examenCliniqueData.idNIHSS]);




  return (
    <ThemeProvider theme={theme}>

 <div className="App">

      <ModalDialog open={openAdd}
       handleClose={() => handleClose(setOpenAdd)}

      FormComponent={AddNihssForm}

  formProps={{                  // Pass the props that the form needs
    setData:setExamenCliniqueData,

    setNihssData:setNihssData,
    setSuccessMessage:setSuccessMessage,
  }}
  />
      <ModalDialog open={openDetails} handleClose={() => handleClose(setOpenDetails)}  FormComponent={DetailsNihssForm}
      formProps={{                  // Pass the props that the form needs
       idNihss: idNihss,
        setData: setExamenCliniqueData,
       setNihssData: setNihssData,
       setSuccessMessage:setSuccessMessage,
   }}

      />
    </div>

      <Box sx={{ display: "flex", flexDirection: "column", p: 3, maxWidth: 900 }}>

        <Typography variant="h4" gutterBottom>
          Examen Clinique
        </Typography>

        <form onSubmit={handleSubmit} >
        {error && <Alert severity="info">{error}</Alert>}
          {/*   Examen Neurologique initial */}

   <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
          <Typography variant="h6" gutterBottom>
            Examen Neurologique initial
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mb: 3 ,alignItems: "center"}}>
            <TextField
              required
              type="number"
              name="NIHSSValue"
              onChange={handleChange}
              value={examenCliniqueData.NIHSSValue}
              label="NIHSS Initial"
              fullWidth
              disabled={true}
            />

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
            <TextField

              type="number"
              name="LASTInitial"
              onChange={handleChange}
              value={examenCliniqueData.LASTInitial}
              label="Last Initial"
              fullWidth
              disabled={!isEditable}
              InputProps={{

                endAdornment:     <PdfButton pdfUrl="/pdf/LAST.pdf"  />,

                readOnly: !isEditable,
              }}
            />








          </Box>

      <Box sx={{ mt: 2 }}>
                <TextField
                  name="ResultExamenNeuroInitial"
                  label=""
                  disabled={!isEditable}
                  value={examenCliniqueData.ResultExamenNeuroInitial}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
              </Box>
      </Box>


          {/*   Examen Général */}
      <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
          <Typography variant="h6" gutterBottom >
            Examen Général
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2}}>
            <TextField

              name="TA"
              value={examenCliniqueData.TA}
              label="TA"
              onChange={handleChange}
              fullWidth
              disabled={!isEditable}
            />
            <TextField

              name="Dextro"
              value={examenCliniqueData.Dextro}
              label="Dextro"
              onChange={handleChange}
              fullWidth
              disabled={!isEditable}
            />
            <TextField

              name="AuscultationCardiaque"
              value={examenCliniqueData.AuscultationCardiaque}
              label="Auscultation Cardiaque"
              onChange={handleChange}
              fullWidth
              disabled={!isEditable}
            />
            <TextField

              name="AuscultationPulmonaire"
              value={examenCliniqueData.AuscultationPulmonaire}
              label="Auscultation Pulmonaire"
              onChange={handleChange}
              fullWidth
              disabled={!isEditable}
            />

            <FormControl component="fieldset">
              <FormLabel>Souffle Carotidien:</FormLabel>
              <RadioGroup
                row
                name="SouffleCarotidien"
                value={examenCliniqueData.SouffleCarotidien}
                onChange={handleChange}
                sx={{ mb: 2 }}
              >
                <FormControlLabel
                  value="Oui"
                  control={<Radio />}
                  label="Oui"
                  disabled={!isEditable}
                />
                <FormControlLabel
                  value="Non"
                  control={<Radio />}
                  label="Non"
                  disabled={!isEditable}
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box>
  <FormControl component="fieldset">
    <FormLabel>Test de déglutition</FormLabel>
    <RadioGroup
      row
      name="testDeglutition.testDone"
      value={examenCliniqueData.testDeglutition.testDone}
      onChange={handleChange}
      sx={{ mb: 2 }}
    >
      <FormControlLabel
        value="true"
        control={<Radio />}
        label="Oui"
        disabled={!isEditable}
      />
      <FormControlLabel
        value="false"
        control={<Radio />}
        label="Non"
        disabled={!isEditable}
      />
    </RadioGroup>

    {/* Trouble de Déglutition - conditionally rendered based on testDone */}
    {examenCliniqueData.testDeglutition.testDone && (
      <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ width: "100%" }}
      >
        <FormLabel>Trouble de Déglutition</FormLabel>
        <RadioGroup
          row
          name="testDeglutition.hasTrouble"
          value={examenCliniqueData.testDeglutition.hasTrouble}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          <FormControlLabel
            value="true"
            control={<Radio />}
            label="Oui"
            disabled={!isEditable}
          />
          <FormControlLabel
            value="false"
            control={<Radio />}
            label="Non"
            disabled={!isEditable}
          />
        </RadioGroup>

        {/* Type de Trouble - conditionally rendered based on hasTrouble */}
        {examenCliniqueData.testDeglutition.hasTrouble && (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <FormLabel>Type de Trouble</FormLabel>
            <Select
              name="testDeglutition.typeOfTrouble"
              value={examenCliniqueData.testDeglutition.typeOfTrouble}
              onChange={handleChange}
              disabled={!isEditable}
            >
              <MenuItem value="Aux liquides">Aux liquides</MenuItem>
              <MenuItem value="Aux solides">Aux solides</MenuItem>
              <MenuItem value="Globale">Globale</MenuItem>
            </Select>
          </FormControl>
        )}
      </Box>
    )}
  </FormControl>
</Box>


<Box sx={{ mt: 2 }}>
                <TextField
                  name="ResultsExamenGeneral"
                  label=""
                  disabled={!isEditable}
                  value={examenCliniqueData.ResultsExamenGeneral}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />
              </Box>












<SubmitButtons isDataAvailable={isDataAvailable} setIsEditable={setIsEditable} isEditable={isEditable}/>

{successMessage && (
  <Notifications Message={successMessage} setMessage={setSuccessMessage}/>
  )}

</Box>
        </form>
      </Box>
    </ThemeProvider>
  );
}
