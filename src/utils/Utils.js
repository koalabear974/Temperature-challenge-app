import _ from 'lodash';

class Utils {
  getLatestApiData() {
    let apiUrl = new URL("http://api.openweathermap.org/data/2.5/weather");
    let params = {
      APPID: "95530471b25c2d7b5d08839d0704db60", // TODO: Hide Api key
      q: "Berlin",
      units: "metric",
    };

    // Stringify params in url
    Object.keys(params).forEach(key => apiUrl.searchParams.append(key, params[key]));

    var that = this;
    let latestData = {}

    return fetch(apiUrl).then((resp) => resp.json())
    .then(function(data) {
      if(data.cod !== 200) {
        latestData = that.generateRandomTemperature({maxTemp: 30, minTemp: 10});
      }else {
        latestData = {
          timestamp: that.formatUnixTimestamp(data.dt),
          temperature: data.main.temp
        }
      }
      return [latestData];
    })
  }

  generateRandomTemperature(limits) {
    return {
      timestamp: this.formatUnixTimestamp(),
      temperature: (Math.floor(((Math.random() * ( limits.maxTemp - limits.minTemp + 1) + limits.minTemp) * 100)) / 100),
    };
  }

  generateLineChartData(dataArray, keys, filterFunction = null) {
    if (filterFunction) {
      dataArray = _.filter(dataArray, filterFunction)
    }

    let chartData = {
      labels: _.map(dataArray, keys.labelKey),
      datasets: [{ // TODO: Manage multiple datasets
        label: keys.valueKey,
        backgroundColor: "blue",
        borderColor: "blue",
        data: _.map(dataArray, keys.valueKey),
        fill: false,
      }]
    };

    return chartData;
  }

  formatUnixTimestamp(unixTimestamp = null) {
    let date = unixTimestamp ? new Date(unixTimestamp * 1000) : new Date();
    let dateString = date.toLocaleTimeString();
    return dateString.substr(0, dateString.length-3);
  }
}

export default new Utils();
