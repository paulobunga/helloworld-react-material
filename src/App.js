import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import LandingView from './Entrance/LandingView';
import Entrance from './Entrance';
import Session from './Session';

const withStore = connect((state) => ({
  ready: state.Shared.ready,
  authenticated: state.Auth.authenticated,
}));

const Wrapper = (C) => withRouter(withStore(C));

class App extends Component {
  state = {};

  render() {
    const { ready, authenticated } = this.props;

    if (!ready) {
      return <LandingView />;
    }

    return authenticated ? <Session /> : <Entrance />;
  }
}

App.propTypes = {
  ready: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default Wrapper(App);
