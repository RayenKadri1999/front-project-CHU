import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import apiServices from "../../services/api-services";
import dayjs from "dayjs";

const PatientAutocomplete = ({ value, onChange }) => {
  const [options, setOptions] = useState([]);

  const handleInputChange = async (event, inputValue) => {
    if (inputValue.length >= 2) {
      try {
        const res = await apiServices.get(`/patients/search?query=${inputValue}`);
        setOptions(res.data);
      } catch (err) {
        console.error(err);
        setOptions([]);
      }
    }
  };

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) =>
        `${option.fullName} - ${dayjs(option.dob).format("DD/MM/YYYY")} - ${option.gender}`
      }
      onInputChange={handleInputChange}
      onChange={(event, value) => onChange(value ? value._id : null)}
      renderInput={(params) => <TextField {...params} label="Rechercher un patient" fullWidth />}
      noOptionsText="Aucun patient trouvé"
      isOptionEqualToValue={(option, value) => option._id === value._id}
      value={options.find((opt) => opt._id === value) || null}
    />
  );
};

export default PatientAutocomplete;
