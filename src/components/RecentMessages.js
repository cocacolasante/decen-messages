
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import {DECEN_MESSAGE_CONTRACT} from "../contractsConfig"
import CurrentMessage from '../components/CurrentMessage'

import decenmessagingjson from "../assets/decenmessaging.json"


const RecentMessages = () => {
  const [currentAccount, setCurrentAccount] = useState()

  const [allMessages, setAllMessages] = useState()
  const [readMessage, setReadMessage] = useState()

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

        const messages = await DecenMessaging.viewReceivedMessages(currentAccount)

        const filteredData = messages.map((i)=>{
          let output = []
          output.push(i[0].toString()) // message number
          output.push(i[1]) //sender
          output.push(i[2]) // receiver
          output.push(i[3].toString()) // timestamp
          output.push(i[4].toString()) // message text
          return output
        })

        console.log(await messages)

        setAllMessages(filteredData)
        
        
      }

    }catch(error){
      console.log(error)
    }
  }

  const deleteMessage = async (messageNum) =>{
    try{
      const {ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const DecenMessagingContract = new ethers.Contract(DECEN_MESSAGE_CONTRACT, decenmessagingjson.abi, signer)

        let txn = await DecenMessagingContract.deleteReceivedMessage(messageNum)
        let receipt = await txn.wait()

        if(receipt.status === 1){
          console.log("Messages deleted")
        }else{
          console.log('Transaction failed')
        }
      }

    }catch(error){
      console.log(error)
    }
  }

  const handleDeleteClick = (e) =>{
    e.preventDefault()
    console.log(e.target.value)
    deleteMessage(e.target.value)
  }

  useEffect(()=>{
    checkIfWalletIsConnected()
    
  },[currentAccount])

  useEffect(()=>{
    returnAllMessages()
  },[currentAccount])

  return (
    <>
    <div id="content" className='recent-messages-container'>
        <div className='recent-messages-container2'>
            <ul className='messages-list'>
                <h4 className='recent-messages-heading'>Recent Messages</h4>
               
                {
                  !allMessages ? <p>no recent messages</p> :
                  allMessages.map((i)=>{
                    return(
                    <div key={i[0]} className='message-preview-container'>
                        <div className='message-preview'>
                            <p >{i[1].slice(0,4)}...{i[1].slice(-5)}</p>
                            <div>
                                <p>{i[4].slice(0, 15)} </p>
                            </div>
                                <button value={allMessages.indexOf(i)} onClick={e=>setReadMessage(e.target.value)} >read</button>
                                <button value={allMessages.indexOf(i)} onClick={handleDeleteClick} >delete</button>
                        </div>
                    </div>)
                  })
                }
                

                
            </ul>

        </div>
    </div>
    <div>
          <CurrentMessage messageNumber={readMessage} />
        </div>
    </>
  )
}

export default RecentMessages