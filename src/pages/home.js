import React from 'react'
import { Button } from 'antd'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="flex column">
        <Button onClick={() => {
          this.props.history.push('/demo')
        }}>demo home</Button>
        <br/>
        <Button onClick={() => {
          this.props.history.push('/demo/1')
        }}>demo 1</Button>
        <br/>
        <Button onClick={() => {
          this.props.history.push('/demo/2')
        }}>demo 2</Button>
      </div>
    )
  }

} // class Home end