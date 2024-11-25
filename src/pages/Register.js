import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { database, auth } from "../firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Student");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Save user data to Firebase Database
      const userRef = ref(database, `Users/${userId}`);
      await set(userRef, {
        userEmail: email,
        userName: name,
        userRole: role,
      });

      alert("Registration successful! Please log in.");
      navigate("/");
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div className="register-container">
      <img
        src="/WebAppLogo.png"
        alt="App Logo"
        style={{ width: "250px", height: "auto", marginBottom: "5px" }}
      />
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="Student">Student</option>
        <option value="Staff">Staff</option>
        <option value="Admin">Admin</option>
      </select>
      <button onClick={handleRegister}>Register</button>
      <p>
        Already have an account? <span onClick={() => navigate("/")} style={{ color: "#00aaff", cursor: "pointer" }}>Login here</span>
      </p>
    </div>
  );
};

export default Register;
