// MyPosts.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase/config";
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "./MyPosts.css";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", desc: "" });

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
        <p className="empty">⚠️ You haven't posted anything yet.</p>
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
