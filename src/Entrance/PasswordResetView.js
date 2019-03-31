import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button } from '@material-ui/core';

import * as PropTypes from '../common/proptypes';

const withStore = connect((state) => ({}));
const propTypes = {
  ...PropTypes.withRouting,
  ...PropTypes.withState,
};

const Wrapper = (C) => withStore(C);

class PasswordResetView extends Component {
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

PasswordResetView.propTypes = propTypes;

export default Wrapper(PasswordResetView);
