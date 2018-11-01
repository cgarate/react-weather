
import { SET_LOADING_CONTENT, SHOW_HOURLY_WEATHER, LOG_ERROR } from './weather-actions-type';

export const setContentLoader = (loadingDataStatus) => ({
  type: SET_LOADING_CONTENT,
  loadingDataStatus: loadingDataStatus,
})

export const showHourlyWeather = (showHourlyWeather) = ({
  type: SHOW_HOURLY_WEATHER,
  showHourlyWeather: showHourlyWeather,
})

export const logError = (message) => ({
  type: LOG_ERROR,
  message
})