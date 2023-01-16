import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      siteName: "City Explorer",
      city: '',
      state: '',
      cityData: [],
      display_name: '',
      lattitude: '',
      longitude: '',
      error: false,
      errorMessage: '',
    }
  }

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value,
    })
  }

  handleStateInput = (event) => {
    this.setState({
      state: event.target.value,
    })
  }

  handleCityData = async (event) => {
    event.preventDefault();

    // API call to get location data
    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&limit=1&format=json&city=${this.state.city}&state=${this.state.state}`
    let locationData = await axios.get(url)

    // Save data to state
    this.setState({
      cityData: locationData.data[0],
      display_name: locationData.data[0].display_name,
      lattitude: locationData.data[0].lat,
      longitude: locationData.data[0].lon,
    })

  }





  render() {
    return (
      <>
        <Form onSubmit={this.handleCityData}>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter city" onInput={this.handleCityInput} />
          </Form.Group>

          <Form.Group controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="Enter state" onInput={this.handleStateInput}/>
          </Form.Group>

          <Button onClick={this.handleCityData} variant="primary">Explore!</Button>
        </Form>

        <h2>Location: {this.state.display_name}</h2>
        <h2>Longitude: {this.state.lattitude}</h2>
        <h2>Latitude: {this.state.longitude}</h2>
      </>
    );
  }
}

export default App;
