
import { SET_LOADING_CONTENT } from './weather-actions-type';

export const contentLoaderOn = (setTo) => ({
  type: SET_LOADING_CONTENT,
  setTo
})