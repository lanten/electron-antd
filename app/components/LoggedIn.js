import React, { Component } from 'react';
import { Button } from 'antd';

export default class LoggedIn extends Component {
  constructor(props){
    super(props)
    console.log(this.props,this.props.location.state,global.a)
  }
  render() {
    return (
      <div>
        <h2>Logged in as </h2>
        <Button onClick={() => {
          console.log(this.props.router)
          this.props.router.goBack();
        }}>Test</Button>
      </div>
    );
  }
}
