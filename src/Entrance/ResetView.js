import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button } from '@material-ui/core';

const withStore = connect((state) => ({}));

const Wrapper = (C) => withStore(C);

class SignupView extends Component {
  state = {};

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

export default Wrapper(SignupView);
