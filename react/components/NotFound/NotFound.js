import React, {Component} from 'react';
import {withRouter, Link} from "react-router-dom";

import './style.sass';

class NotFound extends Component {
  render() {
    return (
      <div className="content">
        <div className="flex-center position-ref full-height">
            <img className="logo" src="/img/logo-invert.png" />
            <div className="code">
                404            
            </div>
            <div className="message">
                Not Found            
                <Link to="/">Return Home</Link>
            </div>
        </div>
      </div>
    )
  } 
}
export default withRouter(NotFound)
