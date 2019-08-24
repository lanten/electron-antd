import React, { useEffect }  from 'react'
import { Button } from 'antd'
import Nav from '../../components/shared/nav'
import Browser from '../../components/shared/browser';

const Home = () => {
  return (
    <div>
      <Nav/>
      <Browser />
    </div>
  )
}

export default Home;
