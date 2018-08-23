import React from 'react';
import { Block } from '../../components/block/block.component';
import { Input } from '../../components/input/input.component';

export const CitySelector = (props) => {
  return (
    <Block>
      <Input ma3 onChange={props.inputTextSearchHandler} value={props.cityValue} type="text" size="50"></Input>
      <button onClick={props.submitHandler}>Search</button>
    </Block>
  )
}