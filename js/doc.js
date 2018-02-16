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
        console.log(response.data);
        let data = response.data;
        for(let i = 0; i < data.length; i++) {
          if(data[i].accepts_new_patients == true) {
            for(let k = 0; k < data[i].doctors.length; k++) {
              $('#symptoms').append(`<option value="">${data[i].doctors[k].profile.first_name} ${data[i].doctors[k].profile.last_name}</option>`);
            }

          }

        }

        },
        error: function() {
          $('#errors').text("There was an error retrieving symptoms. Please try again.");
        }
      });
    }

}
