import React, { useState } from "react";
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
    Button, FormLabel, Select, MenuItem,
} from "@mui/material";
import {  LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormControl from "@mui/material/FormControl";

export default function PriseEnChargeAigue() {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#0E8388",
            },
        },
    });

    const [data, setData] = useState({
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
        plaquettes:"",
        INR:"",
        AnticoagulationCurative:"",
        AITSansOcclusion:"",
        DeficitMineurSansOcclusion:"",
        ChirurgieRecente:"",
        HemorragieRecente:"",
        AnticoagulationCurativeII:"",
        ThrombectomieMecanique :"",
        ThrombectomieMecaniqueHeure:null,
        StentRetriever :"",
        ThromboAspiration:"",
        TICI:"",
        HNF:"",
        HBPM:"",
        AOD:"",
        DelaiIntro:"",
        SimpleAntiAgregationPlaquettaire:"",
        SimpleAntiAgregationPlaquettaireType:"",
        DoubleAntiAgregationPlaquettaire:"",
        DoubleAntiAgregationPlaquettaireDose:"",
        DoubleAntiAgregationPlaquettaireDoseHeure:null,
        DoubleAntiAgregationPlaquettaireType:"",
        AnticoagulationCurativeIIHeure:null,
        TraitementAntihypertenseur: "",
        TraitementParVoieIntraveineuse:"",
        TraitementParVoieIntraveineuseHeure:null,
        Nicardipine:"",
        TraitementParVoieIntraveineuseAutresMolecules:"",
        TraitementParVoieOrale:"",
        TraitementParVoieOraleHeure:null,
        InsulinotherapieEnSC:"",
        TraitementParVoieOraleType:"",
        InsulinotherapieEnSCHeure:null,
        Hypolipemiants:"",
        Atorvastatine:"",
        AtorvastatineDose:0,
        Ezetimib:"",
        PCSK9:"",
        MatelasAntiEscarre:"",
        MatelasAntiEscarreHeure:null,
        ReeducationOrthophonique:"",
        ReeducationOrthophoniqueHeure:null,
        Verticalisation:"",
        VerticalisationHeure:null,
        SondeNasogastrique:"",
        SondeNasogastriqueHeure:null,
        ReeducationMotrice:"",
        ReeducationMotriceHeure:null,
    });
    const SubSection = ({ title, name, value, handleChange, children }) => (
        <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
            <Typography sx={{ mb: 1 }}>{title}</Typography>
            <RadioGroup
                row
                name={name}
                value={value}
                onChange={handleChange}
            >
                <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                <FormControlLabel value="Non" control={<Radio />} label="Non" />
            </RadioGroup>
            {children}
        </Box>
    );
    const TimePickerSection = ({ label, value, onChange }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
                label={label}
                value={value}
                onChange={onChange}
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

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            toast.success("Données soumises avec succès.");
        } catch (err) {
            toast.error("Erreur lors de la soumission des données.");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit}>
                <ToastContainer />
                <Typography variant="h4" gutterBottom>
                    Prise en charge à la phase aigue
                </Typography>

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
                            value={data.thrombolyseIntraveineuse}
                            onChange={handleChangeBool}
                        >
                            <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                            <FormControlLabel value="Non" control={<Radio />} label="Non" />
                        </RadioGroup>
                    </Box>

                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label="Door to Needle"
                                    value={data.doorToNeedle}
                                    onChange={handleChangeDate("doorToNeedle")}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Autres détails"
                                name="doorToNeedleDetails"
                                value={data.doorToNeedleDetails}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    {/* Conditional Fields for Thrombolyse Intraveineuse */}
                    {data.thrombolyseIntraveineuse === "Oui" && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Typography sx={{ mr: 2 }}>Actilyse:</Typography>
                                    <RadioGroup
                                        row
                                        name="actilyse"
                                        value={data.actilyse}
                                        onChange={handleChangeBool}
                                    >
                                        <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                                        <FormControlLabel value="Non" control={<Radio />} label="Non" />
                                    </RadioGroup>
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Typography sx={{ mr: 2 }}>Ténecteplase:</Typography>
                                    <RadioGroup
                                        row
                                        name="tenecteplase"
                                        value={data.tenecteplase}
                                        onChange={handleChangeBool}
                                    >
                                        <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                                        <FormControlLabel value="Non" control={<Radio />} label="Non" />
                                    </RadioGroup>
                                </Box>
                            </Grid>
                        </Grid>
                    )}

                    {data.thrombolyseIntraveineuse === "Non" && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Typography sx={{ mr: 2 }}>Délai dépassé:</Typography>
                                    <RadioGroup
                                        row
                                        name="delayExceeded"
                                        value={data.delayExceeded}
                                        onChange={handleChangeBool}
                                    >
                                        <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                                        <FormControlLabel value="Non" control={<Radio />} label="Non" />
                                    </RadioGroup>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Typography sx={{ mr: 2 }}> Présence d’une hypodensité récente au TDM cérébrale</Typography>
                                    <RadioGroup
                                        row
                                        name="recentHypodensity"
                                        value={data.recentHypodensity}
                                        onChange={handleChangeBool}
                                    >
                                        <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                                        <FormControlLabel value="Non" control={<Radio />} label="Non" />
                                    </RadioGroup>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Typography sx={{ mr: 2 }}> Plaquettes  {"<100.000"} :</Typography>
                                    <RadioGroup
                                        row
                                        name="plaquettes"
                                        value={data.plaquettes}
                                        onChange={handleChangeBool}
                                    >
                                        <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                                        <FormControlLabel value="Non" control={<Radio />} label="Non" />
                                    </RadioGroup>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Typography sx={{ mr: 2 }}> INR {">1.7"} :</Typography>
                                    <RadioGroup
                                        row
                                        name="INR"
                                        value={data.INR}
                                        onChange={handleChangeBool}
                                    >
                                        <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                                        <FormControlLabel value="Non" control={<Radio />} label="Non" />
                                    </RadioGroup>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Typography sx={{ mr: 2 }}> Anticoagulation curative :</Typography>
                                    <RadioGroup
                                        row
                                        name="AnticoagulationCurative"
                                        value={data.AnticoagulationCurative}
                                        onChange={handleChangeBool}
                                    >
                                        <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                                        <FormControlLabel value="Non" control={<Radio />} label="Non" />
                                    </RadioGroup>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Typography sx={{ mr: 2 }}>AIT sans occlusion proximale  :</Typography>
                                    <RadioGroup
                                        row
                                        name="AITSansOcclusion"
                                        value={data.AITSansOcclusion }
                                        onChange={handleChangeBool}
                                    >
                                        <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                                        <FormControlLabel value="Non" control={<Radio />} label="Non" />
                                    </RadioGroup>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Typography sx={{ mr: 2 }}>Déficit mineur sans occlusion proximale </Typography>
                                    <RadioGroup
                                        row
                                        name="DéficitMineurSansOcclusion"
                                        value={data.DeficitMineurSansOcclusion}
                                        onChange={handleChangeBool}
                                    >
                                        <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                                        <FormControlLabel value="Non" control={<Radio />} label="Non" />
                                    </RadioGroup>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Typography sx={{ mr: 2 }}> Chirurgie Récente :</Typography>
                                    <RadioGroup
                                        row
                                        name="ChirurgieRecente"
                                        value={data.ChirurgieRecente}
                                        onChange={handleChangeBool}
                                    >
                                        <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                                        <FormControlLabel value="Non" control={<Radio />} label="Non" />
                                    </RadioGroup>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" alignItems="center">
                                    <Typography sx={{ mr: 2 }}> Hémorragie récente {"< 21"} jours :</Typography>
                                    <RadioGroup
                                        row
                                        name="HemorragieRecente"
                                        value={data.HemorragieRecente}
                                        onChange={handleChangeBool}
                                    >
                                        <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                                        <FormControlLabel value="Non" control={<Radio />} label="Non" />
                                    </RadioGroup>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="otherCauses"
                                    label="Autres causes"
                                    value={data.otherCauses}
                                    onChange={handleChange}
                                    sx={{ my: 2 }}
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
                                value={data.ThrombectomieMecanique}
                                onChange={handleChangeBool}
                            >
                                <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                                <FormControlLabel value="Non" control={<Radio />} label="Non" />
                            </RadioGroup>
                        </Box>

                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        label="Heure"
                                        value={data.ThrombectomieMecaniqueHeure}
                                        onChange={handleChangeDate("ThrombectomieMecaniqueHeure")}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                        {data.ThrombectomieMecanique === "Oui" && (
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center">
                                        <Typography sx={{ mr: 2 }}>Stent retriever:</Typography>
                                        <RadioGroup
                                            row
                                            name="StentRetriever"
                                            value={data.StentRetriever}
                                            onChange={handleChangeBool}
                                        >
                                            <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                                            <FormControlLabel value="Non" control={<Radio />} label="Non" />
                                        </RadioGroup>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center">
                                        <Typography sx={{ mr: 2 }}>Thrombo-Aspiration:</Typography>
                                        <RadioGroup
                                            row
                                            name="ThromboAspiration"
                                            value={data.ThromboAspiration}
                                            onChange={handleChangeBool}
                                        >
                                            <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                                            <FormControlLabel value="Non" control={<Radio />} label="Non" />
                                        </RadioGroup>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center">
                                        <Typography sx={{ mr: 2 }}>TICI:</Typography>
                                        <TextField
                                            variant="outlined"
                                            name="TICI"
                                            value={data.TICI}
                                            onChange={handleChange}
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
                                value={data.AnticoagulationCurativeII}
                                onChange={handleChangeBool}
                            >
                                <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                                <FormControlLabel value="Non" control={<Radio />} label="Non" />
                            </RadioGroup>
                        </Box>

                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        label="Heure"
                                        value={data.AnticoagulationCurativeIIHeure}
                                        onChange={handleChangeDate("AnticoagulationCurativeIIHeure")}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                                                  </Grid>

                        {data.AnticoagulationCurativeII === "Oui" && (
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center">
                                        <Typography sx={{ mr: 2 }}>Héparine non fractionné (HNF):</Typography>
                                        <RadioGroup
                                            row
                                            name="HNF"
                                            value={data.HNF}
                                            onChange={handleChangeBool}
                                        >
                                            <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                                            <FormControlLabel value="Non" control={<Radio />} label="Non" />
                                        </RadioGroup>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center">
                                        <Typography sx={{ mr: 2 }}>Héparine bas poids moléculaire (HBPM):</Typography>
                                        <RadioGroup
                                            row
                                            name="HBPM"
                                            value={data.HBPM}
                                            onChange={handleChangeBool}
                                        >
                                            <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                                            <FormControlLabel value="Non" control={<Radio />} label="Non" />
                                        </RadioGroup>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center">
                                        <Typography sx={{ mr: 2 }}>Anticoagulant oraux directs (AOD):</Typography>
                                        <RadioGroup
                                            row
                                            name="AOD"
                                            value={data.AOD}
                                            onChange={handleChangeBool}
                                        >
                                            <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                                            <FormControlLabel value="Non" control={<Radio />} label="Non" />
                                        </RadioGroup>
                                    </Box>
                                </Grid>

                                {/* Champs conditionnels pour AOD */}
                                {data.AOD === "Oui" && (
                                    <Grid container spacing={2} sx={{ mb: 2 }}>
                                        <Grid item>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TimePicker
                                                    label="Heure"
                                                    value={data.DelaiIntro}
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
                                value={data.SimpleAntiAgregationPlaquettaire}
                                onChange={handleChangeBool}
                            >
                                <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                                <FormControlLabel value="Non" control={<Radio />} label="Non" />
                            </RadioGroup>
                        </Box>
                        {data.SimpleAntiAgregationPlaquettaire === "Oui"&& (
                            <FormControl display="flex" alignItems="center"  sx={{ mt: 2 ,width: '50%'}}>
                                <FormLabel>Type </FormLabel>
                                <Select
                                    name="SimpleAntiAgregationPlaquettaireType"
                                    value={data.SimpleAntiAgregationPlaquettaireType}
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
                                value={data.DoubleAntiAgregationPlaquettaire}
                                onChange={handleChangeBool}
                            >
                                <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                                <FormControlLabel value="Non" control={<Radio />} label="Non" />
                            </RadioGroup>
                        </Box>
                        {data.DoubleAntiAgregationPlaquettaire === "Oui" && (
                            <Box>
                                {/* Dose de charge */}
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ mr: 4 }}>Dose de charge</Typography>
                                <RadioGroup
                                    row
                                    name="DoubleAntiAgregationPlaquettaireDose"
                                    value={data.DoubleAntiAgregationPlaquettaireDose}
                                    onChange={handleChangeBool}
                                >
                                    <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                                    <FormControlLabel value="Non" control={<Radio />} label="Non" />
                                </RadioGroup>
                            </Box>

                                { data.DoubleAntiAgregationPlaquettaireDose==="Oui" && (
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <TimePicker
                                                    label="Heure"
                                                    value={data.DoubleAntiAgregationPlaquettaireDoseHeure}
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
                                        value={data.DoubleAntiAgregationPlaquettaireType}
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
                            value={data.TraitementAntihypertenseur}
                            onChange={handleChangeBool}
                        >
                            <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                            <FormControlLabel value="Non" control={<Radio />} label="Non" />
                        </RadioGroup>

                        {data.TraitementAntihypertenseur === "Oui" && (
                            <Box>
                                {/* Traitement par Voie Intraveineuse */}
                                <SubSection
                                    title="Traitement par voie intraveineuse"
                                    name="TraitementParVoieIntraveineuse"
                                    value={data.TraitementParVoieIntraveineuse}
                                    handleChange={handleChangeBool}
                                >
                                    {data.TraitementParVoieIntraveineuse === "Oui" && (
                                        <>
                                            <TimePickerSection
                                                label="Heure"
                                                value={data.TraitementParVoieIntraveineuseHeure}
                                                onChange={handleChangeDate("TraitementParVoieIntraveineuseHeure")}
                                            />
                                            <Typography sx={{ mr: 2 }}>Nicardipine</Typography>
                                            <RadioGroup
                                                row
                                                name="Nicardipine"
                                                value={data.Nicardipine}
                                                onChange={handleChangeBool}
                                            >
                                                <FormControlLabel value="Oui" control={<Radio />} label="Oui" />
                                                <FormControlLabel value="Non" control={<Radio />} label="Non" />
                                            </RadioGroup>
                                            <TextField
                                                label="Autres Molécules"
                                                variant="outlined"
                                                fullWidth
                                                name="TraitementParVoieIntraveineuseAutresMolecules"
                                                value={data.TraitementParVoieIntraveineuseAutresMolecules}
                                                onChange={handleChange}
                                            />
                                        </>
                                    )}
                                </SubSection>
                                {/* Traitement par Voie Orale */}
                                <SubSection
                                    title="Traitement par voie orale"
                                    name="TraitementParVoieOrale"
                                    value={data.TraitementParVoieOrale}
                                    handleChange={handleChangeBool} // Changed onChange to handleChange
                                >
                                    {data.TraitementParVoieOrale === "Oui" && (
                                        <>
                                            <Box sx={{ mb: 2 }}>
                                                <TimePickerSection
                                                    label="Heure"
                                                    value={data.TraitementParVoieOraleHeure}
                                                    onChange={handleChangeDate("TraitementParVoieOraleHeure")}
                                                />
                                            </Box>
                                            <Box>
                                                <TextField
                                                    label="Type"
                                                    variant="outlined"

                                                    name="TraitementParVoieOraleType"
                                                    value={data.TraitementParVoieOraleType}
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
                                    value={data.InsulinotherapieEnSC}
                                    handleChange={handleChangeBool} // Changed onChange to handleChange
                                >
                                    {data.InsulinotherapieEnSC === "Oui" && (
                                        <TimePickerSection
                                            label="Heure"
                                            value={data.InsulinotherapieEnSCHeure}
                                            onChange={handleChangeDate("InsulinotherapieEnSCHeure")}
                                        />
                                    )}
                                </SubSection>


                                {/* Hypolipémiants */}
                                <SubSection
                                    title="Hypolipémiants"
                                    name="Hypolipemiants"
                                    value={data.Hypolipemiants}
                                    handleChange={handleChangeBool} // Changed onChange to handleChange
                                >
                                    {data.Hypolipemiants === "Oui" && (
                                        <>
                                            <SubSection
                                                title="Atorvastatine"
                                                name="Atorvastatine"
                                                value={data.Atorvastatine}
                                                handleChange={handleChangeBool} // Changed onChange to handleChange
                                            />
                                            <SubSection
                                                title="Ezetimib"
                                                name="Ezetimib"
                                                value={data.Ezetimib}
                                                handleChange={handleChangeBool} // Changed onChange to handleChange
                                            />
                                            <SubSection
                                                title="PCSK9"
                                                name="PCSK9"
                                                value={data.PCSK9}
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
                        value={data.ReeducationMotrice}
                        handleChange={handleChangeBool} // Changed onChange to handleChange
                    >
                        {data.ReeducationMotrice === "Oui" && (
                            <TimePickerSection
                                label="Heure"
                                value={data.ReeducationMotriceHeure}
                                onChange={handleChangeDate("ReeducationMotriceHeure")}
                            />
                        )}
                    </SubSection>
                    <SubSection
                        title="Matelas anti escarre"
                        name="MatelasAntiEscarre"
                        value={data.MatelasAntiEscarre}
                        handleChange={handleChangeBool} // Changed onChange to handleChange
                    >
                        {data.MatelasAntiEscarre === "Oui" && (
                            <TimePickerSection
                                label="Heure"
                                value={data.MatelasAntiEscarreHeure}
                                onChange={handleChangeDate("MatelasAntiEscarreHeure")}
                            />
                        )}
                    </SubSection>
                    <SubSection
                        title="Rééducation orthophonique"
                        name="ReeducationOrthophonique"
                        value={data.ReeducationOrthophonique}
                        handleChange={handleChangeBool} // Changed onChange to handleChange
                    >
                        {data.ReeducationOrthophonique === "Oui" && (
                            <TimePickerSection
                                label="Heure"
                                value={data.ReeducationOrthophoniqueHeure}
                                onChange={handleChangeDate("ReeducationOrthophoniqueHeure")}
                            />
                        )}
                    </SubSection>
                    <SubSection
                        title="Verticalisation"
                        name="Verticalisation"
                        value={data.Verticalisation}
                        handleChange={handleChangeBool} // Changed onChange to handleChange
                    >
                        {data.Verticalisation === "Oui" && (
                            <TimePickerSection
                                label="Heure"
                                value={data.VerticalisationHeure}
                                onChange={handleChangeDate("VerticalisationHeure")}
                            />
                        )}
                    </SubSection>
                    <SubSection
                        title="Sonde nasogastrique"
                        name="SondeNasogastrique"
                        value={data.SondeNasogastrique}
                        handleChange={handleChangeBool} // Changed onChange to handleChange
                    >
                        {data.SondeNasogastrique === "Oui" && (
                            <TimePickerSection
                                label="Heure"
                                value={data.SondeNasogastriqueHeure}
                                onChange={handleChangeDate("SondeNasogastriqueHeure")}
                            />
                        )}
                    </SubSection>
                </Box>

                <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                    Soumettre
                </Button>
            </form>
        </ThemeProvider>
    );
}
