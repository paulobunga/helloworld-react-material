import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as PropTypes from '../common/proptypes';

import * as Dialog from '../Shared/Dialog';

import { $fetchProfile } from '../Auth/state';

const withStore = connect((state) => ({
  processing: state.Activity.processing,
  user: state.Auth.user,
}));

const propTypes = {
  ...PropTypes.withRouting,
  ...PropTypes.withState,
  processing: PropTypes.bool.isRequired,
  user: PropTypes.User.isRequired,
};

const Wrapper = (C) => withStore(C);

class ProfileView extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch($fetchProfile()).catch((error) => Dialog.toast(Dialog.FAILURE, error.message));
  }

  render() {
    const { user, processing } = this.props;

    return <div>ProfileView</div>;
  }
}

ProfileView.propTypes = propTypes;

export default Wrapper(ProfileView);
