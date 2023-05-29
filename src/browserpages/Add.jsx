import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Add = () => {


  const[movie, setMovie] = useState({
    title:"",
    release_date:"",
    gener: "",
    plot:""
  })

  const token = localStorage.getItem('token')
  const navigate = useNavigate()


  const handleChange = (e) => {
    setMovie((prev) => ({ ...prev, [e.target.name]: e.target.value}))
  };


  const handleClick = async e => {
    e.preventDefault()
    try {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      await axios.post("http://127.0.0.1:8000/v1/movie/register_movie", movie, config)
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }
  console.log(movie)
  return (
    <div className='form'>
      <h1>Add new Movie</h1>
      <input type="text" placeholder="Insert Title Here" onChange={handleChange} name="title"/>
      <input type="date" placeholder="Insert Release Date Here" onChange={handleChange} name="release_date" />
      <input type="text" placeholder="Insert Genre Here" onChange={handleChange} name="genre"/>
      <input type="text" placeholder="Insert Plot Here" onChange={handleChange} name="plot"/>
   
    <button className='formButton' onClick={handleClick}>Finish</button>
      <Link to="/">Click here and see all movies available</Link>
    </div>
  )
}


export default Add