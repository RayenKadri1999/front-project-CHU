import React, { useState,useEffect } from "react";
import { withRouter } from "./with-router";
import { useNavigate } from 'react-router-dom';
import { Navigate, redirect } from "react-router-dom";
import AuthService from "../services/auth-service";
import parseJwt from "./parsejwt";





// const AuthVerify = (props) => {
//   const navigate = useNavigate(); // Hook to programmatically navigate
//   const [a, setData] = useState(false);
  
//   let location = props.router.location;
//   // console.log(location);
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     console.log(location)
//     if (location.pathname !='/SeConnecter' && user) {
      
//       const decodedJwt = parseJwt(user.accessToken);
      
//       if (decodedJwt.exp * 1000 < Date.now()) {
        
//         props.logOut();
//         setData(true);
        
//       }
//     }else{
//       setData(true);
    
//       console.log("location");
      
       
      
//     }
//   }, [location]);

//   if (a) {
//     console.log("a true");
    
//     // return <Navigate to="/SeConnecter" />
    
//   }

//   return <div></div>;
// };

// export default withRouter(AuthVerify);


const AuthVerify = (props) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Track authentication status
  let location = props.router.location;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
   
    if (location.pathname !== '/seConnecter') {
      
      if (user) {
      
        const decodedJwt = parseJwt(user.accessToken);

        if (decodedJwt.exp * 1000 < Date.now()) {
        
           AuthService.logout();
           setIsAuthenticated(false);
           navigate('/seConnecter');
         
        }
       }
       else {
       
        setIsAuthenticated(false);
        navigate('/seConnecter');
      }
    } else {
      if(user) {
        navigate('/afficherPatients');
        setIsAuthenticated(true); //display patientlist if the user is autentificated
      
      }else{
        setIsAuthenticated(false);
        navigate('/seConnecter');

      }
      
    }
  }, [location]);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     console.log("azeazeaze")
  //     navigate('/seConnecter');
  //   }
  // }, [isAuthenticated, navigate]);

  return null; // Render nothing when authenticated
};

export default withRouter(AuthVerify) ;