import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase/config.js";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import InputField from "../../components/InputField.jsx";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("📩 Submitting register form:", { name, email, password, confirm });

    if (!name.trim() || !email.trim() || !password) {
      console.warn("⚠️ Missing fields");
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirm) {
      console.warn("⚠️ Passwords mismatch");
      alert("Passwords do not match.");
      return;
    }

    try {
      console.log("⏳ Creating user in Firebase Auth...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("✅ User created in Auth:", user);

      // 🔥 Save user data in Firestore
      console.log("⏳ Saving user profile in Firestore...");
      await setDoc(doc(db, "users", user.uid), {
        name: name.trim(),
        email: user.email,
        createdAt: serverTimestamp(),
      });

      console.log("✅ User profile saved in Firestore with UID:", user.uid);

      navigate("/profile");
    } catch (error) {
      console.error("❌ Error registering:", error.code, error.message);
      alert(error.message);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <InputField
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <InputField
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button type="submit" className="auth-btn">
          Register
        </button>

        <p className="small">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
