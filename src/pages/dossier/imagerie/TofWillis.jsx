// TOFWillisSection.js
import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    FormControlLabel,
    Checkbox,
    Stack,
    Radio,
    RadioGroup,
    Alert,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import apiServices from "../../../services/api-services";
import SubmitButtons from "../../../components/shared/SubmitButtons";

const TOFWillisSection = ({ id, handleChange2, handleChangecheck }) => {
    const tof_WillisDataInit = {
        status: "Normal",
        Occlusin: "",
        Stenose: "",
        StenosePercent: "",
        M1G: "",
        M1D: "",
        Details: [],
        matricule: id,
    };

    const [tof_WillisData, setTof_WillisData] = useState({ ...tof_WillisDataInit });
    const [checkZone, setCheckZone] = useState(
        Object.fromEntries(
            [
                "CarotideterminaleD",
                "CarotideterminaleG",
                "CarotideinterneG",
                "CarotideinterneD",
                "M2ProxD",
                "M2DistD",
                "M2ProxG",
                "M2DistG",
                "M3M4G",
                "M3M4D",
                "cérébraleantérieurG",
                "cérébraleantérieurD",
                "cérébralepostérieurG",
                "cérébralepostérieurD",
                "VetébraleG",
                "VetébraleD",
                "PICAG",
                "PICAD",
                "CérébeleusesupérieureG",
                "CérébeleusesupérieureD",
                "AutreD",
                "AutreG",
            ].map((key) => [key, false])
        )
    );
    const [isEditable, setIsEditable] = useState(false);
    const [isDataAvailable, setIsDataAvailable] = useState(false);
    const [error, setError] = useState(null);

    const toggleEditMode = () => {
        setIsEditable((prev) => !prev);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiServices.loadDossierDetails(
                    setTof_WillisData,
                    "imagerie/tofwillis",
                    setIsDataAvailable,
                    setError,
                    id
                );
                if (data) {
                    const updatedCheckZone = {};
                    Object.keys(checkZone).forEach((key) => {
                        updatedCheckZone[key] = data.Details.includes(
                            key.replace(/([A-Z])/g, " $1").trim()
                        );
                    });
                    setCheckZone(updatedCheckZone);
                }
            } catch (err) {
                setError("Failed to fetch data. Please try again.");
            }
        };
        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedTof_WillisData = { ...tof_WillisData };

        if (tof_WillisData.status === "Normal") {
            updatedTof_WillisData = { ...tof_WillisDataInit };
            setTof_WillisData(tof_WillisDataInit);
        }

        apiServices
            .handleSubmit(
                e,
                updatedTof_WillisData,
                "imagerie/tofwillis",
                (successMessage) => {
                    toast.success(successMessage || "Data saved successfully!");
                },
                isDataAvailable,
                setIsDataAvailable,
                setIsEditable,
                setError,
                id
            )
            .catch((err) => toast.error(err.message || "Failed to save data."));
    };

    const boxStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "16px",
    };

    const sections = [
        { label: "Carotide terminale", id: "Carotideterminale" },
        { label: "Carotide interne", id: "Carotideinterne" },
        { label: "M3/M4", id: "M3M4" },
        { label: "cérébrale antérieur", id: "cérébraleantérieur" },
        { label: "cérébrale postérieur", id: "cérébralepostérieur" },
        { label: "Vertébrale", id: "Vetébrale" },
        { label: "PICA", id: "PICA" },
        { label: "Cérébeleuse supérieure", id: "Cérébeleusesupérieure" },
        { label: "Autre", id: "Autre" },
    ];

    const renderSections = (sections) => {
        return sections.map((section, index) => (
            <Box key={index} sx={boxStyle}>
                <FormControlLabel
                    control={
                        <Checkbox
                            name={`${section.id}G`}
                            id={`${section.id}G`}
                            disabled={!isEditable}
                            checked={checkZone[`${section.id}G`]}
                            onChange={(event) =>
                                handleChangecheck(
                                    event,
                                    tof_WillisData,
                                    setTof_WillisData,
                                    setCheckZone,
                                    "Details"
                                )
                            }
                        />
                    }
                    label="G"
                    labelPlacement="end"
                />
                <Typography sx={{ width: "200px", textAlign: "center", marginLeft: "8px" }}>
                    {section.label}
                </Typography>
                <FormControlLabel
                    control={
                        <Checkbox
                            name={`${section.id}D`}
                            id={`${section.id}D`}
                            disabled={!isEditable}
                            checked={checkZone[`${section.id}D`]}
                            onChange={(event) =>
                                handleChangecheck(
                                    event,
                                    tof_WillisData,
                                    setTof_WillisData,
                                    setCheckZone,
                                    "Details"
                                )
                            }
                        />
                    }
                    label="D"
                    labelPlacement="end"
                />
            </Box>
        ));
    };

    return (
        <form onSubmit={handleSubmit}>
            <ToastContainer /> {/* Add ToastContainer for displaying Toastify notifications */}
            <Box sx={{ mt: 4, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
                <Stack direction="row" spacing={4} alignItems="center">
                    <Typography variant="h6">TOF-Willis</Typography>
                    <RadioGroup
                        row
                        name="status"
                        value={tof_WillisData.status}
                        onChange={(event) => handleChange2(event, setTof_WillisData)}
                    >
                        <FormControlLabel
                            value="Normal"
                            control={<Radio />}
                            label="Normal"
                            disabled={!isEditable}
                        />
                        <FormControlLabel
                            value="Anormal"
                            control={<Radio />}
                            label="Anormal"
                            disabled={!isEditable}
                        />
                    </RadioGroup>
                </Stack>
                {error && <Alert severity="error">{error}</Alert>}
                {tof_WillisData.status === "Anormal" && (
                    <>
                        {/* Occlusion Section */}
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginTop: "16px",
                        }}>
                            <Typography variant="h6">Occlusion</Typography>
                            <RadioGroup
                                row
                                name="Occlusin"
                                value={tof_WillisData.Occlusin}
                                onChange={(event) => handleChange2(event, setTof_WillisData)}
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
                        </Box>

                        {/* Sténose Section */}
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginTop: "16px",
                        }}>
                            <Typography variant="h6">Sténose</Typography>
                            <RadioGroup
                                row
                                name="Stenose"
                                value={tof_WillisData.Stenose}
                                onChange={(event) => handleChange2(event, setTof_WillisData)}
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
                        </Box>

                        {/* Percentage of Sténose */}
                        {tof_WillisData.Stenose === "Oui" && (
                            <Box  sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                marginTop: "16px",
                            }}>

                                <RadioGroup
                                    row
                                    name="StenosePercent"
                                    value={tof_WillisData.StenosePercent}
                                    onChange={(event) => handleChange2(event, setTof_WillisData)}
                                >
                                    <FormControlLabel
                                        value=">50%"
                                        control={<Radio />}
                                        label=">50%"
                                        disabled={!isEditable}
                                    />
                                    <FormControlLabel
                                        value="<50%"
                                        control={<Radio />}
                                        label="<50%"
                                        disabled={!isEditable}
                                    />
                                </RadioGroup>
                            </Box>
                        )}
                    </>
                )}
                {tof_WillisData.status === "Anormal" && renderSections(sections)}
                <SubmitButtons
                    isDataAvailable={isDataAvailable}
                    setIsEditable={setIsEditable}
                    isEditable={isEditable}
                />
            </Box>
        </form>
    );
};

export default TOFWillisSection;
