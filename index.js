'use strict';

const apiKey = '2093ca02909677c3ebd944675cf48e98e29c8f5d'; 

let gameGUID = 0;

function findGUID (gameInput) {
  $.ajax({
      type: 'get',
      url: `https://www.giantbomb.com/api/search/?api_key=${apiKey}&format=jsonp&query=${gameInput}&resources=game`,
      dataType: 'jsonp',
      jsonp: 'json_callback',
      success: function(data) {
        console.log(data);
        gameGUID = data.results[0].guid;
        findPlatforms(gameGUID);
      },
    });
}


function findPlatforms(gameGUID) {
  $.ajax({
      type: 'get',
      url: `https://www.giantbomb.com/api/game/${gameGUID}/?api_key=${apiKey}&field_list=name,platforms&format=jsonp`,
      dataType: 'jsonp',
      jsonp: 'json_callback',
      success: function(data) {
        console.log(data);
        displayResults(data);
      },
    });
}

function displayResults(data) {
  $('.results').empty();
  $('.results').append(`<h2>${data.results.name} is available on:</h2>`);
  for (let i = 0; i < data.results.platforms.length; i++) {
    console.log(data.results.platforms[i]);
  $('.results').append(`<li>${data.results.platforms[i].name}</li>`)}
}

function watchForm() {
   $('form').submit(event => {
     event.preventDefault();
     let gameInput = $('#gameSearch').val();
     findGUID(gameInput);
   });
}

$(watchForm);
