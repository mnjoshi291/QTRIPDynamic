import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
  let response=await fetch(config.backendEndpoint+'/cities');
  let data =await response.json();
  return data;
  }catch(err){
      return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let parentele=document.getElementById("data");
  let creatediv=document.createElement("div");
  creatediv.setAttribute('class', 'col-12 col-sm-6 col-lg-3 mb-4');
  var anchor=document.createElement('a');
  anchor.target = '_blank';
  anchor.href="pages/adventures/?city="+id;
  creatediv.appendChild(anchor);
  let creatediv2=document.createElement("div");
  creatediv2.setAttribute('class', 'tile');
  creatediv.appendChild(creatediv2);
  const img=document.createElement("img");
  img.src=image;
  creatediv2.appendChild(img);
  let creatediv3=document.createElement("div");
  creatediv3.setAttribute('class', 'tile-text text-center');
  creatediv2.appendChild(creatediv3);
  let h5=document.createElement("h5");
  h5.textContent=city;
  let p=document.createElement("p");
  p.textContent=description;
  creatediv3.appendChild(h5);
  creatediv3.appendChild(p);
  parentele.appendChild(creatediv);
}

export { init, fetchCities, addCityToDOM };
