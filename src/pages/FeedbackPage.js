import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, push } from "firebase/database";
import { database } from "../firebase";

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const navigate = useNavigate();

  const handleSubmitFeedback = async () => {
    if (rating === 0) {
      alert("Please provide a rating before submitting.");
      return;
    }

    if (feedbackText.trim() === "") {
      alert("Please provide your feedback before submitting.");
      return;
    }

    try {
      const feedbackRef = ref(database, "feedback");
      const feedbackData = {
        rating, // Numeric rating value
        feedback: feedbackText.trim(), // Feedback entered by the user
      };

      await push(feedbackRef, feedbackData);

      alert("Feedback submitted successfully!");
      setRating(0); // Reset the rating
      setFeedbackText(""); // Clear feedback text
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {/* App Logo */}
      <img
        src="/WebAppLogo.png"
        alt="App Logo"
        style={{ width: "200px", height: "auto", marginBottom: "20px" }}
      />

      {/* Page Heading */}
      <h1 style={{ color: "#34CBCC" }}>Feedback</h1>

      {/* Rating Section */}
      <div style={{ marginTop: "40px" }}>
        <input
          type="range"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          style={{ width: "80%", marginBottom: "10px" }}
        />
        <p style={{ color: "#FF6767", fontSize: "20px" }}>
          {rating > 0 ? `Rating: ${rating} / 5` : "Please provide a rating"}
        </p>
      </div>

      {/* Feedback Text Area */}
      <textarea
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        placeholder="Enter your feedback"
        style={{
          width: "80%",
          padding: "10px",
          marginTop: "20px",
          height: "100px",
          fontSize: "16px",
        }}
      ></textarea>

      {/* Submit Button */}
      <button
        onClick={handleSubmitFeedback}
        style={{
          width: "80%",
          padding: "15px",
          marginTop: "20px",
          backgroundColor: "#34CBCC",
          color: "white",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>

      {/* Back Button */}
      <button
        onClick={() => navigate("/student-dashboard")}
        style={{
          width: "80%",
          padding: "15px",
          marginTop: "20px",
          backgroundColor: "#FF6767",
          color: "white",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Back
      </button>
    </div>
  );
};

export default FeedbackPage;
