import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";

const AnalyticsPage = () => {
  const [activeQueries, setActiveQueries] = useState(0);
  const [completedQueries, setCompletedQueries] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQueryAnalytics();
  }, []);

  const fetchQueryAnalytics = () => {
    const queryRef = ref(database, "Alumni Queries"); // Change as needed for other categories

    onValue(queryRef, (snapshot) => {
      if (snapshot.exists()) {
        let activeCount = 0;
        let completedCount = 0;

        snapshot.forEach((childSnapshot) => {
          const queryStatus = childSnapshot.val().queryStatus;
          if (queryStatus === "Submitted, awaiting review") {
            activeCount++;
          } else if (queryStatus === "Completed") {
            completedCount++;
          }
        });

        setActiveQueries(activeCount);
        setCompletedQueries(completedCount);
      } else {
        console.warn("No query data found.");
      }
    });
  };

  const handleViewDetailedReport = () => {
    alert("The report has been emailed.");
  };

  const handleExportData = () => {
    alert("The data has been emailed.");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <img
        src="/WebAppLogo.png"
        alt="App Logo"
        style={{ width: "150px", height: "auto", marginBottom: "20px" }}
      />
      <h1>Analytics Dashboard</h1>
      <div>
        <h3>Active Queries: {activeQueries}</h3>
        <h3>Completed Queries: {completedQueries}</h3>
        <h3>Total Queries: {activeQueries + completedQueries}</h3>
        <div style={{ margin: "20px 0" }}>
          <progress
            value={completedQueries}
            max={activeQueries + completedQueries}
            style={{ width: "100%" }}
          ></progress>
          <p>
            {(
              (completedQueries / (activeQueries + completedQueries || 1)) *
              100
            ).toFixed(2)}
            % of queries completed
          </p>
        </div>
        <hr style={{ margin: "20px 0", borderColor: "#34CBCC" }} />
        <button
          style={styles.button}
          onClick={() => navigate("/admin-dashboard")}
        >
          Back to Dashboard
        </button>
        <button style={styles.button} onClick={handleViewDetailedReport}>
          View Detailed Report
        </button>
        <button style={styles.button} onClick={handleExportData}>
          Export Data
        </button>
      </div>
    </div>
  );
};

const styles = {
  button: {
    display: "block",
    width: "100%",
    padding: "15px",
    margin: "10px 0",
    backgroundColor: "#FF6767",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default AnalyticsPage;
