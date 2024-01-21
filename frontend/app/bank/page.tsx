"use client"

import { useState, useEffect } from "react"
import {parseEther} from 'viem'
import {privateKeyToAccount} from 'viem/accounts'
import {
  Box,
  Button,
  Card,
  Heading,
} from "@chakra-ui/react"

import InputGroup from '../inputs'
import {
  publicClient,
  addressIsValid,
  privAddrIsValid,
  formatBal,
  walletClient,
} from '../eth'


export default function Bank() : React.ReactNode {
  const bankAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"
  const [bankBal, setBankBal] = useState(0)
  const [addr, setAddr] = useState("")

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

  useEffect(() => {
    if(privAddrIsValid(addr)) console.log(addr)
  }, [addr])

  function sendMoney() {
    const send = async () => {
      // @ts-ignore
      const account = privateKeyToAccount(addr)
      return await walletClient.sendTransaction({
        account,
        to: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        value: parseEther('1')
      })
    }
    if(privAddrIsValid(addr)) {
      send().then(console.log, console.error)
      setAddr("")
    }
  }

  const inputInvalid = addr.length != 0 && !privAddrIsValid(addr)
  return (
    <Box
      display="flex"
      alignItems="center"
      w="100%"
      justifyContent="center"
    >
      <Card w="75%" mt={5} p={2}>
        <Box p={1} alignSelf="center" m={2}>
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
          <Box mt={3}>
            <InputGroup
              label="Address"
              h={10}
              w={615}
              placeholder="rentre ton adress privé ici gros tkt ;-)"
              value={addr}
              onChange={(e: any) => setAddr(e.target.value)}
              isInvalid={inputInvalid}
              autoComplete="off"
              fontFamily={addr.length > 0 ? "password" : undefined}
              focusBorderColor={inputInvalid ? "orange.300" : "green.400"}
            />
          </Box>
          <Box
            display="flex"
            alignSelf="center"
            alignItems="center"
            justifyContent="center">
            <Button m={2} onClick={sendMoney}>
              Envoie nous des sous
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}
