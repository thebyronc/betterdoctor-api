import { Doc } from './../js/doc.js';

$(document).ready(function(){
  let doc = new Doc();
  $('#searchPractice').submit(function(event) {
    event.preventDefault();
    let userSearch = $('#searchSpec').val();
    doc.getPracticeDoc(userSearch);
  });


});
