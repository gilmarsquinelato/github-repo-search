import { ThemeProvider } from '@emotion/react';
import { StylesProvider, MuiThemeProvider } from '@material-ui/core';

import { muiTheme } from '../config/theme';

const Theme: React.FC = ({ children }) => {
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};

export default Theme;
