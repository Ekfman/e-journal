import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callApi } from "../api/utils";

const Register = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const navigate = useNavigate();
  //test if user already exists

  console.log('matchPassword :>> ', matchPassword);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!email) window.alert("Must enter an a valid email address");
      if (!password) window.alert("Must enter a password");
      if (!matchPassword) window.alert("Please re-type your password")
      if (matchPassword !== password) window.alert("Passwords must match")
      if (password.length < 8) window.alert("Password length too short");
      if (matchPassword === password && password >= 8 && email) {
        const result = await callApi({
          method: "POST",
          body: { email, password },
          path: "/users/register",
        });
        if (result) window.alert("You've successfully created an account!");
        setToken(result.token);
        navigate("/calendar");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="registerContainer">
        <h2 className="registerHeader">
          <center>Create your account</center>
        </h2>
        <div className="regFormContainer">
          <form className="registerForm">
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
                Already registered? <a href="/login">Sign in!</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
