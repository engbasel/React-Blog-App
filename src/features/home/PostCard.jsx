import React from "react";
import { Link } from "react-router-dom";
import "./PostCard.css"; // 

export default function PostCard({ post }) {
  return (
    <Link to={`/posts/${post.id}`} className="post-card" style={{ display: "block", cursor: "pointer" }}>
      {post.image && (
        <div className="post-image-wrapper">
          <img
            src={post.image}
            alt={post.title}
            className="post-image"
          />
        </div>
      )}

      <h2 className="post-title">{post.title}</h2>

      <p className="post-desc">
        {post.desc?.length > 100
          ? post.desc.slice(0, 100) + "..."
          : post.desc}
      </p>

      {/* Footer */}
      <div className="post-footer">
        <div className="post-author">
          <img
            src={post.authorAvatar || "/default-avatar.png"}
            alt="avatar"
            className="post-avatar"
          />
          <span className="post-author-name">
            {post.author || "Anonymous"}
          </span>
        </div>
        <span className="post-date">
          {post.createdAt?.toDate
            ? post.createdAt.toDate().toLocaleDateString()
            : "Unknown"}
        </span>
      </div>
    </Link>
  );
}
