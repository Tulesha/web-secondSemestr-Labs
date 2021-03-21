function addCity() {
  if (document.querySelector('.addNewCity').value !== "") {

    let cityName = document.querySelector('.addNewCity').value;

    let onSuccess = (data) => {
      let keys = Object.keys(window.localStorage);

      for (const key of keys) {
        if (window.localStorage.getItem(key) === data.name) {
          return;
        }
      }

      let id;

      if (window.localStorage.length === 0) {
        id = 0;
        window.localStorage.setItem(id, data.name);
      }
      else {
        id = Math.max.apply(null, keys) + 1;
        window.localStorage.setItem(id, data.name);
      }

      printOtherCityWeather(data, id);
    }

    let onFail = (e) => {
      console.log(e);
    }

    fetchCityByName(cityName).then(onSuccess).catch(onFail);

    document.querySelector('.addNewCity').value = "";
  }
}
