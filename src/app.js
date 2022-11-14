function formatDate(timestamp) {
  let date = new Date(timestamp);
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
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute}`;
}

function getForecast(coordinates) {
  let apiKey = "c143btabf6ob4a5faf5033a73eae142a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  fahrenheitTemperature = response.data.temperature.current;

  document.querySelector("#temperature").innerHTML = Math.round(
    fahrenheitTemperature
  );
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.time * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute("src", response.data.condition.icon_url);
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row d-flex justify-content-between">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-sm-2">
                <div class="forecast-date"> ${formatDay(
                  forecastDay.time
                )} </div>
                <img src="${forecastDay.condition.icon_url}" alt="${
          forecastDay.condition.icon
        }" />
                <span class="forecast-max">${Math.round(
                  forecastDay.temperature.maximum
                )}°</span>
                <span class="forecast-min">${Math.round(
                  forecastDay.temperature.minimum
                )}°</span>
                
              </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let apiKey = "c143btabf6ob4a5faf5033a73eae142a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  search(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitTemperature = null;

search("Dallas");
