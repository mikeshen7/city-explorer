import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import Header from '../Header/Header';
import axios from 'axios';
// import { eventWrapper } from '@testing-library/user-event/dist/utils';


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
    console.log(event.target);

    // save form data of city and state
    this.setState({
      city: event.target.elements.city.value,
      state: event.target.elements.state.value,
    })

    // API call to get location data
    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&limit=1&format=json&city=${this.state.city}&state=${this.state.state}`

    let locationData = await axios.get(url)

    this.setState({
      cityData: locationData.data[0],
      display_name: locationData.data[0].display_name,
      lattitude: locationData.data[0].lat,
      longitude:  locationData.data[0].lon,
    })

  }





  render() {
    return (
      <>
        <form onSubmit={this.handleCityData}>
          <label htmlFor="city">City</label>
          <input id="city" type="text" onInput={this.handleCityInput}></input>
          <label htmlFor="state">State</label>
          <input id="state" type="text" onInput={this.handleStateInput}></input>
          <button type='submit'>Explore</button>
        </form>

        <h2>{this.state.display_name}</h2>
        <h2>{this.state.city}</h2>
        <h2>{this.state.state}</h2>
        <h2>{this.state.lattitude}</h2>
        <h2>{this.state.longitude}</h2>
      </>
    );
  }
}

export default App;
