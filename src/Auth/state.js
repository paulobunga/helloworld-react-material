import * as StateHelper from '../common/state.helper';

import * as Activity from '../Shared/Activity.state';

import { AuthService } from './Auth.service';

/**
 * Module Name
 */

export const MODULE = 'Auth';

/**
 * Initial State
 */

const INITIAL_STATE = {
  authenticated: false,
  user: null,
};

/**
 * Reset
 */

const reset = StateHelper.createSimpleOperation(MODULE, 'reset');

export const $reset = reset.action;

/**
 * Login
 */

const login = StateHelper.createAsyncOperation(MODULE, 'login');

export function $login(username, password) {
  return (dispatch) => {
    dispatch(Activity.$processing(MODULE, $login.name, { message: 'Logging in ...' }));
    dispatch(login.request());

    return AuthService.login(username, password)
      .then((result) => dispatch(login.success(result)))
      .catch((error) => dispatch(login.failure(error)))
      .finally(() => dispatch(Activity.$done(MODULE, $login.name)));
  };
}

/**
 * Logout
 */

const logout = StateHelper.createSimpleOperation(MODULE, 'logout');

export function $logout() {
  return (dispatch) => {
    return AuthService.logout().then(() => dispatch(logout.action()));
  };
}

/**
 * Signup
 */

const signup = StateHelper.createAsyncOperation(MODULE, 'signup');

export function $signup(payload) {
  return async (dispatch) => {
    dispatch(Activity.$processing(MODULE, $signup.name, { message: 'Signing up ...' }));
    dispatch(signup.request());

    return AuthService.signup(payload)
      .then((result) => dispatch(signup.success(result)))
      .catch((error) => dispatch(signup.failure(error)))
      .finally(() => dispatch(Activity.$done(MODULE, $signup.name)));
  };
}

/**
 * Password Reset
 */

const initiatePasswordReset = StateHelper.createAsyncOperation(MODULE, 'initiatePasswordReset');

export function $initiatePasswordReset(email) {
  return (dispatch) => {
    dispatch(Activity.$processing(MODULE, $initiatePasswordReset.name, { message: 'Password Reset ...' }));
    dispatch(initiatePasswordReset.request());

    return AuthService.initiatePasswordReset(email)
      .then((result) => dispatch(initiatePasswordReset.success(result)))
      .catch((error) => dispatch(initiatePasswordReset.failure(error)))
      .finally(() => dispatch(Activity.$done(MODULE, $initiatePasswordReset.name)));
  };
}

/**
 * Reducer
 */

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case login.REQUEST:
      return {
        ...state,
        user: null,
      };
    case login.SUCCESS:
      return {
        ...state,
        authenticated: true,
        user: action.user,
      };
    case signup.SUCCESS:
      return {
        ...state,
        authenticated: true,
        user: action.user,
      };
    case logout.TYPE:
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
