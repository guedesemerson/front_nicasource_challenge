import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
const Update = () => {
  const { id: movieId } = useParams()
  const token = localStorage.getItem('token')
  const[movie, setMovie] = useState({
    title:"",
    release_date:"",
    genre: "",
    plot:""
  })

  useEffect( ()  => {
    axios.get("http://127.0.0.1:8000/v1/movie/retrieve_movie" + movieId).then((response) => {
      setMovie(response.data)
    })
  }, [movieId])

  const navigate = useNavigate()
  const location = useLocation()



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
      await axios.put("http://127.0.0.1:8000/v1/movie/update_movie/" + movieId, movie, config)
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }
  console.log(movie)
  return (
    <div className='form'>
      <h1>Update selected Movie</h1>
      <input type="text" placeholder="Insert Title Here" onChange={handleChange} value={movie.title} name="title"/>
      <input type="date" placeholder="Insert Release Date Here" onChange={handleChange} value={movie.description} name="release_date" />
      <input type="text" placeholder="Insert Genre Here" onChange={handleChange} value={movie.image} name="genre"/>
      <input type="text" placeholder="Insert Plot Here" onChange={handleChange} value={movie.price} name="plot"/>
   
    <button className='formButton' onClick={handleClick}>Update Movie</button>
    </div>
  )
}


export default Update