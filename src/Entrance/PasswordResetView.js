import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as PropTypes from '../common/proptypes';

import { STYLE } from '../common/styles';

const withStore = connect((state) => ({}));

const propTypes = {
  ...PropTypes.withRouting,
  ...PropTypes.withState,
};

const Wrapper = (C) => withStore(C);

class PasswordResetView extends Component {
  state = {};

  render() {
    return <div>PasswordResetView</div>;
  }
}

PasswordResetView.propTypes = propTypes;

export default Wrapper(PasswordResetView);
