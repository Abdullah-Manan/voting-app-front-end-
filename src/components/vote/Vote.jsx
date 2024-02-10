import React, { useEffect, useState } from "react";
import "./voteStyle.css";
import Webcam from "react-webcam";
import axios from "axios";
import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

function VotingPage() {
  const navigate = useNavigate();
  const { electionId, userId } = useParams();
  const [image, setImage] = useState(null);
  const [voter_email, setEmail] = useState("");

  const webref = useRef(null);
  const takeImage = () => {
    const screenshot = webref.current.getScreenshot();
    setImage(screenshot);
  };
  const reTake = () => {
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      console.error("Please capture an image before submitting.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("image", dataURLtoFile(image, "image.png"));
      formData.append("election_id", electionId);
      formData.append("candidate_id", userId);
      formData.append("voter_email", voter_email);

      const response = await axios.post(
        "http://voting-app.local/api/votes",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image uploaded:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };
  return (
    <div className="v-main-container">
      <form onSubmit={handleSubmit} className="v-form">
        <h1 className="v-top-h">Vote</h1>
        <div className="v-webcam-div">
          {!image ? (
            <div className="v-webcam-div">
              <Webcam
                ref={webref}
                screenshotFormat="image/png"
                className="v-webcam"
                height={400}
                width={400}
              />
              <button onClick={takeImage} className="v-button">
                Scan
              </button>
            </div>
          ) : (
            <div className="voter-image-div">
              <img src={image} alt="" className="voter-image" />
              <button onClick={reTake} className="v-button">
                Retake
              </button>
            </div>
          )}
        </div>
        <div className="v-email-div">
          <label htmlFor="email" className="v-email-label">
            Enter Email:
          </label>
          <input
            type="email"
            required
            className="v-email"
            placeholder="Enter Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="v-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default VotingPage;
