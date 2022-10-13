import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import {DECEN_MESSAGE_CONTRACT} from "../contractsConfig"
import decenmessagingjson from "../assets/decenmessaging.json"


const NewMessage = () => {
    const [toAddress, setToAddress] = useState()


  return (
    <div>
        <h2>NewMessage</h2>
        <div>
            <h5>To: </h5>
            <input type="text" onChange={e=>setToAddress(e.target.value)} />
        </div>
    </div>
  )
}

export default NewMessage