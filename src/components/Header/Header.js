import React from 'react';
import './reset.css';
import './Header.css';


class Header extends React.Component {

  render() {
    return (
      <>
      <header>
        <h1>{this.props.siteName}</h1>
      </header>
      </>
    );
  }
}

export default Header;
