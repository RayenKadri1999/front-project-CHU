import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
    Box,
    Button,
    Stack,
    TextField,
    Typography,
    createTheme,
    ThemeProvider,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
    Grid, Alert,
} from "@mui/material";


import dayjs from "dayjs";
import authHeader from "../../services/auth-header";
import TOFWillisSection from "./imagerie/TofWillis";
import T2SwanSection from "./imagerie/T2Swan";
import FatSatSection from "./imagerie/FatSat";
import ScannerSection from "./imagerie/scanner";
import TSASection from "./imagerie/TSA";
import PerfusionOrASLSection from "./imagerie/SequencePerfusion";
import PerfusionScanner from "./imagerie/ScannerPerfusion";
import FLAIR from "./imagerie/Flair";
import AspectsSection from "./imagerie/ASPECTS";
import IRM from "./imagerie/IRMCerebrale";
import Notifications from "../../components/shared/Notifications";
import SubmitButtons from "../../components/shared/SubmitButtons";
import apiServices from "../../services/api-services";
import TDMSection from "./imagerie/TDM";



export default function ImagerieHematome() {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#0E8388",
            },
        },
    });

    const navigate = useNavigate();
    const {  idDossier,id } = useParams();
    const [isEditable, setIsEditable] = useState(false);
    const [isDataAvailable, setIsDataAvailable] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState(null);

    const [imagerieData, setImagerieData] = useState({
        // IRM: "",
        // dateIRM: new Date(),
        // dateFinIRM: new Date(),
        // Diffusion1IRM:"",
        // Diffusion2IRM:"",
        // DetailsIRM:"",
        Synthèse:"",


        Synthèseflair:"",
        SynthèsetofWillis:"",
        Synthèset2Swan:"",
        SynthèseASL:"",
        SynthèseDWI:"",

        // DWI: "",
        // TOF_Willis: "",
        // FLAIR: "",
        // SWAN: "",
        // Angio_TDM: " ",
        // date_TDM_Angio: new Date(),
        // ECG: "",
        // TP: "",
        // Ratio_TCA: "",
        // D_dimères: "",
        // Fibrinogène: "",
        // Plaquettes: "",
        // Hémoglobine: "",
        // Dosage: "",
        matricule: id,
    });


    useEffect(() => {
        apiServices.loadDossierDetails(setImagerieData,"imagerie",setIsDataAvailable,setError,id)
    }, [id]);

    const toggleEditMode = () => {
        setIsEditable((prev) => !prev);
    };




    const handleChangecheck = (e, Data, setData, setcheckfunction, key) => {
        const { name, id, checked } = e.target;


        if (checked) {
            setcheckfunction((prevData) => ({
                ...prevData,
                [id]: true,
            }));

            // Update the key in imagerieData with the new name added
            const updatedArray = [...Data[key], name];

            setData((prevData) => ({
                ...prevData,
                [key]: updatedArray,
            }));
        } else {
            setcheckfunction((prevData) => ({
                ...prevData,
                [id]: false,
            }));

            const updatedArray = Data[key].filter(item => item !== name);

            setData((prevData) => ({
                ...prevData,
                [key]: updatedArray,
            }));
        }
    };

    const handleChange2 = (e,updateFunction) => {
        const { name, value } = e.target;

        updateFunction((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };





    const handleSubmit = (e) => {
        apiServices.handleSubmit(e,imagerieData,"imagerie",setSuccessMessage,isDataAvailable,setIsDataAvailable,setIsEditable,setError,id);
    }





    useEffect(() => {
        apiServices.loadDossierDetails(setImagerieData,"imagerie",setIsDataAvailable,setError,id)
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box  sx={{ display: "flex", flexDirection: "column", p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Imagerie
                </Typography>

                {!isDataAvailable && (
                    <Alert severity="warning">
                        Il n'y a pas de données pour ce patient.
                    </Alert>


                )}




                {/* scanner */}


                <TDMSection id={id} handleChange2={handleChange2}/>
                {/* IRM */}

                <IRM    id={id}   handleChange2={handleChange2}  handleChangecheck={handleChangecheck} />








                {/* scanner de prefusion */}


                {/* Synthese */}

                <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h6">Synthèse de l'imagerie (IRM/Scanner)</Typography>





                        <Box sx={{ mt: 2 }}>
                            <TextField
                                name="Synthèse"
                                label="Synthèse de l'imagerie(IRM/Scanner)"
                                disabled={!isEditable}
                                value={imagerieData.Synthèse}
                                onChange={(event) => handleChange2(event, setImagerieData)}
                                multiline
                                rows={7}
                                variant="outlined"
                                fullWidth
                            />
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
