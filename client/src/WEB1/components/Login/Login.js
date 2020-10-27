import React from "react";
import axios from 'axios';
import ShowAlert from '../Alert/Alert';
import './LoginLogout.css';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueEmail: '',
            valuePassword: '',
            loadingAlert: false,
            data: null
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeEmail(event) {
        this.setState({ valueEmail: event.target.value });
    }
    handleChangePassword(event) {
        this.setState({ valuePassword: event.target.value });
    }

    handleSubmit(event) {
        // alert o day
        event.preventDefault();
        axios
            .post("/login", {
                email: this.state.valueEmail,
                password: this.state.valuePassword
            })
            .then(response => {
                this.setState({ loadingAlert: true,data : response.data });
            })
    }

    render() {
        let Alert = this.state.loadingAlert ? <ShowAlert type={this.state.data.status} msg={this.state.data.message} /> : null;
        if (Alert && this.state.data.status === 'error') {
            setTimeout(() => {
                this.setState({
                    loadingAlert: false
                });
            }, 1000);
        }
        if (Alert && this.state.data.status === 'success') {
            setTimeout(() => {
                this.setState({
                    loadingAlert: false
                });
                window.location.assign('/');
            }, 1000);
        }
        return (
            <div className="login-form">
                <h2 className="heading">Log into your account </h2>
                <form className="form form--login" onSubmit={this.handleSubmit}>
                    <div className="form__group">
                        <label className="form__label" htmlFor="email">Email address</label>
                        <input className="form__input" id="email" type="email" placeholder="you@example.com" required=""
                            value={this.state.valueEmail}
                            onChange={this.handleChangeEmail} />
                    </div>
                    <div className="form__group ma-bt-md">
                        <label className="form__label" htmlFor="password">Password</label>
                        <input className="form__input" id="password" type="password" placeholder="••••••••" required="" minLength="8"
                            value={this.state.valuePassword}
                            onChange={this.handleChangePassword} />
                    </div>
                    <div className="form__group">
                        <button className="btn btn--red">Login</button>
                    </div>
                </form>
                {Alert}
            </div>
        );
    }
}
export default Login;