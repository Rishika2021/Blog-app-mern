import React from 'react'
import {useState,useEffect} from 'react';
import axios from 'axios';
import {useParams, useNavigate, Link} from 'react-router-dom';
import FormatDate from './FormatDate';

function Post() {
  const {id:postId}=useParams();
  const [onePost,seTOnePost]=useState({});
  const navigate = useNavigate();
  
  useEffect(()=>{
     axios.get(`http://localhost:3001/posts/${postId}`)
     .then((response)=>{
        // console.log(response)
        seTOnePost(response.data)
     })
     .catch(err=>{
      console.log(err)
     })
  },[])

  const deletePost= async ()=>{
    await axios.delete(`http://localhost:3001/posts/${postId}`);
    navigate('/');
  }

  return (
    <div>
       <div>{onePost.title}</div>
       <p>{onePost.author}- <span className='secondary-text'>{FormatDate(onePost.createdAt)}</span></p>
       <p>{onePost.content}</p>
       <div>
          <button >
            <Link to={`/posts/edit/${postId}`}>Edit</Link>
          </button>
          <button onClick={deletePost}>
            Delete
          </button>
          <button >
            <Link to="/">Go Back Home</Link>
          </button>
       </div>
    </div>
  )
}

export default Post