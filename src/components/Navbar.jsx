import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // بيكون null لو عملت logout
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth); // 🟢 تسجيل خروج
  };

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

            {user ? (
              <>
                <li>
                  <Link 
                    to="/profile" 
                    className="nav-user" 
                    onClick={() => setOpen(false)}
                  >
                    👤 {user.displayName || user.email}
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={handleLogout} 
                    className="btn-logout"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="btn-login"
                  onClick={() => setOpen(false)}
                >
                  Login / Register
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
