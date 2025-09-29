import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <h1>📖 About This Project</h1>
      <p className="intro">
        This website was built as a <strong>final project</strong> after completing the
        <strong> React course</strong> with <strong>Eng. Ahmed Zaghloul</strong>.  
        It’s a blogging platform where users can share posts, upload images, and manage
        their profiles using <span>React</span> ⚛ and <span>Firebase</span> 🔥.
      </p>

      <section className="about-section">
        <h2>🚀 What I Did</h2>
        <ul>
          <li>🔹 Built the full frontend using React (components, routing, state management).</li>
          <li>🔹 Integrated Firebase for authentication & Firestore database.</li>
          <li>🔹 Implemented post creation, editing, and deletion features.</li>
          <li>🔹 Designed responsive UI with custom CSS.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>👨‍💻 Developer</h2>
        <div className="profile-card">
          <img
            src="https://via.placeholder.com/120"
            alt="Basel Embaby"
            className="profile-img"
          />
          <div>
            <h3>Basel Embaby</h3>
            <p>📍 Mansoura, Egypt</p>
            <div className="links">
              <a href="https://linkedin.com/in/YOUR_LINKEDIN" target="_blank" rel="noreferrer">
                🔗 LinkedIn
              </a>
              <a href="https://github.com/YOUR_GITHUB" target="_blank" rel="noreferrer">
                🐙 GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>🎓 Instructor</h2>
        <div className="profile-card">
          <img
            src="https://via.placeholder.com/120"
            alt="Ahmed Zaghloul"
            className="profile-img"
          />
          <div>
            <h3>Eng. Ahmed Zaghloul</h3>
            <p>Senior Software Engineer & Instructor</p>
            <div className="links">
              <a
                href="https://www.linkedin.com/in/azaghloul/" 
                target="_blank" 
                rel="noreferrer"
              >
                🔗 LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
