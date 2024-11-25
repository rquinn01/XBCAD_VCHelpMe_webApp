import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { database, auth } from "../firebase";
import { ref, get } from "firebase/database";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Fetch user role
      const userRef = ref(database, `Users/${userId}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userRole = snapshot.val().userRole;
        if (userRole === "Student") {
          navigate("/student-dashboard");
        } else if (userRole === "Staff") {
          navigate("/staff-dashboard");
        } else if (userRole === "Admin") {
          navigate("/admin-dashboard");
        } else {
          alert("Unknown role. Please contact support.");
        }
      } else {
        alert("User not found in the database.");
      }
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <img
        src="/WebAppLogo.png"
        alt="App Logo"
        style={{ width: "250px", height: "auto", marginBottom: "5px" }}
      />      
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <span onClick={() => navigate("/register")} style={{ color: "#ff8c00", cursor: "pointer" }}>Register here</span>
      </p>
      <p>
        Forgot your password? <span style={{ color: "#ff8c00", cursor: "pointer" }}>Click here</span>
      </p>
    </div>
  );
};

export default Login;
