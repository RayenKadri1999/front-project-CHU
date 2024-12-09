import { Button, Stack } from '@mui/material';
import { SendIcon } from 'lucide-react';
import React from 'react';


const SubmitButtons = ({ isDataAvailable,setIsEditable,isEditable }) => {
 
  
  const toggleEditMode = () => {
    setIsEditable((prev) => !prev);
  };
  return (

    <Stack direction="row" spacing={2} mt={3}>

    <Button
      variant="contained"
      
      startIcon={<SendIcon />}
      type="submit"
      disabled={!isEditable}
    >
      {isDataAvailable ? "Mettre à jour" : "Créer"}
    </Button>

    <Button
      variant= {isEditable ? "outlined" : "contained"}
     
      onClick={toggleEditMode}
    >
      {isEditable ? "Annuler" : "Modifier"}
    </Button>

  </Stack>

  );
};

export default SubmitButtons;
