// ScannerSection.js
import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    FormControlLabel,
    Stack,
    Button,
    Radio,
    RadioGroup,
    TextField,
    FormControl,
    FormLabel,
    Grid,
    Alert,
    Checkbox,
    Select, MenuItem
} from '@mui/material';
import { SendIcon } from 'lucide-react';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import authHeader from '../../../services/auth-header';
import { CheckBox, Description } from '@mui/icons-material';
import Notifications from '../../../components/shared/Notifications';
import apiServices from "../../../services/api-services";
import SubmitButtons from '../../../components/shared/SubmitButtons';
import PdfButton from "../../../components/shared/PdfButton";

const TDMSection = ({ id, handleChange2 }) => {


    const [isDataAvailable, setIsDataAvailable] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [checkZone, setCheckZone] = useState({
        troncbasilaire :false,
    });
    const TDMDataInit = {
        status: "Non",
        DateTDM: "",
            VolumeHematomeEquation:"",
        LocalisationSusTentoriel:"",
        LocalisationSousTentoriel:"",
        DeviationLigneMediane:"",
        Engagement:"",
        Hydrocephalie:"",
        HemorragieMeningeeAssociee:"",
        HemorragieIntraventriculaire:"",
        AngioTDM:"",
        TumeurCerebrale:"",
        PresenceMAV:"",
        PresenceAnevrisme:"",
        SpotSign:"",
        TDMAutres:"",



        matricule: id,

    };
    const [TDMData, setTDMData] = useState({
        status: "",
        DateTDM: new Date(),
        Description:"",
        VolumeHematomeEquation:"",
        LocalisationSusTentoriel:"",
        LocalisationSousTentoriel:"",
        DeviationLigneMediane:"",
        Engagement:"",
        Hydrocephalie:"",
        HemorragieMeningeeAssociee:"",
        HemorragieIntraventriculaire:"",
        AngioTDM:"",
        TumeurCerebrale:"",
        PresenceMAV:"",
        PresenceAnevrisme:"",
        SpotSign:"",
        TDMAutres:"",


        matricule: id,

    });
    const toggleEditMode = () => {
        setIsEditable((prev) => !prev);
    };



    useEffect(() => {
        const fetchData = async () => {
            const data = await apiServices.loadDossierDetails(setTDMData,"imagerie/TDM",setIsDataAvailable,setError,id)
            if(data){
                setCheckZone({
                    troncbasilaire : data.troncbasilaire ==="oui",
                });
            }
        }
        fetchData();
    }, []);

    const handleSubmit = (e) => {
        let updatedTDMData = TDMData;

        if (TDMData.status === "Non") {
            // update the fileds with initials values
            updatedTDMData = TDMDataInit;
            setTDMData(TDMDataInit);
        }else if (TDMData.AngioscanTSA_Willis === "Normal") {
            updatedTDMData.Occlusin_sténose = "";
            updatedTDMData.ACGauche = "";
            updatedTDMData.ACDroite = "";
            updatedTDMData.troncbasilaire = "non"; // Assuming this is fixed as "non"
            updatedTDMData.AVGauche = "";
            updatedTDMData.AVDroite = "";
            updatedTDMData.AngioTSAGacuhe = "";
            updatedTDMData.AngioTSADroite = "";
            setTDMData(updatedTDMData);
            setCheckZone((prevData) => ({
                ...prevData,
                troncbasilaire: false,
            }));
        }
        // Use updatedTDMData instead of the state directly
        apiServices.handleSubmit(e, updatedTDMData, "imagerie/TDM", setSuccessMessage, isDataAvailable,setIsDataAvailable, setIsEditable, setError, id);
    }
    const handleChangeDate = (name) => (value) => {
        const updatedDateTime = dayjs(TDMData[name])
            .set("year", value.year())
            .set("month", value.month())
            .set("date", value.date());
        setTDMData((prevData) => ({
            ...prevData,
            [name]: updatedDateTime,
        }));
    };

    const handleChangeTime = (name) => (value) => {
        const updatedDateTime = dayjs(TDMData[name])
            .set("hour", value.hour())
            .set("minute", value.minute());
        setTDMData((prevData) => ({
            ...prevData,
            [name]: updatedDateTime,
        }));
    };

    const handleChangecheck = (e) => {
        const { name, checked } = e.target;


        if (checked) {
            setCheckZone((prevData) => ({
                ...prevData,
                [name]: true,
            }));

            // Update the key in imagerieData with the new name added


            setTDMData((prevData) => ({
                ...prevData,
                [name]: "oui",
            }));
        } else {
            setCheckZone((prevData) => ({
                ...prevData,
                [name]: false,
            }));



            setTDMData((prevData) => ({
                ...prevData,
                [name]: "non",
            }));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
                <Stack direction="row" spacing={4} alignItems="center">
                    <Typography variant="h6">Scanner</Typography>

                    {/* Oui / Non Radio Group */}
                    <RadioGroup row name="status" defaultValue="Non" value={TDMData.status}    onChange={(event) => handleChange2(event, setTDMData)}>
                        <FormControlLabel value="Oui" control={<Radio />} label="Oui" disabled={!isEditable} />
                        <FormControlLabel value="Non" control={<Radio />} label="Non" disabled={!isEditable} />
                    </RadioGroup>

                </Stack>
                {error && <Alert severity="info">{error}</Alert>}
                {TDMData.status == "Oui" &&
                    <>
                        {/* TDM Date */}
                        <Box sx={{ display:"flex", mt: 2,mb:3 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <LocalizationProvider  dateAdapter={AdapterDayjs}>

                                        <DatePicker
                                            label="effectué le"  fullwidth  required  format="DD/MM/YYYY"  value={dayjs(TDMData.DateTDM)}  onChange={handleChangeDate('DateTDM')}  renderInput={(params) => <TextField {...params} />}  disabled={!isEditable}  sx={{display:"flex"}}
                                        />

                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker  label="à"  required  value={dayjs(TDMData.DateTDM)}  onChange={handleChangeTime("DateTDM")}  disabled={!isEditable}  sx={{display:"flex"}}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField  label="Description"  name="Description"  fullWidth  sx={{ mt: 2 }}  value={TDMData.Description}  onChange={(event) => handleChange2(event, setTDMData)}  disabled={!isEditable}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Grid item xs={12}>
                            <Typography
                                sx={{ mr: 2 }}
                              >Volume de l’hématome: </Typography>
                            <TextField  label="Equation"  name="VolumeHematomeEquation"  fullWidth  sx={{ mt: 2 }}  value={TDMData.VolumeHematomeEquation}  onChange={(event) => handleChange2(event, setTDMData)}  disabled={!isEditable}
                            />
                        </Grid>
                        <Stack direction="row" spacing={4} alignItems="center" mb={5}>
                            <Typography sx={{ mr: 2 }} sx={{ flexShrink: 0, textAlign: "center",}}>Sus tentoriel </Typography>

                            <RadioGroup
                                row
                                value={TDMData.LocalisationSusTentoriel}
                                name="LocalisationSusTentoriel"
                                onChange={(event) => handleChange2(event, setTDMData)}
                            >
                                <FormControlLabel value="profond" control={<Radio />} label="profond" disabled={!isEditable}     required />
                                <FormControlLabel value="lobaire" control={<Radio />} label="lobaire" disabled={!isEditable}     required />
                            </RadioGroup>
                        </Stack>
                        <Stack direction="row" spacing={4} alignItems="center" mb={5}>
                            <Typography
                                sx={{ mr: 2 }}
                                sx={{

                                    flexShrink: 0, // Prevents the label from shrinking when the container size changes

                                    textAlign: "center", // Center align text within the fixed width
                                }}>Sus tentoriel </Typography>

                            <RadioGroup
                                row
                                value={TDMData.LocalisationSousTentoriel}
                                name="LocalisationSousTentoriel"
                                onChange={(event) => handleChange2(event, setTDMData)}
                            >
                                <FormControlLabel value="profond" control={<Radio />} label="profond" disabled={!isEditable}     required />
                                <FormControlLabel value="lobaire" control={<Radio />} label="lobaire" disabled={!isEditable}     required />
                            </RadioGroup>
                        </Stack>
                        <Stack direction="row" spacing={4} alignItems="center" mb={5}>
                            <TextField
                                label="Déviation de la ligne médiane"

                                name="DeviationLigneMediane"
                                fullWidth
                                sx={{ mt: 2 }}
                                value={TDMData.DeviationLigneMediane}
                                onChange={(event) => handleChange2(event, setTDMData)}
                                disabled={!isEditable}
                            />
                        </Stack>
                        <Stack direction="row" spacing={4} alignItems="center" mb={5}>
                        <Typography
                            sx={{ mr: 2 }}
                            sx={{

                                flexShrink: 0, // Prevents the label from shrinking when the container size changes

                                textAlign: "center", // Center align text within the fixed width
                            }}>Engagement</Typography>

                        <RadioGroup
                            row
                            value={TDMData.Engagement}
                            name="Engagement"
                            onChange={(event) => handleChange2(event, setTDMData)}
                        >
                            <FormControlLabel value="Oui" control={<Radio />} label="Oui" disabled={!isEditable}     required />
                            <FormControlLabel value="Non" control={<Radio />} label="Non" disabled={!isEditable}     required />
                        </RadioGroup>
                    </Stack>
                        <Stack direction="row" spacing={4} alignItems="center" mb={5}>
                            <Typography
                                sx={{ mr: 2 }}
                                sx={{

                                    flexShrink: 0, // Prevents the label from shrinking when the container size changes

                                    textAlign: "center", // Center align text within the fixed width
                                }}>Hydrocéphalie</Typography>

                            <RadioGroup
                                row
                                value={TDMData.Hydrocephalie}
                                name="Hydrocephalie"
                                onChange={(event) => handleChange2(event, setTDMData)}
                            >
                                <FormControlLabel value="Oui" control={<Radio />} label="Oui" disabled={!isEditable}     required />
                                <FormControlLabel value="Non" control={<Radio />} label="Non" disabled={!isEditable}     required />
                            </RadioGroup>
                        </Stack>
                        <Stack direction="row" spacing={4} alignItems="center" mb={5}>
                            <Typography
                                sx={{ mr: 2 }}
                                sx={{

                                    flexShrink: 0, // Prevents the label from shrinking when the container size changes

                                    textAlign: "center", // Center align text within the fixed width
                                }}>Hémorragie méningée associée</Typography>

                            <RadioGroup
                                row
                                value={TDMData.HemorragieMeningeeAssociee}
                                name="HemorragieMeningeeAssociee"
                                onChange={(event) => handleChange2(event, setTDMData)}
                            >
                                <FormControlLabel value="Oui" control={<Radio />} label="Oui" disabled={!isEditable}     required />
                                <FormControlLabel value="Non" control={<Radio />} label="Non" disabled={!isEditable}     required />
                            </RadioGroup>
                        </Stack>
                        <Stack direction="row" spacing={4} alignItems="center" mb={5}>
                            <Typography
                                sx={{ mr: 2 }}
                                sx={{

                                    flexShrink: 0, // Prevents the label from shrinking when the container size changes

                                    textAlign: "center", // Center align text within the fixed width
                                }}>Hémorragie intraventriculaire </Typography>

                            <RadioGroup
                                row
                                value={TDMData.HemorragieIntraventriculaire}
                                name="HemorragieIntraventriculaire"
                                onChange={(event) => handleChange2(event, setTDMData)}
                            >
                                <FormControlLabel value="Oui" control={<Radio />} label="Oui" disabled={!isEditable}     required />
                                <FormControlLabel value="Non" control={<Radio />} label="Non" disabled={!isEditable}     required />
                            </RadioGroup>
                        </Stack>

                        <Stack direction="row" spacing={4} alignItems="center" mb={5}>
                            <Typography
                                sx={{ mr: 2 }}
                                sx={{

                                    flexShrink: 0, // Prevents the label from shrinking when the container size changes

                                    textAlign: "center", // Center align text within the fixed width
                                }}>Angio-TDM </Typography>

                            <RadioGroup
                                row
                                value={TDMData.AngioTDM}
                                name="AngioTD"
                                onChange={(event) => handleChange2(event, setTDMData)}
                            >

                                <FormControlLabel value="Oui" control={<Radio />} label="fait" disabled={!isEditable}     required />
                                <FormControlLabel value="Non" control={<Radio />} label="Non" disabled={!isEditable}     required />
                            </RadioGroup>
                        </Stack>

                        <Stack direction="row" spacing={4} alignItems="center" mb={5}>
                            <Typography
                                sx={{ mr: 2 }}
                                sx={{

                                    flexShrink: 0, // Prevents the label from shrinking when the container size changes

                                    textAlign: "center", // Center align text within the fixed width
                                }}>Tumeur cérébrale </Typography>

                            <RadioGroup
                                row
                                value={TDMData.TumeurCerebrale}
                                name="TumeurCerebrale"
                                onChange={(event) => handleChange2(event, setTDMData)}
                            >

                                <FormControlLabel value="Oui" control={<Radio />} label="Oui" disabled={!isEditable}     required />
                                <FormControlLabel value="Non" control={<Radio />} label="Non" disabled={!isEditable}     required />
                            </RadioGroup>
                        </Stack>

                        <Stack direction="row" spacing={4} alignItems="center" mb={5}>
                            <Typography
                                sx={{ mr: 2 }}
                                sx={{

                                    flexShrink: 0, // Prevents the label from shrinking when the container size changes

                                    textAlign: "center", // Center align text within the fixed width
                                }}>Présence de MAV  </Typography>

                            <RadioGroup
                                row
                                value={TDMData.PresenceMAV}
                                name="PresenceMAV"
                                onChange={(event) => handleChange2(event, setTDMData)}
                            >

                                <FormControlLabel value="Oui" control={<Radio />} label="Oui" disabled={!isEditable}     required />
                                <FormControlLabel value="Non" control={<Radio />} label="Non" disabled={!isEditable}     required />
                            </RadioGroup>
                        </Stack>

                        <Stack direction="row" spacing={4} alignItems="center" mb={5}>
                            <Typography
                                sx={{ mr: 2 }}
                                sx={{

                                    flexShrink: 0, // Prevents the label from shrinking when the container size changes

                                    textAlign: "center", // Center align text within the fixed width
                                }}>Présence d’anévrisme  </Typography>

                            <RadioGroup
                                row
                                value={TDMData.PresenceAnevrisme}
                                name="PresenceAnevrisme"
                                onChange={(event) => handleChange2(event, setTDMData)}
                            >

                                <FormControlLabel value="Oui" control={<Radio />} label="Oui" disabled={!isEditable}     required />
                                <FormControlLabel value="Non" control={<Radio />} label="Non" disabled={!isEditable}     required />
                            </RadioGroup>
                        </Stack>
                        <Stack direction="row" spacing={4} alignItems="center" mb={5}>
                            <Typography
                                sx={{ mr: 2 }}
                                sx={{

                                    flexShrink: 0, // Prevents the label from shrinking when the container size changes

                                    textAlign: "center", // Center align text within the fixed width
                                }}>Spot sign </Typography>

                            <RadioGroup
                                row
                                value={TDMData.SpotSign}
                                name="SpotSign"
                                onChange={(event) => handleChange2(event, setTDMData)}
                            >

                                <FormControlLabel value="Oui" control={<Radio />} label="Oui" disabled={!isEditable}     required />
                                <FormControlLabel value="Non" control={<Radio />} label="Non" disabled={!isEditable}     required />
                            </RadioGroup>
                        </Stack>
                        <Stack direction="row" spacing={4} alignItems="center" mb={5}>
                            <TextField
                                label="Autres"

                                name="TDMAutres"
                                fullWidth
                                sx={{ mt: 2 }}
                                value={TDMData.TDMAutres}
                                onChange={(event) => handleChange2(event, setTDMData)}
                                disabled={!isEditable}
                            />
                        </Stack>




                    </>

                }
                <SubmitButtons isDataAvailable={isDataAvailable} setIsEditable={setIsEditable} isEditable={isEditable}/>

                {successMessage && (
                    <Notifications Message={successMessage} setMessage={setSuccessMessage}/>
                )}
            </Box>
        </form>
    );
};

export default TDMSection;
