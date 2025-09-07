import authHeader from "../../services/auth-header";

import {
    Box,
    Button,
    FormControlLabel,
    Grid,
    RadioGroup,
    TextField,
    Radio,
    styled,
    Typography,
    FormControl,
    FormLabel,
    Alert,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import apiServices from "../../services/api-services";
import useAuth from "../../hooks/useAuth";

const AddHospitalisationForm = ({ handleClose, id, setSuccessMessage }) => {
    const { username, role } = useAuth();
    const [HospitalisationData, setHospitalisationData] = useState({
        entreeFaitPar: "",
        sortieFaitPar: "",
        dateEntree: "",
        dateSortie: "",
        TypeAVC: "",
        _id: "",
        dossier: id,
        reviewStatus: role == "normalUser" ? "En cours" : "Accepté",
    });
    const moment = require("moment");
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setHospitalisationData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        console.log("date sortie changed.");
        console.log(HospitalisationData.dateSortie);
        console.log(HospitalisationData.dateSortie.length);
    }, [HospitalisationData.dateSortie]);

    const handleSubmit = (e) => {
        apiServices.handleSubmitModal(
            e,
            HospitalisationData,
            "hospitalisation",
            setSuccessMessage,
            true,
            handleClose,
            setError
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <Alert severity="error">{error}</Alert>}
            <Typography variant="h4" gutterBottom>
                {" "}
                Nouvelle Hospitalisation{" "}
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Matricule"
                        name="_id"
                        value={HospitalisationData._id}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        label="Entrée Faite Par"
                        name="entreeFaitPar"
                        value={HospitalisationData.entreeFaitPar}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format="DD/MM/YYYY"
                            required
                            label="Date Entrée"
                            value={dayjs(HospitalisationData.dateEntree)}
                            onChange={(date) =>
                                setHospitalisationData((prevData) => ({
                                    ...prevData,
                                    dateEntree: date,
                                }))
                            }
                            sx={{ display: "flex" }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    margin="normal"
                                />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={6}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Type AVC</FormLabel>
                        <RadioGroup
                            value={HospitalisationData.TypeAVC}
                            name="TypeAVC"
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value="Infarctus cérébral"
                                control={<Radio />}
                                label="Infarctus cérébral"
                                required
                                checked={
                                    HospitalisationData.TypeAVC ===
                                    "Infarctus cérébral"
                                }
                            />
                            <FormControlLabel
                                value="Hématome cérébral"
                                control={<Radio />}
                                label="Hématome cérébral"
                                required
                                checked={
                                    HospitalisationData.TypeAVC ===
                                    "Hématome cérébral"
                                }
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <>
                    <Grid item xs={12} md={6}>
                        <Box display={"flex"} sx={{ width: "100%" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    label="Date Sortie"
                                    value={dayjs(
                                        HospitalisationData.dateSortie
                                    )}
                                    onChange={(date) =>
                                        setHospitalisationData((prevData) => ({
                                            ...prevData,
                                            dateSortie: date,
                                        }))
                                    }
                                    sx={{ display: "flex", flex:1 }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            margin="normal"
                                        />
                                    )}
                                />
                          
                            </LocalizationProvider>
                            {HospitalisationData.dateSortie &&
                            dayjs(HospitalisationData.dateSortie).isValid() && (
                            <Button
                                onClick={() => {
                                    setHospitalisationData((prev) => ({
                                        ...prev,
                                        dateSortie: "",
                                    }));
                                }}
                            >
                                Annuler
                            </Button>
                            )}
                        </Box>
                        {HospitalisationData.dateSortie &&
                            dayjs(HospitalisationData.dateSortie).isValid() && (
                                <TextField
                                    label="Sortie Faite Par"
                                    name="sortieFaitPar"
                                    value={HospitalisationData.sortieFaitPar}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                />
                            )}
                    </Grid>

                    {/* <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker
                  format="DD/MM/YYYY"
                    label="Date Sortie"
                    required
                    value={dayjs(HospitalisationData.dateSortie)}
                    onChange={(date) =>
                      setHospitalisationData((prevData) => ({
                        ...prevData,
                        dateSortie: date,
                      }))
                    }
                    sx={{display:"flex"}}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth margin="normal" />
                    )}
                  />
                </LocalizationProvider>
              </Grid> */}
                </>
            </Grid>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    mt: 3,
                }}
            >
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: "5px" }}
                >
                    Créer
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClose}
                    style={{ marginLeft: "5px" }}
                >
                    Annuler
                </Button>
            </Box>
        </form>
    );
};

export default AddHospitalisationForm;
