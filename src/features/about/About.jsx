import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <h1>📖 About This Project</h1>
      <p className="intro">
        <strong>Blog App</strong> is a modern blogging platform built as a{" "}
        <strong>final project</strong> after completing the{" "}
        <strong>React course</strong> with{" "}
        <a
          href="https://www.linkedin.com/in/azaghloul/"
          target="_blank"
          rel="noreferrer"
        >
          Eng. Ahmed Zaghloul
        </a>
        .  
        Users can register/login, create posts with images, manage their
        profiles, and browse content.  
        Built with ⚛ React, Vite, Firebase, Tailwind CSS, and DaisyUI.
      </p>

      <section className="about-section">
        <h2>🚀 Features</h2>
        <ul>
          <li>🔐 Authentication with Firebase</li>
          <li>👤 Profile management with avatar upload</li>
          <li>📝 Create, edit, and delete blog posts</li>
          <li>🌍 Client-side routing with React Router</li>
          <li>🎨 Responsive UI (Tailwind + DaisyUI)</li>
          <li>🔔 Toast notifications with React-Toastify</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>🛠 Tech Stack</h2>
        <p>
          React 19, Vite 7, React Router DOM 7, Firebase (Auth, Firestore,
          Storage), Tailwind CSS 4, DaisyUI, React Toastify, ESLint 9
        </p>
      </section>

      <section className="about-section">
        <h2>👨‍💻 Developer</h2>
        <div className="profile-card">
          <img
            src="https://avatars.githubusercontent.com/u/172095311?v=4"
            alt="Basel Embaby"
            className="profile-img"
          />
          <div>
            <h3>Basel Embaby</h3>
            <p>📍 Mansoura, Egypt</p>
            <div className="links">
              <a
                href="https://www.baselembaby.online"
                target="_blank"
                rel="noreferrer"
              >
                🌐 Portfolio
              </a>
              <a
                href="https://www.linkedin.com/in/basel-embaby"
                target="_blank"
                rel="noreferrer"
              >
                🔗 LinkedIn
              </a>
              <a
                href="https://github.com/basel-embaby"
                target="_blank"
                rel="noreferrer"
              >
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
            src="https://media.licdn.com/dms/image/v2/D4D03AQFVnXOTTrj2mA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1704839084173?e=1738195200&v=beta&t=zjqHbe92vD38vBZJgH3yzRpiCJnQ9i_L7LO97fIMyJc"
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
