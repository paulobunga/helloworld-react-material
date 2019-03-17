import { API_ENDPOINT } from '../common/config';

import * as FetchHelper from '../common/fetch.helper';
import * as StateHelper from '../common/state.helper';

import { AuthService } from '../Auth/Auth.service';

import * as Activity from '../Shared/Activity.service';

/**
 * Module Name
 */

export const MODULE = 'Home';

/**
 * Initial State
 */

const INITIAL_STATE = {
  index: null,
};

/**
 * Reset
 */

const reset = StateHelper.createSimpleOperation(MODULE, 'reset');

export const $reset = reset.action;

/**
 * Fetch Index
 */

const fetchIndex = StateHelper.createAsyncOperation(MODULE, 'fetchIndex');

// Promise implementation
export function $fetchIndexPromise() {
  return (dispatch) => {
    Activity.processing(MODULE, fetchIndex.name);
    dispatch(fetchIndex.request());

    return fetch(`${API_ENDPOINT}/task`, {
      headers: {
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
      },
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch(fetchIndex.success(result)))
      .catch((error) => dispatch(fetchIndex.failure(error)))
      .finally(() => Activity.done(MODULE, fetchIndex.name));
  };
}

// async/await implementation
export function $fetchIndex() {
  return async (dispatch) => {
    Activity.processing(MODULE, fetchIndex.name);
    dispatch(fetchIndex.request());

    try {
      const response = await fetch(`${API_ENDPOINT}/task`, {
        headers: {
          Authorization: `Bearer ${AuthService.getAccessToken()}`,
        },
      });
      const result = await FetchHelper.ResponseHandler(response);

      return dispatch(fetchIndex.success(result));
    } catch (error) {
      await FetchHelper.ErrorValueHandler(error);
      dispatch(fetchIndex.failure(error));
    } finally {
      Activity.done(MODULE, fetchIndex.name);
    }
  };
}

/**
 * Create Task
 */

const createTask = StateHelper.createAsyncOperation(MODULE, 'createTask');

export function $createTask(data) {
  return (dispatch) => {
    Activity.processing(MODULE, createTask.name);
    dispatch(createTask.request());
    console.log(data, '++');

    return fetch(`${API_ENDPOINT}/task/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
      }),
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch(createTask.success(result)))
      .catch((error) => dispatch(createTask.failure(error)))
      .finally(() => Activity.done(MODULE, createTask.name));
  };
}

/**
 * Update Task
 */

const updateTask = StateHelper.createAsyncOperation(MODULE, 'updateTask');

export function $updateTask(taskId, data) {
  return (dispatch) => {
    Activity.processing(MODULE, updateTask.name);
    dispatch(updateTask.request());

    return fetch(`${API_ENDPOINT}/task/${taskId}/edit`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
      }),
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch(updateTask.success(result)))
      .catch((error) => dispatch(updateTask.failure(error)))
      .finally(() => Activity.done(MODULE, updateTask.name));
  };
}

/**
 * Remove Task
 */
const removeTask = StateHelper.createAsyncOperation(MODULE, 'removeTask');

export function $removeTask(taskId) {
  return (dispatch) => {
    Activity.processing(MODULE, removeTask.name);
    dispatch(removeTask.request());

    return fetch(`${API_ENDPOINT}/task/${taskId}/delete`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
      },
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then(() => dispatch($fetchIndex()))
      .catch((error) => dispatch(removeTask.failure(error)))
      .finally(() => Activity.done(MODULE, removeTask.name));
  };
}

/**
 * Reducer
 */

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case reset.TYPE:
      return INITIAL_STATE;
    case fetchIndex.REQUEST:
      return {
        ...state,
        index: null,
      };
    case fetchIndex.SUCCESS:
      return {
        ...state,
        index: action.data,
      };
    case createTask.SUCCESS:
      return {
        ...state,
        index: [...state.index, action.data],
      };
    case updateTask.SUCCESS:
      return {
        ...state,
        index: state.index.map((item) => (action.data.id === item.id ? action.data : item)),
      };
    case fetchIndex.FAILURE:
      return {
        ...state,
        index: null,
      };
    default:
      return state;
  }
}

/**
 * Persister
 */

export function persister({ index }) {
  return {
    index,
  };
}
