import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button } from '@material-ui/core';

const withStore = connect((state) => ({
  ready: state.Activity.ready,
  authenticated: state.Auth.authenticated,
  user: state.Auth.user,
}));

// provides route prcops and rerender on route change, provides shared state and actions as props;
const Connector = (C) => withStore(C);

// eslint-disable-next-line
class SignupView extends Component {
  render() {
    return (
      <div>
        <div>
          <Button component={Link} to="/login" className="text-white">
            Login
          </Button>
          <Button component={Link} to="/reset" className="text-white">
            Reset
          </Button>
        </div>
      </div>
    );
  }
}

export default Connector(SignupView);
