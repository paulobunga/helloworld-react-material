import * as Logger from '../common/logger';

export const MODULE = 'Activity';

/**
 * Initial State
 */

const INITIAL_STATE = {
  processingByTopic: {
    default: false,
  },
  processing: false,
  message: null,
};

/**
 * Reset
 */

const ACTIVITY_RESET = 'ACTIVITY_RESET';

export function $reset() {
  return {
    type: ACTIVITY_RESET,
  };
}

/**
 * Activity Indicator
 */

const ACTIVITY_PROCESSING = 'ACTIVITY_PROCESSING';

export function $processing(module = 'App', operation = 'default', { message = 'Loading ...' } = {}) {
  const topic = `${module}.${operation}`;

  Logger.debug('$processing', topic, message);

  return {
    type: ACTIVITY_PROCESSING,
    topic,
  };
}

const ACTIVITY_DONE = 'ACTIVITY_DONE';

export function $done(module = 'App', operation = 'default') {
  const topic = `${module}.${operation}`;

  Logger.debug('$done', topic);

  return {
    type: ACTIVITY_DONE,
    topic,
  };
}

/**
 * Reducer
 */

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIVITY_RESET:
      return INITIAL_STATE;
    case ACTIVITY_PROCESSING: {
      const processingByTopic = {
        ...state.processingByTopic,
        [action.topic]: true,
      };
      return {
        ...state,
        processingByTopic,
        processing: Object.values(processingByTopic).reduce((acc, v) => acc || v, false),
      };
    }
    case ACTIVITY_DONE: {
      const processingByTopic = {
        ...state.processingByTopic,
        [action.topic]: false,
      };
      return {
        ...state,
        processingByTopic,
        processing: Object.values(processingByTopic).reduce((acc, v) => acc || v, false),
      };
    }
    default:
      return state;
  }
}
