import { combineReducers } from "redux";

import {
  REQUESTED_WEATHER_DATA,
  RECEIVED_WEATHER_DATA,
  SELECTED_WEATHER_LOCATION,
  SAVED_WEATHER_INPUT_SEARCH_VALUE,
  RECEIVED_WEATHER_DATA_ERROR,
} from "./weather-actions-type";

const initialStateWeather = {
  isFetching: false,
  lastUpdated: "",
  error: {
    message: "",
    code: "",
  },
  selectedLocation: "",
  weatherInputTextValue: "",
  name: "",
  country: "",
  current: {
    conditions: [],
    temp: "",
    humidity: "",
    tempMin: "",
    tempMax: "",
    datetime: "",
    sunrise: "",
    sunset: "",
  },
};

/**
 * @description thunk to retrieve weather data from API
 * @param  {} state=initialStateWeather
 * @param  {} action
 * @summary thunk actions
 */
const weather = (state = initialStateWeather, action) => {
  switch (action.type) {
    case REQUESTED_WEATHER_DATA:
      return { ...state, isFetching: true };
    case RECEIVED_WEATHER_DATA:
      return {
        isFetching: false,
        lastUpdated: action.receivedAt,
        current: action.data,
        name: action.name,
        country: action.country,
        error: {...initialStateWeather.error},
      };
    case RECEIVED_WEATHER_DATA_ERROR:
      return {
        ...initialStateWeather,
        isFetching: false,
        lastUpdated: action.receivedAt,
        error: {...state.error, message: action.message},
      };
    case SELECTED_WEATHER_LOCATION:
      return { ...state, selectedLocation: action.location };
    case SAVED_WEATHER_INPUT_SEARCH_VALUE:
      return { ...state, weatherInputTextValue: action.inputTextValue };
    default:
      return state;
  }
};

const weatherReducer = combineReducers({
  weather,
});

export default weatherReducer;
