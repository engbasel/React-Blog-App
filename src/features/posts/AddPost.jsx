import React, { useState } from "react";
import { db } from "../../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./AddPost.css"; // هنا ربطنا ملف الـ CSS

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "posts"), {
        title,
        description,
        image,
        createdAt: serverTimestamp(),
      });

      alert("Post added successfully ✅");
      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Error adding post: ", error);
      alert("Failed to add post ❌");
    }
  };

  return (
    <div className="addpost-container">
      <form onSubmit={handleSubmit} className="addpost-form">
        <h2 className="addpost-title">Create a Post</h2>

        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="addpost-input"
        />

        <textarea
          placeholder="What's on your mind?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="addpost-textarea"
        ></textarea>

        <label className="addpost-upload">
          <span>Upload an image</span>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <div className="upload-box">
            {image ? image.name : "Click to choose an image"}
          </div>
        </label>

        {preview && (
          <div className="addpost-preview">
            <p>Preview:</p>
            <img src={preview} alt="preview" />
          </div>
        )}

        <button type="submit" className="addpost-button">
          Post
        </button>
      </form>
    </div>
  );
}
