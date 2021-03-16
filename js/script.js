const query = "https://api.openweathermap.org/data/2.5/weather?units=metric"
const appid = "81f0e34f60f0639d94b4e4c4ccd19abb"
const icons = "https://openweathermap.org/img/wn/"

window.onload = function () {
  navigator.geolocation.getCurrentPosition(getCurrentLocationWeather, getDefaultLocationWeather)
}

function getCurrentLocationWeather(pos) {
  let lat = pos.coords.latitude;
  let lon = pos.coords.longitude;

  let url = `${query}&appid=${appid}&lat=${lat}&lon=${lon}`;
  mainCityFetch (url);
}

function getDefaultLocationWeather() {
  alert('You will get weather by default city')

  let city = 'Prague';

  let url = `${query}&appid=${appid}&q=${city}`;
  mainCityFetch (url);
}

function mainCityFetch (url) {
  try {
    fetch(url)
    .then(function (resp) {return resp.json() })
    .then(function (data) {
      console.log(data);
      printMainCityWeather(data)
    })
  }
    catch (e) {
      alert(e);
    }
}

function printMainCityWeather(data) {
  document.querySelector('h2').textContent = data.name;
  document.querySelector('.headerTempurature').innerHTML = Math.round(data.main.temp) + '&#176;C';
  document.getElementById("imgHeaderCity").src = `${icons}${data.weather[0]['icon']}@2x.png`;

  let ul = document.getElementById("mainCityUl");
  fillUl(ul, data);
}

function fillUl(ul, data) {
  let wind = document.createElement("li");
  wind.innerHTML = `<p class="weatherInfo">Wind</p>\n` +
                   `<p class="weatherInfo">${data.wind.speed} m/s</p>\n`;
  ul.appendChild(wind);

  let cloudy = document.createElement("li");
  cloudy.innerHTML = `<p class="weatherInfo">Cloudy</p>\n` +
                     `<p class="weatherInfo">${data.weather[0]['description']}</p>\n`;
  ul.appendChild(cloudy);

  let pressure = document.createElement("li");
  pressure.innerHTML = `<p class="weatherInfo">Pressure</p>\n` +
                       `<p class="weatherInfo">${data.main.pressure} hpa</p>\n`;
  ul.appendChild(pressure)

  let humidity = document.createElement("li");
  humidity.innerHTML = `<p class="weatherInfo">Humidity</p>\n` +
                       `<p class="weatherInfo">${data.main.humidity} %</p>\n`;
  ul.appendChild(humidity)

  let coordinates = document.createElement("li");
  coordinates.innerHTML = `<p class="weatherInfo">Coordinates</p>\n` +
                       `<p class="weatherInfo">[${data.coord.lat}, ${data.coord.lon}]</p>\n`;
  ul.appendChild(coordinates)
}
