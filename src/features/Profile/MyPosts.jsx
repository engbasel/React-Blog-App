// MyPosts.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "./MyPosts.css";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
