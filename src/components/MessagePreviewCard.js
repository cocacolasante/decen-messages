import React from 'react'

const MessagePreviewCard = (props) => {
  return (
    <div className='message-preview-container'>
        <div className='message-preview'>
            <h2 >{props.from}</h2>
            <div>
                <p>{props.messagetext.slice(0, 10)} </p>
            </div>
        </div>
    </div>
  )
}

export default MessagePreviewCard