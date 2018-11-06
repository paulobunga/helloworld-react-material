import { API_ENDPOINT } from '../common/config';

import * as FetchHelper from '../common/fetch.helper';
import * as StateHelper from '../common/state.helper';

import { AuthService } from '../Auth/Auth.service';

import { AUTH_LOGOUT } from '../Auth/state';

import * as Activity from '../Shared/Activity.state';

export const MODULE = 'Home';

/**
 * Initial State
 */

const INITIAL_STATE = {
  tasks: null,
};

/**
 * Reset
 */

const HOME_RESET = 'HOME_RESET';

export function $reset() {
  return {
    type: HOME_RESET,
  };
}

/**
 * Fetch Data
 */

/* Fetch Data - Action types and internal action creators */

const HOME_TASK_INDEX_REQUEST = 'HOME_TASK_INDEX_REQUEST';

const fetchTaskIndexRequest = StateHelper.createRequestAction(HOME_TASK_INDEX_REQUEST);

const HOME_TASK_INDEX_SUCCESS = 'HOME_TASK_INDEX_SUCCESS';

// Success action creator, must dispatch success and return value to pass to view layer via exposed action creator
const fetchTaskIndexSuccess = StateHelper.createSuccessAction(HOME_TASK_INDEX_SUCCESS);

// // Success action creator simplest implementation
// function fetchTaskIndexSuccess({ tasks }) {
//   return {
//     type: HOME_TASK_INDEX_SUCCESS,
//     tasks,
//   };
// }

// // Success action creator with fine tuning for view tasks
// function fetchTaskIndexSuccess({ tasks }) {
//   return (dispatch) => {
//     dispatch({
//       type: HOME_TASK_INDEX_SUCCESS,
//       tasks,
//     });
//
//     return {
//       accounts: {
//         tasksCount: tasks.length,
//         done: tasks.filter(r => r.done)
//         unndone: tasks.filter(r => !r.done)
//       },
//     };
//   };
// }

const HOME_TASK_INDEX_FAILURE = 'HOME_TASK_INDEX_FAILURE';

// Failure action creator must dispatch failure and throw an error
const fetchTaskIndexFailure = StateHelper.createFailureAction(HOME_TASK_INDEX_FAILURE);

/* Fetch Data - Exposed action creators, must return a promise */

// Promise implementation
export function $fetchTaskIndexPromise() {
  return (dispatch) => {
    dispatch(Activity.$processing(MODULE, $fetchTaskIndexPromise.name));
    dispatch(fetchTaskIndexRequest());

    return fetch(`${API_ENDPOINT}/task`, {
      headers: {
        Authorization: `Bearer ${AuthService.token}`,
      },
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch(fetchTaskIndexSuccess({ tasks: result })))
      .catch((error) => dispatch(fetchTaskIndexFailure(error)))
      .finally(() => dispatch(Activity.$done(MODULE, $fetchTaskIndexPromise.name)));
  };
}

// async/await implementation
export function $fetchTaskIndex() {
  return async (dispatch) => {
    dispatch(Activity.$processing(MODULE, $fetchTaskIndex.name));
    dispatch(fetchTaskIndexRequest());

    try {
      const response = await fetch(`${API_ENDPOINT}/task`, {
        headers: {
          Authorization: `Bearer ${AuthService.token}`,
        },
      });
      const result = await FetchHelper.ResponseHandler(response);

      return dispatch(fetchTaskIndexSuccess({ tasks: result }));
    } catch (error) {
      await FetchHelper.ErrorValueHandler(error);
      dispatch(fetchTaskIndexFailure(error));
    } finally {
      dispatch(Activity.$done(MODULE, $fetchTaskIndex.name));
    }
  };
}

/**
 * Reducer
 */

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case HOME_RESET:
    case AUTH_LOGOUT:
      return INITIAL_STATE;
    case HOME_TASK_INDEX_REQUEST:
      return {
        ...state,
        tasks: null,
      };
    case HOME_TASK_INDEX_SUCCESS:
      return {
        ...state,
        tasks: action.tasks,
      };
    case HOME_TASK_INDEX_FAILURE:
      return {
        ...state,
        tasks: null,
      };
    default:
      return state;
  }
}

/**
 * Persister
 */

export function persister({ tasks }) {
  return {
    tasks,
  };
}
