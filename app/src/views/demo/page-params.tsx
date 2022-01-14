import React from 'react'

const PageParams: React.FC<PageProps> = (props) => {
  const pageParams = JSON.stringify(props.params)
  const pageQuery = JSON.stringify(props.query)

  console.log('PageParams', props.params)
  console.log('PageQuery', props.query)

  return (
    <div className="page-params layout-padding">
      <p>Params: {pageParams}</p>
      <p>Query: {pageQuery}</p>
    </div>
  )
} // class PageParams end

export default PageParams
