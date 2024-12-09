import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box, ThemeProvider } from "@mui/system";
import Navbar from "../../components/shared/Navbar";
import Sidenav from "../../components/shared/Sidenav";
import { createTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import authHeader from "../../services/auth-header";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0E8388",
    },
  },
});

const ListUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // All users
  const [filteredUsers, setFilteredUsers] = useState([]); // Displayed users, initially all users
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filterOptions, setFilterOptions] = useState([]); // State for selected filters
  const filterFields = ["username", "role"]; // Filter options

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/api/user/get`, { headers: authHeader() });
      setUsers(result.data);
      setFilteredUsers(result.data); // Initially display all users
    } catch (error) {
      alert(error);
    }
  };

  // Function to map roles to display values
  const mapRoleToDisplay = (role) => {
    switch (role) {
      case "normalUser":
        return "résidant";
      case "superUser":
        return "médecin senior";
      case "superSuperUser":
        return "chef service";
      case "admin":
        return "chef service";
      default:
        return role; // Return the original role if it doesn't match
    }
  };

  // Apply filter only when searchTerm is not empty
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users); // Display all users if search term is empty
    } else {
      const filtered = users.filter(user => {
        return filterOptions.some(option => {
          if (option === "username") {
            return user.username.toLowerCase().includes(searchTerm.toLowerCase());
          }
          if (option === "role") {
            return mapRoleToDisplay(user.role).toLowerCase().includes(searchTerm.toLowerCase());
          }
          return false;
        });
      });
      setFilteredUsers(filtered);
    }
  }, [searchTerm, filterOptions, users]);

  const columns = [
    { field: "_id", headerName: "ID", width: 120 },
    { field: "username", headerName: "Username", width: 200 },
    { field: "email", headerName: "Email", width: 300 },
    {
      field: "role",
      headerName: "Role",
      width: 120,
      renderCell: (params) => (
        <span>{mapRoleToDisplay(params.value)}</span>
      ),
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button variant="text" onClick={() => navigate(`/editUser/${params.row._id}`)}>
            Update
          </Button>
          <Button variant="text" onClick={() => deleteUser(params.row._id)} className="text-red-500">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const deleteUser = async (_id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/user/delete/${_id}`, { headers: authHeader() });
      loadUsers();
      console.log(response);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <ThemeProvider theme={theme}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h1 className="mt-5 ml-5">Liste des utilisateurs</h1>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/ajouterUtilisateur')}
                style={{ marginLeft: "auto" }}
              >
                Ajouter Utilisateur
              </Button>
            </div>
            <Box display="flex" alignItems="center" margin="20px 0">
              <TextField
                variant="outlined"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginRight: '20px', width: '300px' }}
              />
              <FormControl variant="outlined" style={{ minWidth: 200 }}>
                <InputLabel>Filter By</InputLabel>
                <Select
                  label="Filter By"
                  multiple
                  value={filterOptions}
                  onChange={(e) => setFilterOptions(e.target.value)}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {filterFields.map((field) => (
                    <MenuItem key={field} value={field}>
                      <Checkbox checked={filterOptions.indexOf(field) > -1} />
                      <ListItemText primary={field} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={filteredUsers} // Use filteredUsers here
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
  );
};

export default ListUsers;
