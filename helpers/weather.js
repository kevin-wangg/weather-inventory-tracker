const axios = require('axios')

function makeParams(lat, lon) {
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY
    return {
        lat: lat,
        lon: lon,
        appid: WEATHER_API_KEY,
        units: 'metric'
    }
}

function getWeatherDescription(weather) {
    let description = weather.weather[0].description
    let feelsLike = weather.main.feels_like
    description = description.charAt(0).toUpperCase() + description.slice(1)
    return `${description}, feels like ${feelsLike} °C`
}

async function getWeatherInfo(params) {
    const url = 'https://api.openweathermap.org/data/2.5/weather'
    return axios.get(url, {
        params: params
    }).then(res => {
        return getWeatherDescription(res.data)
    }).catch(error => {
        console.error(error)
    })
}

function getCoordinates(city) {
    const cityToCoordinates= {
        'Toronto': {
            'lat': '43.65',
            'lon': '-79.38'
        },
        'Vancouver': {
            'lat': '49.28',
            'lon': '-123.12'
        },
        'Calgary': {
            'lat': '51.04',
            'lon': '-114.07'
        },
        'Winnipeg': {
            'lat': '49.89',
            'lon': '-97.13'
        },
        'Montreal': {
            'lat': '45.50',
            'lon': '-73.57'
        },
    }
    return cityToCoordinates[city]
}

module.exports = async function getWeather(city) {
    const coordinates = getCoordinates(city)
    const params = makeParams(coordinates.lat, coordinates.lon)
    return getWeatherInfo(params)
}