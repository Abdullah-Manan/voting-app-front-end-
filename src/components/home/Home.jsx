import React, { useEffect, useState } from "react";
import axios from "axios";

import "./homeStyle.css";
import { useNavigate } from "react-router-dom";
function Home() {
  const [elections, setElections] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get("http://voting-app.local/api/elections");

      setElections(response.data.data.elections);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-main-container">
      <h1 className="h-heading">All Elections</h1>
      <div className="h-all-elections">
        {elections.map((elections) => (
          <div key={elections.id} className="single-elec">
            <h1 className="h-elc-name">{elections.name}</h1>
            <p className="h-date-text">
              Start Date:
              <span className="h-date"> {elections.start_date_time}</span>
            </p>
            <p className="h-date-text">
              End Date:
              <span className="h-date"> {elections.end_date_time}</span>
            </p>
            <button
              className="h-button"
              onClick={() => {
                navigate(`/allcandidates/${elections.id}`);
              }}
            >
              Vote Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
