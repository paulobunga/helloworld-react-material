import * as Logger from '../common/logger';
import * as StateHelper from '../common/state.helper';
import * as FetchHelper from '../common/fetch.helper';

import * as Activity from '../Shared/Activity.state';
import { $ready, $initialize } from '../Shared/state';

import { AuthService } from './Auth.service';

export const MODULE = 'Auth';

/**
 * Log in
 */

const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';

function loginRequest() {
  return {
    type: AUTH_LOGIN_REQUEST,
  };
}

const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';

function loginSuccess({ user, ...rest }) {
  return (dispatch) => {
    dispatch({
      type: AUTH_LOGIN_SUCCESS,
      user,
      ...rest,
    });

    return { user };
  };
}

const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';

function loginFailure(error) {
  return (dispatch) => {
    dispatch({
      type: AUTH_LOGIN_FAILURE,
    });

    dispatch(Activity.$message(error.message));

    throw error;
  };
}

export function $login(username, password) {
  return (dispatch) => {
    dispatch(Activity.$processing(MODULE, $login.name, { message: 'Logging in ...' }));
    dispatch(loginRequest());

    return AuthService.login(username, password)
      .then((result) => dispatch(loginSuccess(result)))
      .then((result) => dispatch($initialize()).then(() => result))
      .catch((error) => dispatch(loginFailure(error)))
      .finally(() => dispatch(Activity.$done(MODULE, $login.name)));
  };
}

/**
 * Logout
 */

const AUTH_LOGOUT = 'AUTH_LOGOUT';

export function $logout() {
  return (dispatch) => {
    return AuthService.logout().then(() => dispatch({
      type: AUTH_LOGOUT,
    }));
  };
}

/**
 * Sign up
 */

const AUTH_SIGNUP_REQUEST = 'AUTH_SIGNUP_REQUEST';

function signupRequest() {
  return {
    type: AUTH_SIGNUP_REQUEST,
  };
}

const AUTH_SIGNUP_SUCCESS = 'AUTH_SIGNUP_SUCCESS';

function signupSuccess({ user, ...rest }) {
  return (dispatch) => {
    dispatch({
      type: AUTH_SIGNUP_SUCCESS,
      user,
      ...rest,
    });

    return { user };
  };
}

const AUTH_SIGNUP_FAILURE = 'AUTH_SIGNUP_FAILURE';

function signupFailure(error) {
  return (dispatch) => {
    dispatch({
      type: AUTH_SIGNUP_FAILURE,
    });

    dispatch(Activity.$message(error.message));

    throw error;
  };
}

export function $signup(payload) {
  return (dispatch) => {
    dispatch(Activity.$processing(MODULE, $signup.name, { message: 'Singing up ...' }));
    dispatch(signupRequest());

    return AuthService.signup(payload)
      .then((result) => dispatch(signupSuccess(result)))
      .catch((error) => dispatch(signupFailure(error)))
      .finally(() => dispatch(Activity.$done(MODULE, $signup.name)));
  };
}

/**
 * Account Recovery
 */

const AUTH_RECOVERY_REQUEST = 'AUTH_RECOVERY_REQUEST';

function initiateAccountRecoveryRequest() {
  return {
    type: AUTH_RECOVERY_REQUEST,
  };
}

const AUTH_RECOVERY_SUCCESS = 'AUTH_RECOVERY_SUCCESS';

function initiateAccountRecoverySuccess({ ...rest }) {
  return (dispatch) => {
    dispatch({
      type: AUTH_RECOVERY_SUCCESS,
      ...rest,
    });

    return { ...rest };
  };
}

const AUTH_RECOVERY_FAILURE = 'AUTH_RECOVERY_FAILURE';

function initiateAccountRecoveryFailure(error) {
  return (dispatch) => {
    dispatch({
      type: AUTH_RECOVERY_FAILURE,
    });

    dispatch(Activity.$message(error.message));

    throw error;
  };
}

export function $initiateAccountRecovery(email) {
  return (dispatch) => {
    dispatch(Activity.$processing(MODULE, $initiateAccountRecovery.name, { message: 'Singing up ...' }));
    dispatch(initiateAccountRecoveryRequest());

    return AuthService.initiateAccountRecovery(email)
      .then((result) => dispatch(initiateAccountRecoverySuccess(result)))
      .catch((error) => dispatch(initiateAccountRecoveryFailure(error)))
      .finally(() => dispatch(Activity.$done(MODULE, $initiateAccountRecovery.name)));
  };
}

/**
 * Exports
 */

export { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT };

/**
 * Reducer
 */

export function reducer(
  state = {
    authenticated: false,
    user: null,
  },
  action,
) {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        user: null,
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        user: action.user,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        authenticated: false,
        user: null,
      };
    default:
      return state;
  }
}

export function persister({ authenticated, user }) {
  return {
    authenticated,
    user,
  };
}

export async function initializer({ dispatch, getState }) {
  FetchHelper.events.on('failure', (error, response) => {
    if (AuthService.isAuthenticated() && response.status === 401) {
      dispatch($login(AuthService.username, AuthService.password)).catch((error) => {
        dispatch(Activity.$toast('failure', error.message));
        dispatch($logout());
      });
    }
  });

  await AuthService.initialize();

  if (AuthService.isAuthenticated()) {
    dispatch($initialize()).catch((error) => dispatch(Activity.$toast('failure', error.message)));
  } else if (getState().Auth.authenticated) {
    dispatch({
      type: AUTH_LOGOUT,
    });
  }

  dispatch($ready());
}
