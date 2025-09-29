import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase/config.js";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import InputField from "../../components/InputField.jsx";

export default function Register() {
  const navigate = useNavigate();

  // 📝 بيانات البروفايل
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  // 📝 بيانات الحساب
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      alert("⚠️ Please fill all required fields.");
      return;
    }

    if (password !== confirm) {
      alert("⚠️ Passwords do not match.");
      return;
    }

    try {
      // ✨ إنشاء يوزر في Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // ✨ حفظ البيانات في Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name.trim(),
        email: user.email,
        bio: bio.trim() || "New user on our platform 🚀",
        photoURL:
          photoURL.trim() ||
          "https://via.placeholder.com/150", // صورة افتراضية
        phone: phone.trim() || "",
        location: location.trim() || "",
        createdAt: serverTimestamp(),
      });

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

        {/* بيانات أساسية */}
        <InputField
          type="text"
          placeholder="Full Name"
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
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        {/* بيانات إضافية للبروفايل */}
        <InputField
          type="text"
          placeholder="Photo URL (optional)"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />

        <InputField
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <InputField
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <textarea
          className="auth-textarea"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows="3"
        ></textarea>

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
