import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import InputField from "../../components/InputField";
import { auth } from "../../../firebase/config.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) { 
    e.preventDefault();

auth.signInWithEmailAndPassword(email,password)
.then((userCredential) => {
  const user = userCredential.user;
  console.log(user);
  navigate("/");
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  console.log(errorMessage);
  alert(errorMessage);
});
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Login</h2>
  

<InputField type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

<InputField type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="auth-btn">Login</button>

        <p className="small">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
