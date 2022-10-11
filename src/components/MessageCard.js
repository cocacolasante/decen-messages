import React from 'react'

const MessageCard = (props) => {
  
  const onReply = async () =>{

  }
  return (
    <div id="from-header-container">
          <h2 >{props.from}</h2>
        <div>
            <p>{props.messagetext} </p>
        </div>
        <div>
            <button>reply</button>
            <button>Delete</button>
        </div>
    </div>
  )
}

export default MessageCard