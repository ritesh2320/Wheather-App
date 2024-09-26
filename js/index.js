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
let grantAccessBtn = document.querySelector(".grantAccessBtn");
let grantAccessContainer = document.querySelector(".grant-location-container");

const API_KEY = "048fc2c7c8bf5c981a5c2c2477723c39";

// const url = `https://api.openweathermap.org/data/2.5/weather?q=Nashik&appid=${API_KEY}&units=metric`;

function updateUrl() {
  return `https://api.openweathermap.org/data/2.5/weather?q=${searchInput[0].value}&appid=${API_KEY}&units=metric`;
}

weatherDetailsShowButton.addEventListener("click", async () => {
  loader.classList.remove("hidden");
  content.classList.add("hidden");
  searchWeatherBtn.classList.remove("bg-gray-200");
  searchWeatherBtn.classList.remove("ring-1");
  weatherDetailsShowButton.classList.add("bg-gray-200");
  weatherDetailsShowButton.classList.add("ring-1");
  searchBar.classList.add("hidden");
  try {
    // const response = await axios.get(url);
    // // console.log(searchInput[0].value);
    // loader.classList.add("hidden");
    // content.classList.remove("hidden");
    // insertWeatherDetails(response);
    getLocation();
  } catch (error) {
    console.log(error);
  }
});

searchWeatherBtn.addEventListener("click", () => {
  // styles
  searchWeatherBtn.classList.add("bg-gray-200");
  searchWeatherBtn.classList.add("ring-1");
  weatherDetailsShowButton.classList.remove("bg-gray-200");
  weatherDetailsShowButton.classList.remove("ring-1");

  // logic
  searchBar.classList.remove("hidden");
  content.classList.add("hidden");
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

async function getUserWeatherInfo(coordinates) {
  const { latitude, longitude } = coordinates;

  let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

  //Now make grantAccessContainer Invisible from screen
  grantAccessContainer.classList.add("hidden");

  //Make Loader  visible
  loader.classList.remove("hidden");

  try {
    const response = await axios.get(URL);
    loader.classList.add("hidden");
    content.classList.remove("hidden");
    insertWeatherDetails(response);
  } catch (err) {
    // loader.classList.add("hidden");
    console.log("Error Found : ", err);
    //Remaining
    console.log("your location is not avialable");
  }
}

// access the co-ordinates from location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("No Geolocation Support Available");
  }
}

function showPosition(position) {
  const userCoordinates = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };

  //Store this into session storage as "user-coordinates"
  sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
  getUserWeatherInfo(userCoordinates);
}

grantAccessBtn.addEventListener("click", getLocation());

// insert the data
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
