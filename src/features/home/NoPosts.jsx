// import React from 'react'

// export default function NoPosts() {
//   return (
//     <div>NoPosts</div>
//   )
// }
import React from "react";
import "./NoPosts.css"; // 👈 هنربطه بملف CSS خارجي

export default function NoPosts() {
  return (
    <div className="no-posts">
      <div className="no-posts-icon">📭</div>
      <h2 className="no-posts-title">No Posts Yet</h2>
      <p className="no-posts-text">Be the first one to share something 🚀</p>
    </div>
  );
}
