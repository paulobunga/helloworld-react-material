import * as StateHelper from '../common/state.helper';

import * as Logger from '../common/logger';

/**
 * Module Name
 */

export const MODULE = 'Activity';

/**
 * Initial State
 */

const INITIAL_STATE = () => ({
  processingByOperation: {
    default: false,
  },
  processing: false,
});

/**
 * Reset
 */

const reset = StateHelper.createSimpleOperation(MODULE, 'reset');

export function $reset() {
  return reset.action();
}

/**
 * Activity Indicator
 */

const processing = StateHelper.createSimpleOperation(MODULE, 'processing');

export function $processing(operation) {
  Logger.debug('$processing', operation);

  return processing.action({ operation });
}

const done = StateHelper.createSimpleOperation(MODULE, 'done');

export function $done(operation) {
  Logger.debug('$done', operation);

  return done.action({ operation });
}

/**
 * Reducer
 */

export function reducer(state = INITIAL_STATE(), action) {
  switch (action.type) {
    case reset.TYPE:
      return INITIAL_STATE();
    case processing.TYPE: {
      const processingByOperation = {
        ...state.processingByOperation,
        [action.operation]: true,
      };
      return {
        ...state,
        processingByOperation,
        processing: Object.values(processingByOperation).reduce((acc, v) => acc || v, false),
      };
    }
    case done.TYPE: {
      const processingByOperation = {
        ...state.processingByOperation,
        [action.operation]: false,
      };
      return {
        ...state,
        processingByOperation,
        processing: Object.values(processingByOperation).reduce((acc, v) => acc || v, false),
      };
    }
    default:
      return state;
  }
}
