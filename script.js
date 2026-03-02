// API Key for OpenWeatherMap
const API_KEY = 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// DOM Elements
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const cityElement = document.querySelector('.city');
const temperatureElement = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');
const weatherIconElement = document.querySelector('.weather-icon');
const windElement = document.querySelector('.wind');
const humidityElement = document.querySelector('.humidity');

// Event Listeners
searchButton.addEventListener('click', getWeather);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});

// Function to fetch weather data
async function getWeather() {
    const city = searchInput.value.trim();
    
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        console.log('Fetching weather for:', city);
        const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
        console.log('API URL:', url);
        
        const response = await fetch(url);
        console.log('Response status:', response.status);
        
        const data = await response.json();
        console.log('API Response:', data);

        if (response.ok) {
            displayWeather(data);
        } else {
            console.error('API Error:', data);
            if (data.message === 'city not found') {
                alert('City not found. Please check the spelling and try again.');
            } else if (data.message === 'Invalid API key') {
                alert('API key is invalid or not activated yet. Please check your API key or wait for activation.');
            } else {
                alert(`Error: ${data.message}`);
            }
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please check your internet connection and try again.');
    }
}

// Function to display weather data
function displayWeather(data) {
    console.log('Displaying weather data:', data);
    
    cityElement.textContent = data.name;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionElement.textContent = data.weather[0].description;
    
    // Update weather icon with proper URL
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    console.log('Weather icon URL:', iconUrl);
    
    weatherIconElement.src = iconUrl;
    weatherIconElement.alt = data.weather[0].description;
    
    windElement.textContent = `${data.wind.speed} km/h`;
    humidityElement.textContent = `${data.main.humidity}%`;
} 