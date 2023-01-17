import React from 'react';
import '../../components/reset.css';
import './UserForm.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

// Form which takes in City and State information
// Props: UserFormReturnData()
// Returns city and state

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      state: '',
      MapCardDisplay: 'flex',
      hello: 'test Hello',
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
    this.props.UserFormReturnData(this.state.city, this.state.state);

    try {
      let url = `${process.env.REACT_APP_SERVER}/hello?firstName=Mike&lastName=Shen`;
      console.log(url);
      let serverData = await axios.get(url)

      this.setState({
        hello: serverData,
      })


    } catch (error) {
      console.log(error.messsage);
    }



    // TODO: delete this later after getting MapCard to work
    // try {
    //   // API call to get location data
    //   let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&limit=1&format=json&city=${this.state.city}&state=${this.state.state}`
    //   let locationData = await axios.get(url)

    //   // Save data to state
    //   this.setState({
    //     cityData: locationData.data[0],
    //     display_name: locationData.data[0].display_name,
    //     lat: locationData.data[0].lat,
    //     lon: locationData.data[0].lon,
    //     mapURL: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${locationData.data[0].lat},${locationData.data[0].lon}&zoom=13`,
    //     MapCardDisplay: 'flex',
    //     error: false,
    //   })

    //   // Return data to App.js
    //   this.props.MapCardReturnData(this.state.lat, this.state.lon);

    // } catch (error) {
    //   this.setState({
    //     error: true,
    //     errorMessage: error.message,
    //     MapCardDisplay: 'none'
    //   })
    // }
    // TODO: delete ABOVE later after getting MapCard to work








  }

  render() {
    return (
      <>
        <h1 style={{ color: 'white' }}>{this.state.hello}</h1>
        <Form onSubmit={this.handleCityData} className="form">
          <Form.Group controlId="city">
            <Form.Label>City - FORM COMPONENT</Form.Label>
            <Form.Control type="text" placeholder="Enter city" onInput={this.handleCityInput} />
          </Form.Group>

          <Form.Group controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="Enter state" onInput={this.handleStateInput} />
          </Form.Group>

          <Button onClick={this.handleCityData} variant="primary">Explore!</Button>
        </Form>










        <Card style={{ display: this.state.MapCardDisplay }} bg='secondary' text='light'>
          <Card.Body>
            <Card.Title>{this.state.city}, {this.state.state}</Card.Title>
            <Card.Text> Longitude: {this.state.lat}</Card.Text>
            <Card.Text>Latitude: {this.state.lon}</Card.Text>
          </Card.Body>
          <Card.Img variant="bottom" src={this.state.mapURL} />
        </Card>







      </>
    );
  }
}

export default UserForm;
