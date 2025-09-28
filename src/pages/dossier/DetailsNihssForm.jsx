import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Alert,
  Stack
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import apiServices from "../../services/api-services";

function DetailsNihssForm({ handleClose, idNihss, setData, setNihssData, setSuccessMessage }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [NihssData, setNihssDataLocal] = useState({
    categorie: '',
    date: new Date(),
    totalAuto: '',
    vigilance: '',
    orientation: '',
    commandes: '',
    oculomotricite: '',
    champVisuel: '',
    paralysieFaciale: '',
    motriciteMembreSupG: '',
    motriciteMembreSupD: '',
    motriciteMembreIntG: '',
    motriciteMembreIntD: '',
    ataxie: '',
    sensibilite: '',
    langage: '',
    dysarthrie: '',
    extinctionNegligence: '',
  });

  const valueRange = {
    vigilance: 3,
    orientation: 2,
    commandes: 2,
    oculomotricite: 2,
    champVisuel: 3,
    paralysieFaciale: 3,
    motriciteMembreSupG: 4,
    motriciteMembreSupD: 4,
    motriciteMembreIntG: 4,
    motriciteMembreIntD: 4,
    ataxie: 2,
    sensibilite: 2,
    langage: 3,
    dysarthrie: 2,
    extinctionNegligence: 2,
  };

  // Load existing NIHSS data
  useEffect(() => {
    const loadNihssData = async () => {
      if (idNihss) {
        try {
          setIsLoading(true);
          const data = await apiServices.loadDossierDetails(
            setNihssDataLocal,
            "nihss",
            () => {},
            setError,
            idNihss
          );
          if (data) {
            setNihssDataLocal(data);
          }
        } catch (error) {
          setError("Erreur lors du chargement des données NIHSS");
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadNihssData();
  }, [idNihss]);

  const totalCalc = () => {
    const total = [
      'vigilance',
      'orientation',
      'commandes',
      'oculomotricite',
      'champVisuel',
      'paralysieFaciale',
      'motriciteMembreSupG',
      'motriciteMembreSupD',
      'motriciteMembreIntG',
      'motriciteMembreIntD',
      'ataxie',
      'sensibilite',
      'langage',
      'dysarthrie',
      'extinctionNegligence',
    ].reduce((acc, key) => {
      const value = parseInt(NihssData[key], 10);
      return acc + (isNaN(value) ? 0 : value);
    }, 0);

    setNihssDataLocal((prevState) => ({
      ...prevState,
      totalAuto: total,
    }));
  };

  useEffect(() => {
    if (!isLoading) {
      totalCalc();
    }
  }, [NihssData, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNihssDataLocal((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (fieldName, value) => {
    setNihssDataLocal((prevData) => ({
      ...prevData,
      [fieldName]: value.toString(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update the parent components with the new data
    if (setNihssData) {
      setNihssData(NihssData);
    }
    
    apiServices.handleSubmitModal(
      e,
      NihssData,
      "nihss",
      setSuccessMessage,
      true,
      handleClose,
      setError,
      idNihss
    );
  };

  const renderRadioGroup = (label, fieldName, maxValue) => (
    <Box sx={{ 
      mb: 3, 
      p: 2, 
      border: '1px solid #e0e0e0', 
      borderRadius: 1,
      backgroundColor: 'transparent'
    }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: 'medium', color: '#333' }}>
            {label}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <RadioGroup 
              row 
              value={NihssData[fieldName]} 
              onChange={(e) => handleRadioChange(fieldName, e.target.value)}
              sx={{ gap: 1 }}
            >
              {[...Array(maxValue + 1).keys()].map((value) => (
                <Box
                  key={value}
                  sx={{
                    border: NihssData[fieldName] === value.toString() 
                      ? '2px solid #0E8388' 
                      : '1px solid #ccc',
                    borderRadius: 1,
                    backgroundColor: NihssData[fieldName] === value.toString() 
                      ? '#e8f5f4' 
                      : 'white',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: NihssData[fieldName] === value.toString() 
                        ? '#d1f2f0' 
                        : '#f5f5f5',
                      borderColor: '#0E8388'
                    }
                  }}
                >
                  <FormControlLabel
                    value={value.toString()}
                    control={
                      <Radio
                        sx={{ 
                          color: '#0E8388',
                          '&.Mui-checked': {
                            color: '#0E8388',
                          }
                        }}
                      />
                    }
                    label={
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontWeight: NihssData[fieldName] === value.toString() ? 'bold' : 'normal',
                          minWidth: '20px',
                          textAlign: 'center'
                        }}
                      >
                        {value.toString()}
                      </Typography>
                    }
                    sx={{ 
                      m: 0,
                      p: 1,
                      minWidth: '60px',
                      justifyContent: 'center'
                    }}
                  />
                </Box>
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );

  if (isLoading) {
    return (
      <Box sx={{ p: 3, width: '100%', maxWidth: '90vw', minWidth: 600, textAlign: 'center' }}>
        <Typography>Chargement des données NIHSS...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, width: '100%', maxWidth: '90vw', minWidth: 600 }}>
      {error && <Alert severity="error">{error}</Alert>}
      
      <Typography variant="h4" gutterBottom>
        Détails NIHSS
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* Date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={dayjs(NihssData.date)}
              onChange={(newValue) => {
                setNihssDataLocal((prevData) => ({
                  ...prevData,
                  date: newValue ? newValue.toDate() : new Date(),
                }));
              }}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>

          {/* Categorie */}
          <TextField
            label="Catégorie"
            name="categorie"
            value={NihssData.categorie || ''}
            onChange={handleChange}
            fullWidth
          />

          {/* NIHSS Fields with Radio Buttons */}
          {renderRadioGroup("Vigilance", "vigilance", valueRange.vigilance)}
          {renderRadioGroup("Orientation", "orientation", valueRange.orientation)}
          {renderRadioGroup("Commandes", "commandes", valueRange.commandes)}
          {renderRadioGroup("Oculomotricité", "oculomotricite", valueRange.oculomotricite)}
          {renderRadioGroup("Champ Visuel", "champVisuel", valueRange.champVisuel)}
          {renderRadioGroup("Paralysie Faciale", "paralysieFaciale", valueRange.paralysieFaciale)}
          {renderRadioGroup("Motricité Membre Sup. (G)", "motriciteMembreSupG", valueRange.motriciteMembreSupG)}
          {renderRadioGroup("Motricité Membre Sup. (D)", "motriciteMembreSupD", valueRange.motriciteMembreSupD)}
          {renderRadioGroup("Motricité Membre Inf. (G)", "motriciteMembreIntG", valueRange.motriciteMembreIntG)}
          {renderRadioGroup("Motricité Membre Inf. (D)", "motriciteMembreIntD", valueRange.motriciteMembreIntD)}
          {renderRadioGroup("Ataxie", "ataxie", valueRange.ataxie)}
          {renderRadioGroup("Sensibilité", "sensibilite", valueRange.sensibilite)}
          {renderRadioGroup("Langage", "langage", valueRange.langage)}
          {renderRadioGroup("Dysarthrie", "dysarthrie", valueRange.dysarthrie)}
          {renderRadioGroup("Extinction / Négligence", "extinctionNegligence", valueRange.extinctionNegligence)}

          {/* Total */}
          <TextField
            label="Total Auto"
            name="totalAuto"
            value={NihssData.totalAuto || ''}
            disabled
            fullWidth
          />

          {/* Submit Button */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button onClick={handleClose} variant="outlined">
              Annuler
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Mettre à jour
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}

export default DetailsNihssForm;
