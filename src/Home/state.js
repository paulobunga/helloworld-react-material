import { API_ENDPOINT } from '../common/config';

import * as FetchHelper from '../common/fetch.helper';
import * as StateHelper from '../common/state.helper';

import { AuthService } from '../Auth/Auth.service';

import * as Activity from '../Shared/Activity';

/**
 * Module Name
 */

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

const reset = StateHelper.createSimpleOperation(MODULE, 'reset');

export const $reset = reset.action;

/**
 * Fetch Tasks
 */

const fetchTasks = StateHelper.createAsyncOperation(MODULE, 'fetchTasks');

// Promise implementation
export function $fetchIndexPromise() {
  return (dispatch) => {
    Activity.processing(MODULE, fetchTasks.name);
    dispatch(fetchTasks.request());

    return fetch(`${API_ENDPOINT}/client/task`, {
      headers: {
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
      },
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch(fetchTasks.success(result)))
      .catch((error) => dispatch(fetchTasks.failure(error)))
      .finally(() => Activity.done(MODULE, fetchTasks.name));
  };
}

// async/await implementation
export function $fetchTasks() {
  return async (dispatch) => {
    Activity.processing(MODULE, fetchTasks.name);
    dispatch(fetchTasks.request());

    try {
      const response = await fetch(`${API_ENDPOINT}/client/task`, {
        headers: {
          Authorization: `Bearer ${AuthService.getAccessToken()}`,
        },
      });
      const result = await FetchHelper.ResponseHandler(response);

      return dispatch(fetchTasks.success(result));
    } catch (error) {
      await FetchHelper.ErrorValueHandler(error);
      dispatch(fetchTasks.failure(error));
    } finally {
      Activity.done(MODULE, fetchTasks.name);
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

    return fetch(`${API_ENDPOINT}/client/task/create`, {
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

    return fetch(`${API_ENDPOINT}/client/task/${taskId}/edit`, {
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

    return fetch(`${API_ENDPOINT}/client/task/${taskId}/delete`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
      },
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then(() => dispatch($fetchTasks()))
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
    case fetchTasks.REQUEST:
      return {
        ...state,
        tasks: null,
      };
    case fetchTasks.SUCCESS:
      return {
        ...state,
        tasks: action.data,
      };
    case createTask.SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.data],
      };
    case updateTask.SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((item) => (action.data.id === item.id ? action.data : item)),
      };
    case fetchTasks.FAILURE:
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
