import React from 'react'
import { Button } from 'antd'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;


export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="flex column">
        <div class="sticky-header">
          <h2>App is OK</h2>
        </div>
        <div class="content">
          <p>content here</p>
        </div>
      </div>
      )
  }

}