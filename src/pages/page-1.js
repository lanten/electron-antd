import React from 'react'
import { Button } from 'antd'

export default class Page extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <p>Page is ok</p>
        <hr />

        <Button>123</Button>
      </div>
    )
  }

} // class Page end