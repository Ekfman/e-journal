import { callApi } from "../api/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken, darkMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await callApi({
        method: "POST",
        body: { email, password },
        path: "/users/login",
      });
      if (result) {
        console.log(result);
        console.log(result.token);
        setToken(result.token);
        localStorage.setItem("token", result.token);
        navigate("/calendar");
      } else window.alert("Incorrect email or password.")
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className={darkMode ? "registerContainer-dark" : "registerContainer"}>
        <h2 className="registerHeader">
          <center>Sign in to your account</center>
        </h2>
        <div className="regFormContainer">
          <form className={darkMode ? "registerForm-dark" :"registerForm"}>
            <label className="registerLabels">Email:</label>
            <input
              className="inputField"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
            <br></br>
            <br></br>
            <label className="registerLabels">Password:</label>
            <input
              className="inputField"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <div className="buttonContainer">
              <button className="signupButton" onClick={submitHandler}>
                Sign in
              </button>
              <p>
                Don't have an account? <a href="/register">Sign up!</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
