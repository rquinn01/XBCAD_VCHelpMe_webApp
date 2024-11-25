import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [faqs, setFaqs] = useState([
    { question: "How do I submit a query?", answer: "Navigate to the 'Create Query' section, select the type of query, fill in the required fields, and click 'Submit'." },
    { question: "How can I track my queries?", answer: "Go to the 'Track Queries' section to view all your submitted queries and their current statuses." },
    { question: "What happens after I submit a query?", answer: "Your query will be reviewed by the relevant department. You'll receive a notification if its status changes." },
    { question: "How do I know if my query has been resolved?", answer: "Check the 'Track Queries' section. Resolved queries will have a 'Completed' status." },
    { question: "Can I attach files to my query?", answer: "Yes, you can attach documents or images during query submission." },
    { question: "What does 'Pending' status mean?", answer: "Your query is currently being reviewed by a staff member." },
    { question: "How do notifications work?", answer: "You will receive notifications for updates to your query, such as status changes or comments from staff." },
    { question: "How do I reset my password?", answer: "Click 'Forgot Password' on the login screen and follow the instructions to reset your password." },
    { question: "Can I update my profile information?", answer: "Yes, go to the 'Profile' section to update details such as your name and password." },
    { question: "What is the 'Student Hub'?", answer: "The Student Hub allows you to raise various queries regarding academics, appeals, registration, and more." },
    { question: "What types of queries can I submit?", answer: "You can submit queries for Academics, Finance, Admissions, Timetables, and more." },
    { question: "Can I delete a submitted query?", answer: "No, but you can mark it as resolved or abandoned if necessary." },
    { question: "How do I provide additional information for my query?", answer: "You can add comments to your query in the 'Track Queries' section." },
    { question: "Who can view my queries?", answer: "Only staff members assigned to the relevant department can view and respond to your queries." },
    { question: "What should I do if my query is rejected?", answer: "Review the rejection reason provided by the staff. You may resubmit the query with the required information." },
    { question: "What happens if I abandon a query?", answer: "Abandoned queries will no longer be reviewed or updated by staff." },
    { question: "Can I view past queries?", answer: "Yes, all your past queries, including resolved ones, are available in the 'Track Queries' section." },
    { question: "How do I log out of the app?", answer: "Click the 'Logout' button in the settings menu to log out of your account." },
    { question: "How do I enable notifications?", answer: "Ensure notifications are enabled for this app in your device's settings." },
    { question: "Can I filter my queries by status?", answer: "Yes, in the 'Track Queries' section, you can filter queries by status such as 'Pending', 'Completed', etc." },
    { question: "What should I do if I have an urgent issue?", answer: "Contact your department directly through the contact details provided in the app." },
    { question: "Can I provide feedback on the app?", answer: "Yes, use the 'Feedback' section in the settings menu to share your suggestions or report issues." },
    { question: "What is the purpose of this app?", answer: "The app streamlines query management, allowing students to submit and track queries efficiently." },
    { question: "How do I view my course details?", answer: "Your course details are displayed in the 'Profile' section." },
    { question: "What is the 'Feedback' section?", answer: "The 'Feedback' section allows you to share your suggestions or report issues directly to the administrators." },
    { question: "How do I know which department my query belongs to?", answer: "Select the query type, and the app will assign it to the correct department automatically." },
    { question: "Can I reopen a completed query?", answer: "No, but you can submit a new query if further assistance is required." },
    { question: "How can I contact my department for help?", answer: "Use the contact information provided in the app's settings or FAQ section." },
    { question: "What is the 'Track Queries' section?", answer: "It shows a list of all your submitted queries and their current statuses." },
    { question: "What happens if I log out?", answer: "You will need to log in again to access your queries and notifications." },
  ]);

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <img
        src="/WebAppLogo.png"
        alt="App Logo"
        style={{ width: "200px", height: "auto", marginBottom: "20px" }}
      />
      <h1 style={{ color: "#34CBCC" }}>Frequently Asked Questions</h1>
      <input
        type="text"
        placeholder="Search FAQs"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        style={{
          width: "80%",
          padding: "10px",
          margin: "20px 0",
          fontSize: "16px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      />
      <div
        style={{
          textAlign: "left",
          maxWidth: "80%",
          margin: "0 auto",
          overflowY: "auto",
          maxHeight: "400px",
          padding: "10px",
        }}
      >
        {filteredFAQs.map((faq, index) => (
          <div
            key={index}
            style={{
              marginBottom: "15px",
              borderBottom: "1px solid #ddd",
              paddingBottom: "10px",
            }}
          >
            <div
              onClick={(e) => {
                const answerEl = e.target.nextElementSibling;
                if (answerEl.style.display === "none") {
                  answerEl.style.display = "block";
                } else {
                  answerEl.style.display = "none";
                }
              }}
              style={{
                cursor: "pointer",
                color: "#34CBCC",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              {faq.question}
            </div>
            <div style={{ display: "none", fontSize: "16px", color: "#555" }}>
              {faq.answer}
            </div>
          </div>
        ))}
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
        onClick={() => navigate("/student-dashboard")}
      >
        Back
      </button>
    </div>
  );
};

export default FAQ;
