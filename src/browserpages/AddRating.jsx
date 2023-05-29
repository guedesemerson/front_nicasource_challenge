import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
const AddRating = () => {

  const { id: movieId } = useParams()

  const[rating, setRating] = useState({
    score:"",
    comment:"",
    movie: movieId,
  })

  const token = localStorage.getItem('token')
  const navigate = useNavigate()



  const handleChange = (e) => {
    setRating((prev) => ({ ...prev, [e.target.name]: e.target.value}))
  };


  const handleClick = async e => {
    e.preventDefault()
    try {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      const resp = await axios.post("http://127.0.0.1:8000/v1/rating/register_rating", rating, config)
      navigate("/")
    }catch(err){
      window.confirm(err.response.data.response[0]);
    }
  }
  return (
    <div className='form'>
      <h1>Add new Rating</h1>
      <input type="text" placeholder="Insert score Here" onChange={handleChange} name="score"/>
      <input type="text" placeholder="Insert comment" onChange={handleChange} name="comment" />
      <button className='formButton' onClick={handleClick}>Finish</button>
      <br/><br/>
      <Link to="/">Click here and see all movies available</Link>
    </div>
  )
}


export default AddRating