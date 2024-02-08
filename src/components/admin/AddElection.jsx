import React from "react";
import "./addElectionStyle.css";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
function AddCandidate() {
  const [name, setName] = useState("");
  const [start_date_time, setStartDate] = useState("");
  const [end_date_time, setEndDate] = useState("");
  const [user, setUser] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.log("UnAuthorized User");
    }
  }, []);

  const handleAddElection = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("start_date_time", start_date_time);
    formData.append("end_date_time", end_date_time);

    try {
      const response = await axios.post(
        "http://voting-app.local/api/elections",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser(response.data);
      navigate("/adminprofile");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="elc-main-container">
      <div className="elc-form">
        <div className="elc-top">Add Election</div>
        <form onSubmit={handleAddElection}>
          <div className="elc-input">
            <div className="name-input">
              <span className="elc-text">Enter Name:</span>
              <input
                type="text"
                placeholder="Name"
                className="elc-name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="start-input">
              <span className="elc-text">Enter Start Date:</span>
              <input
                type="datetime-local"
                placeholder="start Date"
                className="elc-start"
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="end-input">
              <span className="elc-text">Enter End Date:</span>
              <input
                type="datetime-local"
                placeholder="End Date"
                className="elc-end"
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="elc-button">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCandidate;
