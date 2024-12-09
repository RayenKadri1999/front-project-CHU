import React, { useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Font,Image  } from '@react-pdf/renderer';

import LogoS from "../images/logoS.png";


// Create Document Component

Font.register({
    family: 'Ubuntu',
    fonts: [
      {
        src: 'https://fonts.gstatic.com/s/ubuntu/v20/4iCs6KVjbNBYlgo6eAT3v02QFg.ttf', // Regular
      },
      {
        src: 'https://fonts.gstatic.com/s/ubuntu/v20/4iCv6KVjbNBYlgoCxCvTt2aMH4V_gg.ttf', // Bold
        fontWeight: 'bold',
      },
    ],
  });




// Create styles
const styles = StyleSheet.create({
    page: {
        
      padding: 20,
      fontFamily:'Ubuntu',
      position: 'relative',
      flexDirection: 'row',
   
      
    },
    leftSection: {
        width: '32%',
        padding: 0,
        float:"left",
       
           
        
      },
      rightSection: {
      
        width: '70%',
        padding: 0,
      },
      table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
      },
      tableRow: {
        flexDirection: "row",
      },
      tableColHeader: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#bdbdbd',
        padding: 5,
        fontSize: 10,
        fontWeight: "bold",
      },
      tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
        fontSize: 10,
      },
      tableCell: {
        margin: "auto",
        fontSize: 10,
      },
    section: {
      marginBottom: 10,
    },

    logo: {
    width: 100, // adjust as needed
    height: 100, // adjust as needed
    marginBottom: 10, // adjust as needed
    position: 'relative',
     top: -10,
    left: 20
    },

    title: {
      fontSize: 18,
      marginBottom: 10,
      textAlign: 'center',
      fontWeight: 'bold'
    },
    
    subtitle: {
        fontSize: 15,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold'
      },
      leftsubtitle: {
        fontSize: 13,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold'
      },
    text: {
        fontSize: 10,
      marginBottom: 4,
    },
    centredtext: {
      fontSize: 12,
      textAlign: 'center',
    marginBottom: 10,
     fontWeight: 'bold'
  },
    minisectionleft :{
        marginBottom: 30,

    },
    textleft: {
        textAlign: 'center',
        fontSize: 10,
     
    },
    tightText: {
      fontSize: 10,
      lineHeight: 1.1, // Adjust this value to reduce the space between lines
      marginBottom: 1,
    },
    borderedSection: {
        
        border: '1px solid black',
        padding: 9,
        margin: 9,
        
        
      },
      borderedSectionIRM: {
        
        border: '1px solid black',
        padding: 8,
        margin: 8,
        
        
      },
      checkboxrow:{
        flexDirection: 'row',
        alignItems: 'center', // Align items vertically in the center
        marginBottom: 5, // Optional: add some space between rows
      },
      checkbox: {
        width: 10,
        height: 10,
        border: '1pt solid black',
        position: 'relative',
        left: 0,
        top: -3,
        // transform: 'translateY(-50%)',
      },
      checkedCheckbox: {
        backgroundColor: 'black',
      },
  });





