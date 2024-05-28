'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { http, createConfig, WagmiProvider} from 'wagmi'
import { hardhat, mainnet, sepolia, polygon, polygonMumbai  } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {getDefaultConfig, RainbowKitProvider} from '@rainbow-me/rainbowkit';

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
const queryClient = new QueryClient()

const rainbowConfig = getDefaultConfig({
  appName: 'blockmagic',
  projectId: 'fc22aad8cb523b9014f68745b40e6c79',
  chains: [hardhat, mainnet, sepolia, polygon, polygonMumbai],
  ssr: true, // If your dApp uses server side rendering (SSR)
});


const WagmiComp = ({ children }) => {
  return (
    <WagmiProvider config={rainbowConfig}>
       <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default WagmiComp;