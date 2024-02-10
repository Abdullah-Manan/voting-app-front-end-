import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./resultStyle.css";
function Result() {
  const { electionId } = useParams();
  const [result, setResult] = useState([]);

  const fetchResult = async () => {
    try {
      const response = await axios.get(`http://voting-app.local/api/results`, {
        params: {
          election_id: electionId,
        },
      });
      setResult(response.data.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchResult();
  }, [electionId]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.log("UnAuthorized User");
    }
  }, []);

  return (
    <div className="all-result-main-container">
      {result.length ? (
        <div>
          {result.map((election) => (
            <div key={election.id} className="result-single-div">
              <p className="result-election-name">{election.name}</p>

              {election.candidates.length ? (
                <div className="candidate-vote">
                  {election.candidates.map((candidate, index) => (
                    <div key={index} className="candidate-item">
                      <p className="candidate-name">Name: {candidate.name}</p>
                      <p className="candidate-party">
                        Party: {candidate.election_party}
                      </p>
                      <p className="candidate-votes">
                        Votes: {candidate.votes}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <h1>No Candidate</h1>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>No result Found</p>
        </div>
      )}
    </div>
  );
}

export default Result;
