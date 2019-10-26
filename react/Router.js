import React from 'react';
import {hot} from 'react-hot-loader';
import {
    BrowserRouter, 
    Link, 
    Route, 
    Switch
} from 'react-router-dom';
import axios from "axios";

import Home from './components/Layouts/Home/Home';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import NotFound from './components/NotFound/NotFound'
import PrivateRoute from './PrivateRoute'
import Dashboard from './components/App/Dashboard';

import './theme/_styles.sass';

//Axios config
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = '/api/';

let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
  } else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}




const Main = props => (
    <Switch>
        {/*User might LogIn*/}
        <Route exact path='/' component={Home}/>
        
        {/*User will LogIn*/}
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        
        {/* User is LoggedIn*/}
        <PrivateRoute path='/dashboard' component={Dashboard}/>
        
        {/*Page Not Found*/}
        <Route component={NotFound}/>
    </Switch>
);

export default hot(module)(Main);
