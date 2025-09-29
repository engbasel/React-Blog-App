import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg font-medium text-gray-600 animate-pulse">
          ⏳ Loading profile...
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg font-medium text-gray-600">
          ⚠️ No profile data found!
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Cover / Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

        {/* Avatar */}
        <div className="flex justify-center -mt-16 relative">
          <img
            src={profile.photoURL || "https://via.placeholder.com/150"}
            alt="profile"
            className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-md"
          />
        </div>

        {/* Info */}
        <div className="px-6 pb-6 text-center">
          <h2 className="text-2xl font-bold mt-4 text-gray-800">
            {profile.name || "Unknown User"}
          </h2>
          <p className="text-gray-500">{profile.email}</p>

          <p className="mt-3 text-gray-600">{profile.bio || "No bio yet..."}</p>

          <div className="mt-4 text-sm text-gray-400">
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
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
            <button
             onClick={() => navigate('/login')}
            className="px-4 py-2 rounded-lg border border-red-500 text-red-500 font-medium hover:bg-red-50 transition">
              Logout

            </button>
          </div>
        </div>
      </div>

      {/* Modal Edit Profile */}
      {editing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">✏️ Edit Profile</h2>

            <input
              type="text"
              placeholder="Name"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border rounded-lg p-2 mb-3"
            />
            <textarea
              placeholder="Bio"
              value={formData.bio || ""}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full border rounded-lg p-2 mb-3"
            />
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone || ""}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border rounded-lg p-2 mb-3"
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location || ""}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full border rounded-lg p-2 mb-3"
            />

            <label className="block mb-3">
              Upload Avatar:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files[0])}
                className="block mt-2"
              />
            </label>

            {uploading && <p className="text-sm text-blue-500">Uploading...</p>}

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
