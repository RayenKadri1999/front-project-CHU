import { Box, Dialog } from "@mui/material"
import AddNihssForm from "./AddNihssForm"
import React from 'react';

const ModalDialog = ({open,handleClose,FormComponent,formProps }) => {
  
    return (
        
        <Dialog open={open} onClose={handleClose}  scroll="paper"  // Enable scrolling inside the modal if content overflows
        sx={{
          '& .MuiDialog-paper': {
            maxWidth: '60vw',  // Limit max width to 80% of the viewport width
     
            width: 'auto',     // Auto size based on content
            height: 'auto',
          }
        }}>
 <Box p={3}>
<FormComponent handleClose={handleClose} {...formProps} />

</Box>
        </Dialog>
       
        )
}

export default ModalDialog