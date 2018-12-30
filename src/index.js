import React from 'react';
import ReactDOM from 'react-dom';

import './common/init';

import './index.css';
import './App.css';

import AppContainer from './AppContainer';

// import registerServiceWorker from './registerServiceWorker';
import { unregister as unregisterServiceWorker } from './registerServiceWorker';

ReactDOM.render(<AppContainer />, document.getElementById('app'));
// registerServiceWorker()
unregisterServiceWorker();
