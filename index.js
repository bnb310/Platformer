'use strict';

const apiKey = '2093ca02909677c3ebd944675cf48e98e29c8f5d'; 

const gameURL = `https://www.giantbomb.com/api/games/?api_key=${apiKey}&format=json`;

/*const platformURL = `https://www.giantbomb.com/api/games/?api_key=${apiKey}&filter=platforms:${userPlatform}`*/

/*const gamePlatform = `https://www.giantbomb.com/api/game/[guid]/?api_key=${apiKey}`;*/

function displayPlatforms(responseJson) {
console.log(responseJson);
for (let i = 0; i < responseJson.results.length; i++) {
  if (responseJson.results[i].name === gameInput)
    $('.results').html(`<h2>${responseJson.results[i].name}</h2>`);
    for (let a = 0; a < responseJson.results[i].platforms.length; a++) {
      $('.results').append(`<li>${responseJson.results[i].platforms[a].name}</li>`);
    }
}
}

function findPlatforms() {
  fetch(gameURL)
  .then(response => {
    if (response.ok) {
      return response.json();
    };
    throw new Error(response.statusText);
  })
  .then(responseJson => displayPlatforms(responseJson))
  .catch(err => {
    $('.results').html('<p>Something went wrong.  Please try again later</p>');
  });
}

function watchForm() {
   $('form').submit(event => {
     event.preventDefault();
     const gameInput = $('#gameSearch').val();
     findPlatforms();
   });
}

$(watchForm);