"use client"

import { useState, useEffect, useRef } from "react"
import { localhost } from 'viem/chains'
import { publicClient } from './eth'
import { Box, Card, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react"


export default function Home() {
  const [address, setAddress] = useState("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
  const [bal, setBal] = useState(0)
  const ref = useRef(null)

  const client = publicClient

  const addrRegEx = /^0x[A-z0-9]{40}$/g
  const addressIsValid = () => address.match(addrRegEx)
    
  
  useEffect(() => {
    const getBal = async () => {
      let bal = await client.getBalance(
        {
          address: address,
        }
      )
      setBal(Number(bal))
    }
    if(addressIsValid())
      getBal().then(null, console.log)
  }, [address])
  
  const formatBal = () : String => {
    if (bal > Math.pow(10, 18)) {
      return bal * Math.pow(10, -18) + " ether"
    } else if (bal > Math.pow(10, 9)) {
      return bal * Math.pow(10, -9) + " gwei"
    } else { return bal + " wei" }
  }

  useEffect(() => {
    ref.current.focus()
  }, [])
  
  return (
    <main p={5}>
      <Box
        display="flex"
        alignItems="center"
        w="100%"
        justifyContent="center"
      >
        <Card w="66%" mt={5} p={2}>
          <Box p={1} alignSelf="center">
            <InputGroup
              h={10}
              w={515}
              justifyContent="center">
              <InputLeftAddon>
                Address
              </InputLeftAddon>
              <Input
                errorBorderColor='red.300'
                isInvalid={!addressIsValid()}
                ref={ref}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                focusBorderColor={addressIsValid() ? "green.400" : "orange.300"}
              >
              </Input>
            </InputGroup>
          </Box>
          <Box p={1} alignSelf="center">
            Balance: {formatBal()}
          </Box>
        </Card>
      </Box>
    </main>
  );
}
