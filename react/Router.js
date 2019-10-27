import React from 'react';
import {hot} from 'react-hot-loader';
import {
    BrowserRouter, 
    Link, 
    Route, 
    Switch
} from 'react-router-dom';
import axios from "axios";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";

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

const Wrapper = styled.div`
    .fade-enter {
        opacity: 0.01;
    }
    .fade-enter.fade-enter-active {
        opacity: 1;
        transition: opacity 300ms ease-in;
    }
    .fade-exit {
        opacity: 1;
    }
      
    .fade-exit.fade-exit-active {
        opacity: 0.01;
        transition: opacity 300ms ease-in;
    }

      div.transition-group {
           position: relative;
      }
      section.route-section {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
      }
`;

function Main({ location }) {
    return (
    <Wrapper>
    <TransitionGroup className="transition-group">
        <CSSTransition
          key={location.key}
          timeout={{ enter: 100, exit: 50 }}
          classNames={'fade'}
        >
        <section className="route-section">
        <Switch className="app"  location={location}>
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
        </section>
        </CSSTransition>
      </TransitionGroup>
    </Wrapper>
    );
};

export default hot(module)(Main);
