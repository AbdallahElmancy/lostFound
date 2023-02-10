import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import logo from "../../images/logo.jpg"
import { useState } from 'react'
import { useEffect } from 'react';

export default function Navbar({LoginUser}) {
    const [avatarUser,setAvatarUSer] = useState()
        let loc = useLocation()
    
    function showNavMobile() {
          let navMobile = document.getElementById("navMobile");
          if (navMobile.style.display === "none") {
            navMobile.style.display = "block";
          } else {
            navMobile.style.display = "none";
          }
        
    }
    async function getUserAvatar(){
        let token = localStorage.getItem("userToken");
        let response = await fetch(
            `https://lost-found-api.onrender.com/api/v1/users/${LoginUser.userId}/avatar`,
          {
            method: "Get",
            headers: {
              "Content-Type": "application/json",
              'Authorization':  ` ${token}`,
            },
          }
        );
        let data = await response
          setAvatarUSer(data.url)
      }
      useEffect(() => {
        getUserAvatar();
        }
     )
      
  

  return (
    <div >
        <nav className='d-flex justify-content-between align-items-center'>
        <ul className='list-unstyled '>
            <li className='px-2'>
                    <NavLink to='/home'><img className='rounded-circle'  src={logo} alt="movie website"  /></NavLink>
                    <span className="aColor fontBold"> Lost & Found!</span>
                </li>
            </ul>
            {loc.pathname !== "/login" && loc.pathname !== "/register"?<>        
            <ul className='list-unstyled navUl'>      
            <li className='px-2'>
                <NavLink to="/home" className="navLink">Home</NavLink>
            </li>
                <li className='px-2'>
                <NavLink to="/rescentlyLost" className="navLink">Recently Lost</NavLink>
            </li>
            <li className='px-2'>
                <NavLink to="/oldLost" className="navLink">Oldest Lost</NavLink>
            </li>
            </ul>
            <ul className='list-unstyled navUl'>      
            <li className='px-2'>
                <NavLink to="./addItem"><button className="ps-4 pe-4">Add</button></NavLink>
            </li>
            {LoginUser?<>   <li className='px-2'>
                <NavLink to="/setting"><img className="hightImage  rounded-circle profileImage" crossOrigin="anonymous" src={avatarUser} alt="" /></NavLink>
            </li></>:<>  <li className='px-2'>
                <NavLink to="/register"><button className="ps-4 pe-4 signUpBtn">Sign Up</button></NavLink>
            </li></>}
             
          
            </ul>
            <div onClick={showNavMobile} className='navList'>
                <div className='navLine'></div>
                <div className='navLine'></div>
                <div className='navLine'></div>
            </div></>:<></>}
            {loc.pathname === "/login"?<><NavLink to="/register"><button className="ps-4 pe-4 signUpBtn">Sign Up</button></NavLink></>:<></>}
            

        </nav>
        <div className='navMobile' id='navMobile'>
        <ul  className='list-unstyled d-block text-center mt-5 mb-5 p-5'>      
            <li className='px-2 mt-5'>
                <NavLink to="/home" onClick={showNavMobile} className="navLink">Home</NavLink>
            </li>
                <li className='px-2 mt-5 '>
                <NavLink to="/rescentlyLost" onClick={showNavMobile} className="navLink">Recently Lost</NavLink>
            </li>
            <li className='px-2 mt-5'>
                <NavLink to="/oldLost" onClick={showNavMobile} className="navLink">Oldest Lost</NavLink>
            </li>    
            <li className='px-2 mt-5'>
                <NavLink  className="navLink" onClick={showNavMobile} to="/addItem">Add</NavLink>
            </li>
            {LoginUser?<>   <li className='px-2 mt-5'>
                <NavLink  className="navLink" onClick={showNavMobile} to="/setting">setting</NavLink>
            </li></>:<>  <li className='px-2 mt-5'>
                <NavLink  className="navLink" onClick={showNavMobile} to="/register">Sign Up</NavLink>
            </li></>}
             
          
            </ul>
        </div>
    </div>
  )
}
