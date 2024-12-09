import React from "react";
import Sidenav from "../components/shared/Sidenav";
import Box from "@mui/material/Box";
import Navbar from '../components/shared/Navbar';
export default function Settings() {
  return (
    <>
        <Navbar/>
      <Box height={30}/>
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>pdf</h1>

        </Box>
      </Box>
    </>
  );
}
