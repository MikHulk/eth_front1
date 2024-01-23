"use client";

import NextLink from "next/link";
import { useState, useEffect } from "react";
import { parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { Box, Button, Card, Heading, Link } from "@chakra-ui/react";

import { bankAbi } from "./abi";
import InputGroup from "@/components/inputs";
import {
  getWsClient,
  addressIsValid,
  privAddrIsValid,
  formatBal,
  getWalletClient,
} from "@/eth";

const amountRe = /^[0-9]*$/g;
const wsClient = getWsClient();
const walletClient = getWalletClient();

export default function Bank(): React.ReactNode {
  const bankAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const [bankBal, setBankBal] = useState(0);
  const [addr, setAddr] = useState("");
  const [userAddr, setUserAddr] = useState<null | string>(null);
  const [amount, setAmount] = useState("");
  const [userBankBal, setUserBankBal] = useState(0);

  function parseAmount({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) {
    if (value.match(amountRe)) setAmount(value);
  }

  const getBal = async () => {
    return await wsClient.getBalance({
      address: bankAddress,
    });
  };

  useEffect(() => {
    if (addressIsValid(bankAddress))
      getBal().then((n) => setBankBal(Number(n)));
  }, []);

  useEffect(() => {
    const f = async () => {
      let value: BigInt = await wsClient.readContract({
        address: bankAddress,
        abi: bankAbi,
        functionName: "getBalanceOfUser",
        args: [userAddr],
        enabled: false,
      });
      return value;
    };
    if (userAddr && addressIsValid(userAddr)) {
      f().then((n: BigInt) => setUserBankBal(Number(n)), console.error);
    }
  }, [userAddr]);

  function sendMoney() {
    const send = async () => {
      // @ts-ignore
      const account = privateKeyToAccount(addr);
      const { request } = await wsClient.simulateContract({
        account,
        address: bankAddress,
        abi: bankAbi,
        functionName: "sendEthers",
        value: parseEther(amount),
      });
      setTimeout(() => setUserAddr(account.address), 2000);
      return await walletClient.writeContract(request);
    };
    if (privAddrIsValid(addr)) {
      send().then();
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
          {userAddr ? (
            <Box>
              <p>{userAddr}</p>
              <p>solde du compte: {formatBal(userBankBal)}</p>
              <Box display="flex" justifyContent="center">
                <Link as={NextLink} color="green.100" href={ "/bank/accounts/" + userAddr }>
                  mon compte
                </Link>
              </Box>
            </Box>
          ) : (
            <Box />
          )}
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
            <InputGroup
              label="Amount"
              h={10}
              w={615}
              value={amount}
              onChange={parseAmount}
            />
          </Box>
          <Box display="flex" justifyContent="center">
            <Button m={2} onClick={sendMoney}>
              Envoie nous des sous
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
