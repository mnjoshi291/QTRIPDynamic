import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  return params.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let url=config.backendEndpoint+('/adventures/detail/?adventure='+adventureId);
    let response=await fetch(url);
    let data=await response.json();
    return data;
  }
    catch(err){
      return null;
    }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
try{
let parentname=document.getElementById('adventure-name');
let parentsubtitle=document.getElementById('adventure-subtitle');
let parentphoto=document.getElementById('photo-gallery');
let parentcontent=document.getElementById('adventure-content');
parentname.textContent=adventure.name;
parentsubtitle.textContent=adventure.subtitle;
for(let i=0;i<adventure.images.length;i++){
  let creatediv=document.createElement('div');
  creatediv.innerHTML=`<img class="activity-card-image"src="${adventure.images[i]}" />`;
 parentphoto.append(creatediv);
}
parentcontent.textContent=adventure.content;
}
catch(e){
  return Error(e);
}
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  try{
    let parentphoto=document.getElementById('photo-gallery');
    parentphoto.innerHTML=`<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
    <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
    `;
    let creatediv=document.createElement('div');
    creatediv.className="carousel-inner";
    for(let i=0;i<images.length;i++){
      let imgdiv=document.createElement('div');
      if(i==0){
        imgdiv.className="carousel-item active";
      }
     else{
       imgdiv.className="carousel-item";
     }
     imgdiv.innerHTML=`<img class="d-block w-100" src="${images[i]}">`
     creatediv.append(imgdiv);
    }
    console.log(creatediv);
    let idelem=document.getElementById('carouselExampleControls');
    idelem.appendChild(creatediv);
    idelem.innerHTML+=`<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>`;
    console.log(parentphoto);
    }
  catch(e){
    return Error(e);
  }
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let sold=document.getElementById('reservation-panel-sold-out');
  let reserve=document.getElementById('reservation-panel-available');
  let cost=document.getElementById('reservation-person-cost');
  if(adventure.available==true){
    sold.hidden=true;
    cost.innerHTML=adventure.costPerHead;
    reserve.style.display="block";
    sold.style.display="none";
  }
  else{
    reserve.hidden=true;
    sold.style.display="block";
    reserve.style.display="none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let cost=adventure.costPerHead;
  let result= cost*persons;
  let ele=document.getElementById('reservation-cost');
  ele.innerHTML=result;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
let paretele=document.getElementById('myForm');
paretele.addEventListener('submit',(event)=>{
  event.preventDefault();
  const name=paretele.elements['name'];
  const date=paretele.elements['date'];
  const person=paretele.elements['person'];
  const adventureid=adventure.id; 
  const final = {
    "name": name.value,
    "date": date.value,   
    "person": person.value,
    "adventure":adventureid
  };
  const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(final),
      };
  fetch(config.backendEndpoint+'/reservations/new',options)
  .then(data=>{
    if(data.ok){
      alert("SUCEES");
      window.location.reload();
    }
    else{
      alert("FAILED");
    }
  })
})
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
let parentele=document.getElementById('reserved-banner');
if(adventure.reserved==true){
  parentele.style.display="block";
  alert("SUCEES");
}
else{
  parentele.style.display="none";
  alert("FAILED");
}
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
