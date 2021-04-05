window.onload = function () {
  buttonWidth();
  pressEnter();
  navigator.geolocation.getCurrentPosition(getCurrentLocationWeather, getDefaultLocationWeather);

  let onSuccess = (data) => {
    for (let cityName of data.favouriteCities) {
      let city = loadingCity();

      let onSuccessFetch = (data) => {
        printOtherCityWeather(data, city);
      }
      
      let onFailFetch = (e) => {
        alert(e);
        city.remove();
        return;
      }

      fetchCityByName(cityName).then(onSuccessFetch).catch(onFailFetch);
    }
  }
  
  let onFail = (e) => {
    alert(e);
  }

  fetchGetFavourites().then(onSuccess).catch(onFail);
}
