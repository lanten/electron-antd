import React from 'react'

export default class PageParams extends React.Component<PageProps> {
  get pageParams() {
    return JSON.stringify(this.props.match.params)
  }

  get pageQuery() {
    return JSON.stringify(this.props.query)
  }

  render() {
    return (
      <div className="page-params layout-padding">
        <p>Params: {this.pageParams}</p>
        <p>Query: {this.pageQuery}</p>
      </div>
    )
  }
} // class PageParams end
