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

import {  Switch, Route, HashRouter} from 'react-router-dom';
import ContactPage from './components/ContactPage/ContactPage';
import AdministratorLoginPage from './components/AdministratorLoginPage/AdministratorLoginPage';
import AdministratorDashboard from './components/AdministratorDashbord/AdministratorDash';
import AntikvitetPage from './components/AntikvitetPage/AntikvitetPage';
import AdministratorDashboardAntikvitet from './components/AdministratorDashbordAntikvitet/AdministratorDashbordAntikvitet';




ReactDOM.render(
  <React.StrictMode>
    
    <HashRouter>
      <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route path="/contact" component= { ContactPage } />
        <Route path= "/api/antikvitet/:aId" component= { AntikvitetPage }/> 
        <Route path="/auth/administrator/login" component= {AdministratorLoginPage} />
        <Route exact path="/auth/administrator/dashboard" component= {AdministratorDashboard} />
        <Route exact path="/auth/administrator/dashboard/antikvitet" component= { AdministratorDashboardAntikvitet } />
      </Switch>
      </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
