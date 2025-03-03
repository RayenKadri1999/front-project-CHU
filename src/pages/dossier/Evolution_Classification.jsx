import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    Alert,
    TextField,
    Typography,
    RadioGroup,
} from "@mui/material";
import Notifications from "../../components/shared/Notifications";
import SubmitButtons from "../../components/shared/SubmitButtons";
import apiServices from "../../services/api-services";

export default function EvolutionClassification({ commonState }) {
    const { idDossier, id } = useParams();
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

    const [evolutionClassificationData, setEvolutionClassificationData] = useState({
        PlanClinique: false,
        PlanEtiologique: false,
        PlanThérapeutique: false,
        DescPlanClinique: "",
        DescPlanEtiologique: "",
        DescPlanThérapeutique: "",
        PneumopathieInhalation: "",
        InfectionUrinaire: "",
        EmboliePulmonaire: "",
        ThromboseVeineuseProfonde: "",
        HemorragieExtracranienne: "",
        Escarre: "",
        matricule: id,
    });
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
    const SubSection = ({ title, name, value, handleChange }) => (
        <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
            <Typography sx={{ mb: 1 }}>{title}</Typography>
            <RadioGroup row name={name} value={value} onChange={handleChange}  disabled={!isEditable}>
                <FormControlLabel value="Oui" control={<Radio disabled={!isEditable} />}  label="Oui" />
                <FormControlLabel value="Non" control={<Radio disabled={!isEditable} />}  label="Non" />
            </RadioGroup>
        </Box>
    );

    const handleChangeText = (e) => {
        const { name, value } = e.target;
        setEvolutionClassificationData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleChangeBool = (e) => {
        const { name, value } = e.target;
        setEvolutionClassificationData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleChangeCheck = (e) => {
        const { name, checked } = e.target;
        setEvolutionClassificationData((prevData) => ({
            ...prevData,
            [name]: checked,
        }));

        if (!checked) {
            setEvolutionClassificationData((prevData) => ({
                ...prevData,
                [`Desc${name}`]: "",
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        apiServices.handleSubmit(
            e,
            evolutionClassificationData,
            "evolutionclassification",
            setSuccessMessage,
            isDataAvailable,
            setIsDataAvailable,
            setIsEditable,
            setError,
            id
        );
    };

    useEffect(() => {
        apiServices.loadDossierDetails(
            setEvolutionClassificationData,
            "evolutionclassification",
            setIsDataAvailable,
            setError,
            id
        );
    }, [id]);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex" }}>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h4" marginBottom={5} gutterBottom>
                            Evolutions
                        </Typography>

                        {error && <Alert severity="info">{error}</Alert>}

                        <FormGroup>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="PlanClinique"
                                            disabled={!isEditable}
                                            checked={evolutionClassificationData.PlanClinique}
                                            onChange={handleChangeCheck}
                                            inputProps={{ "aria-label": "controlled" }}
                                        />
                                    }
                                    label="Plan Clinique"
                                />

                                <TextField
                                    name="DescPlanClinique"
                                    disabled={!isEditable || !evolutionClassificationData.PlanClinique}
                                    value={evolutionClassificationData.DescPlanClinique}
                                    onChange={handleChangeText}
                                    multiline
                                    rows={6}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 5 }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="PlanThérapeutique"
                                            disabled={!isEditable}
                                            checked={evolutionClassificationData.PlanThérapeutique}
                                            onChange={handleChangeCheck}
                                            inputProps={{ "aria-label": "controlled" }}
                                        />
                                    }
                                    label="Plan Thérapeutique"
                                />

                                <TextField
                                    name="DescPlanThérapeutique"
                                    disabled={!isEditable || !evolutionClassificationData.PlanThérapeutique}
                                    value={evolutionClassificationData.DescPlanThérapeutique}
                                    onChange={handleChangeText}
                                    multiline
                                    rows={6}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Box>
                        </FormGroup>

                                <Box sx={{ mt: 4, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
                                    <Typography variant="h5" gutterBottom>
                                        Complications survenues en cours de l’hospitalisation
                                    </Typography>
                                    <Box sx={{ mt: 4, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
                                        <Typography variant="h6" gutterBottom>
                                            Complications infectieuses:
                                        </Typography>
                                    <SubSection
                                        title="Pneumopathie d’inhalation"
                                        name="PneumopathieInhalation"
                                        value={evolutionClassificationData.PneumopathieInhalation}
                                        handleChange={handleChangeBool}
                                        disabled={!isEditable}
                                    />

                                    <SubSection
                                        title="Infection urinaire"
                                        name="InfectionUrinaire"
                                        value={evolutionClassificationData.InfectionUrinaire}
                                        onChange={handleChangeBool}
                                        disabled={!isEditable}
                                    />
                                    </Box>
                                    <Box sx={{ mt: 4, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
                                        <Typography variant="h6" gutterBottom>
                                            Complications thromboemboliques:
                                        </Typography>
                                    <SubSection
                                        title="Embolie pulmonaire"
                                        name="EmboliePulmonaire"
                                        value={evolutionClassificationData.EmboliePulmonaire}
                                        handleChange={handleChangeBool}
                                        disabled={!isEditable}
                                    />

                                    <SubSection
                                        title="Thrombose veineuse profonde"
                                        name="ThromboseVeineuseProfonde"
                                        value={evolutionClassificationData.ThromboseVeineuseProfonde}
                                        handleChange={handleChangeBool}
                                        disabled={!isEditable}
                                    />
                                    </Box>
                                    <SubSection
                                        title="Hémorragie extracrânienne"
                                        name="HemorragieExtracranienne"
                                        value={evolutionClassificationData.HemorragieExtracranienne}
                                        handleChange={handleChangeBool}
                                        disabled={!isEditable}
                                    />

                                    <SubSection
                                        title="Escarre"
                                        name="Escarre"
                                        value={evolutionClassificationData.Escarre}
                                        handleChange={handleChangeBool}
                                        disabled={!isEditable}
                                    />
                                </Box>


                        <SubmitButtons
                            isDataAvailable={isDataAvailable}
                            setIsEditable={setIsEditable}
                            isEditable={isEditable}
                        />

                        {successMessage && (
                            <Notifications Message={successMessage} setMessage={setSuccessMessage} />
                        )}
                    </form>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
