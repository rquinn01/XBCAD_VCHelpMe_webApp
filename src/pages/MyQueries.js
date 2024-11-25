import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { database, auth } from "../firebase";
import { ref, onValue, get } from "firebase/database";

const MyQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [staffDepartment, setStaffDepartment] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    setLoading(true);
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;

      console.log("My Queries - Current user ID:", userId);

      // Fetch staff member's data
      const userRef = ref(database, `Users/${userId}`);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.val();
        const department = userData.staffDepartment;
        const role = userData.role || "Staff";
        setStaffDepartment(department);
        setUserRole(role);

        console.log("My Queries - Staff department:", department);
        console.log("My Queries - User role:", role);

        const queryNode =
          department === "Campus Queries"
            ? "Campus Queries"
            : department === "Student Hub Queries"
            ? "Student Hub Queries"
            : department === "Alumni Queries"
            ? "Alumni Queries"
            : null;

        if (!queryNode) {
          console.warn("My Queries - No matching query node for department:", department);
          setQueries([]);
          setLoading(false);
          return;
        }

        // Fetch queries under the staff member's department
        const queriesRef = ref(database, queryNode);
        onValue(queriesRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const sortedQueries = Object.entries(data)
              .map(([id, queryData]) => ({ id, ...queryData }))
              .sort(
                (a, b) =>
                  new Date(a.queryDateTime).getTime() -
                  new Date(b.queryDateTime).getTime()
              ); // Sort by date

            console.log("My Queries - Queries fetched:", sortedQueries);
            setQueries(sortedQueries);
          } else {
            console.warn("My Queries - No queries found for department:", department);
            setQueries([]);
          }
          setLoading(false);
        });
      } else {
        console.warn("My Queries - Staff data not found for user ID:", userId);
        setLoading(false);
        alert("Staff information not found.");
      }
    } else {
      console.warn("My Queries - User not authenticated.");
      setLoading(false);
      alert("User not authenticated.");
    }
  };

  const formatDateTime = (dateTime) => {
    try {
      const date = new Date(dateTime);
      return date.toLocaleString();
    } catch (error) {
      console.error("My Queries - Error formatting date:", error.message);
      return dateTime;
    }
  };

  const handleQueryClick = (query) => {
    console.log("My Queries - Query clicked:", query);
    navigate(`/chat/${query.id}`, { state: { query, role: userRole } });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <img
        src="/WebAppLogo.png"
        alt="App Logo"
        style={{ width: "200px", height: "auto", marginBottom: "5px" }}
      />
      <h1 style={{ color: "#34CBCC" }}>My Queries</h1>

      {loading ? (
        <p>Loading queries...</p>
      ) : queries.length > 0 ? (
        <div style={{ textAlign: "left", maxWidth: "80%", margin: "0 auto" }}>
          <h2 style={{ color: "#FF6767" }}>
            {staffDepartment} Queries
          </h2>
          <hr style={{ borderColor: "#34CBCC" }} />
          {queries.map((query, index) => (
            <div
              key={query.id}
              style={{
                border: "2px solid #FF6767",
                borderRadius: "10px",
                padding: "10px",
                marginBottom: "10px",
                backgroundColor: "#f9f9f9",
                cursor: "pointer",
              }}
              onClick={() => handleQueryClick(query)}
            >
              <h3 style={{ color: "#34CBCC" }}>Query {index + 1}</h3>
              <p>
                <strong>Submitted on:</strong>{" "}
                {formatDateTime(query.queryDateTime)}
              </p>
              <p>
                <strong>Category:</strong> {query.userQueryCategory}
              </p>
              <p>
                <strong>Description:</strong> {query.userQueryDescription}
              </p>
              <p>
                <strong>Status:</strong> {query.queryStatus}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: "#555" }}>No queries found.</p>
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
        onClick={() => navigate("/staff-dashboard")}
      >
        Back
      </button>
    </div>
  );
};

export default MyQueries;
