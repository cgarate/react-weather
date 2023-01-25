import React from "react";

import { CitySelector, CircleLoader, Error } from "../../widgets";
import { Block, Main } from "../../components";
import { WeatherCard } from "./components";

export const WeatherInfo = ({
  isFetching,
  weatherConditions,
  basicWeatherData,
  submitHandler,
  inputTextSearchHandler,
  errorState,
}) => {
  // The spinner
  if (isFetching) {
    return (
      <Main flex flex_column items_center justify_center pa3>
        <CircleLoader />
      </Main>
    );

  }

  const renderInputSearchBox = () => (
    <CitySelector
      submitHandler={submitHandler}
      inputTextSearchHandler={inputTextSearchHandler}
    />
  );

  // Initial state when data has not been retrieved
  if (errorState.message) {
    return (
      <Main flex flex_column items_center justify_center pa3>
        {renderInputSearchBox()}
        {errorState.message ? (
          <Error errorMessage={errorState.message} />
        ) : null}
      </Main>
    );
  }

  // Data fetching was successful.
  return (
    <Main flex flex_column items_center justify_center pa3>
      <Block flex flex_column items_start>
        {renderInputSearchBox()}
        <WeatherCard
          currentConditions={weatherConditions}
          temp={basicWeatherData.temp}
          humidity={basicWeatherData.humidity}
          location={basicWeatherData.location}
          country={basicWeatherData.country}
          // clickHandler={this.weatherClickHandler}
        />
      </Block>
    </Main>
  );
};

