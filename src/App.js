import React, { Component } from "react";
import axios from "axios";

import "./styles/variables.css";

import { CitySelector } from "./widgets/city-selector/city-selector.component";
import { CurrentWeather } from "./widgets/current-weather-condition/current-weather-condition.component";
import { CodeLoader } from "./widgets/loaders/code-loader/code-loader.component";
import { Main } from "./app.style";
import { Card } from "./components/card/card.component";
import { Block } from "./components/block/block.component";

require("dotenv").config();

const BASE_API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASIC_CITY_WEATHER_REQUEST = `${BASE_API_URL}/?key=${API_KEY}&num_of_days=1&format=json&q=`;

class App extends Component {
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
        returnedPlace: null
      },
      error: null
    };
    this.inputTextSearchHandler = this.inputTextSearchHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  inputTextSearchHandler(event) {
    this.setState({ citySelectorValue: event.target.value });
  }

  submitHandler() {
    this.setState({ loadingData: true });
    axios
      .get(BASIC_CITY_WEATHER_REQUEST + this.state.citySelectorValue)
      .then(response => {
        console.log(response.data);
        if (response.data.data.hasOwnProperty("error")) {
          this.setState({
            loadingData: false,
            error: response.data.data.error[0].msg
          });
        } else {
          this.setState({
            loadingData: false,
            weatherData: {
              hourly: [...response.data.data.weather[0].hourly],
              currentCondition: { ...response.data.data.current_condition[0] },
              currentConditionDescription:
                response.data.data.current_condition[0].weatherDesc[0].value,
              currentConditionIcon:
                response.data.data.current_condition[0].weatherIconUrl[0].value,
              returnedPlace: response.data.data.request[0].query
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

  render() {
    if (this.state.error) {
      return (
        <Main flex items_start justify_center pa3>
          <CitySelector
            submitHandler={this.submitHandler}
            inputTextSearchHandler={this.inputTextSearchHandler}
            cityValue={this.state.citySelectorValue}
          />
          {this.state.error}
        </Main>
      );
    }

    if (this.state.loadingData) {
      return <CodeLoader />;
    }

    if (!this.state.weatherData.hourly.length) {
      return (
        <Main flex items_start justify_center pa3>
          <CitySelector
            submitHandler={this.submitHandler}
            inputTextSearchHandler={this.inputTextSearchHandler}
            cityValue={this.state.citySelectorValue}
          />
        </Main>
      );
    }

    return (
      <Main flex items_start justify_center pa3>
        <Block>
          <Card flex flex_column items_start >
            <CitySelector
              submitHandler={this.submitHandler}
              inputTextSearchHandler={this.inputTextSearchHandler}
              cityValue={this.state.citySelectorValue}
            />
            <CurrentWeather
              icon={this.state.weatherData.currentConditionIcon}
              currentDescription={
                this.state.weatherData.currentConditionDescription
              }
              place={this.state.weatherData.returnedPlace}
            />
          </Card>
        </Block>
      </Main>
    );
  }
}

export default App;
