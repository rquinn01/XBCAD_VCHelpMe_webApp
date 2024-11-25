import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <img
        src="/WebAppLogo.png"
        alt="App Logo"
        style={{ width: "200px", height: "auto", marginBottom: "5px" }}
      />
      <h1>Admin Dashboard</h1>
      <div style={{ marginTop: "30px" }}>
        <button style={styles.button} onClick={() => navigate("/analytics")}>
          Analytics
        </button>
        <button style={styles.signOutButton} onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

const styles = {
  button: {
    display: "block",
    width: "200px",
    padding: "15px",
    margin: "10px auto",
    backgroundColor: "#FF6767",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  signOutButton: {
    display: "block",
    width: "200px",
    padding: "15px",
    margin: "20px auto",
    backgroundColor: "#34CBCC",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default AdminDashboard;
