import React, { useEffect } from 'react'
import Post from '../../components/post'
const fetchPosts = async () => {
  // هنا بتجيب الداتا سواء من local أو API
  const response = await fetch('http://localhost:3000/posts');
  const data = await response.json();
  console.log(data);  
};



export default function Home() {
  
useEffect(() => {
  fetchPosts();
}, []);
  return (
    <div>
        <Post postTitle="Hello World" postDescription="Hello World" postImage="https://via.placeholder.com/150" postAuthor="Post Author" postedAt="Posted At" authorAvatar="https://via.placeholder.com/150" />
        <Post postTitle="Hello World" postDescription="Hello World" postImage="https://via.placeholder.com/150" postAuthor="Post Author" postedAt="Posted At" authorAvatar="https://via.placeholder.com/150" />
        <Post postTitle="Hello World" postDescription="Hello World" postImage="https://via.placeholder.com/150" postAuthor="Post Author" postedAt="Posted At" authorAvatar="https://via.placeholder.com/150" />    </div>
  )
}
