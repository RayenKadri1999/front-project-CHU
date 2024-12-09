import axios from "axios";
import authHeader from "./auth-header";


class ApiServices {
 
   loadDossierDetails = async (setData,apiname,setIsDataAvailable,setError,id) => {
 
    try {
     
      const result = await axios.get(`http://localhost:3000/api/${apiname}/getDetails/${encodeURIComponent(id)}`, {
        headers: authHeader(),
      });
      if (result.status === 200) {
        setData(result.data);
  
        setIsDataAvailable(true);
        return result.data;
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setIsDataAvailable(false);
        
          setError("  Il n'y a pas de données pour ce patient.");
         
      } else {
       
        setError("Failed to load data.");
      }
    }
  };


  
 handleSubmit = async (e,Data,apiname,setSuccessMessage,isDataAvailable,setIsDataAvailable,setIsEditable,setError,id) => {
  e.preventDefault();
  setError(null);
  setSuccessMessage("");

  const url = isDataAvailable
    ? `http://localhost:3000/api/${apiname}/update/${id}`
    : `http://localhost:3000/api/${apiname}/create`;
  const method = "POST" ;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": authHeader()["x-access-token"],
      },
      body: JSON.stringify(Data),
    });

    if (response.status === 201) {
      setSuccessMessage("Data saved successfully!");
      setIsEditable(false);
      if (!isDataAvailable){
        setIsDataAvailable(true);
      }
    } else {
        setError("Failed to save data.");
    }
  } catch (error) {
     
    setError("An error occurred while saving data.");
  }
};



handleSubmitModal = async (e,Data,apiname,setSuccessMessage,firstcreation,handleClose,setError,id) => {
  e.preventDefault();
  setError(null);
  setSuccessMessage("");

  const url = firstcreation
  ? `http://localhost:3000/api/${apiname}/create`
    : `http://localhost:3000/api/${apiname}/update/${id}`;
    const method = "POST" ;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": authHeader()["x-access-token"],
      },
      body: JSON.stringify(Data),
    });

    if (response.status === 201) {
      setSuccessMessage("Data saved successfully!");
      handleClose();
    } else if (response.status === 400 || response.status === 409 ) {
      const errorData = await response.json();
      setError(errorData.error);    
    }
    
     else {
      
      setError("Échec de l'enregistrement des données");
    }
  } catch (error) {
    setError("Une erreur s'est produite lors de l'enregistrement des données");
  }
};


handleDeleteIRMDetails =  async (e, apiname, setError, id) => {
  e.preventDefault();
  setError(null);


  const url = `http://localhost:3000/api/imagerie/${apiname}/delete/${id}`;
  const method = "DELETE";

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": authHeader()["x-access-token"],
      },
    });

    if (response.status === 200) {
    
    } else {
      setError(`Une erreur est survenue${apiname}`);
    }
  } catch (error) {
    setError("Une erreur est survenue");
  }
};

}



export default new ApiServices();