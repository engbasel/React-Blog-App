import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { auth, db } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import defaultAvatar from "../../assets/imagenoone.jpg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribeUserDoc = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      // Cleanup previous user doc listener if any
      if (unsubscribeUserDoc) {
        unsubscribeUserDoc();
        unsubscribeUserDoc = null;
      }

      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        // Subscribe to realtime updates of the user document
        unsubscribeUserDoc = onSnapshot(
          docRef,
          (docSnap) => {
            if (docSnap.exists()) {
              setUser({ uid: currentUser.uid, ...docSnap.data() });
            } else {
              // Fallback if no user document
              setUser(currentUser);
            }
          },
          () => {
            // On error, still fallback to auth user
            setUser(currentUser);
          }
        );
      } else {
        setUser(null);
      }
    });

    return () => {
      if (unsubscribeUserDoc) unsubscribeUserDoc();
      unsubscribeAuth();
    };
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
                      src={user.photoURL || defaultAvatar}
                      alt="user avatar"
                      className="nav-avatar"
                      onError={(e) => {
                        if (e.currentTarget.src !== defaultAvatar) {
                          e.currentTarget.src = defaultAvatar;
                        }
                      }}
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
