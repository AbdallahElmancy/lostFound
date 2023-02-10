import React, { useEffect,useState } from "react";
import { Link } from 'react-router-dom';
export default function OldLost() {
  let [allLost,setAllLost]= useState([])
 
  async function getItem(){
let responce = await fetch(`https://lost-found-api.onrender.com/api/v1/items?limit=100&sortBy=createdAt&order=asc`);
let data = await responce.json()
setAllLost(data.data.items)

}
useEffect(()=>{
getItem()

},[])


  return (
    <div className="old mb-5">
    <div className="d-flex mobileMedia  align-items-center mt-5 mb-5 title">
      <span></span>
      <h2>Old Lost</h2>
    </div>
    <div className="d-flex mobileMedia flex-wrap">
    {allLost.map((lost) => (
      <div key={lost.id} className="col-lg-3 col-md-5 col-11  mt-5 me-1 boxLost">
        <img
          className="hightImage w-100 h-100"
          crossorigin="anonymous"
          src={lost.image}
          alt={lost.name}
        />
        <div className="d-flex p-3 justify-content-between">
          <img
          crossOrigin="anonymous"
          className="hightImage  rounded-circle profileImage "
          src={lost.image}
          alt={lost.name}
        />
       
        <div>
          <h4>{lost.name}</h4>
          <p>
          <i className="fa fa-map-marker me-2" aria-hidden="true"></i>
            {lost.city + " " +lost.country}
          </p>
          </div>
          <div className="timeBox">
          {new Date(lost.createdAt).getHours()+ " H "}
            <i className="fa-solid fa-clock ms-2"></i>
                      </div>              
        </div> 
        <div className="d-flex justify-content-center w-100">
          <Link to={`../details/${lost.id}`} className=" m-2 w-75">
          <button className=" p-3 w-100">Details</button> 
          </Link>
          </div>
                      </div>
    ))}
    </div>

  </div>    )
}
