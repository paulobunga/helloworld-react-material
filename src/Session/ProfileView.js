import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as PropTypes from '../common/proptypes';

// import * as Activity from '../Shared/Activity.state';

// import { $fetchProfile } from '../Auth/state';

const withStore = connect((state) => ({
  processing: state.Activity.processing,
  user: state.Auth.user,
}));

const propTypes = {
  dispatch: PropTypes.dispatch.isRequired,
  processing: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

const Wrapper = (C) => withStore(C);

class ProfileView extends Component {
  componentDidMount() {
    // this.props
    //   .dispatch($fetchProfile())
    //   .catch((error) => this.props.dispatch(Activity.$toast('failure', error.message)));
  }

  render() {
    const { user, processing } = this.props;

    return <div>Profile ... </div>;
  }
}

const WrappedProfileView = Wrapper(ProfileView);

WrappedProfileView.propTypes = {
};

ProfileView.propTypes = {
  ...WrappedProfileView.propTypes,
  ...propTypes,
};

export default WrappedProfileView;
