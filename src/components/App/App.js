import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import Header from '../Header/Header';
import UserForm from '../UserForm/UserForm';
import Location from '../Location/Location';
import Weather from '../Weather/Weather';
import Movies from '../Movies/Movies';
import Errors from '../Errors/Errors';

// ********* Global Variables
let lat;
let lon;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      siteName: "City Explorer",
      city: '',

      locationData: {
        show: 'none',
        error: false,
        errorMessage: '',
      },

      weatherData: {
        forecast: [],
        show: 'none',
        error: false,
        errorMessage: '',
      },

      movieData: {
        movies: [],
        show: 'none',
        error: false,
        errorMessage: '',
      },
    }
  }

  handleSubmit = async (event, city) => {
    event.preventDefault();
    await this.getLocation(city);
    this.getWeather();
    await this.getMovies(city);
  }

  getLocation = async (city) => {
    try {
      // API call to get location data
      let url = `${process.env.REACT_APP_SERVER}/location?city=${city}`
      let tempData = await axios.get(url);
      tempData = tempData.data;
      this.setState({
        locationData: tempData,
      })

      // save to global variable so I can use it elsewhere
      lat = tempData.lat;
      lon = tempData.lon;

    } catch (error) {
      this.setState({
        locationData: {
          lat: '',
          lon: '',
          display_name: '',
          mapUrl: '',
          show: 'none',
          error: true,
          errorMessage: error.message,
          errorCode: error.response.status,
        },
      })
      lat = '';
      lon = '';
    }
  }

  getWeather = async () => {
    try {
      // API call to get location data
      let url = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`
      let tempData = await axios.get(url);
      this.setState({
        weatherData: tempData.data,
      })

    } catch (error) {
      this.setState({
        weatherData: {
          forecast: [],
          show: 'none',
          error: true,
          errorMessage: error.message,
          errorCode: error.response.status,
        },
      })
    }
  }

  getMovies = async (city) => {
    try {
      // API call to get location data
      let url = `${process.env.REACT_APP_SERVER}/movies?city=${city}`;
      let tempData = await axios.get(url);
      tempData = tempData.data;
      this.setState({
        movieData: tempData,
      })

    } catch (error) {
      this.setState({
        movieData: {
          movies: [],
          show: 'none',
          error: true,
          errorMessage: error.message,
          errorCode: error.response.status,
        },
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
          <UserForm handleSubmit={this.handleSubmit} />

          <Errors
            locationData={this.state.locationData}
            weatherData={this.state.weatherData}
            movieData={this.state.movieData}
          />

          <Location locationData={this.state.locationData} />
          <Weather weatherData={this.state.weatherData} />
          <Movies movieData={this.state.movieData} />
        </main>
      </>
    );
  }
}

export default App;
     