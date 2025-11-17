import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import {
    Box, Typography, Stack, FormControlLabel, Checkbox, FormGroup,
    RadioGroup, Radio, TextField, Alert, Select, MenuItem, Grid
} from "@mui/material";
import apiServices from "../../services/api-services";
import SubmitButtons from "../../components/shared/SubmitButtons";
import Notifications from "../../components/shared/Notifications";
import PdfButton from "../../components/shared/PdfButton";
import { useComments } from "../../hooks/useComments";
import SectionCommentaires from "./sectionCommentaires";
import axios from "axios";
import authHeader from "../../services/auth-header";

// Configuration data
const TOAST_CONFIG = {
    atherothrombotique: [
        "Intracranien",
        "Extracranien TSA",
        "Crosse aortique",
        "Plaque non stésnosante active"
    ],
    cardioembolique: [
        "Fibrillation auriculaire",
        "Valve Mecanique", 
        "FEVG < 30%",
        "IDM aigu",
        "Akinesie Focale/anévrisme VG",
        "Endocarthide infectueuse",
        "Endocarthide non infectueuse",
        "Tumeur intracardiaque",
        "FOP Large/FOP-ASIA",
        "Autre"
    ]
};

const FIBRILLATION_OPTIONS = [
    { name: "fibrillation_valvulaire", options: ["Valvulaire", "Non valvulaire"] },
    { name: "fibrillation_type", options: ["Paroxystique", "Permanente"] },
    { name: "fibrillation_anticoagulee", options: ["Anticoagulée", "Non anticoagulée"] }
];

const INDETERMINE_OPTIONS = [
    "ESUS",
    "2 étiologies identifiés", 
    "Bilan non exhaustif"
];

const ASCOD_FIELDS = ["A", "S", "C", "O", "D"];

