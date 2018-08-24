import React, { Component } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { COLOR } from '../common/styles';

import LoginView from './LoginView';
import SignupView from './SignupView';
import ResetView from './ResetView';

import LOGO from '../assets/logo.png';

// eslint-disable-next-line
class Entrance extends Component {
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
          <img src={LOGO} alt="logo" style={{ marginBottom: 16 }} />

          <Switch>
            <Route exact path="/login" component={LoginView} />
            <Route exact path="/signup" component={SignupView} />
            <Route exact path="/reset" component={ResetView} />
            <Redirect exact from="/*" to="/login" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Entrance;
