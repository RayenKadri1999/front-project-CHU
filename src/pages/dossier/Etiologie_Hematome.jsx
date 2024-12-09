import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import Notifications from "../../components/shared/Notifications";
import SubmitButtons from "../../components/shared/SubmitButtons";
import apiServices from "../../services/api-services";


// import Sidenav from "../../components/shared/Sidenav ";



import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { SendIcon } from "lucide-react";
import authHeader from "../../services/auth-header";
import { Checkbox, FormControlLabel, FormGroup, FormLabel, Grid, Radio, RadioGroup, TextareaAutosize, Typography ,Alert, Stack} from "@mui/material";
import PdfButton from "../../components/shared/PdfButton";

export default function Etiologie_Hematome({ commonState }) {

    const { idDossier,id} = useParams();
    const theme = createTheme({
        palette: {
            primary: {
                main: "#0E8388",
            },
        },
    });

    const [isEditable, setIsEditable] = useState(false);
    const [isASCODEditable, setIsASCODEditable] = useState(false);
    const [isDataAvailable, setIsDataAvailable] = useState(true);
    const [isDataASCODAvailable, setIsDataASCODAvailable] = useState(true);
    const [error, setError] = useState(null);
    const [error2, setError2] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const [TOASTData, setTOASTData] = useState({



        athérothrombotique:"non",
        athérothrombotiqueContent:[],
        info:"",
        cardioembolique:"non",
        cardioemboliqueContent:[],
        fibrillation_valvulaire:"",
        fibrillation_type:"",
        fibrillation_anticoagulée:"",

        lacune:"non",
        TumeureCerebrale:"",
            TransformationHemorragiqueAVCIschemique:"",
     ThromboseVeineuseCerebrale:"",
    Autres:"",
        Indetermine:"Non",
        IndetermineContent:"",
        matricule: id,


    });

    const TOASTDataInit={


        athérothrombotique:"non",
        athérothrombotiqueContent:[],
        info:"",
        cardioembolique:"non",
        cardioemboliqueContent:[],

        fibrillation_valvulaire:"",
        fibrillation_type:"",
        fibrillation_anticoagulée:"",

        lacune:"non",

        Indeterminé:"non",
        IndeterminéContent:"",
        matricule: id,


    }

    const [ASCODData, setASCODData] = useState({



        A:"",
        S:"",
        C:"",
        O:"",
        D:"",

        info:"",
        matricule: id,


    });







    const handleChange = (e,updateFunction) => {
        const { name, value } = e.target;

        updateFunction((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };




    const handleChangecheck = (e, Data, setData, key) => {
        const { name,checked } = e.target;


        if (checked) {

            const updatedArray = [...Data[key], name];

            setData((prevData) => ({
                ...prevData,
                [key]: updatedArray,
            }));
        } else {


            const updatedArray = Data[key].filter(item => item !== name);

            setData((prevData) => ({
                ...prevData,
                [key]: updatedArray,
            }));
            if(name=="Fibrillation auriculaire"){
                setTOASTData((prevData) => ({
                    ...prevData,
                    fibrillation_valvulaire:"",
                    fibrillation_type:"",
                    fibrillation_anticoagulée:"",
                }));
            }
        }
    };

    const handleChangecheckLacune = (e,setData) => {
        const { name, checked } = e.target;




        // Update the key in imagerieData with the new name added


        setData((prevData) => ({
            ...prevData,
            [name]: checked ? "oui" :"non",
        }));

    };


    const handleChangecheck2 = (e,setData) => {
        const { name, checked } = e.target;


        // Update the key in imagerieData with the new name added


        setData((prevData) => ({
            ...prevData,
            [name]: checked ? "oui" :"non",
        }));
        if(!checked){

            setData((prevData) => ({
                ...prevData,
                [`${name}Content`]: TOASTDataInit[`${name}Content`],
            }));

        }

    };




    const handleSubmitToast = (e) => {
        apiServices.handleSubmit(e,TOASTData,"etiologie/toast",setSuccessMessage,isDataAvailable,setIsDataAvailable,setIsEditable,setError,id);
    }

    useEffect(() => {
        // const fetchData = async () => {
        apiServices.loadDossierDetails(setTOASTData,"etiologie/toast",setIsDataAvailable,setError,id);


        apiServices.loadDossierDetails(setASCODData,"etiologie/ascod",setIsDataASCODAvailable,setError2,id);
    }, []);


    const handleSubmitAscod = (e) => {
        apiServices.handleSubmit(e,ASCODData,"etiologie/ascod",setSuccessMessage,isDataASCODAvailable,setIsDataASCODAvailable,setIsASCODEditable,setError2,id);
    }




    return (
        <>

            <ThemeProvider theme={theme}>

                {error && <Alert severity="info">{error}</Alert>}
                {/* <Patientbar id={id}/> */}


                {/* ----------------TOAST---------------------------- */}
                <form onSubmit={handleSubmitToast}>
                    <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>


                        <Box
                            sx={{ display: "flex", flexDirection: "row", alignItems: "center"  }}>

                            <Typography variant="h4" >
                                TOAST
                            </Typography>
                            <PdfButton pdfUrl="../pdf/TOAST.pdf"  />
                        </Box>
                        <Stack direction="row" spacing={1} alignItems="center" mt={3}>
                            {/* Si athérothrombotique  */}
                            <FormControlLabel
                                control={
                                    <Checkbox   name="athérothrombotique"
                                                disabled={!isEditable}

                                                checked={TOASTData.athérothrombotique==="oui"}
                                                onChange={(event) => handleChangecheck2(event,setTOASTData)}
                                                inputProps={{ 'aria-label': 'controlled' }} />}
                            />


                            <Typography variant="h6" marginTop={5}>Athérothrombotique</Typography>
                        </Stack>

                        {TOASTData.athérothrombotique==="oui" &&
                            <FormGroup sx={{marginLeft:5}}>
                                <FormControlLabel
                                    control={
                                        <Checkbox   name="Intracranien"
                                                    disabled={!isEditable}
                                                    id="intracranien"
                                                    checked={TOASTData.athérothrombotiqueContent.includes("Intracranien")}
                                                    onChange={(event) => handleChangecheck(event, TOASTData,setTOASTData,"athérothrombotiqueContent")}
                                                    inputProps={{ 'aria-label': 'controlled' }} />}
                                    label="Intracranien" />

                                <FormControlLabel
                                    control={
                                        <Checkbox   name="Extracranien TSA"
                                                    disabled={!isEditable}
                                                    id="extracranienTSA"
                                                    checked={TOASTData.athérothrombotiqueContent.includes("Extracranien TSA")}
                                                    onChange={(event) => handleChangecheck(event, TOASTData,setTOASTData,"athérothrombotiqueContent")}
                                                    inputProps={{ 'aria-label': 'controlled' }} />}
                                    label="Extracranien TSA" />

                                <FormControlLabel
                                    control={
                                        <Checkbox   name="Crosse aortique"
                                                    disabled={!isEditable}
                                                    id="Crosseaortique"
                                                    checked={TOASTData.athérothrombotiqueContent.includes("Crosse aortique")}
                                                    onChange={(event) => handleChangecheck(event, TOASTData,setTOASTData,"athérothrombotiqueContent")}
                                                    inputProps={{ 'aria-label': 'controlled' }} />}
                                    label="Crosse aortique" />

                                <FormControlLabel
                                    control={
                                        <Checkbox   name="Plaque non stésnosante active"
                                                    id="plaquenonStésnosante"
                                                    disabled={!isEditable}
                                                    checked={TOASTData.athérothrombotiqueContent.includes("Plaque non stésnosante active")}
                                                    onChange={(event) => handleChangecheck(event, TOASTData,setTOASTData,"athérothrombotiqueContent")}
                                                    inputProps={{ 'aria-label': 'controlled' }} />}
                                    label="Plaque non stésnosante active" />


                            </FormGroup>
                        }
                        <Stack direction="row" spacing={1} alignItems="center" mt={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox   name="cardioembolique"
                                                disabled={!isEditable}

                                                checked={TOASTData.cardioembolique==="oui"}
                                                onChange={(event) => handleChangecheck2(event,setTOASTData)}
                                                inputProps={{ 'aria-label': 'controlled' }} />}
                            />
                            <Typography variant="h6" marginTop={5}>Cardioembolique</Typography>
                        </Stack>

                        {TOASTData.cardioembolique==="oui" &&
                            <FormGroup sx={{marginLeft:5}}>
                                <FormControlLabel
                                    control={
                                        <Checkbox   name="Fibrillation auriculaire"
                                                    disabled={!isEditable}


                                                    checked={TOASTData.cardioemboliqueContent.includes("Fibrillation auriculaire")}
                                                    onChange={(event) => handleChangecheck(event, TOASTData,setTOASTData,"cardioemboliqueContent")}
                                                    inputProps={{ 'aria-label': 'controlled' }} />}
                                    label="Fibrillation auriculaire" />

                                {/* Normal / Anormal Radio Group */}
                                {TOASTData.cardioemboliqueContent.includes("Fibrillation auriculaire") &&
                                    <>
                                        <RadioGroup
                                            row

                                            name="fibrillation_valvulaire"

                                            value={TOASTData.fibrillation_valvulaire}

                                            onChange={(event) => handleChange(event, setTOASTData)}
                                            sx={{ marginLeft:5, }}
                                        >
                                            <FormControlLabel value="Valvulaire" control={<Radio />} label="Valvulaire" required disabled ={!isEditable } />
                                            <FormControlLabel value="Non valvulaire" control={<Radio />} label="Non valvulaire" required disabled ={!isEditable }  />
                                        </RadioGroup>


                                        <RadioGroup
                                            row

                                            name="fibrillation_type"

                                            value={TOASTData.fibrillation_type}

                                            onChange={(event) => handleChange(event, setTOASTData)}
                                            sx={{ marginLeft:5, }}
                                        >
                                            <FormControlLabel value="Paroxystique" control={<Radio />} label="Paroxystique" required disabled ={!isEditable } />
                                            <FormControlLabel value="Permanente" control={<Radio />} label="Permanente" required disabled  ={!isEditable }  />
                                        </RadioGroup>


                                        <RadioGroup
                                            row

                                            name="fibrillation_anticoagulée"

                                            value={TOASTData.fibrillation_anticoagulée}

                                            onChange={(event) => handleChange(event, setTOASTData)}
                                            sx={{ marginLeft:5, }}
                                        >
                                            <FormControlLabel value="Anticoagulée" control={<Radio />} label="Anticoagulée" required disabled ={!isEditable } />
                                            <FormControlLabel value="Non anticoagulée" control={<Radio />} label="Non anticoagulée" required disabled ={!isEditable  }  />
                                        </RadioGroup>
                                    </>
                                }
                                <FormControlLabel
                                    control={
                                        <Checkbox   name="Valve Mecanique"
                                                    disabled={!isEditable}

                                                    checked={TOASTData.cardioemboliqueContent.includes("Valve Mecanique")}
                                                    onChange={(event) => handleChangecheck(event, TOASTData,setTOASTData,"cardioemboliqueContent")}
                                                    inputProps={{ 'aria-label': 'controlled' }} />}
                                    label="Valve Mecanique" />

                                <FormControlLabel
                                    control={
                                        <Checkbox   name="FEVG < 30%"
                                                    disabled={!isEditable}

                                                    checked={TOASTData.cardioemboliqueContent.includes("FEVG < 30%")}
                                                    onChange={(event) => handleChangecheck(event, TOASTData,setTOASTData,"cardioemboliqueContent")}
                                                    inputProps={{ 'aria-label': 'controlled' }} />}
                                    label="FEVG < 30%" />

                                <FormControlLabel
                                    control={
                                        <Checkbox   name="IDM aigu"

                                                    disabled={!isEditable}
                                                    checked={TOASTData.cardioemboliqueContent.includes("IDM aigu")}
                                                    onChange={(event) => handleChangecheck(event, TOASTData,setTOASTData,"cardioemboliqueContent")}
                                                    inputProps={{ 'aria-label': 'controlled' }} />}
                                    label="IDM aigu" />

                                <FormControlLabel
                                    control={
                                        <Checkbox   name="Akinesie Focale/anévrisme VG"

                                                    disabled={!isEditable}
                                                    checked={TOASTData.cardioemboliqueContent.includes("Akinesie Focale/anévrisme VG")}
                                                    onChange={(event) => handleChangecheck(event, TOASTData,setTOASTData,"cardioemboliqueContent")}
                                                    inputProps={{ 'aria-label': 'controlled' }} />}
                                    label="Akinesie Focale/anévrisme VG" />


                                <FormControlLabel
                                    control={
                                        <Checkbox   name="Endocarthide infectueuse"

                                                    disabled={!isEditable}
                                                    checked={TOASTData.cardioemboliqueContent.includes("Endocarthide infectueuse")}
                                                    onChange={(event) => handleChangecheck(event, TOASTData,setTOASTData,"cardioemboliqueContent")}
                                                    inputProps={{ 'aria-label': 'controlled' }} />}
                                    label="Endocarthide infectueuse" />

                                <FormControlLabel
                                    control={
                                        <Checkbox   name="Endocarthide non infectueuse"

                                                    disabled={!isEditable}
                                                    checked={TOASTData.cardioemboliqueContent.includes("Endocarthide non infectueuse")}
                                                    onChange={(event) => handleChangecheck(event, TOASTData,setTOASTData,"cardioemboliqueContent")}
                                                    inputProps={{ 'aria-label': 'controlled' }} />}
                                    label="Endocarthide non infectueuse" />

                                <FormControlLabel
                                    control={
                                        <Checkbox   name="Tumeur intracardiaque"

                                                    disabled={!isEditable}
                                                    checked={TOASTData.cardioemboliqueContent.includes("Tumeur intracardiaque")}
                                                    onChange={(event) => handleChangecheck(event, TOASTData,setTOASTData,"cardioemboliqueContent")}
                                                    inputProps={{ 'aria-label': 'controlled' }} />}
                                    label="Tumeur intracardiaque" />



                                <FormControlLabel
                                    control={
                                        <Checkbox   name="FOP Large/FOP-ASIA"

                                                    disabled={!isEditable}
                                                    checked={TOASTData.cardioemboliqueContent.includes("FOP Large/FOP-ASIA")}
                                                    onChange={(event) => handleChangecheck(event, TOASTData,setTOASTData,"cardioemboliqueContent")}
                                                    inputProps={{ 'aria-label': 'controlled' }} />}
                                    label="FOP Large/FOP-ASIA" />


                                <FormControlLabel
                                    control={
                                        <Checkbox   name="Autre"

                                                    disabled={!isEditable}
                                                    checked={TOASTData.cardioemboliqueContent.includes("Autre")}
                                                    onChange={(event) => handleChangecheck(event, TOASTData,setTOASTData,"cardioemboliqueContent")}
                                                    inputProps={{ 'aria-label': 'controlled' }} />}
                                    label="Autre" />

                            </FormGroup>
                        }
                        {" "}

                        <Box height={10} />

                        <Stack direction="row" spacing={1} alignItems="center" mt={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox   name="lacune"
                                                disabled={!isEditable}

                                                checked={TOASTData.lacune==="oui"}
                                                onChange={(event) => handleChangecheckLacune(event,setTOASTData)}
                                                inputProps={{ 'aria-label': 'controlled' }} />}
                            />
                            <Typography variant="h6">Lacune</Typography>
                        </Stack>
                        <Box height={10} />

                        <Stack direction="row" spacing={1} alignItems="center" mt={3}>


                            <FormControlLabel
                                control={
                                    <Checkbox   name="Indeterminé"
                                                disabled={!isEditable}

                                                checked={TOASTData.Indeterminé==="oui"}
                                                onChange={(event) => handleChangecheck2(event,setTOASTData)}
                                                inputProps={{ 'aria-label': 'controlled' }} />}
                            />
                            <Typography variant="h6">Indéterminée</Typography>
                        </Stack>
                        {TOASTData.Indeterminé ==="oui" &&
                            <RadioGroup
                                column
                                id="IndeterminéContent"
                                name="IndeterminéContent"

                                value={TOASTData.IndeterminéContent}

                                onChange={(event) => handleChange(event, setTOASTData)}
                                sx={{ marginLeft:5, }}
                            >
                                <FormControlLabel value="ESUS" control={<Radio />} label="ESUS:Bilan étiologique négatif" required disabled ={!isEditable } />
                                <FormControlLabel value="2 étiologies identifiés" control={<Radio />} label="2 étiologies identifiés" required disabled ={!isEditable }  />
                                <FormControlLabel value="Bilan non exhaustif" control={<Radio />} label="Bilan non exhaustif" required disabled ={!isEditable}  />

                            </RadioGroup>
                        }
                        <Box height={10} />


                        <Box sx={{ mt: 2 }}>
                            <TextField
                                name="info"
                                label="informations complémentaires"
                                disabled={!isEditable}
                                value={TOASTData.info}
                                onChange={(event) => handleChange(event, setTOASTData)}
                                multiline
                                rows={6}
                                variant="outlined"
                                fullWidth
                            />
                        </Box>

                        <Box height={10} />


                        {/* </Box> */}





                        <SubmitButtons isDataAvailable={isDataAvailable} setIsEditable={setIsEditable} isEditable={isEditable}/>

                        {successMessage && (
                            <Notifications Message={successMessage} setMessage={setSuccessMessage}/>
                        )}


                    </Box>
                </form>


                {/* ----------------ASCOD---------------------------- */}




                <form onSubmit={handleSubmitAscod}>
                    <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
                        {error2 && <Alert severity="error">{error2}</Alert>}
                        <Box
                            sx={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 5 }}>

                            <Typography variant="h4"  >
                                ASCOD
                            </Typography>
                            <PdfButton pdfUrl="../pdf/ASCOD.pdf"  />
                        </Box>





                        {/* Repeat similar structure for other labels and fields */}
                        {[
                            { label: 'A (Atheroclerosis)', name1: 'A'},
                            { label: 'S (Small-vessel disease)', name1: 'S'},
                            { label: 'C (Cardiac pathology) ', name1: 'C' },
                            { label: 'O (Other cause)', name1: 'O' },
                            { label: 'D (Dissection)', name1: 'D'},

                            // Add other fields similarly
                        ].map((group, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={12} md={4}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                                        <span>{group.label}</span>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={8} container spacing={2}>
                                    <Grid item xs={6} >

                                        <Select
                                            labelId="demosimpleselectlabel"
                                            id="demosimpleselect"
                                            value={ASCODData[group.name1]}
                                            onChange={(event) => handleChange(event, setASCODData)}
                                            name={group.name1}
                                            label={`${group.label} 1`}
                                            //  InputProps={{ readOnly: !isASCODEditable }}
                                            disabled={!isASCODEditable}
                                            fullWidth

                                        >

                                            <MenuItem value={1}>1 </MenuItem>
                                            <MenuItem value={2}>2  </MenuItem>
                                            <MenuItem value={3}>3 </MenuItem>

                                        </Select>
                                    </Grid>

                                </Grid>
                            </React.Fragment>
                        ))}


                        <Box sx={{ mt: 2 }}>
                            <TextField
                                name="info"
                                label="informations complémentaires"
                                disabled={!isASCODEditable}
                                value={ASCODData.info}
                                onChange={(event) => handleChange(event, setASCODData)}
                                multiline
                                rows={6}
                                variant="outlined"
                                fullWidth
                            />
                        </Box>

                        <Box height={10} />


                        {/* </Box> */}




                        <SubmitButtons isDataAvailable={isDataASCODAvailable} setIsEditable={setIsASCODEditable} isEditable={isASCODEditable}/>

                        {successMessage && (
                            <Notifications Message={successMessage} setMessage={setSuccessMessage}/>
                        )}



                    </Box>
                </form>



            </ThemeProvider>

        </>
    );
}
