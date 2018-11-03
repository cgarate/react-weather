import React, { Component } from "react";

import "./styles/variables.css";
import { Dashboard, WeatherInfoContainer } from "./scenes";
require("dotenv").config();

class App extends Component {

  render() {
    return (
      <Dashboard>
        <WeatherInfoContainer />
      </Dashboard>
    );
  }
}

export default App;
