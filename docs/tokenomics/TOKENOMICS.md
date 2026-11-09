# SAECOIN Tokenomics (decentralized direction)

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

## 1. Allocation (CONFIRMED, C-03, C-04)

| Allocation | SAC | Units | Share |
| --- | --- | --- | --- |
| Regular Mining Reward Pool | 17,000,000 | 1,700,000,000,000,000 | 54.84 % |
| Task Reward Pool | 2,000,000 | 200,000,000,000,000 | 6.45 % |
| Founder Reserve | 12,000,000 | 1,200,000,000,000,000 | 38.71 % |
| **Total** | **31,000,000** | **3,100,000,000,000,000** | 100 % |

1 SAC = 100,000,000 units (8 decimal places). Amounts are integers; floating point is never used.

## 2. Rules (CONFIRMED)

- Total supply never exceeds 31,000,000 SAC.
- Genesis records the whole allocation. After Genesis no SAC is created. Fees and rewards only move existing SAC.
- Every SAC has a verifiable origin and movement history.
- No Referral Pool exists.
- Regular Session Mining and PoW mining are separate things (see [REWARD_CLAIM_SPEC](REWARD_CLAIM_SPEC.md)).

## 3. Pools as keyless protocol accounts (PROPOSED, P-01)

The Regular and Task pools must not be controlled by a person, or "no founder authority" is false. Proposal: a pool has no private key. Its balance can decrease only through a claim that passes the consensus rules (valid claim, not claimed before, within the pool balance). Open: whether this is built on UTXO outputs with special consensus handling or on an account model (Q-17).

## 4. Comparison with v1.2 (history kept)

| Item | v1.2 (baseline, still in the code) | New direction |
| --- | --- | --- |
| Founder | 12,000,000 | 12,000,000 (unchanged) |
| Regular pool | 12,960,000 | **17,000,000** |
| Referral pool | 4,320,000 | **Removed** |
| Task pool | 1,720,000 | **2,000,000** |
| Total | 31,000,000 | 31,000,000 |
| Per-session distribution | 6,000 SAC ceiling, 10 SAC cap per user, 2,160 sessions, leftover to Task Pool | **Not carried over; open (Q-12)** |
| Who distributes | Central backend | Consensus rules, with claims |

The new allocation is a **change of tokenomics requested by the owner on 2026-11-09**. It is recorded as CONFIRMED. The engine, SQL and v1.2 documents have **not** been updated to it, and no number in them was changed by this documentation work.

## 5. What is not decided

Reward per claim, session schedule, and lifetime of the Regular Pool (Q-12); fee amounts and destinations (Q-05); the fate of leftover and forfeited coins (Q-16); token creation rules (Q-09).

## 6. Founder share and fairness (information, not a decision)

The Founder Reserve is 38.71 % of supply. It gives no consensus power in a PoW design, but unlocked coins can be sold. The public unlock schedule ([FOUNDER_RESERVE_SPEC](FOUNDER_RESERVE_SPEC.md)) is what lets others see this. Legal and disclosure questions belong to the legal review (Q-18).
