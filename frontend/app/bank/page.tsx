"use client";

import { useState, useEffect } from "react";
import { parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { Box, Button, Card, Heading } from "@chakra-ui/react";

import { bankAbi } from "./abi";
import InputGroup from "../inputs";
import {
  publicClient,
  addressIsValid,
  privAddrIsValid,
  formatBal,
  walletClient,
} from "../eth";

export default function Bank(): React.ReactNode {
  const bankAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const [bankBal, setBankBal] = useState(0);
  const [addr, setAddr] = useState("");

  const getBal = async () => {
    return await publicClient.getBalance({
      address: bankAddress,
    });
  };

  useEffect(() => {
    if (addressIsValid(bankAddress))
      getBal().then((n) => setBankBal(Number(n)), console.log);
  }, []);

  useEffect(() => {
    if (privAddrIsValid(addr)) console.log(addr);
  }, [addr]);

  function sendMoney() {
    const send = async () => {
      // @ts-ignore
      const account = privateKeyToAccount(addr);
      const { request } = await publicClient.simulateContract({
        account,
        address: bankAddress,
        abi: bankAbi,
        functionName: "sendEthers",
        value: parseEther("1"),
      });
      return await walletClient.writeContract(request);
    };
    if (privAddrIsValid(addr)) {
      send().then(console.log, console.error);
      setTimeout(function () {
        getBal().then((n) => setBankBal(Number(n)), console.error);
      }, 2000);
      setAddr("");
    }
  }

  const inputInvalid = addr.length != 0 && !privAddrIsValid(addr);
  return (
    <Box display="flex" alignItems="center" w="100%" justifyContent="center">
      <Card w="100%" mt={3} p={2}>
        <Box p={1} alignSelf="center" m={2}>
          <Box
            display="flex"
            flexDir="column"
            alignSelf="center"
            alignItems="center"
            justifyContent="center"
            color="green.200"
            mb={5}
          >
            <Heading fontSize={20}>GanstaBank</Heading>
            <p>
              <i>la bank des gangsters</i>
            </p>
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
              fontFamily={addr.length > 0 ? "password" : undefined}
              focusBorderColor={inputInvalid ? "orange.300" : "green.400"}
            />
          </Box>
          <Box
            display="flex"
            alignSelf="center"
            alignItems="center"
            justifyContent="center"
          >
            <Button m={2} onClick={sendMoney}>
              Envoie nous des sous
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
