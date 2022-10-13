import React from 'react'
import RecentMessages from '../components/RecentMessages'
import NewMessage from '../components/NewMessage'

const Home = () => {
  return (
    <div className='recent-message-route'>
      <h1>Inbox</h1>
          <RecentMessages />
          <NewMessage />
    </div>
  )
}

export default Home