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

const appReady = StateHelper.createSimpleOperation(MODULE, 'appReady');

export function $appReady() {
  Logger.debug('$appReady');

  return async (dispatch) => {
    return dispatch(appReady.action());
  };
}

/**
 * Prepare session
 */

const prepareSession = StateHelper.createSimpleOperation(MODULE, 'prepareSession');

export function $prepareSession() {
  Logger.debug('$prepareSession');

  return async (dispatch) => {
    await Promise.all([
      new Promise((resolve) => setTimeout(resolve, 2000)),
      // dispatch($loadSomething()),
    ]);

    return dispatch(prepareSession.action());
  };
}

/**
 * Clear session
 */

const clearSession = StateHelper.createSimpleOperation(MODULE, 'clearSession');

export function $clearSession() {
  Logger.debug('$clearSession');

  return async (dispatch) => {
    return dispatch(clearSession.action());
  };
}

/**
 * Reducer
 */

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case appReady.TYPE:
      return {
        ...state,
        appReady: true,
      };
    case prepareSession.TYPE:
      return {
        ...state,
        sessionReady: true,
      };
    case clearSession.TYPE:
      return {
        ...state,
        sessionReady: false,
      };
    default:
      return state;
  }
}
