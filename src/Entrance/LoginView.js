import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button, TextField } from '@material-ui/core';

import { $login } from '../Auth/state';

const withStore = connect((state) => ({
  processing: state.Activity.processingByTopic['Auth.$login'] || false,
}));

// provides route prcops and rerender on route change, provides shared state and actions as props;
const Connector = (C) => withStore(C);

// eslint-disable-next-line
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
    const { username, password } = this.state;
    // eslint-disable-next-line
    return this.props.dispatch($login(username, password)).catch((error) => console.log('error.. ', error));
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
            onChange={(event) => this.handleInputChange(event)}
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
            onChange={(event) => this.handleInputChange(event)}
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
          <Button component={Link} to="/reset" className="text-white">
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
