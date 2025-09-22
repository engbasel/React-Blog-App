import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase/config"; // عدل الباث حسب مشروعك
import { doc, getDoc } from "firebase/firestore";

export default function ProfileView() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserProfile() {
      const user = auth.currentUser; // اليوزر اللي عامل لوجين

      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          console.log("⚠️ No profile found in Firestore!");
        }
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>⏳ Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>⚠️ No profile data found!</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={profile.photoURL || "https://via.placeholder.com/150"}
            alt="profile"
            className="rounded-full w-32 h-32 object-cover border-4 border-primary"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl font-bold">
            {profile.name || "Unknown User"}
          </h2>
          <p className="text-gray-500">{profile.email}</p>
          <p className="mt-2">
            {profile.bio || "No bio available yet..."}
          </p>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary">Edit Profile</button>
            <button className="btn btn-outline btn-error">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
