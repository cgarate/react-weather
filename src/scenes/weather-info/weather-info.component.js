import React from "react";
import axios from "axios";

import { CitySelector, CircleLoader, Error } from "../../widgets";
import { Block, Main } from "../../components";
import { WeatherCard, WeatherCardHourly } from "./components";

const BASE_API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASIC_CITY_WEATHER_REQUEST = `${BASE_API_URL}/?key=${API_KEY}&num_of_days=1&format=json&q=`;

export class WeatherInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citySelectorValue: "",
      loadingData: false,
      weatherData: {
        currentCondition: [],
        currentConditionDescription: null,
        currentConditionIcon: null,
        hourly: [],
        returnedPlace: null,
      },
      error: null,
      showHourlyData: false,
    };
    this.inputTextSearchHandler = this.inputTextSearchHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.weatherClickHandler = this.weatherClickHandler.bind(this);
  }

  weatherClickHandler(event) {
    this.setState({ showHourlyData: true });
  }

  inputTextSearchHandler(event) {
    this.setState({ citySelectorValue: event.target.value });
  }

  submitHandler(event) {
    if (
      (event.type === "keypress" && event.key === "Enter") ||
      event.type === "click"
    ) {
      this.setState({ loadingData: true, showHourlyData: false });
      axios
        .get(BASIC_CITY_WEATHER_REQUEST + this.state.citySelectorValue)
        .then(response => {
          if (response.data.data.hasOwnProperty("error")) {
            this.setState({
              loadingData: false,
              error: response.data.data.error[0].msg,
            });
          } else {
            this.setState({
              loadingData: false,
              weatherData: {
                hourly: [...response.data.data.weather[0].hourly],
                currentCondition: {
                  ...response.data.data.current_condition[0],
                },
                currentConditionDescription:
                  response.data.data.current_condition[0].weatherDesc[0].value,
                currentConditionIcon:
                  response.data.data.current_condition[0].weatherIconUrl[0]
                    .value,
                returnedPlace: response.data.data.request[0].query,
              },
              citySelectorValue: "",
              error: null,
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
    if (!this.state.weatherData.hourly.length) {
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
            icon={this.state.weatherData.currentConditionIcon}
            currentWeatherDescription={
              this.state.weatherData.currentConditionDescription
            }
            feelsLike={this.state.weatherData.currentCondition.FeelsLikeC}
            temp={this.state.weatherData.currentCondition.temp_C}
            humidity={this.state.weatherData.currentCondition.humidity}
            location={this.state.weatherData.returnedPlace}
            clickHandler={this.weatherClickHandler}
          />
        </Block>
        <Block flex flex_wrap>
          {this.state.showHourlyData &&
            this.state.weatherData.hourly.map((hour, i) => {
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
              );
            })}
        </Block>
      </Main>
    );
  }
}
