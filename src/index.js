import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import "./index.css";
import weatherReducer from "./store/weather-reducers";
import App from "./App";
import { fetchWeather } from './store/weather-actions'

import registerServiceWorker from "./registerServiceWorker";

const middleware = [thunkMiddleware];

const store = createStore(
  weatherReducer,
  composeWithDevTools(
    applyMiddleware(...middleware),
  ));

store.dispatch(fetchWeather('toronto')).then(() => console.log(store.getState()))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
