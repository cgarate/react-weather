import React from 'react';

import { Card } from '../../components/card/card.component';

export const CurrentWeather = ({icon, currentDescription, place}) => {
  return (
    <Card>
      <h2>{place}</h2>
      <div>
        <img alt="Current Conditions" src={icon} />
        <div>{currentDescription}</div>
      </div>
    </Card>
  )
}

