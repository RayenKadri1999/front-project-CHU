import { Snackbar } from '@mui/material';
import React from 'react';


const Notifications = ({ Message,setMessage }) => {
 
  
  
  return (

    <Snackbar
    open={Boolean(Message)}
    autoHideDuration={6000}
    onClose={() => setMessage("")}
    message={Message}
    sx={{display:"flex",marginLeft:10 }}
  />

  );
};

export default Notifications;
