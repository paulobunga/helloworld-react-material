import * as Logger from '../common/logger';

import * as StateHelper from '../common/state.helper';

import $state from '../store/state.js';

/**
 * Module name
 */

export const MODULE = 'Shared';

/**
 * Initial state
 */

const defineInitialState = () => ({
  appReady: false,
  appInSession: false,
});

/**
 * Ready app
 */

export const $appReady = StateHelper.createSimpleOperation(MODULE, 'appReady', () => {
  return async (dispatch) => {
    await Promise.all([
      new Promise((resolve) => setTimeout(resolve, 1000)),
      // dispatch($loadSomething()),
    ]);

    return dispatch($appReady.action());
  };
});

/**
 * Start session
 */

export const $startSession = StateHelper.createSimpleOperation(MODULE, 'startSession', () => {
  return async (dispatch) => {
    await Promise.all([
      new Promise((resolve) => setTimeout(resolve, 2000)),
      // dispatch($loadSomething()),
    ]);

    return dispatch($startSession.action());
  };
});

/**
 * Close session
 */

export const $closeSession = StateHelper.createSimpleOperation(MODULE, 'closeSession', () => {
  return async (dispatch) => {
    Object.values($state).forEach((state) => {
      if (state.$reset) {
        dispatch(state.$reset());
      }
    });

    return dispatch($closeSession.action());
  };
});

/**
 * Reducer
 */

export function reducer(state = defineInitialState(), action) {
  switch (action.type) {
    case $appReady.ACTION:
      return {
        ...state,
        appReady: true,
      };
    case $startSession.ACTION:
      return {
        ...state,
        appInSession: true,
      };
    case $closeSession.ACTION:
      return {
        ...state,
        appInSession: false,
      };
    default:
      return state;
  }
}
