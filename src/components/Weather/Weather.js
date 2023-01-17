import React from 'react';
import '../../components/reset.css';
import './Weather.css';
import Table from 'react-bootstrap/Table';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherTitle: 'Weather Title',
      weatherText: 'Weather Text',
      weatherImg: 'https://via.placeholder.com/150',
    }
  }

  render() {
    return (
      <>
        <Table bordered hover  size='sm'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Forecast</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.weatherData0.date}</td>
              <td>{this.props.weatherData0.description}</td>
            </tr>
            <tr>
              <td>{this.props.weatherData1.date}</td>
              <td>{this.props.weatherData1.description}</td>
            </tr>
            <tr>
              <td>{this.props.weatherData2.date}</td>
              <td>{this.props.weatherData2.description}</td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }
}

export default Weather;
