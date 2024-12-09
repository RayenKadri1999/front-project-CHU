import React , { useState ,Component} from "react";
import Sidenav from "../components/shared/Sidenav";
import Box from "@mui/material/Box";
import Navbar from "../components/shared/Navbar";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Navigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthService from "../services/auth-service";

import Button from "@mui/material/Button";
const theme = createTheme({
  palette: {
    primary: {
      main: "#0E8388",
    },
  },
});


const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});



// export default function Profile() {
  // const VisuallyHiddenInput = styled("input")({
  //   clip: "rect(0 0 0 0)",
  //   clipPath: "inset(50%)",
  //   height: 1,
  //   overflow: "hidden",
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   whiteSpace: "nowrap",
  //   width: 1,
  // });

//   const [loginData, setData] = useState({
//      redirect: null,
//       userReady: false,
//       currentUser: { username: "" }
//   });

//   const currentUser = AuthService.getCurrentUser();

//   if (!currentUser) setData({ redirect: "/home" });
//   setData({ currentUser: currentUser, userReady: true })

//   // if (loginData.redirect) {
//   //   return <Navigate to={loginData.redirect} />
//   // }
  

  
//   return (
    
    // <>
    //   <Navbar />
    //   <Box height={30} />
    //   <Box sx={{ display: "flex" }}>
    //     <Sidenav />
    //     <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    //       <ThemeProvider theme={theme}>
    //         <h1 className="mt-5 ml-5">Profil User</h1>
    //         <div className="row justify-content-around mt-5 user-info">
    //           <div className="col-12 col-md-3">
                

    //             <Button
    //               component="label"
    //               variant="contained"
    //               startIcon={<CloudUploadIcon />}
    //             >
    //               Changer Image
    //               <VisuallyHiddenInput type="file" />
    //             </Button>
    //           </div>
    //           <div className="col-12 col-md-5">
    //             <h4>Nom et prénom</h4>
    //             <p>folen foleni</p>

    //             <h4>Email Address</h4>
    //             <p>folen@gmail.com</p>

    //             <Button variant="outlined" href="/updatepassword">
    //               Modifier Password
    //             </Button>
    //           </div>
    //         </div>
    //       </ThemeProvider>
    //     </Box>
    //   </Box>
    // </>
//   );
// }














export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: ""}
    };
    
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser:currentUser , userReady: true })
    // console.log(typeof( currentUser.accessToken));
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <ThemeProvider theme={theme}>
            <h1 className="mt-5 ml-5">Profil User</h1>
            <div className="row justify-content-around mt-5 user-info">
              <div className="col-12 col-md-3">
                

                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Changer Image
                  <VisuallyHiddenInput type="file" />
                </Button>
              </div>
              <div className="col-12 col-md-5">
                <h4>Nom et prénom</h4>
                <p>{currentUser.username}</p>

                <h4>Email Address</h4>
                <p>{currentUser.email}</p>


                
             

                <strong>Authorities:</strong>
                {/* <ul>
                {currentUser.roles &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                </ul> */}

                <p>{currentUser.roles} </p>
                <Button variant="outlined" href="/updatepassword">
                  Modifier Password
                </Button>
              </div>
            </div>
          </ThemeProvider>
        </Box>
      </Box>
    </>
    );
  }
}