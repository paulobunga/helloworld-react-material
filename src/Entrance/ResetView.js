import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button } from '@material-ui/core';

const withStore = connect((state) => ({}));

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
          <Button component={Link} to="/singnup" className="text-white">
            Singnup
          </Button>
        </div>
      </div>
    );
  }
}

export default Connector(SignupView);
