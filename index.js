function getLocalTime(sec) {
  var date = new Date(sec * 1000);
  var options = { hour: 'numeric', minute: 'numeric' };
  return date.toLocaleTimeString('en-US', options).toLowerCase();
}

function formatWeather(weatherData) {
  var name = weatherData.name;
  var country = weatherData.sys.country;
  var weather = weatherData.weather[0].description;
  var temp = weatherData.main.temp;
  var feelsLike = weatherData.main.feels_like;
  var windSpeed = weatherData.wind.speed;
  var localTime = getLocalTime(weatherData.dt);
  var lat = weatherData.coord.lat;
  var lon = weatherData.coord.lon;
  var icon = weatherData.weather[0].icon;

  return (
    '<h2>' + name + ', ' + country + '</h2>' +
    '<p>Local Time: ' + localTime + '</p>' +
    '<p>Temperature: ' + temp + '&deg;F (Feels like ' + feelsLike + '&deg;F)</p>' +
    '<p>Weather: ' + weather + '</p>' +
    '<p>Wind Speed: ' + windSpeed + ' m/s</p>' +
    '<p>Coordinates: (' + lat + ', ' + lon + ')</p>' +
    '<p>Map: <a href="https://www.google.com/maps/search/?api=1&query=' + lat + ',' + lon + '" target="_blank">Click to view map</a></p>' +
    '<img src="https://openweathermap.org/img/wn/' + icon + '@2x.png" alt="Weather icon">'
  );
}

function handleWeatherSearch(event) {
  event.preventDefault();

  var query = document.querySelector('#weather-search').value.trim();
  var weatherDiv = document.querySelector('#weather');

  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=imperial&appid=786b7802dbc6511e00351083ed25303e')
    .then(function(response) {
      return response.json();
    })
    .then(function(weatherData) {
      if (weatherData.cod !== 200) {
        weatherDiv.innerHTML = '<p>Location not found</p>';
      } else {
        weatherDiv.innerHTML = formatWeather(weatherData);
      }
    })
    .catch(function(error) {
      console.error('Error fetching weather data:', error);
      weatherDiv.innerHTML = '<p>Failed to fetch weather data</p>';
    });

  document.querySelector('#weather-search').value = '';
}

var weatherForm = document.querySelector('#weather-app form');
weatherForm.addEventListener('submit', handleWeatherSearch);
