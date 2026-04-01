export const APP_NAME = '4Claw Agent Flashloan'

export const CONTRACTS = {
  chainId: 56,
  flashloanProxy: '0x5135d2D545045dEaF5574E35b853CBA671b0Ba46',
  implementation: '0xe26f659DA654fDdB25b367aA340328329edFdd9A',
  create2Factory: '0x4444444415490ec973562c36dA3177D288A77455',
  token: {
    symbol: 'BUSD',
    name: 'Binance-Peg BUSD',
    address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    decimals: 18,
  },
}

export const EXTERNAL_LINKS = {
  website: 'https://4claw.fun/',
  telegram: 'https://t.me/fourclaw_alert',
  github: 'https://github.com/4clawd',
  linktree: 'https://linktr.ee/4claw',
  bscscan: 'https://bscscan.com',
}

export const WALLETCONNECT_PROJECT_ID =
  import.meta.env.VITE_WALLETCONNECT_PROJECT_ID ||
  '4claw-walletconnect-project-id'

export const USING_FALLBACK_PROJECT_ID =
  WALLETCONNECT_PROJECT_ID === '4claw-walletconnect-project-id'
