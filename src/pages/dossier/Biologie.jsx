import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Send as SendIcon } from "@mui/icons-material";
import axios from "axios";
import authHeader from "../../services/auth-header";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import Notifications from "../../components/shared/Notifications";
import SubmitButtons from "../../components/shared/SubmitButtons";
import apiServices from "../../services/api-services";
import { Alert } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0E8388",
    },
  },
});

export default function Biologie() {
  const {  idDossier,id } = useParams();
  // const { userId, roles } = useAuth();

  const [isEditable, setIsEditable] = useState(false);
  const [isDataAvailable, setIsDataAvailable] = useState(true);

  const [biologieData, setBiologieData] = useState({
    Sodium: '',
    Potassium: '',
    Uree: '',
    Creatinine: '',
    CRP: '',
    CPK: '',
    HbA1C:"",
    Myoglobine: '',
    Troponine: '',
    NT_pro_BNP: '',
    VSH1: '',
    Hemoglobine: '',
    Leucocytes: '',
    Plaquettes: '',
    D_dimeres: '',
    Monomeres_de_fbrine: '',
    Fibrinogene: '',
    TP: '',
    Ratio_TCA: '',
    ASAT_GOT: '',
    ALAT_GPT: '',
    GGT: '',
    PAL: '',
    Hdl_Ch:"",
    Ldl_Ch:"",
    TG:"",
    CT_Total:"",
    Bilirubine_totale: '',
    Bilirubine_libre: '',
    matricule: id,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
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
  // const [changementRequest, setChangementRequest] = useState({
  //   userId: userId,
  //   status: 'en attente',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   adminId: '',
  //   changeType: 'NewBiologie',
  //   Data: '',
  //   matricule: id,
  // });

  // const loadDossierDetails = async () => {
  //   try {
  //     const result = await axios.get(`http://localhost:3000/api/biologie/getDetails/${id}`, { headers: authHeader() });
  //     if (result.data) {
  //       setBiologieData(result.data);
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 404) {
  //       setIsDataAvailable(false);
  //     } else {
  //       alert(error.message);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   loadDossierDetails();
  // }, [id]);

  const toggleEditMode = () => setIsEditable(prev => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBiologieData(prevData => ({ ...prevData, [name]: value }));
  };

 
  // const handleChangementRequest = async (e) => {
  //   e.preventDefault();
  //   setChangementRequest(prevData => ({
  //     ...prevData,
  //     createdAt: new Date(),
  //     Data: biologieData,
  //   }));

  //   try {
  //     const response = await fetch("http://localhost:3000/api/request/addrequest", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         'x-access-token': authHeader()['x-access-token'],
  //       },
  //       body: JSON.stringify(changementRequest),
  //     });

  //     if (response.status === 201) {
  //       console.log("Changement request added successfully");
  //       toggleEditMode();
  //     } else {
  //       const errorData = await response.json();
  //       console.error("Changement request creation failed:", errorData);
  //     }
  //   } catch (error) {
  //     console.error("Error in handleChangementRequest:", error);
  //   }
  // };



  const handleSubmit = (e) => {
    apiServices.handleSubmit(e,biologieData,"biologie",setSuccessMessage,isDataAvailable,setIsDataAvailable,setIsEditable,setError,id);
   }





   useEffect(() => {
    apiServices.loadDossierDetails(setBiologieData,"biologie",setIsDataAvailable,setError,id)
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Biologie
        </Typography>

        {/* <form onSubmit={roles === "superSuperUser" ? handleSubmit : handleChangementRequest}> */}
          
        <form onSubmit={handleSubmit}>
        {error && <Alert severity="info">{error}</Alert>}

<Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
            <Typography variant="h6">Biochimie du sang</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 2, mt: 2 }}>
              <TextField

                name="Sodium"
                label="Sodium"
                type="number"
                value={biologieData.Sodium}
                onChange={handleChange}
                disabled={!isEditable}
                InputProps={{ endAdornment: <InputAdornment position="end">mmol/l</InputAdornment> }}
              />
              <TextField

                name="Potassium"
                label="Potassium"
                type="number"
                value={biologieData.Potassium}
                onChange={handleChange}
                disabled={!isEditable}
                InputProps={{ endAdornment: <InputAdornment position="end">mmol/l</InputAdornment> }}
              />
              <TextField

                name="Urée"
                label="Urée"
                type="number"
                value={biologieData.Urée}
                onChange={handleChange}
                disabled={!isEditable}
                InputProps={{ endAdornment: <InputAdornment position="end">mmol/l</InputAdornment> }}
              />
              <TextField

                name="Créatinine"
                label="Créatinine"
                type="number"
                value={biologieData.Créatinine}
                onChange={handleChange}
                disabled={!isEditable}
                InputProps={{ endAdornment: <InputAdornment position="end">mmol/l</InputAdornment> }}
              />
              <TextField

                name="CRP"
                label="CRP"
                type="number"
                value={biologieData.CRP}
                onChange={handleChange}
                disabled={!isEditable}
                InputProps={{ endAdornment: <InputAdornment position="end">mg/l</InputAdornment> }}
              />
              <TextField

                  name="HbA1C"
                  label="HbA1C"
                  type="number"
                  value={biologieData.HbA1C}
                  onChange={handleChange}
                  disabled={!isEditable}
                  InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
              />

            </Box>
          </Box>

          <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
            <Typography variant="h6">Marqueurs cardio-vasculaires</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 2, mt: 2 }}>
              <TextField

                name="CPK"
                label="CPK"
                type="number"
                value={biologieData.CPK}
                onChange={handleChange}
                disabled={!isEditable}
                InputProps={{ endAdornment: <InputAdornment position="end">UI/l</InputAdornment> }}
              />
              <TextField

                name="Myoglobine"
                label="Myoglobine"
                type="number"
                value={biologieData.Myoglobine}
                onChange={handleChange}
                disabled={!isEditable}
                InputProps={{ endAdornment: <InputAdornment position="end">ng/l</InputAdornment> }}
              />
              <TextField

                name="Troponine"
                label="Troponine"
                type="number"
                value={biologieData.Troponine}
                onChange={handleChange}
                disabled={!isEditable}
                InputProps={{ endAdornment: <InputAdornment position="end">ng/l</InputAdornment> }}
              />
              <TextField

                name="NT_pro_BNP"
                label="NT pro BNP"
                type="number"
                value={biologieData.NT_pro_BNP}
                onChange={handleChange}
                disabled={!isEditable}
                InputProps={{ endAdornment: <InputAdornment position="end">pg/ml</InputAdornment> }}
              />
            </Box>
          </Box>

          <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
            <Typography variant="h6">Hématologie</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 2, mt: 2 }}>
              <TextField

                name="VSH1"
                label="VSH1"
                type="number"
                value={biologieData.VSH1}
                onChange={handleChange}
                disabled={!isEditable}
                InputProps={{ endAdornment: <InputAdornment position="end">mm</InputAdornment> }}
              />
              <TextField

                name="Hémoglobine"
                label="Hémoglobine"
                type="number"
                value={biologieData.Hémoglobine}
                onChange={handleChange}
                disabled={!isEditable}
                InputProps={{ endAdornment: <InputAdornment position="end">g/dl</InputAdornment> }}
              />
              <TextField

                name="Leucocytes"
                label="Leucocytes"
                type="number"
                value={biologieData.Leucocytes}
                onChange={handleChange}
                disabled={!isEditable}
                InputProps={{ endAdornment: <InputAdornment position="end">10^9/l</InputAdornment> }}
              />
              <TextField

                name="Plaquettes"
                label="Plaquettes"
                type="number"
                value={biologieData.Plaquettes}
                onChange={handleChange}
                disabled={!isEditable}
                InputProps={{ endAdornment: <InputAdornment position="end">10^9/l</InputAdornment> }}
              />
              <TextField

                name="D_dimères"
                label="D dimères"
                type="number"
                value={biologieData.D_dimères}
                onChange={handleChange}
                disabled={!isEditable}
                InputProps={{ endAdornment: <InputAdornment position="end">µg/l</InputAdornment> }}
              />
              <TextField

                name="Monomères_de_fbrine"
                label="Monomères de fibrine"
                type="number"
                value={biologieData.Monomères_de_fbrine}
                onChange={handleChange}
                disabled={!isEditable}
                InputProps={{ endAdornment: <InputAdornment position="end">µg/l</InputAdornment> }}
              />
              <TextField

                name="Fibrinogène"
                label="Fibrinogène"
                type="number"
                value={biologieData.Fibrinogène}
                onChange={handleChange}
                disabled={!isEditable}
                InputProps={{ endAdornment: <InputAdornment position="end">g/l</InputAdornment> }}
              />
              <TextField

                name="TP"
                label="TP"
                type="number"
                value={biologieData.TP}
                onChange={handleChange}
                disabled={!isEditable}
                InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
              />
              <TextField

                name="Ratio_TCA"
                label="Ratio TCA"
                type="number"
                value={biologieData.Ratio_TCA}
                onChange={handleChange}
                disabled={!isEditable}
              />
                  </Box>
          </Box>

          <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
            <Typography variant="h6">Bilan hépatique</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 2, mt: 2 }}>
              <TextField

                name="ASAT_GOT"
                label="ASAT/GOT"
                type="number"
                value={biologieData.ASAT_GOT}
                onChange={handleChange}
                disabled={!isEditable}
                InputProps={{ endAdornment: <InputAdornment position="end">UI/l</InputAdornment> }}
              />
              <TextField

                name="ALAT_GPT"
                label="ALAT/GPT"
                type="number"
                value={biologieData.ALAT_GPT}
                onChange={handleChange}
                disabled={!isEditable}
                InputProps={{ endAdornment: <InputAdornment position="end">UI/l</InputAdornment> }}
              />
              <TextField

                name="GGT"
                label="GGT"
                type="number"
                value={biologieData.GGT}
                onChange={handleChange}
                disabled={!isEditable}
                InputProps={{ endAdornment: <InputAdornment position="end">UI/l</InputAdornment> }}
              />
              <TextField

                name="PAL"
                label="PAL"
                type="number"
                value={biologieData.PAL}
                onChange={handleChange}
                disabled={!isEditable}
                InputProps={{ endAdornment: <InputAdornment position="end">UI/l</InputAdornment> }}
              />
              <TextField

                name="Bilirubine_totale"
                label="Bilirubine totale"
                type="number"
                value={biologieData.Bilirubine_totale}
                onChange={handleChange}
                disabled={!isEditable}
                InputProps={{ endAdornment: <InputAdornment position="end">mg/dl</InputAdornment> }}
              />
              <TextField

                name="Bilirubine_libre"
                label="Bilirubine libre"
                type="number"
                value={biologieData.Bilirubine_libre}
                onChange={handleChange}
                disabled={!isEditable}
                InputProps={{ endAdornment: <InputAdornment position="end">mg/dl</InputAdornment> }}
              />
            </Box>
            </Box>
          <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
            <Typography variant="h6">Bilan  lipidique</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 2, mt: 2 }}>
              <TextField

                  name="CT_Total"
                  label="CT-Total"
                  type="number"
                  value={biologieData.CT_Total}
                  onChange={handleChange}
                  disabled={!isEditable}
                  InputProps={{ endAdornment: <InputAdornment position="end">g/l</InputAdornment> }}
              />
              <TextField

                  name="TG"
                  label="TG"
                  type="number"
                  value={biologieData.TG}
                  onChange={handleChange}
                  disabled={!isEditable}
                  InputProps={{ endAdornment: <InputAdornment position="end">g/l</InputAdornment> }}
              />
              <TextField

                  name="Ldl_Ch"
                  label="Ldl-ch"
                  type="number"
                  value={biologieData.Ldl_Ch}
                  onChange={handleChange}
                  disabled={!isEditable}
                  InputProps={{ endAdornment: <InputAdornment position="end">g/l</InputAdornment> }}
              />
              <TextField

                  name="Hdl_Ch"
                  label="Hdl-ch"
                  type="number"
                  value={biologieData.Hdl_Ch}
                  onChange={handleChange}
                  disabled={!isEditable}
                  InputProps={{ endAdornment: <InputAdornment position="end">g/l</InputAdornment> }}
              />
            </Box>
          </Box>

          {/* <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button variant="contained" color="primary" type="submit" startIcon={<SendIcon />}>
              {isEditable ? "Save" : "Request Change"}
            </Button>
            <Button variant="outlined" color="secondary" onClick={toggleEditMode}>
              {isEditable ? "Cancel" : "Edit"}
            </Button>
          </Stack> */}


<SubmitButtons isDataAvailable={isDataAvailable} setIsEditable={setIsEditable} isEditable={isEditable}/>

{successMessage && (
  <Notifications Message={successMessage} setMessage={setSuccessMessage}/>
  )}

        </form>
      </Box>
    </ThemeProvider>
  );
}
