import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

class Restaurant extends React.Component {
  render() {
    return (
      <>
        <img
          src={this.props.element.image_url}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>{this.props.element.name}</h3>
          <p>Rating: {this.props.element.rating}</p>
          <p>Price: {this.props.element.price}</p>
          <p>Phone: {this.props.element.phone}</p>
          <p>URL: {this.props.element.url}</p>
        </Carousel.Caption>
      </>
    );
  }
}

export default Restaurant;
