import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import FileUpload from './components/FileUpload';
import FileDownload from './components/FileDownload';
import Dashboard from "./components/Dashboard";
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="container-fluid bg-light text-dark" style={{ minHeight: '100vh' }}>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/upload" element={<FileUpload />} />

          <Route path="/download/:fileId" element={<FileDownload />} />
        </Routes>

      </div>
    </Router>
  );
};

export default App;
