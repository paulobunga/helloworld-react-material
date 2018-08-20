import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import Entrance from './Entrance';
import Session from './Session';

const withStore = connect((state) => ({
  authenticated: state.Auth.authenticated,
}));

// provides route prcops and rerender on route change, provides shared state and actions as props;
const Connector = (C) => withRouter(withStore(C));

// eslint-disable-next-line
class App extends Component {
  render() {
    const { authenticated } = this.props;

    return (
      <div className="-x-fit">
        {authenticated && <Session />}

        {!authenticated && <Entrance />}
      </div>
    );
  }
}

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default Connector(App);
