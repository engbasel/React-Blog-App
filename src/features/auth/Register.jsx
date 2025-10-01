import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../../../firebase/config.js";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import InputField from "../../components/InputField.jsx";

export default function Register() {
  const navigate = useNavigate();

  // 📝 بيانات البروفايل
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
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

      // ✨ ارفع صورة البروفايل لو اختار صورة
      let uploadedPhotoURL = "";
      if (photoFile) {
        const fileRef = ref(storage, `avatars/${user.uid}-${Date.now()}-${photoFile.name}`);
        await uploadBytes(fileRef, photoFile);
        uploadedPhotoURL = await getDownloadURL(fileRef);
      }

      // ✨ حفظ البيانات في Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name.trim(),
        email: user.email,
        bio: bio.trim() || "New user on our platform 🚀",
        photoURL: uploadedPhotoURL || "",
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

        {/* صورة البروفايل */}
        <label className="image-upload-label" style={{ display: "block" }}>
          <span className="label-text">Upload Avatar (optional)</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setPhotoFile(file);
              setPhotoPreview(file ? URL.createObjectURL(file) : "");
            }}
          />
          {photoPreview && (
            <div style={{ marginTop: 10 }}>
              <img
                src={photoPreview}
                alt="Preview"
                style={{ width: 96, height: 96, borderRadius: "50%", objectFit: "cover", border: "2px solid #ddd" }}
              />
            </div>
          )}
        </label>

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
