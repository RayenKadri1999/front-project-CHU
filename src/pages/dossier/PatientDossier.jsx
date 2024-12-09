import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Navbar from "../../components/shared/Navbar";
import Sidenav from "../../components/shared/Sidenav";
import { Stack, createTheme, ThemeProvider, CssBaseline, Alert } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import HospitalisationDetails from "./HospitalisationDetails";
import Hospitaliere from "./Hospitaliere";
import Prehospitaliere from "./Prehospitaliere";
import Imagerie from "./Imagerie";
import MedicalIcon from '@mui/icons-material/MedicalServices';
import HealingIcon from '@mui/icons-material/Healing';
import ImageIcon from '@mui/icons-material/Image';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BiotechIcon from '@mui/icons-material/Biotech';
import ScienceIcon from '@mui/icons-material/Science';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ReportIcon from '@mui/icons-material/Report';
import Nihss from "./Nihss/Nihss";

import { Box, List, ListItem, ListItemText, Avatar,Typography, Button } from '@mui/material';
import Download from "./Download";
import PatientDetails from "./PatientDetails";
import PersonIcon from '@mui/icons-material/Person';

import axios from "axios";

import { useParams } from 'react-router-dom';
import authHeader from '../../services/auth-header';
import Biologie from "./Biologie";
import ConclusionSortie from "./ConclusionSortie";
import ExamenClinique from "./Examen";
import ExamensComplementaires from "./ExamensComplementaires";
import EvolutionClassification from "./Evolution_Classification";
import Etiologie from "./Etiologie";
import ConclusionInitiale from "./ConclusionInitiale";

import ConduiteTenirInitiale from "./ConduiteTenirInitiale";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0E8388",
    },
  },
});
const buttonStyles = {
    backgroundColor: '#f1efef', // Custom background color
    color: '#999', // Custom text color
    '&:hover': {
      backgroundColor: '#d7daef', // Custom hover background color
    },
    // boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', // Adding shadow to buttons
  };




