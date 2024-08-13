const APIkey = 'd3d5481eceebd9dc3110808a35fa70cd'; // OpenWeatherMap API key
const fetchButton = document.getElementById('submitBtn');
const weatherForm = document.getElementById('weatherForm');
const weatherDataDiv = document.getElementById('weatherData');
const foreCastDiv = document.getElementById('foreCastData');
const city = document.getElementById('cityInput');

weatherForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const city = cityInput.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        displayWeather(data);
        display5day(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
});

function displayWeather(data) {
    weatherDataDiv.innerHTML = `
        <h3>Weather in ${data.name}:</h3>
        <p>Temperature: ${data.main.temp}°F</p>
        <p>Humidity: ${data.main.humidity}</p>
        <p>Wind: ${data.wind.speed}MPH</p>
        <img src ="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt=${data.weather[0].description}"</p>
    `;
    console.log(data);
}

function display5day(data) {
    foreCastDiv.innerHTML =  `
        <h3>Weather in ${data.name}:</h3>
        <p>Temperature: ${data.main.temp}°F</p>
        <p>Humidity: ${data.main.humidity}</p>
        <p>Wind: ${data.wind.speed}MPH</p>
        <img src ="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt=${data.weather[0].description}"</p>
        `;
    }

//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//         }
//         const data = await response.json();
//         displayWeather(data);
//     } catch (error) {
//         console.error('There has been a problem with your fetch operation:', error);
//     }
// });


// function displayWeather(data) {
//     const weatherDataDiv = document.getElementById('weatherData');
   
//     `;
// }

// function display5day(data) {
//     const weather5day = document.getElementById('fiveDay');
//     weather5day.innerHTML = `
//         <h3>5 Day Forecast:</h3>
//         <p>Temperature: ${data.main.temp}°C</p>
//         <p>Weather: ${data.weather[0].description}</p>
//     `;
// 