import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { database, auth } from "../firebase";
import { ref, push, onValue, get } from "firebase/database";

const ChatPage = () => {
  const { queryId } = useParams(); // Query ID
  const { state } = useLocation(); // Query data and user role passed from the previous page
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  const role = state?.role || "Student"; // Default to "Student" if role is not provided

  useEffect(() => {
    const commentsRef = ref(database, `comments`);
    const unsubscribe = onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const filteredComments = Object.entries(data)
          .map(([id, value]) => ({ id, ...value }))
          .filter((comment) => comment.queryId === queryId);
        setComments(filteredComments);
      } else {
        setComments([]);
      }
    });

    return () => unsubscribe();
  }, [queryId]);

  const handleSendComment = async () => {
    if (newComment.trim() === "") return;

    const user = auth.currentUser;
    if (user) {
      try {
        const userRef = ref(database, `Users/${user.uid}`);
        const userSnapshot = await get(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
          const commentData = {
            userId: user.uid,
            queryId: queryId,
            messageBody: newComment,
            timestamp: Date.now().toString(),
            role: userData.role || "Student",
          };

          const commentsRef = ref(database, "comments");
          await push(commentsRef, commentData);
          setNewComment(""); // Clear the input field
        } else {
          console.error("User data not found in database.");
        }
      } catch (error) {
        console.error("Error sending comment:", error.message);
      }
    } else {
      console.error("User is not authenticated.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1 style={{ color: "#34CBCC" }}>Query Details</h1>
      <div style={{ maxWidth: "80%", margin: "0 auto", textAlign: "left" }}>
        <p><strong>Category:</strong> {state?.query?.userQueryCategory}</p>
        <p><strong>Description:</strong> {state?.query?.userQueryDescription}</p>
        <p><strong>Status:</strong> {state?.query?.queryStatus}</p>
        {state?.query?.mediaUrl && (
          <img
            src={state.query.mediaUrl}
            alt="Query Media"
            style={{ width: "100%", margin: "10px 0" }}
          />
        )}
      </div>

      <div style={{ maxWidth: "80%", margin: "0 auto", textAlign: "left" }}>
        <h2 style={{ color: "#FF6767" }}>Comments</h2>
        <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "20px" }}>
          {comments.map((comment) => (
            <div key={comment.id} style={{ marginBottom: "10px" }}>
              <p><strong>{comment.role}:</strong> {comment.messageBody}</p>
              <p style={{ fontSize: "12px", color: "#888" }}>
                {new Date(parseInt(comment.timestamp, 10)).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        ></textarea>
        <button
          onClick={handleSendComment}
          style={{
            padding: "10px",
            backgroundColor: "#34CBCC",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Send
        </button>
      </div>

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
        onClick={() => navigate(role === "Staff" ? "/my-queries" : "/track-query")}
      >
        Back
      </button>
    </div>
  );
};

export default ChatPage;
