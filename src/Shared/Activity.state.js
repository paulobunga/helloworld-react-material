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

export const $reset = StateHelper.createSimpleOperation(MODULE, 'reset', () => $reset.action());

/**
 * Activity Indicator
 */

export const $processing = StateHelper.createSimpleOperation(MODULE, 'processing', (operation) => $processing.action({ operation }));

export const $done = StateHelper.createSimpleOperation(MODULE, 'done', (operation) => $done.action({ operation }));

/**
 * Reducer
 */

export function reducer(state = INITIAL_STATE(), action) {
  switch (action.type) {
    case $reset.ACTION:
      return INITIAL_STATE();
    case $processing.ACTION: {
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
    case $done.ACTION: {
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
