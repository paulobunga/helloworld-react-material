import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import LandingView from './Entrance/LandingView';
import Entrance from './Entrance';
import Session from './Session';

const withStore = connect((state) => ({
  appReady: state.Shared.appReady,
  sessionReady: state.Shared.sessionReady,
  authenticated: state.Auth.authenticated,
}));

const propTypes = {
  appReady: PropTypes.bool.isRequired,
  sessionReady: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const Wrapper = (C) => withRouter(withStore(C));

class App extends Component {
  state = {};

  render() {
    const { appReady, sessionReady, authenticated } = this.props;

    if (!appReady || (authenticated && !sessionReady)) {
      return <LandingView />;
    }

    return authenticated ? <Session /> : <Entrance />;
  }
}

App.propTypes = propTypes;

export default Wrapper(App);
