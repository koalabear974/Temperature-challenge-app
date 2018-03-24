import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './style/App.css';
import Utils from './utils/Utils.js';

import Header from './components/Header.js';
import Home from './components/Home.js';
import Configuration from './components/Configuration.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMounted: false,
      temperatureData: [],
      temperatureConfiguration: {minTemp: 10, maxTemp: 30, interval: 30},
    }

    this.addTemperatureData = this.addTemperatureData.bind(this);
    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
  }

  componentDidMount() {
    this.dataGeneratorTimer = setInterval(this.addTemperatureData, this.state.temperatureConfiguration.interval * 1000);
    Utils.getLatestApiData().then(initialTemperature => this.setState({temperatureData: initialTemperature, isMounted: true}));
  }

  componentWillUnmount() {
    clearInterval(this.dataGeneratorTimer);
  }

  addTemperatureData() {
    let temperatureDataTemp = this.state.temperatureData;
    let randomData = Utils.generateRandomTemperature(this.state.temperatureConfiguration);
    temperatureDataTemp.push(randomData)

    this.setState({temperatureData: temperatureDataTemp})
  }

  onSubmitSuccess(temperatureConfiguration) {
    this.setState({temperatureConfiguration: temperatureConfiguration})

    // Refresh Clock for dataGeneratorTimer
    clearInterval(this.dataGeneratorTimer);
    this.dataGeneratorTimer = setInterval(this.addTemperatureData, temperatureConfiguration.interval * 1000);
  }

  render() {
    if(!this.state.isMounted) {
      return <p>LOADING</p>
    }

    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' render={(props) => ( <Home temperatureData={this.state.temperatureData}/> )} />
          <Route path='/configuration'  render={(props) => ( <Configuration temperatureConfiguration={this.state.temperatureConfiguration} onSubmitSuccess={this.onSubmitSuccess}/> )} />
        </Switch>
      </div>
    );
  }
}

export default App;
