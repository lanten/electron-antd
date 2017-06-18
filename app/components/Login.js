import React, { Component, PropTypes } from 'react';

export default class Login extends Component {

  handleLogin() {
    const { onLogin } = this.props;
    const username = this.refs.username.value;
    console.log(username);
    // onLogin({ username, loggedIn: true });
    global.a = 2;
    this.props.router.push({ pathname: '/loggedin', state: { username, loggedIn: true } });
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <input ref="username" type="text" />
        <button onClick={this.handleLogin.bind(this)}>Log In</button>
      </div>
    );
  }
}
