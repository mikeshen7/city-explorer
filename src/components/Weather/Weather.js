import React from 'react';
import Table from 'react-bootstrap/Table';

class Weather extends React.Component {
  render() {
    return (
      <>
        <Table bordered hover size='sm' style={{ display: this.props.weatherData.show }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Forecast</th>
            </tr>
          </thead>
          <tbody>
            {this.props.weatherData.forecast.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.date}</td>
                  <td>{element.description}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </>
    );
  }
}

export default Weather;
