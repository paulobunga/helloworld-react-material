import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button } from '@material-ui/core';

const withStore = connect((state) => ({}));

// provides route prcops and rerender on route change, provides shared state and actions as props;
const Connector = (C) => withRouter(withStore(C));

// eslint-disable-next-line
class SignupView extends Component {
  render() {
    return (
      <div>
        <div>
          <Button href="/login" className="text-white">
            Login
          </Button>
          <Button href="/singnup" className="text-white">
            Singnup
          </Button>
        </div>
      </div>
    );
  }
}

export default Connector(SignupView);
