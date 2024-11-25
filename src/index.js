import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CreateQuery from "./pages/CreateQuery";
import CampusQuery from "./pages/CampusQuery";
import StudentHubQuery from "./pages/StudentHubQuery";
import AlumniQuery from "./pages/AlumniQuery";
import FAQ from "./pages/FAQ";
import TrackQuery from "./pages/TrackQuery";
import ChatPage from "./pages/ChatPage";
import FeedbackPage from "./pages/FeedbackPage";
import MyQueries from "./pages/MyQueries";
import AnalyticsPage from "./pages/AnalyticsPage";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/create-query" element={<CreateQuery />} />
        <Route path="/campus-query" element={<CampusQuery />} />
        <Route path="/studenthub-query" element={<StudentHubQuery />} />
        <Route path="/alumni-query" element={<AlumniQuery />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/track-query" element={<TrackQuery />} />
        <Route path="/chat/:queryId" element={<ChatPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/my-queries" element={<MyQueries />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
