import { ethers } from 'ethers';
import React from 'react'
import MessageCard from './MessageCard'
import {DECEN_MESSAGE_CONTRACT} from "../contractsConfig"
import decenmessagingjson from "../assets/decenmessaging.json"

const CurrentMessage = () => {

  const returnCurrentMessage = async () =>{
    try{
      const {ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum)
        const DecenMessaging = new ethers.Contract(DECEN_MESSAGE_CONTRACT, decenmessagingjson.abi, provider )

        const messages = await DecenMessaging.viewReceivedMessages()
      }

    }catch(error){
      console.log(error)
    }
  }


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