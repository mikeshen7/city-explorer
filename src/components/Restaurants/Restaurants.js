import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Restaurant from './Restaurant';

class Restaurants extends React.Component {
  render() {
    return (
      <>
        <Carousel style={{ display: this.props.yelpData.show }}>
          {this.props.yelpData.restaurants.map((element, index) => {
            return (
              <Carousel.Item key={index}>
                <Restaurant
                  element={element}
                  index={index}
                />
              </Carousel.Item>
            )
          })}
        </Carousel>
      </>
    );
  }
}

export default Restaurants;
