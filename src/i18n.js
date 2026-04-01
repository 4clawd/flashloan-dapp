export const languages = [
  { code: 'en', label: 'EN' },
  { code: 'zh-CN', label: '简中' },
  { code: 'ru', label: 'RU' },
]

export const translations = {
  en: {
    layout: {
      protocol: '4CLAW PROTOCOL',
      booting: 'AI SYSTEM INITIALIZING...',
      online: 'SYSTEM: ONLINE',
      powered: 'POWERED BY BSC',
      featuredAsset: 'Featured Asset',
      installationGuide: 'Installation Guide',
      sendPrompt: 'SEND PROMPT TO AGENT',
      launchTerminal: 'bash -- approve.sh',
      recentApprovals: 'Recent Approvals',
      loadingApprovalData: 'LOADING APPROVAL DATA...',
      products: 'Products',
      protocolLinks: 'Protocol Links',
      ecosystem: 'Ecosystem',
      contractAddresses: 'Contract Addresses',
      systemOperational: 'SYSTEM STATUS: OPERATIONAL',
      approveTerminal: 'Agent Approval Rail',
      allowanceMonitor: 'Agent Liquidity Monitor',
      bscExecution: 'AgentFi Execution Rail',
    },
    meta: {
      badge: 'The first agent flashloan protocol on BSC',
      title: 'Approve BUSD once and let 4Claw power agent-native flash liquidity for on-chain arbitrage.',
      description:
        '4Claw is built as the first flashloan protocol for agents executing on-chain arbitrage. This page only handles ERC20 approval so agents can source atomic liquidity from wallet allowance on BSC.',
      primaryCta: 'Approve BUSD',
      secondaryCta: 'Read contract details',
    },
    nav: {
      overview: 'Overview',
      approval: 'Approve',
      contracts: 'Contracts',
      faq: 'FAQ',
    },
    warnings: {
      walletConnect:
        'WalletConnect is using a fallback project id. Set VITE_WALLETCONNECT_PROJECT_ID before production deployment.',
      wrongNetwork: 'This dapp only supports BNB Smart Chain.',
      noWallet: 'Connect a wallet to review balance, allowance, and send approval.',
      invalidAmount: 'Enter a valid approval amount greater than zero.',
    },
    hero: {
      eyebrow: 'Single-purpose approval interface',
      sectionTitle: 'What this dapp does',
      bullets: [
        'Connect a wallet on BNB Smart Chain.',
        'Approve BUSD allowance to the 4Claw flashloan proxy.',
        'Keep funds in your wallet until a whitelisted atomic strategy uses the approved amount.',
      ],
    },
    metrics: {
      walletBalance: 'Wallet BUSD balance',
      approved: 'Approved allowance',
      effective: 'Effective flash liquidity',
      coverage: 'Allowance coverage',
      conservative: 'Conservative',
      balanced: 'Balanced',
      full: 'Full-range',
      disconnected: 'Connect wallet',
    },
    approval: {
      sectionTitle: 'Approve liquidity',
      title: 'Grant agent flashloan allowance',
      description:
        'Approval authorizes the 4Claw proxy to source BUSD for agent-driven arbitrage inside one atomic flashloan workflow. No funds move during approval itself.',
      fieldLabel: 'Approval amount',
      fieldHint: 'The proxy spender is fixed to the deployed flashloan contract.',
      useUnlimited: 'Use unlimited approval',
      maxBalance: 'Use wallet max',
      presets: 'Quick amounts',
      spender: 'Spender',
      token: 'Token',
      walletBalance: 'Wallet balance',
      currentAllowance: 'Current allowance',
      effectiveLiquidity: 'Usable flash liquidity',
      formula: 'Formula',
      formulaValue: 'usable liquidity = min(wallet balance, approved allowance)',
      actionConnect: 'Connect wallet',
      actionSwitch: 'Switch to BSC',
      actionApprove: 'Approve now',
      actionPending: 'Approval pending',
      actionConfirming: 'Waiting for confirmation',
      success: 'Approval confirmed on BSC.',
      helperUnlimited:
        'Max approval gives agents a stable liquidity rail, but it also widens approval exposure.',
      helperExact:
        'Exact approval keeps tighter risk boundaries and matches many DeFi treasury policies.',
      txLink: 'View transaction',
    },
    flow: {
      sectionTitle: 'Business flow',
      steps: [
        {
          title: '1. Prepare agent liquidity',
          body: 'You approve BUSD from your wallet to the 4Claw proxy. Tokens stay in your wallet while agents gain callable flash liquidity.',
        },
        {
          title: '2. Execute arbitrage atomically',
          body: 'A whitelisted executor borrows liquidity for an agent strategy inside one transaction and must return it before execution completes.',
        },
        {
          title: '3. Settle with lender protection',
          body: 'The contract checks lender balances before and after the agent path runs. Any mismatch reverts the full transaction.',
        },
      ],
    },
    defi: {
      sectionTitle: 'DeFi logic',
      cards: [
        {
          title: 'Allowance-backed liquidity',
          body: '4Claw turns pre-approved BUSD into callable atomic liquidity without forcing deposits into a pooled vault.',
        },
        {
          title: 'Atomic constraint',
          body: 'The flashloan operation must borrow, use, and repay within one transaction. Otherwise the full call reverts.',
        },
        {
          title: 'Risk surface',
          body: 'Your main control is allowance size. Lower approval means lower callable liquidity and narrower exposure.',
        },
      ],
    },
    formula: {
      sectionTitle: 'Operational formulas',
      items: [
        {
          title: 'Usable liquidity',
          body: 'usable = min(balance, allowance)',
        },
        {
          title: 'Coverage ratio',
          body: 'coverage = allowance / balance',
        },
        {
          title: 'Exposure note',
          body: 'larger allowance -> more callable liquidity -> wider approval exposure',
        },
      ],
    },
    contracts: {
      sectionTitle: 'Contracts and addresses',
      description:
        'This dapp only targets the verified BNB Smart Chain deployment below.',
      proxy: 'Flashloan proxy',
      implementation: 'Implementation',
      factory: 'CREATE2 factory',
      token: 'Approved token',
      note: 'Approve only the proxy address above. That address is the spender.',
      visit: 'Open on BscScan',
    },
    contractNotes: {
      sectionTitle: 'Contract notes',
      items: [
        'The proxy is the spender that receives ERC20 allowance.',
        'The implementation contains the flashloan business logic and whitelist checks.',
        'The CREATE2 factory was only used for deterministic deployment and is not the spender for your approval.',
      ],
    },
    faq: {
      sectionTitle: 'FAQ',
      items: [
        {
          q: 'Does approval move my BUSD into a pool?',
          a: 'No. Approval only updates ERC20 allowance. Your BUSD remains in your wallet until an atomic flashloan operation uses the allowance.',
        },
        {
          q: 'Why is the usable amount smaller than my approval?',
          a: 'Effective flash liquidity is capped by the lower of your wallet balance and approved allowance.',
        },
        {
          q: 'Why does the dapp only support BSC?',
          a: 'This frontend is intentionally restricted to the deployed BNB Smart Chain contracts to avoid approving the wrong network.',
        },
        {
          q: 'Should I choose unlimited approval?',
          a: 'Unlimited approval is operationally convenient but increases approval exposure. Exact approval is stricter and usually safer.',
        },
      ],
    },
    proof: {
      label: 'Verified Sample',
      title: 'Mainnet round-trip proof',
      description:
        'A real BSC transaction already borrowed 0.5 BUSD through the live proxy and returned it in the same transaction. This sample is shown as direct proof that the protocol is operating normally on mainnet.',
      txHash: 'Transaction',
      amount: 'Borrow amount',
      gasUsed: 'Gas used',
      executor: 'Executor',
      lender: 'Lender',
      borrower: 'Borrower',
    },
    footer: {
      rights: '4Claw is building the benchmark AgentFi flashloan rail on BNB Smart Chain.',
      website: 'Website',
      telegram: 'Telegram',
      github: 'GitHub',
      linktree: 'Linktree',
    },
  },
  'zh-CN': {
    layout: {
      protocol: '4CLAW PROTOCOL',
      booting: 'AI SYSTEM INITIALIZING...',
      online: 'SYSTEM: ONLINE',
      powered: '由 BSC 提供支持',
      featuredAsset: '核心资产',
      installationGuide: '安装指引',
      sendPrompt: '向代理发送指令',
      launchTerminal: 'bash -- approve.sh',
      recentApprovals: '最近授权状态',
      loadingApprovalData: '正在加载授权数据...',
      products: '产品模块',
      protocolLinks: '协议链接',
      ecosystem: '生态',
      contractAddresses: '合约地址',
      systemOperational: '系统状态：运行中',
      approveTerminal: '授权终端',
      allowanceMonitor: '授权监控',
      bscExecution: 'BSC 执行通道',
    },
    meta: {
      badge: 'BSC 上的授权驱动流动性',
      title: '一次授权 BUSD，让 4Claw 从你的钱包授权额度中调度原子闪贷流动性。',
      description:
        '这个 dapp 只处理 ERC20 授权，不会存入资金。闪贷合约只能在单笔原子交易内使用你的授权额度。',
      primaryCta: '授权 BUSD',
      secondaryCta: '查看合约说明',
    },
    nav: {
      overview: '概览',
      approval: '授权',
      contracts: '合约',
      faq: '常见问题',
    },
    warnings: {
      walletConnect:
        'WalletConnect 当前使用的是占位 project id。正式部署前请设置 VITE_WALLETCONNECT_PROJECT_ID。',
      wrongNetwork: '该 dapp 仅支持 BNB Smart Chain。',
      noWallet: '请先连接钱包，再查看余额、授权额度并发起授权。',
      invalidAmount: '请输入大于 0 的有效授权数量。',
    },
    hero: {
      eyebrow: '单一职责授权界面',
      sectionTitle: '这个 dapp 是做什么的',
      bullets: [
        '在 BNB Smart Chain 上连接钱包。',
        '向 4Claw 闪贷代理合约授权 BUSD 额度。',
        '资金继续保留在你的钱包中，只有白名单原子策略会在交易内临时使用授权额度。',
      ],
    },
    metrics: {
      walletBalance: '钱包 BUSD 余额',
      approved: '已授权额度',
      effective: '可用闪贷流动性',
      coverage: '授权覆盖率',
      conservative: '保守',
      balanced: '平衡',
      full: '全量',
      disconnected: '请连接钱包',
    },
    approval: {
      sectionTitle: '授权流动性',
      title: '授予闪贷额度',
      description:
        '授权只允许 4Claw 代理在原子闪贷流程中调用你的 BUSD。授权时不会转走任何资金。',
      fieldLabel: '授权数量',
      fieldHint: 'spender 固定为已部署的闪贷代理合约地址。',
      useUnlimited: '使用无限授权',
      maxBalance: '使用钱包最大余额',
      presets: '快捷数量',
      spender: 'Spender',
      token: '代币',
      walletBalance: '钱包余额',
      currentAllowance: '当前授权额度',
      effectiveLiquidity: '可用闪贷流动性',
      formula: '公式',
      formulaValue: '可用流动性 = min(钱包余额, 已授权额度)',
      actionConnect: '连接钱包',
      actionSwitch: '切换到 BSC',
      actionApprove: '立即授权',
      actionPending: '授权发送中',
      actionConfirming: '等待链上确认',
      success: '授权已在 BSC 上确认。',
      helperUnlimited: '无限授权可减少重复交易，但会扩大授权暴露面。',
      helperExact: '精确授权更符合风险边界控制，也更适合多数 DeFi 金库策略。',
      txLink: '查看交易',
    },
    flow: {
      sectionTitle: '业务流程',
      steps: [
        {
          title: '1. 授权',
          body: '你向 4Claw 代理授权 BUSD，代币仍然留在你的钱包中。',
        },
        {
          title: '2. 原子调用',
          body: '白名单执行者只能在单笔交易内借用并使用这笔流动性，交易结束前必须归还。',
        },
        {
          title: '3. 结算校验',
          body: '合约会校验 lender 在执行前后的余额，任何不匹配都会导致整笔交易回滚。',
        },
      ],
    },
    defi: {
      sectionTitle: 'DeFi 逻辑',
      cards: [
        {
          title: '授权即流动性',
          body: '4Claw 将预授权的 BUSD 转化为可调用的原子流动性，而不是要求用户先存入资金池。',
        },
        {
          title: '原子约束',
          body: '闪贷流程必须在一笔交易内完成借出、使用和归还，否则整笔调用回滚。',
        },
        {
          title: '风险面',
          body: '你的核心控制项是授权额度。授权越大，可调用流动性越高，暴露面也越大。',
        },
      ],
    },
    formula: {
      sectionTitle: '运营公式',
      items: [
        {
          title: '可用流动性',
          body: 'usable = min(balance, allowance)',
        },
        {
          title: '覆盖率',
          body: 'coverage = allowance / balance',
        },
        {
          title: '暴露提示',
          body: '授权越大 -> 可调用流动性越大 -> 授权暴露面越大',
        },
      ],
    },
    contracts: {
      sectionTitle: '合约与地址',
      description: '该 dapp 仅面向下列已部署并验证的 BNB Smart Chain 合约。',
      proxy: '闪贷代理合约',
      implementation: '实现合约',
      factory: 'CREATE2 工厂',
      token: '授权代币',
      note: '请只向上面的代理合约地址授权。它才是真正的 spender。',
      visit: '在 BscScan 查看',
    },
    contractNotes: {
      sectionTitle: '合约说明',
      items: [
        '代理合约地址就是 ERC20 授权的 spender。',
        '实现合约承载闪贷逻辑、白名单校验和原子归还约束。',
        'CREATE2 工厂仅用于确定性部署，并不是你要授权的 spender。',
      ],
    },
    faq: {
      sectionTitle: '常见问题',
      items: [
        {
          q: '授权后我的 BUSD 会进入资金池吗？',
          a: '不会。授权只会更新 ERC20 allowance。你的 BUSD 仍在钱包中，只有在原子闪贷交易执行时才会临时调用授权额度。',
        },
        {
          q: '为什么可用额度比我的授权更小？',
          a: '因为实际可调用的闪贷流动性取决于钱包余额和授权额度中的较小值。',
        },
        {
          q: '为什么这个 dapp 只支持 BSC？',
          a: '前端刻意只支持当前已部署的 BNB Smart Chain 合约，避免你在错误网络上误授权。',
        },
        {
          q: '我应该选择无限授权吗？',
          a: '无限授权操作上更方便，但风险暴露更大。精确授权更严格，也通常更安全。',
        },
      ],
    },
    proof: {
      label: '已验证样例',
      title: '主网往返交易证明',
      description:
        '该样例展示了一笔已经在 BSC 主网上完成的真实交易：通过当前 proxy 借出 0.5 BUSD，并在同一笔交易中原额归还。这直接证明协议已经在主网上正常运行。',
      txHash: '交易哈希',
      amount: '借款金额',
      gasUsed: 'Gas 消耗',
      executor: '执行者',
      lender: '出借地址',
      borrower: '借款合约',
      viewOnBscscan: '在 BscScan 查看',
    },
    footer: {
      rights: '面向 BNB Smart Chain 的 4Claw 授权界面。',
      website: '官网',
      telegram: '电报群',
      github: 'GitHub',
      linktree: 'Linktree',
    },
  },
  ru: {
    layout: {
      protocol: '4CLAW PROTOCOL',
      booting: 'AI SYSTEM INITIALIZING...',
      online: 'SYSTEM: ONLINE',
      powered: 'POWERED BY BSC',
      featuredAsset: 'Ключевой актив',
      installationGuide: 'Руководство по запуску',
      sendPrompt: 'ОТПРАВИТЬ КОМАНДУ АГЕНТУ',
      launchTerminal: 'bash -- approve.sh',
      recentApprovals: 'Последние статусы approve',
      loadingApprovalData: 'ЗАГРУЗКА ДАННЫХ APPROVE...',
      products: 'Модули',
      protocolLinks: 'Ссылки протокола',
      ecosystem: 'Экосистема',
      contractAddresses: 'Адреса контрактов',
      systemOperational: 'СОСТОЯНИЕ СИСТЕМЫ: РАБОТАЕТ',
      approveTerminal: 'Approve-терминал',
      allowanceMonitor: 'Монитор allowance',
      bscExecution: 'Исполнительный контур BSC',
    },
    meta: {
      badge: 'Ликвидность на основе allowance в BSC',
      title:
        'Одобрьте BUSD один раз и позвольте 4Claw использовать атомарную flash liquidity из allowance вашего кошелька.',
      description:
        'Этот dapp делает только ERC20 approve. Он не принимает депозит. Flashloan-контракт может использовать allowance только внутри одной атомарной транзакции.',
      primaryCta: 'Одобрить BUSD',
      secondaryCta: 'Описание контрактов',
    },
    nav: {
      overview: 'Обзор',
      approval: 'Approve',
      contracts: 'Контракты',
      faq: 'FAQ',
    },
    warnings: {
      walletConnect:
        'WalletConnect использует заглушку project id. Перед продакшеном задайте VITE_WALLETCONNECT_PROJECT_ID.',
      wrongNetwork: 'Этот dapp работает только в BNB Smart Chain.',
      noWallet: 'Подключите кошелек, чтобы увидеть баланс, allowance и отправить approve.',
      invalidAmount: 'Введите корректную сумму approve больше нуля.',
    },
    hero: {
      eyebrow: 'Одно действие, один экран',
      sectionTitle: 'Что делает этот dapp',
      bullets: [
        'Подключает кошелек в BNB Smart Chain.',
        'Выдает approve для BUSD на proxy-контракт 4Claw.',
        'Средства остаются в кошельке, а whitelist-исполнитель может использовать allowance только атомарно.',
      ],
    },
    metrics: {
      walletBalance: 'Баланс BUSD',
      approved: 'Allowance',
      effective: 'Доступная flash liquidity',
      coverage: 'Покрытие allowance',
      conservative: 'Консервативно',
      balanced: 'Сбалансировано',
      full: 'Полный диапазон',
      disconnected: 'Подключите кошелек',
    },
    approval: {
      sectionTitle: 'Выдать allowance',
      title: 'Разрешить flashloan-лимит',
      description:
        'Approve лишь разрешает proxy 4Claw вызывать ваш BUSD в атомарном flashloan-сценарии. Во время approve токены не переводятся.',
      fieldLabel: 'Сумма approve',
      fieldHint: 'Spender жестко зафиксирован на адресе развернутого flashloan proxy.',
      useUnlimited: 'Безлимитный approve',
      maxBalance: 'Использовать весь баланс',
      presets: 'Быстрые суммы',
      spender: 'Spender',
      token: 'Токен',
      walletBalance: 'Баланс кошелька',
      currentAllowance: 'Текущий allowance',
      effectiveLiquidity: 'Доступная flash liquidity',
      formula: 'Формула',
      formulaValue: 'usable liquidity = min(balance кошелька, allowance)',
      actionConnect: 'Подключить кошелек',
      actionSwitch: 'Переключить на BSC',
      actionApprove: 'Подтвердить approve',
      actionPending: 'Approve отправляется',
      actionConfirming: 'Ожидание подтверждения',
      success: 'Approve подтвержден в BSC.',
      helperUnlimited:
        'Безлимитный approve снижает число повторных транзакций, но увеличивает зону риска allowance.',
      helperExact:
        'Точный approve держит более строгие границы риска и лучше подходит для консервативных DeFi-политик.',
      txLink: 'Открыть транзакцию',
    },
    flow: {
      sectionTitle: 'Бизнес-процесс',
      steps: [
        {
          title: '1. Approve',
          body: 'Вы выдаете allowance BUSD на proxy 4Claw. Токены остаются в кошельке.',
        },
        {
          title: '2. Атомарное использование',
          body: 'Whitelist-исполнитель может занять ликвидность только внутри одной транзакции и обязан вернуть ее до завершения вызова.',
        },
        {
          title: '3. Проверка расчетов',
          body: 'Контракт сверяет баланс lender до и после выполнения. Любое отклонение приводит к полному revert.',
        },
      ],
    },
    defi: {
      sectionTitle: 'Логика DeFi',
      cards: [
        {
          title: 'Ликвидность через allowance',
          body: '4Claw превращает заранее одобренный BUSD в вызываемую атомарную ликвидность без необходимости заводить депозит в пул.',
        },
        {
          title: 'Атомарное ограничение',
          body: 'Заем, использование и возврат ликвидности должны произойти в рамках одной транзакции, иначе все откатится.',
        },
        {
          title: 'Поверхность риска',
          body: 'Главный рычаг контроля пользователя — размер allowance. Чем он больше, тем выше доступная ликвидность и шире зона риска.',
        },
      ],
    },
    formula: {
      sectionTitle: 'Рабочие формулы',
      items: [
        {
          title: 'Доступная ликвидность',
          body: 'usable = min(balance, allowance)',
        },
        {
          title: 'Коэффициент покрытия',
          body: 'coverage = allowance / balance',
        },
        {
          title: 'Замечание по риску',
          body: 'больше allowance -> больше вызываемая ликвидность -> шире зона риска approve',
        },
      ],
    },
    contracts: {
      sectionTitle: 'Контракты и адреса',
      description:
        'Этот dapp работает только с развернутыми и проверенными контрактами BNB Smart Chain ниже.',
      proxy: 'Flashloan proxy',
      implementation: 'Implementation',
      factory: 'CREATE2 factory',
      token: 'Токен для approve',
      note: 'Approve нужно выдавать только proxy-адресу выше. Именно он является spender.',
      visit: 'Открыть в BscScan',
    },
    contractNotes: {
      sectionTitle: 'Пояснение по контрактам',
      items: [
        'Proxy-адрес — это именно тот spender, который получает ERC20 allowance.',
        'Implementation содержит бизнес-логику flashloan и whitelist-проверки.',
        'CREATE2 factory использовался только для детерминированного деплоя и не является spender для approve.',
      ],
    },
    faq: {
      sectionTitle: 'FAQ',
      items: [
        {
          q: 'Approve переводит мой BUSD в пул?',
          a: 'Нет. Approve только обновляет ERC20 allowance. BUSD остается в вашем кошельке, пока атомарная flashloan-транзакция не использует allowance.',
        },
        {
          q: 'Почему доступная сумма меньше allowance?',
          a: 'Потому что реальная flash liquidity ограничена меньшим из двух значений: балансом кошелька и allowance.',
        },
        {
          q: 'Почему dapp работает только в BSC?',
          a: 'Интерфейс намеренно ограничен текущим развертыванием в BNB Smart Chain, чтобы не допустить approve в неверной сети.',
        },
        {
          q: 'Стоит ли выбирать безлимитный approve?',
          a: 'Это удобно, но увеличивает риск allowance. Точный approve строже и обычно безопаснее.',
        },
      ],
    },
    proof: {
      label: 'Подтвержденный пример',
      title: 'Доказательство round-trip на mainnet',
      description:
        'Этот блок показывает реальную транзакцию в BSC mainnet: через текущий proxy было занято 0.5 BUSD и возвращено в той же транзакции. Это прямое подтверждение того, что протокол уже работает в основной сети.',
      txHash: 'Транзакция',
      amount: 'Сумма займа',
      gasUsed: 'Газ',
      executor: 'Исполнитель',
      lender: 'Лендер',
      borrower: 'Borrower-контракт',
      viewOnBscscan: 'Открыть в BscScan',
    },
    footer: {
      rights: 'Интерфейс approve для 4Claw в BNB Smart Chain.',
      website: 'Website',
      telegram: 'Telegram',
      github: 'GitHub',
      linktree: 'Linktree',
    },
  },
}

export function getText(locale, path) {
  const read = (source) =>
    path.split('.').reduce((value, segment) => value?.[segment], source)

  const localized = read(translations[locale] || {})
  if (localized !== undefined) return localized

  return read(translations.en)
}
