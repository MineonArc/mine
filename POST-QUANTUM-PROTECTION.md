# Preparing for a Post-Quantum Future

**MINE on Arc · Public commitment and project scope**  
**Status · An interactive signed-receipt demo is available. Production receipt verification is planned.**

## Why we are doing this

MINE intends to publish contract and pool identifiers, payout receipts, and protocol records that people can inspect independently. These records only serve that purpose if a reader can check who published them and detect a change after publication. Post-quantum signatures let us design for that requirement over the long life of public evidence.

We commit to giving this work our full engineering effort. We will test it rigorously, publish evidence people can reproduce, seek independent review before relying on it in production, and explain failures and limitations as we identify them. We cannot guarantee a security outcome or a delivery date. Availability will follow demonstrated results.

## What you can test today

Open the [Post-Quantum Proof Demo](https://mineonarc.com/post-quantum/), choose the original USDC amount, and type a different value in the second field. Choose **Sign & verify**. The browser signs the original with a temporary **SLH-DSA-SHA2-128s** key and checks the test value against the same signature. The original passes, the altered amount fails, and **Restore original** shows a valid result again.

The demo runs locally, requires no wallet, and represents no on-chain payment. Under **Technical details**, download the signed test receipt to reproduce the result with the [Node verifier](verify-demo.mjs). The [technical design](POST-QUANTUM.md) documents the format and references.

## What MINE will work toward

1. **Authenticating official records.** Publish signed records for the MINE launch, its token and pool identifiers, and confirmed payouts. Distribute the public key fingerprint through independently checkable project channels and publish procedures for rotation, compromise, and recovery.
2. **Keeping provenance and settlement verifiable.** Report the MINE signature and the Arc evidence separately. A signature authenticates what the project published. Validation against Arc checks whether a payout record agrees with the specified transaction and USDC movements.
3. **Evaluating on-chain verification.** Test the same receipt format against independent implementations and Arc's application-layer verifier. Publish reproducible results, measured costs, and the conditions under which recording a proof on Arc would improve verification.
4. **Researching authorization for project-controlled operations.** Explore opt-in design options for narrow operations under MINE's control. Test compatibility, recovery, and permissions before proposing any production use. Support from wallets, Arc, and relevant Argus contracts is part of the evaluation.

## What we'll report publicly

Every release will describe what a person can verify, the evidence used, and the conditions still being evaluated. A test receipt will remain distinct from a confirmed payout. Protection of project-published evidence, authorization to move funds, and the security of the chain are different responsibilities. The scope of each release will be documented so readers can judge it on its own evidence.

## References

- [NIST FIPS 205 — SLH-DSA](https://csrc.nist.gov/pubs/fips/205/final)
- [Arc — post-quantum security and roadmap](https://docs.arc.io/arc/concepts/post-quantum-security)
- [MINE launch and verification roadmap](ROADMAP.md)
