import React from 'react'
import {useState, useEffect} from 'react'
import {useParams, useNavigate, Link, Form} from 'react-router-dom';
import axios from 'axios'

function CreatePost() {
  const [createPost, setCreatePost]=useState({
    title:"",
    author:"",
    content:"",
  })
  const navigate=useNavigate();

  function updateForm(value){
    return setCreatePost((prev)=>{
       return{...prev,...value};
    });
  }
   async function onSubmit(e){
     e.preventDefault();
     const newPost={...createPost};
     const headers={
      'Content-Type': 'application/json'
    }
     await axios.post('http://localhost:3001/posts/new',newPost,headers)
     .then((res)=>{
        console.log(res)
     }).catch((err)=>{
        console.log(err)
     })
     setCreatePost({ title: "", author: "", content: "" });
     navigate("/");
   }

  return (
    <div>
      <form onSubmit={onSubmit}>
      <label>
          Title:
          <input type="text" value={createPost.title}  onChange={(e)=>updateForm({title:e.target.value})}/>
      </label>
      <label>
          Author:
          <input type="text" value={createPost.author} onChange={(e)=>updateForm({author:e.target.value})} />
      </label>
      <label>
          Content:
          <input type="text" value={createPost.content} onChange={(e)=>updateForm({content:e.target.value})} />
      </label>
      <input type="submit" />
      </form>
    </div>
  )
}

export default CreatePost