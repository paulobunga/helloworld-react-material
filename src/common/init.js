import './polyfill';

import './events';

import * as Logger from './logger';

import * as CONFIG from './config';

import * as INTL from './intl';

if (process.env.NODE_ENV === 'development') {
  global.Logger = Logger;
  global.CONFIG = CONFIG;
  global.INTL = INTL;
}

/**
 * Setup Logger
 */

const PREFIX = 'Starter';

Logger.setup(PREFIX);

if (process.env.NODE_ENV === 'development') {
  Logger.enable(`${PREFIX}*`);
}
