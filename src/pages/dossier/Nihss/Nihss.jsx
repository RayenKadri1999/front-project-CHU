import React from "react";


import Box from "@mui/material/Box";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

import  { useState,useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Alert, Typography } from "@mui/material";
import {PlusIcon } from "lucide-react";
import { DataGrid } from "@mui/x-data-grid";
import authHeader from "../../../services/auth-header";
import AddNihss from "./AddNihss";
import DetailsNihss from "./DetailsNihss";
import AddNihssForm from "../AddNihssForm";
import DetailsNihssForm from "../DetailsNihssForm";
import ModalDialog from "../ModalDialog";
import Notifications from "../../../components/shared/Notifications";


function Nihss() {


  
  const columns = [
    { field: "categorie", headerName: "Categorie", width: 170 },
    { field: "date", headerName: "Date", width: 220 },
    { field: "totalAuto", headerName: "Totale", width: 100 },
   
    // { field: "matricule", headerName: "Matricule", width: 130 },
    // { field: "aidantPrincipal", headerName: "Aidant Principal", width: 150 },
    // { field: "numeroAidantPrincipal", headerName: "Numéro Aidant Principal", width: 180 },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 170,
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
        
          <Button variant="text" onClick={() => {handleOpen(setOpenDetails); setidNihss(params.row._id);}  }>
            Details
          </Button>
          <Button variant="text" onClick={() => deleteNihss(params.row._id)}>
            Supprimer
          </Button>
        </div>
      ),
    },
  ];


  const theme = createTheme({
    palette: {
      primary: {
        main: "#0E8388",
      },
    },
  });
  const navigate = useNavigate();
   const { idDossier,id} = useParams();
const[successMessage,setSuccessMessage]=useState("")
  
  const [newNihss, setNewNihss] = useState(false);
  const [idNihss,setidNihss]=useState();
  const [detailsNihss, setDetailsNihss] = useState(false);
  const [NihssList, setNihssList] = useState([]);
  const [error, setError] = useState(null);
 
  const loadDossierDetails = async () => {

    try {
      const result = await axios.get(`http://localhost:3000/api/Nihss/get/${id}`,{ headers: authHeader() });
      // const result = await axios.get(`http://localhost:3000/api/Nihss/getDetails/${id}`);

      
      if (result.data) {
        setNihssList(result.data);
      
      }

    } catch (error) {
      setError("Une erreur s'est produite lors de l'importation des données");
    }
  };

  useEffect(() => {
    loadDossierDetails();
    
  }, [successMessage]);

  const deleteNihss = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/nihss/delete/${id}`,{ headers: authHeader() });
      loadDossierDetails();
    } catch (error) {
      alert(error);
    }
  };

 
  const [openAdd, setOpenAdd] = useState(false)
  const [openDetails, setOpenDetails] = useState(false)

  const handleOpen = (setOpenfunc) => {
    setOpenfunc(true)
  }

  const handleClose = (setOpenfunc) => {
    setOpenfunc(false)
  }


 
  

  
  return (
    <>
       <ThemeProvider theme={theme} >
      <Box sx={{ display: "flex" }}>
        

      <ModalDialog open={openAdd}
       handleClose={() => handleClose(setOpenAdd)} 

      FormComponent={AddNihss} 

  formProps={{                  // Pass the props that the form needs
    setNewNihss:setNewNihss, 
    id:id,
   
    setSuccessMessage:setSuccessMessage,
  }}
  />
      <ModalDialog open={openDetails} handleClose={() => handleClose(setOpenDetails)}  FormComponent={DetailsNihss}
      formProps={{      
        setDetailsNihss: setDetailsNihss,            
       idNihss: idNihss,
       loadDossierDetails: loadDossierDetails,
       setSuccessMessage:setSuccessMessage
     
   }}   />


     
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* {newNihss && 
        <AddNihss setNewNihss={setNewNihss} id={id} loadDossierDetails={loadDossierDetails} /> 
        }

      {detailsNihss && 
        <DetailsNihss setDetailsNihss={setDetailsNihss} idNihss={idNihss} loadDossierDetails={loadDossierDetails} /> 
        } */}

           
{error && <Alert severity="error">{error}</Alert>}
    {!newNihss && !detailsNihss && <Box>
      
      <Box
           sx={{ display: "flex", flexDirection: "row", alignItems: "center" ,mb:3 }}>
        <Typography variant="h4" gutterBottom > Historique NIHSS </Typography>
          {/* <Button
                variant="contained"
                color="primary"
                onClick={() => setNewNihss((prev) => !prev)}
                style={{ marginLeft: "auto",display: 'flex' }}
                startIcon={<PlusIcon />}
              >Nouveau
              </Button>
               */}

<Button
        variant="contained"
        color="primary"
        onClick={ () => handleOpen(setOpenAdd)}
        sx={{ minWidth: 40, height: 40 ,display:"flex",  position: "absolute",right:50}} 
        
      >+
      </Button>

</Box>
              <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={NihssList}
                columns={columns}
                pageSize={5}
                checkboxSelection
                getRowId={(row) => row._id}
              />
            </div>
            </Box>
          }
          
         
        
        </Box>

        </Box>
{successMessage && (
  <Notifications Message={successMessage} setMessage={setSuccessMessage}/>
  )}
        </ThemeProvider>
    </>
  )
}

export default Nihss




