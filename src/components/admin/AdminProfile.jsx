import React from "react";
import "./adminProfileStyle.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmailIcon from "@mui/icons-material/Email";
import Person2Icon from "@mui/icons-material/Person2";
import adimg from "../../assets/admin/admin.png";
import caimg from "../../assets/admin/candidate.png";
import elimg from "../../assets/admin/election.png";
import { useNavigate } from "react-router-dom";
function AdminProfile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  return (
    <div className="ad-main-container">
      <div className="ad-left-main">
        <div className="ad-left">
          <div className="ad-left-img">
            <img src={adimg} alt="AdminImg" className="ad-img" />
            <span className="ad-name">Admin</span>
          </div>
          <hr />
          <div className="ad-left-bottom">
            <span className="ad-email">
              <EmailIcon fontSize="large" />
              Admin@voting-App.com
            </span>

            <button
              className="relust-botton"
              onClick={() => {
                navigate("/");
              }}
            >
              View All Elections <ArrowForwardIcon fontSize="medium" />
            </button>
            <button
              className="relust-botton"
              onClick={() => {
                navigate("/allresult");
              }}
            >
              See Result <ArrowForwardIcon fontSize="medium" />
            </button>
            <button
              className="relust-botton"
              onClick={() => {
                localStorage.removeItem("token");

                const token = localStorage.getItem("token");

                if (!token) {
                  navigate("/login");
                }
              }}
            >
              <Person2Icon fontSize="large" />
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="ad-right">
        <div className="new-cand">
          <img src={caimg} alt="img" className="new-cand-img" />
          <span className="new-cand-text">Create New Candidate</span>
          <button
            className="new-cand-botton"
            onClick={() => {
              navigate("/addcandidate");
            }}
          >
            Add
          </button>
        </div>
        <div className="new-cand">
          <img src={elimg} alt="img" className="new-elc-img" />
          <span className="new-cand-text">Create New Election</span>
          <button
            className="new-cand-botton"
            onClick={() => {
              navigate("/addelection");
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
