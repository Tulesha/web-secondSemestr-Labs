function addCity() {
  if (document.querySelector('.addNewCity').value !== "") {

    let cityName = document.querySelector('.addNewCity').value;

    let city = loadingCity();

    let onSuccess = (data) => {
      if (data === false) {
        alert("City already exists")
        city.remove();
        return;
      }

      printOtherCityWeather(data, city);
    }

    let onFail = (e) => {
      alert(e);
      city.remove();
      return;
    }

    fetchAddCity(cityName).then(onSuccess).catch(onFail);

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