export default function Etiologie({ mode = "Edit", tabName }) {
    const { id } = useParams();
    const theme = createTheme({ palette: { primary: { main: "#0E8388" } } });

    // Consolidated state
    const [state, setState] = useState({
        isEditable: false,
        isASCODEditable: false,
        isDataAvailable: true,
        isDataASCODAvailable: true,
        error: null,
        error2: null,
        successMessage: "",
        TOASTData: {
            atherothrombotique: "non", atherothrombotiqueContent: [],
            cardioembolique: "non", cardioemboliqueContent: [],
            fibrillation_valvulaire: "", fibrillation_type: "", fibrillation_anticoagulee: "",
            lacune: "non", Indetermine: "non", IndetermineContent: "",
            info: "", matricule: id
        },
        ASCODData: { A: "", S: "", C: "", O: "", D: "", info: "", matricule: id }
    });

    // Comments functionality - separate from form data
    const {
        comments,
        addComment,
        editComment,
        deleteComment,
        loading: commentsLoading
    } = useComments('Etiologie', id, null); // No refresh callback to avoid form interference

    // Separate comment handler that doesn't trigger form validation
    const handleAddCommentSafe = async (message) => {
        try {
            await addComment(message);
            // Don't refresh form data, only comments
        } catch (error) {
            console.error('Error adding comment:', error);
            updateState({ error: 'Failed to add comment' });
        }
    };

    // Check if user is authenticated
    const isAuthenticated = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user && user.accessToken;
    };

    // Generic handlers
    const updateState = (updates) => setState(prev => ({ ...prev, ...updates }));
    
    const handleFormChange = (formType) => (e) => {
        const { name, value } = e.target;
        updateState({
            [formType]: { ...state[formType], [name]: value }
        });
    };

    const handleCheckboxToggle = (formType, field) => (e) => {
        const { name, checked } = e.target;
        
        if (field) {
            // Array field (content)
            const currentArray = state[formType][field] || [];
            const newArray = checked 
                ? [...currentArray, name]
                : currentArray.filter(item => item !== name);
            
            updateState({
                [formType]: { 
                    ...state[formType], 
                    [field]: newArray,
                    // Clear fibrillation data if unchecking Fibrillation auriculaire
                    ...(name === "Fibrillation auriculaire" && !checked && {
                        fibrillation_valvulaire: "",
                        fibrillation_type: "", 
                        fibrillation_anticoagulee: ""
                    })
                }
            });
        } else {
            // Boolean field
            updateState({
                [formType]: { 
                    ...state[formType], 
                    [name]: checked ? "oui" : "non",
                    // Clear content if unchecking parent
                    ...(!checked && [`${name}Content`] && { [`${name}Content`]: [] })
                }
            });
        }
    };

    const handleSubmit = (formType, endpoint) => (e) => {
        const stateKeys = formType === 'TOASTData' 
            ? { available: 'isDataAvailable', editable: 'isEditable', error: 'error' }
            : { available: 'isDataASCODAvailable', editable: 'isASCODEditable', error: 'error2' };
            
        apiServices.handleSubmit(
            e, state[formType], endpoint, 
            (msg) => updateState({ successMessage: msg }),
            state[stateKeys.available],
            (val) => updateState({ [stateKeys.available]: val }),
            (val) => updateState({ [stateKeys.editable]: val }),
            (err) => updateState({ [stateKeys.error]: err }),
            id
        );
    };

    // Reusable components
    const CheckboxSection = ({ title, field, options, showSubOptions = false }) => (
        <>
            <Stack direction="row" spacing={1} alignItems="center" mt={3}>
                <FormControlLabel
                    control={
                        <Checkbox
                            name={field}
                            disabled={!state.isEditable}
                            checked={state.TOASTData[field] === "oui"}
                            onChange={handleCheckboxToggle('TOASTData')}
                        />
                    }
                />
                <Typography variant="h6">{title}</Typography>
            </Stack>
            
            {state.TOASTData[field] === "oui" && options && (
                <FormGroup sx={{ marginLeft: 5 }}>
                    {options.map(option => (
                        <div key={option}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name={option}
                                        disabled={!state.isEditable}
                                        checked={state.TOASTData[`${field}Content`]?.includes(option)}
                                        onChange={handleCheckboxToggle('TOASTData', `${field}Content`)}
                                    />
                                }
                                label={option}
                            />
                            {showSubOptions && option === "Fibrillation auriculaire" && 
                             state.TOASTData[`${field}Content`]?.includes(option) && (
                                <Box sx={{ ml: 5 }}>
                                    {FIBRILLATION_OPTIONS.map(group => (
                                        <RadioGroup
                                            key={group.name}
                                            row
                                            name={group.name}
                                            value={state.TOASTData[group.name]}
                                            onChange={handleFormChange('TOASTData')}
                                        >
                                            {group.options.map(opt => (
                                                <FormControlLabel
                                                    key={opt}
                                                    value={opt}
                                                    control={<Radio />}
                                                    label={opt}
                                                    disabled={!state.isEditable}
                                                />
                                            ))}
                                        </RadioGroup>
                                    ))}
                                </Box>
                            )}
                        </div>
                    ))}
                </FormGroup>
            )}
        </>
    );

    useEffect(() => {
        apiServices.loadDossierDetails(
            (data) => updateState({ TOASTData: data }),
            "etiologie/toast", 
            (val) => updateState({ isDataAvailable: val }),
            (err) => updateState({ error: err }), 
            id
        );
        apiServices.loadDossierDetails(
            (data) => updateState({ ASCODData: data }),
            "etiologie/ascod",
            (val) => updateState({ isDataASCODAvailable: val }),
            (err) => updateState({ error2: err }),
            id
        );
    }, []);

    // Approval function
    const approveEtiologie = async () => {
        try {
            const response = await axios.put(
                `/api/review/Etiologie/${id}/approve`,
                {},
                { headers: authHeader() }
            );
            if (response.status === 200) {
                updateState({ successMessage: 'Section approved successfully' });
                // Refresh data to get updated approval status
                apiServices.loadDossierDetails(
                    (data) => updateState({ TOASTData: data }),
                    "etiologie/toast", 
                    (val) => updateState({ isDataAvailable: val }),
                    (err) => updateState({ error: err }), 
                    id
                );
            }
        } catch (error) {
            console.error('Error approving section:', error);
            updateState({ error: 'Failed to approve section' });
        }
    };

    return (
        <ThemeProvider theme={theme}>
            {/* TOAST Form */}
            <form onSubmit={handleSubmit('TOASTData', 'etiologie/toast')}>
                <Box sx={{ mt: 4, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
                    {state.error && <Alert severity="info">{state.error}</Alert>}
                    
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h4">TOAST</Typography>
                        <PdfButton pdfUrl="../pdf/TOAST.pdf" />
                    </Box>

                    <CheckboxSection 
                        title="Athérothrombotique" 
                        field="atherothrombotique" 
                        options={TOAST_CONFIG.atherothrombotique} 
                    />
                    
                    <CheckboxSection 
                        title="Cardioembolique" 
                        field="cardioembolique" 
                        options={TOAST_CONFIG.cardioembolique}
                        showSubOptions={true}
                    />
                    
                    <CheckboxSection title="Lacune" field="lacune" />
                    
                    <CheckboxSection title="Indéterminée" field="Indetermine" />
                    {state.TOASTData.Indetermine === "oui" && (
                        <RadioGroup
                            name="IndetermineContent"
                            value={state.TOASTData.IndetermineContent}
                            onChange={handleFormChange('TOASTData')}
                            sx={{ ml: 5 }}
                        >
                            {INDETERMINE_OPTIONS.map(option => (
                                <FormControlLabel
                                    key={option}
                                    value={option}
                                    control={<Radio />}
                                    label={option === "ESUS" ? "ESUS:Bilan étiologique négatif" : option}
                                    disabled={!state.isEditable}
                                />
                            ))}
                        </RadioGroup>
                    )}

                    <TextField
                        name="info"
                        label="informations complémentaires"
                        disabled={!state.isEditable}
                        value={state.TOASTData.info}
                        onChange={handleFormChange('TOASTData')}
                        multiline rows={6} variant="outlined" fullWidth
                        sx={{ mt: 2 }}
                    />

                    <SubmitButtons
                        handleSubmit={handleSubmit('TOASTData', 'etiologie/toast')}
                        isDataAvailable={state.isDataAvailable}
                        setIsEditable={(val) => updateState({ isEditable: val })}
                        isEditable={state.isEditable}
                        onSubmitComment={handleAddCommentSafe}
                        mode={mode}
                        onApprove={approveEtiologie}
                        tabName={tabName}
                    />
                </Box>
            </form>

            {/* ASCOD Form */}
            <form onSubmit={handleSubmit('ASCODData', 'etiologie/ascod')}>
                <Box sx={{ mt: 4, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
                    {state.error2 && <Alert severity="info">{state.error2}</Alert>}
                    
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <Typography variant="h4">ASCOD</Typography>
                        <PdfButton pdfUrl="../pdf/ASCOD.pdf" />
                    </Box>

                    {ASCOD_FIELDS.map(field => (
                        <Grid container spacing={2} key={field} sx={{ mb: 2 }}>
                            <Grid item xs={4}>
                                <Typography>{field} ({
                                    {A: 'Atheroclerosis', S: 'Small-vessel disease', C: 'Cardiac pathology', 
                                     O: 'Other cause', D: 'Dissection'}[field]
                                })</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Select
                                    name={field}
                                    value={state.ASCODData[field]}
                                    onChange={handleFormChange('ASCODData')}
                                    disabled={!state.isASCODEditable}
                                    fullWidth
                                >
                                    {[1,2,3].map(num => <MenuItem key={num} value={num}>{num}</MenuItem>)}
                                </Select>
                            </Grid>
                        </Grid>
                    ))}

                    <TextField
                        name="info"
                        label="informations complémentaires"
                        disabled={!state.isASCODEditable}
                        value={state.ASCODData.info}
                        onChange={handleFormChange('ASCODData')}
                        multiline rows={6} variant="outlined" fullWidth
                        sx={{ mt: 2 }}
                    />

                    <SubmitButtons
                        handleSubmit={handleSubmit('ASCODData', 'etiologie/ascod')}
                        isDataAvailable={state.isDataASCODAvailable}
                        setIsEditable={(val) => updateState({ isASCODEditable: val })}
                        isEditable={state.isASCODEditable}
                        onSubmitComment={handleAddCommentSafe}
                        mode={mode}
                        onApprove={approveEtiologie}
                        tabName={tabName}
                    />
                </Box>
            </form>

            {/* Comments Section - Completely separate from form */}
            {isAuthenticated() && (
                <SectionCommentaires
                    comments={comments}
                    onEditComment={editComment}
                    onDeleteComment={deleteComment}
                    loading={commentsLoading}
                />
            )}

            {state.successMessage && (
                <Notifications
                    Message={state.successMessage}
                    setMessage={(msg) => updateState({ successMessage: msg })}
                />
            )}
        </ThemeProvider>
    );
}