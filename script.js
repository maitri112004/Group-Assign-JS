const searchButton = document.getElementById('searchButton');
const searchQuery = document.getElementById('searchQuery');
const results = document.getElementById('results');
const weatherData = document.getElementById('weatherData');

// NASA API
async function fetchNASAData(query) {
    const apiUrl = `https://images-api.nasa.gov/search?q=${query}&media_type=image`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayResults(data.collection.items);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Display results on the page
function displayResults(items) {
    results.innerHTML = ''; 
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';

        const image = document.createElement('img');
        image.src = item.links[0].href;
        image.alt = item.data[0].title;

        const title = document.createElement('h3');
        title.textContent = item.data[0].title;

        const button = document.createElement('button');
        button.textContent = 'View Details';
        button.addEventListener('click', () => {
            openDetails(item);
        });

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(button);
        results.appendChild(card);
    });
}

// Open a new window with image details
function openDetails(item) {
    const details = item.data[0];
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
        <h1>${details.title}</h1>
        <img src="${item.links[0].href}" alt="${details.title}" style="max-width: 100%;" />
        <p>${details.description}</p>
        <p><strong>Date Created:</strong> ${details.date_created}</p>
    `);
}

// OpenWeather API
async function fetchWeather() {
    const apiKey = 'bd5e378503939ddaee76f12ad7a97608'; 
    const city = 'Toronto'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherData.textContent = 'Failed to load weather data.';
        console.error('Error fetching weather data:', error);
    }
}

// Display weather data
function displayWeather(data) {
    const { name, main, weather } = data;
    weatherData.innerHTML = `
        <p><strong>City:</strong> ${name}</p>
        <p><strong>Temperature:</strong> ${main.temp}°C</p>
        <p><strong>Condition:</strong> ${weather[0].description}</p>
    `;
}

// Event listeners
searchButton.addEventListener('click', () => {
    const query = searchQuery.value.trim();
    if (query) {
        fetchNASAData(query);
    }
});

// Initial weather fetch
fetchWeather();
