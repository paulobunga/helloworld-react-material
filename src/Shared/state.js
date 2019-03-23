import * as Logger from '../common/logger';

import * as StateHelper from '../common/state.helper';

/**
 * Module Name
 */

export const MODULE = 'Shared';

/**
 * Initial State
 */

const INITIAL_STATE = {
  appReady: false,
  sessionReady: false,
};

/**
 * Ready app
 */

const readyApp = StateHelper.createSimpleOperation(MODULE, 'readyApp');

export function $readyApp() {
  Logger.debug('$readyApp');

  return async (dispatch) => {
    dispatch(readyApp.action());
  };
}

/**
 * Prepare session
 */

const sessionPrepared = StateHelper.createSimpleOperation(MODULE, 'sessionPrepared');

export function $prepareSession() {
  Logger.debug('$prepareSession');

  return async (dispatch) => {
    await Promise.all([
      new Promise((resolve) => setTimeout(resolve, 2000)),
      // dispatch($loadSomething()),
    ]);

    return dispatch(sessionPrepared.action());
  };
}

/**
 * Clear session
 */

const sessionCleared = StateHelper.createSimpleOperation(MODULE, 'sessionCleared');

export function $clearSession() {
  Logger.debug('$clearSession');

  return async (dispatch) => {
    dispatch(sessionCleared.action());
  };
}

/**
 * Reducer
 */

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case readyApp.TYPE:
      return {
        ...state,
        appReady: true,
      };
    case sessionPrepared.TYPE:
      return {
        ...state,
        sessionReady: true,
      };
    case sessionCleared.TYPE:
      return {
        ...state,
        sessionReady: false,
      };
    default:
      return state;
  }
}
