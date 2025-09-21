import { Button, styled, TextField, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React, { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { Grid, MenuItem, Select } from "@mui/material";
import { SendIcon, PlusIcon, InfoIcon } from "lucide-react";
import authHeader from "../../services/auth-header";
import PdfButton from "../../components/shared/PdfButton";

const AddNihssForm = ({ handleClose, setData, setNihssData, setSuccessMessage }) => {
  const [PreData, setPreData] = useState({
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

  useEffect(() => {
    totalCalc();
  }, [PreData]);

  const handleChangeDate = (name) => (value) => {
    console.log(PreData[name]);
    const updatedDateTime = dayjs(PreData[name]).set('year', value.year())
      .set('month', value.month())
      .set('date', value.date());
    console.log((updatedDateTime));

    setPreData((prevData) => ({
      ...prevData,
      [name]: updatedDateTime,
    }));
  };

  const handleChangeTime = (name) => (value) => {
    const updatedDateTime = dayjs(PreData[name]).set('hour', value.hour())
      .set('minute', value.minute());

    setPreData((prevData) => ({
      ...prevData,
      [name]: updatedDateTime,
    }));
  };

  const [error, setError] = useState(null);

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
      const value = parseInt(PreData[key], 10);
      return acc + (isNaN(value) ? 0 : value);
    }, 0);

    setPreData((prevState) => ({
      ...prevState,
      totalAuto: total,
    }));
  };

  const [createSuccess, setCreateSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle radio button changes for score fields
  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setPreData((prevData) => ({
      ...prevData,
      [name]: parseInt(value, 10), // Convert to number to match original behavior
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setCreateSuccess(true);

    setNihssData((prevState) => ({
      ...prevState,
      ...PreData
    }));

    setData(prevData => ({
      ...prevData,
      NIHSSValue: PreData.totalAuto,
    }));

    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography variant="h4"> Nouveau NIHSS </Typography>
        <PdfButton pdfUrl="../../../public/pdf/ScoreNIHSS.pdf" />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          
          {/* Categorie */}
          <Grid item xs={4}>
            <Typography variant="h6">Categorie</Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Categorie"
              type="text"
              name="categorie"
              value={PreData.categorie}
              onChange={handleChange}
              required
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
                label="Date.."
                name="date"
                onChange={handleChangeDate('date')}
                required
                value={dayjs(PreData.date)}
                format="DD/MM/YYYY"
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
                  value={dayjs(PreData.date)}
                  onChange={handleChangeTime('date')}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>

          {/* Score Fields with Radio Buttons */}
          {[
            { label: 'Vigilance', name1: 'vigilance' },
            { label: 'Orientation', name1: 'orientation' },
            { label: 'Commandes', name1: 'commandes' },
            { label: 'Oculomotricité', name1: 'oculomotricite' },
            { label: 'Champ Visuel', name1: 'champVisuel' },
            { label: 'Paralysie Faciale', name1: 'paralysieFaciale' },
            { label: 'Motricité Membre Sup (G)', name1: 'motriciteMembreSupG' },
            { label: 'Motricité Membre Sup (D)', name1: 'motriciteMembreSupD' },
            { label: 'Motricité Membre Int (G)', name1: 'motriciteMembreIntG' },
            { label: 'Motricité Membre Int (D)', name1: 'motriciteMembreIntD' },
            { label: 'Ataxie', name1: 'ataxie' },
            { label: 'Sensibilité', name1: 'sensibilite' },
            { label: 'Langage', name1: 'langage' },
            { label: 'Dysarthrie', name1: 'dysarthrie' },
            { label: 'Extinction Négligence', name1: 'extinctionNegligence' },
          ].map((group, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#ffffff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: 2,
                    margin: '4px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      minWidth: '250px',
                      fontWeight: 500,
                      color: '#333'
                    }}
                  >
                    {group.label}
                  </Typography>
                  
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      name={group.name1}
                      value={PreData[group.name1]}
                      onChange={handleRadioChange}
                      sx={{
                        gap: 3,
                        '& .MuiFormControlLabel-root': {
                          margin: 0,
                          padding: '8px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          backgroundColor: '#fff',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: '#f0f0f0',
                            borderColor: '#0E8388'
                          }
                        },
                        '& .Mui-checked + .MuiFormControlLabel-label': {
                          fontWeight: 'bold'
                        },
                        '& .MuiFormControlLabel-root.Mui-checked': {
                          backgroundColor: '#f0f0f0'  ,
                          borderColor: '#0E8388',
                          color: '#0E8388'
                        }
                      }}
                    >
                      {[0, 1, 2, 3, 4].map((value) => (
                        <FormControlLabel
                          key={value}
                          value={value}
                          control={<Radio size="small" />}
                          label={value.toString()}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Grid>
            </React.Fragment>
          ))}

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
              value={PreData.totalAuto}
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
          endIcon={<SendIcon />}
          className="button"
        >
          Enregistrer
        </Button>
      </Stack>
    </form>
  );
};

export default AddNihssForm;