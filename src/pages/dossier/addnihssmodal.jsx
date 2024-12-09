// import React, { useState } from "react";

// import  "../patient/Modal.css";
// import { Box, Button, FormControlLabel, Grid, RadioGroup, Stack, TextField, ThemeProvider ,Radio} from "@mui/material";
// import authHeader from "../../services/auth-header";
// import { createTheme } from "@mui/material/styles";

// export const ModalNihss = ({ handleClose }) => {
//     const [NihssData, setNihssData] = useState(children);
      
// const theme = createTheme({
//     palette: {
//       primary: {
//         main: "#0E8388",
//       },
//     },
//   });
  


//       const handleChange = (e) => {
//         const { name, value } = e.target;
    
//         setNihssData((prevData) => ({
//           ...prevData,
//           [name]: value,
//         }));
//       };


//       const handleSubmit = async (e) => {
    
//         e.preventDefault();
    
//         try {
//           const response = await fetch("http://localhost:3000/api/patient/create", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               'x-access-token': authHeader()['x-access-token']
             
//             },
    
             
//             body: JSON.stringify(NihssData)
//           });
    
//           if (response.status === 201) {
//             // Patient created successfully
           
//             console.log("Patient created successfully!");
    
//             // Clear the form or perform any other actions as needed
//             setNihssData({
//               Nom: "",
//               Prenom: "",
//               sexe: "",
//               dateNaissance: "",
//               matricule: "",
//               aidantPrincipal: "",
//               numeroAidantPrincipal: "",
//               signatureDocteur: "",
//             });
//             handleClose();
//           } else {
//             const errorData = await response.json();
//             console.error("Patient creation failed:", errorData);
//             // Handle other errors
//           }
//         } catch (error) {
//           console.error("Error in handleSubmit:", error);
//           handleClose();
//           // Handle other errors
//         }
//       };
//   return (
    
//         <form onSubmit={handleSubmit}>
//         <div className="modal-content">

//         <h1>Nouveau patient :</h1>
          
//             <Grid container>
//               <Grid item xs>
//                 <Box
//                   component="form"
//                   sx={{
//                     "& .MuiTextField-root": { m: 1, width: "25ch" },
//                   }}
//                   noValidate
//                   autoComplete="off"
//                 >
//                   <Box sx={{ display: "flex", flexDirection: "row" }}>
                   
//                       <TextField
//                         label="Nom"
//                         type="text"
//                         name="Nom"
//                         value={NihssData.Nom}
//                         onChange={handleChange}
//                         required
//                         margin="normal"
//                       />
             

              
//                       <TextField
//                         label="Prenom"
//                         type="text"
//                         name="Prenom"
//                         value={NihssData.Prenom}
//                         onChange={handleChange}
//                         required
//                         margin="normal"
       

                  
//                       <TextField
//                         label="Date de Naissance"
//                         name="dateNaissance"
//                         type="date"
//                         value={NihssData.dateNaissance}
//                         onChange={handleChange}
//                         InputLabelProps={{ shrink: true }}
//                         required
//                       />
              

//                     <Box sx={{ m: 1, width: "25ch" }}>
                    
//                         <RadioGroup
//                           aria-label="sexe"
//                           name="sexe"
//                           value={NihssData.sexe}
//                           onChange={handleChange}
//                           style={{ flexDirection: "row" }} // Arrange radio buttons horizontally
//                         >
//                           <FormControlLabel
//                             value="homme"
//                             control={<Radio />}
//                             label="Homme"
//                           />
//                           <FormControlLabel
//                             value="femme"
//                             control={<Radio />}
//                             label="Femme"
//                           />
//                         </RadioGroup>
               
//                     </Box>
//                   </Box>

