import React from 'react'
import {useState, useEffect} from 'react'
import {useParams, useNavigate, Link, Form} from 'react-router-dom';
import axios from 'axios'

function Register() {
  const [registerUser,setRegisterUser]=useState({
    username:"", 
    email:"",
    password:"",
  })
  const navigate=useNavigate();
  function updateForm(value){
    return setRegisterUser((prev)=>{
       return{...prev,...value};
    });
  }
  async function onSubmit(e){
    e.preventDefault();
    const newUser={...registerUser};
    const headers={
     'Content-Type': 'application/json'
   }
   console.log(newUser)
   console.log('onSubmit 1')
    await axios.post('http://localhost:3001/register',newUser,headers)
    .then((res)=>{
      console.log(res.data)
        localStorage.setItem("token",res.data.token)
    }).catch((err)=>{
       console.log(err)
    })
    setRegisterUser({ username: "", email: "", password: "" });
    // navigate("/");
    console.log('onsubmit 2')
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
  // useEffect(()=>{
  //   console.log('useEffect')
  //   axios.post('http://localhost:3001/isUserAuth',{ 
  //     headers: {
  //       "Authorization" : localStorage.getItem("token") 
  //     }
  //   }).then((res)=>{
  //     res.json() 
  //   }).then((data)=>{
  //     return data.isLoggedIn ? navigate("/") : null
  //   }).catch(err=>{
  //     console.log(err)
  //   })
  // },[confirm])
  return ( 
    <div>
      <form onSubmit={onSubmit}>
      <label>
          Username:
          <input type="text" value={registerUser.username}  onChange={(e)=>updateForm({username:e.target.value})}/>
      </label>
      <label>
          Email:
          <input type="text" value={registerUser.email} onChange={(e)=>updateForm({email:e.target.value})} />
      </label>
      <label>
          password:
          <input type="text" value={registerUser.password} onChange={(e)=>updateForm({password:e.target.value})} />
      </label>
      <input type="submit" />
      </form>
    </div>
  )
}

export default Register;