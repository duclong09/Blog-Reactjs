import React, { Component } from "react";
import ShowAlert from "../Alert/Alert";
import "./Header.css";
import axios from "axios";
import { Link } from "react-router-dom";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      alert: false,
    };
    this.logOut = this.logOut.bind(this);
  }
  componentDidMount() {
    axios.get(`/client`).then((response) => {
      this.setState({
        currentUser: response.data.user,
      });
    });
  }
  logOut() {
    axios.get(`/logout`).then((response) => {
      this.setState({ 
          currentUser: null,
          alert: true
         });
    });
  }
  render() {
    const { currentUser } = this.state;
    let Alert = this.state.alert ? ( <ShowAlert type="success" msg="Đăng xuất thành công!" />) : null;
    if (Alert) {
      setTimeout(() => {
        this.setState({
          alert: false,
        });
        window.location.assign("/");
      }, 1000);
    }
    let UiUser;
    if (currentUser) {
      UiUser = (
        <React.Fragment>
          <li>
            <Link to="/me">
              <img
                className="nav__user-img"
                src={currentUser.photo}
                alt={"photo of " + currentUser.name}
              />
              <span>{currentUser.name}</span>
            </Link>
          </li>
          <li>
            <a onClick={this.logOut}>
              Logout
            </a>
          </li>
        </React.Fragment>
      );
    } else {
      UiUser = (
        <React.Fragment>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/Sigup">Sigup</Link>
          </li>
        </React.Fragment>
      );
    }
    return (
      <header>
        <div className="wrap-mw200">
          <div className="nav">
            <div className="menu-icon">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <ul className="menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a href="/">About me</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="icon-logo"></div>
        <ul className="login-sigup">{UiUser}</ul>
        {Alert}
      </header>
    );
  }
}
export default Header;
