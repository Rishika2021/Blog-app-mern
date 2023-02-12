import React from 'react'
import {useState, useEffect} from 'react'
import {useParams, useNavigate, Link, Form} from 'react-router-dom';
import axios from 'axios'

function EditPost() {
const [editPost,setEditPost]=useState({
  title:"",
  author:"",
  content:"",
});
const {id:postId}=useParams();
// console.log(postId);
const navigate=useNavigate();
useEffect(()=>{
  async function fetchData(){   
     const response = await axios.get(`http://localhost:3001/posts/${postId}`)
     if(!response.data){
      const msg=`An error has occurred: ${response.statusText}`;
      window.alert(msg);
      return;
     }
     const record=await response.data;
     console.log(response.data)
     if(!record){
       window.alert(`Post with id ${postId} not found`);
       navigate("/");
       return;
     }
     setEditPost(record);
  }
  
  fetchData();
  return;
},[postId])

function updateForm(value){
  return setEditPost((prev)=>{
     return{...prev,...value};
  });
}

async function onSubmit(e){
  e.preventDefault();
  const editedPost={
    title:editPost.title,
    author:editPost.author,
    content:editPost.content,
} 
const headers={
  'Content-Type': 'application/json'
}
// const editedArray=[editedPost.title,editedPost.author,editedPost.content] 
  // console.log(editedPost)
  await axios.patch(`http://localhost:3001/posts/edit/${postId}`,JSON.stringify(editedPost),{headers})
     .then((res)=>{
    console.log(res)
  }).catch((e)=>{
    console.log(e)
  })
  ;
  navigate(`/posts/${postId}`);
}

  return (
    <div>
      edit
      <form onSubmit={onSubmit}>
      <label>
          Title:
          <input type="text" value={editPost.title}  onChange={(e)=>updateForm({title:e.target.value})}/>
      </label>
      <label>
          Author:
          <input type="text" value={editPost.author} onChange={(e)=>updateForm({author:e.target.value})} />
      </label>
      <label>
          Content:
          <input type="text" value={editPost.content} onChange={(e)=>updateForm({content:e.target.value})} />
      </label>
      <input type="submit" />
      </form>
    </div>
  )
}

export default EditPost