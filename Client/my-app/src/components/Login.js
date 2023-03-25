import React from 'react'
import {useState, useEffect} from 'react'
import {useParams, useNavigate, Link, Form} from 'react-router-dom';
import axios from 'axios'

function Login() {
    const [loginUser,setLoginUser]=useState({
        email:"",
        password:"",
    })
    const navigate=useNavigate();
    function updateForm(value){
        return setLoginUser((prev)=>{
           return{...prev,...value};
        });
    }
    async function onSubmit(e){
        e.preventDefault();
        const loggingInUser={...loginUser};
    //     const headers={
    //      'Content-Type': 'application/json'
    //    }
    //    const options={
    //      withCredentials: true 
    //    }
      // const config = {
      //   headers: {
      //     // headers to be sent with the POST request
      //     'Content-Type': 'application/json'
      //   },
      //   withCredentials: true,
      // };
       console.log(loginUser)
        await axios.post('http://localhost:3001/login',loggingInUser)
        .then((res)=>{
           console.log(res)
           localStorage.setItem("token",res.data.token)
        }).catch((err)=>{
           console.log(err)
        })
        setLoginUser({ email: "", password: "" });
        // navigate("/");
        
        await axios.get('http://localhost:3001/isUserAuth',{ 
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem("token")}` 
      }
    })
    .then((res)=>{
      console.log(res)
      return res.data.isLoggedIn ? navigate("/") : null     //err without return 
    }).catch(err=>{
      console.log(err)
    })
      }
  return (
    <div>
     <form onSubmit={onSubmit}>
      <label>
          Email:
          <input type="text" value={loginUser.email} onChange={(e)=>updateForm({email:e.target.value})} />
      </label>
      <label>
          password:
          <input type="text" value={loginUser.password} onChange={(e)=>updateForm({password:e.target.value})} />
      </label>
      <input type="submit" />
     </form>
    </div>
  )
}

export default Login