const query = "https://api.openweathermap.org/data/2.5/weather?units=metric"
const appid = "81f0e34f60f0639d94b4e4c4ccd19abb"
const icons = "https://openweathermap.org/img/wn/"

window.onload = function () {
  navigator.geolocation.getCurrentPosition(getCurrentLocationWeather, getDefaultLocationWeather)

  let keys = Object.keys(window.localStorage);
  keys.sort()

  for (const key of keys) {
    otherCityStorageFetch(`${query}&appid=${appid}&q=${window.localStorage.getItem(key)}`);
  }
}

// Получение текущих координат
function getCurrentLocationWeather(pos) {
  let lat = pos.coords.latitude;
  let lon = pos.coords.longitude;

  let url = `${query}&appid=${appid}&lat=${lat}&lon=${lon}`;
  mainCityFetch (url);
}

// Дефолтные координаты
function getDefaultLocationWeather() {
  let city = 'Prague';

  let url = `${query}&appid=${appid}&q=${city}`;
  mainCityFetch (url);
}

// Запрос на основной город
function mainCityFetch (url) {
  fetch(url)
  .then(function (resp) {return resp.json() })
  .then(function (data) {
    if (data.message === "city not found" || data.message === "Nothing to geocode") {
      return;
    }
    else {
      printMainCityWeather(data)
    }
  })
}

// Запрос на добавление города из хранилища
function otherCityStorageFetch (url) {
  fetch(url)
  .then(function (resp) {return resp.json() })
  .then(function (data) {
    if (data.message === "city not found" || data.message === "Nothing to geocode") {
      return;
    }
    else {
      let cities = document.querySelector('.cities');
      let city = document.createElement("div");
      city.setAttribute("class", "city");

      city.innerHTML = "<p>Loading...</p>"

      cities.appendChild(city)

      printCityFromStorage(data, cities, city)
    }
  })
}

// Запрос на добавление дополнительного город
function otherCityAddFetch () {
  fetch(`${query}&appid=${appid}&q=${document.querySelector('.addNewCity').value}`)
  .then(function (resp) {return resp.json() })
  .then(function (data) {
    if (data.message === "city not found" || data.message === "Nothing to geocode") {
      return;
    }
    else {
      let cities = document.querySelector('.cities');
      let city = document.createElement("div");
      city.setAttribute("class", "city");

      city.innerHTML = "<p>Loading...</p>"

      cities.appendChild(city)


      printOtherAddCityWeather(data, cities, city);
    }
  })
}



// Вывод основного города
function printMainCityWeather(data) {
  let headerCity = document.querySelector('.headerCity');
  headerCity.innerHTML = "";

  let cityName = document.createElement("h2");
  cityName.textContent = data.name;
  headerCity.appendChild(cityName);

  let headerCityChild = document.createElement("div");
  headerCityChild.setAttribute("class", "headerCityChild");
  headerCityChild.innerHTML = `<img src="${icons}${data.weather[0]['icon']}@2x.png" class="imgHeaderCity">\n` +
                              `<p class="headerTempurature">${Math.round(data.main.temp) + '&#176;C'}</p>\n`;
  headerCity.appendChild(headerCityChild)


  let headerInformation = document.querySelector(".headerInformation");
  headerInformation.innerHTML = "";
  let ul = document.createElement("ul");
  headerInformation.appendChild(ul);
  fillUl(ul, data);
}

// Вывод дополнительного города
function printOtherAddCityWeather(data, cities, city) {
  let keys = Object.keys(window.localStorage);

  for (const key of keys) {
    if (window.localStorage.getItem(key) === data.name) {
      city.remove()
      return
    }
  }

  document.querySelector('.addNewCity').value = "";

  city.innerHTML = "";

  let cityInformation = document.createElement("div");
  cityInformation.setAttribute("class", "cityInformation");

  cityInformation.innerHTML = `<h4>${data.name}</h4>\n` +
                                `<p class="temperatureInformation">${Math.round(data.main.temp) + '&#176;C'}</p>\n` +
                                `<img src="${icons}${data.weather[0]['icon']}@2x.png" class="imgCityWeather">\n` +
                                `<button type="submit" class="round" onclick="deleteCity(this)">×</button>`;
  city.appendChild(cityInformation);

  let ul = document.createElement("ul");
  city.appendChild(ul);
  fillUl(ul, data);

  if (window.localStorage.length === 0) {
    window.localStorage.setItem(0, data.name);

  }
  else {
    window.localStorage.setItem(Math.max.apply(null, keys) + 1, data.name);
  }
}

// Вывод доп города из хранилища
function printCityFromStorage(data, cities, city) {

  city.innerHTML = "";

  let cityInformation = document.createElement("div");
  cityInformation.setAttribute("class", "cityInformation");

  cityInformation.innerHTML = `<h4>${data.name}</h4>\n` +
                                `<p class="temperatureInformation">${Math.round(data.main.temp) + '&#176;C'}</p>\n` +
                                `<img src="${icons}${data.weather[0]['icon']}@2x.png" class="imgCityWeather">\n` +
                                `<button type="submit" class="round" onclick="deleteCity(this)">×</button>`;
  city.appendChild(cityInformation);

  let ul = document.createElement("ul");
  city.appendChild(ul);
  fillUl(ul, data);
}

// Заполнение ul
function fillUl(ul, data) {
  let wind = document.createElement("li");
  wind.innerHTML = `<p class="weatherInfo">Wind</p>\n` +
                     `<p class="weatherInfo">${data.wind.speed} m/s</p>\n`;
  ul.appendChild(wind);

  let cloudy = document.createElement("li");
  cloudy.innerHTML = `<p class="weatherInfo">Cloudy</p>\n` +
                       `<p class="weatherInfo">${data.weather[0]['description']}</p>\n`;
  ul.appendChild(cloudy);

  let pressure = document.createElement("li");
  pressure.innerHTML = `<p class="weatherInfo">Pressure</p>\n` +
                         `<p class="weatherInfo">${data.main.pressure} hpa</p>\n`;
  ul.appendChild(pressure)

  let humidity = document.createElement("li");
  humidity.innerHTML = `<p class="weatherInfo">Humidity</p>\n` +
                         `<p class="weatherInfo">${data.main.humidity} %</p>\n`;
  ul.appendChild(humidity)

  let coordinates = document.createElement("li");
  coordinates.innerHTML = `<p class="weatherInfo">Coordinates</p>\n` +
                         `<p class="weatherInfo">[${data.coord.lat}, ${data.coord.lon}]</p>\n`;
  ul.appendChild(coordinates)
}

// Обработка Refresh
function updateGeo() {
  document.querySelector('.headerCity').innerHTML = "<p>Loading...</p>";
  document.querySelector('.headerInformation').innerHTML = "<p>Loading...</p>";
  navigator.geolocation.getCurrentPosition(getCurrentLocationWeather, getDefaultLocationWeather)
}

// Обработка delete
function deleteCity(obj) {
  let cityName = obj.parentElement.firstChild.textContent

  let keys = Object.keys(window.localStorage);

  for (const key of keys) {
    if (window.localStorage.getItem(key) === cityName) {
      window.localStorage.removeItem(key);
      obj.parentElement.parentElement.remove();
      return
    }
  }
}


function buttonWidth(){
  if (document.documentElement.clientWidth < 768) {
    document.getElementById("refresh").innerHTML = "<img src='images/icon-set/refresh.png' class='refreshButtonImg'>"
  }
  else {
    document.getElementById("refresh").innerHTML = "Refresh"
  }
}
