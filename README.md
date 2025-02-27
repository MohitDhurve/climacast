# ClimaCast

ClimaCast is an interactive web application that provides real-time weather information. Users can search for weather details by entering a city name, and the app fetches and displays data such as temperature, humidity, weather conditions, and wind speed using the OpenWeatherMap API.

## Features

- **Real-time Weather Updates**: Get current weather conditions including temperature, humidity, and wind speed.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **User-Friendly Interface**: Simple and intuitive search box with clear weather results.

## Demo

You can view a live demo of ClimaCast [here](https://mohitdhurve.github.io/climacast/).

## Screenshots

![ClimaCast Screenshot]([https://drive.google.com/file/d/1AP1nkxhfK0iZrvOC1rMc0YdzHcrUypde/view?usp=sharing])


## Installation

To run ClimaCast locally, follow these steps:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/MohitDhurve/climacast.git
    ```

2. **Navigate to the Project Directory**:
    ```bash
    cd climacast
    ```

3. **Open `index.html` in Your Browser**:
    Simply open the `index.html` file in a web browser to start using the app.

## Usage

1. Open the application in your web browser.
2. Enter a city name in the search box.
3. Click the "Get Weather" button to retrieve and display the weather information.

## Technologies Used

- **HTML**: Structure of the web pages.
- **CSS**: Styling and layout.
- **JavaScript**: Fetching data from the OpenWeatherMap API and dynamic content updates.

## API Key

This project uses the OpenWeatherMap API. To use it, replace the `apiKey` variable in `index.js` with your own API key:

```javascript
const apiKey = 'your-api-key';
