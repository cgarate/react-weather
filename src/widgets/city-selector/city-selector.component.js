import React from 'react';
import { Block, Input, Pill } from '../../components';

export const CitySelector = (props) => {
  return (
    <Block >
      <Input
        input_reset ba b__light_blue pa2 mb2 mr2
        onChange={props.inputTextSearchHandler}
        onKeyPress={props.submitHandler}
        value={props.cityValue}
        type="text"
        size="50" />
      <Pill onClickHandler={props.submitHandler} buttonText={"Search"} />
    </Block>
  )
}
