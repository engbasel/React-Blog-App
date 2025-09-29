
import React, { useEffect, useState } from "react";
import AddButton from "../../components/addbuttom";
import { db } from "../../../firebase/config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import PostCard from "../../features/home/PostCard"; // 👈 استدعاء الكارد
import NoPosts from "./NoPosts";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(postsData);
    } catch (err) {
      console.error("Error fetching posts: ", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Blog Posts
      </h1>

      {posts.length === 0 ? (
<NoPosts/>        // <p className="text-center text-gray-500">No posts yet 🚀</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} /> // 👈 بدل الكود الكبير
          ))}
        </div>
      )}

      <div className="fixed bottom-6 right-6">
        <AddButton buttonTitle="+" onClick={() => {}} navigationPath="/add" />
      </div>
    </div>
  );
}