//                   <TextField
//                     label="Matricule"
//                     type="text"
//                     name="matricule"
//                     value={NihssData.matricule}
//                     onChange={handleChange}
//                     required
//                     margin="normal"
//                   />
//                   <TextField
//                     label="Aidant Principal"
//                     name="aidantPrincipal"
//                     value={NihssData.aidantPrincipal}
//                     onChange={handleChange}
//                     required
//                   />
//                   <TextField
//                     label="Numero Aidant Principal"
//                     name="numeroAidantPrincipal"
//                     value={NihssData.numeroAidantPrincipal}
//                     onChange={handleChange}
//                     required
//                   />
//                   <TextField
//                     label="Signature Docteur"
//                     name="signatureDocteur"
//                     value={NihssData.signatureDocteur}
//                     onChange={handleChange}
//                     required
//                   />
                  
//                   <TextField
//                       label="Email"
//                       name="email"
//                       value={NihssData.email}
//                       onChange={handleChange}
//                       required
//                     />
//                     <TextField
//                       label="Telephone"
//                       name="telephone"
//                       value={NihssData.telephone}
//                       onChange={handleChange}
//                       required
//                     />   
//                 </Box>
//               </Grid>
//             </Grid>
           
       



//         </div>
      
//         <div className="modal-footer">
//         <ThemeProvider theme={theme}>    
//         <Button
       
//                 type="submit"
//                 variant="contained"
//                 color="primary"
               
//                 onClick={() => handleSubmit}
//                 style={{ marginLeft: "5px" }}
//               >
//                 Submit
//               </Button>

//           {/* <button
           
//             className="btn btn-submit"
          
            
//           >
           
//           </button> */}
//            <Button
                
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 onClick={() => onCancel("Cancel button was clicked")}
//                 style={{ marginLeft: "5px" }}
//                 >
//                 Cancel
//                 </Button>  
//                 </ThemeProvider>
//           {/* <button
//             type="submit"
//             className="btn btn-cancel"
//             onClick={() => onCancel("Cancel button was clicked")}
//           >
//             Cancel
//           </button> */}
//         </div>
//         </form>
     
//   );
// };













// import authHeader from "../../services/auth-header";

// import { Box, Button, FormControlLabel, Grid, RadioGroup, TextField ,Radio, styled, Typography} from "@mui/material";
// import React, { useState } from "react";



// const AddPatientForm = ({handleClose}) => {
//   const [patientData, setPatientData] = useState({
//     Nom: "",
//     Prenom: "",
//     sexe: "",
//     dateNaissance: "",
//     matricule: "",
//     aidantPrincipal: "",
//     numeroAidantPrincipal: "",
//     signatureDocteur: "",
//   });



//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setPatientData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };


//   const handleSubmit = async (e) => {
    
//     e.preventDefault();

//     try {console.log(patientData)
//       const response = await fetch("http://localhost:3000/api/patient/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           'x-access-token': authHeader()['x-access-token']
         
//         },

         
//         body: JSON.stringify(patientData)
//       });

//       if (response.status === 201) {
//         // Patient created successfully
       
//         console.log("Patient created successfully!");

//         // Clear the form or perform any other actions as needed
//         setPatientData({
//           Nom: "",
//           Prenom: "",
//           sexe: "",
//           dateNaissance: "",
//           matricule: "",
//           aidantPrincipal: "",
//           numeroAidantPrincipal: "",
//           signatureDocteur: "",
//         });
//         handleClose();
//       } else {
//         const errorData = await response.json();
//         console.error("Patient creation failed:", errorData);
//         // Handle other errors
//       }
//     } catch (error) {
//       console.error("Error in handleSubmit:", error);
//       handleClose();
//       // Handle other errors
//     }
//   };


 


//   return (
//     <form onSubmit={handleSubmit}>

//     <Typography variant="h4" gutterBottom> Nouveau patient </Typography>
      
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             {/* <Box
//               component="form"
//               sx={{
//                 "& .MuiTextField-root": { m: 1, width: "25ch" },
//               }}
//               noValidate
//               autoComplete="off"
//             > */}
//               <Box sx={{ display: "flex", flexDirection: "row" , gap: 2 }}>
               
