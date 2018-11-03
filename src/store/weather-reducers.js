import { combineReducers } from "redux";

import {
  LOG_ERROR,
  REQUEST_WEATHER_DATA,
  RECEIVE_WEATHER_DATA,
  SELECT_WEATHER_LOCATION,
  SAVE_WEATHER_INPUT_SEARCH_VALUE,
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

const error = (state = initialState.error, action) => {
  switch (action.type) {
    case LOG_ERROR:
      return action.message;
    default:
      return state;
  }
};

const selectedLocation = (state = initialState.selectedLocation, action) => {
  switch (action.type) {
    case SELECT_WEATHER_LOCATION:
      return action.location;
    default:
      return state;
  }
};

const weatherInputTextValue = (state = initialState.weatherInputTextValue, action) => {
  switch (action.type) {
    case SAVE_WEATHER_INPUT_SEARCH_VALUE:
      return action.inputTextValue;
    default:
      return state;
  }
}

const weather = (state = initialStateWeather, action) => {
  switch (action.type) {
    case REQUEST_WEATHER_DATA:
      return { ...state, isFetching: true };
    case RECEIVE_WEATHER_DATA:
      return {
        isFetching: false,
        lastUpdated: action.receivedAt,
        current: action.data
      };
    default:
      return state;
  }
};

const weatherReducer = combineReducers({
  error,
  weather,
  selectedLocation,
  weatherInputTextValue,
});

export default weatherReducer;
