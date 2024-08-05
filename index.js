async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = 'b00c9b0172123b48e689623b4ad4e9e5'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.cod === 200) {
            const weatherInfo = `
                <p><strong>City:</strong> ${data.name}</p>
                <p><strong>Temperature:</strong> ${data.main.temp} &deg;C</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            `;
            document.getElementById('weather-result').innerHTML = weatherInfo;
        } else {
            document.getElementById('weather-result').innerHTML = '<p>City not found. Please try again.</p>';
        }
    } catch (error) {
        document.getElementById('weather-result').innerHTML = '<p>An error occurred. Please try again later.</p>';
    }
}
