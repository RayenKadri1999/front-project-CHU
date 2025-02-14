import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Notifications from "../../components/shared/Notifications";
import SubmitButtons from "../../components/shared/SubmitButtons";
import apiServices from "../../services/api-services";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Checkbox, FormControlLabel, FormGroup, Grid, Typography, TextField } from "@mui/material"; // **Import TextField**
import PdfButton from "../../components/shared/PdfButton"; //If needed

export default function Etiologie_Hematome({ commonState }) {
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
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [etiologieData, setEtiologieData] = useState({
        Microangiopathie: null,
        AngiopathieAmyloide: null,
        MalformationArterioveineuse: null,
        AnevrysmeRompu: null,
        CoagulopathieIatrogene: null,
        CoagulopathieConstitutionnelle: null,
        TransformationHemorragique: null,
        ThromboseVeineuseCerebrale: null,
        Autres: null,
        AVC: null,
        Indeterminee: null,
        TumeurCerebrale: null,
        info: null,
        matricule: id,
    });


    const handleChange = (event) => {
        const { name, checked } = event.target;
        setEtiologieData(prevData => ({
            ...prevData,
            [name]: checked ? "oui" : null,
        }));
    };

    const cleanData = (data) => {
        let cleanedData = { ...data };
        delete cleanedData._id;
        delete cleanedData.__v;

        Object.keys(cleanedData).forEach(key => {
            if (cleanedData[key] === null || cleanedData[key] === undefined) {
                delete cleanedData[key]; //This line already handles the "null" case.  No need for empty string check with checkboxes.
            }
        });
        return cleanedData;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const cleanedData = cleanData(etiologieData);

        apiServices.handleSubmit(
            e,
            cleanedData,
            "etiologie",
            setSuccessMessage,
            isDataAvailable,
            setIsDataAvailable,
            setIsEditable,
            setError,
            id
        );
    };

    useEffect(() => {
        apiServices.loadDossierDetails(setEtiologieData, "etiologie", setIsDataAvailable, setError, id);
    }, [id]);

    return (
        <>
            <ThemeProvider theme={theme}>
                {error && <Alert severity="error">{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Typography variant="h4">Etiologie Hematome</Typography>
                        </Box>

                        <Grid container spacing={2} mt={2}>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={etiologieData.Microangiopathie === "oui"}
                                            onChange={handleChange}
                                            name="Microangiopathie"
                                            disabled={!isEditable}
                                        />
                                    }
                                    label="Microangiopathie"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={etiologieData.AngiopathieAmyloide === "oui"}
                                            onChange={handleChange}
                                            name="AngiopathieAmyloide"
                                            disabled={!isEditable}
                                        />
                                    }
                                    label="Angiopathie Amyloide"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={etiologieData.MalformationArterioveineuse === "oui"}
                                            onChange={handleChange}
                                            name="MalformationArterioveineuse"
                                            disabled={!isEditable}
                                        />
                                    }
                                    label="Malformation Arterioveineuse"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={etiologieData.AnevrysmeRompu === "oui"}
                                            onChange={handleChange}
                                            name="AnevrysmeRompu"
                                            disabled={!isEditable}
                                        />
                                    }
                                    label="Anevrysme Rompu"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={etiologieData.CoagulopathieIatrogene === "oui"}
                                            onChange={handleChange}
                                            name="CoagulopathieIatrogene"
                                            disabled={!isEditable}
                                        />
                                    }
                                    label="Coagulopathie Iatrogene"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={etiologieData.CoagulopathieConstitutionnelle === "oui"}
                                            onChange={handleChange}
                                            name="CoagulopathieConstitutionnelle"
                                            disabled={!isEditable}
                                        />
                                    }
                                    label="Coagulopathie Constitutionnelle"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={etiologieData.TransformationHemorragique === "oui"}
                                            onChange={handleChange}
                                            name="TransformationHemorragique"
                                            disabled={!isEditable}
                                        />
                                    }
                                    label="Transformation Hemorragique"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={etiologieData.ThromboseVeineuseCerebrale === "oui"}
                                            onChange={handleChange}
                                            name="ThromboseVeineuseCerebrale"
                                            disabled={!isEditable}
                                        />
                                    }
                                    label="Thrombose Veineuse Cerebrale"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={etiologieData.Autres === "oui"}
                                            onChange={handleChange}
                                            name="Autres"
                                            disabled={!isEditable}
                                        />
                                    }
                                    label="Autres"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={etiologieData.AVC === "oui"}
                                            onChange={handleChange}
                                            name="AVC"
                                            disabled={!isEditable}
                                        />
                                    }
                                    label="AVC"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={etiologieData.Indeterminee === "oui"}
                                            onChange={handleChange}
                                            name="Indeterminee"
                                            disabled={!isEditable}
                                        />
                                    }
                                    label="Indeterminee"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={etiologieData.TumeurCerebrale === "oui"}
                                            onChange={handleChange}
                                            name="TumeurCerebrale"
                                            disabled={!isEditable}
                                        />
                                    }
                                    label="Tumeur Cerebrale"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    name="info"
                                    label="Informations complémentaires"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    fullWidth
                                    value={etiologieData.info || ""}
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                />
                            </Grid>
                        </Grid>

                        <SubmitButtons isDataAvailable={isDataAvailable} setIsEditable={setIsEditable} isEditable={isEditable} />

                        {successMessage && <Notifications Message={successMessage} setMessage={setSuccessMessage} />}
                    </Box>
                </form>
            </ThemeProvider>
        </>
    );
}