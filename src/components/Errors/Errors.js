import React from 'react';

class Errors extends React.Component {
  render() {
    return (
      <>
        <div className='errors'>
          {this.props.locationData.error
            ? <h2> Location Error {this.props.locationData.errorMessage}</h2>
            : null
          }
          {this.props.weatherData.error
            ? <h2> Weather Error {this.props.weatherData.errorMessage}</h2>
            : null
          }
          {this.props.movieData.error
            ? <h2> Movie Error {this.props.movieData.errorMessage}</h2>
            : null
          }
        </div>
      </>
    );
  }
}

export default Errors;
