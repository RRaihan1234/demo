import React,{useState,useEffect} from 'react';
import Axios from 'axios';

import './App.css';

function App() {

  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [newFoodName,setNewFoodName] = useState('');

  /* const SERVER_URL = process.env.REACT_APP_SERVER_URL; */
  /* const SERVER_URL = "https://demo-back.vercel.app" */

  useEffect(()=>{
     Axios.get(/* SERVER_URL */"https://demo-back.vercel.app/read")
     .then((result)=>{
       setFoodList(result.data);
      })
     .catch((err) => console.log(err.message))
  },[/* SERVER_URL */])

  const addToList = () =>{
    Axios.post("https://demo-back.vercel.app/insert",{
      foodName,
      days
    });
    
    setTimeout(function(){ window.location.reload(); }, 100);
  }

  const food = (e) => {
    setFoodName(e.target.value)
  }

  const day = (e) => {
    setDays(e.target.value)
  }

  const newFood = (e) => {
    setNewFoodName(e.target.value)
  }

  const updateFood = (id) => {
    Axios.put("https://demo-back.vercel.app/update",{
      id:id,
      newFoodName
    })
    
    setTimeout(function(){ window.location.reload(); }, 100);
  }
  const deleteFood = (id) =>{
    Axios.delete(`https://demo-back.vercel.app/delete/${id}`)

    setTimeout(function(){ window.location.reload(); }, 100);
  }

  return (
    <div className="App">
         <h1>Food CRUD App with MERN</h1>
         <label>Food Name : </label>
         <input type="text" onChange={food}></input>
         <label>Days Since You ate it : </label>
         <input type="number" onChange={day}></input>
         <button onClick={addToList}>Add to List</button>
         <h1>Food List</h1>
         {foodList.map((val,key) => {
           return <div key={key} className = "food"> 
                      <h1>{val.foodName}</h1> <h1>{val.daysSinceIAte}</h1> 
                      <input type="text" placeholder='New Food Name' onChange={newFood}></input>
                      <button onClick={()=>updateFood(val._id)}>Update</button>
                      <button onClick={()=>deleteFood(val._id)}>Delete</button>
                  </div>
         
          })}
    </div>
  );
}

export default App;
