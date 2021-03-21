function getCurrentLocationWeather(pos) {
  let lat = pos.coords.latitude;
  let lon = pos.coords.longitude;

  let onSuccess = (data) => {
    printMainCityWeather(data);
  }

  let onFail = (e) => {
    console.log(e);
  }

  let data = fetchCityByLocation(lat, lon).then(onSuccess).catch(onFail);
}


function getDefaultLocationWeather() {
  let cityName = "Prague"

  let onSuccess = (data) => {
    printMainCityWeather(data);
  }

  let onFail = (e) => {
    console.log(e);
  }

  fetchCityByName(cityName).then(onSuccess).catch(onFail);
}


function updateGeo() {
  navigator.geolocation.getCurrentPosition(getCurrentLocationWeather, getDefaultLocationWeather)
}
