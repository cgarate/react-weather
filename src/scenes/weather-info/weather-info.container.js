import { connect } from 'react-redux';

import { saveInputSearchValue, fetchWeather } from '../../store/weather-actions';
import { WeatherInfo } from './weather-info.component';


const getCurrentErrorState = state => {
  return ({
    error: state.error,
  })
}

const getCurrentWeatherConditions = (weatherConditions) => {
  const selectedWeatherConditions = [];
  weatherConditions.map(item => {
    return selectedWeatherConditions.push({ icon: item.icon, description: item.description })
  })
  return selectedWeatherConditions;
}

const getBasicWeatherData = weatherData => {
  return ({
      temp: weatherData.temp,
      humidity: weatherData.humidity,
      tempMin: weatherData.tempMin,
      tempMax: weatherData.tempMax,
      location: weatherData.name,
      datetime: weatherData.dt,
      sunrise: weatherData.sunrise,
      sunset: weatherData.sunset,
  })
}

const mapStateToProps = state => ({
  weatherConditions: getCurrentWeatherConditions(state.weather.current.conditions),
  basicWeatherData: getBasicWeatherData(state.weather.current),
  isFetching: state.weather.isFetching,
  weatherInputTextValue: state.weather.weatherInputTextValue,
  errorState: getCurrentErrorState,
})

const mapDispatchToProps = dispatch => ({
  inputTextSearchHandler: (currentValue) => {
    dispatch(saveInputSearchValue(currentValue))
  },
  submitHandler: (event) => {
    if (event.type === 'keypress' && event.key === 'Enter') {
      dispatch(fetchWeather(event.target.value));
    }
  }
})

export const WeatherInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherInfo);