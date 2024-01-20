import { createPublicClient, http } from 'viem'
import { localhost, mainnet } from 'viem/chains'

const chain = process.env.NEXT_PUBLIC_ETH_LOCAL ? localhost : mainnet

export const publicClient = createPublicClient({
      chain: chain,
      transport: http()
})
