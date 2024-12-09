import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import LogoS from "../../images/logoS.png";
import LogoL from "../../images/logoL.png";
import AuthService from "../../services/auth-service";

const Login = () => {
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(""); // Clear error on input change
    setPasswordError(false); // Reset password error sta
  };


  const handleLogin = (e) =>{
    e.preventDefault();
    console.log(loginData.email,loginData.password);

    // this.setState({
    //   message: "",
    //   loading: true
    // });

    // this.form.validateAll();

    // if (this.checkBtn.context._errors.length === 0) 
      AuthService.login(loginData.email,loginData.password).then(
        (response) => {
          const userRole = response.roles
          console.log(userRole)
          if (userRole === "normalUser") {
            navigate("/ajouterPatient");
          } else if (userRole === "superUser" || userRole === "admin") {
            navigate("/afficherPatients");
          }
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            setError("Email ou mot de passe incorrect"); // Set error message
            setPasswordError(true);
          // this.setState({
          //   loading: false,
          //   message: resMessage
          // });
        }
      );
    //  else {
    //   this.setState({
    //     loading: false
    //   });
    // }
  }




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData), 
      });
    
      if (response.ok) {
        const data = await response.json();

        // Store the access token in localStorage

        
        console.log("User signed in successfully:", data);

        // Redirect or perform other actions after successful signin
        navigate("/afficherPatients");
      }
       else {
        const errorData = await response.json();
        console.error("Signin failed:", errorData);
        setError("Email ou mot de passe incorrect"); // Set error message
        setPasswordError(true);
        // Handle signin failure, show error message, etc.
      }
    } catch (error) {
      console.error("Signin failed:", error);
      setError("Erreur de connexion, veuillez réessayer.");
      setPasswordError(true);
    }
  };


  return (
<div className="login-container">
      <form onSubmit={handleLogin} className="form">
        <div className="form-content">

          <div className="side-logo">
            <img className="image" src={LogoS} alt="LogoS" />
          </div>
          <div className="form-fields">
            <div className="form-header">
            <div className="image_container1">
            <img className="image1" src={LogoL} alt="LogoL" />
          </div>
              <div className="header">
                <div className="text">Se Connecter</div>
                <div className="underline"></div>
              </div>
            </div>

            <div className="inputs">
              <div className="input">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  required
                  onChange={handleChange}
                  className={passwordError ? "error-input" : ""}
                />
              </div>
            </div>
            <div className="button-container">
            <div className="submit-container">
              <button type="submit" className="submit">
                Soumettre
              </button>
            </div>
            </div>
            {error && <div className="error-message">{error}</div>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
