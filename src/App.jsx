import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// الصفحات
import Home from "./pages/HomeView.jsx";
import Login from "./pages/Login.jsx";
import AddPost from "./pages/AddPost.jsx";
import About from "./pages/About.jsx";
import Register from "./pages/Register.jsx";
import PageNotFound from "./pages/PangenotFound.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/add" element={<AddPost />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}
