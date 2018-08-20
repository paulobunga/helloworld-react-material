import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button, TextField } from '@material-ui/core';

import { $login } from './Auth.state';

const withStore = connect((state) => ({
  processing: state.Activity.processingByTopic['Auth.$login'] || false,
}));

// provides route prcops and rerender on route change, provides shared state and actions as props;
const Connector = (C) => withRouter(withStore(C));

// eslint-disable-next-line
class LoginView extends Component {
  state = {
    username: process.env.NODE_ENV === 'development' ? 'test@example.com' : '',
    password: process.env.NODE_ENV === 'development' ? 'test' : '',
  };

  login() {
    // TODO: ADD FORM VALIDATION
    const { username, password } = this.state;

    return this.props.dispatch($login(username, password)).catch((error) => console.log('error.. ', error));
    // .catch((error) => this.props.dispatch(Activity.$toast('failure', error.message)));
  }

  render() {
    const { username, password } = this.state;
    const { processing } = this.props;

    return (
      <div>
        <form style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
          <TextField label="Email" id="username" margin="dense" value={username} />
          <TextField label="Password" type="password" id="password" margin="dense" value={password} />
        </form>

        <Button
          className="btn-accent -fill-width"
          style={{ marginTop: 8 }}
          disabled={processing}
          onClick={() => this.login()}
        >
          Login
        </Button>

        <div style={{ marginTop: 16 }}>
          <Button href="/signup" className="text-white">
            Signup
          </Button>
          <Button href="/reset" className="text-white">
            Reset
          </Button>
        </div>
      </div>
    );
  }
}

LoginView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  processing: PropTypes.bool.isRequired,
};

export default Connector(LoginView);
