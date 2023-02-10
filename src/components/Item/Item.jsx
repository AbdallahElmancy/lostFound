import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";


export default function Item() {
  let [allLost, setAllLost] = useState([]);
  let [allLosRe, setAllLostRe] = useState([]);


  async function getItem() {
    let { data } = await axios.get(
      `https://lost-found-api.onrender.com/api/v1/items?limit=100&sortBy=createdAt&order=desc`
    );
    setAllLost(data.data.items);
  
  }
  async function getItemRe() {
    let { data } = await axios.get(
      `https://lost-found-api.onrender.com/api/v1/items?limit=100&sortBy=createdAt&order=asc`
    );
    setAllLostRe(data.data.items);
  
  }
  useEffect(() => {
    getItem();
    getItemRe();
  }, []);

  const { order, gategory, searchText } = useParams();
  function showItem() {
    let cartoon = ``;
    if (searchText === "default") {
      cartoon += `<div class="alert alert-primary mt-5 " role="alert">
        you do not search
      </div>`;
      document.getElementById("cartoon").innerHTML = cartoon;
    } else {
      if (order === "recently") {
        if (gategory === "all") {
          for (const iterator of allLost) {
            if (
              iterator.description
                .toLowerCase()
                .includes(searchText.toLowerCase()) === true
            ) {
              cartoon += `
              <div key=${
                iterator.id
              } class="col-lg-3 col-md-5 col-11  mt-5 me-1 boxLost">
              <img
              class="hightImage w-100"
              crossorigin="anonymous"
      
                src=${iterator.image}
                alt=${iterator.name}
              />
              <div class="d-flex p-3 justify-content-between">
                <img
                class="hightImage  rounded-circle profileImage "
                crossorigin="anonymous"
      
                src=${iterator.image}
                alt=${iterator.name}
              />
             
              <div>
                <h4>${iterator.name}</h4>
                <p>
                <i class="fa fa-map-marker me-2" aria-hidden="true"></i>
                  ${iterator.city + " " + iterator.country}
                </p>
                </div>
                <div class="timeBox">
                ${new Date(iterator.createdAt).getHours() + " H "}
                  <i class="fa-solid fa-clock ms-2"></i>
                            </div>              
              </div> 
              <div class="d-flex justify-content-center w-100">
                <a href=${`../../../details/${iterator.id}`} class=" m-2 w-75">
                <button class=" p-3 w-100">Details</button> 
                </a>
                </div>
            </div>
              `;
              document.getElementById("cartoon").innerHTML = cartoon;
            }
          }
        } else {
          for (const iterator of allLost) {
            if (
              iterator.category === gategory &&
              iterator.description
                .toLowerCase()
                .includes(searchText.toLowerCase()) === true
            ) {
              cartoon += `
              <div key=${
                iterator.id
              } class="col-lg-3 col-md-5 col-11  mt-5 me-1 boxLost">
              <img
              class="hightImage w-100"
              crossorigin="anonymous"
      
                src=${iterator.image}
                alt=${iterator.name}
              />
              <div class="d-flex p-3 justify-content-between">
                <img
                class="hightImage  rounded-circle profileImage "
                crossorigin="anonymous"
      
                src=${iterator.image}
                alt=${iterator.name}
              />
             
              <div>
                <h4>${iterator.name}</h4>
                <p>
                <i class="fa fa-map-marker me-2" aria-hidden="true"></i>
                  ${iterator.city + " " + iterator.country}
                </p>
                </div>
                <div class="timeBox">
                ${new Date(iterator.createdAt).getHours() + " H "}
                  <i class="fa-solid fa-clock ms-2"></i>
                            </div>              
              </div> 
              <div class="d-flex justify-content-center w-100">
              <a href=${`../../../details/${iterator.id}`} class=" m-2 w-75">
              <button class=" p-3 w-100">Details</button> 
              </a>
                </div>
            </div>
              `;
              document.getElementById("cartoon").innerHTML = cartoon;
            }
          }
        }
      } else {
        if (gategory === "all") {
          for (const iterator of allLosRe) {
            if (
              iterator.description
                .toLowerCase()
                .includes(searchText.toLowerCase()) === true
            ) {
              cartoon += `
              <div key=${
                iterator.id
              } class="col-lg-3 col-md-5 col-11  mt-5 me-1 boxLost ">
              <img
              class="hightImage w-100"
              crossorigin="anonymous"
      
                src=${iterator.image}
                alt=${iterator.name}
              />
              <div class="d-flex p-3 justify-content-between">
                <img
                class="hightImage  rounded-circle profileImage "
                crossorigin="anonymous"
      
                src=${iterator.image}
                alt=${iterator.name}
              />
             
              <div>
                <h4>${iterator.name}</h4>
                <p>
                <i class="fa fa-map-marker me-2" aria-hidden="true"></i>
                  ${iterator.city + " " + iterator.country}
                </p>
                </div>
                <div class="timeBox">
                ${new Date(iterator.createdAt).getHours() + " H "}
                  <i class="fa-solid fa-clock ms-2"></i>
                            </div>              
              </div> 
              <div class="d-flex justify-content-center w-100">
              <a href=${`../../../details/${iterator.id}`} class=" m-2 w-75">
              <button class=" p-3 w-100">Details</button> 
              </a>
                </div>
            </div>
              `;
              document.getElementById("cartoon").innerHTML = cartoon;
            }
          }       
         } else {
          for (const iterator of allLosRe) {
            if (
              iterator.category === gategory &&
              iterator.description
                .toLowerCase()
                .includes(searchText.toLowerCase()) === true
            ) {
              cartoon += `
              <div key=${
                iterator.id
              } class="col-lg-3 col-md-5 col-11  mt-5 me-1 boxLost">
              <img
              class="hightImage w-100"
              crossorigin="anonymous"
      
                src=${iterator.image}
                alt=${iterator.name}
              />
              <div class="d-flex p-3 justify-content-between">
                <img
                class="hightImage  rounded-circle profileImage "
                crossorigin="anonymous"
      
                src=${iterator.image}
                alt=${iterator.name}
              />
             
              <div>
                <h4>${iterator.name}</h4>
                <p>
                <i class="fa fa-map-marker me-2" aria-hidden="true"></i>
                  ${iterator.city + " " + iterator.country}
                </p>
                </div>
                <div class="timeBox">
                ${new Date(iterator.createdAt).getHours() + " H "}
                  <i class="fa-solid fa-clock ms-2"></i>
                            </div>              
              </div> 
              <div class="d-flex justify-content-center w-100">
              <a href=${`../../../details/${iterator.id}`} class=" m-2 w-75">
              <button class=" p-3 w-100">Details</button> 
              </a>
                </div>
            </div>
              `;
              document.getElementById("cartoon").innerHTML = cartoon;
            }
          }
        }
      }
    }
  }
  useEffect(() => {
    showItem();
  });

  return (
    <div className="item">
      <div className="mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center mt-5 mb-5 title">
          <span></span>
          <h2>search for you lost</h2>
        </div>

        <div
          className="d-flex mobileMedia flex-wrap justify-content-between mt-5 pt-5"
          id="cartoon"
        ></div>
      </div>
    </div>
  );
}
