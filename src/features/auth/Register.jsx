import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth} from "../../../firebase/config.js";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");



  async function handleSubmit(e) {
    e.preventDefault();
  
    if (!name.trim() || !email.trim() || !password) {
      alert("Please fill all fields.");
      return;
    }
    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
      console.log("User created:", userCredential.user);
  
      navigate("/");
    } catch (error) {
      console.error("Error registering:", error.message);
      alert(error.message);
    }
  }
  

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button type="submit" className="auth-btn">Register</button>

        <p className="small">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
