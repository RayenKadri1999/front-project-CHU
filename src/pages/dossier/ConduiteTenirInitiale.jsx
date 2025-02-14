
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

    const [initialconduiteTenirdata, setintialconduiteTenirData] = useState({
        thrombolyseIntraveineuse: "",
        doorToNeedle: null,
        doorToNeedleDetails: "",
        actilyse: "",
        tenecteplase: "",
        delayExceeded: "",
        recentHypodensity: "",
        otherCauses: "",
        anticoagulationTherapy: "",
        motorRehabilitation: "",
        rehabilitationTime: null,
        plaquettes: "",
        INR: "",
        AnticoagulationCurative: "",
        AITSansOcclusion: "",
        DeficitMineurSansOcclusion: "",
        ChirurgieRecente: "",
        HemorragieRecente: "",
        AnticoagulationCurativeII: "",
        ThrombectomieMecanique: "",
        ThrombectomieMecaniqueHeure: null,
        StentRetriever: "",
        ThromboAspiration: "",
        TICI: "",
        HNF: "",
        HBPM: "",
        AOD: "",
        DelaiIntro: null,
        SimpleAntiAgregationPlaquettaire: "",
        SimpleAntiAgregationPlaquettaireType: "",
        DoubleAntiAgregationPlaquettaire: "",
        DoubleAntiAgregationPlaquettaireDose: "",
        DoubleAntiAgregationPlaquettaireDoseHeure: null,
        DoubleAntiAgregationPlaquettaireType: "",
        AnticoagulationCurativeIIHeure: null,
        TraitementAntihypertenseur: "",
        TraitementParVoieIntraveineuse: "",
        TraitementParVoieIntraveineuseHeure: null,
        Nicardipine: "",
        TraitementParVoieIntraveineuseAutresMolecules: "",
        TraitementParVoieOrale: "",
        TraitementParVoieOraleHeure: null,
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
        ReeducationMotriceHeure: null,
        matricule: id || "", // Initialize with 'id' or an empty string if 'id' is not yet available.
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
    const [conduiteTenirData, setconduiteTenirData] = useState({
        ...initialconduiteTenirdata,
        patient: id,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const SubSection = ({ title, name, value, handleChange, children ,isEditable }) => (
        <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
            <Typography sx={{ mb: 1 }}>{title}</Typography>
            <RadioGroup row name={name} value={value}    onChange={handleChange}>
                <FormControlLabel value="Oui" control={<Radio disabled={!isEditable} />} label="Oui" />
                <FormControlLabel value="Non" control={<Radio disabled={!isEditable} />} label="Non" />
            </RadioGroup>
            {children}
        </Box>
    );
    const TimePickerSection = ({ label, value, onChange ,isEditable }) => (
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
        setconduiteTenirData((prevData) => ({
            //fixed setData to setconduiteTenirData
            ...prevData,
            [name]: value,
        }));
    };
    const handleChangeHeure = (newValue) => {
        setconduiteTenirData((prevState) => ({
            //fixed setData to setconduiteTenirData
            ...prevState,
            DelaiIntro: newValue,
        }));
    };
    const handleChangeDate = (name) => (newValue) => {
        setconduiteTenirData((prevData) => ({
            //fixed setData to setconduiteTenirData
            ...prevData,
            [name]: newValue,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setconduiteTenirData((prevData) => ({
            //fixed setData to setconduiteTenirData
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Ajout du matricule avant l'envoi
        const dataToSubmit = { ...conduiteTenirData, matricule: id };

        // Nettoyage des données
        const cleanedData = cleanData(dataToSubmit);

        try {
            let response;

            if (!isDataAvailable) {
                // Création de nouvelles données
                response = await apiServices.handleSubmit(
                    e,
                    cleanedData,
                    "conduitetenirinitiale",
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
                    setconduiteTenirData, // set data
                    "conduitetenirinitiale", // apiname
                    setIsDataAvailable,
                    setError,            // setError
                    id                      // id
                );

                // Ensure 'matricule' is explicitly set when loading data
                setconduiteTenirData((prevData) => ({
                    ...prevData,
                    ...response,  // Copy existing data
                    matricule: id, //OVERRIDE (OR ADD IF MISSING) MATRICULE HERE
                    patient: id
                }));
                setIsDataAvailable(true);
            } catch (error) {
                setError(error);
                setIsDataAvailable(false);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
setIsEditable(false) ;
loadData();
        }
    }, [id]);


    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit}>
                <Typography variant="h4" gutterBottom>
                    Prise en charge à la phase aigue
                </Typography>
                <ToastContainer />

                {/* Box I: Pharmacologique */}
                <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
                    <Typography variant="h5" gutterBottom>
                        Pharmacologique
                    </Typography>
                    <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>

                    {/* Traitement de recanalisation */}
                    <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                        Traitement de recanalisation
                    </Typography>
                    <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                        <Typography sx={{ mr: 2 }}>Thrombolyse Intraveineuse:</Typography>
                        <RadioGroup
                            row
                            name="thrombolyseIntraveineuse"
                            value={conduiteTenirData.thrombolyseIntraveineuse}
                            onChange={handleChangeBool}
                            disabled={!isEditable}
                        >
                            <FormControlLabel value="Oui" control={<Radio disabled={!isEditable} />}label="Oui" />
                            <FormControlLabel value="Non" control={<Radio disabled={!isEditable} />} label="Non" />
                        </RadioGroup>
                    </Box>

                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label="Door to Needle"
                                    value={conduiteTenirData.doorToNeedle}
                                    onChange={handleChangeDate("doorToNeedle")}
                                    disabled={!isEditable}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Autres détails"
                                name="doorToNeedleDetails"
                                value={conduiteTenirData.doorToNeedleDetails}
                                onChange={handleChange}
                                disabled={!isEditable}
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    {/* Conditional Fields for Thrombolyse Intraveineuse */}
                    {conduiteTenirData.thrombolyseIntraveineuse === "Oui" && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Typography sx={{ mr: 2 }}>Actilyse:</Typography>
                                    <RadioGroup
                                        row
                                        name="actilyse"
                                        value={conduiteTenirData.actilyse}
                                        disabled={!isEditable}

                                        onChange={handleChangeBool}
                                    >
                                        <FormControlLabel value="Oui" control={<Radio disabled={!isEditable} />} label="Oui" />
                                        <FormControlLabel value="Non"control={<Radio disabled={!isEditable} />} label="Non" />
                                    </RadioGroup>
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Typography sx={{ mr: 2 }}>Ténecteplase:</Typography>
                                    <RadioGroup
                                        row
                                        name="tenecteplase"
                                        value={conduiteTenirData.tenecteplase}
                                        onChange={handleChangeBool}
                                        disabled={!isEditable}

                                    >
                                        <FormControlLabel value="Oui"  control={<Radio disabled={!isEditable} />} label="Oui" />
                                        <FormControlLabel value="Non"  control={<Radio disabled={!isEditable} />} label="Non" />
                                    </RadioGroup>
                                </Box>
                            </Grid>
                        </Grid>
                    )}

                    {conduiteTenirData.thrombolyseIntraveineuse === "Non" && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Typography sx={{ mr: 2 }}>Délai dépassé:</Typography>
                                    <RadioGroup
                                        row
                                        name="delayExceeded"
                                        value={conduiteTenirData.delayExceeded}
                                        onChange={handleChangeBool}
                                        disabled={!isEditable}

                                    >
                                        <FormControlLabel value="Oui"  control={<Radio disabled={!isEditable} />} label="Oui" />
                                        <FormControlLabel value="Non"  control={<Radio disabled={!isEditable} />} label="Non" />
                                    </RadioGroup>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Typography sx={{ mr: 2 }}> Présence d’une hypodensité récente au TDM cérébrale</Typography>
                                    <RadioGroup
                                        row
                                        name="recentHypodensity"
                                        value={conduiteTenirData.recentHypodensity}
                                        onChange={handleChangeBool}
                                    >
                                        <FormControlLabel value="Oui"  control={<Radio disabled={!isEditable} />} label="Oui" />
                                        <FormControlLabel value="Non"  control={<Radio disabled={!isEditable} />} label="Non" />
                                    </RadioGroup>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Typography sx={{ mr: 2 }}> Plaquettes  {"<100.000"} :</Typography>
                                    <RadioGroup
                                        row
                                        name="plaquettes"
                                        value={conduiteTenirData.plaquettes}
                                        onChange={handleChangeBool}
                                    >
                                        <FormControlLabel value="Oui"  control={<Radio disabled={!isEditable} />} label="Oui" />
                                        <FormControlLabel value="Non"  control={<Radio disabled={!isEditable} />} label="Non" />
                                    </RadioGroup>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Typography sx={{ mr: 2 }}> INR {">1.7"} :</Typography>
                                    <RadioGroup
                                        row
                                        name="INR"
                                        value={conduiteTenirData.INR}
                                        onChange={handleChangeBool}
                                        disabled={!isEditable}

                                    >
                                        <FormControlLabel value="Oui"  control={<Radio disabled={!isEditable} />} label="Oui" />
                                        <FormControlLabel value="Non"  control={<Radio disabled={!isEditable} />} label="Non" />
                                    </RadioGroup>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Typography sx={{ mr: 2 }}> Anticoagulation curative :</Typography>
                                    <RadioGroup
                                        row
                                        name="AnticoagulationCurative"
                                        value={conduiteTenirData.AnticoagulationCurative}
                                        onChange={handleChangeBool}
                                        disabled={!isEditable}

                                    >
                                        <FormControlLabel value="Oui"  control={<Radio disabled={!isEditable} />} label="Oui" />
                                        <FormControlLabel value="Non"  control={<Radio disabled={!isEditable} />} label="Non" />
                                    </RadioGroup>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Typography sx={{ mr: 2 }}>AIT sans occlusion proximale  :</Typography>
                                    <RadioGroup
                                        row
                                        name="AITSansOcclusion"
                                        value={conduiteTenirData.AITSansOcclusion }
                                        onChange={handleChangeBool}
                                    >
                                        <FormControlLabel value="Oui"  control={<Radio disabled={!isEditable} />} label="Oui" />
                                        <FormControlLabel value="Non"  control={<Radio disabled={!isEditable} />} label="Non" />
                                    </RadioGroup>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Typography sx={{ mr: 2 }}>Déficit mineur sans occlusion proximale </Typography>
                                    <RadioGroup
                                        row
                                        name="DéficitMineurSansOcclusion"
                                        value={conduiteTenirData.DeficitMineurSansOcclusion}
                                        onChange={handleChangeBool}
                                        disabled={!isEditable}

                                    >
                                        <FormControlLabel value="Oui"  control={<Radio disabled={!isEditable} />} label="Oui" />
                                        <FormControlLabel value="Non"  control={<Radio disabled={!isEditable} />} label="Non" />
                                    </RadioGroup>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Typography sx={{ mr: 2 }}> Chirurgie Récente :</Typography>
                                    <RadioGroup
                                        row
                                        name="ChirurgieRecente"
                                        value={conduiteTenirData.ChirurgieRecente}
                                        onChange={handleChangeBool}
                                        disabled={!isEditable}

                                    >
                                        <FormControlLabel value="Oui"  control={<Radio disabled={!isEditable} />} label="Oui" />
                                        <FormControlLabel value="Non"  control={<Radio disabled={!isEditable} />} label="Non" />
                                    </RadioGroup>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Typography sx={{ mr: 2 }}> Hémorragie récente {"< 21"} jours :</Typography>
                                    <RadioGroup
                                        row
                                        name="HemorragieRecente"
                                        value={conduiteTenirData.HemorragieRecente}
                                        onChange={handleChangeBool}
                                    >
                                        <FormControlLabel value="Oui"  control={<Radio disabled={!isEditable} />} label="Oui" />
                                        <FormControlLabel value="Non"  control={<Radio disabled={!isEditable} />} label="Non" />
                                    </RadioGroup>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="otherCauses"
                                    label="Autres causes"
                                    value={conduiteTenirData.otherCauses}
                                    onChange={handleChange}
                                    sx={{ my: 2 }}
                                    disabled={!isEditable}

                                />
                            </Grid>
                        </Grid>
                    )}
                    </Box>
                        <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>

                        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                            <Typography sx={{ mr: 2 }}>Thrombectomie Mécanique:</Typography>
                            <RadioGroup
                                row
                                name="ThrombectomieMecanique"
                                value={conduiteTenirData.ThrombectomieMecanique}
                                onChange={handleChangeBool}
                                disabled={!isEditable}

                            >
                                <FormControlLabel value="Oui"  control={<Radio disabled={!isEditable} />} label="Oui" />
                                <FormControlLabel value="Non"  control={<Radio disabled={!isEditable} />} label="Non" />
                            </RadioGroup>
                        </Box>

                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        label="Heure"
                                        value={conduiteTenirData.ThrombectomieMecaniqueHeure}
                                        onChange={handleChangeDate("ThrombectomieMecaniqueHeure")}
                                        renderInput={(params) => <TextField {...params} />}
                                        disabled={!isEditable}

                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                        {conduiteTenirData.ThrombectomieMecanique === "Oui" && (
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center">
                                        <Typography sx={{ mr: 2 }}>Stent retriever:</Typography>
                                        <RadioGroup
                                            row
                                            name="StentRetriever"
                                            value={conduiteTenirData.StentRetriever}
                                            onChange={handleChangeBool}
                                            disabled={!isEditable}

                                        >
                                            <FormControlLabel value="Oui"  control={<Radio disabled={!isEditable} />} label="Oui" />
                                            <FormControlLabel value="Non"  control={<Radio disabled={!isEditable} />} label="Non" />
                                        </RadioGroup>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center">
                                        <Typography sx={{ mr: 2 }}>Thrombo-Aspiration:</Typography>
                                        <RadioGroup
                                            row
                                            name="ThromboAspiration"
                                            value={conduiteTenirData.ThromboAspiration}
                                            onChange={handleChangeBool}
                                        >
                                            <FormControlLabel value="Oui"  control={<Radio disabled={!isEditable} />} label="Oui" />
                                            <FormControlLabel value="Non"  control={<Radio disabled={!isEditable} />} label="Non" />
                                        </RadioGroup>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center">
                                        <Typography sx={{ mr: 2 }}>TICI:</Typography>
                                        <TextField
                                            variant="outlined"
                                            name="TICI"
                                            value={conduiteTenirData.TICI}
                                            onChange={handleChange}
                                            disabled={!isEditable}

                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        )}

                        </Box>

                    </Box>
                    <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
                        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                            Traitement antithrombotique
                        </Typography>
                        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                            <Typography sx={{ mr: 2 }}>Anticoagulation curative</Typography>
                            <RadioGroup
                                row
                                name="AnticoagulationCurativeII"
                                value={conduiteTenirData.AnticoagulationCurativeII}
                                onChange={handleChangeBool}
                                disabled={!isEditable}

                            >
                                <FormControlLabel value="Oui"  control={<Radio disabled={!isEditable} />} label="Oui" />
                                <FormControlLabel value="Non"  control={<Radio disabled={!isEditable} />} label="Non" />
                            </RadioGroup>
                        </Box>

                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        label="Heure"
                                        value={conduiteTenirData.AnticoagulationCurativeIIHeure}
                                        onChange={handleChangeDate("AnticoagulationCurativeIIHeure")}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                                                  </Grid>

                        {conduiteTenirData.AnticoagulationCurativeII === "Oui" && (
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center">
                                        <Typography sx={{ mr: 2 }}>Héparine non fractionné (HNF):</Typography>
                                        <RadioGroup
                                            row
                                            name="HNF"
                                            value={conduiteTenirData.HNF}
                                            onChange={handleChangeBool}
                                            disabled={!isEditable}

                                        >
                                            <FormControlLabel value="Oui"  control={<Radio disabled={!isEditable} />} label="Oui" />
                                            <FormControlLabel value="Non"  control={<Radio disabled={!isEditable} />} label="Non" />
                                        </RadioGroup>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center">
                                        <Typography sx={{ mr: 2 }}>Héparine bas poids moléculaire (HBPM):</Typography>
                                        <RadioGroup
                                            row
                                            name="HBPM"
                                            value={conduiteTenirData.HBPM}
                                            onChange={handleChangeBool}
                                        >
                                            <FormControlLabel value="Oui"  control={<Radio disabled={!isEditable} />} label="Oui" />
                                            <FormControlLabel value="Non"  control={<Radio disabled={!isEditable} />} label="Non" />
                                        </RadioGroup>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center">
                                        <Typography sx={{ mr: 2 }}>Anticoagulant oraux directs (AOD):</Typography>
                                        <RadioGroup
                                            row
                                            name="AOD"
                                            value={conduiteTenirData.AOD}
                                            onChange={handleChangeBool}
                                        >
                                            <FormControlLabel value="Oui"  control={<Radio disabled={!isEditable} />} label="Oui" />
                                            <FormControlLabel value="Non"  control={<Radio disabled={!isEditable} />} label="Non" />
                                        </RadioGroup>
                                    </Box>
                                </Grid>

                                {/* Champs conditionnels pour AOD */}
                                {conduiteTenirData.AOD === "Oui" && (
                                    <Grid container spacing={2} sx={{ mb: 2 }}>
                                        <Grid item>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TimePicker
                                                    label="Heure"
                                                    value={conduiteTenirData.DelaiIntro}
                                                    onChange={handleChangeHeure}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                        )}
                        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                            <Typography sx={{ mr: 4 }}>Simple anti agrégation plaquettaire</Typography>
                            <RadioGroup
                                row
                                name="SimpleAntiAgregationPlaquettaire"
                                value={conduiteTenirData.SimpleAntiAgregationPlaquettaire}
                                onChange={handleChangeBool}
                            >
                                <FormControlLabel value="Oui"  control={<Radio disabled={!isEditable} />} label="Oui" />
                                <FormControlLabel value="Non"  control={<Radio disabled={!isEditable} />} label="Non" />
                            </RadioGroup>
                        </Box>
                        {conduiteTenirData.SimpleAntiAgregationPlaquettaire === "Oui"&& (
                            <FormControl display="flex" alignItems="center"  sx={{ mt: 2 ,width: '50%'}}>
                                <FormLabel>Type </FormLabel>
                                <Select
                                    name="SimpleAntiAgregationPlaquettaireType"
                                    value={conduiteTenirData.SimpleAntiAgregationPlaquettaireType}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Aspegic">Aspegic</MenuItem>
                                    <MenuItem value="Clopidogrel">Clopidogrel</MenuItem>
                                    <MenuItem value="Ticagrelor">Ticagrelor</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                            <Typography sx={{ mr: 4 }}>Double anti agrégation plaquettaire</Typography>
                            <RadioGroup
                                row
                                name="DoubleAntiAgregationPlaquettaire"
                                value={conduiteTenirData.DoubleAntiAgregationPlaquettaire}
                                onChange={handleChangeBool}
                            >
                                <FormControlLabel value="Oui"  control={<Radio disabled={!isEditable} />} label="Oui" />
                                <FormControlLabel value="Non"  control={<Radio disabled={!isEditable} />} label="Non" />
                            </RadioGroup>
                        </Box>
                        {conduiteTenirData.DoubleAntiAgregationPlaquettaire === "Oui" && (
                            <Box>
                                {/* Dose de charge */}
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ mr: 4 }}>Dose de charge</Typography>
                                <RadioGroup
                                    row
                                    name="DoubleAntiAgregationPlaquettaireDose"
                                    value={conduiteTenirData.DoubleAntiAgregationPlaquettaireDose}
                                    onChange={handleChangeBool}
                                >
                                    <FormControlLabel value="Oui"  control={<Radio disabled={!isEditable} />} label="Oui" />
                                    <FormControlLabel value="Non"  control={<Radio disabled={!isEditable} />} label="Non" />
                                </RadioGroup>
                            </Box>

                                { conduiteTenirData.DoubleAntiAgregationPlaquettaireDose==="Oui" && (
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TimePicker
                                                    label="Heure"
                                                    value={conduiteTenirData.DoubleAntiAgregationPlaquettaireDoseHeure}
                                                    onChange={handleChangeDate("DoubleAntiAgregationPlaquettaireDoseHeure")}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                    </Grid>
                                )}


                                {/* Type */}
                                <FormControl
                                    display="flex"
                                    alignItems="center"
                                    sx={{ mt: 2, width: '50%' }}
                                >
                                    <FormLabel>Type</FormLabel>
                                    <Select
                                        name="DoubleAntiAgregationPlaquettaireType"
                                        value={conduiteTenirData.DoubleAntiAgregationPlaquettaireType}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Clopidogrel">Clopidogrel</MenuItem>
                                        <MenuItem value="Ticagrelor">Ticagrelor</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        )}

                    </Box>
                    <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
                        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                            Traitement Antihypertenseur
                        </Typography>
                        <RadioGroup
                            row
                            name="TraitementAntihypertenseur"
                            value={conduiteTenirData.TraitementAntihypertenseur}
                            onChange={handleChangeBool}
                        >
                            <FormControlLabel value="Oui"  control={<Radio disabled={!isEditable} />} label="Oui" />
                            <FormControlLabel value="Non"  control={<Radio disabled={!isEditable} />} label="Non" />
                        </RadioGroup>

                        {conduiteTenirData.TraitementAntihypertenseur === "Oui" && (
                            <Box>
                                {/* Traitement par Voie Intraveineuse */}
                                <SubSection
                                    title="Traitement par voie intraveineuse"
                                    name="TraitementParVoieIntraveineuse"
                                    value={conduiteTenirData.TraitementParVoieIntraveineuse}
                                    handleChange={handleChangeBool}
                                >
                                    {conduiteTenirData.TraitementParVoieIntraveineuse === "Oui" && (
                                        <>
                                            <TimePickerSection
                                                label="Heure"
                                                value={conduiteTenirData.TraitementParVoieIntraveineuseHeure}
                                                onChange={handleChangeDate("TraitementParVoieIntraveineuseHeure")}
                                            />
                                            <Typography sx={{ mr: 2 }}>Nicardipine</Typography>
                                            <RadioGroup
                                                row
                                                name="Nicardipine"
                                                value={conduiteTenirData.Nicardipine}
                                                onChange={handleChangeBool}
                                            >
                                                <FormControlLabel value="Oui"  control={<Radio disabled={!isEditable} />} label="Oui" />
                                                <FormControlLabel value="Non"  control={<Radio disabled={!isEditable} />} label="Non" />
                                            </RadioGroup>
                                            <TextField
                                                label="Autres Molécules"
                                                variant="outlined"
                                                fullWidth
                                                name="TraitementParVoieIntraveineuseAutresMolecules"
                                                value={conduiteTenirData.TraitementParVoieIntraveineuseAutresMolecules}
                                                onChange={handleChange}
                                                disabled={!isEditable}

                                            />
                                        </>
                                    )}
                                </SubSection>
                                {/* Traitement par Voie Orale */}
                                <SubSection
                                    title="Traitement par voie orale"
                                    name="TraitementParVoieOrale"
                                    value={conduiteTenirData.TraitementParVoieOrale}
                                    handleChange={handleChangeBool} // Changed onChange to handleChange
                                >
                                    {conduiteTenirData.TraitementParVoieOrale === "Oui" && (
                                        <>
                                            <Box sx={{ mb: 2 }}>
                                                <TimePickerSection
                                                    label="Heure"
                                                    value={conduiteTenirData.TraitementParVoieOraleHeure}
                                                    onChange={handleChangeDate("TraitementParVoieOraleHeure")}
                                                />
                                            </Box>
                                            <Box>
                                                <TextField
                                                    label="Type"
                                                    variant="outlined"

                                                    name="TraitementParVoieOraleType"
                                                    value={conduiteTenirData.TraitementParVoieOraleType}
                                                    onChange={handleChange}
                                                />
                                            </Box>
                                        </>
                                    )}
                                </SubSection>


                                {/* Insulinothérapie en SC */}
                                <SubSection
                                    title="Insulinothérapie en SC"
                                    name="InsulinotherapieEnSC"
                                    value={conduiteTenirData.InsulinotherapieEnSC}
                                    handleChange={handleChangeBool}
                                    isEditable={isEditable}

                                >
                                    {conduiteTenirData.InsulinotherapieEnSC === "Oui" && (
                                        <TimePickerSection
                                            label="Heure"
                                            value={conduiteTenirData.InsulinotherapieEnSCHeure}
                                            onChange={handleChangeDate("InsulinotherapieEnSCHeure")}
                                            isEditable={isEditable}

                                        />
                                    )}
                                </SubSection>


                                {/* Hypolipémiants */}
                                <SubSection
                                    title="Hypolipémiants"
                                    name="Hypolipemiants"
                                    value={conduiteTenirData.Hypolipemiants}
                                    handleChange={handleChangeBool} // Changed onChange to handleChange
                                >
                                    {conduiteTenirData.Hypolipemiants === "Oui" && (
                                        <>
                                            <SubSection
                                                title="Atorvastatine"
                                                name="Atorvastatine"
                                                value={conduiteTenirData.Atorvastatine}
                                                handleChange={handleChangeBool} // Changed onChange to handleChange
                                            />
                                            <SubSection
                                                title="Ezetimib"
                                                name="Ezetimib"
                                                value={conduiteTenirData.Ezetimib}
                                                handleChange={handleChangeBool} // Changed onChange to handleChange
                                            />
                                            <SubSection
                                                title="PCSK9"
                                                name="PCSK9"
                                                value={conduiteTenirData.PCSK9}
                                                handleChange={handleChangeBool} // Changed onChange to handleChange
                                            />
                                        </>
                                    )}
                                </SubSection>

                            </Box>
                        )}
                    </Box>
                            </Box>


                {/* Box II: Non Pharmacologique */}
                <Box sx={{ mt: 4, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
                    <Typography variant="h5" gutterBottom>
                        Non Pharmacologique
                    </Typography>

                    <SubSection
                        title="Rééducation Motrice"
                        name="ReeducationMotrice"
                        value={conduiteTenirData.ReeducationMotrice}
                        handleChange={handleChangeBool}
                        disabled={!isEditable}
                        // Changed onChange to handleChange
                    >
                        {conduiteTenirData.ReeducationMotrice === "Oui" && (
                            <TimePickerSection
                                label="Heure"
                                value={conduiteTenirData.ReeducationMotriceHeure}
                                onChange={handleChangeDate("ReeducationMotriceHeure")}
                            />
                        )}
                    </SubSection>
                    <SubSection
                        title="Matelas anti escarre"
                        name="MatelasAntiEscarre"
                        value={conduiteTenirData.MatelasAntiEscarre}
                        handleChange={handleChangeBool} // Changed onChange to handleChange
                    >
                        {conduiteTenirData.MatelasAntiEscarre === "Oui" && (
                            <TimePickerSection
                                label="Heure"
                                value={conduiteTenirData.MatelasAntiEscarreHeure}
                                onChange={handleChangeDate("MatelasAntiEscarreHeure")}
                            />
                        )}
                    </SubSection>
                    <SubSection
                        title="Rééducation orthophonique"
                        name="ReeducationOrthophonique"
                        value={conduiteTenirData.ReeducationOrthophonique}
                        handleChange={handleChangeBool}
                        disabled={!isEditable}
                        // Changed onChange to handleChange
                    >
                        {conduiteTenirData.ReeducationOrthophonique === "Oui" && (
                            <TimePickerSection
                                label="Heure"
                                value={conduiteTenirData.ReeducationOrthophoniqueHeure}
                                onChange={handleChangeDate("ReeducationOrthophoniqueHeure")}
                            />
                        )}
                    </SubSection>
                    <SubSection
                        title="Verticalisation"
                        name="Verticalisation"
                        value={conduiteTenirData.Verticalisation}
                        handleChange={handleChangeBool}
                        disabled={!isEditable}// Changed onChange to handleChange
                    >
                        {conduiteTenirData.Verticalisation === "Oui" && (
                            <TimePickerSection
                                label="Heure"
                                value={conduiteTenirData.VerticalisationHeure}
                                onChange={handleChangeDate("VerticalisationHeure")}
                                disabled={!isEditable}
                            />
                        )}
                    </SubSection>
                    <SubSection
                        title="Sonde nasogastrique"
                        name="SondeNasogastrique"
                        value={conduiteTenirData.SondeNasogastrique}
                        handleChange={handleChangeBool}
                        disabled={!isEditable}// Changed onChange to handleChange
                    >
                        {conduiteTenirData.SondeNasogastrique === "Oui" && (
                            <TimePickerSection
                                label="Heure"
                                value={conduiteTenirData.SondeNasogastriqueHeure}
                                onChange={handleChangeDate("SondeNasogastriqueHeure")}
                                disabled={!isEditable}
                            />
                        )}
                    </SubSection>
                </Box>


                <SubmitButtons isDataAvailable={isDataAvailable} setIsEditable={setIsEditable} isEditable={isEditable}/>


                {successMessage && (
                    <Notifications Message={successMessage} setMessage={setSuccessMessage}/>
                )}
            </form>
        </ThemeProvider>
    );
}
