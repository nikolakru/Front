import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './components/HomePage/HomePage';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js/dist/popper.js';
import 'jquery/dist/jquery.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import { MainMenu, MainMenuItem } from './components/MainMenu/MainMenu';
import {  Switch, Route, HashRouter} from 'react-router-dom';
import ContactPage from './components/ContactPage/ContactPage';
const menuItems = [
  new MainMenuItem("Home", "/"),
  new MainMenuItem("Contact", "/contact"),
  new MainMenuItem("Log in", "/user/login"),
  new MainMenuItem("About us", "/page/about-us")

];


ReactDOM.render(
  <React.StrictMode>
    <MainMenu items={menuItems}></MainMenu>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route path="/contact" component= { ContactPage } />
      </Switch>
      </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
