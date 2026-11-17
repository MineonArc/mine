# Fee Model and Simulator

[Project overview](README.md) · [On-chain verification](PROOF.md)

## Proposed launch configuration

MINE plans to launch with USDC as the quote asset. For standard buys and sells in the launch pool, the proposed tax is 1% on either side. Portal 8 adds its 1% base fee and directs 30% of the combined fee to Argus Treasury. The other 70% funds the MINE allocations. The opening-window surcharge is excluded from the calculations below.

| Allocation | Share of the MINE pool | Effective share of standard swap volume |
| --- | ---: | ---: |
| Buyback and burn | 43% | 0.602% |
| Liquidity | 38% | 0.532% |
| Holder distributions | 17% | 0.238% |
| Creator | 2% | 0.028% |
| Argus Treasury | Separate share of the combined fee | 0.600% |

The 17% distribution allocation applies to the MINE pool. Under the proposed fee configuration, the allocation equals 0.238% of standard trade volume before applying any wallet's share.

## Worked example

| Step | Calculation | Result |
| --- | --- | ---: |
| Daily trade volume | Hypothetical input | 100,000 USDC |
| Combined fees | Volume × 2% | 2,000 USDC |
| Argus Treasury | Combined fees × 30% | 600 USDC |
| MINE pool | Combined fees × 70% | 1,400 USDC |
| Holder distribution allocation | MINE pool × 17% | 238 USDC |
| Illustrative holder credit | Distribution allocation × 0.125% eligible balance share | 0.2975 USDC |

The simulator rounds the last value to 0.30 USDC and treats the eligible balance share as constant for the scenario. In Portal 8, credits accrue on individual trades in proportion to eligible balances. The pool and designated infrastructure addresses are excluded from earning. If a trade has no eligible holders, the holder allocation goes to the treasury under Portal 8 rules.

A holder credit is an amount recorded by the protocol. A payout is a transfer that settles a credit. Allocated buyback and liquidity fees likewise become executed activity when their respective lanes run.

[Argus Portal 8 fee and eligibility rules](https://argus.world/docs/portal-8-fees) · [MINE simulator](https://mineonarc.com/)
