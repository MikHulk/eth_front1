"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Card,
  Heading,
} from "@chakra-ui/react"

import InputGroup from '../inputs'
import { publicClient, addressIsValid, formatBal } from '../eth'


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
      <Card w="75%" mt={5} p={2}>
        <Box p={1} alignSelf="center"  m={2}>
          <Box display="flex"
            flexDir="column"
            alignSelf="center"
            alignItems="center"
            justifyContent="center"
            color="green.200"
            mb={5}
          >
            <Heading fontSize={20}>GanstaBank</Heading>
            <p><i>la bank des gangsters</i></p>
          </Box>
          <p>établissement sis {bankAddress}</p>
          <p>Balance de la bank: {formatBal(bankBal)}</p>
          <Box  mt={3}>
            <InputGroup
              label="Address"
              h={10}
              w={615}
              placeholder="rentre ton adress privé ici gros tkt ;-)"
            />
          </Box>
        </Box>
      </Card>
    </Box>
  )
}
