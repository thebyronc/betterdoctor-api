import { apiKey } from './../.env';
export class Doc {
  constructor() {
    this.state = 'or-portland';
    this.dataSize;
  }
  getPracticeDoc(userSearch) {
    $.ajax({
      url: `https://api.betterdoctor.com/2016-03-01/practices?name=${userSearch}&location=${this.state}&skip=0&limit=10&user_key=${apiKey}`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        $('#docs').empty();
        let data = response.data;
        this.dataSize = data.length;
        console.log(data);
        if(data.length < 1) {
          $('#docs').html(`<h2>No Doctors for this search criteria in the Portland area was found</h2>`);
        } else {
          for(let i = 0; i < data.length; i++) {
            for(let k = 0; k < data[i].doctors.length; k++) {
              $('#docs').append(`
              <div class="card">
                <div class="card-body">
                  <div class="media">
                    <img class="mr-3" src="${data[i].doctors[k].profile.image_url}" alt="Card image cap">
                    <div class="media-body">
                      <h5 class="card-title">${data[i].doctors[k].profile.first_name} ${data[i].doctors[k].profile.last_name}</h5>
                      <p class="accepts">Accepting Patients: <span class="badge badge-success">${data[i].accepts_new_patients}</span></p>
                      <p class="address">Address: <br>${data[i].visit_address.street}<br>${data[i].visit_address.zip} ${data[i].visit_address.city}, ${data[i].visit_address.state}</p>
                    </div>
                  </div>
                  <p class="card-text">${data[i].doctors[k].profile.bio}</p>
                  <p class="card-text">Contact Number: ${data[i].phones[1].number}</p>
                </div>
              </div>
              `);
            }
          }
        }


        },
        error: function() {
          $('#docs').text("There was an error retrieving information. Please try again.");
        }
      });
    }

    getNameDoc(userName) {
      $.ajax({
        url: `https://api.betterdoctor.com/2016-03-01/doctors?name=${userName}&location=${this.state}&skip=0&limit=20&user_key=${apiKey}`,
        type: 'GET',
        data: {
          format: 'json'
        },
        success: function(response, jqXHR, status) {
          console.log(status);
          $('#docs').empty();
          let data = response.data;
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
        },
          error: function() {
            $('#docs').text("There was an error retrieving information. Please try again.");
          }
        });
      }

}
