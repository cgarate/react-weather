import React, { Component } from "react";

import "./styles/variables.css";

import { Dashboard, WeatherInfo } from "./scenes";

require("dotenv").config();

class App extends Component {

  render() {
    return (
      <Dashboard>
        <WeatherInfo />
      </Dashboard>
    );
  }
}

export default App;
