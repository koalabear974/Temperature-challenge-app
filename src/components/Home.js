import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

// import './style/Home.css';
import Utils from '../utils/Utils.js';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: this.generateTemperatureChartData(),
    }

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      // Remove legends and change tooltips content
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.yLabel;
          }
        }
      },
      // Define scale labels
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Time'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Temperature'
          }
        }]
      }
    }

    this.generateTemperatureChartData = this.generateTemperatureChartData.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    let chartData = this.generateTemperatureChartData();
    this.setState({chartData: chartData});
  }

  generateTemperatureChartData() {
    let filterFunction = (item) => { return item.temperature > 0 } // TODO: Filter for last half-hour
    let chartData = Utils.generateLineChartData(this.props.temperatureData, {labelKey: "timestamp", valueKey: "temperature"}, filterFunction);
    return chartData;
  }

  render() {
    return (
      <div className="Home">
        <header className="Home__header mb-3">
          <h2>Temperature Chart</h2>
          <small>Here is temperature record of Berlin in the last 30 minutes </small>
        </header>
        <div className="Home__Temperature-Chart">
          <Line data={this.state.chartData} options={this.chartOptions} />
        </div>
      </div>
    );
  }
}

export default Home;
