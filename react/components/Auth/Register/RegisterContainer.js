import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import FlashMessage from "react-flash-message";
import { toast } from 'react-toastify';
import axios from 'axios';

class RegisterContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRegistered: false,
      error: "",
      errorMessage: "",
      formSubmitting: false,
      user: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      redirect: props.redirect
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
  }

  componentWillMount() {
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({ isLogged: AppState.isLogged, user: AppState });
    }
    if (this.state.isRegistered) {
      return this.props.history.push("/dashboard");
    }
  }

  componentDidMount() {
    const { prevLocation } = this.state.redirect.state || {
      prevLocation: { pathname: "/dashboard" }
    };
    if (prevLocation && this.state.isLogged) {
      return this.props.history.push(prevLocation);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ formSubmitting: true });
    ReactDOM.findDOMNode(this).scrollIntoView();
    let userData = this.state.user;
    axios
      .post("/auth/signup", userData)
      .then(response => {
        return response;
      })
      .then(res => {
        if (res.status==200) {
           let userData = {
             id: res.data.user.id,
             name: res.data.user.name,
             email: res.data.user.email,
           };
           let appState = {
             isLogged: true,
             user: userData,
             token: res.data.token
           };

           axios.defaults.headers.common = {'Authorization': `Bearer ${` +res.data.token+ `}`}
           localStorage["appState"] = JSON.stringify(appState);
           this.setState({
              isLogged: appState.isLogged,
              user: appState.user,
              error: ''
           });
           toast.success('Wellcome! Logging you in in 3 seconds...', { autoClose: 3000 });
           setTimeout(() => {
              location.reload()
           }, 3000);
        } else {
            toast.warning('Could not sign you in... Please try again.');
        }
      })
      .catch(error => {
        error.response.data.errors.map((e) => {
            toast.warning(e);
        });
        this.setState({formSubmitting: false});
      })
      .finally(this.setState({ error: "" }));
  }

  handleName(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        name: value
      }
    }));
  }
  handleEmail(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        email: value
      }
    }));
  }
  handlePassword(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        password: value
      }
    }));
  }
  handlePasswordConfirm(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        password_confirmation: value
      }
    }));
  }
  render() {

    let errorMessage = this.state.errorMessage;
    let arr = [];
    Object.values(errorMessage).forEach(value => arr.push(value));
    return (
      <div className="container">
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
            <h2>Create Your Account</h2>
            {this.state.isRegistered ? (
              <FlashMessage duration={60000} persistOnHover={true}>
                <h5 className={"alert alert-success"}>
                  Registration successful, redirecting...
                </h5>
              </FlashMessage>
            ) : (
              ""
            )}
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  required
                  onChange={this.handleName}
                />
              </div>
              <div className="form-group">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  className="form-control"
                  required
                  onChange={this.handleEmail}
                />
              </div>
              <div className="form-group">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  required
                  onChange={this.handlePassword}
                />
              </div>
              <div className="form-group">
                <input
                  id="password_confirm"
                  type="password"
                  name="password_confirm"
                  placeholder="Confirm Password"
                  className="form-control"
                  required
                  onChange={this.handlePasswordConfirm}
                />
              </div>
              <button
                type="submit"
                name="singlebutton"
                className="btn btn-success btn-lg btn-block mb10"
                disabled={this.state.formSubmitting ? "disabled" : ""}
              >
                Create Account
              </button>
            </form>
            <br />
            <p className="text-white">
              Already have an account?
              <Link to="/login">
                {" "}
                Log In
              </Link>
              <span className="pull-right">
                <Link to="/">
                  Back to Home
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterContainer);
