This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install depedencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## INFO

Link:
- "https://dydx-rest.publicnode.com/swagger/"
- "https://docs.cosmos.network/main/build/building-modules/genesis"
- "https://docs.keplr.app/api/#"

address delegator test: **dydx144lgmly4qlgnuftqw8z8lpf80ggdw4ju3e3mcx**

address validator test: **dydxvaloper1rqhxemv6e5x43uny8qdyq78zneuk49pe5gkltz**

Token_Denom: **adydx**

Number_format: 18 decimals

| Request  | URL  |  Method |   
|---|---|---|
| Available All Balance          | [/cosmos/bank/v1beta1/balances/{address}](https://dydx-rest.publicnode.com/swagger/#/Query/AllBalance)                                                        | GET |
| Available Balance              | [/cosmos/bank/v1beta1/balances/{address}/by_denom](https://dydx-rest.publicnode.com/swagger/#/Query/Balance)                                                  | GET | 
|  Staked Balance                | [/cosmos/staking/v1beta1/delegations/{delegator_addr}](https://dydx-rest.publicnode.com/swagger/#/Query/DelegatorDelegations)                                 | GET |
| Rewards(to claim)              | [/cosmos/distribution/v1beta1/delegators/{delegator_address}/rewards](https://dydx-rest.publicnode.com/swagger/#/Query/DelegationTotalRewards)                | GET |
| Unbonding                      | [/cosmos/staking/v1beta1/delegators/{delegator_addr}/unbonding_delegations](https://dydx-rest.publicnode.com/swagger/#/Query/DelegatorUnbondingDelegations)   | GET |   
| Delegators Validators          | [/cosmos/staking/v1beta1/delegators/{delegator_addr}/validators](https://dydx-rest.publicnode.com/swagger/#/Query/DelegatorValidators)                        | GET |  
| Delegation for said validator  | [/cosmos/staking/v1beta1/validators/{validator_addr}/delegations/{delegator_addr}](https://dydx-rest.publicnode.com/swagger/#/Query/Delegation)               | GET |  
| CommunityPool Balance          | [/cosmos/distribution/v1beta1/community_pool](https://dydx-rest.publicnode.com/swagger/#/Query/CommunityPool)                                                 | GET |  
