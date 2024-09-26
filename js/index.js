let searchBar = document.querySelector(".form-container");
let searchWeatherBtn = document.querySelector(".search-btn");
let searchIconBtn = document.querySelector(".searchIconBtn");
let searchInput = document.getElementsByName("city");
let weatherDetailsContainer = document.querySelector(
  ".show-weather-details-container"
);
let weatherDetailsShowButton = document.querySelector(".weather-details-btn");
let loader = document.getElementById("loader");
let content = document.getElementById("content");

const API_KEY = "048fc2c7c8bf5c981a5c2c2477723c39";

const url = `https://api.openweathermap.org/data/2.5/weather?q=Nashik&appid=${API_KEY}&units=metric`;

function updateUrl() {
  return `https://api.openweathermap.org/data/2.5/weather?q=${searchInput[0].value}&appid=${API_KEY}&units=metric`;
}

// let url = `https://api.openweathermap.org/data/2.5/weather?q=Nashik&appid=${API_KEY}&units=metric`;

// function Loader() {
//   window.addEventListener("load", function () {
//

//     // Simulate loading time
//     setTimeout(function () {
//       loader.style.display = "none"; // Hide loader
//       content.classList.remove("hidden"); // Show content
//     }, 3000); // 3-second delay to simulate load
//   });
// }

weatherDetailsShowButton.addEventListener("click", async () => {
  loader.classList.remove("hidden");
  content.classList.add("hidden");
  try {
    const response = await axios.get(url);
    // console.log(searchInput[0].value);
    loader.classList.add("hidden");
    content.classList.remove("hidden");
    insertWeatherDetails(response);
  } catch (error) {
    console.log(error);
  }
});

searchIconBtn.addEventListener("click", async () => {
  loader.classList.remove("hidden");
  content.classList.add("hidden");
  try {
    if (searchInput[0].value === "") {
      alert("Enter city name");
    } else {
      const response = await axios.get(updateUrl());
      loader.classList.add("hidden");
      content.classList.remove("hidden");
      insertWeatherDetails(response); // Use the correct response object
    }
  } catch (error) {
    console.log("this is an error");
    console.log(error);
    if (error.response.data.message === "city not found") {
      alert("City Not Found");
    }
  }
});

function insertWeatherDetails(weatherDetails) {
  let cityName = document.querySelector(".city-name");
  let countryIcon = document.querySelector(".country-icon");
  let description = document.querySelector(".description");
  let weatherImg = document.querySelector(".weather-img");
  let temperature = document.querySelector(".temperature");
  let windspeed = document.querySelector(".windspeed");
  let humidity = document.querySelector(".humidity");
  let clouds = document.querySelector(".clouds");

  // insertion of data
  cityName.innerHTML = weatherDetails.data.name;
  countryIcon.src = `https://flagcdn.com/144x108/${weatherDetails.data.sys?.country.toLowerCase()}.png`;
  description.innerHTML = weatherDetails.data.weather[0].description;
  weatherImg.src = `https://openweathermap.org/img/w/${weatherDetails.data.weather[0].icon}.png`;
  temperature.innerHTML = weatherDetails.data.main.temp;
  windspeed.innerHTML = weatherDetails.data.wind.speed;
  humidity.innerHTML = weatherDetails.data.main.humidity;
  clouds.innerHTML = weatherDetails.data.clouds.all;
}
