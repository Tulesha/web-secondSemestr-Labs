
window.onload = function () {
  buttonWidth();
  pressEnter();
  navigator.geolocation.getCurrentPosition(getCurrentLocationWeather, getDefaultLocationWeather);

  let keys = Object.keys(window.localStorage);

  for (let key of keys) {
    let cityName = window.localStorage.getItem(key)

    loadingCity();

    let onSuccess = (data) => {
      document.getElementById("-1").id = key;
      printOtherCityWeather(data, key);
    }

    let onFail = (e) => {
      alert(e);
      document.getElementById("-1").remove();
    }

    fetchCityByName(cityName).then(onSuccess).catch(onFail);
  }
}
