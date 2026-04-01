const env = import.meta.env

const parseNumber = (value, fallback) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export const APP_NAME = env.VITE_APP_NAME || '4Claw Agent Flashloan'

export const CONTRACTS = {
  chainId: parseNumber(env.VITE_CHAIN_ID, 56),
  flashloanProxy:
    env.VITE_FLASHLOAN_PROXY_ADDRESS ||
    '0x44444444eD91429f16c1b2644d29Aa37dAb10CE4',
  implementation:
    env.VITE_IMPLEMENTATION_ADDRESS ||
    '0xe26f659DA654fDdB25b367aA340328329edFdd9A',
  create2Factory:
    env.VITE_CREATE2_FACTORY_ADDRESS ||
    '0x6C3fCFB72F3AdB8fbBA7687A597624D9AC126356',
  token: {
    symbol: env.VITE_TOKEN_SYMBOL || 'BUSD',
    name: env.VITE_TOKEN_NAME || 'Binance-Peg BUSD',
    address:
      env.VITE_TOKEN_ADDRESS || '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    decimals: parseNumber(env.VITE_TOKEN_DECIMALS, 18),
  },
}

CONTRACTS.spenderAddress =
  env.VITE_SPENDER_ADDRESS || CONTRACTS.flashloanProxy

export const EXTERNAL_LINKS = {
  website: env.VITE_WEBSITE_URL || 'https://4claw.fun/',
  telegram: env.VITE_TELEGRAM_URL || 'https://t.me/fourclaw_alert',
  github: env.VITE_GITHUB_URL || 'https://github.com/4clawd',
  linktree: env.VITE_LINKTREE_URL || 'https://linktr.ee/4claw',
  bscscan: env.VITE_BSCSCAN_URL || 'https://bscscan.com',
}

export const SAMPLE_TRANSACTION = {
  txHash:
    env.VITE_SAMPLE_TX_HASH ||
    '0xe393ec813c26388eef059b9d4b86b30d2b6d3d2f2e07f4084442e0e7afdf7031',
  amount: env.VITE_SAMPLE_BORROW_AMOUNT || '0.5 BUSD',
  gasUsed: env.VITE_SAMPLE_GAS_USED || '115884',
  executor:
    env.VITE_SAMPLE_EXECUTOR_ADDRESS ||
    '0xbbbb69bEdd837bdE25b7d7f954ceFe718B9EfC27',
  lender:
    env.VITE_SAMPLE_LENDER_ADDRESS ||
    '0x1A1351Cd989E6270483733D1EE83bA825d074c74',
  borrower:
    env.VITE_SAMPLE_BORROWER_ADDRESS ||
    '0xb717d513273e921Dd5552141AbDFDcd46ec9B089',
}

export const WALLETCONNECT_PROJECT_ID =
  env.VITE_WALLETCONNECT_PROJECT_ID || '4claw-walletconnect-project-id'

export const USING_FALLBACK_PROJECT_ID =
  WALLETCONNECT_PROJECT_ID === '4claw-walletconnect-project-id'
