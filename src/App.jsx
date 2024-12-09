import React from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import AddUser from "./pages/Users/AddUser";
import File from "./pages/patient/File";
import LogIn from "./pages/login-signup/LogIn";
import SignUp from "./pages/login-signup/SignUp";
import HospitalisationDetails from "./pages/dossier/HospitalisationDetails";
import Transform from "./pages/Transform";
import Profile from "./pages/Profile";
import PatientList from "./pages/patient/PatientList";
import UserList from "./pages/Users/ListUsers";
import ModifyPatient from "./pages/patient/ModifyPatient";
import ModifyUser from "./pages/Users/ModifyUser";
import Prehospitaliere from "./pages/dossier/Prehospitaliere";
import Hospitaliere from "./pages/dossier/Hospitaliere";
import DossierMedical from "./pages/dossier/DossierMedical";
import Nihss from "./pages/dossier/Nihss/Nihss";
import Imagerie from "./pages/dossier/Imagerie";
import {  useParams } from "react-router-dom";

import AuthService from "./services/auth-service";
import AuthVerify from "./common/auth-verify";
import { useNavigate } from 'react-router-dom';
import PDF from "./services/dossier-pdf";
import Download from "./pages/dossier/Download";
import PatientDossier from "./pages/dossier/PatientDossier";
import { Modal } from "./pages/patient/addpatientmodal";
import ManageRequests from "./pages/ManageRequest";
import PdfButton from "./components/shared/PdfButton";
import PatientHospitalisation from "./pages/patient/PatientHospitalisation";
import Generate from "./pages/Generate";
import PatientDossierHematome from "./pages/dossier/PatientDossierHematome";


export default function App() {

  return (
    <>
      <Router>

      <AuthVerify logOut={() => AuthService.logout()} /> 

        <Routes>
          <Route path="/" element={<Navigate to="/SeConnecter" />} />
          <Route path="/SeConnecter" element={<LogIn />} />
          <Route path="/s'inscrire" element={<SignUp />} />

          <Route path="/createRecordPatient/:id" element={<DossierMedical />} />
          <Route path="/ajouterDossier" element={<DossierMedical />} />
          <Route path="/Nihss/:id" element={<Nihss />} />
          <Route path="/Imagerie/:id" element={<Imagerie />} />
          
          <Route path="/pdf" element={<PDF />} />
          <Route path="/Download/:id" element={<Download />} />


          <Route path="/PatientDossier/:idDossier/:id/:TypeAVC" element={<PatientDossierWrapper />} />

          <Route path="/HospitalisationDetails/:id" element={<HospitalisationDetails />} />
          <Route path="/prehospitaliere/:id" element={<Prehospitaliere />} />
          <Route path="/hospitaliere/:id" element={<Hospitaliere />} />
          <Route path="/ajouterPatient" element={<File />} />
          <Route path="/afficherPatients" element={<PatientList />} />
          <Route path="/afficherHospitalisations/:idDossier" element={<PatientHospitalisation />} />
          <Route path="/edit/:id" element={<ModifyPatient />} />
          <Route path="/ajouterUtilisateur" element={<AddUser />} />
          <Route path="/editUser/:id" element={<ModifyUser />} />
          <Route path="/afficherUsers" element={<UserList />} />
          <Route path="/ManageRequest" element={<ManageRequests />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Generate" element={<Generate />} />
          {/* Add a catch-all route to redirect to the login page */}
          <Route path="*" element={<Navigate to="/SeConnecter" />} />

      
          
        </Routes>
       
      </Router>
     
    </>
  );
}
function PatientDossierWrapper() {
  const { TypeAVC } = useParams();
  const decodedTypeAVC = decodeURIComponent(TypeAVC);

  // Conditionally render based on the TypeAVC
  if (decodedTypeAVC  === "Infarctus cérébral") {
    return <PatientDossier />;
  } else if (decodedTypeAVC  === "Hématome cérébral") {
    return <PatientDossierHematome />;
  } else {
    return <Navigate to="/SeConnecter" />; // Redirect if the TypeAVC is not valid
  }
}