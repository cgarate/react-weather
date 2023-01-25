import { connect } from 'react-redux';

import { saveInputSearchValue, fetchWeather } from '../../store/weather-actions';
import { WeatherInfo } from './weather-info.component';

const upperCase = (str) => str.toUpperCase();
const lowerCase = (str) => str.toLowerCase();
const properCase = (str) => lowerCase(str).replace(/^\w|\s\w/g, upperCase);

const getCurrentErrorState = state => (state.error)

const getCurrentWeatherConditions = (weatherConditions) => {
  const selectedWeatherConditions = [];
  weatherConditions.map(item => {
    return selectedWeatherConditions.push({ icon: item.icon, description: properCase(item.description) })
  })
  return selectedWeatherConditions;
}

const getBasicWeatherData = weatherData => {
  return ({
      temp: weatherData.current.temp,
      humidity: weatherData.current.humidity,
      tempMin: weatherData.current.tempMin,
      tempMax: weatherData.current.tempMax,
      location: weatherData.name,
      country: weatherData.country,
      datetime: weatherData.current.dt,
      sunrise: weatherData.current.sunrise,
      sunset: weatherData.current.sunset,
  })
}

const mapStateToProps = state => ({
  weatherConditions: getCurrentWeatherConditions(state.weather.current.conditions),
  basicWeatherData: getBasicWeatherData(state.weather),
  isFetching: state.weather.isFetching,
  weatherInputTextValue: state.weather.weatherInputTextValue,
  errorState: getCurrentErrorState(state.weather),
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