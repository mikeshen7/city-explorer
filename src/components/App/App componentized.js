import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Header from '../Header/Header';
import UserForm from '../UserForm/UserForm';
import MapCard from '../MapCard/MapCard';
import Weather from '../Weather/Weather';
import Test from '../MapCard/MapCard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      siteName: "City Explorer",
      city: 'temp city',
      state: 'temp state',
      cityData: [],
      display_name: '',
      lat: '',
      lon: '',
      cardDisplay: 'flex',
      error: false,
      errorMessage: '',

      WeatherCardDisplay: 'flex', // change this from flex to none to hide
      MapCardDisplay: 'flex',
    }
  }

  // this function needs to call all other Component functions to process data because this has the form input.
  UserFormReturnData = (city, state) => {
    this.setState({
      city: city,
      state: state,
    })

    let temp = Test;
  }

  MapCardReturnData = (lat, lon) => {
    this.setState({
      lat: lat,
      lon: lon,
    })
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

    try {
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
        error: false,
      })
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message,
        cardDisplay: 'none'
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
          <h2>{this.state.city}</h2>
          <h2>{this.state.state}</h2>

          <UserForm UserFormReturnData={this.UserFormReturnData} />

          <MapCard
            city={this.state.city}
            state={this.state.state}
            MapCardDisplay={this.state.MapCardDisplay}
          />

          <Weather
            WeatherCardDisplay={this.state.WeatherCardDisplay}
          />

        </main>
      </>
    );
  }
}

export default App;
