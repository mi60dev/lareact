import React, { Component } from "react";
import {Link, withRouter} from 'react-router-dom';
import RegisterContainer from "./RegisterContainer";

import AuthHeader from '../Header';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: props.location
    };
  }
  render() {
    return (
        <div>
            <AuthHeader />
            <div className="content">
                <RegisterContainer redirect={this.state.redirect} />
            </div>
        </div>
    );
  }
}

export default withRouter(Register);
