
import React from 'react';
import { Main } from '../../components';

export const Dashboard = (props) => {
  return (
    <Main pa3>
      {props.children}
    </Main>
  )
}