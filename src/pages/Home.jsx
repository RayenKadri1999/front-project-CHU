   
import React from "react";
import Sidenav from "../components/shared/Sidenav";
import Box from "@mui/material/Box";
import Navbar from "../components/shared/Navbar";
import PatientList from "./patient/PatientList";
import "../App.css";
export default function home() {
  return (
<>
    <div className="">
    <Navbar/>
      <Box height={70}/>
      <Box sx={{ display: "flex" }}>
        <Sidenav />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <PatientList/>
        </Box>
      </Box>
    </div>
    </>
  );
}
