import { createPublicClient, http } from 'viem'
import { localhost, mainnet } from 'viem/chains'

console.log(process.env.NEXT_PUBLIC_ETH_LOCAL ? "Local node" : "mainnet")

const chain = process.env.NEXT_PUBLIC_ETH_LOCAL ? localhost : mainnet

console.log(chain);

export const publicClient = createPublicClient({
      chain: chain,
      transport: http()
})
