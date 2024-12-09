import { Button, Stack } from "@mui/material";

import Box from "@mui/material/Box";




import {  useNavigate, useParams } from "react-router-dom";
import PDF from "../../services/dossier-pdf";
import { useEffect, useState } from "react";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import GetAppIcon from '@mui/icons-material/GetApp';
import { createTheme, ThemeProvider } from "@mui/material/styles";


export default function Download() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0E8388",
      },
    },
  });
     const { idDossier,id} = useParams();

    const [prehospitaliereData, setPrehospitaliereData] = useState({
        matricule: "",
        quiAppelNeurologue: '',
        dateDebutSymptome: new Date(),
        dateAppelNeurologue: new Date(),
        motifAppel: '',
      });
      const [hospitalisationData, setHospitalisationData] = useState({
        entreeFaitPar: "",
        sortieFaitPar: "",
        _id:"",
    dateEntree: "",
    dateSortie: "",
    TypeAVC:"",
    status:"",
dossier:"",
          validePar:"",
      });
      const [hospitaliereData, setHospitaliereData] = useState({

    
        Allergies :   ' ',
        
         HTA :' ',
         Hypercholestérolémie : ' ',
         Diabète : ' ',
         Fibrillation_auriculaire :' ',
         Ancienneté_fibrillation :' ', 
         SAS :  ' ',       
         SAS_appareillé :' ',
         AIT :' ',
         AVC:' ',
        
         Cardiopathie_ischémique :  ' ',
         Artériopathie : ' ',
         Autres_antécédents:' ',
    
          Vit : ' ',
          Latéralité :' ', 
          Profession : ' ',
          Autonomie :' ',
          Tabagisme : ' ',
          Chicha :' ',
          Neffa : ' ',
          Consommation_alcool :' ', 
          Rankin_préAVC : ' ',
          GIR : ' ',
          Poids :' '  ,
          Taille : ' ', 
          IMC :' ',
          matricule: "",
         
      });
      const [imagerieData, setImagerieData] = useState({

        Synthèse:"",

        Synthèseflair:"",
        SynthèsetofWillis:"",
        Synthèset2Swan:"",
        SynthèseASL:"",
        SynthèseDWI:"",
        
        matricule: "",
      });
      const [patientData, setPatientData] = useState({
        Nom: "",
        Prenom: "",
        sexe: "",
        email:"",
        telephone:"",
        dateNaissance: "",
        Adresse: "",
        aidantPrincipal: "",
        numeroAidantPrincipal: "",
        _id:"",
      });
      const [biologieData, setBiologieData] = useState({

    
        Sodium :   ' ',
        
        Potassium :' ',
        Urée : ' ',
         
         Créatinine :' ',
         CRP :' ', 
    
         CPK :  ' ',       
         Myoglobine :' ',
         Troponine :' ',
         NT_pro_BNP :' ',
        
         HbA1c :  ' ',
         Hémoglobine : ' ',
         Leucocytes:' ',
    
         Plaquettes : ' ',
         D_dimères  :' ', 
         Monomères_de_fbrine  : ' ',
         Fibrinogène :' ',
         TP : ' ',
         Ratio_TCA :'',
    
          ASAT_GOT :' ',
          ALAT_GPT : ' ',
          GGT : ' ', 
          PAL : ' ',
          Bilirubine_totale : ' ',
          Bilirubine_libre :' '  ,
          matricule: "",
          
         
      });
      const [conclusionSortieData, setConclusionSortieData] = useState({

        NihssSortie:'',
        // mRS sortie
        mRsSortie: '',
      
        // LAST sortie
        LastSortie: '',
      
        // Mode sortie
        ModeSortie: '',
      
        // Traitement de sortie
        TraitementSortie:'',
      
        // Recommandations de sortie
        RecommandationsSortie:'',
    
        Conclusion :'',
          matricule: "",
          
         
      });

      const [ConclusionInitialeData, setConclusionInitialeData] = useState({
    
        ECG: "",
        TP: "",
        Ratio_TCA: "",
        
       
        Plaquettes: "",
        Hémoglobine: "",
        Dosage: "",
        matricule: "",
    
        Conclusion:"",
      });

      const [ConclusionTenirInitialeData, setConclusionTenirInitialeData] = useState({
    
        DoubleAntiAgrégationPlaquettaire: false,
        Clopidogrel:"",
        ticagrelor:"",
    
        AnticoagulationCurative: false,
    
        ThrombolyseIV: false,
        DateTIV:new Date(),
        Actilyse:"",
        Metalyse:"",
        NIHSS24h:"",
    
        matricule: "",
    
    
      });
      const [examenCliniqueData, setExamenCliniqueData] = useState({

        NIHSSInitial:'',
        // mRS sortie
        LASTInitial: '',
      
        // LAST sortie
        TA : '',
      
        // Mode sortie
        Dextro : '',
      
        // Traitement de sortie
        AuscultationCardiaque :'',
      
        // Recommandations de sortie
        AuscultationPulmonaire:'',
    
        SouffleCarotidien :'',
    
        Description :'',
          matricule: "",
          
         
      });
      const [examensComplementairesData, setExamensComplementairesData] = useState({

        TélémétrieCardiaque:false,
        DescTélémétrieCardiaque:'',
        ETT: false,
        DescETT:'',
        
        ETO : false,
        DescETO:'',
    
      
        Angiographie : false,
        DescAngiographie:'',
     
        matricule: "",
          
         
      });
      const [evolutionClassificationData, setEvolutionClassificationData] = useState({
        PlanClinique: '',
  
        PlanEtiologique:'',
        PlanThérapeutique : '',
       
        EtiologieRetenue:[],
     
        matricule: "",
          
         
      });

      const [TOASTData, setTOASTData] = useState({

  
   
        athérothrombotique:[],
        info:"",
        cardioembolique:[],
        fibrillation_valvulaire:"",
        fibrillation_type:"",
        fibrillation_anticoagulée:"",
        lacune:"",
        Autre:"",
        Indeterminé:"",
        matricule: "",
          
         
      });
    
      const [ASCODData, setASCODData] = useState({
    
      
       
        A:"",
        S:"",
        C:"",
        O:"",
        D:"",
       
       info:"",
        matricule: "",
          
         
      });


      
  const [IRMData, setIRMData] = useState({
    status:"",
 
     dateIRM: new Date(),
      dateFinIRM: new Date(),
     Diffusion1:"",
     Diffusion2:"",
 
    
    Details:[],
    matricule: id,
     });

     const [flairData, setFlairData] = useState({
      Status:"",
      SequentielleAVC:"",
      Cortex:"",
      SubstanceBlanche:"",
      NoyauGris:"",
      Score_Collatéralité:"",
      Peri_ventriculaire:"",
      sous_corticale:"",
      Score_Fazekas:"",
      Details:[],
      matricule: id,
      });

      const [t2_SwanData, setT2_SwanData] = useState({
    
        status:"",
        Profonds:"",
        Sous_corticaux:"",
        Total:"",
        Thrombusvisible:"",
        ThrombusvisibleTaille:"",
        Hémosidérosecorticale:"",
        Signes_veineux_hypoxie:"",
        Microbleeds:[],
        matricule: id,
        });

        const [tof_WillisData, setTof_WillisData] = useState({
          status:"",
           occlusion:"",
       
          M1G:"",
          M1D:"",
          Details:[],
          matricule: id,
           });
           const [AspectsData, setAspectsData] = useState({
  
            AspectsNumber:"",
            AspectsDetails:[],
            matricule: id,
            });
            const [fat_SATData, setFat_SATData] = useState({
              status: "",
            
              matricule: id,
          
              AnomalieGauche:"",
              AnomalieDroite:"",
          
          
            });

            const [TSAData, setTSAData] = useState({
              status:"",
              AnomalieGauche:"",
              AnomalieDroite:"",
              matricule: id,
              
              });
              const [SequencePerfusionData, setSequencePerfusionData] = useState({
                status:"",
                 
                Details:[],
                matricule: id,
                 });
                 
           const [scannerData, setScannerData] = useState({
            status: "",
            DateScanner: new Date(),
           
            AngioscanWillis:false,
            AngioscanTSA:false,
            injecté:"",
          
        
            ACAucune:"",
            ACSignificative:"",
            ACNonSignificative:"",
            ACOcclusion:"",
            ACAspectdysplasique:"",
        
            AVAucune:"",
            AVSignificative:"",
            AVNonSignificative:"",
            AVOcclusion:"",
           
            matricule: id,
        
          });

          const [dataReady, setDataReady] = useState(false);
          useEffect(() => {
            // Verify all data objects are loaded
            const allDataLoaded = [
              hospitalisationData,
              prehospitaliereData,
              hospitaliereData,
              imagerieData,
              examenCliniqueData,
              examensComplementairesData,
              patientData,
              evolutionClassificationData,
              biologieData,
              conclusionSortieData,
              ConclusionInitialeData,
              ConclusionTenirInitialeData,
              TOASTData,
              ASCODData,
              IRMData,
              flairData,
              tof_WillisData,
              t2_SwanData,
              TSAData,
              AspectsData,
              SequencePerfusionData,
              fat_SATData,
              scannerData,
            ].every((data) => data !== null && data !== undefined);
        
            // Set dataReady to true only when all data is available
            if (allDataLoaded) {
              setDataReady(true);
            }
          }, [
            hospitalisationData,
            prehospitaliereData,
            hospitaliereData,
            imagerieData,
            examenCliniqueData,
            examensComplementairesData,
            patientData,
            evolutionClassificationData,
            biologieData,
            conclusionSortieData,
            ConclusionInitialeData,
            ConclusionTenirInitialeData,
            TOASTData,
            ASCODData,
            IRMData,
            flairData,
            tof_WillisData,
            t2_SwanData,
            TSAData,
            AspectsData,
            SequencePerfusionData,
            fat_SATData,
            scannerData,
          ]);

      const [apercuClicked, setApercuClicked] = useState(false);

      const handleApercuClick = () => {
        setApercuClicked((prev) => !prev);
      };
   
    
    const navigate = useNavigate();

    const PagePDF =() =>{
       
      navigate("/pdf",{ state: { prehospitaliereData }});
    }

    const loadPatientDetails = async () => {
        try {
          const result = await axios.get(`http://localhost:3000/api/patient/getDetails/${idDossier}`,{ headers: authHeader() });
          if (result.status === 200) {
          console.log(result.data)
          setPatientData(result.data);
          }
        } catch (error) {
            
            console.log(error.message);
        }
      };
        
  


  const loadSectionDetails = async (api,setDatafunction) => {

    try {
   
      const result = await axios.get(`http://localhost:3000/api/${api}/getDetails/${id}`,{ headers: authHeader() });
      
      console.log(result)

      if (result.status === 200) {
        setDatafunction(result.data);
         
        console.log(result.data)
      }
     
    } catch (error) {
     

        console.log(error.message);
      }
    
  };
  

  const loadEtiologieDetails = async (api,setDatafunction) => {

    try {

      const result = await axios.get(`http://localhost:3000/api/etiologie/${api}/getDetails/${id}`,{ headers: authHeader() });

      
      if (result.data) {
        setDatafunction(result.data);
        


      
      
      }

    } catch (error) {
      

       
      console.log(error.message);
     
      
    }
  };

   const loadImagerieDetails = async (api,setDatafunction) => {

    try {

      const result = await axios.get(`http://localhost:3000/api/imagerie/${api}/getDetails/${id}`,{ headers: authHeader() });

      
      if (result.data) {
        setDatafunction(result.data);
        
        console.log(result.data)

      
      
      }

    } catch (error) {
     
      
      console.log(error.message,api);
     
      
    }
  };



  useEffect(() => {
    //  loadPreHospitaliereDetails();
    loadSectionDetails("hospitaliere",setHospitaliereData);
    loadSectionDetails("hospitalisation",setHospitalisationData);
    loadSectionDetails("prehospitaliere",setPrehospitaliereData);
    loadSectionDetails("examenclinique",setExamenCliniqueData);
    loadSectionDetails("imagerie",setImagerieData);
    loadSectionDetails("biologie",setBiologieData);
    loadSectionDetails("conclusionsortie",setConclusionSortieData);
    loadSectionDetails("conclusioninitiale",setConclusionInitialeData);
    loadSectionDetails("conclusiontenirinitiale",setConclusionTenirInitialeData);
    loadSectionDetails("examenscomplementaires",setExamensComplementairesData);
    loadSectionDetails("evolutionclassification",setEvolutionClassificationData);

    loadEtiologieDetails("toast",setTOASTData);
    loadEtiologieDetails("ascod",setASCODData);

     loadImagerieDetails("irm",setIRMData);
    loadImagerieDetails("flair",setFlairData);
    loadImagerieDetails("tofwillis",setTof_WillisData);
    loadImagerieDetails("t2swan",setT2_SwanData);
    loadImagerieDetails("aspects",setAspectsData);
    loadImagerieDetails("fatsat",setFat_SATData);
    loadImagerieDetails("tsa",setTSAData);
    loadImagerieDetails("sequenceperfusion",setSequencePerfusionData);




    loadImagerieDetails("scanner",setScannerData);
  
    loadPatientDetails();
   
 }, []);








    return (
        <>
            <ThemeProvider theme={theme}>
           <Box sx={{ width: "100%" , alignItems: 'center',  display: 'flex', flexDirection: 'column', }}>  
          
        {apercuClicked ? (
             <> 
              {dataReady ? (
              <PDFViewer style={{width:"100%", height:"100vh"}} >
           <PDF 
             hospi={hospitalisationData}
           prehos={prehospitaliereData} 
           hos={hospitaliereData} 
           img={imagerieData} 
           exa={examenCliniqueData} 
           exacom={examensComplementairesData} 
           det={patientData} 
           evo={evolutionClassificationData}
            bio={biologieData} 
            concS={conclusionSortieData} 
            concI={ConclusionInitialeData} 
            concT={ConclusionTenirInitialeData} 
           toast={TOASTData} 
           ascod={ASCODData} 
           irm={IRMData}   
           flair={flairData} 
           tofWillis={tof_WillisData} 
           t2Swan={t2_SwanData}
           tsa={TSAData}
           aspects={AspectsData}
           SequencePerfusion={SequencePerfusionData}
           fatsat={fat_SATData}

          scanner={scannerData}
           /> 

          </PDFViewer>
          ) : (
            <p>Loading PDF data...</p> 
          )}
          <Stack direction="row" spacing={2}>

          <PDFDownloadLink document={<PDF 
              prehos={prehospitaliereData} 
              hos={hospitaliereData}
              hospi={hospitalisationData}
              img={imagerieData} 
              exa={examenCliniqueData} 
              exacom={examensComplementairesData}  
              evo={evolutionClassificationData} 
              bio={biologieData}  
              det={patientData} 
              concS={conclusionSortieData}
              concI={ConclusionInitialeData}
              concT={ConclusionTenirInitialeData}

              toast={TOASTData} 
              ascod={ASCODData} 
                irm={IRMData}
                flair={flairData} 
                tofWillis={tof_WillisData} 
                t2Swan={t2_SwanData}
                tsa={TSAData}
                aspects={AspectsData}
                SequencePerfusion={SequencePerfusionData}
                fatsat={fat_SATData}
              scanner={scannerData}
                />}  fileName="mypdf.pdf">

          {({ blob, url, loading, error }) =>
             loading ? 'Loading document...' : (
              <Button
                variant="contained"
                color="primary"
                startIcon={<GetAppIcon />}
              >
                Telecharger PDF
              </Button>
            )
          }
        </PDFDownloadLink>
         
   


          <Button
            variant="outlined"
          
            className="button"
            onClick={handleApercuClick}
          >
            Masquer
          </Button>
        </Stack>
        </>
        ) : (
          
          
           
           
             
              <Box component="main" sx={{ flexGrow: 1, p: 3 ,  alignItems: 'center',  display: 'flex', flexDirection: 'column',}}>
               
                <h1 >Rapport Patient</h1>
                <Stack direction="row" spacing={2}>
                  {/* <Button variant="contained"   endIcon={<SendIcon />}>Telecharger</Button> */}
                
                  
                  <Button
                    variant="contained"
                    alignItems="center"
                    className="button"
                    onClick={handleApercuClick}
                  >
                    Apercu
                  </Button>
                </Stack>
              </Box>
            
          
        )}
        </Box>  
        </ThemeProvider>
        </>
      );
      
}