# Weather-INDIA


A beautiful and responsive weather app built with HTML, Tailwind CSS, and JavaScript. It uses the OpenWeatherMap API to show real-time weather data and a 5-day forecast.

---

##  Description

WeatherCast Pro is a simple weather dashboard that allows users to:

- Search for weather by city
- Automatically get weather based on geolocation
- View current temperature, humidity, wind, and condition
- See a 5-day forecast
- Enjoy dynamic background images based on weather
- Switch between light/dark mode

---

##  Project Structure

- `index.html` – main structure of the app
- `style.css` – background images and custom styles
- `script.js` – API integration and logic
- `tailwind.css` – Tailwind CSS build (optional if CDN used)
- `README.md` – this file

---

##  Getting Started

1. Clone this repository
2. Add your OpenWeatherMap API key in `script.js`
3. Open `index.html` in any browser – no setup needed!


## Tech Stack

- HTML5
- Tailwind CSS (CDN or local)
- JavaScript
- OpenWeatherMap API

---

## API Key Setup

> You’ll need an [OpenWeatherMap](https://openweathermap.org/api) API key.

1. Create a free account
2. Generate an API key
3. Open `script.js`
4. Replace the value of `API_KEY`:

```js
const API_KEY = "1328884fcf486291b962876bb9c32b07";

