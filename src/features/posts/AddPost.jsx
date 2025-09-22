import React, { useState } from "react";
import "./AddPost.css"; // استدعاء ملف css

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // أول صورة يختارها
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      title,
      description,
      image, 
    });

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
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="addpost-input"
        />

          {preview && (
          <div className="preview">
            <p>Image Preview:</p>
            <img src={preview} alt="preview" className="preview-img" />
          </div>
        )}

        <button type="submit" className="addpost-button">
          Add Post
        </button>
      </form>
    </div>
  );
}
