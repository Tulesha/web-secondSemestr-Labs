function addCity() {
  if (document.querySelector('.addNewCity').value !== "") {

    let cityName = document.querySelector('.addNewCity').value;

    loadingCity();

    let onSuccess = (data) => {
      let keys = Object.keys(window.localStorage);

      for (const key of keys) {
        if (window.localStorage.getItem(key) === data.name) {
          alert("City already exist")
          document.getElementById("-1").remove();
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

      document.getElementById("-1").id = id;
      printOtherCityWeather(data, id);
    }

    let onFail = (e) => {
      document.getElementById("-1").remove();
      alert(e);
    }


    fetchCityByName(cityName).then(onSuccess).catch(onFail);

    document.querySelector('.addNewCity').value = "";
  }
}


function pressEnter() {
  document.querySelector('.addNewCity').addEventListener('keypress',
      function (e) {
        if (e.key === 'Enter' && document.querySelector('.addNewCity').value !== "") {
          addCity();
        }
      });
}
