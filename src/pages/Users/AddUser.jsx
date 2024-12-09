import React from "react";
import Sidenav from "../../components/shared/Sidenav";
import Box from "@mui/material/Box";
import Navbar from "../../components/shared/Navbar";
import SignUp from "../login-signup/SignUp";
export default function home() {
  return (
    <>
      <div className="bgcolor">
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />

          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <SignUp />
          </Box>
        </Box>
      </div>
    </>
  );
}
