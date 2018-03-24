# Temperature app challenge

This app was made in the case of a coding challenge.
It have been generated via the create-react-app sample.

## Installation

To setup the project:
- First duplicate the repository
- Run `npm install`
- Run `npm start`

## Technical choice

Api calls: I used the new fetch and promise function of javascript
Chart: react-chart-js-2 is a react package for Chart.js that animate an take care of data reload
Formatting: Utils.js is used to format api response, generate chart.js data and format timestamps
Application: React router and BEM styleguide are now go-to solution for any react application

## TODO

You can find two todo in the code:
- Hide the API key for the open weather api call, as it's only one free key I didn't lose time to hide it.
- Manage multiple datasets in the generateChartData. As there was only was dataType to display there was no need to manage multiple datasets properly.

## Next Step

The best way to manage the temperatureData and temperatureConfiguration would have been to use Redux.
I would have also created a subcomponent TemperatureManager which would have the function for the timer and everything related to the temperature.
