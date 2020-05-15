import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './containers/App';
import * as serviceWorker from './util/serviceWorker';
import CircularProgress from '@material-ui/core/CircularProgress';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './util/theme';

import { Provider } from 'react-redux'

import reduxStore from './configureStore'
import { PersistGate } from 'redux-persist/integration/react'


ReactDOM.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <Provider store={reduxStore.store}>
      <PersistGate loading={<CircularProgress />} persistor={reduxStore.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ThemeProvider>,
  // </React.StrictMode>
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
