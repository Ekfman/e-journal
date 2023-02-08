const Register = () => {
    return(
        <div className="container">
            <div className="registerContainer">
                <h2 className="registerHeader"><center>Create your account</center></h2>
                <div className="regFormContainer">
                <form className="registerForm">
                    <label className="registerLabels">Enter Email:</label>
                    <input className="inputField" type="email" required></input>
                    <br></br>
                    <br></br>
                    <label className="registerLabels">Create Password:</label>
                    <input className="inputField" type="password" required></input>
                </form>
                </div>
                <p><center>Already registered? <a href="/login">Sign in!</a></center></p>
            </div>

        </div>
    )
}

export default Register;