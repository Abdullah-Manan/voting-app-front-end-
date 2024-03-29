import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/navbar/logo.png";
import PersonIcon from "@mui/icons-material/Person";
import "./navbarStyle.css";
function Navbar() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, [token]);
  return (
    <div className="nav-main-container">
      <div className="nav-logo">
        <Link to="/" className="logo-link">
          <img src={logo} alt="logo" className="logo-img" />
        </Link>
      </div>
      {/* <div className="nav-li">
        <li>
          <Link className="li-links" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="li-links" to="/about">
            About Us
          </Link>
        </li>
        <li>
          <Link className="li-links" to="/contact">
            Contact Us
          </Link>
        </li>
      </div> */}
      <div className="nav-login">
        {token ? (
          <Link className="login-link" to="/adminprofile">
            <PersonIcon />
            Admin
          </Link>
        ) : (
          <Link className="login-link" to="/login">
            <PersonIcon />
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
