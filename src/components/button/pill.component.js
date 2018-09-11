import React from 'react';

import { Button } from './button.component';

export const Pill = ({buttonText, onClickHandler}) => {
  return (
    <Button
      f6 tc grow no_underline br_pill ba bg_dark_blue ph3 pv2 mb2 dib
      onClick={onClickHandler}
      borderColor={"var(--dark-blue)"}
      textColor={"white"}>
        {buttonText}
    </Button>
  )
}