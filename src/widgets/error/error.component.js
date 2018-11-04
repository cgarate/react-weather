import React from 'react';
import { Block, H3 } from '../../components';

export const Error = ({errorMessage}) => (

  <Block flex items_center justify_center pa4 washed_yellow bg_orange f5 tc ph3 pv3>
    <H3 lh_title>{errorMessage}</H3>
  </Block>
);