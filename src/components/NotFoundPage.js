import React, { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';

class NotFoundPage extends Component {
  render() {
    return (
      <Fragment>
        <h1 className='center'>404 / Not Found</h1>
        <Link to="/">Return to Home Page</Link>
      </Fragment>
    );
  }
}

export default NotFoundPage