// ProfileView.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./ProfileView.css";

export default function ProfileView() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserProfile() {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile({ ...docSnap.data(), email: user.email });
          setFormData({ ...docSnap.data(), email: user.email });
        }
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const storageRef = ref(storage, `avatars/${auth.currentUser.uid}-${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setFormData((prev) => ({ ...prev, photoURL: url }));
    } catch (err) {
      console.error("Error uploading image:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, {
        name: formData.name,
        bio: formData.bio || "",
        photoURL: formData.photoURL || "",
        phone: formData.phone || "",
        location: formData.location || "",
      });
      setProfile(formData);
      setEditing(false);
    } catch (err) {
      console.error("❌ Error updating profile:", err);
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <p>⏳ Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-loading">
        <p>⚠️ No profile data found!</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Cover */}
        <div className="profile-cover"></div>

        {/* Avatar */}
        <div className="profile-avatar">
          <img
            src={profile.photoURL || "https://via.placeholder.com/150"}
            alt="profile"
          />
        </div>

        {/* Info */}
        <div className="profile-info">
          <h2>{profile.name || "Unknown User"}</h2>
          <p className="email">{profile.email}</p>
          <p className="bio">{profile.bio || "No bio yet..."}</p>

          <div className="details">
            <p>
              📅 Joined:{" "}
              {auth.currentUser?.metadata?.creationTime
                ? new Date(auth.currentUser.metadata.creationTime).toLocaleDateString()
                : "Unknown"}
            </p>
            {profile.phone && <p>📞 {profile.phone}</p>}
            {profile.location && <p>📍 {profile.location}</p>}
          </div>

          {/* Actions */}
          <div className="actions">
            <button className="btn edit" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
            <button className="btn logout" onClick={() => navigate("/login")}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Modal Edit */}
      {editing && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>✏️ Edit Profile</h2>

            <input
              type="text"
              placeholder="Name"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <textarea
              placeholder="Bio"
              value={formData.bio || ""}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone || ""}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location || ""}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />

            <label>
              Upload Avatar:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files[0])}
              />
            </label>

            {uploading && <p className="uploading">Uploading...</p>}

            <div className="modal-actions">
              <button className="btn cancel" onClick={() => setEditing(false)}>
                Cancel
              </button>
              <button className="btn save" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
