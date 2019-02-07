import * as Logger from '../common/logger';

import * as FetchHelper from '../common/fetch.helper';
import * as StateHelper from '../common/state.helper';

import { AuthService } from '../Auth/Auth.service';

import * as Auth from '../Auth/state';

import * as Activity from './Activity.service';

/**
 * Module Name
 */

export const MODULE = 'Shared';

/**
 * Initial State
 */

const INITIAL_STATE = {
  ready: false,
  initialized: false,
};

/**
 * Ready app
 */

const ready = StateHelper.createSimpleOperation(MODULE, 'ready');

export function $ready() {
  Logger.debug('$ready');

  return async (dispatch) => {
    dispatch(ready.action());
  };
}

/**
 * Initialize app
 */

const initialize = StateHelper.createSimpleOperation(MODULE, 'initialize');

export function $initialize() {
  Logger.debug('$initialize');

  return async (dispatch) => {
    await Promise.all([
      new Promise((resolve) => setTimeout(resolve, 2000)),
      // dispatch($loadSomething()),
    ]);

    return dispatch(initialize.action());
  };
}

/**
 * Uninitialize app
 */

const uninitialize = StateHelper.createSimpleOperation(MODULE, 'uninitialize');

export function $uninitialize() {
  Logger.debug('$uninitialize');

  return async (dispatch) => {
    dispatch(uninitialize.action());
  };
}

/**
 * Reducer
 */

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ready.TYPE:
      return {
        ...state,
        ready: true,
      };
    case initialize.TYPE:
      return {
        ...state,
        initialized: true,
      };
    case uninitialize.TYPE:
      return {
        ...state,
        initialized: false,
      };
    default:
      return state;
  }
}

/**
 * App initializer
 */

export async function initializer({ dispatch, getState }) {
  FetchHelper.events.on('failure', (error, response) => {
    if (AuthService.isAuthenticated() && response.status === 401) {
      dispatch(Auth.$logout());
    }
  });

  await AuthService.initialize();

  if (!AuthService.isAuthenticated() && getState().Auth.authenticated) {
    dispatch(Auth.$reset());
  }

  dispatch($ready());

  if (AuthService.isAuthenticated()) {
    dispatch($initialize()).catch((error) => Activity.toast('failure', error.message));
  }

  AuthService.events.on('login', () => {
    dispatch($initialize()).catch((error) => Activity.toast('failure', error.message));
  });

  AuthService.events.on('logout', () => {
    dispatch($uninitialize());
  });
}
