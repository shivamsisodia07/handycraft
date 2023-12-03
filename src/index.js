import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
const root = ReactDOM.createRoot(document.getElementById('root'));
import Store from './Store/store';
import {Provider} from "react-redux";
root.render(
  <React.StrictMode>
    <Provider store={Store}>
    <App />
    </Provider>
  </React.StrictMode>

)

serviceWorker.unregister();
