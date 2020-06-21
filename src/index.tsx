import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js/dist/popper.js';
import 'jquery/dist/jquery.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import { MainMenu } from './components/MainMenu/MainMenu';

ReactDOM.render(
  <React.StrictMode>
    <MainMenu></MainMenu>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
