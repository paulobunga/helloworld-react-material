import React from 'react';
import ReactDOM from 'react-dom';

import './common/init';

import './styles/index.css';

import { setupStore } from './store';
import bootstrap from './bootstrap';

import AppContainer from './AppContainer';

// import registerServiceWorker from './registerServiceWorker';
import { unregister as unregisterServiceWorker } from './registerServiceWorker';

setupStore();

ReactDOM.render(<AppContainer />, document.getElementById('app'));

bootstrap();

// registerServiceWorker()
unregisterServiceWorker();

import('pwacompat');
