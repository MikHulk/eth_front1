"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Card,
} from "@chakra-ui/react"

import InputGroup from '../inputs'
import { publicClient, addressIsValid } from '../eth'


export default function Bank() : React.ReactNode {
  const bankAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  const [bankBal, setBankBal] = useState(0)

  useEffect(() => {
    const getBal = async () => {
      let bal = await publicClient.getBalance(
        {
          address: bankAddress,
        }
      )
      setBankBal(Number(bal))
    }
    if(addressIsValid(bankAddress))
      getBal().then(null, console.log)
  }, [])
  
  return (
    <Box
      display="flex"
      alignItems="center"
      w="100%"
      justifyContent="center"
    >
      <Card w="66%" mt={5} p={2}>
        <Box p={1} alignSelf="center">
          <p>Salut Gros</p>
          <p>{bankAddress}</p>
          <p>{bankBal}</p>
          <InputGroup
            label="Address"
            h={10}
            w={515}
            placeholder="rentre ton adress privé ici gros tkt ;-)"
          />
        </Box>
      </Card>
    </Box>
  )
}
