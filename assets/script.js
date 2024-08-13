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
        citySearch(city);
        saveToLocal(city);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
});

function citySearch(city) {
    const searchHistory = document.getElementById('citySearch');
    const cityItem = document.createElement('li');
    const cityLink = document.createElement('a');
    cityItem.classList.add('list-group-item');
    cityLink.href = '#'
    cityItem.textContent = city;
    cityLink.addEventListener('click', function (event) {
        event.preventDefault();
        current(city);
    });
    searchHistory.appendChild(cityItem);
    cityItem.appendChild(cityLink)
}

function saveToLocal(city) {
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem('cities', JSON.stringify(cities));
    }
}

function loadCities() {
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    cities.forEach(function(city) {
        citySearch(city);
    });
}

document.addEventListener('DOMContentLoaded', loadCities);

function displayWeather(data) {
    weatherDataDiv.innerHTML = `
        <h3>Weather in ${data.name}:</h3>
        <p>Temperature: ${data.main.temp}°F</p>
        <p>Humidity: ${data.main.humidity}</p>
        <p>Wind: ${data.wind.speed}MPH</p>
        <img src ="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt=${data.weather[0].description}"</p>
    `;
    console.log(data);
};
