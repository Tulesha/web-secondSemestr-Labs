
window.onload = function () {
  buttonWidth();
  navigator.geolocation.getCurrentPosition(getCurrentLocationWeather, getDefaultLocationWeather);

  let keys = Object.keys(window.localStorage);

  for (let key of keys) {
    let cityName = window.localStorage.getItem(key)

    let onSuccess = (data) => {
      printOtherCityWeather(data, key);
    }

    let onFail = (e) => {
      console.log(e);
    }

    fetchCityByName(cityName).then(onSuccess).catch(onFail);
  }
}
