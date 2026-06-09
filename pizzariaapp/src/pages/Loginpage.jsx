import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Loginpage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";
import axios from "axios";

function Loginpage() {
  const [usernameoremail, setUsernameoremail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const { setUser } = useLogin();

  const navigate = useNavigate();
  const gotoregisterpage = () => {
    navigate("/register");
  };

  const submitlogin = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/api/login",
        { usernameoremail, password },
        { withCredentials: true },
      )
      .then((response) => {
        alert("Login Successful");
        setUser(response.data.user);
        navigate("/home");
      })
      .catch((error) => {
        console.log("Error sending the Logindata", error);
        alert("User Not Found!!");
        navigate("/register");
      });
  };
  return (
    <div className="loginpageoutercontainer container-fluid">
      <div className="loginpageinnercontainer">
        <h3 className="signinheading">Sign in or Create account</h3>
        <form onSubmit={submitlogin}>
          <br />
          <label className="usernamelabel">Enter username or email</label>
          <br />
          <input
            type="text"
            value={usernameoremail}
            onChange={(e) => setUsernameoremail(e.target.value)}
            required
            className="usernameinput"
          />
          <br />
          <label className="passwordlabel">Enter Password</label>
          <br />
          <div className="password-container">
            <input
              type={showpassword?"text":"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={3}
              maxLength={20}
              required
              className="passwordinput"
            />
            <i
              className={`fa-solid ${
                showpassword ? "fa-eye" : "fa-eye-slash"
              } eye-icon`}
              onClick={() => setShowpassword(!showpassword)}
            ></i>
          </div>

          <br />
          <button type="submit" className="btn btn-warning loginbutton">
            Login
          </button>
          <br />
          <p className="signuppara">
            Doesn't have account?
            <span
              style={{ cursor: "pointer" }}
              className="signupspan"
              onClick={gotoregisterpage}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Loginpage;
