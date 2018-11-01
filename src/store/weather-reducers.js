import { combineReducers } from 'redux';

import { SET_LOADING_CONTENT, SHOW_HOURLY_WEATHER, LOG_ERROR } from './weather-actions-type';

const initialState = {
  ui: {
    loadingData: false,
    showHourlyData: false,
  },
  weather: {
    current: {},
  },
  error: "",
}

const weatherUI = (state = initialState.ui, action) => {
  switch (action.type) {
    case SET_LOADING_CONTENT:
      return { ...state, loadingData: action.loadingDataStatus }
    case SHOW_HOURLY_WEATHER:
      return { ...state, showHourlyData: action.showHourlyWeather }
    default:
      return state;
  }
}

const logError = (state = initialState.error, action) => {
  switch (action.type) {
    case LOG_ERROR:
      return action.message;
    default:
      return state;
  }
}

const weatherReducer = combineReducers({
  logError,
  weatherUI
})

export default weatherReducer;




