import React from 'react';

import { Card, Block, Image, H1, H2, H4, H5 } from '../../../../components';

export const WeatherCard = ({
  icon, 
  location, 
  currentWeatherDescription, 
  clickHandler,
  feelsLike,
  temp,
  humidity,
  }) => {
  return  (
    <Card onClick={clickHandler} mw6 center bg_white br3 pa3 pa4-ns mv3 ba b__black_10>
      <Block flex >
        <Image br_100 h4 w4 dib ba b__black_05 pa2 title="Current Weather Conditions" src={icon} />
        <Block pl3>
          <H1 f3 mb2>{location}</H1>
          <H2 f5 fw4 gray mt0>{currentWeatherDescription}</H2>
        </Block>
      </Block>
      <Block flex justify_around>
        <Block>
          <H4 ma0 >Temperature</H4>
          <H5 ma0 tc>{temp} C</H5>
        </Block>

        <Block>
          <H4 ma0>Feels Like</H4>
          <H5 ma0 tc>{feelsLike} C</H5>
        </Block>

        <Block>
          <H4 ma0>Humidity</H4>
          <H5 ma0 tc>{humidity}</H5>
        </Block>
      </Block>
    </Card>
  )
}
