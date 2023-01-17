import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Header from '../Header/Header';
import Weather from '../Weather/Weather';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      siteName: "City Explorer",
      city: '',
      cityData: [],
      display_name: '',
      lattitude: '',
      longitude: '',
      mapURL: '',
      cardDisplay: 'none',

      weatherData0: '',
      weatherData1: '',
      weatherData2: '',
      weatherDataValid: false,
      weatherErrorMessage: '',

      error: false,
      errorMessage: '',
    }
  }

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value,
    })
  }

  handleCityData = async (event) => {
    event.preventDefault();

    try {
      // API call to get location data
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&limit=1&format=json&q=${this.state.city}`
      let locationData = await axios.get(url)

      // Save data to state
      this.setState({
        cityData: locationData.data[0],
        display_name: locationData.data[0].display_name,
        lattitude: locationData.data[0].lat,
        longitude: locationData.data[0].lon,
        mapURL: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${locationData.data[0].lat},${locationData.data[0].lon}&zoom=13`,
        cardDisplay: 'flex',
        error: false,
      })

      // Get Weather Data
      this.getWeatherData(locationData.data[0].lat, locationData.data[0].lon);

    } catch (error) {
      this.setState({
        error: true,
        errorMessage: 'Map error: ' + error.message,
        cardDisplay: 'none'
      })
    }
  }

  getWeatherData = async (lat, lon) => {
    try {
      let url = `http://localhost:3001/weather?city=${this.state.city}&lat=${lat}&lon=${lon}`;
      console.log(url);
      let data = await axios.get(url);
      console.log(data.data[0]);
      this.setState({
        weatherData0: data.data[0],
        weatherData1: data.data[1],
        weatherData2: data.data[2],
        weatherCardDisplay: '',
        weatherDataValid: true,
        weatherErrorMessage: '',
      })
    } catch (error) {
      this.setState({
        weatherDataValid: false,
        weatherErrorMessage: 'Weather error: ' + error.message,
      })
    }
  }

  render() {
    return (
      <>
        <Header
          siteName={this.state.siteName}
        />
        <main>
          <Form onSubmit={this.handleCityData} className="form">
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Enter city" onInput={this.handleCityInput} />
            </Form.Group>

            <Button onClick={this.handleCityData} variant="primary">Explore!</Button>
            {
              this.state.error
                ? <h2>{this.state.errorMessage}</h2>
                : null
            }
            <h2>{this.state.weatherErrorMessage}</h2>


          </Form>

          <Card style={{ display: this.state.cardDisplay }} bg='secondary' text='light'>
            <Card.Body>
              <Card.Title>{this.state.display_name}</Card.Title>
              <Card.Text> Longitude: {this.state.lattitude}</Card.Text>
              <Card.Text>Latitude: {this.state.longitude}</Card.Text>
            </Card.Body>
            <Card.Img variant="bottom" src={this.state.mapURL} />
          </Card>

          {
            this.state.weatherDataValid
              ? <Weather
                weatherData0={this.state.weatherData0}
                weatherData1={this.state.weatherData1}
                weatherData2={this.state.weatherData2}
              />
              : null
          }
        </main>

      </>
    );
  }
}

export default App;