import React from 'react';
import { Block } from '../../components';

export const Error = ({errorMessage}) => (

  <Block flex items_center justify_center pa4 washed_yellow bg_red f5 tc ph3 pv3>  
    <svg className="w1" data-icon="info" viewBox="0 0 32 32">
      <title>info icon</title>
      <path d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6"></path>
    </svg>
    <span lh_title ml3>{errorMessage}</span>
  </Block> 
);