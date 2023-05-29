import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Ratings = () => {
  const [ratings, setRatings] = useState([])
  const { id: movieId } = useParams()
  const token = localStorage.getItem('token')

  useEffect(()=>{
    const fetchAllRatings = async ()=> {
      try{
      const resp = await axios.get("http://127.0.0.1:8000/v1/rating/list_rating?movie="+movieId)
      setRatings(resp.data);
      }catch(err){
        console.log(err)
      }
    }
    fetchAllRatings()
  },[])
  if (!token)
      return (

        <div>
          <h1>Movie Ratings</h1>
          <br/><br/>
          <div className="movies">
            {ratings.map(rating=>(
              <div className="movie" key={rating.id}>
                <h2>{rating.user}</h2>
                <p>{rating.score}</p>
                <p>{rating.comment}</p>
              </div>
            ))}
          </div>
          <br/><br/>
          <Link to="/">Click here and see all movies available</Link>
        </div>
      )
  else
      return (

        <div>
          <h1>Movie Ratings</h1>
          <br/><br/>
          <div className="movies">
            {ratings.map(rating=>(
              <div className="movie" key={rating.id}>
                <h2>{rating.user}</h2>
                <p>{rating.score}</p>
                <p>{rating.comment}</p>
              </div>
            ))}
          </div>
          <button className='movieButton'><Link to={`/add_ratings/${movieId}`}>Add new Rating</Link></button>
          <br/><br/>
          <Link to="/">Click here and see all movies available</Link>
        </div>
      )

}


export default Ratings
