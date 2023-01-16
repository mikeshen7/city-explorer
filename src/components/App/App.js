import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Header from '../Header/Header'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      siteName: "City Explorer",
      city: 'Placeholder',
      state: 'Placeholder',
      cityData: [],
      display_name: 'Placeholder',
      lattitude: 'Placeholder',
      longitude: 'Placeholder',
      mapURL: 'https://maps.locationiq.com/v3/staticmap?key=pk.8b1012025f731bfa74f9de021af21e10&center=47.6038321,-122.330062&zoom=13',
      cardDisplay: 'none',
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
      mapURL: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${locationData.data[0].lat},${locationData.data[0].lon}&zoom=13`,
      cardDisplay: 'flex',
    })

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

            <Form.Group controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="Enter state" onInput={this.handleStateInput} />
            </Form.Group>

            <Button onClick={this.handleCityData} variant="primary">Explore!</Button>
          </Form>

          <Card style={{ display: this.state.cardDisplay }} bg='secondary' text='light'>
            <Card.Body>
              <Card.Title>{this.state.display_name}</Card.Title>
              <Card.Text> Longitude: {this.state.lattitude}</Card.Text>
              <Card.Text>Latitude: {this.state.longitude}</Card.Text>
            </Card.Body>
            <Card.Img variant="bottom" src={this.state.mapURL}/>
          </Card>
        </main>
      </>
    );
  }
}

export default App;
