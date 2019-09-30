import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from 'gui/app/style/Theme';
import { store } from 'gui/app/store/configureStore';
import { ErrorBoundary } from 'gui/app/components/error/ErrorBoundary';
import App from 'gui/app/containers/App';


ReactDOM.render(
  <ErrorBoundary>
    <MuiThemeProvider theme={ theme }>
      <Provider store={ store }>
        <CssBaseline />
        <App />
      </Provider>
    </MuiThemeProvider>
  </ErrorBoundary>,
  document.getElementById('root'),
);
