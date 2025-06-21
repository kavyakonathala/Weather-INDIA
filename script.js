const API_KEY = "1328884fcf486291b962876bb9c32b07";
const body = document.body;

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const locateMeBtn = document.getElementById("locate-me");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const loadingIcon = document.getElementById("loading-icon");

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }
  fetchWeatherByCity("Delhi");
});

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  themeIcon.classList.toggle("fa-moon");
  themeIcon.classList.toggle("fa-sun");
  localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchInput.value.trim();
  if (!city) return;
  fetchWeatherByCity(city);
});

locateMeBtn.addEventListener("click", () => {
  if (!navigator.geolocation) return alert("Geolocation not supported.");
  navigator.geolocation.getCurrentPosition(
    pos => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
    () => alert("Location access denied.")
  );
});

async function fetchWeatherByCity(city) {
  try {
    const weather = await getWeather(city);
    const forecast = await getForecast(city);
    updateUI(weather, forecast);
  } catch {
    alert("City not found.");
  }
}

async function fetchWeatherByCoords(lat, lon) {
  try {
    const weather = await getWeatherCoords(lat, lon);
    const forecast = await getForecastCoords(lat, lon);
    updateUI(weather, forecast);
  } catch {
    alert("Unable to fetch location weather.");
  }
}

async function getWeather(city) {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  if (!res.ok) throw new Error("City not found");
  return res.json();
}

async function getForecast(city) {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
  if (!res.ok) throw new Error("Forecast not found");
  return res.json();
}

async function getWeatherCoords(lat, lon) {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
  if (!res.ok) throw new Error("Coords weather error");
  return res.json();
}

async function getForecastCoords(lat, lon) {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
  if (!res.ok) throw new Error("Coords forecast error");
  return res.json();
}

function updateUI(data, forecastData) {
  document.getElementById("city").textContent = data.name;
  document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
  document.getElementById("humidity").textContent = `${data.main.humidity}%`;
  document.getElementById("wind").textContent = `${Math.round(data.wind.speed)} m/s`;
  document.getElementById("condition").textContent = data.weather[0].main;
  document.getElementById("feels-like").textContent = `${Math.round(data.main.feels_like)}°C`;
  document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  const now = new Date();
  document.getElementById("date").textContent = now.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

  updateBackground(data.weather[0].main.toLowerCase());

  const forecastContainer = document.getElementById("forecast-container");
  forecastContainer.innerHTML = "";
  const forecasts = forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5);
  for (const item of forecasts) {
    const day = new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" });
    forecastContainer.innerHTML += `
      <div class="forecast-card rounded-lg p-3">
        <p class="font-medium">${day}</p>
        <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" class="mx-auto">
        <p class="font-semibold">${Math.round(item.main.temp)}°C</p>
      </div>`;
  }
}

function updateBackground(condition) {
  body.classList.remove("clear-sky", "clouds", "rain", "thunderstorm", "snow", "default-bg");
  if (condition.includes("clear")) body.classList.add("clear-sky");
  else if (condition.includes("cloud")) body.classList.add("clouds");
  else if (condition.includes("rain") || condition.includes("drizzle")) body.classList.add("rain");
  else if (condition.includes("thunder")) body.classList.add("thunderstorm");
  else if (condition.includes("snow")) body.classList.add("snow");
  else body.classList.add("default-bg");
}
