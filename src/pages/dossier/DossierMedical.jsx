import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/shared/Navbar";
import Sidenav from "../../components/shared/Sidenav";
import { Stack, createTheme, ThemeProvider, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import HospitalisationDetails from "./HospitalisationDetails";
import Hospitaliere from "./Hospitaliere";
import Prehospitaliere from "./Prehospitaliere";
import Imagerie from "./Imagerie";
import Nihss from "./Nihss/Nihss";
import Decision from "./Decision";
import Evolution from "./Evolution";
const theme = createTheme({
  palette: {
    primary: {
      main: "#0E8388",
    },
  },
});

const DossierMedical = () => {
  const [commonState, setCommonState] = useState("Common State");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic for handling form submission
    // You can send data to the server or perform other actions
    console.log("Form submitted!");
  };

  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <form onSubmit={handleSubmit}>
            <div>
              {/* Content of Prehospitaliere */}
              <HospitalisationDetails commonState={commonState} />

              {/* Content of Prehospitaliere */}
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Prehospitaliere commonState={commonState} />
              </Box>

              {/* Content of Hospitaliere */}
              <Hospitaliere commonState={commonState} />
              <Imagerie commonState={commonState} />
              <Nihss commonState={commonState} />
              <Decision commonState={commonState} />
            </div>

            {/* Submit button */}
            <ThemeProvider theme={theme}>
              <Stack direction="row" spacing={2}>
                <div style={{ marginLeft: "auto" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                    className="button"
                  >
                    Enregistrer
                  </Button>{" "}
                </div>
              </Stack>
            </ThemeProvider>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default DossierMedical;
