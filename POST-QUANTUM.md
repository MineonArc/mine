# Post-Quantum Verified Receipts

**Status · Planned**  
**Roadmap milestone · Prove the first payout**

[Project overview](README.md) · [Roadmap](ROADMAP.md) · [On-chain verification](PROOF.md)

MINE plans to publish post-quantum signatures for its official launch records and USDC payout receipts. Anyone will be able to download a record, verify who published it, and compare its claims with Arc. The planned verifier will work without connecting a wallet.

## What people will verify

| Record | Evidence included |
| --- | --- |
| Launch record | Network and chain ID, MINE token and USDC identifiers, pool ID, relevant escrow, verified deployment references and fee settings |
| Payout receipt | Network and chain ID, the launch record it refers to, payout transaction hash, block number and hash, and the USDC movements included in the reported amount |

Where a payout uses a batch, the receipt will identify the relevant log indices and explain whether the amount covers one transfer or a set of transfers. Values will be encoded as integer strings in the units of the selected event source. The display will convert those values using that source's documented decimals. The verifier will use one canonical event source per movement so a transfer represented in both native and ERC-20 views of USDC is counted once.

## Two independent results

1. **MINE signature.** Verify the signed bytes with the trusted public key for that record. A valid signature confirms origin and integrity. It authenticates what MINE published.
2. **Arc evidence.** Resolve the recorded transaction on the specified network. Check status, block, launch and escrow attribution, and the included USDC movements. A match supports the payout claim. If chain data is unavailable, the result remains pending even when the MINE signature passes.

Example fixtures will carry a test-only key and environment identifier. The verifier will reject them when asked for production proof. Public verification will expose separate results for invalid signatures, unknown or revoked keys, mismatched Arc data, and unavailable chain data.

## Proposed signature and key design

- **Algorithm.** Evaluate SLH-DSA-SHA2-128s under NIST FIPS 205. Arc Mainnet supports verification of this parameter set at the application layer. Validate the exact signature and message encoding against both an independent implementation and Arc before choosing the production format.
- **Signed data.** Version the receipt format. Bind the project identifier, environment, chain ID, record type and key ID to the signed payload. Use deterministic UTF-8 serialization under RFC 8785 and a fixed application domain for signing. Reject unknown versions, ambiguous input and oversized records.
- **Public trust.** Publish the public key fingerprint independently through the project site and the project GitHub. The verifier will use a pinned key or a trusted key history. Receipt-supplied keys require independent confirmation.
- **Key operations.** Keep production signing keys isolated from the site and verification service. Publish the key validity period, the rotation and revocation procedure, and how historical receipts are treated if a key is compromised. Correct a receipt by issuing a new version with a reference to the superseded record.
- **Optional Arc anchoring.** Evaluate recording a digest of the signed evidence on Arc for independent timestamping and lookup. Publish contract code, test transactions and measured costs before adopting anchoring. Existing payout flows will continue to use the launch's documented contracts.

## Delivery sequence

| Stage | Intended deliverable | Evidence required to advance |
| --- | --- | --- |
| Prototype | An open verifier and a downloadable, clearly labelled test receipt | Valid fixtures pass. A changed amount, address, chain ID or block fails signature verification. An unknown key, revoked key or unsupported version never shows as verified. |
| First verified payout | A signed receipt and publicly reproducible results once the first eligible payout is independently confirmed | A published key and fingerprint, a receipt that verifies outside the site, and exact agreement with Arc evidence for the published USDC amount. |
| Arc verification and telemetry | Evaluate on-chain verification and optional anchoring. Apply signed provenance to public data after the payout format is stable. | Matching off-chain and Arc test vectors, measured transaction cost, and published sources, time windows and last processed block for each metric. |
| Account security research | Explore an opt-in smart account for narrowly scoped operations under MINE's control | Testnet evidence for recovery, authorization and compatibility with Arc and the relevant Argus contracts, followed by independent security review before any production funds are involved. |

This proposal covers the authenticity of MINE-published evidence. Wallet and signing security, protocol fund custody, network consensus and privacy are separate workstreams. Arc lists native post-quantum transaction signing as a future milestone. MINE will publish the evidence for each delivered capability before describing it as available.

## References

- [Arc post-quantum verification and roadmap](https://docs.arc.io/arc/concepts/post-quantum-security)
- [Arc USDC system events](https://docs.arc.io/arc/references/usdc-system-events)
- [NIST FIPS 205: Stateless Hash-Based Digital Signature Standard](https://csrc.nist.gov/pubs/fips/205/final)
- [RFC 8785: JSON Canonicalization Scheme](https://www.rfc-editor.org/rfc/rfc8785.html)
- [Argus Portal 8 contracts](https://argus.world/docs/portal-8-contracts)
