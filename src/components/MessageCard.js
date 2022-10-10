import React from 'react'

const MessageCard = (props) => {
  const onReply = () =>{
    
  }
  return (
    <div>
        <h2>{props.from}</h2>
        <div>
            <p>{props.textMessage}</p>
        </div>
        <div>
            <button props={onReply} >reply</button>
        </div>
    </div>
  )
}

export default MessageCard