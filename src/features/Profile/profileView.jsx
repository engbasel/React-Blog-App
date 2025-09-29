// ProfileView.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../../firebase/config";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./ProfileView.css";

export default function ProfileView() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);

  const [posts, setPosts] = useState([]);
  const [postEditing, setPostEditing] = useState(null); // post under edit
  const [postForm, setPostForm] = useState({ title: "", content: "" });

  const navigate = useNavigate();

  // 🟢 Load profile + posts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Profile
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfile({ ...docSnap.data(), email: user.email });
            setFormData({ ...docSnap.data(), email: user.email });
          }

          // Posts
          const q = query(collection(db, "posts"), where("authorId", "==", user.uid));
          const querySnap = await getDocs(q);
          const userPosts = querySnap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }));
          setPosts(userPosts);
        } catch (err) {
          console.error("❌ Error fetching data:", err);
        }
      } else {
        setProfile(null);
        setPosts([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 🟢 Upload avatar
  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const storageRef = ref(
        storage,
        `avatars/${auth.currentUser.uid}-${file.name}`
      );
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setFormData((prev) => ({ ...prev, photoURL: url }));
    } catch (err) {
      console.error("Error uploading image:", err);
    } finally {
      setUploading(false);
    }
  };

  // 🟢 Save profile
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

  // 🟢 Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("❌ Error logging out:", err);
    }
  };

  // 🟢 Edit post
  const handleEditPost = (post) => {
    setPostEditing(post.id);
    setPostForm({ title: post.title, content: post.content });
  };

  // 🟢 Save edited post
  const handleSavePost = async () => {
    try {
      const docRef = doc(db, "posts", postEditing);
      await updateDoc(docRef, {
        title: postForm.title,
        content: postForm.content,
      });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postEditing ? { ...p, ...postForm } : p
        )
      );
      setPostEditing(null);
      setPostForm({ title: "", content: "" });
    } catch (err) {
      console.error("❌ Error updating post:", err);
    }
  };

  // 🟢 Delete post
  const handleDeletePost = async (id) => {
    try {
      await deleteDoc(doc(db, "posts", id));
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("❌ Error deleting post:", err);
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
      {/* 🟢 Profile Section */}
      <div className="profile-card">
        <div className="profile-cover"></div>
        <div className="profile-avatar">
          <img
            src={profile.photoURL || "https://via.placeholder.com/150"}
            alt="profile"
          />
        </div>

        <div className="profile-info">
          <h2>{profile.name || "Unknown User"}</h2>
          <p className="email">{profile.email}</p>
          <p className="bio">{profile.bio || "No bio yet..."}</p>

          <div className="details">
            <p>
              📅 Joined:{" "}
              {auth.currentUser?.metadata?.creationTime
                ? new Date(
                    auth.currentUser.metadata.creationTime
                  ).toLocaleDateString()
                : "Unknown"}
            </p>
            {profile.phone && <p>📞 {profile.phone}</p>}
            {profile.location && <p>📍 {profile.location}</p>}
          </div>

          <div className="actions">
            <button className="btn edit" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
            <button className="btn logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="actions">
 
  <button className="btn edit" onClick={() => navigate("/MyPosts")}>
    View My Posts
  </button>
</div>


      {/* 🟢 Posts Section
      <div className="posts-section">
        <h2>📝 My Posts</h2>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <div className="post-actions">
                <button
                  className="btn edit"
                  onClick={() => handleEditPost(post)}
                >
                  Edit
                </button>
                <button
                  className="btn delete"
                  onClick={() => handleDeletePost(post.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div> */}

      {/* 🟢 Edit Post Modal */}
      {postEditing && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>✏️ Edit Post</h2>
            <input
              type="text"
              placeholder="Title"
              value={postForm.title}
              onChange={(e) =>
                setPostForm({ ...postForm, title: e.target.value })
              }
            />
            <textarea
              placeholder="Content"
              value={postForm.content}
              onChange={(e) =>
                setPostForm({ ...postForm, content: e.target.value })
              }
            />

            <div className="modal-actions">
              <button
                className="btn cancel"
                onClick={() => setPostEditing(null)}
              >
                Cancel
              </button>
              <button className="btn save" onClick={handleSavePost}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🟢 Edit Profile Modal */}
      {editing && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>✏️ Edit Profile</h2>

            <input
              type="text"
              placeholder="Name"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <textarea
              placeholder="Bio"
              value={formData.bio || ""}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location || ""}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
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
