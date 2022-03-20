const serverURL = "http://localhost:8080";
const weatherURL = `${serverURL}/weather/city`;
const weatherCoordsURL = `${serverURL}/weather/coordinates`;
const favouritesURL = `${serverURL}/favourites`;

async function fetchCityByName(cityName) {
  let data = await fetch(`${weatherURL}?q=${cityName}`);
  if (data.status === 200) {
    return await data.json();
  }
  throw new Error(`Request is bad. Status ${data.status}`);
}

async function fetchCityByLocation(lat, lon) {
  let data = await fetch(`${weatherCoordsURL}?lat=${lat}&lon=${lon}`);
  if (data.status === 200) {
    return await data.json();
  }
  throw new Error(`Request is bad. Status ${data.status}`);
}

async function fetchGetFavourites() {
  let data = await fetch(favouritesURL);
  if (data.status === 200) {
    return data.json();
  }
  throw new Error(`Request is bad. Status ${data.status}`);
}

async function fetchAddCity(cityName) {
  let data = await fetch(`${favouritesURL}?q=${cityName}`, {method: "POST"});
  if (data.status === 201) {
    return await data.json();
  }

  if (data.status === 409) {
    return false;
  }
  throw new Error(`Request is bad. Status ${data.status}`);
}

async function fetchDeleteCity(cityName) {
  let data = await fetch (`${favouritesURL}?q=${cityName}`, {method: "DELETE"});

  if (data.status !== 204) {
    throw new Error(`Request is bad. Status ${data.status}. Reload your page`);
  }
}