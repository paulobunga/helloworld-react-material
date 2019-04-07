import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as StateProvider } from 'react-redux';

import { MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';

import { theme } from './common/theme';

import App from './App';

import { getStore } from './store';

const AppContainer = () => (
  <StateProvider store={getStore()}>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </StateProvider>
);

export default AppContainer;