const PatientDossier = () => {
    const { idDossier,id ,TypeAVC} = useParams();
  const [commonState, setCommonState] = useState("Common State");
  const [activeComponent, setActiveComponent] = useState('PatientDetails');
  const navigate = useNavigate();




  const [patientData, setPatientData] = useState({
   
    Nom: "",
    Prenom: "",
    
    email:"",
    telephone:""
  });

  useEffect(() => {
    loadPatientDetails();
  
  }, []);
  const [error, setError] = useState(null);
  const loadPatientDetails = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/api/patient/getDetails/${encodeURIComponent(idDossier)}`,{ headers: authHeader() });
  
      setPatientData(result.data);
    } catch (error) {
        
      setError("Une erreur s'est produite lors de l'importation des données");
    }
  };

  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        
    <Box sx={{ display :"flex"  ,justifyContent: 'left', p: 3 }}>
        {/* <CssBaseline /> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          
            mt:7,
            alignItems: 'center',
            gap: 2,
            p: 3,
            bgcolor: 'white',
            border: '1px solid',
            borderColor: 'rgba(0, 0, 0, 0.1)', // Less black border
            borderRadius: '12px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Added shadow
            position: 'sticky',
            top: '20%',
            width:'350px',
          }}
    
        >
            {error && <Alert severity="error">{error}</Alert>}
          <Avatar
            src="/images/user7.png"
            alt="setting"
            sx={{
              width: 160,
              height: 160,
              border: '1px dashed',
              borderColor: 'subMain',
            }}
          />
          <Stack alignItems="center">
            <Typography variant="h6">{`${patientData.Prenom} ${patientData.Nom}`}</Typography>
            <Typography variant="body2" color="text.secondary">{patientData.email}</Typography>
            <Typography variant="body2">{patientData.telephone}</Typography>
          </Stack>
          <Stack gap={2} width="100%" px={{ xs: 2, xl: 4 }}>

          <Button
              fullWidth
              onClick={() => setActiveComponent('HospitalisationDetails')}
            //   variant="contained"
            //   color="primary"
              startIcon={<MedicalIcon />}
              sx={buttonStyles}
            >
              Hospitalisation
            </Button>

          <Button
              fullWidth
              onClick={() => setActiveComponent('PatientDetails')}
            //   variant="contained"
            //   color="primary"
              startIcon={<PersonIcon />}
              sx={buttonStyles}
            >
              Patient Details
            </Button>
            
            <Button
              onClick={() => setActiveComponent('Prehospitaliere')}
              fullWidth
              
              startIcon={<LocalHospitalIcon />}
             sx={buttonStyles}
            >
              Prehospitaliere
            </Button>

            <Button
              fullWidth
              onClick={() => setActiveComponent('Hospitaliere')}
              startIcon={<HealingIcon />}
             sx={buttonStyles}
            >
              
              Hospitaliere
            </Button>

            <Button
              fullWidth
              onClick={() => setActiveComponent('ExamenClinique')}
              startIcon={<ScienceIcon />}
             sx={buttonStyles}
            >
              Examen
            </Button>
           
            <Button
              fullWidth
              onClick={() => setActiveComponent('Nihss')}
              startIcon={<ImageIcon />}
             sx={buttonStyles}
            >
              Nihss
            </Button>
            <Button
              fullWidth
              onClick={() => setActiveComponent('Imagerie')}
              startIcon={<ImageIcon />}
             sx={buttonStyles}
            >
              Imagerie
            </Button>
            <Button
              fullWidth

              onClick={() => setActiveComponent('ConclusionInitiale')}
              startIcon={<AssessmentIcon />}
             sx={buttonStyles}
            >
                Bilan Initiale
            </Button>

            <Button
              fullWidth
              onClick={() => setActiveComponent('Conduiteàtenirinitiale')}
              startIcon={<AssessmentIcon />}
             sx={buttonStyles}
            >
              Conduite  à tenir initiale
            </Button>
           
            
            <Button
              fullWidth
              onClick={() => setActiveComponent('Biologie')}
              startIcon={<BiotechIcon />}
             sx={buttonStyles}
            >
              Biologie
            </Button>
            <Button
              fullWidth
              onClick={() => setActiveComponent('ExamensComplementaires')}
              startIcon={<ScienceIcon />}
             sx={buttonStyles}
            >
              Examens Complementaires
            </Button>
            <Button
              fullWidth
              onClick={() => setActiveComponent('EvolutionClassification')}
              startIcon={<BiotechIcon />}
             sx={buttonStyles}
            >
              Evolution
            </Button>
            <Button
              fullWidth
              onClick={() => setActiveComponent('Etiologie')}
              startIcon={<BiotechIcon />}
             sx={buttonStyles}
            >
              Etiologie
            </Button>
            <Button
              fullWidth
              onClick={() => setActiveComponent('Conclusion Sortie')}
              startIcon={<BiotechIcon />}
             sx={buttonStyles}
            >
              Conclusion Sortie
            </Button>
            <Button
              fullWidth
              onClick={() => setActiveComponent('Download')}
              startIcon={<ReportIcon />}
             sx={buttonStyles}
            >
              Rapport
            </Button>
          </Stack>
          
       
        </Box>
  </Box>
  <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width:'100%',
            mt:10,
            mr:5,
            mb:3,
           
            gap: 2,
            p: 3,
            bgcolor: 'white',
            border: '1px solid',
            borderColor: 'rgba(0, 0, 0, 0.1)', // Less black border
            borderRadius: '12px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Added shadow
            position: 'sticky',
          
          }}
    
        >
        {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}> */}

        {activeComponent === 'PatientDetails' && <PatientDetails commonState={commonState} />}
        {activeComponent === 'HospitalisationDetails' && <HospitalisationDetails commonState={commonState} />}
        
        {activeComponent === 'Prehospitaliere' && <Prehospitaliere commonState={commonState} />}
        {activeComponent === 'Hospitaliere' && <Hospitaliere commonState={commonState} />}
        {activeComponent === 'Imagerie' && <Imagerie commonState={commonState} />}
        {activeComponent === 'Download' && <Download commonState={commonState} />}
        {activeComponent === 'Biologie' && <Biologie commonState={commonState} />}
        {activeComponent === 'Conclusion Sortie' && <ConclusionSortie commonState={commonState} />}
        {activeComponent === 'Nihss' && <Nihss commonState={commonState} />}
        {activeComponent === 'ExamenClinique' && <ExamenClinique commonState={commonState} />}
        {activeComponent === 'ExamensComplementaires' && <ExamensComplementaires commonState={commonState} />}
        {activeComponent === 'EvolutionClassification' && <EvolutionClassification commonState={commonState} />}
        {activeComponent === 'Etiologie' && <Etiologie commonState={commonState} />}
        {activeComponent === 'ConclusionInitiale' && <ConclusionInitiale commonState={commonState} />}
        {activeComponent === 'Conduiteàtenirinitiale' && <ConduiteTenirInitiale commonState={commonState} />}
     
              {/* Content of Prehospitaliere */}
              {/* <Folder commonState={commonState} /> */}


              {/* Content of Prehospitaliere */}
              {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Prehospitaliere commonState={commonState} />
              </Box> */}

              {/* Content of Hospitaliere */}
              {/* <Hospitaliere commonState={commonState} />
              <Imagerie commonState={commonState} />
              <Nihss commonState={commonState} />
              <Decision commonState={commonState} /> */}
      

            {/* Submit button */}
            {/* <ThemeProvider theme={theme}>
              <Stack direction="row" spacing={2}>
                <div style={{ marginLeft: "auto" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                    className="button"
                  >
                    Enregistrer
                  </Button>{" "}
                </div>
              </Stack>
            </ThemeProvider> */}
          
        </Box>
      </Box>
    </>

  );
};

export default PatientDossier;
