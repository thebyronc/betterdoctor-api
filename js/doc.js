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
        $('#symptoms').empty();
        console.log(response.data);
        let data = response.data;
        for(let i = 0; i < data.length; i++) {
          if(data[i].accepts_new_patients == true) {
            for(let k = 0; k < data[i].doctors.length; k++) {
              $('#docs').append(`<option value="">${data[i].doctors[k].profile.first_name} ${data[i].doctors[k].profile.last_name}</option>`);
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
            $('#docs').append(`<ul>
              <li>${data[i].profile.first_name} ${data[i].profile.last_name}</li>
              <li>${data[i].profile.image_url}</li>
              <li>${data[i].profile.bio}</li>
              <li>${data[i].practices[0].website}</li>
              <li>${data[i].practices[0].accepts_new_patients}</li>
              <li>${data[i].practices[0].visit_address.city} <br> ${data[i].practices[0].visit_address.state}<br> ${data[i].practices[0].visit_address.street}<br> ${data[i].practices[0].visit_address.zip}</li>
              </ul>`);
          }

          },
          error: function() {
            $('#errors').text("There was an error retrieving symptoms. Please try again.");
          }
        });
      }

}
