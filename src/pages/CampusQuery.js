import React, { useState, useEffect } from "react";
import { database, auth } from "../firebase";
import { ref, push, set, get } from "firebase/database";
import { uploadMedia } from "../uploadMedia";
import { useNavigate } from "react-router-dom";

const CampusQuery = () => {
  const [queryCategory, setQueryCategory] = useState("");
  const [module, setModule] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState(null);
  const [userDetails, setUserDetails] = useState({
    userID: "",
    userEmail: "",
    userCourse: "",
    userDepartment: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userID = currentUser.uid;
        const userEmail = currentUser.email;

        const userRef = ref(database, `Users/${userID}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const userCourse = snapshot.child("userCourse").val();
          const userDepartment = snapshot.child("userDepartment").val();
          setUserDetails({ userID, userEmail, userCourse, userDepartment });
        } else {
          alert("Failed to fetch user details.");
        }
      } else {
        alert("User not authenticated.");
      }
    };

    fetchUserDetails();
  }, []);

  const handleMediaChange = (event) => {
    setMedia(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!queryCategory || !module || !description) {
      alert("Please fill in all fields.");
      return;
    }

    try {
        const queryDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const queryRef = ref(database, "Campus Queries");
      const newQueryRef = push(queryRef);
      const queryId = newQueryRef.key;

      const queryData = {
        ...userDetails,
        userQueryCategory: queryCategory,
        userQueryModule: module,
        userQueryDescription: description,
        queryDateTime,
        queryStatus: "Submitted, awaiting review",
      };

      if (media) {
        const mediaUrl = await uploadMedia(media, queryId);
        queryData.mediaUrl = mediaUrl;
      }

      await set(newQueryRef, queryData);
      alert("Campus Query submitted successfully!");
      navigate("/student-dashboard");
    } catch (error) {
      console.error("Error submitting query:", error);
      alert("Failed to submit query. Please try again.");
    }
  };

  return (
    <div>
      <img
        src="/WebAppLogo.png"
        alt="App Logo"
        style={{ width: "200px", height: "auto", marginBottom: "5px" }}
      />
      <h1>Campus Queries</h1>
      <div>
        <select
          style={{ width: "100%", padding: "10px", margin: "10px 0", fontSize: "16px" }}
          value={queryCategory}
          onChange={(e) => setQueryCategory(e.target.value)}
        >
          <option value="" disabled>
            Select Query Category
          </option>
          {[
            "Academic Internal Credit Query",
            "Academic Report Request",
            "Add or Drop modules",
            "Assessment Query",
            "Blocked Portal or Hold Query",
            "Contract / Registration Query",
            "Finance Query",
          ].map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          style={{ width: "100%", padding: "10px", margin: "10px 0", fontSize: "16px" }}
          type="text"
          placeholder="Module"
          value={module}
          onChange={(e) => setModule(e.target.value)}
        />
        <textarea
          style={{ width: "100%", padding: "10px", margin: "10px 0", fontSize: "16px" }}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="file"
          accept="image/*"
          style={{ margin: "10px 0" }}
          onChange={handleMediaChange}
        />
        <button
          style={{
            width: "100%",
            padding: "15px",
            margin: "10px 0",
            backgroundColor: "#FF6767",
            color: "white",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
          }}
          onClick={handleSubmit}
        >
          Submit Query
        </button>
        <button
          style={{
            width: "100%",
            padding: "15px",
            margin: "10px 0",
            backgroundColor: "#34CBCC",
            color: "white",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
          }}
          onClick={() => navigate("/student-dashboard")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CampusQuery;
