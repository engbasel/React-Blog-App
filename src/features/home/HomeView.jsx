import React, { useEffect, useState } from "react";
import Post from "../../components/post";
import AddButton from "../../components/addbuttom";
import { db } from "../../../firebase/config"; // import firebase config
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function Home() {
  const [posts, setPosts] = useState([]);

  // fetch posts from Firestore
  const fetchPosts = async () => {
    try {
      const q = query(
        collection(db, "posts"), 
        orderBy("createdAt", "desc") // آخر بوست يظهر فوق
      );
      const snapshot = await getDocs(q);

      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(postsData);
      console.log("✅ Posts loaded:", postsData);
    } catch (err) {
      console.error("Error fetching posts: ", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-4">
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts yet 🚀</p>
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            postTitle={post.title}
            postDescription={post.desc}
            postImage={post.image}
            postAuthor={post.author || "Anonymous"}
            postedAt={
              post.createdAt?.toDate
                ? post.createdAt.toDate().toLocaleString()
                : "Unknown"
            }
            authorAvatar={post.authorAvatar || "/default-avatar.png"}
          />
        ))
      )}

      <AddButton
        buttonTitle="Add Post"
        onClick={() => {}}
        navigationPath="/add"
      />
    </div>
  );
}
