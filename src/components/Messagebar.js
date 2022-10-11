import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Footer from '../Routes/Footer'

const Messagebar = () => {

    const [currentAccount, setCurrentAccount] = useState()

    const connectWallet = async () =>{
        try{
            const {ethereum} = window;
            if(!ethereum){
                alert("Please install Metamask")
                return;
              }

            const accounts = await ethereum.request({method: "eth_requestAccounts"})
            const account = accounts[0]

            setCurrentAccount(account)

            console.log(`Account connected: ${accounts[0]}`)
  
        }catch(error){
            console.log(error)
        }
    }

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

    useEffect(()=>{
        checkIfWalletIsConnected()
    },[])


  return (
    <>
    <div className='top--div--'>
      <div className='logo-div'>
            <h2>Logo</h2>
        </div>
        <div className='top-bar-div'>
            <div className='nav-div'>
                <ul className='nav-ul'>
                    <Link to="/" className='nav-li'>Messages</Link>
                    <Link to="/sent" className='nav-li'>Sent</Link>
                </ul>
            </div>
            <div className='button-div'>
        {!currentAccount ?  <button onClick={connectWallet}>Connect Wallet</button>: <p>{currentAccount.slice(0, 6)}...{currentAccount.slice(-6)}</p>}
        </div>
        </div>
       
    </div>
    <Outlet />
    <Footer />
    </>
  )
}

export default Messagebar