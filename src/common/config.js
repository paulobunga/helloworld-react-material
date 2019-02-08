import { debug } from './logger';

export { RELEASE_VERSION } from './release';

const CONFIG_OVERRIDE = {};

if (localStorage && localStorage.CONFIG_OVERRIDE) {
  try {
    Object.assign(CONFIG_OVERRIDE, JSON.parse(localStorage.CONFIG_OVERRIDE));
  } catch (e) {
    debug(e);
  }
}

debug('CONFIG_OVERRIDE', CONFIG_OVERRIDE);

export const API_ENDPOINT = CONFIG_OVERRIDE.API_ENDPOINT
  || (process.env.NODE_ENV === 'production' ? 'http://backend.starter.emiketic.com' : 'http://localhost:5000');
