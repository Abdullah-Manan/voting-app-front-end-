import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./adminLoginStyle.css";
import { useNavigate } from "react-router-dom";
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://voting-app.local/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    setUser(data);
    console.log(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/adminprofile");
    }
  }, []);
  useEffect(() => {
    if (user.success === true) {
      const token = user.data.token;
      localStorage.setItem("token", token);
      navigate("/adminprofile");
    }
  }, [user]);

  return (
    <div className="log-main-container">
      <div className="log-form">
        <div className="log-top">Admin Login</div>
        <form onSubmit={handleLogin}>
          <div className="log-input">
            <div className="email-input">
              <span className="log-text">Enter Email:</span>
              <input
                type="email"
                placeholder="Email Address"
                className="log-email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="pass-input">
              <span className="log-text">Enter Password:</span>
              <input
                type="password"
                placeholder="Password"
                className="log-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <span className="log-error">
              {user.success == false ? <div>Error:{user.message}</div> : null}
            </span>

            <button type="submit" className="log-button">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
