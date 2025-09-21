import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Navbar from "../../components/shared/Navbar";
import Sidenav from "../../components/shared/Sidenav";
import {
    Stack,
    createTheme,
    ThemeProvider,
    CssBaseline,
    Alert,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import HospitalisationDetails from "./HospitalisationDetails";
import Hospitaliere from "./Hospitaliere";
import Prehospitaliere from "./Prehospitaliere";
import Imagerie from "./Imagerie";
import MedicalIcon from "@mui/icons-material/MedicalServices";
import HealingIcon from "@mui/icons-material/Healing";
import ImageIcon from "@mui/icons-material/Image";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BiotechIcon from "@mui/icons-material/Biotech";
import ScienceIcon from "@mui/icons-material/Science";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ReportIcon from "@mui/icons-material/Report";
import Nihss from "./Nihss/Nihss";

import {
    Box,
    List,
    ListItem,
    ListItemText,
    Avatar,
    Typography,
    Button,
} from "@mui/material";
import Download from "./Download";
import PatientDetails from "./PatientDetails";
import PersonIcon from "@mui/icons-material/Person";

import axios from "axios";

import { useParams } from "react-router-dom";
import authHeader from "../../services/auth-header";
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
    backgroundColor: "#f1efef", // Custom background color
    color: "#999", // Custom text color
    "&:hover": {
        backgroundColor: "#d7daef", // Custom hover background color
    },
    // boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', // Adding shadow to buttons
};
const statusColors = {
    Empty: { backgroundColor: "#d3d3d3", color: "#444" }, // gray
    Accepté: { backgroundColor: "#A8E6A3", color: "#444" }, // green
    "En cours": { backgroundColor: "#FFFFAD", color: "#444" }, // yellow
    Refusé: { backgroundColor: "#F7CCCA", color: "#444" }, // red
};

let tabsConfig = [
    {
        key: "PatientDetails",
        label: "Patient Details",
        icon: <PersonIcon />,
        component: PatientDetails,
    },
    {
        key: "HospitalisationDetails",
        label: "Hospitalisation",
        icon: <MedicalIcon />,
        component: HospitalisationDetails,
    },
    {
        key: "Prehospitaliere",
        label: "Prehospitaliere",
        icon: <MedicalIcon />,
        component: Prehospitaliere,
    },
    {
        key: "Hospitaliere",
        label: "Hospitaliere",
        entity: "Hospitaliere",
        icon: <HealingIcon />,
        component: Hospitaliere,
    },
    {
        key: "ExamenClinique",
        label: "Examen Clinique",
        icon: <ScienceIcon />,
        component: ExamenClinique,
    },
    { key: "Nihss", label: "Nihss", icon: <ImageIcon />, component: Nihss },
    {
        key: "Imagerie",
        label: "Imagerie",
        icon: <ImageIcon />,
        component: Imagerie,
    },
    {
        key: "ConclusionInitiale",
        label: "Bilan Initial",
        icon: <AssessmentIcon />,
        component: ConclusionInitiale,
    },
    {
        key: "Conduiteàtenirinitiale",
        label: "Conduite à Tenir Initiale",
        icon: <AssessmentIcon />,
        component: ConduiteTenirInitiale,
    },
    {
        key: "Biologie",
        label: "Biologie",
        icon: <BiotechIcon />,
        component: Biologie,
    },
    {
        key: "ExamensComplementaires",
        label: "Examens Complémentaires",
        icon: <ScienceIcon />,
        component: ExamensComplementaires,
    },
    {
        key: "EvolutionClassification",
        label: "Évolution",
        icon: <BiotechIcon />,
        component: EvolutionClassification,
    },
    {
        key: "Etiologie",
        label: "Étiologie",
        icon: <BiotechIcon />,
        component: Etiologie,
    },
    {
        key: "ConclusionSortie",
        label: "Conclusion Sortie",
        icon: <BiotechIcon />,
        component: ConclusionSortie,
    },
    {
        key: "Download",
        label: "Rapport",
        icon: <ReportIcon />,
        component: Download,
    },
];

