import React from "react";
import axios from "axios";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./allResultStyle.css";
function AllResult() {
  const navigate = useNavigate();
  const [election, setElection] = useState([]);
  const fetchResult = async () => {
    try {
      const response = await axios.get("http://voting-app.local/api/elections");
      setElection(response.data.data.elections);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchResult();
  }, []);

  const handleResultClick = (electionId) => {
    navigate(`/result/${electionId}`);
  };

  return (
    <div className="all-result-main-container">
      <h1 className="all-result-h">All Elections</h1>
      <div className="all-result-election-div">
        {election.map((election) => (
          <div key={election.id} className="all-result-single-div">
            <p className="all-result-name">{election.name}</p>
            <p className="all-result-id">Election Id:{election.id}</p>

            <button
              onClick={() => handleResultClick(election.id)}
              className="all-result-button"
            >
              Result
              <ArrowForwardIcon fontSize="small" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllResult;
