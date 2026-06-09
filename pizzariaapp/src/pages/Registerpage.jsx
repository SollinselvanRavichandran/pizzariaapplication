import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Registerpage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Registerpage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [showconfirmpassword, setShowconfirmpassword] = useState(false);
  const [confirmpassword, setConfirmpassword] = useState("");

  const navigate = useNavigate();
  const gotologinpage = () => {
    navigate("/login");
  };
  const registeruser = () => {
    axios
      .post(
        "https://pizzariaapplication.onrender.com/api/user/post",
        { username, email, password },
        { withCredentials: true },
      )
      .catch((error) => {
        console.log("Error registering the user ", error);
      });
    alert("User Registered Successfully");
    navigate("/home");
  };
  return (
    <div className="registerpageoutercontainer container-fluid">
      <div className="registerpageinnercontainer">
        <h3 className="signupheading">Create your account</h3>

        <form onSubmit={registeruser}>
          <br />

          <label className="usernamelabel">Enter Username</label>

          <br />

          <input
            type="text"
            value={username}
            maxLength={13}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="usernameinput"
          />

          <br />

          <label className="emaillabel">Enter Email</label>

          <br />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="emailinput"
          />

          <br />

          <label className="passwordlabel">Enter Password</label>

          <br />
          <div className="password-container">
            <input
              type={showpassword ? "text" : "password"}
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
          <label className="confirmpasswordlabel">Confirm Password</label>
          <br />
          <div className="password-container">
            <input
              type={showconfirmpassword ? "text" : "password"}
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              minLength={3}
              maxLength={13}
              required
              className="confirmpasswordinput"
            />
            <i
              className={`fa-solid ${
                showconfirmpassword ? "fa-eye" : "fa-eye-slash"
              } eye-icon`}
              onClick={() => setShowconfirmpassword(!showconfirmpassword)}
            ></i>
          </div>
          <br />

          <button type="submit" className="btn btn-warning registerbutton">
            Register
          </button>

          <br />

          <p className="loginpara">
            Already have an account?
            <span
              style={{ cursor: "pointer" }}
              className="loginspan"
              onClick={gotologinpage}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registerpage;
