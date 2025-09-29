import { useState } from "react";
import { db, storage, auth } from "../../../firebase/config";
import { addDoc, collection, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import "./AddPost.css";

function AddPost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      if (image) {
        const storageRef = ref(storage, `posts/${Date.now()}-${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      // ✅ get current user from Auth
      const user = auth.currentUser;
      if (!user) {
        alert("⚠️ Please login first!");
        setLoading(false);
        return;
      }

      // ✅ fetch full profile from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      let profileData = {};
      if (userDoc.exists()) {
        profileData = userDoc.data();
      }

      await addDoc(collection(db, "posts"), {
        title,
        desc,
        image: imageUrl,
        createdAt: serverTimestamp(),
        // 🟢 get user info from Firestore first, fallback to Auth
        author: profileData.name || user.displayName || "Unknown User",
        authorId: user.uid,
        authorEmail: user.email,
        authorAvatar:
          profileData.photoURL ||
          user.photoURL ||
          "/default-avatar.png",
      });

      alert("✅ Post added successfully!");
      setTitle("");
      setDesc("");
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error("❌ Error adding post: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addpost-container">
      <form onSubmit={handleSubmit} className="addpost-form">
        <h2 className="addpost-title">➕ Add New Post</h2>

        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="addpost-input"
          required
        />

        <textarea
          placeholder="Write something..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="addpost-textarea"
          required
        />

        <label className="addpost-upload">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setImage(file);
              setPreview(URL.createObjectURL(file));
            }}
          />
        </label>

        {preview && (
          <div className="addpost-preview">
            <img src={preview} alt="preview" />
          </div>
        )}

        <button type="submit" className="addpost-button" disabled={loading}>
          {loading ? "Uploading..." : "Add Post"}
        </button>
      </form>
    </div>
  );
}

export default AddPost;
