import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { MuiThemeProvider } from '@material-ui/core/styles';

import App from './App';

import { theme } from './common/theme';

import { setupStore } from './store';

import bootstrap from './bootstrap';

const store = setupStore();

bootstrap();

const AppContainer = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </MuiThemeProvider>
);

export default AppContainer;
