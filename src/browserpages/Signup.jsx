import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Signup = () => {


  const[signup, setItem] = useState({
    email:"",
    username:"",
    password:"",
  })


  const navigate = useNavigate()


  const handleChange = (e) => {
    setItem((prev) => ({ ...prev, [e.target.name]: e.target.value}))
  };


  const handleClick = async e => {
    e.preventDefault()
    try {
      const resp = await axios.post("http://127.0.0.1:8000/v1/user/register_user", signup)
      window.confirm(signup.email+': created. Please Login with your credentials!');
      navigate("/")
    }catch(err){
      window.confirm("Wrong values");
      console.log(err)
    }
  }
  return (
    <div className='form'>
      <h1>Signup</h1>
      <input type="email" placeholder="Insert email" onChange={handleChange} name="email"/>
      <input type="username" placeholder="Insert username" onChange={handleChange} name="username"/>
      <input type="password" placeholder="password" onChange={handleChange} name="password" />
    <button className='formButton' onClick={handleClick}>login</button>
      <Link to="/">Go to main page</Link>
    </div>
  )
}


export default Signup