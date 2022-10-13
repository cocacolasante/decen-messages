import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import {DECEN_MESSAGE_CONTRACT} from "../contractsConfig"
import decenmessagingjson from "../assets/decenmessaging.json"


const NewMessage = () => {
    const [currentAccount, setCurrentAccount] = useState()

    const [toAddress, setToAddress] = useState()
    const [messageText, setMessageText] = useState()

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

    const sendMessage = async () =>{
      try{
        const {ethereum } = window;
        if(ethereum ){
          const provider = new ethers.providers.Web3Provider(ethereum)
          const signer = provider.getSigner()
          const DecenMessagingContract = new ethers.Contract(DECEN_MESSAGE_CONTRACT, decenmessagingjson.abi, signer)

          if(toAddress && messageText){
            let txn = await DecenMessagingContract.sendMessage(toAddress, messageText)
            let receipt = await txn.wait()


            if(receipt.status === 1){
              console.log("Message Sent Successful!")
              
            } else {
              alert("Transaction failed, please try again")
            }
          }
          
        }

      }catch(error){
        console.log(error)
      }

    }

    useEffect(()=>{
      checkIfWalletIsConnected()
      
    },[currentAccount])


    return (
      <div className='new-message-container'>
          <h2>NewMessage</h2>
          <div>
              <h5>To: <input type="text" onChange={e=>setToAddress(e.target.value)} /></h5>
              
              
              <textarea rows="4" cols="50" placeholder='message text' onChange={e=>setMessageText(e.target.value)} />
              <br />
              <button onClick={sendMessage} >Send Message</button>
          </div>
      </div>
    )
}

export default NewMessage