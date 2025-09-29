import React from "react";
import "./AddPostButton.css";

export default function AddPostButton({ onClick }) {
  return (
    <button className="addpost-btn" onClick={onClick}>
      +
    </button>
  );
}
