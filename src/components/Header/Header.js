import React from 'react';
import './reset.css';
import './Header.css';


class Header extends React.Component {

  render() {
    return (
      <>
      <header>
        <nav>
          <a className="link" href="/public/index.html" title="link to home">Home</a>
        </nav>
        <h1>{this.props.siteName}</h1>
      </header>
      </>
    );
  }
}

export default Header;
