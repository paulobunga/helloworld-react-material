import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as StateProvider } from 'react-redux';

import { MuiThemeProvider } from '@material-ui/core/styles';

import { theme } from './common/theme';

import App from './App';

import { setupStore } from './store';

import bootstrap from './bootstrap';

const store = setupStore();

bootstrap();

const AppContainer = () => (
  <MuiThemeProvider theme={theme}>
    <StateProvider store={store}>
      <Router>
        <App />
      </Router>
    </StateProvider>
  </MuiThemeProvider>
);

export default AppContainer;
