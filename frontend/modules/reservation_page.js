import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
try{
let response=await fetch(config.backendEndpoint+'/reservations');
let data=await response.json();
return data;
}catch(err){
  return null;
}
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
 let ele=document.getElementById('no-reservation-banner');
 let ele1=document.getElementById('reservation-table-parent');
 if(reservations.length==0){
   ele.style.display="block";
 }
 else{
  ele.style.display="none";
 }
if(reservations.length>0){
ele1.style.display="block";
let parentele=document.getElementById('reservation-table');
//let url=window.location.href;

for(let i=0;i<reservations.length;i++){
  //let finalurl=url.replace('/reservations','/detail/?adventure='+reservations[i].adventure)
  var date = new Date(reservations[i].date);
  var time=new Date(reservations[i].time);
  const options = {day: 'numeric',month: 'long',year: 'numeric',   };
  let createtable= document.createElement("tr");
  createtable.innerHTML = `
      <td>${reservations[i].id}</td>
      <td>${reservations[i].name}</td>
      <td>${reservations[i].adventureName}</td>
      <td>${reservations[i].person}</td>
      <td>${date.toLocaleDateString('en-IN')}</td>
      <td>${reservations[i].price}</td>
      <td>${time.toLocaleDateString('en-IN',options)+', '+time.toLocaleTimeString('en-IN')}</td>
      <td id=${reservations[i].id}><a href = /frontend/pages/adventures/detail/?adventure=${reservations[i].adventure}><button class='reservation-visit-button'>Visit Adventures</button></a></td>
      `;
      parentele.append(createtable);
}
console.log(parentele);
}
else{
  ele1.style.display="none";
}
}

export { fetchReservations, addReservationToTable };
