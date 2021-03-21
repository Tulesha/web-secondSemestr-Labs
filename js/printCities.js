const icons = "https://openweathermap.org/img/wn/"

function printMainCityWeather(data) {
  let headerCity = document.querySelector('.headerCity');
  headerCity.innerHTML = "";

  let template = document.querySelector('#templateMainCity');

  template.content.querySelector('h2').textContent = data.name;
  template.content.querySelector('.imgHeaderCity').src = `${icons}${data.weather[0]['icon']}@2x.png`;
  template.content.querySelector('.headerTempurature').innerHTML = `${Math.round(data.main.temp)}&#176;C`;

  let clone = document.importNode(template.content, true);
  headerCity.append(clone);

  let ul = document.querySelector('.headerInformation').querySelector('#contain');

  fillUl(ul, data);
}


function printOtherCityWeather(data, id) {
  let cities = document.querySelector('.cities');

  let template = document.querySelector('#templateOtherCity');

  template.content.querySelector('h4').textContent = data.name;
  template.content.querySelector('.temperatureInformation').innerHTML = `${Math.round(data.main.temp)}&#176;C`;
  template.content.querySelector('.imgCityWeather').src = `${icons}${data.weather[0]['icon']}@2x.png`;

  template.content.querySelector('.city').setAttribute("id", `${id}`);

  let ul = template.content.querySelector('#cityContain');

  fillUl(ul, data);


  let clone = document.importNode(template.content, true);
  cities.append(clone);
}


function fillUl(ul, data) {
  let params = ul.querySelectorAll('p');

  params[1].textContent = data.wind.speed + ' m/s';
  params[3].textContent = data.weather[0].description;
  params[5].textContent = data.main.pressure + 'hpa';
  params[7].textContent = data.main.humidity + '%';
  params[9].textContent = `[${data.coord.lat}, ${data.coord.lon}]`
}
