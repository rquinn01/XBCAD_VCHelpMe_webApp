import React from "react";
import { useNavigate } from "react-router-dom";

const CreateQuery = () => {
  const navigate = useNavigate();

  const showHelpDialog = (message) => {
    alert(message);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <img
        src="/WebAppLogo.png"
        alt="App Logo"
        style={{ width: "200px", height: "auto", marginBottom: "20px" }}
      />
      <h1>Create Query</h1>
      <div style={{ margin: "20px 0", display: "flex", alignItems: "center" }}>
        <button
          style={{
            width: "300px",
            padding: "10px",
            margin: "10px",
            backgroundColor: "#FF6767",
            color: "white",
            fontSize: "14px",
            border: "none",
            borderRadius: "5px",
          }}
          onClick={() => navigate("/campus-query")}
        >
          Campus Queries
        </button>
        <button
          style={{
            padding: "8px",
            backgroundColor: "#34CBCC",
            color: "white",
            fontSize: "14px",
            border: "none",
            borderRadius: "50%",
          }}
          onClick={() =>
            showHelpDialog(
              "To raise a campus-related query e.g., Academics, Assessments, Timetables, Finance or Admissions, click for more info."
            )
          }
        >
          ?
        </button>
      </div>
      <div style={{ margin: "20px 0", display: "flex", alignItems: "center" }}>
        <button
          style={{
            width: "300px",
            padding: "10px",
            margin: "10px",
            backgroundColor: "#FF6767",
            color: "white",
            fontSize: "14px",
            border: "none",
            borderRadius: "5px",
          }}
          onClick={() => navigate("/studenthub-query")}
        >
          Student Hub Queries
        </button>
        <button
          style={{
            padding: "8px",
            backgroundColor: "#34CBCC",
            color: "white",
            fontSize: "14px",
            border: "none",
            borderRadius: "50%",
          }}
          onClick={() =>
            showHelpDialog(
              "To raise a query on the Student Hub e.g., appeals, remarks, credit applications, click for more info."
            )
          }
        >
          ?
        </button>
      </div>
      <div style={{ margin: "20px 0", display: "flex", alignItems: "center" }}>
        <button
          style={{
            width: "300px",
            padding: "10px",
            margin: "10px",
            backgroundColor: "#FF6767",
            color: "white",
            fontSize: "14px",
            border: "none",
            borderRadius: "5px",
          }}
          onClick={() => navigate("/alumni-query")}
        >
          Alumni Queries
        </button>
        <button
          style={{
            padding: "8px",
            backgroundColor: "#34CBCC",
            color: "white",
            fontSize: "14px",
            border: "none",
            borderRadius: "50%",
          }}
          onClick={() =>
            showHelpDialog(
              "If you are a past student or Alumnus and need assistance, click for more info."
            )
          }
        >
          ?
        </button>
      </div>
      <div style={{ margin: "20px 0" }}>
        <button
          style={{
            width: "300px",
            padding: "10px",
            margin: "10px auto",
            backgroundColor: "#34CBCC",
            color: "white",
            fontSize: "14px",
            border: "none",
            borderRadius: "5px",
          }}
          onClick={() => navigate("/student-dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CreateQuery;
