import React, { useEffect, useState } from 'react'
import Post from '../../components/post'

export default function Home() {

  const fetchPosts = async () => {
    // هنا بتجيب الداتا سواء من local أو API
    const response = await fetch('http://localhost:3000/posts');
    const data = await response.json();
    setPosts(data);  
  };
  
  
  
  const [posts, setPosts] = useState([]);
useEffect(() => {
    fetchPosts();
}, []);
  return (
    <div>
        
         {posts.map((post) => (
         <Post postTitle={post.title} postDescription={post.description} postImage={post.image} postAuthor={post.author} postedAt={post.postedAt} authorAvatar={post.authorAvatar} /> 
         ))}
        
         </div>
  )
}
