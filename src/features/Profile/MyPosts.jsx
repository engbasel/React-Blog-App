// MyPosts.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase/config";
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./MyPosts.css";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", desc: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const q = query(
            collection(db, "posts"),
            where("authorId", "==", user.uid)
          );
          const querySnap = await getDocs(q);
          const userPosts = querySnap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }));
          setPosts(userPosts);
          console.log("✅ User posts loaded:", userPosts);
        } catch (err) {
          console.error("❌ Error loading posts:", err);
        }
      } else {
        setPosts([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Navigate to add-post when there are no posts after loading finishes
  useEffect(() => {
    if (!loading && posts.length === 0) {
      navigate("/add");
    }
  }, [loading, posts.length, navigate]);

  if (loading) return <p className="loading">⏳ Loading your posts...</p>;

  const startEdit = (post) => {
    setEditingId(post.id);
    setForm({ title: post.title || "", desc: post.desc || "" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ title: "", desc: "" });
  };

  const saveEdit = async () => {
    try {
      await updateDoc(doc(db, "posts", editingId), {
        title: form.title,
        desc: form.desc,
      });
      setPosts((prev) => prev.map((p) => (p.id === editingId ? { ...p, title: form.title, desc: form.desc } : p)));
      cancelEdit();
    } catch (e) {
      console.error("❌ Error updating post:", e);
    }
  };

  const removePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await deleteDoc(doc(db, "posts", id));
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      console.error("❌ Error deleting post:", e);
    }
  };

  return (
    <div className="myposts-container">
      {posts.length === 0 ? (
        <section className="empty-posts" style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#f9f9f9",
          borderRadius: "16px",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
        }}>
          <h2 className="empty-title" style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#222",
            marginBottom: "16px",
          }}>No posts yet</h2>
          <p className="empty-subtitle" style={{
            fontSize: "18px",
            color: "#444",
            textAlign: "center",
            maxWidth: "400px",
          }}>Get started and create your own posts!</p>
          <button className="add-post-btn" onClick={() => navigate("/add")} style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#10b981",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
          }}>Add Post</button>
        </section>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="image-wrapper">
                <img
                  src={post.image || "https://via.placeholder.com/300"}
                  alt={post.title}
                  className="post-image"
                />
              </div>
              <div className="post-content">
                <h3>{post.title}</h3>
                <p>{post.desc}</p>
                <small>✍️ By {post.author}</small>
                <div className="post-actions" style={{ marginTop: 8, display: "flex", gap: 8 }}>
                  <button className="btn edit" onClick={() => startEdit(post)}>Edit</button>
                  <button className="btn delete" onClick={() => removePost(post.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingId && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>✏️ Edit Post</h2>
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
            />
            <div className="modal-actions">
              <button className="btn cancel" onClick={cancelEdit}>Cancel</button>
              <button className="btn save" onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
