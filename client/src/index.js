import React from 'react';
import ReactDOM from 'react-dom';
import { store } from '../Redux/store';
import { Provider } from 'react-redux';
import App from './App_test';

const title = 'React 18 with Webpack and Babel';

ReactDOM.render(
  <Provider store ={store}>
    <App title={title} />
  </Provider>,
  document.getElementById('app')
);

module.hot.accept();