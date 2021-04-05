let onSuccess = (data) => {
  printMainCityWeather(data);
}

let onFail = (e) => {
  alert(e);
}


function getCurrentLocationWeather(pos) {
  let lat = pos.coords.latitude;
  let lon = pos.coords.longitude;

  fetchCityByLocation(lat, lon).then(onSuccess).catch(onFail);
}


function getDefaultLocationWeather() {
  let cityName = "Prague"
  fetchCityByName(cityName).then(onSuccess).catch(onFail);
}


function updateGeo() {
  navigator.geolocation.getCurrentPosition(getCurrentLocationWeather, getDefaultLocationWeather)

  let headerCity = document.querySelector('.headerCity');

  headerCity.querySelector('h2').textContent = 'Loading...';
  headerCity.querySelector('.imgHeaderCity').src = `images/icon-set/refresh.png`;
  headerCity.querySelector('.headerTempurature').innerHTML = `...`;

  let ul = document.querySelector('.headerInformation').querySelector('#contain');

  let params = ul.querySelectorAll('p');

  params[1].textContent = '...';
  params[3].textContent = '...';
  params[5].textContent = '...';
  params[7].textContent = '...';
  params[9].textContent = '...';
}
