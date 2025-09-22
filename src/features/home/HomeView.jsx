import React, { useEffect, useState } from 'react'
import Post from '../../components/post'
import {  Link } from 'react-router-dom';
import AddButton from '../../components/addbuttom';

export default function Home() {
  const [open, setOpen] = useState(false);

  const fetchPosts = async () => {
    const response = await fetch('http://localhost:3000/posts');
    console.log(response);
    console.log('pipe is Connected ');
    
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
         <div>

         </div>
         <AddButton buttonTitle="Add Post" onClick={() => setOpen(false)} navigationPath="/add" />
         </div>
  )
}
