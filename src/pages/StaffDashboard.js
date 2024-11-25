import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../firebase";
import { ref, get } from "firebase/database";

const StaffDashboard = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signOut();
    navigate("/");
  };

  // Log the user's role upon accessing the Staff Dashboard
  React.useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userRef = ref(database, `Users/${user.uid}`);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log("Staff Dashboard - User role:", snapshot.val().role);
          } else {
            console.warn("Staff Dashboard - User data not found in database.");
          }
        })
        .catch((error) => {
          console.error("Staff Dashboard - Error fetching user data:", error.message);
        });
    } else {
      console.warn("Staff Dashboard - User not authenticated.");
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <img
        src="/WebAppLogo.png"
        alt="App Logo"
        style={{ width: "200px", height: "auto", marginBottom: "5px" }}
      />
      <h1>Staff Dashboard</h1>
      <div style={{ marginTop: "30px" }}>
        <button style={styles.button} onClick={() => navigate("/my-queries")}>
          My Queries
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

export default StaffDashboard;
