import { Doc } from './../js/doc.js';

$(document).ready(function(){
  let doc = new Doc();
  $('#searchPractice').submit(function(event) {
    event.preventDefault();
    let userSearch = $('#searchSpec').val();

    let response = doc.getPracticeDoc(userSearch);
    console.log(response.responseJSON.data);
    $('#docs').empty();
    let data = response.responseJSON.data;
    this.dataSize = data.length;

    if(data.length < 1) {
      $('#docs').html(`<h2>No Doctors for this search criteria in the Portland area was found</h2>`);
    } else {
      for(let i = 0; i < data.length; i++) {
        let website = "";
        if(data[i].practices[0].website != undefined) {
          website = `<a href="${data[i].practices[0].website}" target="_blank" class="btn btn-primary">${data[i].practices[0].website}</a>`;
        } else {}
        $('#docs').append(`
          <div class="card">
          <div class="card-body">
          <div class="media">
          <img class="mr-3" src="${data[i].profile.image_url}" alt="Card image cap">
          <div class="media-body">
          <h5 class="card-title">${data[i].profile.first_name} ${data[i].profile.last_name}</h5>
          <p class="accepts">Accepting Patients: <span class="badge badge-success">${data[i].practices[0].accepts_new_patients}</span></p>
          <p class="address">Address: <br>${data[i].practices[0].visit_address.street}<br>${data[i].practices[0].visit_address.zip} ${data[i].practices[0].visit_address.city}, ${data[i].practices[0].visit_address.state}</p>
          </div>
          </div>
          <p class="card-text">Contact Number: ${data[i].practices[0].phones[0].number}</p>
          <p class="card-text">${data[i].profile.bio}</p>
          ${website}
          </div>
          </div>`);
        }
      }


  });
  $('#searchDoc').submit(function(event) {
    event.preventDefault();
    let userSearch = $('#searchName').val();
    let response = doc.getNameDoc(userSearch);
    $('#docs').empty();
    let data = response.responseJSON.data;
    console.log(data);
    this.dataSize = data.length;
    if(data.length < 1) {
      $('#docs').html(`<h2>No Doctors for this search criteria in the Portland area was found</h2>`);
    } else {
      for(let i = 0; i < data.length; i++) {
        let website = "";
        if(data[i].practices[0].website != undefined) {
          website = `<a href="${data[i].practices[0].website}" target="_blank" class="btn btn-primary">${data[i].practices[0].website}</a>`;
        } else {}
        $('#docs').append(`
          <div class="card">
            <div class="card-body">
              <div class="media">
                <img class="mr-3" src="${data[i].profile.image_url}" alt="Card image cap">
                <div class="media-body">
                  <h5 class="card-title">${data[i].profile.first_name} ${data[i].profile.last_name}</h5>
                  <p class="accepts">Accepting Patients: <span class="badge badge-success">${data[i].practices[0].accepts_new_patients}</span></p>
                  <p class="address">Address: <br>${data[i].practices[0].visit_address.street}<br>${data[i].practices[0].visit_address.zip} ${data[i].practices[0].visit_address.city}, ${data[i].practices[0].visit_address.state}</p>
                </div>
              </div>
              <p class="card-text">${data[i].profile.bio}</p>
              ${website}
            </div>
          </div>`);
      }
    }

  });

});
