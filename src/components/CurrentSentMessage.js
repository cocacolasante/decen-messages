import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import {DECEN_MESSAGE_CONTRACT} from "../contractsConfig"
import decenmessagingjson from "../assets/decenmessaging.json"

const CurrentSentMessage = ({messageNumber}) => {
  const [currentAccount, setCurrentAccount] = useState()

  const [allMessages, setAllMessages] = useState()
  const [replyMessage, setReplyMessage] = useState()
  const [isReplying, setIsReplying] = useState(false)
  const [replyAddress, setReplyAddress] = useState()

  const checkIfWalletIsConnected = async () =>{
    const {ethereum} = window;
    if(!ethereum){
        alert("Please download MetaMask")
        return;
    }else{
        console.log("Ethereum Object Found")
    }

    const accounts = await ethereum.request({method: "eth_accounts"})

    if(accounts.length !== 0){
        setCurrentAccount(accounts[0])

        console.log(`Current Account ${accounts[0]}`)

    }else{
        console.log("no authorized account found")
    }
    
    

}

  const returnAllMessages = async () =>{
    try{
      const {ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum)
        const DecenMessaging = new ethers.Contract(DECEN_MESSAGE_CONTRACT, decenmessagingjson.abi, provider )

        const messages = await DecenMessaging.viewSentMessages(currentAccount)

        const filteredData = messages.map((i)=>{
          let output = []
          output.push(i[0].toString()) // message number
          output.push(i[1]) //sender
          output.push(i[2]) // receiver
          output.push(i[3].toString()) // timestamp
          output.push(i[4].toString()) // message text
          return output
        })

        setAllMessages(filteredData[messageNumber]) // hard coding the selected message
        setReplyAddress(filteredData[messageNumber][1])
        
      }

    }catch(error){
      console.log(error)
    }
  }

  const sendReplyMessage = async () =>{
    try{
      const {ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const DecenMessagingContract = new ethers.Contract(DECEN_MESSAGE_CONTRACT, decenmessagingjson.abi, signer)

        let txn = await DecenMessagingContract.sendMessage(replyAddress, replyMessage)
        let receipt = await txn.wait()

        if(receipt.status === 1){
          console.log("Message Sent Successful!")
          

        } else {
          alert("Transaction failed, please try again")
        }
      }

    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    checkIfWalletIsConnected()
    
  },[])
  
  useEffect(()=>{
    returnAllMessages()
  },[currentAccount, messageNumber])

 

  return (
    <div id="from-header-container">
    {!allMessages ? <p>Please Select A Message To Read</p> :
      (
        <>
        <h2 >{allMessages[1]}</h2>
        <div>
            <p>{allMessages[4]} </p>
        </div>
        <div>
          {!isReplying ? <button onClick={setIsReplying(true)}>reply</button> :
            <div>
              <input type="textarea" onChange={e=>setReplyMessage(e.target.value)} />
              <button onClick={sendReplyMessage} >Send</button>
              
            </div>
          }
            
            <button>Delete</button>
        </div>
        </>
      )
    }
          
    </div>
  )
}

export default CurrentSentMessage