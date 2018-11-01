import React from 'react';
import axios from "axios";

import { CitySelector, CircleLoader, Error } from "../../widgets";
import { Block, Main } from "../../components";
import { WeatherCard, WeatherCardHourly } from './components';

const BASE_API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASIC_CITY_WEATHER_REQUEST = `${BASE_API_URL}APPID=${API_KEY}&q=`;

export class WeatherInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citySelectorValue: "",
      loadingData: false,
      weather: {
        current: {
          name: null,
          conditions: [],
          temp: null,
          humidity: null,
          tempMin: null,
          tempMax: null,
          datetime: null,
          sunrise: null,
          sunset: null,
        },
      },
      error: null,
      showHourlyData: false,
    };
    this.inputTextSearchHandler = this.inputTextSearchHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.weatherClickHandler = this.weatherClickHandler.bind(this);
  }

  weatherClickHandler(event) {
    this.setState({ showHourlyData: true })
  }

  inputTextSearchHandler(event) {
    this.setState({ citySelectorValue: event.target.value });
  }

  submitHandler(event) {
    if ((event.type === 'keypress' && event.key === 'Enter') || event.type === 'click') {
      this.setState({ loadingData: true, showHourlyData: false });
      axios
        .get(BASIC_CITY_WEATHER_REQUEST + this.state.citySelectorValue)
        .then(response => {
          if (response.status !== 200) {
            this.setState({
              loadingData: false,
              error: response.message
            });
          } else {
            console.log(response.data);
            this.setState({
              loadingData: false,
              weather: {
                current: {
                  name: response.data.name,
                  conditions: [...response.data.weather],
                  temp: response.data.main.temp,
                  humidity: response.data.main.humidity,
                  tempMin: response.data.main.temp_min,
                  tempMax: response.data.main.temp_max,
                  datetime: response.data.dt,
                  sunrise: response.data.sys.sunrise,
                  sunset: response.data.sys.sunset,
                }
              },
              citySelectorValue: "",
              error: null
            });
          }
        })
        .catch(error => {
          this.setState({ loadingData: false, error: error });
        });
    }
  }

  render() {
    // The spinner
    if (this.state.loadingData) {
      return <CircleLoader />;
    }

    // Initial state when data has not been retrieved
    if (this.state.weather.current.name === null) {
      return (
        <Main flex flex_column items_center justify_center pa3>
          <CitySelector
            submitHandler={this.submitHandler}
            inputTextSearchHandler={this.inputTextSearchHandler}
            cityValue={this.state.citySelectorValue}
          />
        </Main>
      );
    }

    // If fetching data returned an error
    if (this.state.error) {
      return (
        <Main flex flex_column items_center justify_center pa3>
          <CitySelector
            submitHandler={this.submitHandler}
            inputTextSearchHandler={this.inputTextSearchHandler}
            cityValue={this.state.citySelectorValue}
          />
          <Error errorMessage={this.state.error} />
        </Main>
      );
    }

    // Data fetching was successful.
    return (
      <Main flex flex_column items_center justify_center pa3>
        <Block flex flex_column items_start>
          <CitySelector
            submitHandler={this.submitHandler}
            inputTextSearchHandler={this.inputTextSearchHandler}
            cityValue={this.state.citySelectorValue}
          />
          <WeatherCard
            currentConditions={
              this.state.weather.current.conditions
            }
            temp={this.state.weather.current.temp}
            humidity={this.state.weather.current.humidity}
            location={this.state.weather.current.name}
            clickHandler={this.weatherClickHandler}
          />
        </Block>
        <Block flex flex_wrap>
          {this.state.showHourlyData &&
            this.state.weather.current.hourly.map((hour, i) => {
              return (
                <WeatherCardHourly
                  key={`hourlyWeather-${i}`}
                  icon={hour.weatherIconUrl[0].value}
                  feelsLike={hour.FeelsLikeC}
                  temp={hour.tempC}
                  humidity={hour.humidity}
                  windGust={hour.WindGustKmph}
                  weatherDescription={hour.weatherDesc[0].value}
                />
              )
            })
          }
        </Block>
      </Main>
    );
  }
}