import fetch from "cross-fetch";

import {
  LOGGED_ERROR,
  SELECTED_WEATHER_LOCATION,
  REQUESTED_WEATHER_DATA,
  RECEIVED_WEATHER_DATA,
  RECEIVED_WEATHER_DATA_ERROR,
  SAVED_WEATHER_INPUT_SEARCH_VALUE,
} from "./weather-actions-type";

const BASE_API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASIC_CITY_WEATHER_REQUEST = `${BASE_API_URL}APPID=${API_KEY}&q=`;

export const logError = message => ({
  type: LOGGED_ERROR,
  message
});

export const requestWeatherData = location => ({
  type: REQUESTED_WEATHER_DATA,
  location
});

export const receiveWeatherData = (json) => ({
  type: RECEIVED_WEATHER_DATA,
  data: {
    conditions: [...json.weather],
    temp: json.main.temp,
    humidity: json.main.humidity,
    tempMin: json.main.temp_min,
    tempMax: json.main.temp_max,
    datetime: json.dt,
    sunrise: json.sys.sunrise,
    sunset: json.sys.sunset,
  },
  receivedAt: Date.now(),
  name: json.name,
  country: json.sys.country,
});

export const receiveWeatherError = (location, message) => ({
  type: RECEIVED_WEATHER_DATA_ERROR,
  message,
  location
});

export const selectedWeatherLocation = (location) => ({
  type: SELECTED_WEATHER_LOCATION,
  location
});

export const saveInputSearchValue = (value) => ({
  type: SAVED_WEATHER_INPUT_SEARCH_VALUE,
  inputTextValue: value,
})

//  Async actions
export const fetchWeather = location => dispatch => {
  dispatch(requestWeatherData(location))
  return (
    fetch(`${BASIC_CITY_WEATHER_REQUEST}${location}`)
    .then(
      (response) => response.json(),
      (error) => dispatch(logError(error))
    )
    .then((json) => {
      if (!json.message) {
        dispatch(receiveWeatherData(json));
        dispatch(selectedWeatherLocation(location));
      } else {
        dispatch(receiveWeatherError(location, json.message));
      }
    })
  )
}