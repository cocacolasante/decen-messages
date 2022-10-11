import React from 'react'
import MessageCard from './MessageCard'

const CurrentMessage = () => {
  return (
    <div id="content" className='message-container'>
        <div>
        <h2>From</h2>
        <div>
            <p>lorem ipsem text </p>
        </div>
        <div>
            <button>reply</button>
            <button>Delete</button>
        </div>
    </div>
    </div>
  )
}

export default CurrentMessage