import React from "react";
import axios from "axios";
import "./Me.css";
class Me extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
          name: null,
          email:null,
          photo:null
      }
    };
  }
  componentDidMount() {
    axios.get(`/client`).then((response) => {
      this.setState({
        currentUser: response.data.user,
      });
    });
  }
  render() {
    return (
      <div className="box-account">
        <nav className="user-view__menu">
          <ul className="side-nav">
            <li className="side-nav--active">
              <a href="#">Settings</a>
            </li>
            <li>
              <a href="/my-tours">My bookings</a>
            </li>
            <li>
              <a href="#">My reviews</a>
            </li>
            <li>
              <a href="#">Billing</a>
            </li>
          </ul>
        </nav>
        <div className="user-view__content">
          <div className="user-view__form-container">
            <h2 className="heading-secondary">Your account settings</h2>
            <form className="form form-user-data">
              <div className="form__group">
                <label className="form__label" htmlFor="name">
                  Name
                </label>
                <input
                  className="form__input"
                  id="name"
                  type="text"
                  defaultValue={this.state.currentUser.name}
                  required
                  name="name"
                />
              </div>
              <div className="form__group ma-bt-md">
                <label className="form__label" htmlFor="email">
                  Email address
                </label>
                <input
                  className="form__input"
                  id="email"
                  type="email"
                  defaultValue={this.state.currentUser.email}
                  required
                  name="email"
                />
              </div>

              <div className="form__group form__photo-upload">
                <img
                  className="form__user-photo"
                  id="dataImg"
                  src={this.state.currentUser.photo || '/img/users/default.jpg'}
                  alt="User photo"
                />
                <input
                  className="form__upload"
                  type="file"
                  accept="image/*"
                  id="photo"
                  name="photo"
                />
                <label htmlFor="photo">Choose new photo</label>
              </div>
              <div className="form__group right">
                <button className="btn btn--small btn--green">
                  Save settings
                </button>
              </div>
            </form>
          </div>
          <div className="line">&nbsp;</div>
          <div className="user-view__form-container">
            <h2 className="heading-secondary">Password change</h2>
            <form className="form form-user-password">
              <div className="form__group">
                <label className="form__label" htmlFor="password-current">
                  Current password
                </label>
                <input
                  className="form__input"
                  id="password-current"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
              <div className="form__group">
                <label className="form__label" htmlFor="password">
                  New password
                </label>
                <input
                  className="form__input"
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
              <div className="form__group ma-bt-lg">
                <label className="form__label" htmlFor="password-confirm">
                  Confirm password
                </label>
                <input
                  className="form__input"
                  id="password-confirm"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
              <div className="form__group right">
                <button className="btn btn--small btn--green btn--save-password">
                  Save password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Me;
