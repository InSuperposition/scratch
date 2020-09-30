// IE polyfills imported in public/index.html body element
// FIXME: stop using CDN hosted scripts
// TODO: create build process for polyfills outside of CRA's `react-scripts`
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'

import 'whatwg-fetch'
import 'mutationobserver-shim'

import React,{StrictMode} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import store from './app/config/store'
import * as serviceWorker from './serviceWorker'

import './index.css';
import App from './app/index.js'


ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
