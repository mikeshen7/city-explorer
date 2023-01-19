import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

class Movies extends React.Component {
  render() {
    return (
      <>
        <Carousel style={{ display: this.props.movieData.show }}>
          {this.props.movieData.movies.map((element, index) => {
            return (
              <Carousel.Item key={index}>
                <img
                  src={element.image_url}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>{element.title}</h3>
                  <p>Released on {element.released_on}</p>
                  <p>Average Votes: {element.average_votes}</p>
                  <p>Total Votes: {element.total_votes}</p>
                  <p>Popularity: {element.popularity}</p>
                  <p>{element.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            )
          })}
        </Carousel>
      </>
    );
  }
}

export default Movies;
