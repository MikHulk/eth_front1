"use client";

import { useState, useEffect } from "react";
import { Box, Card, Heading } from "@chakra-ui/react";

import { bankAbi } from "../../abi";
import { getPublicClient, addressIsValid, formatBal } from "@/eth";

const client = getPublicClient();

export default function AccountsPage({
  params,
}: {
  params: { addr: string };
}): React.ReactNode {
  const bankAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const [bankBal, setBankBal] = useState(0);
  const userAddr = params.addr;
  const [userBankBal, setUserBankBal] = useState(0);

  const getBal = async () => {
    return await client.getBalance({
      address: bankAddress,
    });
  };

  useEffect(() => {
    if (addressIsValid(bankAddress))
      getBal().then((n) => setBankBal(Number(n)), console.log);
  }, []);

  useEffect(() => {
    const f = async () => {
      let value: BigInt = await client.readContract({
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
          <Box>
            <p>{userAddr}</p>
            <p>balance: {formatBal(userBankBal)}</p>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
