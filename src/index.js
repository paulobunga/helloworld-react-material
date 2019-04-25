import React from 'react';
import ReactDOM from 'react-dom';

import './common/init';

import './styles/index.css';

import { setupStore } from './store';
import bootstrap from './bootstrap';

import AppContainer from './AppContainer';

import * as serviceWorker from './serviceWorker';

setupStore();

ReactDOM.render(<AppContainer />, document.getElementById('app'));

bootstrap();

serviceWorker.unregister();
// serviceWorker.register();

import('pwacompat');
