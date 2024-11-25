import React from "react";
import { auth, database } from "./firebase";

function App() {
  // Test Firebase imports
  console.log("Firebase Auth Instance:", auth);
  console.log("Firebase Database Instance:", database);

  return (
    <div>
      <h1>Welcome to Your React App</h1>
      <p>Firebase is successfully configured!</p>
    </div>
  );
}

export default App;
