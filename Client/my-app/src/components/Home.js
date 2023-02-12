import React from 'react'
import {useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import FormatDate from './FormatDate';

function Home() {
const [posts, setPost]=useState([]);
 
useEffect(()=>{
   axios.get('http://localhost:3001/posts').then((response)=>{
      console.log(response.data)
      setPost(response.data)
   })
   .catch(err=>{
      console.log(err)
   })
},[])

  return (
    <div>
       {posts.map((post)=>{
        return (
          <div key={post._id}>
            <div>
              <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none' }}><h1>{post.title}</h1></Link> 
            </div>
            <p>{post.author}- <span className='secondary-text'>{FormatDate(post.createdAt)}</span></p>
            <p>{post.content}</p> 
         </div>
        )     
       })}
    </div>   
  )
}

export default Home