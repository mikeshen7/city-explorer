import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import Header from '../Header/Header';
import UserForm from '../UserForm/UserForm';
import Location from '../Location/Location';
import Weather from '../Weather/Weather';
import Movies from '../Movies/Movies';

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
      },

      weatherData: {
        forecast: [],
        show: 'none',
      },

      movieData: {
        movies: [],
        show: 'none',
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
      let url = `https://city-explorer-api-mike.onrender.com/location?city=${city}`
      console.log(url);
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
      let url = `https://city-explorer-api-mike.onrender.com/weather?lat=${lat}&lon=${lon}`
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
      let url = `https://city-explorer-api-mike.onrender.com/movies?city=${city}`;
      let tempData = await axios.get(url);
      tempData = tempData.data;
      this.setState({
        movieData: tempData,
      })
      console.log(tempData);

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

          <div className='errors'>
            {this.state.locationData.error
              ? <h2> Location Error {this.state.locationData.errorMessage}</h2>
              : null
            }
            {this.state.weatherData.error
              ? <h2> Weather Error {this.state.weatherData.errorMessage}</h2>
              : null
            }
            {this.state.movieData.error
              ? <h2> Movie Error {this.state.movieData.errorMessage}</h2>
              : null
            }
          </div>

          <Location locationData={this.state.locationData} />
          <Weather weatherData={this.state.weatherData} />
          <Movies movieData={this.state.movieData} />
        </main>

      </>
    );
  }
}

export default App;

//           