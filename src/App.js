import { composeWithDevTools } from "@redux-devtools/extension";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { Dashboard, WeatherInfoContainer } from "./scenes";
import { fetchWeather } from "./store/weather-actions";
import weatherReducer from "./store/weather-reducers";
import "./styles/variables.css";


const middleware = [thunkMiddleware];

const store = createStore(
  weatherReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

store
  .dispatch(fetchWeather("guanajuato"))
  .then(() => console.log(store.getState()));
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Dashboard>
          <WeatherInfoContainer />
        </Dashboard>
      </Provider>
    );
  }
}

export default App;
