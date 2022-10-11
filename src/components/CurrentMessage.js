import React from 'react'
import MessageCard from './MessageCard'

const CurrentMessage = () => {
  return (
    <div id="content" className='message-container'>
        <MessageCard 
          from="test"
          messagetext="a long paragraph of text, super long lorem ipsom keeping the texting going, hopefully will see a wrap around shortly"
        />
    </div>
  )
}

export default CurrentMessage