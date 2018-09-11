import React from 'react';

import { Card, Block, Image, H4 } from '../../../../components';

const CustomH4 = ({children}) => (
  <H4 ma0 black_70>{children}</H4>
)

const CustomBlock = ({children}) => (
  <Block tc pb3>{children}</Block>
)

export const WeatherCardHourly = ({
  icon,
  weatherDescription,
  feelsLike,
  temp,
  humidity,
  windGust,
  }) => {
  return  (
    <Card mw6 center bg_white br3 pa3 pa4-ns mv3 mh3 ba b__black_10>
      <Block flex flex_column items_center >
        <Image br_100 h4 w4 dib ba b__black_05 pa2 title="Hourly Weather Conditions" src={icon} />
        <Block mw5>
          <H4 f5 dark_blue mt1 >{weatherDescription}</H4>
        </Block>
      </Block>
      <CustomBlock>
        <CustomH4>Temperature</CustomH4>
        <span ma0>{temp} C</span>
      </CustomBlock>

      <CustomBlock>
        <CustomH4>Feels Like</CustomH4>
        <span ma0>{feelsLike} C</span>
      </CustomBlock>

      <CustomBlock>
        <CustomH4>Humidity</CustomH4>
        <span ma0>{humidity}</span>
      </CustomBlock>
      <CustomBlock>
        <CustomH4>Wind Gust</CustomH4>
        <span ma0>{windGust} kmph</span>
      </CustomBlock>
    </Card>
  )
}
