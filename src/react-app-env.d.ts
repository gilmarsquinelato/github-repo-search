/// <reference types="react-scripts" />
import '@emotion/react/types/css-prop';
import '@emotion/react';
import { Theme as MuiTheme } from '@material-ui/core/styles';
import 'gtag.js';
import 'resize-observer-browser';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}
