import React, {Component} from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';

class AuthHeader extends Component {
  
    constructor() {
      super();
        if(localStorage.appState) {
            this.state = JSON.parse(localStorage.appState);
        } else {
            this.state = {
              user: props.userData,
              isLogged: props.userIsLoggedIn
            };
        }
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
      let appState = {
        isLogged: false,
        user: {}
      };
      localStorage["appState"] = JSON.stringify(appState);
      this.setState(appState);
      this.props.history.push('/login');
    }

    render() {
      const aStyle = {
        cursor: 'pointer'
    };
    
    return (
        <img className="logo" src="/img/logo-white.png" />
    )
  }
}

export default withRouter(AuthHeader)
