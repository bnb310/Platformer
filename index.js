'use strict';

const apiKey = '2093ca02909677c3ebd944675cf48e98e29c8f5d'; 

const gameURL = `https://www.giantbomb.com/api/games/?api_key=${apiKey}&format=jsonp`;

let gameGUID = 0;

let nextList = 0;

function findGUID(gameInput) {
  $.ajax({
      type: 'get',
      url: `https://www.giantbomb.com/api/games/?api_key=${apiKey}&format=jsonp&field_list=name,guid&offset=${nextList}`,
      dataType: 'jsonp',
      jsonp: 'json_callback',
      success: function(data) {
        console.log(data);
      for (let i = 0; i <= data.results.length; i++) {
        /*let returnedName = data.results[i].name;*/
      if (gameInput == data.results[i].name) {
        gameGUID = data.results[i].guid;
        $(findPlatforms(gameGUID));
        break;
      }
      /*else if (i = data.results.length) {
        nextList += 100;
        $(findGUID);
      }*/
    }
      },
    });

    /*https://stackoverflow.com/questions/3963906/problems-executing-a-jquery-ajax-call-within-a-function*/

    /*https://www.w3schools.com/jsref/jsref_break.asp*/
}

function findPlatforms(gameGUID) {
  $.ajax({
      type: 'get',
      url: `https://www.giantbomb.com/api/game/${gameGUID}/?api_key=${apiKey}&field_list=name,platforms&format=jsonp`,
      dataType: 'jsonp',
      jsonp: 'json_callback',
      success: function(data) {
        console.log(data);
        $(displayResults);
      },
    });
}

function displayResults(data) {
  $('.results').empty();
  for (let i = 0; i < data.results.platforms[i].length; i++)
  $('.results').append(`<li>${data.results.platforms[i]}</li>`)
}

function watchForm() {
   $('form').submit(event => {
     event.preventDefault();
     let gameInput = $('#gameSearch').val();
     findGUID(gameInput);
   });
}

$(watchForm);
