import React from 'react';
import ReactDOM from 'react-dom';

import './common/init';

import './App.css';

import AppContainer from './AppContainer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppContainer />, document.getElementById('app'));
registerServiceWorker();
