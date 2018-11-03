import React from 'react';
import { Block, Input } from '../../components';

export const CitySelector = (props) => {
  return (
    <Block >
      <Input
        input_reset ba b__light_blue pa2 mb2 mr2
        onChange={(e) => props.inputTextSearchHandler(e.target.value)}
        onKeyPress={(e) => props.submitHandler(e)}
        type="text"
        size="50" />
    </Block>
  )
}
