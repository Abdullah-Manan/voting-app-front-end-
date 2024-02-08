import React from "react";
import "./addCandidateStyle.css";
import { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
function AddCandidate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setIamge] = useState(null);
  const [election_id, setElectionId] = useState("");
  const [election_party, setElectionParty] = useState("");
  const [election_symbol, setElectionSymbol] = useState("");
  const [symbol_image, setSymbolImage] = useState(null);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.log("UnAuthorized User");
    }
  }, []);
  const handleCandidateImage = (e) => {
    const file = e.target.files[0];
    setIamge(file);
  };
  const handleSymbolImage = (e) => {
    const file = e.target.files[0];
    setSymbolImage(file);
  };
  const handleAddCandidate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("election_id", election_id);
    formData.append("election_party", election_party);
    formData.append("election_symbol", election_symbol);
    formData.append("image", image);
    formData.append("symbol_image", symbol_image);

    try {
      const response = await axios.post(
        "http://voting-app.local/api/candidates",
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
    <div className="can-main-container">
      <div className="can-form">
        <div className="can-top">Add Candidate</div>
        <form onSubmit={handleAddCandidate}>
          <div className="can-input">
            <div className="name-input">
              <span className="can-text">Enter Name:</span>
              <input
                type="text"
                placeholder="Name"
                className="can-name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="email-input">
              <span className="can-text">Enter Email:</span>
              <input
                type="email"
                placeholder="Email Address"
                className="can-email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="img-input">
              <span className="log-text">Candidate Image:</span>
              <input type="file" onChange={handleCandidateImage} />
            </div>
            <div className="party-input">
              <span className="can-text">Election Id:</span>
              <input
                type="text"
                placeholder="Party Name"
                className="can-party"
                onChange={(e) => setElectionId(e.target.value)}
              />
            </div>
            <div className="party-input">
              <span className="can-text">Election Party:</span>
              <input
                type="text"
                placeholder="Party Name"
                className="can-party"
                onChange={(e) => setElectionParty(e.target.value)}
              />
            </div>
            <div className="party-input">
              <span className="can-text">Election Symbol:</span>
              <input
                type="text"
                placeholder="Party Name"
                className="can-party"
                onChange={(e) => setElectionSymbol(e.target.value)}
              />
            </div>
            <div className="party-input">
              <span className="can-text">Symbol Image:</span>

              <input type="file" onChange={handleSymbolImage} />
            </div>
          </div>
          <button type="submit" className="can-add-button">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCandidate;
