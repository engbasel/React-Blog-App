import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { auth, db } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // 🟢 جيب بياناته من Firestore
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUser({ uid: currentUser.uid, ...docSnap.data() });
        } else {
          setUser(currentUser); // fallback لو مفيش document
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
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
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      alt="user avatar"
                      className="nav-avatar"
                    />
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
