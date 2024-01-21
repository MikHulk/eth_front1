export const bankAbi = [
  {
    type: "function",
    name: "getBalanceOfUser",
    inputs: [
      {
        name: "_user",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "sendEthers",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [
      {
        name: "_amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    name: "Bank__NotEnoughEthersOnTheSC",
    inputs: [],
  },
  {
    type: "error",
    name: "Bank__NotEnoughFundsProvided",
    inputs: [],
  },
  {
    type: "error",
    name: "Bank__WithdrawFailed",
    inputs: [],
  },
] as const;
