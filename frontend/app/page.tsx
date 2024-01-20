"use client"

import { useState, useEffect } from "react"
import { localhost } from 'viem/chains'
import { publicClient } from './eth'
import { Box } from "@chakra-ui/react"


export default function Home() {
  const [address, setAddress] = useState("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
  const [bal, setBal] = useState(0)

  const client = publicClient

  useEffect(() => {
    const getBal = async () => {
      let bal = await client.getBalance(
        {
          address: address,
        }
      )
      setBal(Number(bal))
    }
    if(address.length == 42) 
      getBal()
  }, [address])
  
  const formatBal = () : String => {
    if (bal > Math.pow(10, 18)) {
      return bal * Math.pow(10, -18) + " ether"
    } else if (bal > Math.pow(10, 9)) {
      return bal * Math.pow(10, -9) + " gwei"
    } else { return bal + " wei" }
  }
  
  return (
    <main style={{ height: '100%', padding: '5px' }}>
      <Box>
        <input
          style={{width: '27em'}}
          value={address}
          onChange={(e) => setAddress(e.target.value)}>
        </input>
      </Box>
      <Box>
        {formatBal()}
      </Box>
    </main>
  );
}
