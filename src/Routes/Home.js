import React from 'react'
import RecentMessages from '../components/RecentMessages'
import CurrentMessage from '../components/CurrentMessage'

const Home = () => {
  return (
    <div>
        <RecentMessages />

        <CurrentMessage />

    </div>
  )
}

export default Home