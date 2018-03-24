import React, { Component } from 'react';
// import './style/Configuration.css';

class Configuration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitted: false,
      temperatureConfiguration: this.props.temperatureConfiguration,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (e) {
    var temperatureConfiguration = this.state.temperatureConfiguration
    let eventTarget = e.target
    eventTarget.setCustomValidity("")

    temperatureConfiguration[eventTarget.name] = eventTarget.value

    this.setState({temperatureConfiguration: temperatureConfiguration, isSubmitted: false})
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.temperatureConfiguration.minTemp > this.state.temperatureConfiguration.maxTemp) {
      var minTempInput = document.getElementsByName("minTemp")[0];
      minTempInput.setCustomValidity("Should be less than the maximum temperature")
      return;
    }

    this.setState({isSubmitted: true});
    this.props.onSubmitSuccess(this.state.temperatureConfiguration);
  }

  render() {
    let submitButtonClass = this.state.isSubmitted ? "btn btn-success float-right" : "btn btn-primary float-right";

    return (
      <div className="Configuration">
        <header className="Configuration__header mb-3">
          <h2>Data generator configuration</h2>
          <small>Here you can modify the random data generation for the chart</small>
        </header>
        <div className="Configuration__form-container">
          <form onSubmit={this.handleSubmit}>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Minimum temperature</label>
                  <input
                    type="number"
                    className="form-control"
                    name="minTemp"
                    min="-50" max="200"
                    onChange={this.handleChange}
                    value={this.state.temperatureConfiguration.minTemp} />
                  <small className="form-text text-muted">Minimum value is -50.</small>
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <label>Maximum temperature</label>
                  <input
                    type="number"
                    className="form-control"
                    name="maxTemp"
                    min="-50" max="200"
                    onChange={this.handleChange}
                    value={this.state.temperatureConfiguration.maxTemp} />
                  <small className="form-text text-muted">Maximum value is 200.</small>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Interval of time</label>
              <div className="input-group mb-2">
                <input
                  type="number"
                  className="form-control"
                  name="interval"
                  min="1" max="600"
                  onChange={this.handleChange}
                  value={this.state.temperatureConfiguration.interval} />
                <div className="input-group-append">
                  <div className="input-group-text">Second(s)</div>
                </div>
              </div>
            </div>
            <button type="submit" className={submitButtonClass}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Configuration;