//                   <TextField
//                     label="Nom"
//                     type="text"
//                     name="Nom"
//                     value={patientData.Nom}
//                     onChange={handleChange}
//                     required
//                     margin="normal"
//                     fullWidth
//                   />
               

          
//                   <TextField
//                     label="Prenom"
//                     type="text"
//                     name="Prenom"
//                     value={patientData.Prenom}
//                     onChange={handleChange}
//                     required
//                     margin="normal"
//                     fullWidth
//                   />
             
//                 </Box>
//                </Grid>

//                <Grid item xs={12}>
//                <Box sx={{ display: "flex", flexDirection: "row" , gap: 2 }}>
                
//                   <TextField
//                     label="Date de Naissance"
//                     name="dateNaissance"
//                     type="date"
//                     value={patientData.dateNaissance}
//                     onChange={handleChange}
//                     InputLabelProps={{ shrink: true }}
//                     required
//                     sx={{ flex: 1 }} // This makes the TextField take up 50% of the width
//                   />
                

//                     <RadioGroup
//                       aria-label="sexe"
//                       name="sexe"
//                       value={patientData.sexe}
//                       fullWidth
//                       onChange={handleChange}
//                       style={{ flexDirection: "row"  }} // Arrange radio buttons horizontally
//                       sx={{ flex: 1 }} // This makes the RadioGroup take up 50% of the width
//                     >
//                       <FormControlLabel
//                         value="homme"
//                         control={<Radio />}
//                         label="Homme"
//                       />
//                       <FormControlLabel
//                         value="femme"
//                         control={<Radio />}
//                         label="Femme"
//                       />
//                     </RadioGroup>
              
//                 </Box>

//                 </Grid>

//                 <Grid item xs={12}>
//                 <Box sx={{ display: "flex", flexDirection: "row" , gap: 2 }}>

//               <TextField
//                 label="Matricule"
//                 type="text"
//                 name="matricule"
//                 value={patientData.matricule}
//                 onChange={handleChange}
//                 required
//                 margin="normal"
//                 fullWidth
//               />
//               <TextField
//                 label="Aidant Principal"
//                 name="aidantPrincipal"
//                 value={patientData.aidantPrincipal}
//                 onChange={handleChange}
//                 required
//                     margin="normal"
//                 fullWidth
//               />
//                 </Box>

// </Grid>

// <Grid item xs={12}>
// <Box sx={{ display: "flex", flexDirection: "row" , gap: 2  }}>
//               <TextField
//                 label="Numero Aidant Principal"
//                 name="numeroAidantPrincipal"
//                 value={patientData.numeroAidantPrincipal}
//                 onChange={handleChange}
//                 required
//                 fullWidth
//               />
//               <TextField
//                 label="Signature Docteur"
//                 name="signatureDocteur"
//                 value={patientData.signatureDocteur}
//                 onChange={handleChange}
//                 required
//                 fullWidth
//               />
//                       </Box>

// </Grid>

//               <Grid item xs={12}>
//               <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
//               <TextField
//                   label="Email"
//                   name="email"
//                   value={patientData.email}
//                   onChange={handleChange}
//                   required
//                   fullWidth
//                 />
//                 <TextField
//                   label="Telephone"
//                   name="telephone"
//                   value={patientData.telephone}
//                   onChange={handleChange}
//                   required
//                   fullWidth
//                 />   
//             {/* </Box> */}
//             </Box>

// </Grid>
//           </Grid>
       
       
   



  
//     <Box  sx={{ display: "flex", justifyContent: "flex-end", gap: 2,mt: 3 }}>
//       <Button
       
//        type="submit"
//        variant="contained"
//        color="primary"
      
//        onClick={handleClose}
//        style={{ marginLeft: "5px" }}
//      >
//        Submit
//      </Button>

 
//   <Button
       
//        type="submit"
//        variant="contained"
//        color="primary"
//        onClick={handleClose}
//        style={{ marginLeft: "5px" }}
//        >
//        Cancel
//        </Button>  
//        </Box>
     
//     </form>
    
//   );
// };

// export default AddPatientForm;