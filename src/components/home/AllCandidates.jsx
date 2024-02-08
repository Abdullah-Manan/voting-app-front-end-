import React, { useEffect, useState } from "react";
import axios from "axios";
import "./allCandidatesStyle.css";
import { useParams } from "react-router-dom";

function AllCandidates() {
  const { id } = useParams();
  const [candidates, setCandidates] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://voting-app.local/api/candidates?election_id=${id}`
      );
      setCandidates(response.data.data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="c-main-container">
      <h1 className="c-heading">All Candidates</h1>
      <div className="c-all-elections">
        {candidates.length > 0 ? (
          candidates.map((user) => (
            <div key={user.id} className="single-can">
              <img src={user.image_url} alt="image" className="c-img" />
              <h1 className="c-can-name">{user.name}</h1>
              <p className="h-date-text">
                Party Name: {user.candidates[0].election_party}
              </p>
              <p className="h-date-text">
                Party Symbol: {user.candidates[0].election_symbol}
              </p>
              <button className="c-button">Vote Now</button>
            </div>
          ))
        ) : (
          <p>No candidates found</p>
        )}
      </div>
    </div>
  );
}

export default AllCandidates;
