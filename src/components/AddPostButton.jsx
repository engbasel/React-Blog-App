
import React from "react";
import "./AddPostButton.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config"; // لو عندك config للفايربيز

export default function AddPostButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    const user = auth.currentUser;

    if (user) {
      // alert("✅ You are logged in, going to Add Post screen...");
      navigate("/add"); // غير الـ path حسب عندك
    } else {
      alert("⚠️ You must log in first!");
      navigate("/login"); // غير الـ path حسب عندك
    }
  };

  return (
    <button className="addpost-btn" onClick={handleClick}>
      +
    </button>
  );
}
