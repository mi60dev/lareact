import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

import Header from '../Layouts/Header/Header';
import Footer from '../Layouts/Footer/Footer';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      isLogged: false,
      user: {}
    }
  }
// check if user is authenticated and storing authentication data as states if true
  componentWillMount() {
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({ isLogged: AppState.isLogged, user: AppState.user });
    }
    axios.get('/user')
    .then(res => {
        console.log(res);
    });
  }

render() {
    return (
      <div>
        <Header userData={this.state.user} userIsLoggedIn={this.state.isLogged}/>
            <span>Dashboard</span> <br/>
            <pre></pre>
        <Footer/>
      </div>
      )
    }
  }
export default withRouter(Home)
