'use strict'

const apiKey = '2093ca02909677c3ebd944675cf48e98e29c8f5d'; 

let gameGUID = 0;

let nextList = 0;

function watchGameForm() {
  $('main').on('click', ' #gamePlatformSearch', function(event) {
    event.preventDefault();
    let gameInput = $('#gameSearch').val();
    findGUID(gameInput);
    console.log('called watchGameForm')
  });
}

function findGUID (gameInput) {
  $.ajax({
      type: 'get',
      url: `https://www.giantbomb.com/api/search/?api_key=${apiKey}&format=jsonp&query=${gameInput}&resources=game`,
      dataType: 'jsonp',
      jsonp: 'json_callback',
      success: function(data) {
        console.log(data);
        try {gameGUID = data.results[0].guid;}
        catch(err) {
          $('.resultsList').empty();
          $('.resultsList').append(`<p>Sorry, the game you are searching for cannot be found. Please try a different game.</p>`); return}
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
  $('.resultsList').empty();
  $('.resultsList').append(`<h2>${data.results.name} is available on:</h2>`);
  try {for (let i = 0; i < data.results.platforms.length; i++) {
    console.log(data.results.platforms[i]);
  $('.resultsList').append(`<li>${data.results.platforms[i].name}</li>`)}
  }
  catch(err) {
    $('.resultsList').append(`<p>Nothing. We have no idea what platforms you might be able to find this game on.  Try looking for a different game.</p>`)
  }

}

function watchPlatformForm() {
  $('main').on('click', ' #platformSearch', function(event) {
     event.preventDefault();
     let chosenPlatform = $('select#Platform').val();
     chosenPlatformName = $('#Platform option:selected').text();
     findGames(chosenPlatform);
     console.log('called watchPlatformForm')
   });
}

function findGames(chosenPlatform) {
  $.ajax({
      type: 'get',
      url: `https://www.giantbomb.com/api/games/?api_key=${apiKey}&format=jsonp&limit=5&platforms=${chosenPlatform}&offset=${nextList}&field_list=image,name`,
      dataType: 'jsonp',
      jsonp: 'json_callback',
      success: function(data) {
        console.log(data);        
        displayPlatformResults(data, chosenPlatformName);
      },
    });
}

function displayPlatformResults(data, chosenPlatformName) {
  $('.resultsList').empty();
  $('.resultsList').append(`<h2>Games Available on ${chosenPlatformName}</h2>`);
  for (let i = 0; i < data.results.length; i++) {
  $('.resultsList').append(`
  <li><img src = '${data.results[i].image.small_url}'>
  ${data.results[i].name}</li>`)}
  $('.resultsList').append(`<button type = 'button' class = 'more' value = 'See More Games!'>See More Games!</button>`);
  $('.resultsList').on('click', '.more', function(event) {
    nextList = nextList + 5;
    let chosenPlatform = $('select#Platform').val();
    findGames(chosenPlatform);})
}

function switchToPlatform() {
  $('main').on('click', '.platformPage', function(event) {
    console.log('called switchToPlatform')
    $('main').html(`
    <nav>
      <h1>Platformer</h1>
      <button type = 'button' class = 'gamePage'>Search By Game</button>
    </nav>
    <form>
        <label for = 'Platform'>Preferred Platform</label>
        <select id = 'Platform'>
          <option value = '94' label = 'Windows'>Windows</option>
          <option value = '17' label = 'Mac'>Mac</option>
          <option value = '152' label = 'Linux'>Linux</option>
          <option value = '146' label = 'PS4'>PS4</option>
          <option value = '123' label = 'Android'>Android</option>
          <option value = '96' label = 'IPhone'>IPhone</option>
          <option value = '145' label = 'XBox One'>XBox One</option>
          <option value = '157' label = 'Nintendo Switch'>Nintendo Switch</option>
          <option value = '117,138' label = 'Nintentdo 3DS'>Nintentdo 3DS</option>
          <option value = '35,88' label = 'PS3'>PS3</option>
          <option value = '20' label = 'XBox 360'>XBox 360</option>
          <option value = '18,116' label = 'PlayStation Portable'>PlayStation Portable</option>
          <option value = '129,143' label = 'PlayStation Vita'>PlayStation Vita</option>
          <option value = '52' label = 'Nintendo DS'>Nintendo DS</option>
          <option value = '36' label = 'Wii'>Wii</option>
          <option value = '139' label = 'Wii U'>Wii U</option>
          <option value = '176' label = 'PS5'>PS5</option>
          <option value = '177' label = 'Oculus Quest'>Oculus Quest</option>
          <option value = '179' label = 'Project Scarlett'>Project Scarlett</option>
        </select>
        <input type = 'submit' id = 'platformSearch' value = 'See Games!'>
      </form>
      <div class = 'resultsList'>
        <p>Select a platform to see games available on your chosen platform!</p>
      </div>
      <div class = 'userNotice'>
        <p>Don't see a platform you use?  Submit a request to have your platform added <a href = 'mailto:brittany.n.baird@gmail.com?subject=Platform%20Request'>here</a></p>
      </div>`)
  });
  
}

function switchToGame() {
  $('main').on('click', '.gamePage', function(event) {
    console.log('called switchToGame');
    $('main').html(`
    <nav>
        <h1>Platformer</h1>
        <button type = 'button' class = 'platformPage'>Search By Platform</button>
    </nav>
    <form>
        <label for = 'gameSearch'>Game</label>
        <input type = 'text' id = 'gameSearch' placeholder = 'Enter Name of Game Here'>
        <input type = 'submit' id = 'gamePlatformSearch' value = 'See Platforms!'>
      </form>
      <div class = 'resultsList'>
        <p>Search for a Game to see what platforms it is available on!</p>
      </div>`)
  })
}

function handlePage() {
  watchGameForm();
  watchPlatformForm();
  switchToPlatform();
  switchToGame();
}

$(handlePage);
