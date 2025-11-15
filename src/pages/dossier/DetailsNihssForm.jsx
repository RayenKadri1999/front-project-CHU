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
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import apiServices from "../../services/api-services";
import { Send } from "lucide-react";

function DetailsNihssForm({ handleClose, idNihss, setData, setNihssData, setSuccessMessage }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [NihssData, setNihssDataLocal] = useState({
    categorie: '',
    date: new Date(),
    heure: new Date(),
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
    vigilance: 4,
    orientation: 4,
    commandes: 4,
    oculomotricite: 4,
    champVisuel: 4,
    paralysieFaciale: 4,
    motriciteMembreSupG: 4,
    motriciteMembreSupD: 4,
    motriciteMembreIntG: 4,
    motriciteMembreIntD: 4,
    ataxie: 4,
    sensibilite: 4,
    langage: 4,
    dysarthrie: 4,
    extinctionNegligence: 4,
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

  const handleChangeDate = (name) => (value) => {
    const updatedDateTime = dayjs(NihssData[name]).set('year', value.year())
      .set('month', value.month())
      .set('date', value.date());

    setNihssDataLocal((prevData) => ({
      ...prevData,
      [name]: updatedDateTime,
    }));
  };

  const handleChangeTime = (name) => (value) => {
    const updatedDateTime = dayjs(NihssData[name]).set('hour', value.hour())
      .set('minute', value.minute());

    setNihssDataLocal((prevData) => ({
      ...prevData,
      [name]: updatedDateTime,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('DetailsNihssForm handleSubmit called');
    console.log('NihssData:', NihssData);
    console.log('idNihss:', idNihss);
    
    // Update the parent components with the new data
    if (setNihssData) {
      setNihssData(NihssData);
    }
    
    // Close the modal - let the parent handle the actual API submission
    handleClose();
  };

  const renderRadioGroup = (label, fieldName, maxValue) => (
    <React.Fragment>
      <Grid item xs={4}>
        <Typography variant="h6" sx={{ fontWeight: 'medium', color: '#333' }}>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <RadioGroup 
            row 
            value={NihssData[fieldName] || ''} 
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
    </React.Fragment>
  );

  if (isLoading) {
    return (
      <Box sx={{ p: 3, width: '100%', maxWidth: '90vw', minWidth: 600, textAlign: 'center' }}>
        <Typography>Chargement des données NIHSS...</Typography>
      </Box>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography variant="h4">Détails NIHSS</Typography>
      </Box>
      
      {error && <Alert severity="error">{error}</Alert>}
      
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          
          {/* Categorie */}
          <Grid item xs={4}>
            <Typography variant="h6">Catégorie</Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Catégorie"
              type="text"
              name="categorie"
              value={NihssData.categorie || ''}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          {/* Date */}
          <Grid item xs={4}>
            <Typography variant="h6">Date</Typography>
          </Grid>
          <Grid item xs={8}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                name="date"
                onChange={handleChangeDate('date')}
                value={dayjs(NihssData.date)}
                format="DD/MM/YYYY"
                required
              />
            </LocalizationProvider>
          </Grid>

          {/* Heure */}
          <Grid item xs={4}>
            <Typography variant="h6">Heure</Typography>
          </Grid>
          <Grid item xs={8}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]}>
                <TimePicker
                  label="Heure"
                  required
                  value={dayjs(NihssData.heure)}
                  onChange={handleChangeTime('heure')}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>

          {/* NIHSS Fields with Radio Buttons */}
          {renderRadioGroup("Vigilance", "vigilance", valueRange.vigilance)}
          {renderRadioGroup("Orientation", "orientation", valueRange.orientation)}
          {renderRadioGroup("Commandes", "commandes", valueRange.commandes)}
          {renderRadioGroup("Oculomotricité", "oculomotricite", valueRange.oculomotricite)}
          {renderRadioGroup("Champ Visuel", "champVisuel", valueRange.champVisuel)}
          {renderRadioGroup("Paralysie Faciale", "paralysieFaciale", valueRange.paralysieFaciale)}
          {renderRadioGroup("Motricité Membre Sup (G)", "motriciteMembreSupG", valueRange.motriciteMembreSupG)}
          {renderRadioGroup("Motricité Membre Sup (D)", "motriciteMembreSupD", valueRange.motriciteMembreSupD)}
          {renderRadioGroup("Motricité Membre Int (G)", "motriciteMembreIntG", valueRange.motriciteMembreIntG)}
          {renderRadioGroup("Motricité Membre Int (D)", "motriciteMembreIntD", valueRange.motriciteMembreIntD)}
          {renderRadioGroup("Ataxie", "ataxie", valueRange.ataxie)}
          {renderRadioGroup("Sensibilité", "sensibilite", valueRange.sensibilite)}
          {renderRadioGroup("Langage", "langage", valueRange.langage)}
          {renderRadioGroup("Dysarthrie", "dysarthrie", valueRange.dysarthrie)}
          {renderRadioGroup("Extinction Négligence", "extinctionNegligence", valueRange.extinctionNegligence)}

          {/* Total */}
          <Grid item xs={4}>
            <Typography variant="h4">Total</Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Total"
              type="number"
              name="totalAuto"
              value={NihssData.totalAuto || ''}
              disabled={true}
              margin="normal"
            />
          </Grid>

        </Grid>
      </Box>
      
      <Box height={30} />
      <Stack direction="row" spacing={2}>
        <Button
          type="submit"
          variant="contained"
          endIcon={<Send />}
          className="button"
        >
          Mettre à jour
        </Button>
        <Button onClick={handleClose} variant="outlined">
          Annuler
        </Button>
      </Stack>
    </form>
  );
}

export default DetailsNihssForm;
