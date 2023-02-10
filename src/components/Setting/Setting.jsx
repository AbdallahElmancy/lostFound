import React from "react";
import Joi from "joi";
import { useState } from "react";


export default function Setting({ LoginUser }) {


  let [error, setErrorMsg] = useState("");
  let [loading, setLoading] = useState(false);
  let [user, setUser] = useState({
    name:"",
    country: "",
    city: "",
    phoneNumber:"",
    password:""
  });

  let [image, setIamge]= useState()
  function getImageData(e){
   let myImage= {...image }
   myImage[e.target.name] = e.target.files[0];   
   setIamge(myImage)
    }

       async function handleSubmit(e) {
        e.preventDefault()



          let token = localStorage.getItem("userToken");
   



          let bodyContent = new FormData();
          bodyContent.append("avatar", image.image);
          
          let response = await fetch(`https://lost-found-api.onrender.com/api/v1/users/avatar`, { 
            method: "POST",
            body: bodyContent,
            headers: {
              'Authorization':  ` ${token}`,
            }
          });
          
          let data = await response.text();
          console.log(data);
      
        }




  function getItemData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    console.log(myUser);
  }

  async function submitFormData(e) {
    e.preventDefault()
    let valdiationResponse = validateAddForm();

    setLoading(true);
    clearErrorValedition();
    if (valdiationResponse.error) {
      setLoading(false);
      console.log(valdiationResponse.error);
    } else {
      let token = localStorage.getItem("userToken");
      let resp = await fetch(
        `https://lost-found-api.onrender.com/api/v1/users/${LoginUser.userId}`,
        {
          method: "PATCH",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
            'Authorization':  ` ${token}`,
          },
        }
      );

      console.log(resp);
      let data = await resp.text();
      let parse = JSON.parse(data);
      console.log(parse);
      setLoading(false);

      if (parse.message === "User Updated successfully") {
        setLoading(false);
      } else {
        setLoading(false);

        setErrorMsg(parse.message);
        console.log(error);
      }
    }
  }
  function validateAddForm() {
    let schema = Joi.object({
      name: Joi.string().min(3).max(15),
      city: Joi.string().min(3).max(50),
      country: Joi.string().min(3).max(50),
      phoneNumber: Joi.string().length(11).pattern(/^[0-9]+$/),
      password: Joi.string()
        .pattern(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")),  
    });
    return schema.validate(user, { abortEarly: false });
  }

  function clearErrorValedition() {
    let name = document.getElementById("name");
    let city = document.getElementById("city");
    let country = document.getElementById("country");
    let phoneNumber = document.getElementById("phoneNumber");
    let password = document.getElementById("password");

    name.innerHTML = "";
    phoneNumber.innerHTML = "";
    password.innerHTML = "";
    city.innerHTML = "";
    country.innerHTML = "";
  }


 



         


  return (
    <>

      <div className="container old">
      <div className="d-flex flex-wrap justify-content-between borderMain p-5 ">
      <div className="col-md-5 col-lg-5 col-xl-5 col-sm-12 col-12 mb-3">

        <form onSubmit={submitFormData}>
              <h1>setting</h1>
              <div className="content">
                <div className="input-gp my-2">
                  <label htmlFor="name">Name</label>
                  <input
                    onChange={getItemData}
                    type="text"
                    className="form-control"
                    name="name"
                  />
                  <span
                    id="name"
                    className="mt-1 mb-1 w-25 h-25 redColor"
                  ></span>
                </div>

 
                <div className="input-gp my-2">
                  <label htmlFor="city">City</label>
                  <input
                    onChange={getItemData}
                    type="text"
                    className="form-control"
                    name="city"
                  />
                  <span
                    id="city"
                    className="mt-1 mb-1 w-25 h-25 redColor"
                  ></span>
                </div>
                <div className="input-gp my-2">
                  <label htmlFor="country">Country</label>
                  <input
                    onChange={getItemData}
                    type="text"
                    className="form-control"
                    name="country"
                  />
                  <span
                    id="country"
                    className="mt-1 mb-1 w-25 h-25 redColor"
                  ></span>
                </div>
                <div className="input-gp my-2">
                  <label htmlFor="phoneNumber">phoneNumber</label>
                  <input
                    onChange={getItemData}
                    type="text"
                    className="form-control"
                    name="phoneNumber"
                  />
                  <span
                    id="phoneNumber"
                    className="mt-1 mb-1 w-25 h-25 redColor"
                  ></span>
                </div>
                  <div className="input-gp my-2">
                  <label htmlFor="password">password</label>
                  <input
                    onChange={getItemData}
                    type="text"
                    className="form-control"
                    name="password"
                  />
                  <span
                    id="password"
                    className="mt-1 mb-1 w-25 h-25 redColor"
                  ></span>
                </div>
                <button className="  basicButton px-5 w-100 text-center " type="submit">
              {loading ? <i className="fas fa-spinner fa-spin "></i> : "Add"}
            </button>
              </div>
   
       
        </form>
        </div>
        <div className="col-md-4 col-12 col-lg-4 col-xl-4 col-sm-12">

        <form onSubmit={handleSubmit}>
     
              <div className="boxLost displyImage" id="displyImage"></div>
          
            <label htmlFor="file" className="borderMain p-2 mt-2">
                <span>
                  <i className="fa-solid fa-mobile-screen"></i> Upload the image
                  directly from your device
                </span>
              </label>
              <input
                type="file"
                className="d-none"
                name="image"
                onChange={getImageData}
                accept="image/*"
                id="file"
              />
              <div>
                <p className="h4 border-bottom">uploaded Img</p>
              </div>
              <button className="  basicButton px-5 mt-3 w-100 text-center " type="submit">
             Upload avatar
            </button>
        </form>
        </div>

                  </div>

      </div>
    </>
  );
}
