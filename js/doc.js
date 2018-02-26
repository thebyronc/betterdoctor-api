import { apiKey } from './../.env';
export class Doc {
  constructor() {
    this.state = 'or-portland';
    this.dataSize;
  }

  getPracticeDoc(userSearch) {
    let data = $.ajax({
      url: `https://api.betterdoctor.com/2016-03-01/doctors?query=${userSearch}&location=${this.state}&skip=0&limit=25&user_key=${apiKey}`,
      type: 'GET',
      async: false,
      data: {
        format: 'json'
      },
      success: function(response) {
        let data = response.data;
        },
        error: function() {
          $('#docs').text("There was an error retrieving information. Please try again.");
      }
    });
    return data;
  }

  getNameDoc(userName) {
    let data = $.ajax({
      url: `https://api.betterdoctor.com/2016-03-01/doctors?name=${userName}&location=${this.state}&skip=0&limit=20&user_key=${apiKey}`,
      type: 'GET',
      async: false,
      data: {
        format: 'json'
      },
      success: function(response, jqXHR, status) {
        console.log(status);
      },
      error: function() {
        $('#docs').text("There was an error retrieving information. Please try again.");
      }
    });
    return data;
  }
}
