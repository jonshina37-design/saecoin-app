# 09 — Genesis and Founder Reserve Design (O-06)

Status: design confirmed by the owner (D-21, D-24). It implements D-03, D-04, D-05, D-11, and D-13 and does not change them. Items still marked "proposed" below (for example, the 2-of-3 threshold details) need owner approval. It is independent of the PoW algorithm choice (O-01).

## 1. What must be true

| Requirement | Source |
| --- | --- |
| Reserve is exactly 2,100,000 SAC in 20 equal parts of 105,000 SAC | D-03, D-04 |
| Each part is locked by chain rules until its release height; nobody can shorten the schedule | D-04, D-05, D-11 |
| Founder holds the keys, in multisig / hardware wallets | D-13 |
| No admin key and no override | D-05 |
| Public reserve addresses, announced before launch | D-11, D-15 |

## 2. The genesis-coinbase problem

In Bitcoin Core, the genesis block's coinbase output cannot be spent, because it is hard-coded outside the UTXO set. The 20 reserve outputs therefore cannot simply be placed in the genesis coinbase of a fork.

### Options

| Option | How | Pros | Cons |
| --- | --- | --- | --- |
| **A. Consensus rule for block 1 (proposed)** | Block 1's coinbase must contain exactly the 20 reserve outputs, in addition to the normal subsidy; any miner must include them | Small, well-defined consensus change; outputs are real, spendable UTXOs; anyone can verify | A special rule for one height; must be tested carefully |
| B. Modified genesis handling | Change the client so genesis outputs enter the UTXO set | Reserve exists from block 0 | Larger, riskier change to core code |
| C. Pre-funded outputs in a normal transaction | Founder creates a transaction | No special consensus rule | Not enforced by the protocol, which defeats D-05; **rejected** |

**Decided (D-21): Option A.**

Rules for Option A:
1. At height 1 only, the coinbase may pay the normal subsidy plus the reserve outputs, and the block is invalid if any of the 20 outputs is missing, altered, or has a different amount or script.
2. The scripts and amounts are hard-coded in the client and published in the whitepaper.
3. The 21,000,000 SAC supply cap check counts these outputs as part of the reserve allocation, never as extra mining subsidy.

## 3. Reserve output structure

Each of the 20 outputs is a timelocked multisig:

| Item | Value |
| --- | --- |
| Amount | 10,500,000,000,000 units (105,000 SAC) each, total 2,100,000,000,000,000 units |
| Lock type | Absolute **block-height** timelock (CLTV-style) |
| Spending condition | Locktime reached **and** m-of-n multisig signature (proposed: **2-of-3**, see section 5) |
| Script type | Segwit script-hash (P2WSH-style), if supported by the chosen codebase |

### Release heights

Using 10-minute blocks and a "month" of 4,320 blocks (30 days):

| Release | Lock height | Earliest block that can include the spend |
| --- | ---: | ---: |
| 1 | 103,680 | 103,681 |
| 2 | 108,000 | 108,001 |
| … | +4,320 | … |
| 20 | 185,760 | 185,761 |

Note on the off-by-one: in Bitcoin's rules, a transaction with `nLockTime = N` is final only in a block with height **greater than** N. So the earliest spend is the block after the lock height.

### Two honest caveats about "2 years"

1. 24 months × 30 days = **720 days**, which is slightly under two calendar years (730 days). **Decided (D-24):** the first lock height is 103,680 (the "24 months of 30 days" convention). A full 730 days would have been 105,120; it was not chosen.
2. Height is not calendar time. If blocks come slower or faster than 10 minutes on average, the real-time lock moves. This is inherent to a height lock, and the whitepaper should say so.

## 4. How the founder spends a released part

1. Wait until the chain height is above the lock height.
2. Build a transaction with `nLockTime` at or above the lock height, spending one reserve output.
3. Sign with 2 of the 3 keys (hardware wallets, offline), using a partially signed transaction workflow.
4. Broadcast. Nodes accept it only if the height rule and signatures pass.

Practical risk: standard wallets and hardware wallets may not support this custom script directly. The spend procedure must be **rehearsed on the testnet** with the exact same script structure before mainnet. Confirm that the chosen codebase's descriptor or script tooling supports it.

## 5. Key custody (D-13)

Proposed baseline (owner decides; O-15):

| Item | Proposal |
| --- | --- |
| Scheme | 2-of-3 multisig (3-of-5 is an alternative if more safety against loss is wanted) |
| Keys | Three separate hardware wallets from at least two different vendors |
| Locations | Three different, physically secure places; never together |
| Backup | Recovery phrases written on durable media, stored separately, with a documented procedure |
| Online exposure | None. Keys never touch an internet-connected computer |
| Inheritance | A written plan for what happens if the founder is unavailable (a trusted person or a legal arrangement). Lost keys cannot be recovered by anyone |
| Rehearsal | Full create-sign-broadcast rehearsal on testnet, and a restore-from-backup test |

Because there is no admin key (D-05), a lost reserve cannot be rescued by anyone. This is by design, but it means key loss is permanent.

## 6. Verification everyone can do

Before launch, publish: the 20 scripts, their addresses, the amounts, the lock heights, and the exact block-1 rule. After launch, anyone can verify with their own node that:

1. Block 1 contains exactly these 20 outputs.
2. The sum equals 2,100,000 SAC.
3. No spend of any reserve output appears before its lock height.

## 7. Tests required before mainnet

1. A block 1 missing, altering, or adding any reserve output is rejected.
2. A spend of any reserve output before its lock height is rejected, with the wrong number of signatures, and with the right number of signatures but a wrong key.
3. A valid spend after the lock height is accepted.
4. Total issued supply never exceeds 21,000,000 SAC, including the rounding effect from doc 01 (0.021 SAC).
5. Reorg tests around the lock heights.
6. A testnet with a compressed schedule (for example, the same logic with much shorter lock heights) to exercise all 20 releases quickly.

## 8. Risks

| Risk | Note |
| --- | --- |
| Bug in the block-1 rule | Could allow extra coins or break the cap. Needs independent review and tests |
| Script or signing incompatibility | Mitigated by rehearsing on testnet |
| Key loss or theft | Permanent. See section 5 |
| Public perception | A visible 2.1M reserve in block 1 will be examined. Publish it early and plainly (D-15) |
| Height drift | Real time of unlocks differs from the nominal schedule |

## 9. Open items

| ID | Item |
| --- | --- |
| O-15 | Exact multisig threshold, vendors, locations, and inheritance arrangement |
| O-20 | *Resolved* — Option A (consensus rule at block 1) confirmed as D-21, with the codebase fixed by D-18 |
