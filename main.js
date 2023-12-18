import { getWeather } from "./useAxios.js";

let button = document.getElementById("btn");
let img = document.getElementById("img");
let input = document.getElementById("city");
let windSpeed = document.getElementById("wind");
let humidity = document.getElementById("humidity");
let temp = document.getElementById("temp");
let cityName = document.getElementById("cityName");
let middleDiv = document.getElementsByClassName("middle");
let bottmDiv = document.getElementsByClassName("bottom");
let onError = document.getElementById("error");

//setting up local storage to store the last input
let prevInput = localStorage.getItem("prevInput");

if (prevInput) {
  console.log(prevInput);
} else {
  localStorage.setItem("prevInput", "Delhi");
  prevInput = "Delhi";
}

//to delete the prevInput from local storage
// localStorage.removeItem('prevInput');

//capitalize city names
let capitalize = (city) => {
  return city[0].toUpperCase() + city.slice(1);
};

//function to display data
let displayData = (path, humid, speed, temperature, city) => {
  console.log(path);
  img.src = path;
  windSpeed.innerHTML = speed;
  humidity.innerHTML = humid;
  temp.innerHTML = Math.round(temperature);
  cityName.innerHTML = capitalize(city);
  input.value = city;
};

//retreiving data and calling displayData
let fetchData = async (city) => {
  try {
    let response = await getWeather(city);
    let path = `images/${response.data.weather[0].main}.png`.toLowerCase();
    let speed = response.data.wind.speed;
    let humid = response.data.main.humidity;
    let temperature = response.data.main.temp;
    displayData(path, humid, speed, temperature, city);
  } catch (err) {
    middleDiv[0].style.display = "none";
    bottmDiv[0].style.display = "none";
    onError.style.display = "block";
  }
};

//upon click
button.addEventListener("click", async () => {
  middleDiv[0].style.display = "flex";
  bottmDiv[0].style.display = "flex";
  onError.style.display = "none";
  let city = document.getElementById("city").value;
  prevInput = city;
  localStorage.setItem("prevInput", prevInput);
  fetchData(city);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") button.click();
});

document.addEventListener("DOMContentLoaded", () => {
  fetchData(prevInput);
});
