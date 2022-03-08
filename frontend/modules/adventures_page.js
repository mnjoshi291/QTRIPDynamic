import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  return params.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
  let url=config.backendEndpoint+('/adventures?city='+city);
  let response=await fetch(url);
  let data=await response.json();
  return data;
}
  catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  try{
  let parentele=document.getElementById("data");
  for(let i=0;i<adventures.length;i++){
    let creatediv=document.createElement('div');
    creatediv.className="col-6 col-md-4 col-lg-3 mb-4";
    creatediv.innerHTML=`<a href="detail/?adventure=${adventures[i].id}" id=${adventures[i].id}>
    <div class="activity-card">
    <div class="category-banner">${adventures[i].category}</div>
    <img class="img-responsive" src="${adventures[i].image}" />
    <div class="adventure-card-text w-100 text-md-center mt-2">
    <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3"
        <h5>${adventures[i].name}</h5>
        <p>&#x20B9;${adventures[i].costPerHead}</p>
      </div>
      <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3"
        <h5>Duration</h5>
        <p>${adventures[i].duration} hours</p>
      </div>
      </div>
      </div>
    </a>`;
      parentele.appendChild(creatediv);
  }
}
catch(e){
      return Error(e);
}
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredduration=[];
  for(let i=0;i<list.length;i++){
    if(list[i].duration>=low && list[i].duration<=high){
      filteredduration.push(list[i]);
    }
  }
  return filteredduration;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredcategory=[];
  for(let i=0;i<list.length;i++){
    for(let j=0;j<categoryList.length;j++){
      if(list[i].category==categoryList[j]){
        filteredcategory.push(list[i]);
      }
    }
  }
  return filteredcategory;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let low=filters[Object.keys(filters)[0]].split('-')[0];
  let high=filters[Object.keys(filters)[0]].split('-')[1];
  let category=filters[Object.keys(filters)[1]];
  if(filters[Object.keys(filters)[0]].length>0 && filters[Object.keys(filters)[1]].length>0){
    let filteredduration=filterByDuration(list,low,high);
    let filteredcategory=filterByCategory(filteredduration,category);
    return filteredcategory;
  }
    else if(filters[Object.keys(filters)[0]].length>0){
      let filteredduration=filterByDuration(list,low,high);
      return filteredduration;
    }
    else if(filters[Object.keys(filters)[1]].length>0){
      let filteredcategory=filterByCategory(list,category);
      return filteredcategory;
    }
    
  // Place holder for functionality to work in the Stubs
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let result=JSON.parse(window.localStorage.getItem('filters'));
  // Place holder for functionality to work in the Stubs
  return result;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
const parentelem=document.getElementById('category-list');

let duration=filters[Object.keys(filters)[0]];
let category=filters[Object.keys(filters)[1]];
for(let i=0;i<category.length;i++){
  const div=document.createElement('div')
div.className="category-filter";
  div.textContent=category[i];
  parentelem.append(div);
}
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
