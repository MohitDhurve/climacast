class WeatherApp {
    constructor() {
        this.apiKey = 'b00c9b0172123b48e689623b4ad4e9e5'; // Replace with your OpenWeatherMap API key
        this.currentUnit = 'C';
        this.refreshInterval = null;
        this.initializeElements();
        this.setupEventListeners();
        this.loadRecentSearches();
    }

    initializeElements() {
        // Get all necessary DOM elements
        this.cityInput = document.getElementById('city');
        this.searchBtn = document.getElementById('searchBtn');
        this.weatherResult = document.getElementById('weather-result');
        this.celsiusBtn = document.getElementById('celsiusBtn');
        this.fahrenheitBtn = document.getElementById('fahrenheitBtn');
        this.autoRefreshCheckbox = document.getElementById('autoRefresh');
        this.recentList = document.getElementById('recentList');
    }

    setupEventListeners() {
        // Search functionality
        this.searchBtn.addEventListener('click', () => this.getWeather());
        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.getWeather();
        });

        // Temperature unit toggle
        this.celsiusBtn.addEventListener('click', () => {
            this.toggleUnit('C');
            if (this.weatherResult.innerHTML !== '') {
                this.getWeather(); // Refresh weather with new unit
            }
        });

        this.fahrenheitBtn.addEventListener('click', () => {
            this.toggleUnit('F');
            if (this.weatherResult.innerHTML !== '') {
                this.getWeather(); // Refresh weather with new unit
            }
        });

        // Auto refresh toggle
        this.autoRefreshCheckbox.addEventListener('change', () => this.toggleAutoRefresh());
    }

    async getWeather() {
        const city = this.cityInput.value.trim();
        if (!city) {
            this.showError('Please enter a city name');
            return;
        }

        this.showLoading();

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=${this.currentUnit === 'C' ? 'metric' : 'imperial'}`
            );

            if (!response.ok) {
                throw new Error('City not found');
            }

            const data = await response.json();
            this.displayWeather(data);
            this.addToRecentSearches(city);

        } catch (error) {
            this.showError(error.message);
        }
    }

    displayWeather(data) {
        const temp = Math.round(data.main.temp);
        const weatherHTML = `
            <div class="weather-main">
                <img class="weather-icon" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="weather icon">
                <div class="temperature">${temp}°${this.currentUnit}</div>
                <div class="weather-description">${data.weather[0].description}</div>
            </div>
            <div class="weather-details">
                <div class="detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <p>${data.name}, ${data.sys.country}</p>
                </div>
                <div class="detail-item">
                    <i class="fas fa-tint"></i>
                    <p>Humidity: ${data.main.humidity}%</p>
                </div>
                <div class="detail-item">
                    <i class="fas fa-wind"></i>
                    <p>Wind: ${data.wind.speed} ${this.currentUnit === 'C' ? 'm/s' : 'mph'}</p>
                </div>
                <div class="detail-item">
                    <i class="fas fa-compress-arrows-alt"></i>
                    <p>Pressure: ${data.main.pressure} hPa</p>
                </div>
            </div>
        `;
        this.weatherResult.innerHTML = weatherHTML;
    }

    toggleUnit(unit) {
        this.currentUnit = unit;
        // Update button states
        if (unit === 'C') {
            this.celsiusBtn.classList.add('active');
            this.fahrenheitBtn.classList.remove('active');
        } else {
            this.celsiusBtn.classList.remove('active');
            this.fahrenheitBtn.classList.add('active');
        }
    }

    toggleAutoRefresh() {
        if (this.autoRefreshCheckbox.checked) {
            this.refreshInterval = setInterval(() => {
                if (this.cityInput.value.trim()) {
                    this.getWeather();
                }
            }, 300000); // 5 minutes
        } else {
            clearInterval(this.refreshInterval);
        }
    }

    showLoading() {
        this.weatherResult.innerHTML = '<div class="loading"></div>';
    }

    showError(message) {
        this.weatherResult.innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-circle"></i>
                ${message}
            </div>
        `;
    }

    addToRecentSearches(city) {
        let recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        recent = recent.filter(item => item.toLowerCase() !== city.toLowerCase());
        recent.unshift(city);
        recent = recent.slice(0, 5);
        localStorage.setItem('recentSearches', JSON.stringify(recent));
        this.displayRecentSearches();
    }

    loadRecentSearches() {
        this.displayRecentSearches();
    }

    displayRecentSearches() {
        const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        this.recentList.innerHTML = recent
            .map(city => `
                <div class="recent-item" onclick="app.searchCity('${city}')">
                    <i class="fas fa-history"></i>
                    ${city}
                </div>
            `)
            .join('');
    }

    searchCity(city) {
        this.cityInput.value = city;
        this.getWeather();
    }
}

// Initialize the app
const app = new WeatherApp();
