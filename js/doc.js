import { apiKey } from './../.env';
export class Doc {
  constructor() {
    this.state = 'or-portland';
    this.search = 'obgyn';

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
        console.log(data);
        if(data.length < 1) {
          $('#docs').html(`<h2>No Doctors for this search criteria in the Portland area found</h2>`);
        } else {
          for(let i = 0; i < data.length; i++) {
            for(let k = 0; k < data[i].doctors.length; k++) {
              $('#docs').append(`
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col col-md-3">
                        <img class="card-img-top" src="${data[i].doctors[k].profile.image_url}" alt="Card image cap">
                    </div>
                    <div class="col col-md-9">
                        <h5 class="card-title">${data[i].doctors[k].profile.first_name} ${data[i].doctors[k].profile.last_name}</h5>
                        <p class="accepts">Accepting Patients: <span class="badge badge-success">${data[i].accepts_new_patients}</span></p>
                        <p class="address">Address: <br>${data[i].visit_address.street}<br>${data[i].visit_address.zip} ${data[i].visit_address.city}, ${data[i].visit_address.state}</p>
                      </div>
                  </div>
                  <p class="card-text">${data[i].doctors[k].profile.bio}</p>
                </div>
              </div>
              `);
            }
          }
        }


        },
        error: function() {
          $('#errors').text("There was an error retrieving symptoms. Please try again.");
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
          let data = response.data;
          for(let i = 0; i < data.length; i++) {
            $('#docs').append(`
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col col-md-3">
                        <img class="card-img-top" src="${data[i].profile.image_url}" alt="Card image cap">
                    </div>
                    <div class="col col-md-9">
                        <h5 class="card-title">${data[i].profile.first_name} ${data[i].profile.last_name}</h5>
                        <p class="accepts">Accepting Patients: <span class="badge badge-success">${data[i].practices[0].accepts_new_patients}</span></p>
                        <p class="address">Address: <br>${data[i].practices[0].visit_address.street}<br>${data[i].practices[0].visit_address.zip} ${data[i].practices[0].visit_address.city}, ${data[i].practices[0].visit_address.state}</p>
                      </div>
                  </div>
                  <p class="card-text">${data[i].profile.bio}</p>
                  <a href="${data[i].practices[0].website}" target="_top" class="btn btn-primary">${data[i].practices[0].website}</a>
                </div>
              </div>`);
          }

          },
          error: function() {
            $('#errors').text("There was an error retrieving symptoms. Please try again.");
          }
        });
      }

}
