import React, {Component} from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import { toast } from 'react-toastify';

class Header extends Component {
  
    constructor(props) {
      super(props);
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
      };
      localStorage["appState"] = JSON.stringify(appState);

      toast.info('Adios!', {
        autoClose: 1600
      });
      setTimeout(() => {
        window.location.reload('login');
      }, 1000);
    }

    render() {
      const aStyle = {
        cursor: 'pointer'
    };
    
    return (
        <nav className="navbar navbar-light bg-light">
            <span className="navbar-brand">
              <Link className="navbar-brand logo" to="/dashboard"><img src="/img/logo-app.png" /></Link>
            </span>
            <ul className="navbar-nav">
              <li className="nav-item">
                {this.state.isLogged &&
                    <a onClick={this.logOut}>Logout</a>
                } 
                {!this.state.isLogged &&
                <li>
                    <Link to="/login">Login</Link> |
                    <Link to="/register">Register</Link>
                </li>
                }
              </li>
            </ul>
        </nav>
    )
  }
}

export default withRouter(Header)
