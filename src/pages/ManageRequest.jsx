import axios from 'axios';
import React, { useEffect, useState } from 'react';
import authHeader from '../services/auth-header';
import { Box, Button, createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Navbar from '../components/shared/Navbar';
import Sidenav from '../components/shared/Sidenav';


const theme = createTheme({
    palette: {
      primary: {
        main: "#0E8388",
      },
    },
  });
  

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate =useNavigate();
//   useEffect(() => {
//     // Récupérer les demandes de changement depuis le serveur
//     fetch('/api/change-requests')
//       .then((response) => response.json())
//       .then((data) => setRequests(data));
//   }, []);

  const handleApprove = async (id) => {
   
    try {
        const response = await fetch(`http://localhost:3000/api/request/approuve/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'x-access-token': authHeader()['x-access-token']
          },
         
        });
  
        if (response.status === 200) {
        
          
         console.log("Request approuved successfully!");
        } else {
          console.log("Request approuvation failed:", response.data);
       
        }
      } catch (error) {
        console.log(`Error in handleSubmit: ${error}`);
       
      }
  };

  const handleReject = async(id) => {
     
    try {
    const response = await fetch(`http://localhost:3000/api/request/reject/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'x-access-token': authHeader()['x-access-token']
        },
       
      });

      if (response.status === 200) {
      
        
       console.log("Request rejected successfully!");
      } else {
        console.log("Request rejection failed:", response.data);
     
      }
    } catch (error) {
      console.log(`Error in handleSubmit: ${error}`);
     
    }
  };



  
  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async (e) => {
    try {
   
      const result = await axios.get(`http://localhost:3000/api/request/get`, { headers: authHeader() });
      setRequests(result.data);
    } catch (error) {
      alert(error);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID Request", width: 170 },
    { field: "patient", headerName: "Patient", width: 170 },
    { field: "createdAt", headerName: "Created", width: 170 },
      { field: "updatedAt", headerName: "Updated", width: 170 },
    { field: "status", headerName: "Status", width: 170 },
    // { field: "dateNaissance", headerName: "Date de Naissance", width: 170 },
    // { field: "matricule", headerName: "Matricule", width: 130 },
    // { field: "aidantPrincipal", headerName: "Aidant Principal", width: 150 },
    // { field: "numeroAidantPrincipal", headerName: "Numéro Aidant Principal", width: 180 },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 300,
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button variant="text" onClick={() => navigate(`/edit/${params.row._id}`)}> {/* Use useNavigate to navigate */}
          Dossier
          </Button>
          <Button variant="text" onClick={() => handleApprove(params.row._id)} className="text-red-500">
         Approuver
          </Button>
          <Button variant="text" onClick={() => handleReject(params.row._id)}>
          Rejeter
          </Button>
        </div>
      ),
    },
  ];

  return (

    <>
    <Navbar />
    <Box height={30} />
    <Box sx={{ display: "flex" }}>
     
      
       <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <ThemeProvider theme={theme}>
        <div style={{ display: "flex", alignItems: "center" }}>
            <h1 className="mt-5 ml-5">Liste des Demandes</h1>
         
          </div>
      
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={requests}
              columns={columns}
              pageSize={5}
              checkboxSelection
              getRowId={(row) => row._id}
            />
          </div>
        </ThemeProvider>
      </Box>
    </Box>
    </>

    // <div>
    //   <h1>Demandes de Changement</h1>
    //   <ul>
    //     {requests.map((request) => (
    //       <li key={request.id}>
    //         {request.changeType} - {request.details}
    //         <button onClick={() => handleApprove(request.id)}>Approuver</button>
    //         <button onClick={() => handleReject(request.id)}>Rejeter</button>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default ManageRequests;