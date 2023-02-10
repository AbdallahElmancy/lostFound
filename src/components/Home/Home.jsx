import React, {  useState,useEffect } from "react";
import { Link } from "react-router-dom";
import about from "../../images/about.jpg";
import axios from 'axios'

export default function Home() {
  let [allLost,setAllLost]= useState([])

  let [allLostRe,setAllLostRe]= useState([])

  let uniqueArray = []
  for (let category of allLost) {
    uniqueArray.push(category.category)
  }
  let uniqGategory = [...new Set(uniqueArray)]

  function myFunction() {
    let dots = document.getElementById("dots");
    let moreText = document.getElementById("more");
    let btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "see more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "see less";
      moreText.style.display = "inline";
    }
  }
  let [item, setUser] = useState(({
    time: "recently",
    category: "all",
    searchText:"default"
  }));
 
  function getUser(e) {
    let myUser = { ...item };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    
  }
  let pathSearch =`../search/${item.time}/${item.category}/${item.searchText}`
 
  async function getItem(){
let {data} = await axios.get(`https://lost-found-api.onrender.com/api/v1/items?limit=3&sortBy=createdAt&order=desc`);

setAllLost(data.data.items)

}
async function getItemRe(){
  let {data} = await axios.get(`https://lost-found-api.onrender.com/api/v1/items?limit=3&sortBy=createdAt&order=asc`);
  
  setAllLostRe(data.data.items)
  
  }
useEffect(()=>{
getItem();
getItemRe();

},[])

   return (
    <>
    <div className="home position-relative">
    <div className="main ">
    
    </div>
 

    <div className="contentMain w-100 d-flex  flex-wrap justify-content-center align-items-center position-absolute">
         <svg className="svgHome1" xmlns="http://www.w3.org/2000/svg" width="120.053" height="90.974" viewBox="0 0 210.053 130.974">
  <path id="Path_46900" data-name="Path 46900" d="M97.969,6.575c53.848,0,98.849,23.926,98.849,65.9S141.108,137.55,87.261,137.55s-100.5-23.1-100.5-65.075S44.121,6.575,97.969,6.575Z" transform="translate(13.236 -6.575)" fill="#fff"/>
</svg>
<svg className="svgHome2" xmlns="http://www.w3.org/2000/svg" width="105.622" height="170.426" viewBox="0 0 175.622 170.426">
  <g id="Group_36531" data-name="Group 36531" transform="translate(49.895 4.397) rotate(22)">
    <path id="Path_1" data-name="Path 1" d="M0,0S97.689,51.493,106.73,53.566s25.628,0,24.987-17.556S112.563,12.021,99.732,17.015,83.091,63.534,97.672,121.8" transform="translate(0 0)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="5" strokeDasharray="8"/>
    <path id="Path_2" data-name="Path 2" d="M17.874,0,8.937,8.937,0,0" transform="translate(85.913 120.598) rotate(-19)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="5"/>
  </g>
</svg>

        <h1 className="mb-5 w-50 fontBold hHome"><span className="aColor">Find </span>Your Lost</h1>
   
        <div className="search d-flex w-75 justify-content-center flex-wrap">
        <select onChange={getUser} defaultValue="resently" className="form-select w-auto  me-3 mb-3" name="time" id="time">
          <option name="time" value="recently">resently</option>
          <option  name="time" value="old">old</option>
          </select>
          <select onChange={getUser} defaultValue="defalut" className="form-select w-auto me-3 mb-3" name="category" id="category">
          <option name="category" value="all">All</option>
          {uniqGategory.map((category,index)=>(
              <option name="category" key={index} value={category}>{category}</option>
          ))}
          </select>
          <input onChange={getUser} name="searchText" type="text" className="form-control searchInput me-2" placeholder="search with lost name"/>
     
          <Link className="aBColor searchButton mb-2" to={pathSearch}><i className="fa-solid fa-magnifying-glass " ></i></Link>
        </div>
      </div>
    </div>

    <div className="old mb-5">
    <div className="d-flex mobileMedia  align-items-center mt-5 mb-5 title">
      <span></span>
      <h2>Resently Lost</h2>
      <Link to="../rescentlyLost" className="resOldLost">show all</Link>

    </div>
    <div className="d-flex mobileMedia flex-wrap">
    {allLost.map((lost) => (
      <div key={lost.id} className="col-lg-3 col-md-5 col-11  mt-5 me-1 boxLost">
        <img
                  crossOrigin="anonymous"

          className="hightImage w-100"
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
       <Link to="../rescentlyLost" className="mt-5 m-2 w-100 resOldLostMobile">
          <button className=" p-3 w-100">show all</button> 
          </Link>
    </div>

  </div>
  <div className="old mb-5">
    <div className="d-flex mobileMedia  align-items-center mt-5 mb-5 title">
      <span></span>
      <h2>Old Lost</h2>
      <Link to="../oldLost" className="resOldLost">show all</Link>

    </div>
    <div className="d-flex mobileMedia flex-wrap">
    {allLostRe.map((lost) => (
      <div key={lost.id} className="col-lg-3 col-md-5 col-11  mt-5 me-1 boxLost">
        <img
          className="hightImage w-100"
          crossOrigin="anonymous"
          src={lost.image}
          alt={lost.name}
        />
        <div className="d-flex p-3 justify-content-between">
          <img
          className="hightImage  rounded-circle profileImage "
          crossOrigin="anonymous"

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
       <Link to="../oldLost" className="mt-5 m-2 w-100 resOldLostMobile">
          <button className=" p-3 w-100">show all</button> 
          </Link>
    </div>

  </div> 
   
      <div className="mb-5 mt-5 about">
        <div className="d-flex flex-wrap justify-content-between">
          <div className="about1 col-md-4">
            <div className="img">
              <img src={about} className="W-100" alt="" />
            </div>
          </div>

          <div className="about2 col-md-7 mt-2 boxLost p-5">
            <h2 className="aboutTitle mb-5">About Us</h2>
            <p>
              we are glad to visit us
              <br/>
              this site help peoble to find any somthing AllLostItem
              <br/>
              or report to site that somthing will found 
              <span id="dots">...</span>
              <span id="more">
              <br/>
                author : student KFC
                <br/>
                hope Find lost
                through our website now and help your friends. You can recover
              what you lost through our website now and help your friends
              </span>
            </p>

            <button onClick={myFunction} className="mt-2" id="myBtn">
            see more
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
