const appid = "81f0e34f60f0639d94b4e4c4ccd19abb"
const query = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${appid}&`


async function fetchCity(suff) {
  let url = `${query}${suff}`;
  let data = await fetch(url, {
    "method": "GET",
  });
  if (data.status === 200){
    return await data.json();
  }
  throw new Error(`Request is bad. Status ${data.status}`);
}

async function fetchCityByName(cityName) {
  return fetchCity(`q=${cityName}`);
}

async function fetchCityByLocation(lat, lon) {
  return fetchCity(`lat=${lat}&lon=${lon}`);
}
