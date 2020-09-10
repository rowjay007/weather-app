const ICONIMAGE = document.querySelector(".container__icon");
const TEMPERATURE = document.querySelector(".container__value p");
const DESCRIPTION = document.querySelector(".container__description p");
const LOCATIONPAGE = document.querySelector(".container__location p");
const NOTIFICATIONPAGE = document.querySelector(".container__notification");

const weather = {};

weather.temperature = {
  unit: "celsius",
};

const KELVIN = 273;

const key = "daaa90d91256ca72733d110482fb3de7";

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  NOTIFICATIONPAGE.getElementsByClassName.display = "block";
  NOTIFICATIONPAGE.innerHTML = "<p>Browser Support Needed</p>";
}

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

function showError(error) {
  NOTIFICATIONPAGE.getElementsByClassName.display = "block";
  NOTIFICATIONPAGE.innerHTML = `<p>${error.message}</p>`;
}

function getWeather(latitude, longitude) {
  // const proxy = "https://cors-anywhere.herokuapp.com/";

  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;

      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(() => {
      displayWeather();
    });
}
function displayWeather() {
  ICONIMAGE.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  TEMPERATURE.innerHTML = `${weather.temperature.value}&deg<span>C</span>`;
  DESCRIPTION.innerHTML = weather.description;
  LOCATIONPAGE.innerHTML = `${weather.city}, ${weather.country}`;
}

function celsius(temperature) {
  return (temperature * 9) / 5 + 32;
}

TEMPERATURE.addEventListener("click", () => {
  if (weather.temperature.value === undefined) return;

  if (weather.temperature.unit == "celsius") {
    let fahrenheit = celsius(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);

    TEMPERATURE.innerHTML = `${fahrenheit}&deg<span>F</span>`;
    weather.temperature.unit = "fahrenheit";
  } else {
    TEMPERATURE.innerHTML = `${weather.temperature.value}&deg<span>C</span>`;
    weather.temperature.unit = "celsius";
  }
});

let cityArray = [];

localStorage.setItem("city", JSON.stringify(cityArray));
const cityData = JSON.parse(localStorage.getItem("city"));

cityArray.push(weather.temperature.value);
localStorage.setItem("city", JSON.stringify(cityArray));

cityArray = localStorage.getItem("city")
  ? JSON.parse(localStorage.getItem("city"))
  : [];
