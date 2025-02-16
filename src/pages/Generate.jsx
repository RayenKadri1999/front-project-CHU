import React, { useState } from 'react';
import axios from 'axios';
import Excel from './../images/excel.jpeg';
import Spss from './../images/spss.jpeg';
import Csv from './../images/csv-icon-1791x2048-ot22nr8i.png';
import { Box, ThemeProvider } from "@mui/material";
import Navbar from "../components/shared/Navbar";
import Sidenav from "../components/shared/Sidenav";
import { createTheme } from "@mui/material/styles";
import authHeader from "../services/auth-header";

const theme = createTheme({
    palette: {
        primary: {
            main: "#0E8388",
        },
    },
});

const Generate = () => {
    const [selectedFormat, setSelectedFormat] = useState('');

    const handleFormatChange = (event) => {
        setSelectedFormat(event.target.value);
        console.log(event.target.value)
    };

    const handleGenerateClick = async () => {
        if (!selectedFormat) {
            alert('Please select a format');
            return;
        }
        try {
            // Make a GET request to the backend with the selected format as a query parameter
            const response = await axios.get(
                `http://localhost:3000/api/download/exportexcel`,
                {
                    headers: authHeader(),
                    responseType: 'blob', // Ensures the file is received as a Blob
                }
            );

            // Create a link element for the file download
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            const date = new Date(Date.now());
            link.setAttribute('download', `${selectedFormat}-${date.toISOString()}-file.xlsx`); // Use correct extension
            document.body.appendChild(link);
            link.click(); // Trigger the download

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url); // Free up memory
        } catch (error) {
            console.error('Error generating file:', error);
            alert('Failed to generate file');
        }
    };


    const getFileExtension = (format) => {
        switch (format) {
            case 'Excel':
                return 'excel';
            case 'Spss':
                return 'sav';
            case 'Csv':
                return 'csv';
            default:
                return 'txt';
        }
    };

    return (
        <>
            <Navbar />
            <Box height={30} />
            <Box sx={{ display: "flex" }}>
                <Sidenav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <ThemeProvider theme={theme}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h1 className="mt-5 ml-5">Transformer</h1>
                        </div>
                        <div style={styles.container}>
                            <h1 style={styles.title}>Création des fichiers</h1>
                            <div style={styles.radioContainer}>
                                <div style={styles.radioItem}>
                                    <img src={Excel} alt="Excel" style={styles.image} />
                                    <input type="radio" id="option1" name="options" value="Excel" onChange={handleFormatChange} style={styles.radio} />
                                    <label htmlFor="option1" style={styles.label}>Excel</label>
                                </div>
                                <div style={styles.radioItem}>
                                    <img src={Spss} alt="Spss" style={styles.image} />
                                    <input type="radio" id="option2" name="options" value="Spss" onChange={handleFormatChange} style={styles.radio} />
                                    <label htmlFor="option2" style={styles.label}>Spss</label>
                                </div>
                                <div style={styles.radioItem}>
                                    <img src={Csv} alt="Csv" style={styles.image} />
                                    <input type="radio" id="option3" name="options" value="Csv" onChange={handleFormatChange} style={styles.radio} />
                                    <label htmlFor="option3" style={styles.label}>CSV</label>
                                </div>
                            </div>
                            <button style={styles.button} onClick={handleGenerateClick}>
                                Générer
                            </button>
                        </div>
                    </ThemeProvider>
                </Box>
            </Box>
        </>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        margin: 'auto',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333',
    },
    radioContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
    radioItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    image: {
        width: '60px',
        height: '60px',
        objectFit: 'cover',
        marginBottom: '8px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    radio: {
        marginBottom: '4px',
    },
    label: {
        fontSize: '16px',
        color: '#555',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default Generate;
