import { combineReducers } from "redux";

import {
  REQUESTED_WEATHER_DATA,
  RECEIVED_WEATHER_DATA,
  SELECTED_WEATHER_LOCATION,
  SAVED_WEATHER_INPUT_SEARCH_VALUE,
  RECEIVED_WEATHER_DATA_ERROR
} from "./weather-actions-type";

const initialStateWeather = {
  isFetching: false,
  lastUpdated: "",
  current: {
    name: "",
    conditions: [],
    temp: "",
    humidity: "",
    tempMin: "",
    tempMax: "",
    datetime: "",
    sunrise: "",
    sunset: ""
  }
};

const initialState = {
  weather: initialStateWeather,
  error: "",
  selectedLocation: "",
  weatherInputTextValue: "",
};

const error = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVED_WEATHER_DATA_ERROR:
      return {
        ...initialState,
        error: action.message
      }
    default:
     return state;
  }
}

const selectedLocation = (state = initialState.selectedLocation, action) => {
  switch (action.type) {
    case SELECTED_WEATHER_LOCATION:
      return action.location;
    default:
      return state;
  }
};

const weatherInputTextValue = (state = initialState.weatherInputTextValue, action) => {
  switch (action.type) {
    case SAVED_WEATHER_INPUT_SEARCH_VALUE:
      return action.inputTextValue;
    default:
      return state;
  }
}

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
        current: action.data
      };
    case RECEIVED_WEATHER_DATA_ERROR:
      return {
        ...initialStateWeather,
        isFetching: false,
        lastUpdated: action.receivedAt,
      }
    default:
      return state;
  }
};

const weatherReducer = combineReducers({
  weather,
  selectedLocation,
  weatherInputTextValue,
  error
});

export default weatherReducer;
