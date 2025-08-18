import React from "react";

import Box from "@mui/material/Box";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

import { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Alert, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { PlusIcon, Upload, FileImage } from "lucide-react";
import { DataGrid } from "@mui/x-data-grid";
import authHeader from "../../services/auth-header";
import Notifications from "../../components/shared/Notifications";

export default function ImagerieNumerique() {
    const columns = [
        { field: "fileName", headerName: "Nom du fichier", width: 200 },
        { field: "fileType", headerName: "Type", width: 120 },
        { field: "fileSize", headerName: "Taille", width: 120 },
        { field: "uploadDate", headerName: "Date d'upload", width: 180 },
        { field: "scanType", headerName: "Type de scan", width: 150 },
        {
            field: "actions",
            headerName: "ACTIONS",
            width: 300,
            renderCell: (params) => (
                <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                >
                    <Button
                        variant="text"
                        onClick={() => downloadMriScan(params.row._id)}
                    >
                        Télécharger
                    </Button>
                    <Button
                        variant="text"
                        color="error"
                        onClick={() => deleteMriScan(params.row._id)}
                    >
                        Supprimer
                    </Button>
                </div>
            ),
        },
    ];

    const theme = createTheme({
        palette: {
            primary: {
                main: "#0E8388",
            },
        },
    });

    const navigate = useNavigate();
    const { idDossier, id } = useParams();
    const [successMessage, setSuccessMessage] = useState("");

    const [openUpload, setOpenUpload] = useState(false);
    const [mriScansList, setMriScansList] = useState([]);
    const [error, setError] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const loadMriScans = async () => {
        try {
            const result = await axios.get(
                `http://localhost:1234/api/mri-scans/get/${id}`,
                { headers: authHeader() }
            );

            if (result.data) {
                setMriScansList(result.data);
            }
        } catch (error) {
            setError(
                "Une erreur s'est produite lors de l'importation des données"
            );
        }
    };

    useEffect(() => {
        loadMriScans();
    }, [successMessage]);

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
    };

    const uploadMriScans = async () => {
        if (selectedFiles.length === 0) {
            setError("Veuillez sélectionner au moins un fichier");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        
        selectedFiles.forEach((file, index) => {
            formData.append('mriScans', file);
        });
        
        formData.append('patientId', id);
        formData.append('dossierId', idDossier);

        try {
            const response = await axios.post(
                `http://localhost:1234/api/mri-scans/upload`,
                formData,
                {
                    headers: {
                        ...authHeader(),
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            setSuccessMessage("Scans IRM uploadés avec succès");
            setSelectedFiles([]);
            setOpenUpload(false);
            loadMriScans();
        } catch (error) {
            setError("Erreur lors de l'upload des scans IRM");
        } finally {
            setUploading(false);
        }
    };

    const deleteMriScan = async (scanId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce scan IRM ?")) {
            try {
                await axios.delete(
                    `http://localhost:1234/api/mri-scans/delete/${scanId}`,
                    { headers: authHeader() }
                );
                setSuccessMessage("Scan IRM supprimé avec succès");
                loadMriScans();
            } catch (error) {
                setError("Erreur lors de la suppression du scan IRM");
            }
        }
    };


    const downloadMriScan = async (scanId) => {
        try {
            const response = await axios.get(
                `http://localhost:1234/api/mri-scans/download/${scanId}`,
                {
                    headers: authHeader(),
                    responseType: 'blob',
                }
            );
            
            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `mri-scan-${scanId}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            setError("Erreur lors du téléchargement du scan IRM");
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleOpen = (setOpenfunc) => {
        setOpenfunc(true);
    };

    const handleClose = (setOpenfunc) => {
        setOpenfunc(false);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{ display: "flex" }}>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        {error && <Alert severity="error">{error}</Alert>}
                        
                        <Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    mb: 3,
                                }}
                            >
                                <Typography variant="h4" gutterBottom>
                                   Imagerie Numérique - Scans IRM
                                </Typography>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleOpen(setOpenUpload)}
                                    startIcon={<Upload />}
                                    sx={{
                                        position: "absolute",
                                        right: 50,
                                    }}
                                >
                                    Uploader Scans
                                </Button>
                            </Box>
                            
                            <div style={{ height: 400, width: "100%" }}>
                                <DataGrid
                                    rows={mriScansList}
                                    columns={columns}
                                    pageSize={5}
                                    checkboxSelection
                                    getRowId={(row) => row._id}
                                />
                            </div>
                        </Box>

                        {/* Upload Dialog */}
                        <Dialog 
                            open={openUpload} 
                            onClose={() => handleClose(setOpenUpload)}
                            maxWidth="md"
                            fullWidth
                        >
                            <DialogTitle>
                                Uploader des Scans IRM
                            </DialogTitle>
                            <DialogContent>
                                <Box sx={{ mt: 2, mb: 2 }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        Formats acceptés: DICOM (.dcm, .dicom), NIfTI (.nii, .nii.gz), 
                                        MINC (.mnc, .mnc.gz), TIFF (.tif, .tiff), PNG, JPEG
                                    </Typography>
                                    
                                    <input
                                        type="file"
                                        multiple
                                        accept=".dcm,.dicom,.nii,.nii.gz,.mnc,.mnc.gz,.tif,.tiff,.png,.jpg,.jpeg"
                                        onChange={handleFileSelect}
                                        style={{ 
                                            width: '100%',
                                            padding: '10px',
                                            border: '2px dashed #0E8388',
                                            borderRadius: '8px',
                                            backgroundColor: '#f5f5f5',
                                            cursor: 'pointer'
                                        }}
                                    />
                                    
                                    {selectedFiles.length > 0 && (
                                        <Box sx={{ mt: 2 }}>
                                            <Typography variant="h6" gutterBottom>
                                                Fichiers sélectionnés ({selectedFiles.length}):
                                            </Typography>
                                            {selectedFiles.map((file, index) => (
                                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                    <FileImage size={16} style={{ marginRight: 8 }} />
                                                    <Typography variant="body2">
                                                        {file.name} ({formatFileSize(file.size)})
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    )}
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button 
                                    onClick={() => handleClose(setOpenUpload)}
                                    disabled={uploading}
                                >
                                    Annuler
                                </Button>
                                <Button 
                                    onClick={uploadMriScans}
                                    variant="contained"
                                    disabled={uploading || selectedFiles.length === 0}
                                >
                                    {uploading ? "Upload en cours..." : "Uploader"}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </Box>
                
                {successMessage && (
                    <Notifications
                        Message={successMessage}
                        setMessage={setSuccessMessage}
                    />
                )}
            </ThemeProvider>
        </>
    );
}