import React, { useEffect, useState } from 'react';
import { Box, Typography, FormControlLabel, Checkbox, Stack, Radio, RadioGroup, TextField, Alert } from '@mui/material';
import { SendIcon } from 'lucide-react';
import authHeader from '../../../services/auth-header';
import axios from 'axios';
import PdfButton from '../../../components/shared/PdfButton';
import Notifications from '../../../components/shared/Notifications';
import apiServices from "../../../services/api-services";
import SubmitButtons from '../../../components/shared/SubmitButtons';

const FLAIR = ({
                 id,



                 handleChange2,
                 handleChangecheck,
               }) => {

  const [flairData, setFlairData] = useState({
    Status: "",
    SequentielleAVC: "",
    Cortex: "",
    SubstanceBlanche: "",
    NoyauGris: "",
    Score_Collateralite: "",
    Peri_ventriculaire: "",
    sous_corticale: "",
    Score_Fazekas: "",
    Details: [],
    matricule: id,
  });
  const flairDataInit={
    Status: "Normale",
    SequentielleAVC: "",
    Cortex: "",
    SubstanceBlanche: "",
    NoyauGris: "",
    Score_Collateralite: "",
    Peri_ventriculaire: "",
    sous_corticale: "",
    Score_Fazekas: "",
    Details: [],
    matricule: id,
  }

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isDataAvailable, setIsDataAvailable] = useState(true);
  const [isEditable, setIsEditable] = useState(false);

  const [checkZone, setCheckZone] = useState({

    AVC_check: false,

  });

  const toggleEditMode = () => {
    setIsEditable((prev) => !prev);
  };


  useEffect(() => {
    const fetchData = async () => {
      const data = await apiServices.loadDossierDetails(setFlairData, "imagerie/flair", setIsDataAvailable, setError, id);
      if (data) {
        setCheckZone({
          AVC_check: data.Details.includes("AVC_check"),
        });
      }
    }
    fetchData();
  }, []);


  const handleSubmit = (e) => {
    let updatedFlairData = flairData;

    if (flairData.Status === "Normale") {
      // update the fileds with initials values
      updatedFlairData = flairDataInit;
      setFlairData(flairDataInit);
    }
    apiServices.handleSubmit(e, flairData, "imagerie/flair", setSuccessMessage, isDataAvailable,setIsDataAvailable, setIsEditable,setError, id);
  }


  return (
      <form onSubmit={handleSubmit}>


        <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
          <Box mb={3} sx={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "left",
            marginBottom: "10px", // Adjust spacing as needed

          }} >
            <Stack direction="row" spacing={4} alignItems="center">

              <Typography variant="h6"   >FLAIR</Typography>


              <RadioGroup
                  row
                  name="Status"
                  value={flairData.Status}
                  onChange={(event) => handleChange2(event, setFlairData)}

              >
                <FormControlLabel
                    value="Normale"

                    control={<Radio />}
                    label="Normale"
                    disabled={!isEditable}
                />
                <FormControlLabel
                    value="Anormale"
                    control={<Radio />}
                    label="Anormale"
                    disabled={!isEditable}
                />
              </RadioGroup>
            </Stack>
            {/*  Séquelle(s) AVC */}

            {error && <Alert severity="error">{error}</Alert>}


            {flairData.Status=="Anormale" &&
                <>
                  <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        // justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "10px", // Adjust spacing as needed

                      }}>

                    <Checkbox

                        name="AVC_check"
                        disabled={!isEditable}
                        id="AVC_check"

                        checked={checkZone.AVC_check}

                        onChange={(event) => handleChangecheck(event, flairData, setFlairData, setCheckZone, "Details")}
                        inputProps={{ "aria-label": "controlled" }}
                        sx={{ marginLeft: "50px" }}

                    />

                    <Typography sx={{
                      marginRight: "8px",
                      marginLeft: "0px",
                      flexShrink: 0, // Prevents the label from shrinking when the container size changes
                      width: "200px", // Fixed width for label text
                      textAlign: "center", // Center align text within the fixed width
                    }}>Séquelle(s) AVC</Typography>
                    <TextField
                        required
                        type="text"
                        name="SequentielleAVC"

                        value={flairData.SequentielleAVC}
                        onChange={(event) => handleChange2(event, setFlairData)}
                        disabled={!isEditable}
                    />
                  </Box>
                  {/*  Lesion recente */}

                  <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "16px", // Adjust spacing as needed
                      }}
                  >
                    <Typography
                        sx={{

                          marginRight: "80px",
                          marginLeft: "8px",
                          flexShrink: 0, // Prevents the label from shrinking when the container size changes
                          width: "200px", // Fixed width for label text
                          textAlign: "center", // Center align text within the fixed width
                        }}
                    >
                      Lésion récente
                    </Typography>

                  </Box>
                  {/*  Cortex */}
                  <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        // justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "10px", // Adjust spacing as needed

                      }}>
                    <Typography sx={{
                      marginRight: "8px",
                      marginLeft: "8px",
                      flexShrink: 0, // Prevents the label from shrinking when the container size changes
                      width: "200px", // Fixed width for label text
                      textAlign: "center", // Center align text within the fixed width
                    }}>Cortex</Typography>
                    <RadioGroup
                        row
                        name="Cortex"
                        value={flairData.Cortex}
                        onChange={(event) => handleChange2(event, setFlairData)}
                        sx={{

                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "24px", // Space between the radio buttons for better visual separation
                        }}
                    >
                      <FormControlLabel
                          value="N/A"
                          control={<Radio />}
                          label="N/A"
                          disabled={!isEditable}
                      />
                      <FormControlLabel
                          value="Non"
                          control={<Radio />}
                          label="Non"
                          disabled={!isEditable}
                      />
                      <FormControlLabel
                          value="Discret"
                          control={<Radio />}
                          label="Discret"
                          disabled={!isEditable}
                      />
                      <FormControlLabel
                          value="Franc"
                          control={<Radio />}
                          label="Franc"
                          disabled={!isEditable}
                      />
                    </RadioGroup>
                  </Box>
                  {/*    Substance Blanche*/}
                  <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        // justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "10px", // Adjust spacing as needed

                      }}>
                    <Typography sx={{
                      marginRight: "8px",
                      marginLeft: "8px",
                      flexShrink: 0, // Prevents the label from shrinking when the container size changes
                      width: "200px", // Fixed width for label text
                      textAlign: "center", // Center align text within the fixed width
                    }}>Substance Blanche</Typography>
                    <RadioGroup
                        row
                        name="SubstanceBlanche"
                        value={flairData.SubstanceBlanche}
                        onChange={(event) => handleChange2(event, setFlairData)}
                        sx={{

                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "24px", // Space between the radio buttons for better visual separation
                        }}
                    >
                      <FormControlLabel
                          value="N/A"
                          control={<Radio />}
                          label="N/A"
                          disabled={!isEditable}
                      />
                      <FormControlLabel
                          value="Non"
                          control={<Radio />}
                          label="Non"
                          disabled={!isEditable}
                      />
                      <FormControlLabel
                          value="Discret"
                          control={<Radio />}
                          label="Discret"
                          disabled={!isEditable}
                      />
                      <FormControlLabel
                          value="Franc"
                          control={<Radio />}
                          label="Franc"
                          disabled={!isEditable}
                      />
                    </RadioGroup>
                  </Box>
                  {/*   Noyau gris */}
                  <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        // justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "10px", // Adjust spacing as needed
                      }}>
                    <Typography sx={{
                      marginRight: "8px",
                      marginLeft: "8px",
                      flexShrink: 0, // Prevents the label from shrinking when the container size changes
                      width: "200px", // Fixed width for label text
                      textAlign: "center", // Center align text within the fixed width
                    }}>Noyau gris</Typography>
                    <RadioGroup
                        row
                        name="NoyauGris"
                        value={flairData.NoyauGris}
                        onChange={(event) => handleChange2(event, setFlairData)}
                        sx={{

                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "24px", // Space between the radio buttons for better visual separation
                        }}
                    >
                      <FormControlLabel
                          value="N/A"
                          control={<Radio />}
                          label="N/A"
                          disabled={!isEditable}
                      />
                      <FormControlLabel
                          value="Non"
                          control={<Radio />}
                          label="Non"
                          disabled={!isEditable}
                      />
                      <FormControlLabel
                          value="Discret"
                          control={<Radio />}
                          label="Discret"
                          disabled={!isEditable}
                      />
                      <FormControlLabel
                          value="Franc"
                          control={<Radio />}
                          label="Franc"
                          disabled={!isEditable}
                      />
                    </RadioGroup>
                  </Box>

                  {/*  Score de Collatéralité */}

                  <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        // justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "10px", // Adjust spacing as needed

                      }}>
                    <Typography sx={{
                      marginRight: "8px",
                      marginLeft: "8px",
                      flexShrink: 0, // Prevents the label from shrinking when the container size changes
                      width: "200px", // Fixed width for label text
                      textAlign: "center", // Center align text within the fixed width
                    }}>Score de Collatéralité</Typography>
                    <TextField
                        required
                        type="number"
                        name="Score_Collatéralité"

                        value={flairData.Score_Collateralite}
                        onChange={(event) => handleChange2(event, setFlairData)}
                        disabled={!isEditable}
                    />
                  </Box>

                  {/*  Leucoaraoise */}

                  <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "16px", // Adjust spacing as needed
                      }}
                  >
                    <Typography
                        sx={{
                          marginTop: "20px",
                          marginRight: "80px",
                          marginLeft: "8px",
                          flexShrink: 0, // Prevents the label from shrinking when the container size changes
                          width: "200px", // Fixed width for label text
                          textAlign: "center", // Center align text within the fixed width
                        }}
                    >
                      Leucoaraoise
                    </Typography>

                  </Box>
                  {/* Peri-ventriculaire */}
                  <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        // justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "10px", // Adjust spacing as needed

                      }}>
                    <Typography sx={{
                      marginRight: "8px",
                      marginLeft: "8px",
                      flexShrink: 0, // Prevents the label from shrinking when the container size changes
                      width: "200px", // Fixed width for label text
                      textAlign: "center", // Center align text within the fixed width
                    }}> Peri-ventriculaire</Typography>
                    <RadioGroup
                        row
                        name="Peri_ventriculaire"
                        value={flairData.Peri_ventriculaire}
                        onChange={(event) => handleChange2(event, setFlairData)}
                        sx={{

                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "24px", // Space between the radio buttons for better visual separation
                        }}
                    >
                      <FormControlLabel
                          value="Oui"
                          control={<Radio />}
                          label="Oui"
                          disabled={!isEditable}
                      />
                      <FormControlLabel
                          value="Non"
                          control={<Radio />}
                          label="Non"
                          disabled={!isEditable}
                      />

                    </RadioGroup>
                  </Box>
                  {/* sous corticale */}
                  <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        // justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "10px", // Adjust spacing as needed

                      }}>
                    <Typography sx={{
                      marginRight: "8px",
                      marginLeft: "8px",
                      flexShrink: 0, // Prevents the label from shrinking when the container size changes
                      width: "200px", // Fixed width for label text
                      textAlign: "center", // Center align text within the fixed width
                    }}> sous corticale</Typography>
                    <RadioGroup
                        row
                        name="sous_corticale"
                        value={flairData.sous_corticale}
                        onChange={(event) => handleChange2(event, setFlairData)}
                        sx={{

                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "24px", // Space between the radio buttons for better visual separation
                        }}
                    >
                      <FormControlLabel
                          value="Oui"
                          control={<Radio />}
                          label="Oui"
                          disabled={!isEditable}
                      />
                      <FormControlLabel
                          value="Non"
                          control={<Radio />}
                          label="Non"
                          disabled={!isEditable}
                      />

                    </RadioGroup>
                  </Box>

                  {/* score de fazekas */}

                  <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        // justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "10px", // Adjust spacing as needed

                      }}>
                    <Typography sx={{
                      marginRight: "8px",
                      marginLeft: "8px",
                      flexShrink: 0, // Prevents the label from shrinking when the container size changes
                      width: "200px", // Fixed width for label text
                      textAlign: "center", // Center align text within the fixed width
                    }}>Score de Fazekas</Typography>
                    <TextField
                        required
                        type="number"
                        name="Score_Fazekas"
                        value={flairData.Score_Fazekas}
                        onChange={(event) => handleChange2(event, setFlairData)}
                        InputProps={{

                          endAdornment: <PdfButton pdfUrl="/pdf/Fazekas.pdf" />,

                          readOnly: !isEditable,
                        }}
                        disabled={!isEditable}
                    />

                  </Box>
                </>
            }
          </Box>


          <SubmitButtons isDataAvailable={isDataAvailable} setIsEditable={setIsEditable} isEditable={isEditable}/>


          {successMessage && (
              <Notifications Message={successMessage} setMessage={setSuccessMessage} />
          )}
        </Box>
      </form>
  );
};
export default FLAIR;