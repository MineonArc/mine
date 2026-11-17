# MINE on Arc Roadmap

[Project overview](README.md) · [On-chain verification](PROOF.md)

## 1. Launch on Arc

**Status · In preparation**

Publish the verified MINE token contract, the MINE/USDC pool ID, the relevant escrow address, and the fee configuration confirmed on Arc Mainnet.

**Completion evidence:** Deployment and explorer links, the pool ID, and the confirmed buy tax, sell tax, and fee allocations.

## 2. Prove the first payout

**Status · After launch**

Verify the first successful USDC payout to an eligible holder or batch of holders. Publish the receipt here and in the [Proof panel](https://mineonarc.com/#protocol-proof).

**Completion evidence:** Amount paid, block number, transaction hash and explorer link. For a batch, identify the transfer or set of transfers included in the reported amount.

### Post-Quantum Verified Receipts

**Status · Planned**

Publish an open verifier for signed MINE launch records and payout receipts. The verifier will report the MINE signature and the Arc evidence as separate results. Start with clearly labelled test fixtures, then apply the format to a confirmed payout once the receipt verifier and the key publication process are reviewed. Publish the on-chain evidence as soon as the payout is confirmed.

**Feature completion evidence:** A published receipt, documented public key, reproducible verification and a test showing that an altered field fails verification. See the [post-quantum design and release criteria](POST-QUANTUM.md).

## 3. Open protocol data

**Status · After the first verified payout**

Publish data for eligible trade volume, holder credits, holder payouts, and executed burns. Use the same on-chain data for a read-only holder view.

**Completion evidence:** Each metric has a source, unit, time window and last processed block. Report USDC credited and USDC paid separately. Identify burns by their executed transactions and report the amount in MINE tokens.
