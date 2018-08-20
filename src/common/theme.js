import { createMuiTheme } from '@material-ui/core/styles';

import { COLOR } from './styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: COLOR.primary,
    },
    secondary: {
      main: COLOR.primaryDark,
    },
    accent: {
      main: COLOR.accent,
    },
    inverse: {
      main: COLOR.inverse,
    },
    error: {
      main: COLOR.error,
    },
    success: {
      main: COLOR.success,
    },
    info: {
      main: COLOR.info,
    },
    warning: {
      main: COLOR.warning,
    },
    off: {
      main: COLOR.off,
    },
  },
});
