import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {setupStore} from './modules/store/Store.js';
import { Provider } from 'react-redux';
import './index.styl';


const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
