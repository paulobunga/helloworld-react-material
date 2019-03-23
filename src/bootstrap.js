/**
 * App bootstrap
 */

import { getStore } from './store';

import * as FetchHelper from './common/fetch.helper';

import { AuthService } from './Auth/Auth.service';

import * as Auth from './Auth/state';

import * as Shared from './Shared/state';

import * as Activity from './Shared/Activity.service';

export default async function bootstrap() {
  const { dispatch, getState } = getStore();

  FetchHelper.events.on('failure', (error, response) => {
    if (AuthService.isAuthenticated() && response.status === 401) {
      dispatch(Auth.$logout());
    }
  });

  await AuthService.initialize();

  if (!AuthService.isAuthenticated() && getState().Auth.authenticated) {
    dispatch(Auth.$reset());
  }

  dispatch(Shared.$readyApp());

  if (AuthService.isAuthenticated()) {
    dispatch(Shared.$prepareSession()).catch((error) => Activity.toast('failure', error.message));
  }

  AuthService.events.on('login', () => {
    dispatch(Shared.$prepareSession()).catch((error) => Activity.toast('failure', error.message));
  });

  AuthService.events.on('logout', () => {
    dispatch(Shared.$clearSession());
  });
}
