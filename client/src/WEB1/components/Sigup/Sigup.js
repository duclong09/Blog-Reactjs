import React, { Component } from "react";
import ShowAlert from "../Alert/Alert";
import axios from "axios";
class Sigup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueName: "",
      valueEmail: "",
      valuePassword: "",
      valuePasswordConfirm: "",
      loadingAlert: false,
      AlertUI: null,
      created: false,
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePasswordConfirm = this.handleChangePasswordConfirm.bind(
      this
    );
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChangeName(event) {
    this.setState({ valueName: event.target.value });
  }
  handleChangeEmail(event) {
    this.setState({ valueEmail: event.target.value });
  }
  handleChangePassword(event) {
    this.setState({ valuePassword: event.target.value });
  }
  handleChangePasswordConfirm(event) {
    this.setState({ valuePasswordConfirm: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.valuePassword !== this.state.valuePasswordConfirm) {
      this.setState({
        loadingAlert: true,
        AlertUI: (
          <ShowAlert
            type="error"
            msg="Password không khớp! Vui lòng thử lại!"
          />
        ),
      });
      return;
    }
    axios
      .post("/sigup", {
        name: this.state.valueName,
        email: this.state.valueEmail,
        password: this.state.valuePassword,
        passwordConfirm: this.state.valuePasswordConfirm,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "error") {
          this.setState({
            loadingAlert: true,
            AlertUI: <ShowAlert type="error" msg={response.data.message} />,
          });
        } else {
          this.setState({
            loadingAlert: true,
            AlertUI: <ShowAlert type="success" msg={response.data.message} />,
            created: true,
          });
        }
      });
  }
  render() {
    let Alert = this.state.loadingAlert ? this.state.AlertUI : null;
    if (Alert && !this.state.created) {
      setTimeout(() => {
        this.setState({
          loadingAlert: false,
        });
      }, 1000);
    }
    if (Alert && this.state.created) {
      setTimeout(() => {
        this.setState({
          loadingAlert: false,
        });
        window.location.assign('/');
      }, 1000);
    }

    return (
      <div className="sigup-form">
        <h2 className="heading">Create your account!</h2>
        <form className="form form--signup" onSubmit={this.handleSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Your name
            </label>
            <input
              className="form__input"
              id="name"
              type="text"
              placeholder="your name"
              required
              name="name"
              value={this.state.valueName}
              onChange={this.handleChangeName}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              className="form__input"
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              name="email"
              value={this.state.valueEmail}
              onChange={this.handleChangeEmail}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              className="form__input"
              id="password"
              type="password"
              placeholder="••••••••"
              required
              minLength={8}
              name="password"
              value={this.state.valuePassword}
              onChange={this.handleChangePassword}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="passwordConfirm">
              Confirm password
            </label>
            <input
              className="form__input"
              id="passwordConfirm"
              type="password"
              placeholder="••••••••"
              required
              minLength={8}
              name="passwordConfirm"
              value={this.state.valuePasswordConfirm}
              onChange={this.handleChangePasswordConfirm}
            />
          </div>
          <div className="form__group">
            <button className="btn btn--red">Sign up</button>
          </div>
        </form>
        {Alert}
      </div>
    );
  }
}

export default Sigup;
