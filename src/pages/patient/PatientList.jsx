import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, InputAdornment, Select, MenuItem, Checkbox, ListItemText } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { Box, ThemeProvider } from "@mui/system";
import Navbar from "../../components/shared/Navbar";
import Sidenav from "../../components/shared/Sidenav";
import { createTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import Notifications from "../../components/shared/Notifications";
import dayjs from "dayjs";
import authHeader from "../../services/auth-header";
import ModalDialog from "../dossier/ModalDialog";
import DetailsPatientForm from "./Modifypatientmodal";
import AddPatientForm from "./addpatientmodal";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0E8388",
    },
  },
});

const ListPatients = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [patients, setPatients] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState(["Nom", "Prenom", "ID"]);
  const [idDossier, setIdDossier] = useState();
  const [openDet, setOpenDet] = useState(false);

  useEffect(() => {
    loadPatients();
  }, [successMessage]);

  const loadPatients = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/api/patient/get`, { headers: authHeader() });
      setPatients(result.data);
    } catch (error) {
      alert(error);
    }
  };

  const handleOpenDet = (id) => {
    setIdDossier(id);
    setOpenDet(true);
  };

  const columns = [
    { field: "numero_dossier", headerName: "Numéro", width: 140 },
    { field: "Nom", headerName: "Nom", width: 170 },
    { field: "Prenom", headerName: "Prénom", width: 170 },
    { 
      field: "createdAt", 
      headerName: "Date de création", 
      width: 200, 
      valueFormatter: (params) => dayjs(params.value).format('YYYY-MM-DD HH:mm'), 
    },
    { 
      field: "updatedAt", 
      headerName: "mis à jour le", 
      width: 170, 
      valueFormatter: (params) => dayjs(params.value).format('YYYY-MM-DD HH:mm'), 
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 300,
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button variant="text" onClick={() => handleOpenDet(params.row._id)}>
            Details
          </Button>
          <Button variant="text" onClick={() => deletePatient(params.row._id)} className="text-red-500">
            Delete
          </Button>
          <Button variant="text" onClick={() => navigate(`/afficherHospitalisations/${encodeURIComponent(params.row._id)}`)}>
            Historique
          </Button>
        </div>
      ),
    },
  ];

  const deletePatient = async (_id) => {
    try {
      await axios.delete(`http://localhost:3000/api/patient/delete/${encodeURIComponent(_id)}`, { headers: authHeader() });
      loadPatients();
    } catch (error) {
      alert(error);
    }
  };

  const handleFilterChange = (event) => {
    setFilterOptions(event.target.value);
  };

  const filteredPatients = patients.filter((patient) => {
    const query = searchQuery.toLowerCase();

    // Show all patients when searchQuery is empty
    if (!query) return true;

    return filterOptions.some((option) => {
      if (option === "Nom") {
        return patient.Nom.toLowerCase().includes(query);
      } else if (option === "Prenom") {
        return patient.Prenom.toLowerCase().includes(query);
      } else if (option === "ID") {
        return patient.numero_dossier?.toLowerCase().includes(query);
      }
      return false;
    });
  });

  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <ThemeProvider theme={theme}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h1 className="mt-5 ml-5">Liste des dossiers</h1>
              
              <div style={{ display: "flex", alignItems: "center" }}>
                <Select
                  multiple
                  value={filterOptions}
                  onChange={handleFilterChange}
                  renderValue={(selected) => selected.join(', ')}
                  variant="outlined"
                  sx={{ marginRight: 1, width: 200 }}
                >
                  <MenuItem value="Nom" id="filter-nom">
                    <Checkbox checked={filterOptions.indexOf("Nom") > -1} />
                    <ListItemText primary="Nom" />
                  </MenuItem>
                  <MenuItem value="Prenom" id="filter-prenom">
                    <Checkbox checked={filterOptions.indexOf("Prenom") > -1} />
                    <ListItemText primary="Prenom" />
                  </MenuItem>
                  <MenuItem value="ID" id="filter-id">
                    <Checkbox checked={filterOptions.indexOf("ID") > -1} />
                    <ListItemText primary="ID" />
                  </MenuItem>
                </Select>
                <TextField
                  variant="outlined"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: '300px',
                    borderRadius: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#0E8388",
                      },
                      "&:hover fieldset": {
                        borderColor: "#0E8388",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#0E8388",
                      },
                    },
                  }}
                />
              </div>
              
              <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
                +
              </Button>
              <ModalDialog 
                open={modalOpen} 
                handleClose={() => setModalOpen(false)} 
                formProps={{ setSuccessMessage }} 
                FormComponent={AddPatientForm} 
              />
              <ModalDialog 
                open={openDet} 
                handleClose={() => setOpenDet(false)} 
                formProps={{ idDossier, setSuccessMessage }} 
                FormComponent={DetailsPatientForm} 
              />
            </div>

            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={filteredPatients}
                columns={columns}
                pageSize={5}
                checkboxSelection
                getRowId={(row) => row._id}
              />
            </div>

            {successMessage && (
              <Notifications Message={successMessage} setMessage={setSuccessMessage} />
            )}
          </ThemeProvider>
        </Box>
      </Box>
    </>
  );
};

export default ListPatients;
