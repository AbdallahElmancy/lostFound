import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";

export default function SingleItem() {
  let [allLost, setAllLost] = useState([]);
  let [singleAllLost, setSingleAllLost] = useState([]);
  let [singleAllLostUser, setSingleAllLostUser] = useState([]);


  const { id } = useParams();



  async function getItem() {
    let { data } = await axios.get(
      `https://lost-found-api.onrender.com/api/v1/items?limit=100`
    );
    setAllLost(data.data.items);
  }
  async function GetSingleItem(){
    let { data } = await axios.get(
        `https://lost-found-api.onrender.com/api/v1/items/${id}`
      );
      setSingleAllLost(data.data.item)
  }
  async function GetSingleItemUser(){
    let { data } = await axios.get(
        `https://lost-found-api.onrender.com/api/v1/users/${singleAllLost.creator}`
      );
      setSingleAllLostUser(data.data.user)
      console.log(data.data.user);
  }
  useEffect(() => {
    getItem();
    GetSingleItem();
    GetSingleItemUser();  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);




  return (
    <div>
        <div className="old mb-5">
            <p className="text-muted mt-3 mb-3">Lost and Found, get your gadget back, help your friends recover their lost</p>
            <div className=" d-flex flex-wrap justify-content-between">
                  <div className=" col-md-4 boxLost">
                  <img
              crossOrigin="anonymous"
              className="w-100"
              src={singleAllLost.image}
              alt={singleAllLost.name}
            />
                  </div>
            <div className=" col-md-7 boxLost p-2">
                <div className="w-100 p-1 mb-1 boxLostButtom">
                    <p className="text-muted">{singleAllLost.description}</p>
                </div>
                <div className="w-100 p-1 mb-1 boxLostButtom fontBold">
                    <h5 className="fontBold">Item Details</h5>
                    <ul className="text-muted mt-3 mb-3">
                        <li className="mb-3 text-muted">Name :&nbsp;&nbsp;{singleAllLost.name} </li>
                        <li className="mb-3 text-muted">Category :&nbsp;&nbsp;   {singleAllLost.category}</li>
                        <li className="mb-3 text-muted">Description :&nbsp;&nbsp;  {singleAllLost.description}</li>
                        <li className="mb-3 text-muted">Location :&nbsp;&nbsp;     {singleAllLost.city + " " + singleAllLost.country}</li>
                        <li className="mb-3 text-muted">Data Publish :&nbsp;&nbsp; {new Date(singleAllLost.createdAt).toLocaleString('en-us',{day:'numeric',month:'short', year:'numeric'})}</li>

                    </ul>
                </div>
                <div className="w-100 p-1 mb-1 d-flex flex-wrap">
                <img
          className="hightImage  rounded-circle profileImage me-2"
          crossOrigin="anonymous"

          src={singleAllLostUser.avatar}
          alt={singleAllLostUser.name}
        />
        <ul className=" list-unstyled">
            <li><h4 className="fontBold">{singleAllLostUser.name}</h4></li>
            <li><i className="fa fa-phone me-2" aria-hidden="true"></i>{singleAllLostUser.phoneNumber}</li>
            <li><i className="fa fa-map-marker me-2"></i>{singleAllLostUser.city + ","+singleAllLostUser.country}</li>

        </ul>

                </div>

            </div>
            </div>
          

        </div>
            <div className="old mb-5">
        <div className="d-flex mobileMedia  align-items-center mt-5 mb-5 title">
          <span></span>
          <h2>Related Lost</h2>
        </div>
        <div className="d-flex mobileMedia flex-wrap">
          {allLost.map((lost) => (
            lost.category === singleAllLost.category ?       <div
            key={lost.id}
            className="col-lg-3 col-md-5 col-11  mt-5 me-1 boxLost"
          >
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
                  {lost.city + " " + lost.country}
                </p>
              </div>
              <div className="timeBox">
                {new Date(lost.createdAt).getHours() + " H "}
                <i className="fa-solid fa-clock ms-2"></i>
              </div>
            </div>
            <div className="d-flex justify-content-center w-100">
              <Link to={`../details/${lost.id}`} className=" m-2 w-75">
                <button className=" p-3 w-100">Details</button>
              </Link>
            </div>
          </div>:''
          
      
          ))}
          <Link
            to="../rescentlyLost"
            className="mt-5 m-2 w-100 resOldLostMobile"
          >
            <button className=" p-3 w-100">show all</button>
          </Link>
        </div>
      </div>
      <div className="old mb-5">
        <div className="d-flex mobileMedia  align-items-center mt-5 mb-5 title">
          <span></span>
          <h2>Suggestion Lost</h2>
          <Link to="../rescentlyLost" className="resOldLost">
            show all
          </Link>
        </div>
        <div className="d-flex mobileMedia flex-wrap">
          {allLost.slice(0, 3).map((lost) => (
            <div
              key={lost.id}
              className="col-lg-3 col-md-5 col-11  mt-5 me-1 boxLost"
            >
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
                    {lost.city + " " + lost.country}
                  </p>
                </div>
                <div className="timeBox">
                  {new Date(lost.createdAt).getHours() + " H "}
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
          <Link
            to="../rescentlyLost"
            className="mt-5 m-2 w-100 resOldLostMobile"
          >
            <button className=" p-3 w-100">show all</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
