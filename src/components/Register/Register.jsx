import React from "react";
import { useState } from "react";
import Joi from "joi";
import { Link, useNavigate } from "react-router-dom";
import imageSign from "../../images/signImage.jpg"



export default function Register() {
  let [errorList, setErrorList] = useState([]);
  let navigate = useNavigate()


  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);

  let [user, setUser] = useState(({
    name: "",
    phoneNumber: "",
    password: "",
    confirmPassword:""
  }));
 
  function getUser(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
   async function formSubmit(e) {
    e.preventDefault();
    let valdiationResponse = validateRegisterForm();
   
    setLoading(true);
    clearErrorValedition();

    if (valdiationResponse.error) {
      setLoading(false);
      setErrorList(valdiationResponse.error.details);
      errorValedition();
    }else{
      let resp = await fetch(`https://lost-found-api.onrender.com/api/v1/users/signup`,{
        method:"POST",
        body:JSON.stringify(user),
        headers:{"Content-Type":"application/json"}
      });
     let data = await resp.text();
     let parse =  JSON.parse(data)
      if ( parse.message === "User created successfully") {
            setLoading(false);
            navigate("/home")
          } else {
            setLoading(false);
    
            setError(parse.message)
    
          }
    }
   
    
  }
  function validateRegisterForm() {
    let schema = Joi.object({
      name: Joi.string().min(3).max(15).required(),
      phoneNumber: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
      password: Joi.string()
        .pattern(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"))
        .required(),
      confirmPassword: Joi.string().required().valid(Joi.ref('password')),

    });
    return schema.validate(user, { abortEarly: false });
  }
  function errorValedition() {
    for (let index = 0; index < errorList.length; index++) {
      const element = errorList[index].context.key;
      if (element === "name") {
        let name = "Type correct name";
        document.getElementById("name").innerHTML = name;
      }

      if (element === "phoneNumber") {
        let phoneNumber = "Type correct phoneNumber ";
        document.getElementById("email").innerHTML = phoneNumber;
      }
      if (element === "password") {
        let password = "type strong password";
        document.getElementById("password").innerHTML = password;
      }
      if (element === "confirmPassword") {
        let password = "does not match";
        document.getElementById("confirmPassword").innerHTML = password;
      }
    }
  }
  function clearErrorValedition() {
    let name = document.getElementById("name");
    let phoneNumber = document.getElementById("phoneNumber");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");

    name.innerHTML = "";
    phoneNumber.innerHTML = "";
    password.innerHTML = "";
    confirmPassword.innerHTML="";
  }
  function showPassword() {
    let passwordShow = document.getElementById("showPassword");

    if (passwordShow.type === "password") {
      passwordShow.type = "text";
    } else {
      passwordShow.type = "password";
    }

  }
  function showConfirmPassword(){
    let confirmPasswordShow = document.getElementById("showConfirmPassword");

    if (confirmPasswordShow.type === "password") {
      confirmPasswordShow.type = "text";
    } else {
      confirmPasswordShow.type = "password";
    }
  }
 
  return (
    <div className="row register">
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
          <label htmlFor="name">Name</label>
          <input
            onChange={getUser}
            className="form-control"
            name="name"
            type="name"
          />
          <span id="name" className="mt-1 mb-1 w-25 h-25 redColor"></span>
        </div>
        <div className="my-2">
          <label htmlFor="email">phone</label>
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
          <span id="password" className="mt-1 mb-1 w-25 h-25 redColor"></span>
        </div>
        <div className="my-2">
          <label htmlFor="confirmpassword">confirmPassword</label>
          <input
           onChange={getUser}
            className="form-control"
            name="confirmPassword"
            type="password"
            id="showConfirmPassword"

          />
          <span  onClick={showConfirmPassword} className="fa fa-fw fa-eye field-icon eyePassword"></span>

          <span id="confirmPassword" className="mt-1 mb-1 w-25 h-25 redColor"></span>
        </div>
        <button  type="submit" className="basicButton mt-3 mb-3 p-2 aBColor w-100">
          
          {loading ? <i class="fas fa-spinner fa-spin "></i> : "sign up"}
        </button>
        <div className="w-100 text-center d-flex justify-content-center">
        <p className="text-muted fontBold ">Already have Account?</p>
        <Link to='/login' className="fontBold linkLogin">login</Link>
        </div>
       
          </form>
        </div>

      </div>
    </div>
  );
}
