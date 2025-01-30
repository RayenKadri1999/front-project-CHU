import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import { createTheme, ThemeProvider } from "@mui/material/styles";




// import Sidenav from "../../components/shared/Sidenav ";



import { useNavigate, useParams } from "react-router-dom";

import { Checkbox, FormControlLabel, FormGroup, FormLabel, Grid, Radio, RadioGroup, Alert, TextField, Typography } from "@mui/material";
import SubmitButtons from "../../components/shared/SubmitButtons";
import Notifications from "../../components/shared/Notifications";
import apiServices from "../../services/api-services";

export default function ExamensComplementaires_Hematome({ commonState }) {

    const { idDossier,id} = useParams();
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

    const [examensComplementairesData, setExamensComplementairesData] = useState({


        ETT: false,
        DescETT:'',

        ETO : false,
        DescETO:'',


        Arteriographie : false,
        DescArteriographie:'',

        AutreExamens : false,
        DescAutreExamens : '',


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
    const handleChangeText = (e) => {
        const { name, value } = e.target;


        console.log(name,value)
        setExamensComplementairesData((prevData) => ({
                ...prevData,
                [name]: value,
            })
        );


    };




    const handleChangecheck = (e) => {
        const { name, checked } = e.target;
        console.log(name,checked)
        setExamensComplementairesData((prevData) => ({
                ...prevData,
                [name]: checked,
            })
        );
        if (!checked) {

            setExamensComplementairesData((prevData) => ({
                    ...prevData,
                    [`Desc${name}`]: '',
                })
            );
        }


    };


    const handleSubmit = (e) => {
        apiServices.handleSubmit(e,examensComplementairesData,"examenscomplementaires",setSuccessMessage,isDataAvailable,setIsDataAvailable,setIsEditable,setError,id);
    }





    useEffect(() => {
        console.log(idDossier,id)
        apiServices.loadDossierDetails(setExamensComplementairesData,"examenscomplementaires",setIsDataAvailable,setError,id);

    }, []);

    return (
        <>


            <ThemeProvider theme={theme}>

                <Box sx={{ display: "flex" }}>

                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <form onSubmit={handleSubmit}>
                            {error && <Alert severity="info">{error}</Alert>}



                            <div >


                                <Typography variant="h4" gutterBottom marginBottom={6}>
                                    Examens Complémentaires
                                </Typography>

                                <FormGroup>
                                    <Grid container spacing={2}>


                                        <Grid item xs={6}>
                                            <FormControlLabel
                                                control=
                                                    {<Checkbox
                                                        name="ETT"
                                                        disabled={!isEditable}
                                                        checked={examensComplementairesData.ETT}
                                                        onChange={handleChangecheck}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />}
                                                label="ETT" />

                                            <TextField
                                                name="DescETT"
                                                disabled={!isEditable || !examensComplementairesData.ETT}
                                                value={examensComplementairesData.DescETT}
                                                onChange={handleChangeText}
                                                multiline
                                                rows={6}
                                                variant="outlined"
                                                fullWidth
                                            />

                                        </Grid>

                                        <Grid item xs={6}>

                                            <FormControlLabel

                                                control=
                                                    {<Checkbox
                                                        name="ETO"
                                                        disabled={!isEditable}
                                                        checked={examensComplementairesData.ETO}
                                                        onChange={handleChangecheck}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />}
                                                label="ETO" />

                                            <TextField
                                                name="DescETO"
                                                disabled={!isEditable || !examensComplementairesData.ETO}
                                                value={examensComplementairesData.DescETO}
                                                onChange={handleChangeText}
                                                multiline
                                                rows={6}
                                                variant="outlined"
                                                fullWidth
                                            />

                                        </Grid>


                                        <Grid item xs={6}>


                                            <FormControlLabel
                                                control=
                                                    {<Checkbox
                                                        name="Arteriographie"
                                                        disabled={!isEditable}
                                                        checked={examensComplementairesData.Artériographie}
                                                        onChange={handleChangecheck}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                    }
                                                label="Artériographie" />

                                            <TextField
                                                disabled={!isEditable || !examensComplementairesData.Arteriographie }
                                                name="DescAngiographie"
                                                value={examensComplementairesData.DescArteriographie}
                                                onChange={handleChangeText}
                                                multiline
                                                rows={6}
                                                variant="outlined"
                                                fullWidth
                                            />


                                        </Grid>




                                        <Grid item xs={6}>


                                            <FormControlLabel
                                                control=
                                                    {<Checkbox
                                                        name="AutreExamens"
                                                        disabled={!isEditable}
                                                        checked={examensComplementairesData.AutreExamens}
                                                        onChange={handleChangecheck}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                    }
                                                label="Autre examens" />

                                            <TextField
                                                disabled={!isEditable || !examensComplementairesData.AutreExamens }
                                                name="DescAutreExamens"
                                                value={examensComplementairesData.DescAutreExamens}
                                                onChange={handleChangeText}
                                                multiline
                                                rows={6}
                                                variant="outlined"
                                                fullWidth
                                            />


                                        </Grid>







                                    </Grid>
                                </FormGroup>
                                <Box height={10} />


                                {/* </Box> */}




                                <SubmitButtons isDataAvailable={isDataAvailable} setIsEditable={setIsEditable} isEditable={isEditable}/>

                                {successMessage && (
                                    <Notifications Message={successMessage} setMessage={setSuccessMessage}/>
                                )}

                            </div>


                        </form>
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    );
}
