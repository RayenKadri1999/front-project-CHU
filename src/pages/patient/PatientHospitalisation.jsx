import React, { useEffect, useState,Component } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom"; // Import useNavigate
import { Box, ThemeProvider } from "@mui/system";
import Navbar from "../../components/shared/Navbar";
import Patientbar from "../../components/shared/Patientbar";
import Sidenav from "../../components/shared/Sidenav";
import { createTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import UserService from "../../services/user-service";
import { Navigate } from "react-router-dom";
import { withRouter } from "../../common/with-router";
import AuthService from "../../services/auth-service";
import AuthVerify from "../../common/auth-verify";
import AddPatientForm, { Modal } from "./addpatientmodal";
import { message } from "antd";
import { createPortal } from "react-dom";
import authHeader from "../../services/auth-header";
import ModalDialog from "../dossier/ModalDialog";
import AddHospitalisationForm from "./addhospitalisationmodal";
import dayjs from "dayjs";
import Notifications from "../../components/shared/Notifications";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const theme = createTheme({
  palette: {
    primary: {
      main: "#0E8388",
    },
  },
});






const ListHospitalisation = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [hospitalisations, setHospitalisations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { idDossier } = useParams();
  const [successMessage, setSuccessMessage] = useState("");

  const handleButtonClick = (value) => {
    setModalOpen(false);
    setMessage(value);
  };

  useEffect(() => {
    loadPatientHospitalisation();
  }, [successMessage]);

  const loadPatientHospitalisation = async (e) => {
    try {
   
      const result = await axios.get(`http://localhost:3000/api/hospitalisation/getAll/${encodeURIComponent(idDossier)}`, { headers: authHeader() });
      setHospitalisations(result.data);
      

      console.log(hospitalisations)
    } catch (error) {
      
    }
  };
 
  const columns = [
    { field: "_id", headerName: "Matricule", width: 170 },

    { field: "dateEntree", headerName: "Date Etrée", width: 170 ,valueFormatter: (params) => { return params.value ? dayjs(params.value).format('DD-MM-YYYY') : ''; },},

    { field: "dateSortie", headerName: "Date Sortie", width: 170,valueFormatter: (params) => { return params.value ? dayjs(params.value).format('DD-MM-YYYY') : '';  }, },
    { field: "status", headerName: "Status", width: 170 },
      {field: "TypeAVC", headerName: "Type de AVC", width: 170},
  {
      field: "actions",
      headerName: "ACTIONS",
      width: 300,
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          
          <Button variant="text" onClick={() => deleteHospitalisation(params.row._id)} className="text-red-500">
            Delete
          </Button>
          <Button variant="text" onClick={() => navigate(`/PatientDossier/${encodeURIComponent(idDossier)}/${encodeURIComponent(params.row._id)}/${encodeURIComponent(params.row.TypeAVC)}`)}>
            Details
          </Button>
        </div>
      ),
    },
  ];

  // const handleUpdate = (_id) => {
  //   console.log(`Updating patient with ID: ${_id}`);
  // };

  const deleteHospitalisation = async (_id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/hospitalisation/delete/${encodeURIComponent(_id)}`,{ headers: authHeader() });
      loadPatientHospitalisation();
    } catch (error) {
      toast.error(error);
    }
  };

  
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
  
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }


  return (
    <>
 

        
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
       <ToastContainer/>
        
         <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <ThemeProvider theme={theme}>
          <div style={{ display: "flex",justifyContent: "space-between", alignItems: "center" }}>
              <h1 className="mt-5 ml-5">Historique hospitalisations</h1>
             

             
    
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
  
      >+
      </Button>

      <ModalDialog  open={open} handleClose={handleClose}  FormComponent={AddHospitalisationForm} formProps={{id:idDossier,setSuccessMessage:setSuccessMessage}} />
   
            </div>
        
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={hospitalisations}
                columns={columns}
                pageSize={5}
                checkboxSelection
                getRowId={(row) => row._id}
              />
            </div>

            {successMessage && (
           <Notifications Message={successMessage} setMessage={setSuccessMessage}/>
            )}

          </ThemeProvider>
        </Box>
      </Box>
    </>
  );
};


    

    


export default withRouter(ListHospitalisation);