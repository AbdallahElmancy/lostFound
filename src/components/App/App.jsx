import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from '../Home/Home'
import Login from '../Login/Login'
import Register from '../Register/Register'
import jwtDecode from "jwt-decode"
import { useState ,useEffect} from "react";
import PrivateRoutes from './../PrivateRoutes/PrivateRoutes';
import Notfound from './../Notfound/Notfound';
import ResentlyLost from './../ResentlyLost/ResentlyLost';
import OldLost from './../OldLost/OldLost';
import Item from './../Item/Item';
import SingleItem from './../SingleItem/SingleItem';
import AddItem from './../AddItem/AddItem';
import Setting from './../Setting/Setting';














export default function App() {
 
  let[LoginUser,setLoginUser]= useState(null);
  function getUserInfo(){
    let encodedToken = localStorage.getItem('userToken')
   let userData= jwtDecode(encodedToken)
   setLoginUser(userData)
    
  }
  useEffect(()=> {if(localStorage.getItem('userToken')){
    getUserInfo();
  }
},[])
  
  return (
    <div className="app container-fluid">
    <Navbar   LoginUser={LoginUser}  />

  
   
     <div className="app container-fluid">

        <Routes>
        <Route path='/home' element={<Home />}/>
        <Route path='/' element={<Navigate to="/home"/>}/>

        <Route element={<PrivateRoutes />}>
            <Route path='/logout' element={<Login/>}/>
            <Route path='/rescentlyLost' element={<ResentlyLost/>}/>
            <Route path='/oldLost' element={<OldLost/>}/>
            <Route path='/search/:order/:gategory/:searchText' element={<Item/>}/>
            <Route path='/addItem' element={<AddItem  LoginUser={LoginUser} />}/>
            <Route path='/details/:id' element={<SingleItem/>}/>
            <Route path='/setting' element={<Setting  LoginUser={LoginUser}/>}/>


        </Route>
            <Route path='/login' element={<Login getUserInfo={getUserInfo} />}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='*' element={<Notfound/>}/>



        </Routes>
    </div> 
    <Footer/>
 

    </div>
  )
}
