import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          My<span className="accent">Blog</span>
        </Link>

        <button
          className={`nav-toggle ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={`nav-links ${open ? "show" : ""}`}>
          <ul>
            <li>
              <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            </li>
            <li>
              <Link to="/login" className="btn-login" onClick={() => setOpen(false)}>
                Login / Register
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
