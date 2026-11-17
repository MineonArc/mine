# On-chain Verification

[Project overview](README.md) · [Roadmap](ROADMAP.md)

**Status · Pre-launch**

The verification register below covers MINE-specific deployment and payouts on **Arc Mainnet, chain ID 5042**. Links and values will be added as the underlying records are verified.

| Evidence | Status |
| --- | --- |
| Verified token contract and deployment transaction | Pending |
| MINE/USDC pool ID and escrow address | Pending |
| On-chain buy and sell taxes and allocations | Pending |
| First holder payout amount in USDC | Pending |
| First payout block, transaction hash and explorer link | Pending |

## Verify the first payout

1. Open the published transaction in Arc Etherscan and confirm the network, success status and block.
2. Match the payout to the published MINE launch and its escrow contract.
3. Inspect the USDC transfer logs. Match the token contract, recipient and amount to the receipt. For a batch, check which transfers make up the reported total.

## Verify a signed MINE record

**Status · Planned**

The [Post-Quantum Verified Receipts design](POST-QUANTUM.md) adds a publisher signature to official MINE records. The public verifier will show two independent results.

- **MINE signature** verifies the integrity and origin of the record using a known project key.
- **Arc evidence** checks the record against the published MINE launch, the transaction receipt and the relevant USDC movements.

Prototype data will be labelled as test data. A live receipt will show the network, block, transaction and the transfer or transfers it covers.

## Verify public metrics

| Metric | Definition |
| --- | --- |
| Trading volume | Quote amount of included swaps in the published MINE/USDC pool over the stated window |
| USDC credited | New eligible holder credits recorded over the stated window |
| USDC paid | USDC transfers that settle MINE holder credits over the stated window |
| MINE burned | MINE tokens sent to the burn address by confirmed burn-lane transactions over the stated window |

For each reported value, publish the sources and the last block included. A missing source or unprocessed block range should be shown as pending coverage.

## References

- [MINE Proof panel](https://mineonarc.com/#protocol-proof)
- [Argus Portal 8 overview](https://argus.world/docs/portal-8)
- [Argus Portal 8 fees and holder eligibility](https://argus.world/docs/portal-8-fees)
- [Portal 8 contracts on Arc](https://argus.world/docs/portal-8-contracts)
