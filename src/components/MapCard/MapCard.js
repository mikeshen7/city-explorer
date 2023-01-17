import React from 'react';
import '../../components/reset.css';
import './MapCard.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

// Props: city, state, mapCardDisplay
// Returns lat, lon, map card
// TODO: Figure out how to execute handleCityData

class MapCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: [],
      display_name: 'display name',
      lat: 'lat',
      lon: 'lon',
      mapURL: 'https://maps.locationiq.com/v3/staticmap?key=pk.8b1012025f731bfa74f9de021af21e10&center=47.6038321,-122.330062&zoom=13',
      cardDisplay: 'none',
      error: false,
      errorMessage: '',
      MapCardDisplay: 'flex'
    }
  }

  handleCityData = async (event) => {
    event.preventDefault();

    try {
      // API call to get location data
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&limit=1&format=json&city=${this.state.city}&state=${this.state.state}`
      let locationData = await axios.get(url)

      // Save data to state
      this.setState({
        cityData: locationData.data[0],
        display_name: locationData.data[0].display_name,
        lat: locationData.data[0].lat,
        lon: locationData.data[0].lon,
        mapURL: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${locationData.data[0].lat},${locationData.data[0].lon}&zoom=13`,
        cardDisplay: 'flex',
        error: false,
      })

      // Return data to App.js
      this.props.MapCardReturnData(this.state.lat, this.state.lon);

    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message,
        MapCardDisplay: 'none'
      })
    }
  }

  render() {
    return (
      <>
        <Card style={{ display: this.props.MapCardDisplay }} bg='secondary' text='light'>
          <Card.Body>
            <Card.Title onChange={this.handleCityData}>MAP CARD {this.props.city}, {this.props.state}</Card.Title>
            <Card.Text> Longitude: {this.state.lat}</Card.Text>
            <Card.Text>Latitude: {this.state.lon}</Card.Text>
          </Card.Body>
          <Card.Img variant="bottom" src={this.state.mapURL} />
        </Card>

        {
          this.state.error
            ? <h2>{this.state.errorMessage}</h2>
            : null
        }
      </>
    );
  }
}

export default MapCard;

