import React, { useState } from "react";
import "./AddPost.css"; // استدعاء ملف css

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, description, image });
    // هنا هتعمل إضافة البوست (API أو state)
  };

  return (
    <div className="addpost-container">
      <form className="addpost-form" onSubmit={handleSubmit}>
        <h2 className="addpost-title">New Post</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="addpost-input"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="addpost-textarea"
        ></textarea>

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="addpost-input"
        />

        <button type="submit" className="addpost-button">
          Add Post
        </button>
      </form>
    </div>
  );
}
