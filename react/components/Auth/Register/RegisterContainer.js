import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import FlashMessage from "react-flash-message";

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
      .post("/api/auth/signup", userData)
      .then(response => {
        return response;
      })
      .then(res => {
        if (res.data.success) {
          let userData = {
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
          };
          let appState = {
            isRegistered: true,
            user: userData,
            token: res.data.token
          };
          localStorage["appState"] = JSON.stringify(appState);
          this.setState({
            isRegistered: appState.isRegistered,
            user: appState.user
          });
        } else {
          alert(`Our System Failed To Register Your Account!`);
        }
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          let err = error.response.data;
          this.setState({
            error: err.message,
            errorMessage: err.errors,
            formSubmitting: false
          });
        } else if (error.request) {
          // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
          let err = error.request;
          this.setState({
            error: err,
            formSubmitting: false
          });
        } else {
          // Something happened in setting up the request that triggered an Error
          let err = error.message;
          this.setState({
            error: err,
            formSubmitting: false
          });
        }
      })
      .finally(this.setState({ error: "" }));
  }

  handleName(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        first_name: value
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
            {this.state.error ? (
              <FlashMessage duration={900000} persistOnHover={true}>
                <h5 className={"alert alert-danger"}>
                  Error: {this.state.error}
                </h5>
                <ul>
                  {arr.map((item, i) => (
                    <li key={i}>
                      <h5 style={{ color: "red" }}>{item}</h5>
                    </li>
                  ))}
                </ul>
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
                className="btn btn-default btn-lg  btn-block mb10"
                disabled={this.state.formSubmitting ? "disabled" : ""}
              >
                Create Account
              </button>
            </form>
            <p className="text-white">
              Already have an account?
              <Link to="/login" className="text-yellow">
                {" "}
                Log In
              </Link>
              <span className="pull-right">
                <Link to="/" className="text-white">
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
