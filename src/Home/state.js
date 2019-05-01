import { API_ENDPOINT } from '../common/config';

import * as FetchHelper from '../common/fetch.helper';
import * as StateHelper from '../common/state.helper';

import { AuthService } from '../Auth/Auth.service';

import * as Activity from '../Shared/Activity';

/**
 * Module name
 */

export const MODULE = 'Home';

/**
 * Initial state
 */

const defineInitialState = () => ({
  tasks: null,
});

/**
 * Reset
 */

export const $reset = StateHelper.createSimpleOperation(MODULE, 'reset', () => $reset.action());

/**
 * Fetch tasks
 */

// Promise implementation
const $fetchTasksPromise = StateHelper.createAsyncOperation(MODULE, 'fetchTasks', () => {
  return (dispatch) => {
    Activity.processing(MODULE, $fetchTasksPromise.NAME);
    dispatch($fetchTasksPromise.request());

    return fetch(`${API_ENDPOINT}/client/task`, {
      headers: {
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
      },
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch($fetchTasksPromise.success(result)))
      .catch((error) => dispatch($fetchTasksPromise.failure(error)))
      .finally(() => Activity.done(MODULE, $fetchTasksPromise.NAME));
  };
});

// async/await implementation
export const $fetchTasks = StateHelper.createAsyncOperation(MODULE, 'fetchTasks', () => {
  return async (dispatch) => {
    Activity.processing(MODULE, $fetchTasks.NAME);
    dispatch($fetchTasks.request());

    try {
      const response = await fetch(`${API_ENDPOINT}/client/task`, {
        headers: {
          Authorization: `Bearer ${AuthService.getAccessToken()}`,
        },
      });
      const result = await FetchHelper.ResponseHandler(response);

      return dispatch($fetchTasks.success(result));
    } catch (error) {
      await FetchHelper.ErrorValueHandler(error);
      dispatch($fetchTasks.failure(error));
    } finally {
      Activity.done(MODULE, $fetchTasks.NAME);
    }
  };
});

/**
 * Create task
 */

export const $createTask = StateHelper.createAsyncOperation(MODULE, 'createTask', (data) => {
  return (dispatch) => {
    Activity.processing(MODULE, $createTask.NAME);
    dispatch($createTask.request());

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
      .then((result) => dispatch($createTask.success(result)))
      .catch((error) => dispatch($createTask.failure(error)))
      .finally(() => Activity.done(MODULE, $createTask.NAME));
  };
});

/**
 * Update task
 */

export const $updateTask = StateHelper.createAsyncOperation(MODULE, 'updateTask', (taskId, data) => {
  return (dispatch) => {
    Activity.processing(MODULE, $updateTask.NAME);
    dispatch($updateTask.request());

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
      .then((result) => dispatch($updateTask.success(result)))
      .catch((error) => dispatch($updateTask.failure(error)))
      .finally(() => Activity.done(MODULE, $updateTask.NAME));
  };
});

/**
 * Remove task
 */

export const $removeTask = StateHelper.createAsyncOperation(MODULE, 'removeTask', (taskId) => {
  return (dispatch) => {
    Activity.processing(MODULE, $removeTask.NAME);
    dispatch($removeTask.request());

    return fetch(`${API_ENDPOINT}/client/task/${taskId}/delete`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
      },
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then(() => dispatch($fetchTasks()))
      .catch((error) => dispatch($removeTask.failure(error)))
      .finally(() => Activity.done(MODULE, $removeTask.NAME));
  };
});

/**
 * Reducer
 */

export function reducer(state = defineInitialState(), action) {
  switch (action.type) {
    case $reset.ACTION:
      return defineInitialState();
    case $fetchTasks.REQUEST:
      return {
        ...state,
        tasks: null,
      };
    case $fetchTasks.SUCCESS:
      return {
        ...state,
        tasks: action.data,
      };
    case $createTask.SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.data],
      };
    case $updateTask.SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((item) => (action.data.id === item.id ? action.data : item)),
      };
    case $fetchTasks.FAILURE:
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
