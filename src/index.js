function updateWeather(response) {
  let temperatureElement = document.querySelector("#weather-app-temperature");
  let cityElement = document.querySelector("#weather-app-city");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
}

function searchCity(city) {
  let apiKey = "a8ef3f3t189785b5cbocc4f20b7a40e0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Brisbane");
