import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// الصفحات
import Home from "./pages/HomeView.jsx";
import Login from "./pages/Login.jsx";
import AddPost from "./pages/AddPost.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={<AddPost />} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </>
  );
}
