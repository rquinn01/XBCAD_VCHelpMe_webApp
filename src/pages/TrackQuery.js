import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database, auth } from "../firebase";
import { ref, query, orderByChild, equalTo, get } from "firebase/database";

const TrackQuery = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    setLoading(true);
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;

      const categories = [
        { type: "Campus Queries", displayName: "Campus Queries" },
        { type: "Student Hub Queries", displayName: "Student Hub Queries" },
        { type: "Alumni Queries", displayName: "Alumni/Former Student Queries" },
      ];

      const allQueries = [];

      for (const category of categories) {
        const categoryRef = query(
          ref(database, category.type),
          orderByChild("userID"), // Ensure this matches your Firebase rules
          equalTo(userId)
        );

        const snapshot = await get(categoryRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const sortedQueries = Object.entries(data)
            .map(([id, queryData]) => ({ id, ...queryData }))
            .sort((a, b) => new Date(b.queryDateTime) - new Date(a.queryDateTime));

          allQueries.push({ category: category.displayName, queries: sortedQueries });
        } else {
          allQueries.push({ category: category.displayName, queries: [] });
        }
      }

      setQueries(allQueries);
    }
    setLoading(false);
  };

  const formatDateTime = (dateTime) => {
    try {
      const date = new Date(dateTime);
      return date.toLocaleString();
    } catch {
      return dateTime;
    }
  };

  const handleRefresh = () => {
    fetchQueries();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <img
        src="/WebAppLogo.png"
        alt="App Logo"
        style={{ width: "200px", height: "auto", marginBottom: "20px" }}
      />
      <h1 style={{ color: "#34CBCC" }}>Track Queries</h1>

      {loading ? (
        <p>Loading queries...</p>
      ) : (
        <div style={{ textAlign: "left", maxWidth: "80%", margin: "0 auto" }}>
          {queries.map((category, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <h2 style={{ color: "#FF6767" }}>{category.category}</h2>
              <hr style={{ borderColor: "#34CBCC" }} />
              {category.queries.length > 0 ? (
                category.queries.map((query, idx) => (
                  <div
                    key={query.id}
                    style={{
                      border: "2px solid #FF6767",
                      borderRadius: "10px",
                      padding: "10px",
                      marginBottom: "10px",
                      backgroundColor: "#f9f9f9",
                    }}
                    onClick={() =>
                      navigate(`/chat/${query.id}`, { state: { query } })
                    }
                  >
                    <h3 style={{ color: "#34CBCC" }}>Query {idx + 1}</h3>
                    <p><strong>Submitted on:</strong> {formatDateTime(query.queryDateTime)}</p>
                    <p><strong>Category:</strong> {query.userQueryCategory}</p>
                    <p><strong>Description:</strong> {query.userQueryDescription}</p>
                    <p><strong>Status:</strong> {query.queryStatus}</p>
                  </div>
                ))
              ) : (
                <p style={{ color: "#555" }}>No queries submitted yet.</p>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        style={{
          width: "80%",
          padding: "15px",
          marginTop: "20px",
          backgroundColor: "#FF6767",
          color: "white",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
        }}
        onClick={handleRefresh}
      >
        Refresh
      </button>
      <button
        style={{
          width: "80%",
          padding: "15px",
          marginTop: "10px",
          backgroundColor: "#34CBCC",
          color: "white",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
        }}
        onClick={() => navigate("/student-dashboard")}
      >
        Back
      </button>
    </div>
  );
};

export default TrackQuery;
