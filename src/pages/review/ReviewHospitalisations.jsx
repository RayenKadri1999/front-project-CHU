import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Box, ThemeProvider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import Navbar from "../../components/shared/Navbar";
import Sidenav from "../../components/shared/Sidenav";
import { createTheme } from "@mui/material/styles";
import authHeader from "../../services/auth-header";
import Notifications from "../../components/shared/Notifications";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme({
  palette: { primary: { main: "#0E8388" } },
});

const ReviewHospitalisations = () => {
  const navigate = useNavigate();
  const { idDossier } = useParams();
  const [hospitalisations, setHospitalisations] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    loadPatientHospitalisation();
  }, [successMessage]);

  const loadPatientHospitalisation = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3000/api/hospitalisation/getAll/${encodeURIComponent(
          idDossier
        )}`,
        { headers: authHeader() }
      );
      setHospitalisations(result.data);
    } catch (error) {
      toast.error("Failed to load hospitalisations");
    }
  };

  const deleteHospitalisation = async (_id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/hospitalisation/delete/${encodeURIComponent(
          _id
        )}`,
        { headers: authHeader() }
      );
      loadPatientHospitalisation();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const columns = [
    { field: "_id", headerName: "Matricule", width: 170 },
    {
      field: "dateEntree",
      headerName: "Date Entrée",
      width: 170,
      valueFormatter: (params) =>
        params.value ? dayjs(params.value).format("DD-MM-YYYY") : "",
    },
    {
      field: "dateSortie",
      headerName: "Date Sortie",
      width: 170,
      valueFormatter: (params) =>
        params.value ? dayjs(params.value).format("DD-MM-YYYY") : "",
    },
    { field: "reviewStatus", headerName: "Statut", width: 170 },
    { field: "TypeAVC", headerName: "Type de AVC", width: 170 },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            variant="text"
            sx={{
              fontWeight: "bold",
              textTransform: "none",
            }}
            onClick={() =>{
            
              navigate(
                `/evaluer/hospitalisation/${encodeURIComponent(
                  idDossier
                )}/${encodeURIComponent(params.row._id)}/${encodeURIComponent(
                  params.row.TypeAVC
                )}`
              )
            }
            }
          >
            Details
          </Button>

          {params.row.reviewStatus === "En cours" && (
            <Button
              variant="text"
              sx={{
                fontWeight: "bold",
                textTransform: "none",
              }}
              onClick={() =>
                toast.info(
                  `Senior can edit hospitalisation ${params.row._id}`
                )
              }
            >
              Evaluer
            </Button>
          )}

          <Button
            variant="text"
            sx={{
              fontWeight: "bold",
              textTransform: "none",
            }}
            onClick={() => deleteHospitalisation(params.row._id)}
          >
            Delete
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
            <h1 className="mt-5 ml-5">Historique hospitalisations</h1>

            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={hospitalisations}
                columns={columns}
                pageSize={5}
                checkboxSelection
                getRowId={(row) => row._id}
                getRowClassName={(params) =>
                  params.row.reviewStatus === "En cours"
                    ? "review-en-cours"
                    : ""
                }
                sx={{
                  "& .review-en-cours": {
                    backgroundColor: "#fff3e0",
                    "&:hover": { backgroundColor: "#ffe0b2" },
                  },
                }}
              />
            </div>

            {successMessage && (
              <Notifications
                Message={successMessage}
                setMessage={setSuccessMessage}
              />
            )}
          </ThemeProvider>
        </Box>
      </Box>
    </>
  );
};

export default ReviewHospitalisations;
