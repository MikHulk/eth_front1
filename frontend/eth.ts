import { createWalletClient, createPublicClient, http, webSocket } from "viem";
import { localhost, mainnet } from "viem/chains";

const chain = process.env.NEXT_PUBLIC_ETH_LOCAL ? localhost : mainnet;

const addrRegEx = /^0x[A-z0-9]{40}$/g;
export const addressIsValid = (address: String): Boolean =>
  address.match(addrRegEx) ? true : false;

const privAddrRegEx = /^0x[A-z0-9]{64}$/g;
export const privAddrIsValid = (address: String): Boolean =>
  address.match(privAddrRegEx) ? true : false;

export const formatBal = (bal: number): String => {
  if (bal > Math.pow(10, 18)) {
    return bal * Math.pow(10, -18) + " ether";
  } else if (bal > Math.pow(10, 9)) {
    return bal * Math.pow(10, -9) + " gwei";
  } else {
    return bal + " wei";
  }
};

let publicClient: any = null;
export const getPublicClient = () => {
  if (publicClient === null)
    publicClient = createPublicClient({
      chain: chain,
      transport: http(),
    });
  return publicClient;
};

let walletClient: any = null;
export const getWalletClient = () => {
  if (walletClient === null)
    walletClient = createWalletClient({
      chain: chain,
      transport: http(),
    });
  return walletClient;
};

const ws = process.env.NEXT_PUBLIC_ETH_LOCAL
  ? webSocket("ws://localhost:8545")
  : webSocket("wss://eth-mainnet.ws.g.alchemy.com/v2/demo");

let wsClient: any = null;
export const getWsClient = () => {
  if (wsClient === null)
    wsClient = createPublicClient({
      chain,
      transport: ws,
    });
  return wsClient;
};
