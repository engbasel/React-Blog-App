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
import ProfileView from "./features/Profile/profileView.jsx";
import { ToastContainer } from "react-toastify";
import MyPosts from "./features/Profile/MyPosts.jsx";
export default function App() {
  return (
    <>

<ToastContainer position="top-center" autoClose={3000} />

      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/add" element={<AddPost />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/MyPosts" element={<MyPosts />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}
