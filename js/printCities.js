const icons = "https://openweathermap.org/img/wn/"

function printMainCityWeather(data) {
  let headerCity = document.querySelector('.headerCity');

  headerCity.querySelector('h2').textContent = data.name;
  headerCity.querySelector('.imgHeaderCity').src = `${icons}${data.weather[0]['icon']}@2x.png`;
  headerCity.querySelector('.headerTempurature').innerHTML = `${Math.round(data.main.temp)}&#176;C`;

  let ul = document.querySelector('.headerInformation').querySelector('#contain');

  fillUl(ul, data);
}


function printOtherCityWeather(data, city) {
  city.querySelector('h4').textContent = data.name;
  city.querySelector('.temperatureInformation').innerHTML = `${Math.round(data.main.temp)}&#176;C`;
  city.querySelector('.imgCityWeather').src = `${icons}${data.weather[0]['icon']}@2x.png`;

  let ul = city.querySelector('#cityContain');

  fillUl(ul, data);
}


function fillUl(ul, data) {
  let params = ul.querySelectorAll('p');

  params[1].textContent = data.wind.speed + ' m/s';
  params[3].textContent = data.weather[0].description;
  params[5].textContent = data.main.pressure + 'hpa';
  params[7].textContent = data.main.humidity + '%';
  params[9].textContent = `[${data.coord.lat}, ${data.coord.lon}]`
}
