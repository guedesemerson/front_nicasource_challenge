import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Movies = () => {
  const [movies, setMovies] = useState([])
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(()=>{
    const fetchAllMovies = async ()=> {
      try{
      const resp = await axios.get("http://127.0.0.1:8000/v1/movie/list_movie")
      setMovies(resp.data);
      }catch(err){
        console.log(err)
      }
    }
    fetchAllMovies()
  },[])

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this movie?");
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      if (confirmed) {
        await axios.delete("http://127.0.0.1:8000/v1/movie/delete_movie/" + id, config);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  function logout() {
      localStorage.removeItem('token');
      navigate("/")
  }



  if (!token)
      return (

        <div>
          <h1>Movie store On-line</h1>
          <button className="login"><Link to="/signup">Signup</Link></button>
          <button className="login"><Link to="/login">Login</Link></button>
          <br/><br/>
          <div className="movies">
            {movies.map(movie=>(
              <div className="movie" key={movie.id}>
                <h2>{movie.title}</h2>
                <p>{movie.release_date}</p>
                <p>{movie.genre}</p>
                <p>{movie.plot}</p>
                <button className="ratings"><Link to={`/ratings/${movie.id}`}>Ratings</Link></button>
                </div>
            ))}
          </div>
        </div>
      )
  else
      return (

        <div>
          <h1>Movie store On-line</h1>
          <button className="logout" onClick={logout}><Link to="/">Logout</Link></button>
          <br/><br/>
          <div className="movies">
            {movies.map(movie=>(
              <div className="movie" key={movie.id}>
                <h2>{movie.title}</h2>
                <p>{movie.release_date}</p>
                <p>{movie.genre}</p>
                <p>{movie.plot}</p>
                <button className="ratings"><Link to={`/ratings/${movie.id}`}>Ratings</Link></button>
                <button className="delete" onClick={()=>handleDelete(movie.id)}>Delete Movie 🗑</button>
                <button className="update"><Link to={`/update/${movie.id}`}>Update Movie 🖊</Link></button>
                </div>
            ))}
          </div>
          <button className='movieButton'><Link to="/add">Add new movie</Link></button>
        </div>
      )

}


export default Movies