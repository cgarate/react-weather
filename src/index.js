import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import "./index.css";
import weatherReducer from "./store/weather-reducers";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const store = createStore(weatherReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
