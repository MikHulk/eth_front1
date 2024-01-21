"use client"

import { useState, useEffect, useRef } from "react"
import { getAddress } from 'viem'
import { Box, Card } from "@chakra-ui/react"

import { publicClient, addressIsValid, formatBal } from './eth'
import InputGroup from './inputs'


export default function Home() : React.ReactNode {
  const [address, setAddress] = useState("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
  const [bal, setBal] = useState(0)
  const ref = useRef<HTMLInputElement | null>(null)

  const client = publicClient
      
  useEffect(() => {
    const getBal = async () => {
      let bal = await client.getBalance(
        {
          address: getAddress(address),
        }
      )
      setBal(Number(bal))
    }
    if(addressIsValid(address))
      getBal().then(null, console.log)
  }, [address])

  useEffect(() => {
    ref.current?.focus()
  }, [])
  
  return (
    <main>
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
              label="Address"
              ref={ref}
              isInvalid={!addressIsValid(address)}
              value={address}
              onChange={(e: any) => setAddress(e.target.value)}
              focusBorderColor={addressIsValid(address) ? "green.400" : "orange.300"}
            />
          </Box>
          <Box p={1} alignSelf="center">
            Balance: {formatBal(bal)}
          </Box>
        </Card>
      </Box>
    </main>
  );
}
