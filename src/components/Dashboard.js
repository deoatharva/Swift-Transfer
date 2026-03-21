import React from "react";
import FileUpload from "./FileUpload";
import FileDownload from "./FileDownload";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import logo from "../assets/my-logoz.png";

const Dashboard = () => {

  const navigate = useNavigate(); // ✅ moved inside component

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">

      {/* Header */}
      <div className="dashboard-header">
        <img src={logo} alt="logo" width="300px"/>
        <button
          className="btn btn-danger logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Cards */}
      <div className="card-wrapper">

        <div className="modern-card">
          <h4>Upload & Share</h4>
          <FileUpload />
        </div>

        <div className="modern-card">
          <h4>Download Using Code</h4>
          <FileDownload />
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
