import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import InputField from "../../components/InputField";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const saved = JSON.parse(localStorage.getItem("blog_user"));
    if (!saved) {
      alert("No user found. Please register first.");
      return;
    }

    if (saved.email !== email || saved.password !== password) {
      alert("Email or password incorrect.");
      return;
    }

    localStorage.setItem("blog_logged_in", JSON.stringify({ name: saved.name, email: saved.email }));
    navigate("/");
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {/* <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
         */}

<InputField type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

<InputField type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {/* <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /> */}
        <button type="submit" className="auth-btn">Login</button>

        <p className="small">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
