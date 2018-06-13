import React, { Component } from 'react';
import { Button } from 'antd';


export default class LoggedIn extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <h2>Logged in as {this.props.location.state.username}</h2>
        <Button onClick={() => {
          this.props.router.goBack();
        }}>返回</Button>
      </div>
    );
  }
}
