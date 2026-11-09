# SAECOIN Testing Strategy (decentralized chain)

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

PROPOSED. None of these tests exist yet. The v1.2 strategy ([11-Testing-Strategy.md](../11-Testing-Strategy.md)) covers the centralized app.

## 1. Test layers

| Layer | What |
| --- | --- |
| Unit | Amount arithmetic (integers, no overflow), serialization, signature checks, fee deduction |
| Property tests | Total supply stays 3,100,000,000,000,000 units after any sequence of valid blocks; no balance negative; claims are unique per session |
| Consensus vectors | Fixed valid and invalid blocks any implementation must agree on |
| Genesis | Exact allocation, hash, one issuance |
| Founder lock | Locked coins cannot move; exact boundary; no double unlock; total 12,000,000; reorganization near a boundary (only after approval) |
| Claims | Double claim, wrong amount, wrong signature, pool exhaustion, producer tampering, reorganization |
| Fee | Fee never creates SAC; producer payout never above the block fees |
| Difficulty | Simulated hash power swings, timestamp manipulation |
| Chain selection | Reorganizations of different depth |
| P2P | Sync from empty, malicious peers, eclipse simulation, message floods |
| Wallet | Seed recovery, signing, import, no key in logs |
| Android | Background limits, battery, data use, low storage, offline |
| Explorer | Matches the node |
| Security | Fuzzing, external review, penetration test |
| Testnet | Long run with real miners and hostile testers |

## 2. Reporting rule

A test that was not run is never reported as passed. Results record the date, version and environment.

## 3. Current state

No test exists for this direction. The v1.2 engine tests (52) and theme tests (6) that exist in the working copy check the old centralized design only.
