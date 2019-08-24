import React, { useEffect, useState } from 'react'

const Browser = () => {
  const [loaded, load] = useState(false)

  const loadWeb = useEffect(() => {
    load(true)
  }, [])

  const renderWebview = () => {
    return <webview id="foo" src="http://www.google.com/" style={{ width:'100%', height:'600px'}} ></webview>
  }

  return (
    <div>
      {
        !loaded ? "loading..." : renderWebview()
      }
    </div>
  )
}

export default Browser;