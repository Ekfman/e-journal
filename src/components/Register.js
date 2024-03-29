import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callApi } from "../api/utils";

const Register = ({ setToken, darkMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const navigate = useNavigate();
  //test if user already exists

  console.log('matchPassword :>> ', matchPassword);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      if (!email) window.alert("Must enter an a valid email address");
      if (!password) window.alert("Must enter a password");
      if (!matchPassword) window.alert("Please re-type your password")
      if (matchPassword !== password) window.alert("Passwords must match")
      if (password.length < 8) window.alert("Password length too short");
      console.log("we made it until here");
      if (matchPassword === password && password.length >= 8 && email) {
        console.log("we made inside the if statement");
        const result = await callApi({
          method: "POST",
          body: { email, password },
          path: "/users/register",
        });
        console.log("account info", result);
        if(!result) window.alert("Email already in use.")
        if (result) window.alert("You've successfully created an account!");
        console.log(result.token);
        setToken(result.token);
        navigate("/calendar");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className={darkMode ? "registerContainer-dark" : "registerContainer"}>
        <h2 className="registerHeader">
          <center>Create your account</center>
        </h2>
        <div className="regFormContainer">
          <form className={darkMode ? "registerForm-dark" :"registerForm"}>
            <label className="registerLabels">Enter Email:</label>
            <input
              className="inputField"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
            <br></br>
            <br></br>
            <label className="registerLabels">
              Create Password:
              <div className="passwordNote">
                (must be at least 8 characters)
              </div>
            </label>
            <input
              className="inputField"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
            <br></br>
            <label className="registerLabels">
              Re-type Password:
              <div className="passwordNote">
                (passwords must match)
              </div>
            </label>
            <input
              className="inputField"
              type="password"
              onChange={(e) => setMatchPassword(e.target.value)}
              required
            ></input>
            <div className="buttonContainer">
              <button className="signupButton" onClick={submitHandler}>
                Create Account
              </button>
              <p>
                Already registered? <a href="/">Sign in!</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
