import React from 'react'
import RecentMessages from '../components/RecentMessages'
import CurrentMessage from '../components/CurrentMessage'

const Home = () => {
  return (
    <div className='recent-message-route'>
    <h1>Inbox</h1>
        <RecentMessages />
        
    </div>
  )
}

export default Home