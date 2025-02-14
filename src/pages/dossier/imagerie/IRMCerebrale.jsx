import React, { useEffect, useState } from 'react';
import { Box, Typography, FormControlLabel, Checkbox, Stack,  Radio, RadioGroup, Alert } from '@mui/material';
import { SendIcon } from 'lucide-react';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import Notifications from '../../../components/shared/Notifications';
import apiServices from "../../../services/api-services";
import SubmitButtons from '../../../components/shared/SubmitButtons';
import AspectsSection from './ASPECTS';
import TOFWillisSection from "./TofWillis";
import T2SwanSection from "./T2Swan";
import FatSatSection from "./FatSat";

import TSASection from "./TSA";
import PerfusionOrASLSection from "./SequencePerfusion";

import FLAIR from "./Flair";


const IRM = ({
                 id,

                 // checkZone,

                 handleChange2,

                 handleChangecheck,
             }) => {

    const [isDataAvailable, setIsDataAvailable] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const IRMinitData ={
        status:"Non",

        dateIRM: new Date(),
        dateFinIRM: new Date(),
        IRM_Cerebrale : "",
        Diffusion1:"",
        Diffusion2:"",


        Details:[],
        matricule: id,
    }
    const [IRMData, setIRMData] = useState(IRMinitData);

    const checkZoneinit = {

        CerebralmoyenD :false,
        CerebralmoyenG:false,

        CerebralanterieurG :false,
        CerebralanterieurD :false,



        CerebralposterieurG :false,
        CerebralposterieurD :false,
        PontiqueparamedianG :false,
        PontiqueparamedianD :false,


        LaterobulbaireG :false,
        LaterobulbaireD :false,


        Latero_pontiqueG :false,
        Latero_pontiqueD :false,

        PICAG :false,
        PICAD :false,


        AICAG :false,
        AICAD :false,


        ACSG :false,
        ACSD :false,

        AttributeOption:"",
        JonctionelG :false,
        JonctionelD :false,
    }
    const[checkZone,setCheckZone]= useState(checkZoneinit);
    const [isEditable, setIsEditable] = useState(false);


    const toggleEditMode = () => {
        setIsEditable((prev) => !prev);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await apiServices.loadDossierDetails(setIRMData,"imagerie/irm",setIsDataAvailable,setError,id);
            if(data){
                setCheckZone({
                    CerebralmoyenD : data.Details.includes("Cérébral moyen Droite"),
                    CerebralmoyenG:data.Details.includes("Cérébral moyen Gauche"),

                    CerebralanterieurG:data.Details.includes("Cérébral antérieur Gauche"),
                    CerebralanterieurD:data.Details.includes("Cérébral antérieur Droite"),

                    CerebralposterieurG:data.Details.includes("Cérébral postérieur Gauche"),
                    CerebralposterieurD:data.Details.includes("Cérébral postérieur Droite"),

                    PontiqueparamedianG:data.Details.includes("Pontique paramédian Gauche"),
                    PontiqueparamedianD:data.Details.includes("Pontique paramédian Droite"),

                    LaterobulbaireG:data.Details.includes("Latéro bulbaire Gauche"),
                    LaterobulbaireD:data.Details.includes("Latéro bulbaire Droite"),

                    Latero_pontiqueG:data.Details.includes("Latéro pontique Gauche"),
                    Latero_pontiqueD:data.Details.includes("Latéro pontique Droite"),

                    PICAG:data.Details.includes("PICA Gauche"),
                    PICAD:data.Details.includes("PICA Droite"),

                    AICAG:data.Details.includes("AICA Gauche"),
                    AICAD:data.Details.includes("AICA Droite"),

                    ACSG:data.Details.includes("ACS Gauche"),
                    ACSD:data.Details.includes("ACS Droite"),

                    JonctionelG:data.Details.includes("Jonctionel Gauche"),
                    JonctionelD:data.Details.includes("Jonctionel Droite"),





                });
            }
        }
        fetchData();
    }, []);




    const handleSubmit = (e) => {
        let updatedirmData = IRMData;

        if (IRMData.status === "Non") {
            apiServices.handleDeleteIRMDetails(e,"aspects",setError,id);
            apiServices.handleDeleteIRMDetails(e,"flair",setError,id);
            apiServices.handleDeleteIRMDetails(e,"fatsat",setError,id);
            apiServices.handleDeleteIRMDetails(e,"tsa",setError,id);
            apiServices.handleDeleteIRMDetails(e,"tofwillis",setError,id);
            apiServices.handleDeleteIRMDetails(e,"sequenceperfusion",setError,id);
            apiServices.handleDeleteIRMDetails(e,"t2swan",setError,id);

            updatedirmData = IRMinitData;
            setIRMData(IRMinitData);
        }else if (IRMData.Diffusion1 === "Normale") {
            updatedirmData.Diffusion2="";
            updatedirmData.Details = [''];
            setIRMData(updatedirmData);
            setCheckZone(checkZoneinit);
            apiServices.handleDeleteIRMDetails(e,"aspects",setError,id);
        }

        apiServices.handleSubmit(e,updatedirmData,"imagerie/irm",setSuccessMessage,isDataAvailable,setIsDataAvailable,setIsEditable,setError,id);
    }





    const handleChangeDate = (name) => (value) => {
        const updatedDateTime = dayjs(IRMData[name])
            .set("year", value.year())
            .set("month", value.month())
            .set("date", value.date());
        setIRMData((prevData) => ({
            ...prevData,
            [name]: updatedDateTime,
        }));
    };

    const handleChangeTime = (name) => (value) => {
        const updatedDateTime = dayjs(IRMData[name])
            .set("hour", value.hour())
            .set("minute", value.minute());
        setIRMData((prevData) => ({
            ...prevData,
            [name]: updatedDateTime,
        }));
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box mb={6}  sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
                    <Stack direction="row" spacing={4} alignItems="center">
                        <Typography variant="h6">IRM Cérébrale</Typography>


                        {/* Normal / Anormal Radio Group */}
                        <RadioGroup row name="status" defaultValue="Normal"  value={IRMData.status}  onChange={(event) => handleChange2(event, setIRMData)}>
                            <FormControlLabel value="Oui" control={<Radio />} label="Oui"   disabled={!isEditable} />
                            <FormControlLabel value="Non" control={<Radio />} label="Non"   disabled={!isEditable}/>
                        </RadioGroup>
                    </Stack>
                    <Box mb={6}  sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>

                        {error && <Alert severity="info">{error}</Alert>}
                        {IRMData.status === "Oui" &&
                            <>
                                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2, mt: 2 ,mb: 6 }}>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Date Début"
                                            format="DD/MM/YYYY"
                                            required
                                            value={dayjs(IRMData.dateIRM)}
                                            onChange={handleChangeDate("dateIRM")}
                                            disabled={!isEditable}
                                            slotProps={{ textField: { helperText: "" } }}
                                        />
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            label="Heure de début"
                                            value={dayjs(IRMData.dateIRM)}
                                            onChange={handleChangeTime("dateIRM")}
                                            disabled={!isEditable}
                                            required
                                        />
                                    </LocalizationProvider>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Date Fin"
                                            format="DD/MM/YYYY"
                                            required
                                            value={dayjs(IRMData.dateFinIRM)}
                                            onChange={handleChangeDate("dateFinIRM")}
                                            disabled={!isEditable}
                                            slotProps={{ textField: { helperText: "" } }}
                                        />
                                    </LocalizationProvider>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            label="Heure de fin"
                                            value={dayjs(IRMData.dateFinIRM)}
                                            required
                                            onChange={handleChangeTime("dateFinIRM")}
                                            disabled={!isEditable}
                                        />
                                    </LocalizationProvider>
                                    {/* <Typography variant="h6" marginTop={5}>Etiologie retenue</Typography> */}

                                </Box>

                                <Stack direction="row" spacing={4} alignItems="center" mb={3}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            flexShrink: 0, // Prevents the label from shrinking
                                            textAlign: "center", // Center align text
                                        }}
                                    >
                                        IRM Cérébrale
                                    </Typography>

                                    {/* IRM Cérébrale Radio Group */}
                                    <RadioGroup
                                        row
                                        name="IRM_Cerebrale"
                                        value={IRMData.IRM_Cerebrale}
                                        onChange={(event) => handleChange2(event, setIRMData)}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: "24px", // Space between radio buttons
                                        }}
                                    >
                                        <FormControlLabel
                                            value="Normale"
                                            control={<Radio />}
                                            label="Normale"
                                            required
                                            disabled={!isEditable}
                                        />
                                        <FormControlLabel
                                            value="Anormale"
                                            control={<Radio />}
                                            label="Anormale"
                                            required
                                            disabled={!isEditable}
                                        />
                                    </RadioGroup>
                                </Stack>

                                {/* Conditionally Render Diffusion Fields */}
                                {IRMData.IRM_Cerebrale === "Anormale" && (
                                    <>
                                        <Stack direction="row" spacing={4} alignItems="center" mb={3}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    flexShrink: 0,
                                                    textAlign: "center",
                                                }}
                                            >
                                                Diffusion
                                            </Typography>

                                            <RadioGroup
                                                row
                                                name="Diffusion1"
                                                value={IRMData.Diffusion1}
                                                onChange={(event) => handleChange2(event, setIRMData)}
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    gap: "24px",
                                                }}
                                            >
                                                <FormControlLabel
                                                    value="Normale"
                                                    control={<Radio />}
                                                    label="Normale"
                                                    required
                                                    disabled={!isEditable}
                                                />
                                                <FormControlLabel
                                                    value="Anormale"
                                                    control={<Radio />}
                                                    label="Anormale"
                                                    required
                                                    disabled={!isEditable}
                                                />
                                            </RadioGroup>
                                        </Stack>

                                        {(IRMData.IRM_Cerebrale === "Anormale") && (
                                            <>
                                                <Stack direction="row" spacing={4} alignItems="center" mb={3}>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            flexShrink: 0,
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        Type of Diffusion
                                                    </Typography>

                                                    <RadioGroup
                                                        row
                                                        name="Diffusion2"
                                                        value={IRMData.Diffusion2}
                                                        onChange={(event) => {
                                                            setIRMData((prevData) => ({
                                                                ...prevData,
                                                                Diffusion2: event.target.value,
                                                            }));
                                                        }}
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            gap: "24px",
                                                        }}
                                                    >
                                                        <FormControlLabel
                                                            value="Lacunaire"
                                                            control={<Radio />}
                                                            label="Lacunaire"
                                                            required
                                                            disabled={!isEditable}
                                                        />
                                                        <FormControlLabel
                                                            value="Non Lacunaire"
                                                            control={<Radio />}
                                                            label="Non Lacunaire"
                                                            required
                                                            disabled={!isEditable}
                                                        />
                                                    </RadioGroup>
                                                </Stack>

                                                {/* Checkbox Options for Details */}
                                                <Box sx={{ mt: 2 }}>
                                                    {[
                                                        { label: "Cérébral moyen", name: "Cérébral moyen",id:"Cérébralmoyen" },
                                                        { label: "Cérébral antérieur", name: "Cérébral antérieur",id:"Cérébralantérieur"  },
                                                        { label: "Cérébral postérieur", name: "Cérébral postérieur",id:"Cérébralpostérieur"  },
                                                        { label: "Pontique paramédian", name: "Pontique paramédian",id:"Pontiqueparamédian"  },
                                                        { label: "Latéro-bulbaire", name: "Latéro bulbaire" ,id:"Latérobulbaire" },
                                                        { label: "Latéro  pontique", name: "Latéro_pontique",id:"Latéro_pontique"  },
                                                        { label: "Cérébelleux (PICA)", name: "PICA",id:"PICA"  },
                                                        { label: "Cérébelleux (AICA)", name: "AICA",id:"AICA"  },
                                                        { label: "Cérébelleux (ACS)", name: "ACS" ,id:"ACS" },
                                                        { label: "Jonctionel", name: "Jonctionel" ,id:"Jonctionel" },
                                                    ].map((item) => (
                                                        <Box
                                                            key={item.id}
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                marginBottom: "16px",
                                                            }}
                                                        >
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        name={item.id + "G"}
                                                                        disabled={!isEditable}
                                                                        checked={checkZone[item.id + "G"]}
                                                                        onChange={(event) =>
                                                                            handleChangecheck(event, IRMData, setIRMData, setCheckZone, "Details")
                                                                        }
                                                                    />
                                                                }
                                                                label="G"
                                                            />
                                                            <Typography
                                                                sx={{
                                                                    marginRight: "80px",
                                                                    marginLeft: "8px",
                                                                    flexShrink: 0,
                                                                    width: "200px",
                                                                    textAlign: "center",
                                                                }}
                                                            >
                                                                {item.label}
                                                            </Typography>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        name={item.id + "D"}
                                                                        disabled={!isEditable}
                                                                        checked={checkZone[item.id + "D"]}
                                                                        onChange={(event) =>
                                                                            handleChangecheck(event, IRMData, setIRMData, setCheckZone, "Details")
                                                                        }
                                                                    />
                                                                }
                                                                label="D"
                                                            />
                                                        </Box>
                                                    ))}
                                                </Box>

                                            </>
                                        )}
                                    </>
                                )}




                            </>
                        }
                    </Box>



                    {IRMData.status === "Oui" &&
                        <>
                            {/* ASPECTS */}
                            { IRMData.Diffusion1 ==="Anormale" &&
                                <AspectsSection id={id} handleChange2={handleChange2} handleChangecheck={handleChangecheck} />
                            }

                            {/* Flair */}

                            <FLAIR id={id}   handleChange2={handleChange2}  handleChangecheck={handleChangecheck}  />



                            {/* tof-willis */}

                            <TOFWillisSection  id={id}  isEditable={isEditable} handleChange2={handleChange2} handleChangecheck={handleChangecheck}/>


                            {/* T2SWAN Section */}

                            <T2SwanSection id={id}   isEditable={isEditable}     handleChange2={handleChange2}  handleChangecheck={handleChangecheck}  />



                            {/* Fat-SAT Section */}

                            <FatSatSection  id={id} isEditable={isEditable} handleChange2={handleChange2} handleChangecheck={handleChangecheck} />


                            {/* TSA */}

                            <TSASection  id={id}  handleChange2={handleChange2}/>



                            {/* Séquence de perfusion ou ASL */}

                            <PerfusionOrASLSection  id={id}    handleChange2={handleChange2} handleChangecheck={handleChangecheck} />
                        </>
                    }
                    <SubmitButtons isDataAvailable={isDataAvailable} setIsEditable={setIsEditable} isEditable={isEditable}/>
                    {successMessage && (
                        <Notifications Message={successMessage} setMessage={setSuccessMessage}/>
                    )}
                </Box>

            </form>
        </>
    );
};


export default IRM;