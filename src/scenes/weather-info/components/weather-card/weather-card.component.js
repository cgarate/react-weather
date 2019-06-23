import React from "react";

import { Card, Block, H1, H4, H5 } from "../../../../components";
import { WeatherConditionsRow } from "./weather-conditions-row";

export const WeatherCard = ({
  location,
  country,
  currentConditions,
  // clickHandler,
  temp,
  humidity
}) => {
  let urlWeatherIcon = "http://openweathermap.org/img/w/"; // The URL to get the icon for the current weather
  return (
    <Card
      // onClick={clickHandler}
      mw6
      center
      bg_white
      br3
      pa3
      pa4-ns
      mv3
      ba
      b__black_10
    >
      <Block><H1>{location}, {country}</H1></Block>
      <Block flex justify_around>
        {currentConditions.map((item, index) => {
          let icon = item.icon;
          let description = item.description;
          return (
            <WeatherConditionsRow
              key={`currentConditionsRow-${index}`}
              icon={icon}
              description={description}
              urlWeatherIcon={urlWeatherIcon}
            />
          );
        })}
      </Block>
      <Block flex justify_around>
        <Block>
          <H4 ma0>Temperature</H4>
          <H5 ma0 tc>
            {temp} C
          </H5>
        </Block>

        <Block>
          <H4 ma0>Humidity</H4>
          <H5 ma0 tc>
            {humidity}
          </H5>
        </Block>
      </Block>
    </Card>
  );
};
