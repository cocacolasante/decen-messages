import React from 'react'
import MessagePreviewCard from './MessagePreviewCard'

const RecentMessages = () => {
  return (
    <div id="content" className='recent-messages-container'>
        <div className='recent-messages-container2'>
            <ul className='messages-list'>
                <h4 className='recent-messages-heading'>Recent Messages</h4>
                <MessagePreviewCard from="test user 2 address" messagetext="long message text testing slice " />
                <MessagePreviewCard from="test user 2 address" messagetext="long message text testing slice " />
                <MessagePreviewCard from="test user 2 address" messagetext="long message text testing slice " />
                <MessagePreviewCard from="test user 2 address" messagetext="long message text testing slice " />
                <MessagePreviewCard from="test user 2 address" messagetext="long message text testing slice " />
                <MessagePreviewCard from="test user 2 address" messagetext="long message text testing slice " />
                <MessagePreviewCard from="test user 2 address" messagetext="long message text testing slice " />

                
            </ul>

        </div>
    </div>
  )
}

export default RecentMessages