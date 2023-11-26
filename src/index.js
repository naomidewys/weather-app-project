function updateWeather(response) {
  let temperatureElement = document.querySelector("#weather-app-temperature");
  let cityElement = document.querySelector("#weather-app-city");
  let conditionElement = document.querySelector("#weather-condition");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#weather-app-icon");

  celsiusTemperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = celsiusTemperature;
  cityElement.innerHTML = response.data.city;
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${Math.round(
    response.data.temperature.humidity
  )}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let todayDate = date.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${todayDate} ${month} ∘ ${hours}:${minutes}`;
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#weather-app-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = fahrenheitTemperature;
}

function displayCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#weather-app-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "a8ef3f3t189785b5cbocc4f20b7a40e0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index >= 1 && index < 6) {
      forecastHtml =
        forecastHtml +
        `
<div class="weather-forecast-day">
<div class="weather-forecast-date">${formatDay(day.time)}</div>
<img src="${day.condition.icon_url}" class="forecast-icon"/>
<div class="weather-forecast-temperature">
<span class="weather-forecast-minimum">${Math.round(
          day.temperature.minimum
        )}°</span> / 
<span class="weather-forecast-maximum">${Math.round(
          day.temperature.maximum
        )}°</span>
</div>
</div>
`;
    }

    let minTemp = document.querySelector("#today-minimum");
    let maxTemp = document.querySelector("#today-maximum");

    minTemp.innerHTML = `${Math.round(day.temperature.minimum)}°`;
    maxTemp.innerHTML = `${Math.round(day.temperature.maximum)}°`;
  });

  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Brisbane");