const PDF = (props) => {
    


  
    const moment = require('moment');
//     const location = useLocation();
   const prehospitaliereData = props.prehos;
    const patientData = props.det;
    const hospitalisationData =props.hospi;
   const hospitaliereData = props.hos;
   const imagerieData = props.img;
   const biologieData = props.bio;

   const toastData = props.toast;
   const ascodData = props.ascod;

   const conclusionSortieData=props.concS;
   const conclusionInitialeData=props.concI;
   const conduiteTenirInitialeData=props.concT;
   const examencliniqueData=props.exa;
   const examensComplementairesData=props.exacom;
   const evolutionClassificationData=props.evo;

   
   const IRMData=props.irm;
   const flairData=props.flair;
   const tofWillisData=props.tofWillis;
   const t2SwanData=props.t2Swan;
   const tsaData=props.tsa;
   const fatsatData=props.fatsat;
   const sequenceperfusionData=props.SequencePerfusion;
   const aspectsData=props.aspects

  const scannerData=props.scanner;

  console.log(props)

    // Data for the tables
 


    
    
    const [formData, setFormData] = useState({
        nom: patientData.Nom,
        prenom: patientData.Prenom,
        adresse: patientData.Adresse,
        sexe: patientData.sexe,
        ne: patientData.dateNaissance,
        numeroDossier: patientData._id,
        aidantPrincipal: patientData.aidantPrincipal,
        numeroAidantPrincipal: patientData.numeroAidantPrincipal,
        email:patientData.email,
        telephone:patientData.telephone,

       
        entreeFaitPar: hospitalisationData.entreeFaitPar,
        dateEntree:moment(hospitalisationData.dateEntree).format('YYYY-MM-DD'),
        sortieFaitPar: hospitalisationData.sortieFaitPar,
        dateSortie:moment(hospitalisationData.dateSortie).format('YYYY-MM-DD'),
       validePar:hospitalisationData.validePar,
        prehos_mat:prehospitaliereData.matricule,
        phasePreHospitaliereAppelNeurologue: prehospitaliereData.quiAppelNeurologue,
        phasePreHospitaliereDateDebutSymptomes: moment(prehospitaliereData.dateDebutSymptome).format('YYYY-MM-DD'),
        phasePreHospitaliereHeureDebutSymptomes: moment(prehospitaliereData.dateDebutSymptome).format('HH:mm:ss'),
        phasePreHospitaliereDateAppelNeurologue: moment(prehospitaliereData.dateAppelNeurologue).format('YYYY-MM-DD'),
        phasePreHospitaliereHeureAppelNeurologue: moment(prehospitaliereData.dateAppelNeurologue).format('HH:mm:ss'),
        phasePreHospitaliereMotifAppel: prehospitaliereData.motifAppel,

        allergies:hospitaliereData.Allergies ,
        hta: hospitaliereData.HTA,
        hypercholesterolemie: hospitaliereData.Hypercholestérolémie,
        diabete: hospitaliereData.Diabète,
        fibrillationAuriculaire: hospitaliereData.Fibrillation_auriculaire,
        sas: hospitaliereData.SAS,
        ait: hospitaliereData.AIT,
        avcIschemiqueHemorragique: hospitaliereData.AVC,
        modeVieVit: hospitaliereData.Vit,
        modeVieLateralite: hospitaliereData.Latéralité,
        modeVieProfession: hospitaliereData.Profession,
        modeVieAutonomie: hospitaliereData.Autonomie,
        modeVieTabagisme: hospitaliereData.Tabagisme,
        modeVieChicha: hospitaliereData.Chicha,
        modeVieNeffa: hospitaliereData.Neffa,
        modeVieConsommationAlcool: hospitaliereData.Consommation_alcool,
        HistoireMaladie: hospitaliereData.HistoireMaladie,
        TraitementEntrée: hospitaliereData.TraitementEntrée,
        hospit_mat: hospitaliereData.matricule,

       
        nihss: examencliniqueData.NIHSSValue,
        last: examencliniqueData.LASTInitial,
         ResultExamenNeuroInitial:examencliniqueData.ResultExamenNeuroInitial,

        ta: examencliniqueData.TA,
        dextro:examencliniqueData.Dextro ,
        auscultationCardiaque: examencliniqueData.AuscultationCardiaque,
        auscultationPulmonaire: examencliniqueData.AuscultationPulmonaire,
        souffleCarotidienne: examencliniqueData.SouffleCarotidien,
        ResultsExamenGeneral:examencliniqueData.ResultsExamenGeneral,
       examencli_mat:examencliniqueData.matricule,

        irmDate: moment(IRMData.dateIRM).format('YYYY-MM-DD'),
        irmHeureDebut:moment(IRMData.dateIRM).format('HH:mm:ss'),
        irmHeureFin: moment(IRMData.dateFinIRM).format('HH:mm:ss'),
        irmstatus:IRMData.status,
        irmDiffusion1:IRMData.Diffusion1,
        irmDiffusion2:IRMData.Diffusion2,
        irmDetails:IRMData.Details,

        // dwi: imagerieData.SynthèseDWI,

        flairstatus: flairData.Status,
        flairSequentielleAVC: flairData.SequentielleAVC,
        flairCortex:  flairData.Cortex,
        flairSubstanceBlanche: flairData.SubstanceBlanche,
        flairNoyauGris: flairData.NoyauGris,
        flairScore_Collatéralité: flairData.Score_Collatéralité,
        flairPeri_ventriculaire: flairData.Peri_ventriculaire,
        flairsous_corticale:flairData.sous_corticale,
        flairScore_Fazekas: flairData.Score_Fazekas,
        flairDetails: flairData.Details,

        t2swanstatus: t2SwanData.status,
        t2swanProfonds:t2SwanData.Profonds,
        t2swanSous_corticaux:t2SwanData.Sous_corticaux,
        t2swanTotal:t2SwanData.Total,
        t2swanThrombusvisible:t2SwanData.Thrombusvisible,
        t2swanThrombusvisibleTaille:t2SwanData.ThrombusvisibleTaille,
        t2swanHémosidérosecorticale:t2SwanData.Hémosidérosecorticale,
        t2swanSignes_veineux_hypoxie:t2SwanData.Signes_veineux_hypoxie,
        t2swanMicrobleeds:t2SwanData.Microbleeds,

        tofWillisstatus: tofWillisData.status,
        tofWillisocclusion:tofWillisData.occlusion,
        tofWillisM1G:tofWillisData.M1G,
        tofWillisM1D:tofWillisData.M1D,
        tofWillisDetails:tofWillisData.Details,

        sequenceperfusionstatus: sequenceperfusionData.status,
        sequenceperfusionDetails: sequenceperfusionData.Details,

        tsastatus: tsaData.status,
        tsaAnomalieGauche: tsaData.AnomalieGauche,
        tsaAnomalieDroite: tsaData.AnomalieDroite,

        aspectsnumber: aspectsData.AspectsNumber,
        aspectsDetails: aspectsData.AspectsDetails,
       
        fatsatstatus:fatsatData.status,
        fatsatAnomalieGauche:fatsatData.AnomalieGauche,
        fatsatAnomalieDroite:fatsatData.AnomalieDroite,

        
        Synthèseimg:imagerieData.Synthèse,

        scannerstatus:scannerData.status,
        scannerDate: moment(scannerData.DateScanner).format('YYYY-MM-DD'),
        scannerHeureImagerie: moment(scannerData.DateScanner).format('HH:mm:ss'),
        scannerDesc:scannerData.Description,
        scannerAngioscan:scannerData.AngioscanTSA_Willis,
        scannerOcclusin:scannerData.Occlusin_sténose,
        scannerACGauche:scannerData.ACGauche,
        scannerACDroite:scannerData.ACDroite,
        scannertroncbasilaire:scannerData.troncbasilaire,
        scannerAVGauche:scannerData.AVGauche,
        scannerAVDroite:scannerData.AVDroite,
        scannerAngioTSAGacuhe:scannerData.AngioTSAGacuhe,
        scannerAngioTSADroite:scannerData.AngioTSADroite,


        ecg: conclusionInitialeData.ECG,
        tp: conclusionInitialeData.TP,
        ratioTca: conclusionInitialeData.RATIO_TCA,
        inr: conclusionInitialeData.INR,
        dDimères:conclusionInitialeData.D_dimères,
        fibrinogene: conclusionInitialeData.Fibrinogène,
        plaquettes: conclusionInitialeData.Plaquettes,
        hemoglobine: conclusionInitialeData.Hémoglobine,
        dosageSpecifique: conclusionInitialeData.Dosage,
conclusioninitiale:conclusionInitialeData.Conclusion,
conclusioninit_mat:conclusionInitialeData.matricule,


        doubleAntiAgregationPlaquettaire: conduiteTenirInitialeData.DoubleAntiAgrégationPlaquettaire ? "Oui" : "Non",
        anticoagulationCurative: conduiteTenirInitialeData.AnticoagulationCurative  ? "Oui" : "Non",
        thrombolyseIv: conduiteTenirInitialeData.ThrombolyseIV  ? "Oui" : "Non",

        clopidogrel:conduiteTenirInitialeData.Clopidogrel,
        ticagrelor:conduiteTenirInitialeData.ticagrelor,

        dateTiv: moment(conduiteTenirInitialeData.DateTIV).format('YYYY-MM-DD'),
        heureTiv: moment(conduiteTenirInitialeData.DateTIV).format('HH:mm:ss'),
        metalyse:conduiteTenirInitialeData.Metalyse,
        actilyse:conduiteTenirInitialeData.Actilyse,

        nihss24h: conduiteTenirInitialeData.NIHSS24h,
        cond_mat:conduiteTenirInitialeData.mat,


        sodium: biologieData.Sodium,
        potassium: biologieData.Potassium,
        uree: biologieData.Urée,
        creatinine: biologieData.Urée,
        crp: biologieData.CRP,
        cpk: biologieData.CPK,
        myoglobine:biologieData.Myoglobine,
        troponine: biologieData.Troponine,
        nt_pro_bnp: biologieData.NT_pro_BNP,
        hba1c: biologieData.HbA1c,
        hémoglobine_b :biologieData.Hémoglobine,
        leucocytes :biologieData.Leucocytes,
        plaquettes_b :biologieData.Plaquettes,
        d_dimères_b :biologieData.D_dimères,
        monomères_de_fbrine :biologieData.Monomères_de_fbrine,
        fibrinogène_b :biologieData.Fibrinogène,
        tp_b :biologieData.TP,
        ratio_tca_b :biologieData.Ratio_TCA,

        asat: biologieData.ASAT_GOT,
        alat: biologieData.ALAT_GPT,
        ggt: biologieData.GGT,
        pal: biologieData.PAL,
        bilirubineTotale:biologieData.Bilirubine_totale,
        bilirubineLibre: biologieData.Bilirubine_libre,
        bio_mat:biologieData.matricule,


        TélémétrieDone: examensComplementairesData.TélémétrieCardiaque,
        Télémétrie: examensComplementairesData.DescTélémétrieCardiaque,

        ETTDone: examensComplementairesData.ETT,
        ETT: examensComplementairesData.DescETT,

        ETODone:  examensComplementairesData.ETO,
        ETO:  examensComplementairesData.DescETO,

        EDTSATCDone:  examensComplementairesData.EDTSATC,
        EDTSATC:  examensComplementairesData.DescEDTSATC,
        // Angioscanner:  examensComplementairesData.DescAngiographie,
        HolterRythmiqueDone:examensComplementairesData.HolterRythmique,
        HolterRythmique:examensComplementairesData.DescHolterRythmique,

        AngiographieDone:examensComplementairesData.Angiographie,
        Angiographie:examensComplementairesData.DescAngiographie,

        AutreDone:examensComplementairesData.AutreExamens,
        Autre:examensComplementairesData.DescAutreExamens,
        exacom_mat:examensComplementairesData.matricule,
        


        cardioembolique:  toastData.cardioembolique,
        cardioemboliqueContent:  toastData.cardioemboliqueContent,
        fibrillation_valvulaire:toastData.fibrillation_valvulaire,
        fibrillation_type:toastData.fibrillation_type,
        fibrillation_anticoagulée:toastData.fibrillation_anticoagulée,
        athérothrombotique: toastData.athérothrombotique,
        athérothrombotiqueContent: toastData.athérothrombotiqueContent,
        lacune: toastData.lacune,
        infotoast: toastData.info,
        indeterminee: toastData.Indeterminé,
        indetermineeContent:toastData.IndeterminéContent,
        toast_mat:toastData.matricule,



        A: ascodData.A,
        S: ascodData.S,
        C: ascodData.C,
        O: ascodData.O,
        D: ascodData.D,
        infocom:ascodData.info,
        ascod_mat:ascodData.matricule,


        PlanCliniqueDone:evolutionClassificationData.PlanClinique,
        PlanEtiologiqueDone:evolutionClassificationData.PlanEtiologique,
        PlanThérapeutiqueDone:evolutionClassificationData.PlanThérapeutique,
        PlanClinique:evolutionClassificationData.DescPlanClinique,
        PlanEtiologique:evolutionClassificationData.DescPlanEtiologique,
        PlanThérapeutique:evolutionClassificationData.DescPlanThérapeutique,
        evo_cla_mat:evolutionClassificationData.matricule,
       

        //  microangiopathie:evolutionClassificationData.EtiologieRetenue.includes("Microangiopathie"),
        //   angiopathieamyloidie:evolutionClassificationData.EtiologieRetenue.includes("Angiopathie Amyloidie"),
        //  malforamtionartérioveineuse:evolutionClassificationData.EtiologieRetenue.includes("Malforamtion Artérioveineuse"),
        //  anévrysmerompu:evolutionClassificationData.EtiologieRetenue.includes("Anévrysme Rompu"),
        //  coagulopathieiatrogéne:evolutionClassificationData.EtiologieRetenue.includes("Coagulopathie Iatrogéne"),
        //  coagulopathieconstitutionnelle:evolutionClassificationData.EtiologieRetenue.includes("Coagulopathie Constitutionnelle"),
        //  tumeurcérébral:evolutionClassificationData.EtiologieRetenue.includes("Tumeur Cérébral"),
        //  autres:evolutionClassificationData.EtiologieRetenue.includes("Autres"),
        //  indéterminée:evolutionClassificationData.EtiologieRetenue.includes("Indéterminée") ,

        nihssSortie: conclusionSortieData.NIHSSValue,
        mrsSortie: conclusionSortieData.mRsSortie,
        lastSortie: conclusionSortieData.LastSortie,
        modeSortie: conclusionSortieData.ModeSortie,
        traitementSortie: conclusionSortieData.TraitementSortie,
        recommandationssortie: conclusionSortieData.RecommandationsSortie,
        conclusionsortie:conclusionSortieData.Conclusion,
        consor_mat:conclusionSortieData.matricule,
      
      });
      const data1 = [
        ["Biochimie du sang","  ", "Marqueurs cardio-vasculaires","  "],
        ["Sodium (136-145)",  `${formData.sodium} mmol/l`,"CPK ()", `${formData.cpk} UI/l`],
        ["Potassium (3.4-4.5)",`${formData.potassium} mmol/l`,"Myoglobine ()",`${formData.myoglobine} ng/l` ],
        ["Urée (2.8-8.1)", `${formData.uree} mmol/l`,"Troponine ()", `${formData.troponine} pg/l`],
        ["Créatinine (62-106)", `${formData.creatinine} µmol/l`,"NT-pro-BNP ()",`${formData.nt_pro_bnp} pg/l`],
        ["CRP (<5)", `${formData.crp} mg/l`," "," "]
      ];
    
    
      const data3 = [
        ["Hématologie"," ","Bilan hépatique"," "],
        ["HbA1c", `${formData.hba1c} mmol/l` ,"ASAT/GOT (<40)", `${formData.asat} UI/l`],
        ["Hémoglobine", `${formData.hémoglobine_b} g/dl`,"ALAT/GPT (41)",`${formData.alat} UI/l`],
        ["Leucocytes", `${formData.leucocytes} /mm3`,"GGT (<60)",`${formData.ggt} UI/l` ],
        ["Plaquettes",`${formData.plaquettes_b} /mm3` ,"PAL (40-130)", `${formData.pal} UI/l`],
        ["D-dimères (50-420)",`${formData.d_dimères_b} µg/ml` ,"Bilirubine totale (2-17)", `${formData.bilirubineTotale} µmol/l`],
        ["Monomères de fibrine (<6)",`${formData.monomères_de_fbrine} µg/ml` ,"Bilirubine libre",`${formData.bilirubineLibre} `],
        ["Fibrinogène",`${formData.fibrinogène_b}`],
        ["TP (70-130)", `${formData.tp_b} % `],
        ["Ratio TCA (1.18)",`${formData.ratio_tca_b} `]
      ];
    
      const Table = ({ data }) => (
        <View style={styles.table}>
          {data.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.tableRow}>
              {row.map((cell, colIndex) => (
                <View key={colIndex} style={rowIndex === 0 ? styles.tableColHeader : styles.tableCol}>
                  <Text style={styles.tableCell}>{cell}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      );


      const RightContent = (
        <View >
          

          <Text style={styles.title}>Unité Neuro Vasculaire</Text>
          <Text style={styles.title}>Compte-rendu d'hospitalisation</Text>

          
      
      <View style={styles.borderedSection}>
        <Text style={styles.text}>NOM : {formData.nom}</Text>
        <Text style={styles.text}>Prénom : {formData.prenom}</Text>
        <Text style={styles.text}>Adresse : {formData.adresse}</Text>
        <Text style={styles.text}>Sexe : {formData.sexe}</Text>
        <Text style={styles.text}>Né(e) le : {formData.ne}</Text>
        <Text style={styles.text}>Matricule : {formData.matricule}</Text>
        <Text style={styles.text}>Numéro de dossier : {formData.numeroDossier}</Text>
        <Text style={styles.text}>Aidant principal : {formData.aidantPrincipal}</Text>
        <Text style={styles.text}>Numéro de l'aidant principal : {formData.numeroAidantPrincipal}</Text>
        <Text style={styles.text}>Email : {formData.email}</Text>
        <Text style={styles.text}>Téléphone : {formData.telephone}</Text>
        <Text style={styles.text}>Entrée Fait par : {formData.entreeFaitPar} le : {formData.dateEntree}</Text>
        <Text style={styles.text}>Sortie Fait par : {formData.sortieFaitPar} le : {formData.dateSortie} </Text>
          <Text style={styles.text}>Validé par : {formData.validePar} le : {formData.dateSortie} </Text>


        </View>



      {formData.prehos_mat &&
        <>
      <Text style={styles.subtitle}>Phase pré-hospitalière :</Text>
      <View style={styles.borderedSection}>
       
        <Text style={styles.text}>- Qui a appelé le neurologue : {formData.phasePreHospitaliereAppelNeurologue}</Text>
        <Text style={styles.text}>- Date du début des symptômes : {formData.phasePreHospitaliereDateDebutSymptomes}</Text>
        <Text style={styles.text}>- Heure du début des symptômes : {formData.phasePreHospitaliereHeureDebutSymptomes}</Text>
        <Text style={styles.text}>- Date d'appel du neurologue : {formData.phasePreHospitaliereDateAppelNeurologue}</Text>
        <Text style={styles.text}>- Heure d'appel du neurologue : {formData.phasePreHospitaliereHeureAppelNeurologue}</Text>
        <Text style={styles.text}>- Motif d'appel : {formData.phasePreHospitaliereMotifAppel}</Text>
      </View>
      </>
}


{formData.hospit_mat &&
<>
      <Text style={styles.subtitle}>Phase hospitalière :</Text>
      <View style={styles.borderedSection}>
     
      <Text style={styles.centredtext}>Antécédents : </Text>
        <Text style={styles.text}>- Allergies : {formData.allergies}</Text>
        <Text style={styles.text}>- HTA : {formData.hta}</Text>
        <Text style={styles.text}>- Hypercholestérolémie : {formData.hypercholesterolemie}</Text>
        <Text style={styles.text}>- Diabète : {formData.diabete}</Text>
        <Text style={styles.text}>- Fibrillation auriculaire : {formData.fibrillationAuriculaire}</Text>
        <Text style={styles.text}>- SAS : {formData.sas}</Text>
        <Text style={styles.text}>- AIT : {formData.ait}</Text>
        <Text style={styles.text}>- AVC ischémique/hémorragique : {formData.avcIschemiqueHemorragique}</Text>
      </View>

 
      <View style={styles.borderedSection} wrap={false}>
      <Text style={styles.centredtext}>Mode de vie : </Text>
        <Text style={styles.text}>- Vit : {formData.modeVieVit}</Text>
        <Text style={styles.text}>- Latéralité : {formData.modeVieLateralite}</Text>
        <Text style={styles.text}>- Profession : {formData.modeVieProfession}</Text>
        <Text style={styles.text}>- Autonomie : {formData.modeVieAutonomie}</Text>
        <Text style={styles.text}>- Tabagisme : {formData.modeVieTabagisme}</Text>
        <Text style={styles.text}>- Chicha : {formData.modeVieChicha}</Text>
        <Text style={styles.text}>- Neffa : {formData.modeVieNeffa}</Text>
        <Text style={styles.text}>- Consommation d'alcool : {formData.modeVieConsommationAlcool}</Text>
      </View>
    
      
      <View style={styles.borderedSection} wrap minPresenceAhead={50}>
      <Text style={styles.centredtext}>Histoire Maladie : </Text>
        <Text style={styles.text}>-  {formData.HistoireMaladie}</Text>
        
      </View>
      {formData.TraitementEntrée !== "" &&
      <View style={styles.borderedSection} minPresenceAhead={50}>
      <Text style={styles.centredtext}>Traitement à l'entrée : : </Text>
        <Text style={styles.text}>-  {formData.TraitementEntrée}</Text>
      
      </View>
    }
  </>
  }
      


{formData.examencli_mat &&
<>
      <View style={styles.borderedSection} wrap={false}>
      <Text style={styles.centredtext}>Examen neurologique initial : </Text>
       
        <Text style={styles.text}>NIHSS : {formData.nihss}</Text>
        <Text style={styles.text}>LAST : {formData.last}</Text>
        <Text style={styles.text}></Text>
       {formData.ResultExamenNeuroInitial !== "" && 
       <View>
       <Text style={styles.text}>Résultats :</Text>
        <Text style={styles.text}>{formData.ResultExamenNeuroInitial}</Text>
        </View>
        }
   
      </View>

      <View style={styles.borderedSection} wrap={false}>
      <Text style={styles.centredtext}>Examen Général : </Text>
  
      
      {formData.ta !== "" &&  <Text style={styles.text}>TA : {formData.ta}</Text>}
        {formData.dextro !== "" &&  <Text style={styles.text}>Dextro : {formData.dextro}</Text>}
        {formData.auscultationCardiaque !== "" &&  <Text style={styles.text}>Auscultation cardiaque : {formData.auscultationCardiaque}</Text>}
        {formData.auscultationPulmonaire !== "" &&  <Text style={styles.text}>Auscultation pulmonaire : {formData.auscultationPulmonaire}</Text>}
       <Text style={styles.text}>Souffle carotidienne : {formData.souffleCarotidienne}</Text>
     {formData.ResultsExamenGeneral !== "" &&  <Text style={styles.text}>Résultats : {formData.ResultsExamenGeneral}</Text>}
           
     
      </View>
</>
}

      {/* <View style={styles.borderedSection}>
      <Text style={styles.centredtext}>Examen complémentaires initiaux : </Text>

      { formData.Examencomplémentairesinitiaux.length > 0 && (
                    <View >
                   
                    
                      {formData.Examencomplémentairesinitiaux
                        .map((term, i) => (
                          <Text key={i} style={styles.text}>- {term}</Text>
                        ))
                      }
              </View>)}
       
      </View> */}
<Text break>
      </Text>
{ formData.irmstatus ==="Oui" &&
     

      <View style={styles.borderedSectionIRM} > 
      { formData.irmstatus ==="Oui" &&
      <>
      <Text style={styles.centredtext} >IRM : </Text>
       
        <Text style={styles.tightText}> Date : {formData.irmDate} </Text>
        <Text style={styles.tightText}> Heure du début : {formData.irmHeureDebut} </Text>
        <Text style={styles.tightText}> Heure de la fin : {formData.irmHeureFin}</Text>
        <Text style={styles.tightText}> Diffusion : -{formData.irmDiffusion1}</Text>
        { formData.irmDiffusion1 === "Anormale" &&
        <>
        <Text style={styles.tightText}> {"             "} -{formData.irmDiffusion2}</Text>
        {formData.irmDetails
                        .map((term, i) => (
                          <Text key={i} style={styles.tightText}>{'    '}{'    '}- {term}</Text>
                        ))
                      }
                      <Text style={styles.tightText}>ASPECTS : {formData.aspectsnumber}</Text>
                      <Text style={styles.tightText}>{'    '}{'    '}-Artère Cérébrale Moyenne :  </Text>
                      {formData.aspectsDetails
                        .map((term, i) => (
                          <Text key={i} style={styles.tightText}>{'    '}{'    '}{'    '}{'    '}- {term}</Text>
                        ))
                      }
                      </>
                    }

        
        <Text style={styles.tightText}>FLAIR : {formData.flairstatus}</Text>
        { formData.flairstatus ==="Anormale" &&
        <>
         <Text style={styles.tightText}>{"     "}{"     "}-Séquelle(s) AVC : {formData.flairSequentielleAVC} </Text>
         <Text style={styles.tightText}>{"     "}{"     "}-Lésion récente :  </Text>
         <Text style={styles.tightText}>{"     "}{"     "}{"     "}{"     "}-Cortex : {formData.flairCortex} </Text>
         <Text style={styles.tightText}>{"     "}{"     "}{"     "}{"     "}-Substance Blanche : {formData.flairSubstanceBlanche} </Text>
         <Text style={styles.tightText}>{"     "}{"     "}{"     "}{"     "}-Noyau gris : {formData.flairNoyauGris} </Text>
         <Text style={styles.tightText}>{"     "}{"     "}{"     "}{"     "}-Score de Collatéralité : {formData.flairsous_corticale} </Text>
         <Text style={styles.tightText}>{"     "}{"     "}-Leucoaraoise :  </Text>
         <Text style={styles.tightText}>{"     "}{"     "}-Peri-ventriculaire : {formData.flairPeri_ventriculaire} </Text>
         <Text style={styles.tightText}>{"     "}{"     "}-Sous corticale : {formData.flairsous_corticale} </Text>
         <Text style={styles.tightText}>{"     "}{"     "}-Score de Fazekas : {formData.flairScore_Fazekas} </Text>
        
         </>
        }
                <Text style={styles.tightText}>TOF Willis : {formData.tofWillisstatus}</Text>
                { formData.tofWillisstatus ==="Anormal" && 
        <>
          <Text style={styles.tightText}>{"     "}{"     "}-Occlusion ou sténose symptomatique : {formData.tofWillisocclusion} </Text>
         

         <Text style={styles.tightText}>{"     "}{"     "}-Anomalies: </Text>
         <Text style={styles.tightText}>{"     "}{"     "}{"     "}{"     "}- {formData.tofWillisM1D} </Text>
         <Text style={styles.tightText}>{"     "}{"     "}{"     "}{"     "}- {formData.tofWillisM1G} </Text>
          {formData.tofWillisDetails
                        .map((term, i) => (
                          <Text key={i} style={styles.tightText}>{"     "}{"     "}{"     "}{"     "}- {term} </Text>
                        ))
                      
        
        }
        </>
}

        <Text style={styles.tightText}>SWAN : {formData.t2swanstatus}</Text>
        { formData.t2swanstatus ==="Anormal" && 
        <>
         <Text style={styles.tightText}>{"     "}{"     "}-Microbleeds </Text>
          {formData.t2swanMicrobleeds
                        .map((term, i) => (
                          <Text key={i} style={styles.text}>{"     "}{"     "}{"     "}{"     "}- {term} : {formData[`t2swan`+term]}</Text>
                        ))
                      
        }
         <Text style={styles.tightText}>{"     "}{"     "}{"     "}{"     "}-Total : {formData.t2swanTotal} </Text>
           <Text style={styles.tightText}>{"     "}{"     "}-Thrombus visible : {formData.t2swanThrombusvisible} {formData.t2swanThrombusvisible ==="Oui" && <Text>, Taille :{formData.t2swanThrombusvisibleTaille}</Text> } </Text>
        
           <Text style={styles.tightText}>{"     "}{"     "}-Hémosidérose corticale : {formData.t2swanHémosidérosecorticale} </Text>
           <Text style={styles.tightText}>{"     "}{"     "}-Signes veineux d'hypoxie cérébrale : {formData.t2swanSignes_veineux_hypoxie} </Text>
          

         </>
         }

     
        <Text style={styles.tightText}>Fat-SAT : {formData.fatsatstatus}</Text>
       { formData.fatsatstatus ==="Anormal" &&
       <>
        <Text style={styles.tightText}>{"     "}{"     "}-Anomalie Droite : {formData.fatsatAnomalieDroite}</Text>
        <Text style={styles.tightText}>{"     "}{"     "}-Anomalie Gauche : {formData.fatsatAnomalieGauche}</Text>
      
                      </>
                    }
        <Text style={styles.tightText}>TSA : {formData.tsastatus}</Text>
        { formData.tsastatus ==="Oui" &&
       <>
        <Text style={styles.tightText}>{"     "}{"     "}-Anomalie Droite : {formData.tsaAnomalieDroite}</Text>
        <Text style={styles.tightText}>{"     "}{"     "}-Anomalie Gauche : {formData.tsaAnomalieGauche}</Text>
      
                      </>
                    }
        <Text style={styles.tightText}>ASL : {formData.sequenceperfusionstatus}</Text>
        { formData.sequenceperfusionstatus ==="Oui" &&
       <>
        <Text style={styles.tightText}>{"     "}{"     "}-Anomalies: </Text>
          {formData.sequenceperfusionDetails
                        .map((term, i) => (
                          <Text key={i} style={styles.tightText}>{"     "}{"     "}{'    '}{"     "}-{term} </Text>
                        ))
                      
        }
        </>
}
        </>
}

      </View>
      
}


{ formData.scannerstatus  &&
     
     <View style={styles.borderedSection} wrap={false}> 
     { formData.scannerstatus ==="Oui" &&
     <>
 
     <Text style={styles.centredtext}>TDM cérébrale et Angio-TDM TSA et Willis  </Text>
        <Text style={styles.text}>Date : {formData.scannerDate}</Text>
        <Text style={styles.text}>Heure d'imagerie : {formData.scannerHeureImagerie}</Text>
        <Text style={styles.text}>Description : {formData.scannerDesc}</Text>
        <Text style={styles.text}>Angioscan TSA/Willis : {formData.scannerAngioscan}</Text>
        <Text style={styles.text}>Occlusin ou sténose signficative : {formData.scannerOcclusin}</Text>
        <Text style={styles.text}>AngioTSA Gauche : {formData.scannerAngioTSAGacuhe}</Text>
        <Text style={styles.text}>AngioTSA Droite : {formData.scannerAngioTSADroite}</Text>
        <Text style={styles.text}>Tronc basilaire : {formData.scannertroncbasilaire}</Text>
        <Text style={styles.text}>Anomalie Carotidienne Gauche : {formData.scannerACGauche}</Text>
        <Text style={styles.text}>Anomalie Carotidienne Droite : {formData.scannerACDroite}</Text>
        <Text style={styles.text}>Anomalie vertébrale Gauche : {formData.scannerAVGauche}</Text>
        <Text style={styles.text}>Anomalie vertébrale Droite : {formData.scannerAVDroite}</Text>
     

        
        </>
} </View>
}

{formData.Synthèseimg &&
<View style={styles.borderedSection} wrap={false}>
     
      <Text style={styles.centredtext}>Synthèse de l'imagerie (IRM/Scanner)  </Text>
      <Text style={styles.text}>- {formData.Synthèseimg}</Text>
    
      </View>
}



      {formData.conclusioninit_mat &&
      <View style={styles.borderedSection} wrap={false}>
      <Text style={styles.centredtext} >Conclusion initiale </Text>
      <View style={styles.borderedSection}>
        <Text style={styles.centredtext}>Bilan initial: </Text>
        <Text style={styles.text}>ECG : {formData.ecg}</Text>
        <Text style={styles.text}>TP : {formData.tp}</Text>
        <Text style={styles.text}>Ratio TCA : {formData.ratioTca}</Text>
        <Text style={styles.text}>INR : {formData.inr}</Text>
        <Text style={styles.text}>D-dimères : {formData.dDimères}</Text>
        <Text style={styles.text}>Fibrinogène : {formData.fibrinogene}</Text>
        <Text style={styles.text}>Plaquettes : {formData.plaquettes}</Text>
        <Text style={styles.text}>Hémoglobine : {formData.hemoglobine}</Text>
        <Text style={styles.text}>Dosage spécifique (ELIXTRA, RIVA/XABAN) : {formData.dosageSpecifique}</Text>
      </View>
      <Text style={styles.centredtext}>Au total: </Text>
      <Text style={styles.text}>-{formData.conclusioninitiale}</Text>
      </View>

      }
      {formData.cond_mat &&
      
      <View style={styles.borderedSection} wrap={false}>
      <Text style={styles.subtitle} >Conduite à tenir initiale :</Text>
        
        <Text style={styles.text}>- Double anti agrégation plaquettaire : {formData.doubleAntiAgregationPlaquettaire }</Text>
        {formData.doubleAntiAgregationPlaquettaire === "Oui" &&  <Text style={styles.text}>{'    '}{'    '}{'    '}Clopidogrel : {formData.clopidogrel}</Text>}
        {formData.doubleAntiAgregationPlaquettaire === "Oui" &&  <Text style={styles.text}>{'    '}{'    '}{'    '}Ticagrelor : {formData.ticagrelor}</Text>}
        <Text style={styles.text}></Text>
        <Text style={styles.text}></Text>

        <Text style={styles.text}>- Anticoagulation curative : {formData.anticoagulationCurative}</Text>
        <Text style={styles.text}></Text>
        <Text style={styles.text}></Text>

    
        <Text style={styles.text}>- Thrombolyse IV : {formData.thrombolyseIv}</Text>
        {formData.thrombolyseIv === "Oui" &&
        <View>
        <Text style={styles.text}> {'    '}{'    '}Date de TIV : {formData.dateTiv} </Text>
        <Text style={styles.text}> {'    '}{'    '}Heure TIV : {formData.heureTiv}</Text>
        <Text style={styles.text}></Text>
        <Text style={styles.text}> {'    '}{'    '}Molécule utilisée </Text>
        <Text style={styles.text}> {'    '}{'    '}{'    '}{'    '}Actilyse  : {formData.actilyse} </Text>
        <Text style={styles.text}> {'    '}{'    '}{'    '}{'    '}Metalyse : {formData.metalyse}</Text>
        <Text style={styles.text}></Text>
        <Text style={styles.text}>  {'    '}{'    '}Evolution clinico-radiologique à 24 heures:</Text>
        <Text style={styles.text}> {'    '}{'    '}{'    '}{'    '}Nihss à 24 heures  : {formData.nihss24h} </Text>

        </View>

}
      </View>
}

      {formData.bio_mat &&
        

      <View style={styles.section} wrap={false} >
        <Text style={styles.text}>Biologie :</Text>
        {/* <Text style={styles.text}>Sodium : {formData.sodium}</Text>
        <Text style={styles.text}>Potassium : {formData.potassium}</Text>
        <Text style={styles.text}>Urée : {formData.uree}</Text>
        <Text style={styles.text}>Créatinine : {formData.creatinine}</Text>
        <Text style={styles.text}>CRP : {formData.crp}</Text>
        <Text style={styles.text}>HbA1c : {formData.hba1c}</Text>
        <Text style={styles.text}>ASAT/GOT : {formData.asat}</Text>
        <Text style={styles.text}>ALAT/GPT : {formData.alat}</Text>
        <Text style={styles.text}>GGT : {formData.ggt}</Text>
        <Text style={styles.text}>PAL : {formData.pal}</Text>
        <Text style={styles.text}>Bilirubine totale : {formData.bilirubineTotale}</Text>
        <Text style={styles.text}>Bilirubine libre : {formData.bilirubineLibre}</Text> */}
        <Table data={data1} />
          {/* <Table data={data2} /> */}
          <Table data={data3} />
          {/* <Table data={data4} /> */}
      </View>
      }
      {formData.exacom_mat &&
        <>
     
      <View style={styles.borderedSection} wrap={false}>
      <Text style={styles.subtitle} wrap={false}>Examens complémentaires :</Text>
        {formData.TélémétrieDone && <Text style={styles.text}>- Télémétrie cardiaque  : {formData.Télémétrie}</Text> }
        {formData.ETTDone &&   <Text style={styles.text}>- ETT : {formData.ETT}</Text> }
        {formData.ETODone && <Text style={styles.text}>- ETO  : {formData.ETO}</Text> }
        {formData.EDTSATCDone &&  <Text style={styles.text}>- EDTSA-TC  : {formData.EDTSATC}</Text> }
        {/* <Text style={styles.text}>- Angioscanner TSA  et Willis : {formData.Angioscanner}</Text> */}
        {formData.HolterRythmiqueDone &&  <Text style={styles.text}>- Holter Rythmique  : {formData.HolterRythmique}</Text> }
        {formData.AngiographieDone &&  <Text style={styles.text}>- Angiographie  : {formData.Angiographie}</Text> }
        {formData.AutreDone &&  <Text style={styles.text}>- Autre  : {formData.Autre}</Text> }

      </View>
      </>
      }
      

      {formData.evo_cla_mat &&
      <View style={styles.borderedSection} wrap={false}>
      <Text style={styles.centredtext}>Synthèse de l'évolution clinico-radiologique : </Text>
      {formData.PlanCliniqueDone && 
      <View>
         <Text style={styles.text}>- Sur le plan clinique   </Text>
         <Text style={styles.text}> {formData.PlanClinique}</Text>
         </View>
      }
         <Text style={styles.text}></Text>
         <Text style={styles.text}></Text>
         <Text style={styles.text}></Text>
         {formData.PlanEtiologiqueDone && 
      <View>
         <Text style={styles.text}>- Sur le plan étiologique   :</Text>
         <Text style={styles.text}>{formData.PlanEtiologique   }</Text>
         </View>
      }
         <Text style={styles.text}></Text>
         <Text style={styles.text}></Text>
         <Text style={styles.text}></Text>
         {formData.PlanThérapeutiqueDone && 
      <View>
         <Text style={styles.text}>- Sur le plan thérapeutique  </Text>
         <Text style={styles.text}> {formData.PlanThérapeutique}</Text>
         </View>
        }
         </View>
}

   {(formData.toast_mat || formData.ascod_mat) &&    
      <View style={styles.borderedSection} wrap={false}>
         {formData.toast_mat &&
         <>
      <Text style={styles.subtitle} break>Classification TOAST :</Text>
      <Text style={styles.text}></Text>
      <Text style={styles.text}></Text>
      <Text style={styles.text}></Text>

            { formData.cardioembolique==="oui" && (
            <View >
              <Text style={styles.text}>-Cardioembolique :</Text>
              {formData.cardioemboliqueContent.includes('fibrillationAuriculaire') && (
                <View>
            <Text style={styles.text}>{'    '}{'    '}- Fibrillation Auriculaire : </Text>
            <Text style={styles.text}>{'    '}{'    '}{'    '}{'    '}  {formData.fibrillation_valvulaire} </Text>
            <Text style={styles.text}>{'    '}{'    '}{'    '}{'    '}  {formData.fibrillation_type} , {formData.fibrillation_anticoagulée}</Text>
            <Text style={styles.text}>{'    '}{'    '}{'    '}{'    '}  {formData.fibrillation_anticoagulée}</Text>
            </View>
                )}
              {formData.cardioemboliqueContent
                .filter(term => term !== 'fibrillationAuriculaire') // Exclure "fibrillation articulaire"
                .map((term, i) => (
                  <Text key={i} style={styles.text}>{'    '}{'    '}- {term}</Text>
                ))
              }
             </View>)}
             

              { formData.athérothrombotique==="oui" && (
                    <View >
                      <Text style={styles.text}> Athérothrombotique :</Text>
                    
                      {formData.athérothrombotiqueContent
                        .map((term, i) => (
                          <Text key={i} style={styles.text}>{'    '}{'    '}- {term}</Text>
                        ))
                      }
              </View>)}

              { formData.lacune ==="oui"  && (
                    <View >
                      <Text style={styles.text}> Lacune :{formData.lacune}</Text>
                    
                     
              </View>)}
                    

              

              { formData.indeterminee === "oui" && (
                    <View >
                      <Text style={styles.text}> Indéterminée :  {formData.indeterminee}</Text>
                      
                          <Text style={styles.text}>{'    '}{'    '}- {formData.indetermineeContent}</Text>
                        
                      
                   
              </View>)}
   
              { formData.infotoast !==""  && (
                    <View >
                       <Text style={styles.text}> </Text>
                       <Text style={styles.text}> </Text>
                      <Text style={styles.text}> Informations complémentaires :  {formData.infotoast}</Text>
                    
              </View>)}
      

              <Text style={styles.text}></Text>
      <Text style={styles.text}></Text>
      <Text style={styles.text}></Text>
              </>
              }


{formData.ascod_mat &&
         <>
              <Text style={styles.subtitle} >Classification ASCOD: </Text>
    
              <Text style={styles.text}></Text>
      <Text style={styles.text}></Text>
      <Text style={styles.text}></Text>
      
        <Text style={styles.text}> A  : {formData.A}</Text>
   
        <Text style={styles.text}> S  : {formData.S}</Text>
    
        <Text style={styles.text}> C  : {formData.C}</Text>
   
        <Text style={styles.text}> O  : {formData.O}</Text>
     
    
        <Text style={styles.text}> D  : {formData.D}</Text>
    
        { formData.infocom !==""  && 
        <Text style={styles.text}>Informations complémentaires : {formData.infocom}</Text>
        }
</>
}
     
  
      </View>
}

      {/* <Text style={styles.subtitle}>Etiologie Retenue  : </Text>
      <View style={styles.borderedSection}>

      <View style={styles.checkboxrow}>
        <View style={[styles.checkbox, formData.microangiopathie && styles.checkedCheckbox]} />
        <Text style={styles.text}>  : Microangiopathie </Text>
      </View> 
      <View style={styles.checkboxrow}>
        <View style={[styles.checkbox, formData.angiopathieamyloidie && styles.checkedCheckbox]} />
        <Text style={styles.text}>  : Angiopathie Amyloidie </Text>
      </View>
      <View style={styles.checkboxrow}>
        <View style={[styles.checkbox, formData.malforamtionartérioveineuse && styles.checkedCheckbox]} />
        <Text style={styles.text}>  : Malformtion Artérioveineuse </Text>
      </View>
      <View style={styles.checkboxrow}>
        <View style={[styles.checkbox, formData.anévrysmerompu && styles.checkedCheckbox]} />
        <Text style={styles.text}>  : Anévrysme Rompu </Text>
      </View>
      <View style={styles.checkboxrow}>
        <View style={[styles.checkbox, formData.coagulopathieiatrogéne && styles.checkedCheckbox]} />
        <Text style={styles.text}>  : Coagulopathie iatrogéne </Text>
      </View>
      <View style={styles.checkboxrow}>
        <View style={[styles.checkbox, formData.coagulopathieconstitutionnelle && styles.checkedCheckbox]} />
        <Text style={styles.text}>  : Coagulopathie constitutionnelle </Text>
      </View>
      <View style={styles.checkboxrow}>
        <View style={[styles.checkbox, formData.tumeurcérébral && styles.checkedCheckbox]} />
        <Text style={styles.text}>  : Tumeur cérébral </Text>
      </View>
      <View style={styles.checkboxrow}>
        <View style={[styles.checkbox, formData.autres && styles.checkedCheckbox]} />
        <Text style={styles.text}>  : Autres </Text>
      </View>
      <View style={styles.checkboxrow}>
        <View style={[styles.checkbox, formData.indeterminee && styles.checkedCheckbox]} />
        <Text style={styles.text}>  : Indéterminée </Text>
      </View>
      </View> */}






{formData.consor_mat &&
<View  wrap={false}>
    
      <View style={styles.borderedSection}>
      <Text style={styles.subtitle}>Sortie :</Text>
        <Text style={styles.text}>NIHSS sortie : {formData.nihssSortie}</Text>
        <Text style={styles.text}>mRS sortie : {formData.mrsSortie}</Text>
        <Text style={styles.text}>LAST sortie : {formData.lastSortie}</Text>
        <Text style={styles.text}>Mode sortie : {formData.modeSortie}</Text>
        

        { formData.traitementSortie.length > 0 && (
                    <View >
                      <Text style={styles.centredtext}> Traitement de sortie :</Text>
                    
                      {formData.traitementSortie
                        .map((term, i) => (
                          <Text key={i} style={styles.text}>- {term}</Text>
                        ))
                      }
              </View>)}

   

        
        { formData.recommandationssortie.length > 0 && (
                    <View >
                      <Text style={styles.centredtext}> Recommandations de sortie :</Text>
                    
                      {formData.recommandationssortie
                        .map((term, i) => (
                          <Text key={i} style={styles.text}>- {term}</Text>
                        ))
                      }
              </View>)}


        <Text style={styles.centredtext}>Conclusion :</Text>
        <Text style={styles.text}>{formData.conclusionsortie}</Text>

      </View>


      </View>          }
           
            </View>
      );

      const LeftContent =(
         <View>
        <Image style={styles.logo} src={LogoS} />


        <View style={styles.borderedSection}>
        <Text style={styles.leftsubtitle}>Hopital SAHLOUL Route Ceinture-Cité Sahloul 4054 SOUSSE </Text>
        {/* <Text style={styles.textleft}>Route Ceinture-Cité Sahloul 4054 SOUSSE </Text> */}
        <Text style={styles.leftsubtitle}>Service : </Text>
        <Text style={styles.leftsubtitle}>Service de neurologie </Text>

        <View style={styles.minisectionleft}>
        <Text style={styles.textleft}>Chef de service </Text>
        <Text style={styles.textleft}>Pr. SANA BEN AMOR </Text>
        {/* <Text style={styles.textleft}>email: kaffekana@yahoo.fr </Text> */}

        {/* <Text style={styles.textleft}>Poste: 1417 </Text>
        <Text style={styles.textleft}>Fax: 0021673367451 </Text> */}
        </View>
{/* 
        


        <View style={styles.minisectionleft}>
        <Text style={styles.textleft}>Assistant Hopitalo-Universitaire: </Text>
        <Text style={styles.textleft}>Dr. Asma Nasr </Text>
        <Text style={styles.textleft}>Dr. Emna Jarrar </Text>
        <Text style={styles.textleft}> Poste: 1417 </Text>
        </View>


        <View style={styles.minisectionleft}>
        <Text style={styles.textleft}>Surveillant </Text>
        <Text style={styles.textleft}>Mr. Samir Ben Fredj </Text>
        <Text style={styles.textleft}> Poste: 1323 </Text>
        </View> */}


        <View style={styles.minisectionleft}> 
        <Text style={styles.textleft}>Secreteriat </Text>
        <Text style={styles.textleft}>Mme. HAMIDA GHARBI </Text>
        <Text style={styles.textleft}>Mme. NADIA OUNI </Text>
        {/* <Text style={styles.textleft}> Poste: 1307 </Text> */}
        </View>
        
        <View style={styles.minisectionleft}>
        <Text style={styles.textleft}>MCA </Text>
        <Text style={styles.textleft}>Dr. ANIS HASSINE </Text>
        <Text style={styles.textleft}>Dr. SALMA NAIJA </Text>
        <Text style={styles.textleft}> 1304 </Text>
        </View>

        <View style={styles.minisectionleft}>
        <Text style={styles.textleft}>AHU: </Text>   
        <Text style={styles.textleft}>Dr. EMNA JARRAR </Text>
        <Text style={styles.textleft}>Dr. KAWLA JEMAI </Text>
        <Text style={styles.textleft}>Dr. ARWA REKIK </Text>
        <Text style={styles.textleft}>Dr. Houssem Slimane</Text>
        <Text style={styles.textleft}>Dr. Ahmed Mili</Text>
        <Text style={styles.textleft}> Poste: 1417 </Text>
        </View>

        <View style={styles.minisectionleft}>
        <Text style={styles.textleft}>Surveillant(s) de service: </Text>
        <Text style={styles.textleft}>Mme. KARIMA TOUNSI </Text>
        </View>

      </View>
      </View>
      )

    
      


    const MyDocument = () => (
        <Document>
        {/* Create as many pages as needed to handle the right section overflow */}
        
          <Page  size="A4" style={styles.page}>
  
            <View style={styles.leftSection} fixed>
             
            {LeftContent}
            
            </View>
            <View style={styles.rightSection}>
            {RightContent}
            </View>
          </Page>
        
      </Document>
      );



  return(
    
           
             <MyDocument />
          
  )

    };

// ReactDOM.render(<App />, document.getElementById('root'));
export default PDF;