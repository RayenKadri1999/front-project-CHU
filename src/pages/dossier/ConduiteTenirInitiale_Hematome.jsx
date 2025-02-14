import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Typography,
    FormControlLabel,
    RadioGroup,
    Radio,
    TextField,
    ThemeProvider,
    createTheme,
    FormLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormControl from "@mui/material/FormControl";
import SubmitButtons from "../../components/shared/SubmitButtons";
import Notifications from "../../components/shared/Notifications";
import apiServices from "../../services/api-services";
import { useParams } from "react-router-dom";

export default function PriseEnChargeAigue() {
    const { idDossier, id } = useParams(); //added id props
    const theme = createTheme({
        palette: {
            primary: {
                main: "#0E8388",
            },
        },
    });

    const [data, setData] = useState({
        thrombolyseIntraveineuse: "",
        BasseTA: "",
        BasseTADelai: "",
        BasseTAtypeTraitement: '',
        VoieAdministration: "",
        ReversionINR: "",
        INRinitial: "", // Changed to empty string
        PPSB: "",
        posologie: "",
        VITK: "",
        INRcontroleValeur: "",
        INRcontroleHeure: null,
        TestDeglutition: "",
        PriseEnChargeChirurgicale: "",
        InsulinotherapieEnSC: "",
        TraitementParVoieOraleType: "",
        InsulinotherapieEnSCHeure: null,
        Hypolipemiants: "",
        Atorvastatine: "",
        AtorvastatineDose: 0,
        Ezetimib: "",
        PCSK9: "",
        MatelasAntiEscarre: "",
        MatelasAntiEscarreHeure: null,
        ReeducationOrthophonique: "",
        ReeducationOrthophoniqueHeure: null,
        Verticalisation: "",
        VerticalisationHeure: null,
        SondeNasogastrique: "",
        SondeNasogastriqueHeure: null,
        ReeducationMotrice: "",
        ReeducationMotriceHeure: null, Hydratationparenterale: "", AnticoagulationPreventive: "",
        TraitementAntipyretique: "",
        BasContention: "",
        matricule: id , // Initialize with 'id' or an empty string if 'id' is not yet available.
    });

    const cleanData = (data) => {
        // Create a new object to avoid mutating the original one
        let cleanedData = { ...data };
        delete cleanedData._id;
        delete cleanedData.__v;
        delete cleanedData.patient; //remove patient id from cleanded data
        // Loop through the keys of the data
        Object.keys(cleanedData).forEach((key) => {
            // Remove fields that have an empty string or are unselected (null or undefined)
            if (
                cleanedData[key] === "" ||
                cleanedData[key] === null ||
                cleanedData[key] === undefined
            ) {
                delete cleanedData[key];
            }
        });

        return cleanedData;
    };

    const [isEditable, setIsEditable] = useState(false);
    const [isDataAvailable, setIsDataAvailable] = useState(false); // Initialize to false
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const SubSection = ({ title, name, value, handleChange, children, isEditable }) => (
        <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
            <Typography sx={{ mb: 1 }}>{title}</Typography>
            <RadioGroup
                row
                name={name}
                value={value}
                onChange={handleChange}
            >
                <FormControlLabel value="Oui" control={<Radio disabled={!isEditable} />} label="Oui" />
                <FormControlLabel value="Non" control={<Radio disabled={!isEditable} />} label="Non" />
            </RadioGroup>
            {children}
        </Box>
    );

    const TimePickerSection = ({ label, value, onChange, isEditable }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
                label={label}
                value={value}
                onChange={onChange}
                disabled={!isEditable}
                textField={<TextField fullWidth sx={{ mt: 2 }} />}
            />
        </LocalizationProvider>
    );

    const handleChangeBool = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleChangeHeure = (newValue) => {
        setData((prevState) => ({
            ...prevState,
            DelaiIntro: newValue,
        }));
    };

    const handleChangeDate = (name) => (newValue) => {
        setData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Ajout du matricule avant l'envoi
        const dataToSubmit = { ...data, matricule: id };

        // Nettoyage des données
        const cleanedData = cleanData(dataToSubmit);
console.log(isDataAvailable)
        try {
            let response;

            if (!isDataAvailable) {
                // Création de nouvelles données
                response = await apiServices.handleSubmit(
                    e,
                    cleanedData,
                    "conduitetenirinitialehematome", // Changed apiname
                    setSuccessMessage,
                    isDataAvailable,
                    setIsDataAvailable,
                    setIsEditable,
                    setError,
                    id
                );
            }
            else {
                //Update data
                response = await apiServices.handleSubmit(
                    e,
                    cleanedData,
                    "conduitetenirinitialehematome", // Changed apiname
                    setSuccessMessage,
                    isDataAvailable,
                    setIsDataAvailable,
                    setIsEditable,
                    setError,
                    id
                );
            }


            if (!response) {
                throw new Error("Aucune réponse du serveur.");
            }

            if (response.status === 201 || response.status === 200) {
                setSuccessMessage("Données soumises avec succès.");
                toast.success("Données soumises avec succès.");
                setIsDataAvailable(true);
                setIsEditable(false);
            } else {
                setError(`Erreur lors de la soumission des données: ${response.status}`);
                toast.error(`Erreur lors de la soumission des données: ${response.status}`);
            }
        } catch (err) {
            setError(err.message || "Erreur inconnue lors de la soumission.");
            toast.error(err.message || "Erreur inconnue lors de la soumission.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setIsEditable(false);
            setLoading(true);
            try {
                const response = await apiServices.loadDossierDetails(
                    setData, // set data
                    "conduitetenirinitialehematome", // apiname
                    setIsDataAvailable,
                    setError,            // setError
                    id                      // id
                );

                // Ensure 'matricule' is explicitly set when loading data
                setData((prevData) => ({
                    ...prevData,
                    ...response,  // Copy existing data
                    matricule: id, //OVERRIDE (OR ADD IF MISSING) MATRICULE HERE
                    patient: id
                }));


                console.log(isDataAvailable)
            } catch (error) {
                setError(error);
                setIsDataAvailable(false);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            setIsEditable(false);
            loadData();
        }
    }, [id]);


    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit}>
                <ToastContainer />
                <Typography variant="h4" gutterBottom>
                    Décision thérapeutique initiale
                </Typography>

                <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
                    {/* Traitement de recanalisation */}
                    <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
                        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                            <Typography sx={{ mr: 2 }}>Traitement antihypertenseur:</Typography>
                            <RadioGroup
                                row
                                name="TraitementAntihypertenseur"
                                value={data.TraitementAntihypertenseur}
                                onChange={handleChangeBool}
                            >
                                <FormControlLabel value="Oui" control={<Radio disabled={!isEditable} />} label="Oui" />
                                <FormControlLabel value="Non" control={<Radio disabled={!isEditable} />} label="Non" />
                            </RadioGroup>
                        </Box>

                        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                            <Typography sx={{ mr: 2 }}>Baisse de la TA {"< 14/8"}:</Typography>
                            <RadioGroup
                                row
                                name="BasseTA"
                                value={data.BasseTA}
                                onChange={handleChangeBool}
                            >
                                <FormControlLabel value="Oui" control={<Radio disabled={!isEditable} />} label="Oui" />
                                <FormControlLabel value="Non" control={<Radio disabled={!isEditable} />} label="Non" />
                            </RadioGroup>
                        </Box>

                        {data.BasseTA === "Oui" && (
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Delai"
                                        type="number"
                                        name="BasseTADelai"
                                        value={data.BasseTADelai}
                                        onChange={handleChange}
                                        inputProps={{ min: 0 }}
                                        fullWidth
                                        disabled={!isEditable}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <Typography sx={{ mr: 2 }}>Voie d’administration:</Typography>
                                    <RadioGroup
                                        row
                                        name="VoieAdministration"
                                        value={data.VoieAdministration}
                                        onChange={handleChangeBool}
                                    >
                                        <FormControlLabel value="Voie veineuse" control={<Radio disabled={!isEditable} />} label="Voie veineuse" />
                                        <FormControlLabel value="Voie orale" control={<Radio disabled={!isEditable} />} label="Voie orale" />
                                    </RadioGroup>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Type de Traitement"
                                        name="BasseTAtypeTraitement"
                                        value={data.BasseTAtypeTraitement}
                                        onChange={handleChange}
                                        fullWidth
                                        disabled={!isEditable}
                                    />
                                </Grid>
                            </Grid>
                        )}

                        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                            <Typography sx={{ mr: 2 }}>Réversion de L’INR:</Typography>
                            <RadioGroup
                                row
                                name="ReversionINR"
                                value={data.ReversionINR}
                                onChange={handleChangeBool}
                            >
                                <FormControlLabel value="Oui" control={<Radio disabled={!isEditable} />} label="Oui" />
                                <FormControlLabel value="Non" control={<Radio disabled={!isEditable} />} label="Non" />
                            </RadioGroup>
                        </Box>

                        {data.ReversionINR === "Oui" && (
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <TextField
                                        fullWidth
                                        name="INRintiale"
                                        label="INR intiale"
                                        value={data.INRintiale}
                                        onChange={handleChange}
                                        disabled={!isEditable}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <Typography sx={{ mr: 2 }}>PPSB:</Typography>
                                    <RadioGroup
                                        row
                                        name="PPSB"
                                        value={data.PPSB}
                                        onChange={handleChangeBool}
                                    >
                                        <FormControlLabel value="Oui" control={<Radio disabled={!isEditable} />} label="Oui" />
                                        <FormControlLabel value="Non" control={<Radio disabled={!isEditable} />} label="Non" />
                                    </RadioGroup>

                                    {data.PPSB === "Oui" && (
                                        <TextField
                                            fullWidth
                                            name="posologie"
                                            label="Posologie"
                                            value={data.posologie}
                                            onChange={handleChange}
                                            disabled={!isEditable}
                                        />
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography sx={{ mr: 2 }}>Vit K:</Typography>
                                    <RadioGroup
                                        row
                                        name="VITK"
                                        value={data.VITK}
                                        onChange={handleChangeBool}
                                    >
                                        <FormControlLabel value="Oui" control={<Radio disabled={!isEditable} />} label="Oui" />
                                        <FormControlLabel value="Non" control={<Radio disabled={!isEditable} />} label="Non" />
                                    </RadioGroup>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography sx={{ mr: 2 }}>INR de contrôle:</Typography>
                                    <TextField
                                        fullWidth
                                        name="INRcontroleValeur"
                                        label="Valeur"
                                        value={data.INRcontroleValeur}
                                        onChange={handleChange}
                                        disabled={!isEditable}
                                    />
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            label="Heure"
                                            value={data.INRcontroleHeure}
                                            onChange={handleChangeHeure}
                                            renderInput={(params) => <TextField {...params} disabled={!isEditable} />}
                                            disabled={!isEditable}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        )}
                    </Box>

                    <SubSection
                        title="Test de la déglutition"
                        name="TestDeglutition"
                        value={data.TestDeglutition}
                        handleChange={handleChangeBool} // Changed onChange to handleChange
                        isEditable={isEditable}
                    />
                    <SubSection
                        title="Prise en charge chirurgicale"
                        name="PriseEnChargeChirurgicale"
                        value={data.PriseEnChargeChirurgicale}
                        handleChange={handleChangeBool} // Changed onChange to handleChange
                        isEditable={isEditable}
                    />

                    <SubSection
                        title="Anticoagulation préventive"
                        name="AnticoagulationPreventive"
                        value={data.AnticoagulationPreventive}
                        handleChange={handleChangeBool} // Changed onChange to handleChange
                        isEditable={isEditable}
                    />
                    <SubSection
                        title="Bas de contention"
                        name="BasContention"
                        value={data.BasContention}
                        handleChange={handleChangeBool} // Changed onChange to handleChange
                        isEditable={isEditable}
                    />

                    <SubSection
                        title="Insulinothérapie en SC"
                        name="InsulinotherapieEnSC"
                        value={data.InsulinotherapieEnSC}
                        handleChange={handleChangeBool} // Changed onChange to handleChange
                        isEditable={isEditable}
                    />
                    <SubSection
                        title="Traitement antipyrétique"
                        name="TraitementAntipyretique"
                        value={data.TraitementAntipyretique}
                        handleChange={handleChangeBool} // Changed onChange to handleChange
                        isEditable={isEditable}
                    />

                    <SubSection
                        title="Rééducation Motrice"
                        name="ReeducationMotrice"
                        value={data.ReeducationMotrice}
                        handleChange={handleChangeBool} // Changed onChange to handleChange
                        isEditable={isEditable}
                    />
                    <SubSection
                        title="Matelas anti escarre "
                        name="MatelasAntiEscarre "
                        value={data.MatelasAntiEscarre}
                        handleChange={handleChangeBool} // Changed onChange to handleChange
                        isEditable={isEditable}
                    />
                    <SubSection
                        title="Hydratation parentérale"
                        name="Hydratationparenterale"
                        value={data.Hydratationparenterale}
                        handleChange={handleChangeBool} // Changed onChange to handleChange
                        isEditable={isEditable}
                    />
                    <SubSection
                        title="Rééducation orthophonique"
                        name="ReeducationOrthophonique"
                        value={data.ReeducationOrthophonique}
                        handleChange={handleChangeBool} // Changed onChange to handleChange
                        isEditable={isEditable}
                    />

                    <SubSection
                        title="Verticalisation"
                        name="Verticalisation"
                        value={data.Verticalisation}
                        handleChange={handleChangeBool} // Changed onChange to handleChange
                        isEditable={isEditable}
                    />

                    <SubSection
                        title="Sonde nasogastrique"
                        name="SondeNasogastrique"
                        value={data.SondeNasogastrique}
                        handleChange={handleChangeBool} // Changed onChange to handleChange
                        isEditable={isEditable}
                    >
                        {data.SondeNasogastrique === "Oui" && (
                            <TimePickerSection
                                label="Heure"
                                value={data.SondeNasogastriqueHeure}
                                onChange={handleChangeDate("SondeNasogastriqueHeure")}
                                isEditable={isEditable}
                            />
                        )}
                    </SubSection>

                </Box>

                <SubmitButtons isDataAvailable={isDataAvailable} setIsEditable={setIsEditable} isEditable={isEditable} />


                {successMessage && (
                    <Notifications Message={successMessage} setMessage={setSuccessMessage} />
                )}
            </form>
        </ThemeProvider>
    );
}