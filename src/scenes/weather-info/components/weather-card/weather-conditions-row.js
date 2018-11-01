import React from 'react';
import { Block, Image, H6 } from '../../../../components';

export const WeatherConditionsRow = ({ icon, description, urlWeatherIcon }) => {
  return (
    <Block pl3>
      <Image br_100 dib ba b__black_05 pa2 src={`${urlWeatherIcon}${icon}.png`} />
      <H6 f5 fw4 gray mt0>{description}</H6>
    </Block>
  )
}