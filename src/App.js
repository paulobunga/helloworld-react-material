import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as PropTypes from './common/proptypes';

import * as Logger from './common/logger';

import LandingView from './Entrance/LandingView';
import Entrance from './Entrance';
import Session from './Session';

const withStore = connect((state) => ({
  appReady: state.Shared.appReady,
  appInSession: state.Shared.appInSession,
  authenticated: state.Auth.authenticated,
}));

const propTypes = {
  ...PropTypes.withState,
  appReady: PropTypes.bool.isRequired,
  appInSession: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const Wrapper = (C) => withStore(C);

class App extends Component {
  state = {};

  componentDidCatch(error, info) {
    Logger.error(error, info);
  }

  render() {
    const { appReady, appInSession, authenticated } = this.props;

    if (!appReady || (authenticated && !appInSession)) {
      return <LandingView />;
    }

    return authenticated ? <Session /> : <Entrance />;
  }
}

App.propTypes = propTypes;

export default Wrapper(App);
