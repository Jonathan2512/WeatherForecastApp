const key = "16be5dafb314ec93e6bc65b473e7bf3b";
const formEl = document.querySelector("form");
const details = document.querySelector(".details");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  details.innerHTML = "<h1>Loading...</h1>";
  const location = e.target.location.value;
  weatherApp(location);
});
const weatherApp = async (location) => {
  const data = await getWeather(location);
  generateHTML(data);
};
const getWeather = async (location) => {
  const baseUrl = `http://api.weatherstack.com/current?access_key=${key}&query=${location}`;
  const res = await fetch(baseUrl);
  const data = await res.json();
  console.log(data);
  return data;
};
const generateHTML = (data) => {
  const html = `
  <img class="icons" src=${
    data.current.weather_icons[0] ||
    "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.pn"
  } />
  <h1 class="temp">${data.current.temperature}℃</h1>
  <h1 class="status">${data.current.weather_descriptions
    .map((item) => item)
    .join(" ")}</h1>
  <div class="more-info">    
    <p>Humidity - ${data.current.humidity}%</p>
    <p>Wind Speed - ${data.current.wind_speed} km/h</p>

  </div>
  <div class="query"> 
    <p>${data.request.query}</p>    
    <p>${data.location.localtime}</p>
  </div>`;
  details.innerHTML = html;
};
