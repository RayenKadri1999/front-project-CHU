// T2SwanSection.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Stack,
  Radio,
  RadioGroup,
  TextField,
  Grid,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Notifications from '../../../components/shared/Notifications';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiServices from "../../../services/api-services";
import SubmitButtons from "../../../components/shared/SubmitButtons";
import PdfButton from "../../../components/shared/PdfButton";

const T2SwanSection = ({ id, handleChange2 }) => {
  const t2_SwanDatainit = {
    status: "Normal",
    Profonds: "",
    Sous_corticaux: "",
    Total: "",
    Thrombusvisible: "",
    ThrombusvisibleTaille: "",
    TransformationHemoragique: "",
    TypeTransformation: "",
    Hémosidérosecorticale: "",
    Signes_veineux_hypoxie: "",
    Microbleeds: [],
    matricule: id,
  };

  const [t2_SwanData, setT2_SwanData] = useState({ ...t2_SwanDatainit });
  const [checkZone, setCheckZone] = useState({
    Profonds: false,
    Sous_corticaux: false,
  });
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const toggleEditMode = () => {
    setIsEditable((prev) => !prev);
  };

  const totalCalc = () => {
    const total = ["Profonds", "Sous_corticaux"].reduce((acc, key) => {
      const value = parseInt(t2_SwanData[key], 10);
      return acc + (isNaN(value) ? 0 : value);
    }, 0);
    setT2_SwanData((prevState) => ({ ...prevState, Total: total }));
  };

  useEffect(() => {
    totalCalc();
  }, [t2_SwanData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiServices.loadDossierDetails(
            setT2_SwanData,
            "imagerie/t2swan",
            setIsDataAvailable,
            setError,
            id
        );
        if (data) {
          setCheckZone({
            Profonds: data.Microbleeds.includes("Profonds"),
            Sous_corticaux: data.Microbleeds.includes("Sous_corticaux"),
          });
        }
      } catch (err) {
        setError("Erreur lors du chargement des données.");
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let updatedt2_SwanData = { ...t2_SwanData };

    if (t2_SwanData.status === "Normal") {
      updatedt2_SwanData = { ...t2_SwanDatainit };
      setT2_SwanData(t2_SwanDatainit);
    }

    apiServices
        .handleSubmit(
            e,
            updatedt2_SwanData,
            "imagerie/t2swan",
            () => toast.success("Données enregistrées avec succès!"),
            isDataAvailable,
            setIsDataAvailable,
            setIsEditable,
            setError,
            id
        )
        .catch((err) =>
            toast.error(err.message || "Erreur lors de l'enregistrement des données.")
        );
  };

  const handleChangecheck = (e, Data, setData, setcheckfunction, key) => {
    const { name, id, checked } = e.target;

    if (checked) {
      setcheckfunction((prevData) => ({
        ...prevData,
        [id]: true,
      }));

      const updatedArray = [...Data[key], name];

      setData((prevData) => ({
        ...prevData,
        [key]: updatedArray,
      }));
    } else {
      setcheckfunction((prevData) => ({
        ...prevData,
        [id]: false,
      }));

      const updatedArray = Data[key].filter((item) => item !== name);

      setData((prevData) => ({
        ...prevData,
        [key]: updatedArray,
        [name]: "",
      }));
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <ToastContainer />
        <Box sx={{ mt: 4, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
          <Stack direction="row" spacing={4} alignItems="center">
            <Typography variant="h6">T2 ou SWAN</Typography>

            <RadioGroup
                row
                name="status"
                value={t2_SwanData.status}
                defaultValue="Normal"
                onChange={(event) => handleChange2(event, setT2_SwanData)}
            >
              <FormControlLabel
                  value="Normal"
                  control={<Radio />}
                  label="Normal"
                  disabled={!isEditable}
              />
              <FormControlLabel
                  value="Anormal"
                  control={<Radio />}
                  label="Anormal"
                  disabled={!isEditable}
              />
            </RadioGroup>
          </Stack>
          {error && <Alert severity="error">{error}</Alert>}

          {t2_SwanData.status === "Anormal" && (
              <>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">Microbleeds:</Typography>
                  <Grid container spacing={2}>
                    {["Profonds", "Sous_corticaux"].map((key) => (
                        <Grid item xs={6} key={key}>
                          <FormControlLabel
                              control={
                                <Checkbox
                                    name={key}
                                    disabled={!isEditable}
                                    id={key}
                                    checked={checkZone[key]}
                                    onChange={(event) =>
                                        handleChangecheck(
                                            event,
                                            t2_SwanData,
                                            setT2_SwanData,
                                            setCheckZone,
                                            "Microbleeds"
                                        )
                                    }
                                />
                              }
                              label={key.replace("_", " ")}
                          />
                          <TextField
                              label=""
                              name={key}
                              value={t2_SwanData[key]}
                              disabled={!isEditable || !checkZone[key]}
                              type="number"
                              fullWidth
                              onChange={(event) => handleChange2(event, setT2_SwanData)}
                          />
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                      <TextField
                          label="Total"
                          name="Total"
                          value={t2_SwanData.Total}
                          type="number"
                          fullWidth
                          disabled
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">Thrombus visible:</Typography>
                  <RadioGroup
                      row
                      name="Thrombusvisible"
                      value={t2_SwanData.Thrombusvisible}
                      defaultValue="Oui"
                      onChange={(event) => handleChange2(event, setT2_SwanData)}
                  >
                    <FormControlLabel
                        value="Oui"
                        control={<Radio />}
                        label="Oui"
                        disabled={!isEditable}
                    />
                    <FormControlLabel
                        value="Non"
                        control={<Radio />}
                        label="Non"
                        disabled={!isEditable}
                    />
                  </RadioGroup>
                  <TextField
                      label="Taille"
                      name="ThrombusvisibleTaille"
                      value={t2_SwanData.ThrombusvisibleTaille}
                      type="number"
                      fullWidth
                      sx={{ mt: 1 }}
                      onChange={(event) => handleChange2(event, setT2_SwanData)}
                  />
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">Transformation Hémorragique:</Typography>
                  <RadioGroup
                      row
                      name="TransformationHemoragique"
                      value={t2_SwanData.TransformationHemoragique}
                      onChange={(event) => handleChange2(event, setT2_SwanData)}
                  >
                    <FormControlLabel
                        value="Oui"
                        control={<Radio />}
                        label="Oui"
                        disabled={!isEditable}
                    />
                    <FormControlLabel
                        value="Non"
                        control={<Radio />}
                        label="Non"
                        disabled={!isEditable}
                    />
                  </RadioGroup>
                  {t2_SwanData.TransformationHemoragique === "Oui" && (
                      <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
                        <Typography variant="body1">Type de Transformation :<PdfButton pdfUrl="/pdf/type_trans.pdf" /></Typography>

                        <FormControl sx={{ mt: 2, minWidth: 200 }} disabled={!isEditable}>
                          <InputLabel id="TypeTransformation-label">
                            Sélectionnez le type
                          </InputLabel>
                          <Select
                              labelId="TypeTransformation-label"
                              id="TypeTransformation"
                              value={t2_SwanData.TypeTransformation || ""} // Ensure a valid default value
                              onChange={(event) =>
                                  setT2_SwanData((prevState) => ({
                                    ...prevState,
                                    TypeTransformation: event.target.value,
                                  }))
                              }
                              label="Sélectionnez le type"
                          >
                            <MenuItem value="HI1">HI1</MenuItem>
                            <MenuItem value="HI2">HI2</MenuItem>
                            <MenuItem value="PH1">PH1</MenuItem>
                            <MenuItem value="PH2">PH2</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                  )}
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">Hémosidérose corticale:</Typography>
                  <RadioGroup row name="Hémosidérosecorticale" defaultValue="Oui" value={t2_SwanData.Hémosidérosecorticale} onChange={(event) => handleChange2(event, setT2_SwanData)}>
                    <FormControlLabel value="Oui" control={<Radio />} label="Oui"  disabled={!isEditable}/>
                    <FormControlLabel value="Non" control={<Radio />} label="Non" disabled={!isEditable} />
                  </RadioGroup>

                </Box>

                {/* Autres Signes Section */}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">Signes veineux d'hypoxie cérébrale:</Typography>

                  <RadioGroup row name="Signes_veineux_hypoxie" value={t2_SwanData.Signes_veineux_hypoxie} defaultValue="Oui" onChange={(event) => handleChange2(event, setT2_SwanData)}>
                    <FormControlLabel value="Brush sign" control={<Radio />} label="Brush sign" disabled={!isEditable} />
                    <FormControlLabel value="Bold sign" control={<Radio />} label="Bold sign"  disabled={!isEditable}/>
                  </RadioGroup>

                </Box>
              </>
          )}

          <SubmitButtons
              isDataAvailable={isDataAvailable}
              setIsEditable={setIsEditable}
              isEditable={isEditable}
          />
          {successMessage && (
              <Notifications Message={successMessage} setMessage={setSuccessMessage} />
          )}
        </Box>
      </form>
  );
};

export default T2SwanSection;
