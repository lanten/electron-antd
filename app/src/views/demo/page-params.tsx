import React from 'react'

export default class PageParams extends React.Component<PageProps> {
  get pageParams(): string {
    return JSON.stringify(this.props.match.params)
  }

  get pageQuery(): string {
    return JSON.stringify(this.props.query)
  }

  render(): JSX.Element {
    return (
      <div className="page-params layout-padding">
        <p>Params: {this.pageParams}</p>
        <p>Query: {this.pageQuery}</p>
      </div>
    )
  }
} // class PageParams end
