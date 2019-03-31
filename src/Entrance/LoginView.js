import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button, TextField } from '@material-ui/core';

import * as PropTypes from '../common/proptypes';

import * as Dialog from '../Shared/Dialog';

import * as $validate from '../common/validate';

import { $login } from '../Auth/state';

const withStore = connect((state) => ({
  processing: state.Activity.processingByOperation['Auth.login'] || false,
}));

const propTypes = {
  ...PropTypes.withRouting,
  ...PropTypes.withState,
  processing: PropTypes.bool.isRequired,
};

const Wrapper = (C) => withStore(C);

class LoginView extends Component {
  state = {
    username: '',
    password: '',
    error: {
      username: null,
      password: null,
    },
  };

  login() {
    const { dispatch } = this.props;

    dispatch($login(this.state.username, this.state.password)).catch((error) => Dialog.toast(Dialog.FAILURE, error.message));
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { username, password, error } = this.state;
    const { processing } = this.props;

    return (
      <div>
        <form style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
          <TextField
            label="Email"
            name="username"
            autoComplete="current-username"
            margin="dense"
            value={username}
            error={!!error.username}
            helperText={error.username}
            onChange={(e) => this.handleInputChange(e)}
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            margin="dense"
            value={password}
            error={!!error.password}
            helperText={error.password}
            onChange={(e) => this.handleInputChange(e)}
          />
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
          <Button component={Link} to="/signup" className="text-white">
            Signup
          </Button>
          <Button component={Link} to="/password-reset" className="text-white">
            Reset
          </Button>
        </div>
      </div>
    );
  }
}

LoginView.propTypes = propTypes;

export default Wrapper(LoginView);
