import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// الصفحات
import Home from "./features/home/HomeView.jsx";
import Login from "./features/auth/Login.jsx";
import AddPost from "./features/posts/AddPost.jsx";
import About from "./features/about/About.jsx";
import Register from "./features/auth/Register.jsx";
import PageNotFound from "./features/about/PangenotFound.jsx";

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
