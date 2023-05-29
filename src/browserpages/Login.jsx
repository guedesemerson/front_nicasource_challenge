import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Login = () => {


  const[login, setItem] = useState({
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
      const resp = await axios.post("http://127.0.0.1:8000/v1/user/authenticate_user", login)
      console.log(resp.data.token)
      localStorage.setItem('token', resp.data.token)
      navigate("/")
    }catch(err){
      window.confirm("Wrong credential");
      console.log(err)
    }
  }
  console.log(login)
  return (
    <div className='form'>
      <h1>Login</h1>
      <input type="email" placeholder="Insert email" onChange={handleChange} name="email"/>
      <input type="password" placeholder="password" onChange={handleChange} name="password" />
    <button className='formButton' onClick={handleClick}>login</button>
      <Link to="/">Go to main page</Link>
    </div>
  )
}


export default Login