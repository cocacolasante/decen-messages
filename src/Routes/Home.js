import React from 'react'
import RecentMessages from '../components/RecentMessages'
import CurrentMessage from '../components/CurrentMessage'

const Home = () => {
  return (
    <div className='recent-message-route'>
        <RecentMessages />
        <div>
          <CurrentMessage />
        </div>
    </div>
  )
}

export default Home