import React from "react";
import Joi from "joi";
import { useState } from "react";


export default function AddItem({ LoginUser }) {

  let [errorList, setErrorList] = useState([]);

  let [loading, setLoading] = useState(false);
  let [user, setUser] = useState({
    name: "",
    category: "",
    description: "",
    country: "",
    city: "",
    creator: `${LoginUser.userId}`,
  });

  let [image, setIamge]= useState()
  function getImageData(e){
   let myImage= {...image }
   myImage[e.target.name] = e.target.files[0];   
   setIamge(myImage)
    }

       async function handleSubmit() {



          let token = localStorage.getItem("userToken");
          let res = await fetch(`https://lost-found-api.onrender.com/api/v1/items/user/${LoginUser.userId}`);
          let dataI = await res.json()



          let bodyContent = new FormData();
          bodyContent.append("image", image.image);
          
     await fetch(`https://lost-found-api.onrender.com/api/v1/items/${dataI.data.items[0].id}/image`, { 
            method: "POST",
            body: bodyContent,
            headers: {
              'Authorization':  ` ${token}`,
            }
          });
          
  
        }




  function getItemData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  async function submitFormData() {
    let valdiationResponse = validateAddForm();

    setLoading(true);
    clearErrorValedition();
    if (valdiationResponse.error) {
      setLoading(false);
      setErrorList(valdiationResponse.error.details);
      errorValedition();
    } else {
      let token = localStorage.getItem("userToken");
      let resp = await fetch(
        `https://lost-found-api.onrender.com/api/v1/items`,
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
            'Authorization':  ` ${token}`,
          },
        }
      );

      let data = await resp.text();
      let parse = JSON.parse(data);
      setLoading(false);

      if (parse.message === "Item created successfully") {
        setLoading(false);
      } else {
        setLoading(false);

      }
    }
  }
  function validateAddForm() {
    let schema = Joi.object({
      name: Joi.string().min(3).max(15).required(),
      category: Joi.string().min(3).max(50).required(),
      description: Joi.string().min(5).max(300).required(),
      city: Joi.string().min(3).max(50).required(),
      country: Joi.string().min(3).max(50).required(),
      creator: Joi.string(),
  
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

      if (element === "category") {
        let category = "Type  category ";
        document.getElementById("category").innerHTML = category;
      }
      if (element === "description") {
        let description = "type  description";
        document.getElementById("description").innerHTML = description;
      }
      if (element === "city") {
        let city = "type  description";
        document.getElementById("city").innerHTML = city;
      }
      if (element === "country") {
        let country = "type  country";
        document.getElementById("country").innerHTML = country;
      }
   
    }
  }
  function clearErrorValedition() {
    let name = document.getElementById("name");
    let category = document.getElementById("category");
    let description = document.getElementById("description");
    let city = document.getElementById("city");
    let country = document.getElementById("country");

    name.innerHTML = "";
    category.innerHTML = "";
    description.innerHTML = "";
    city.innerHTML = "";
    country.innerHTML = "";
  }


 



         
  async function functionSubmit(e){
    e.preventDefault();await submitFormData(); let ar= await handleSubmit()
    setTimeout(ar, 5000);
   }

  return (
    <>

      <div className="container old">
        <form onSubmit={functionSubmit}>
          <div className="row borderMain p-5 ">
            <div className="col-md-4">
              <h1>Add Item</h1>
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
                  <label htmlFor="category form-control ">Category</label>
                  <select
                    className="form-control"
                    name="category"
                    onChange={getItemData}
                  >
                    <option>
                      <input type="text" />
                    </option>
                    <option value="mobile">mobile</option>
                    <option value="laptop">laptop</option>
                    <option value="keys">keys</option>
                    <option value="document">document</option>
                    <option value="money">money</option>
                    <option value="tablet">tablet</option>
                    <option value="watch">watch</option>
                    <option value="camera">camera</option>
                    <option value="other">other</option>
                  </select>
                  <span
                    id="category"
                    className="mt-1 mb-1 w-25 h-25 redColor"
                  ></span>
                </div>
                <div className="input-gp my-2">
                  <label htmlFor="description">Description</label>
                  <textarea
                    onChange={getItemData}
                    type="number"
                    className="form-control"
                    name="description"
                  />
                  <span
                    id="description"
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
              </div>
            </div>
            <div className="col-md-4">
            </div>
            <div className="col-md-4">
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
            </div>
            <button className="  basicButton px-5 w-25 " type="submit">
              {loading ? <i className="fas fa-spinner fa-spin "></i> : "Add"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
