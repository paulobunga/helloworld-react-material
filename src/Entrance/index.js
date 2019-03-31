import React, { Component } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { COLOR } from '../common/styles';

import LogoImage from '../assets/logo.png';

import LoginView from './LoginView';
import SignupView from './SignupView';
import PasswordResetView from './PasswordResetView';

class Entrance extends Component {
  state = {};

  render() {
    return (
      <div style={{ backgroundColor: `${COLOR.primary}` }} className="-x-fit">
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <img src={LogoImage} alt="logo" style={{ marginBottom: 16 }} />

          <Switch>
            <Route exact path="/login" component={LoginView} />
            <Route exact path="/signup" component={SignupView} />
            <Route exact path="/password-reset" component={PasswordResetView} />
            <Redirect exact from="/*" to="/login" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Entrance;
