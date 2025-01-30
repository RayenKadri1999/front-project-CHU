import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { SendIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import authHeader from "../../services/auth-header";
import Notifications from "../../components/shared/Notifications";
import SubmitButtons from "../../components/shared/SubmitButtons";
import apiServices from "../../services/api-services";
import { FormControlLabel, FormLabel, Radio, RadioGroup, TextareaAutosize ,Alert} from "@mui/material";
import PdfButton from "../../components/shared/PdfButton";


const theme = createTheme({
  palette: {
    primary: {
      main: "#0E8388",
    },
  },
});


export default function Hospitaliere() {
   const { idDossier,id} = useParams();
   const initialHospitaliereData = {
    Allergies: '',
    HTA: '',
    Hypercholestérolémie: '',
    Diabète: '',
    Fibrillation_auriculaire: '',
    Ancienneté_fibrillation: '',
    SAS: '',
    SAS_appareillé: '',
    AIT: '',
    AVC: '',
    Cardiopathie_ischémique: '',
    Artériopathie: '',
    Autres_antécédents: '',
    Vit: '',
    Latéralité: '',
    Profession: '',
    Autonomie: '',
    Tabagisme: '',
    Chicha: '',
    Neffa: '',
    Consommation_alcool: '',
    Rankin_préAVC: '',
    GIR: '',
    Poids: '',
    Taille: '',
    IMC: '',
  
    HistoireMaladie:"",
    TraitementEntrée:"",
  
    matricule: id,
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

  const [isEditable, setIsEditable] = useState(false);
  const [isDataAvailable, setIsDataAvailable] = useState(true);
  const [hospitaliereData, setHospitaliereData] = useState({
    ...initialHospitaliereData,
    patient: id
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // useEffect(() => {
  //   const loadDossierDetails = async () => {
  //     try {
  //       setLoading(true);
  //       const result = await axios.get(`http://localhost:3000/api/hospitaliere/getDetails/${id}`, {
  //         headers: authHeader(),
  //       });

  //       if (result.data) {
  //         setHospitaliereData(result.data);
  //       } else {
  //         setIsDataAvailable(false);
  //       }
  //     } catch (error) {
  //       if (error.response?.status === 404) {
  //         setIsDataAvailable(false);
  //       } else {
  //         console.error("Error loading dossier details:", error);
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadDossierDetails();
  // }, [id]);

  const toggleEditMode = () => setIsEditable((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHospitaliereData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const url = isDataAvailable
  //     ? `http://localhost:3000/api/hospitaliere/update/${id}`
  //     : "http://localhost:3000/api/hospitaliere/create";
  //   const method = isDataAvailable ? "POST" : "POST";

  //   try {
  //     setLoading(true);
  //     const response = await fetch( url,{
  //       method,
       
  //       headers: {
  //         "Content-Type": "application/json",
  //        'x-access-token': authHeader()['x-access-token'],
  //       },
  //       body: JSON.stringify(hospitaliereData),
  //     });

  //     if (response.status === 200 || response.status === 201) {
  //       toggleEditMode();
  //       if (!isDataAvailable) {
  //         setIsDataAvailable(true);
  //       }
  //     } else {
  //       console.error("Failed to save hospitaliere:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error in handleSubmit:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

    const handleSubmit = (e) => {
        // Clean the data before sending it
        const cleanedHospitaliereData = cleanData(hospitaliereData);

        // Call the existing function to handle submission, passing the cleaned data
        apiServices.handleSubmit(
            e,
            cleanedHospitaliereData,
            "hospitaliere",
            setSuccessMessage,
            isDataAvailable,
            setIsDataAvailable,
            setIsEditable,
            setError,
            id
        );
        console.log(error)

    };
    console.log("success")
    console.log(error)
   useEffect(() => {
    apiServices.loadDossierDetails(setHospitaliereData,"hospitaliere",setIsDataAvailable,setError,id)
  }, []);


  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", p: 3 }}>
        <form onSubmit={handleSubmit}>
    
          
          <Typography variant="h4" gutterBottom>
            Hospitalière
          </Typography>
          {error && <Alert severity="info">{error}</Alert>}
          <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
          <Typography variant="h6" gutterBottom>
            Antécédents
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {[
              { label: "Allergies", name: "Allergies", type: "radio", options: ["Oui", "Non"] },
              { label: "HTA", name: "HTA", type: "radio", options: ["Oui", "Non"] },
              { label: "Hypercholestérolémie", name: "Hypercholestérolémie", type: "radio", options: ["Oui", "Non"] },
              { label: "Diabète", name: "Diabète", type: "radio", options: ["Oui", "Non"] },
              { label: "Fibrillation auriculaire", name: "Fibrillation_auriculaire", type: "radio", options: ["paroxystique", "permanente"] },
              { label: "Ancienneté de fibrillation", name: "Ancienneté_fibrillation", type: "radio", options: ["Oui", "Non"] },
              { label: "SAS", name: "SAS", type: "radio", options: ["Oui", "Non"] },
              { label: "SAS appareillé", name: "SAS_appareillé", type: "radio", options: ["Oui", "Non"] },
              { label: "AIT", name: "AIT", type: "radio", options: ["Oui", "Non"] },
              { label: "AVC", name: "AVC", type: "radio", options: ["ischémique", "hémorragique"] },
              { label: "Cardiopathie ischémique", name: "Cardiopathie_ischémique", type: "radio", options: ["Oui", "Non"] },
              { label: "Artériopathie des membres inférieurs", name: "Artériopathie", type: "radio", options: ["Oui", "Non"] },
              { label: "Autres antécédents", name: "Autres_antécédents" },
            ].map((field) => (
              field.type === "radio" ? (
                <Box key={field.name} sx={{ m: 1, width: "25ch" }}>
                  <FormControl fullWidth>
                  <FormLabel component="legend">{field.label}</FormLabel>
                  <RadioGroup
            name={field.name}
            value={hospitaliereData[field.name] || ""}
            onChange={handleChange}
            
          >
            {field.options.map((option) => (
              <FormControlLabel
                key={option}

                value={option}
                control={<Radio disabled={!isEditable} />}
                label={option}
              />
            ))}
          </RadioGroup>
                  </FormControl>
                </Box>
              ) : (
                <TextField
                  key={field.name}
                  label={field.label}

                  name={field.name}
                  onChange={handleChange}
                  value={hospitaliereData[field.name]}
                  disabled={!isEditable}
                  fullWidth
                  sx={{ m: 1, width: "79ch" }}
                  InputProps={{
                    readOnly: !isEditable,
                  }}
                />
              )
            ))}
          </Box>
          </Box>

          <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
          <Typography variant="h6" gutterBottom mt={2}>
            Mode de vie
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {[
              { label: "Vit", name: "Vit", type: "select", options: ["seul", "en famille", "en institution", "Autre"] },
              { label: "Profession", name: "Profession" },
              { label: "Autonomie", name: "Autonomie" },
            
              { label: "Latéralité", name: "Latéralité" , type: "radio", options: ["Droite", "Gauche"]},  
              { label: "Tabagisme", name: "Tabagisme", type: "radio", options: ["Oui", "Non"] },
              { label: "Chicha", name: "Chicha", type: "radio", options: ["Oui", "Non"] },
              { label: "Neffa", name: "Neffa", type: "radio", options: ["Oui", "Non"]},
              { label: "Consommation d'alcool", name:"Consommation_alcool" , type: "radio", options: ["Oui", "Non"] },
            
              { label: "Rankin préAVC", name: "Rankin_préAVC", type: "number", max: 6 },
              { label: "GIR", name: "GIR", type: "number", max: 6 },
              { label: "Poids", name: "Poids", type: "number", unit: "kg" },
              { label: "Taille", name: "Taille", type: "number", unit: "cm" },
              { label: "IMC", name: "IMC", type: "number" },
            ].map((field) => (
              field.type === "radio" ? (
                <Box key={field.name} sx={{ m: 1, width: "25ch" }}>
                  <FormControl fullWidth>
                  <FormLabel component="legend">{field.label}</FormLabel>
                  <RadioGroup
                  
            name={field.name}
            value={hospitaliereData[field.name] || ""}
            onChange={handleChange}
            
          >
            {field.options.map((option) => (
              <FormControlLabel

                key={option}
                value={option}
                control={<Radio disabled={!isEditable} />}
                label={option}
              />
            ))}
          </RadioGroup>
                  </FormControl>
                </Box>
              ) : (
                field.name === "GIR" ? (
    
              <TextField
                key={field.name}
                label={field.label}
                name={field.name}
                onChange={handleChange}
                value={hospitaliereData[field.name]}
                disabled={!isEditable}
                sx={{ m: 1,  width: "25ch" }}
                type={field.type || "text"}
                InputProps={{
                  
                  endAdornment:   <PdfButton pdfUrl="/pdf/GIR.pdf" />,
               
                  readOnly: !isEditable,
                }}
                inputProps={{
                  min: field.min || 0,
                  max: field.max || 100,
                }}
              />
            ) : 
              field.name === "Rankin_préAVC" ? (
  
            <TextField
              key={field.name}
              label={field.label}
              name={field.name}
              onChange={handleChange}
              value={hospitaliereData[field.name]}
              disabled={!isEditable}

              sx={{ m: 1,  width: "25ch" }}
              type={field.type || "text"}
              InputProps={{
                
                endAdornment:   <PdfButton pdfUrl="/pdf/mRS.pdf" />,
             
                readOnly: !isEditable,
              }}
              inputProps={{
                min: field.min || 0,
                max: field.max || 100,
              }}
            />)
              
                : field.type === "select" ? (
                <Box key={field.name} sx={{ m: 1, width: "25ch" }}>
                  <FormControl fullWidth>
                  <FormLabel>{field.label}</FormLabel>
                    <Select
                      label={field.label}
                      name={field.name}
                      value={hospitaliereData[field.name] || ""}
                      onChange={handleChange}
                      disabled={!isEditable}

                    >
                      {field.options.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
             
             
               ):(   
                           <TextField
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  onChange={handleChange}
                  value={hospitaliereData[field.name]}
                  disabled={!isEditable}
                  sx={{ m: 1, width: "25ch" }}
                  type={field.type || "text"}
                  InputProps={{
                    endAdornment: field.unit && (
                      <InputAdornment position="end">{field.unit}</InputAdornment>
                    ),
                    readOnly: !isEditable,
                  }}
                  inputProps={{
                    min: field.min || 0,
                    max: field.max || 300,
                  }}
                />)
              
            )))}
          </Box>
          </Box>

          <Typography variant="h6" gutterBottom>
          Histoire de la maladie :
          </Typography>
          
          <TextareaAutosize
            minRows={10}
            value={hospitaliereData.HistoireMaladie}
            style={{ width: "100%", padding: 8 }}
            name="HistoireMaladie"
            onChange={handleChange}
            disabled={!isEditable}
          />


<Typography variant="h6" gutterBottom>
          Traitement à l'entrée
          </Typography>
          
          <TextareaAutosize
            minRows={10}
            value={hospitaliereData.TraitementEntrée}
            style={{ width: "100%", padding: 8 }}
            name="TraitementEntrée"
            onChange={handleChange}
            disabled={!isEditable}
          />

          <SubmitButtons isDataAvailable={isDataAvailable} setIsEditable={setIsEditable} isEditable={isEditable}/>


{successMessage && (
<Notifications Message={successMessage} setMessage={setSuccessMessage}/>
)}

        </form>
      </Box>
    </ThemeProvider>
  );
}
