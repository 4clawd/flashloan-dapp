# 4Claw Approval Dapp

This folder contains the BSC-only frontend for the 4Claw flashloan approval
flow.

The dapp is a single-page React + Vite application that explains the protocol
and lets a user connect a wallet and approve max token allowance to the
flashloan proxy.

## Stack

- React
- Vite
- RainbowKit
- Wagmi
- Viem

## Environment

Create a local env file:

```powershell
Copy-Item .env.example .env
```

Required variable:

- `VITE_WALLETCONNECT_PROJECT_ID`

## Commands

```powershell
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

## Notes

- Network support is restricted to BSC
- The UI supports English, Simplified Chinese, and Russian
- The only write action is `approve(max)` for the configured token and spender
