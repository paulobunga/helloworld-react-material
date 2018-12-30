import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import LandingView from './Entrance/LandingView';
import Entrance from './Entrance';
import Session from './Session';

const withStore = connect((state) => ({
  ready: state.Shared.ready,
  initialized: state.Shared.initialized,
  authenticated: state.Auth.authenticated,
}));

const propTypes = {
  ready: PropTypes.bool.isRequired,
  initialized: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const Wrapper = (C) => withRouter(withStore(C));

class App extends Component {
  state = {};

  render() {
    const { ready, initialized, authenticated } = this.props;

    if (!ready || (authenticated && !initialized)) {
      return <LandingView />;
    }

    return authenticated ? <Session /> : <Entrance />;
  }
}

App.propTypes = propTypes;

export default Wrapper(App);
