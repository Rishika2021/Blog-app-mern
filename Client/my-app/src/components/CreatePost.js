import React from 'react'
import {useState, useEffect} from 'react'
import {useParams, useNavigate, Link, Form} from 'react-router-dom';
import axios from 'axios'

function CreatePost() {
  // const [createPost, setCreatePost]=useState({
  //   title:"",
  //   author:"",
  //   content:"",
    // id:"",
  // })
  const [title,setTitle]=useState("")
  const [author,setAuthor]=useState("")
  const [content,setContent]=useState("")
  const [filename,setFilename]=useState("")

  const onChangeFile=(e)=>{
    console.log('change file'+ e.target.files)
     setFilename(e.target.files[0]);
     console.log('changed')
  }

  const navigate=useNavigate();

  // function updateForm(value){
  //   return setCreatePost((prev)=>{
  //      return{...prev,...value};
  //   });
  // }
   async function onSubmit(e){
     e.preventDefault();
    //  const newPost={...createPost};
    const formdata=new FormData();
    formdata.append("title", title);
    formdata.append("author",author);
    formdata.append("content",content);
    formdata.append("postImg", filename);

      const headers= {
        // 'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data',
        "Authorization" : `Bearer ${localStorage.getItem("token")}` 
      }
    
     await axios.post('http://localhost:3001/posts/new',formdata,{headers})
     .then((res)=>{
        console.log(res)
     }).catch((err)=>{
        console.log(err)
     })
    //  setCreatePost({ title: "", author: "", content: "" });
    setTitle("");
    setAuthor("");
    setContent("");
    setFilename("");
    //  navigate("/");
   }

  return (
    <div>
      <form onSubmit={onSubmit} encType="multipart/form-data">
      <label>
          Title:
          <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
      </label>
      <label>
          Author:
          <input type="text" value={author} onChange={(e)=>setAuthor(e.target.value)} />
      </label>
      <label>
          Content:
          <input type="text" value={content} onChange={(e)=>setContent(e.target.value)} />
      </label>
      <label htmlFor='file'>
          Upload Image:
          <input type="file" name='postImg' onChange={(e)=>onChangeFile(e)}/>
      </label>
      <input type="submit" />
      </form>
    </div>
  )
}

export default CreatePost