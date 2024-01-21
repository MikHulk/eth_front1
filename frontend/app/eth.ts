import { createPublicClient, http } from 'viem'
import { localhost, mainnet } from 'viem/chains'

const chain = process.env.NEXT_PUBLIC_ETH_LOCAL ? localhost : mainnet

const addrRegEx = /^0x[A-z0-9]{40}$/g
export const addressIsValid =
  (address: String) : Boolean => address.match(addrRegEx) ? true : false

export const publicClient = createPublicClient({
      chain: chain,
      transport: http()
})

  
export const formatBal = (bal: number) : String => {
  if (bal > Math.pow(10, 18)) {
    return bal * Math.pow(10, -18) + " ether"
  } else if (bal > Math.pow(10, 9)) {
    return bal * Math.pow(10, -9) + " gwei"
  } else { return bal + " wei" }
}
