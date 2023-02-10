import React from 'react'
import { useState } from "react";
import Joi from "joi";
import { Link,useNavigate } from "react-router-dom";
import imageSign from "../../images/signImage.jpg"



export default function Login(props) {
  let [errorList, setErrorList] = useState([]);
  let navigate = useNavigate()
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  let [user, setUser] = useState({
    phoneNumber: "",
    password: "",
  });
 
  function getUser(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  async function formSubmit(e) {
    e.preventDefault();
    let valdiationResponse = validateLoginForm();
    setLoading(true);
    clearErrorValedition();

    if (valdiationResponse.error) {
      setLoading(false);
      setErrorList(valdiationResponse.error.details);
      errorValedition();
    }else {
      let resp = await fetch(`https://lost-found-api.onrender.com/api/v1/users/authenticate`,{
        method:"POST",
        body:JSON.stringify(user),
        headers:{"Content-Type":"application/json"}
      });
     let data = await resp.text();
     let parse =   JSON.parse(data)
      if (parse.message === "User authenticated successfully") {
        localStorage.setItem("userToken",parse.data.token)
        props.getUserInfo()
        navigate("/home")
        setLoading(false);

      } else {
        setLoading(false);

        setError(parse.message);

      }
    }
  }
  function validateLoginForm() {
    let schema = Joi.object({
      phoneNumber: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
      password: Joi.string()
        .pattern(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"))
        .required(),
    })
    return schema.validate(user, { abortEarly: false });
  }
  function errorValedition() {
    for (let index = 0; index < errorList.length; index++) {
      const element = errorList[index].context.key;
      if (element === "phoneNumber") {
        let phoneNumber = "the phone is wrong ";
        document.getElementById("email").innerHTML = phoneNumber;
      }
      if (element === "password") {
        let password = "password wrong";
        document.getElementById("password").innerHTML = password;
      }
    }
  }
  function clearErrorValedition() {
    
    let phoneNumber = document.getElementById("phoneNumber");
    let password = document.getElementById("password");
    phoneNumber.innerHTML = "";
    password.innerHTML = "";
  }
  function showPassword() {
    let passwordShow = document.getElementById("showPassword");

    if (passwordShow.type === "password") {
      passwordShow.type = "text";
    } else {
      passwordShow.type = "password";
    }

  }
  
  return (
    <div className="row login">
    <div className="d-flex  justify-content-between">
    <div className="col-xl-6 mt-5 imgeSign">
      <img src={imageSign} className="w-100" alt=""  />
    </div>

      <div className="col-xl-6 col-12 p-5 borderMain ">
        <h5 className="fontBold">WElcom to <span className="aColor"> Lost & Found!</span></h5>
        <p className="text-muted mb-3">Register Your Acount</p>
        {error && <div className="alert alert-danger mb-2">{error}</div>}


        <form onSubmit={formSubmit}>
          
     
      <div className="my-2">
        <label htmlFor="email">phoneNumber</label>
        <input
           onChange={getUser}
          className="form-control"
          name="phoneNumber"
          type="text"
        />
        <span id="phoneNumber" className="mt-1 mb-1 w-25 h-25 redColor"></span>
      </div>
      <div className="my-2">
        <label htmlFor="password">Password</label>
        <input
         onChange={getUser}
          className="form-control"
          name="password"
          type="password"
          id="showPassword"
        />
        <span  onClick={showPassword} className="fa fa-fw fa-eye field-icon eyePassword"></span>
        <div className="w-100 d-flex justify-content-between">
        <span id="password" className="mt-1 mb-1 w-25 h-25 redColor"></span>
        <Link to='/register' className="linkLogin">forget password</Link>

        </div>
       
      </div>
     
      <button  type="submit" className="basicButton mt-3 mb-3 p-2 aBColor w-100">
        
        {loading ? <i class="fas fa-spinner fa-spin "></i> : "sign in"}
      </button>
      <div className="w-100 mt-2 text-center ">
        <p className="text-muted loginSp">OR</p>
      <Link to='/register' className="fontBold linkLogin">sign up</Link>
      </div>
     
        </form>
      </div>

    </div>
  </div>
  );
}

