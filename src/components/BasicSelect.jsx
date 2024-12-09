import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function BasicSelect({ value, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 479 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Utilisateur</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value} // Use the provided 'value' prop
          label="Utilisateur"
          onChange={handleChange}
        >
        
          <MenuItem value="normalUser">Résidant</MenuItem>
          <MenuItem value="superUser">Medecin senior</MenuItem>
          <MenuItem value="admin">Chef Service</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
