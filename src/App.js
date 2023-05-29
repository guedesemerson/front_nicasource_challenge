import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Add from "./browserpages/Add";
import Movies from "./browserpages/Movies";
import Update from "./browserpages/Update";
import Login from "./browserpages/Login";
import Ratings from "./browserpages/Ratings";
import AddRating from "./browserpages/AddRating";
import Signup from "./browserpages/Signup";
import "./style.css"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Movies/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/update/:id" element={<Update/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/ratings/:id" element={<Ratings/>}/>
        <Route path="/add_ratings/:id" element={<AddRating/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;