const PatientDossier = ({ mode }) => {
    const { idDossier, id, TypeAVC } = useParams();
    const [activeComponent, setActiveComponent] = useState("PatientDetails");
    const [tabsConfigList, setTabsConfigList] = useState(tabsConfig);
    const [tabsState, setTabState] = useState();
    const navigate = useNavigate();

    const [patientData, setPatientData] = useState({
        Nom: "",
        Prenom: "",

        email: "",
        telephone: "",
    });

    useEffect(() => {
        loadPatientDetails();
        getTabsState();
    }, []);
    const [error, setError] = useState(null);

    const getTabsState = async () => {
        try {
            fetch(
                `http://localhost:3000/api/review/tabStates/${encodeURIComponent(
                    id
                )}`,
                { headers: authHeader() }
            )
                .then((res) => res.json())
                .then((res) => setTabState(res));
        } catch (error) {
            setError(
                "Une erreur s'est produite lors de l'importation des TabStates"
            );
        }
    };

    useEffect(() => {
        if (tabsState) {
            setTabsConfigList(
                tabsConfig.map((e) => ({
                    ...e,
                    status:
                        tabsState.find(
                            (el) => el.tab.toLowerCase() == e.key.toLowerCase()
                        )?.status ?? "Empty",
                }))
            );
        }
    }, [tabsState]);
    useEffect(() => {
        console.log(tabsConfigList);
    }, [tabsConfigList]);

    const loadPatientDetails = async () => {
        try {
            const result = await axios.get(
                `http://localhost:3000/api/patient/getDetails/${encodeURIComponent(
                    idDossier
                )}`,
                { headers: authHeader() }
            );

            setPatientData(result.data);
        } catch (error) {
            setError(
                "Une erreur s'est produite lors de l'importation des données"
            );
        }
    };

    return (
        <>
            <Navbar />
            <Box height={30} />
            <Box sx={{ display: "flex" }}>
                <Sidenav />

                <Box sx={{ display: "flex", justifyContent: "left", p: 3 }}>
                    {/* <CssBaseline /> */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",

                            mt: 7,
                            alignItems: "center",
                            gap: 2,
                            p: 3,
                            bgcolor: "white",
                            border: "1px solid",
                            borderColor: "rgba(0, 0, 0, 0.1)", // Less black border
                            borderRadius: "12px",
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Added shadow
                            position: "sticky",
                            top: "20%",
                            width: "350px",
                        }}
                    >
                        {error && <Alert severity="error">{error}</Alert>}
                        <Avatar
                            src="/images/user7.png"
                            alt="setting"
                            sx={{
                                width: 160,
                                height: 160,
                                border: "1px dashed",
                                borderColor: "subMain",
                            }}
                        />
                        <Stack alignItems="center">
                            <Typography variant="h6">{`${patientData.Prenom} ${patientData.Nom}`}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {patientData.email}
                            </Typography>
                            <Typography variant="body2">
                                {patientData.telephone}
                            </Typography>
                        </Stack>
                        <Stack gap={2} width="100%" px={{ xs: 2, xl: 4 }}>
                            {tabsConfigList.map((tab, index) => (
                                <Button
                                    fullWidth
                                    onClick={() => setActiveComponent(tab.key)}
                                    startIcon={tab.icon}
                                    sx={{
                                        ...buttonStyles,
                                        ...(mode === "Review"
                                            ? statusColors[tab.status]
                                            : {}),
                                    }}
                                >
                                    {tab.label}
                                </Button>
                            ))}
                        </Stack>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        mt: 10,
                        mr: 5,
                        mb: 3,

                        gap: 2,
                        p: 3,
                        bgcolor: "white",
                        border: "1px solid",
                        borderColor: "rgba(0, 0, 0, 0.1)", // Less black border
                        borderRadius: "12px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Added shadow
                        position: "sticky",
                    }}
                >
                    {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}> */}

                    {(() => {
                        const activeTab = tabsConfigList.find(
                            (tab) => tab.key == activeComponent
                        );
                        return React.createElement(activeTab.component, {
                            mode,
                            ...(activeTab.entity && {
                                tabName: activeTab.entity,
                            }),
                        });
                    })()}

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
