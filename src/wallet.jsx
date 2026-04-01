import '@rainbow-me/rainbowkit/styles.css'

import {
  RainbowKitProvider,
  getDefaultConfig,
  lightTheme,
} from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { WagmiProvider, http } from 'wagmi'
import { bsc } from 'wagmi/chains'

import { APP_NAME, WALLETCONNECT_PROJECT_ID } from './config'

const queryClient = new QueryClient()

const config = getDefaultConfig({
  appName: APP_NAME,
  appDescription: 'BSC-only approval interface for 4Claw flashloan allowance.',
  appUrl: 'https://4claw.io',
  appIcon: '/logo.png',
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [bsc],
  transports: {
    [bsc.id]: http(),
  },
  ssr: false,
})

const theme = lightTheme({
  accentColor: '#f5b91f',
  accentColorForeground: '#0f172a',
  borderRadius: 'large',
  fontStack: 'system',
})

export function WalletProvider({ children }) {
  const [mounted] = useState(true)

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          appInfo={{
            appName: APP_NAME,
            learnMoreUrl: 'https://github.com/4claw/4claw-flashloan',
          }}
          initialChain={bsc}
          modalSize="compact"
          showRecentTransactions
          theme={theme}
        >
          {mounted ? children : null}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
