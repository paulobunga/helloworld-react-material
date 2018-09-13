import { debug } from './logger';

export { RELEASE_VERSION, RELEASE_DATE } from './release';

const CONFIG_OVERRIDE = {};

if (localStorage && localStorage.CONFIG_OVERRIDE) {
  try {
    Object.assign(CONFIG_OVERRIDE, JSON.parse(localStorage.CONFIG_OVERRIDE));
  } catch (e) {
    debug(e);
  }
}

debug('CONFIG_OVERRIDE', CONFIG_OVERRIDE);

export const API_ENDPOINT = CONFIG_OVERRIDE.CONFIG_OVERRIDE
  || (process.env.NODE_ENV === 'production'
    ? 'http://private-5bf85-starterspecapi.apiary-mock.com'
    : 'http://private-5bf85-starterspecapi.apiary-mock.com');
