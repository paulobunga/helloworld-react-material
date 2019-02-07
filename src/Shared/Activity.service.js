import { getStore } from '../store';

import { $processing, $done } from './Activity.state';

export function processing(module = 'App', operation = 'default') {
  getStore().dispatch($processing(`${module}.${operation}`));
}

export function done(module = 'App', operation = 'default') {
  getStore().dispatch($done(`${module}.${operation}`));
}

export function toast(type, title, content = '') {}

export function status(type, label) {}

export function alert(type, title, content) {}

export function confirm(title, content, options = {}) {}
