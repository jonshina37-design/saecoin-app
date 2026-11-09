# SAECOIN Master Project Specification (decentralized direction)

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

One page of the whole direction, with links to the detailed documents. Labels as in the [Decision Record](decisions/DECISION_RECORD.md).

## 1. Vision (CONFIRMED, C-01, C-02)

A decentralized blockchain network. The founder has no special authority over consensus, balances, block approval, shutdown or supply. Anyone can run a full node and validate. The wallet is non-custodial. The founder personally owns the Founder Reserve, which gives no governance or consensus control.

## 2. Supply (CONFIRMED, C-03, C-04)

| Allocation | SAC | Units (10^-8 SAC) |
| --- | --- | --- |
| Regular Mining Reward Pool | 17,000,000 | 1,700,000,000,000,000 |
| Task Reward Pool | 2,000,000 | 200,000,000,000,000 |
| Founder Reserve | 12,000,000 | 1,200,000,000,000,000 |
| **Total** | **31,000,000** | **3,100,000,000,000,000** |

No Referral Pool. No new SAC after Genesis. See [tokenomics/TOKENOMICS.md](tokenomics/TOKENOMICS.md).

## 3. How the pieces fit

| Piece | Label | Document |
| --- | --- | --- |
| PoW consensus with cumulative-work chain selection | CONFIRMED direction, parameters OPEN | [consensus/](consensus/POW_RESEARCH.md) |
| Session reward claims, block producer fee | CONFIRMED rules, amounts OPEN | [tokenomics/REWARD_CLAIM_SPEC.md](tokenomics/REWARD_CLAIM_SPEC.md) |
| Task rewards | CONFIRMED flow, verification OPEN | [tokenomics/TASK_REWARD_SPEC.md](tokenomics/TASK_REWARD_SPEC.md) |
| Founder Reserve schedule | CONFIRMED headline, edge cases OPEN | [tokenomics/FOUNDER_RESERVE_SPEC.md](tokenomics/FOUNDER_RESERVE_SPEC.md) |
| Unified Android app with swipe-down wallet | CONFIRMED | [product/UNIFIED_APP_UX_SPEC.md](product/UNIFIED_APP_UX_SPEC.md) |
| Nodes, P2P, wallet, storage | PROPOSED designs | [architecture/](architecture/BLOCKCHAIN_ARCHITECTURE.md) |
| Threats and attacks | Analysis only | [security/](security/THREAT_MODEL.md) |
| Roadmap, tests, launch checklist | PROPOSED | [development/](development/IMPLEMENTATION_ROADMAP.md) |

## 4. Honest limits

1. A blockchain verifies signatures, balances, locks and its own rules. It cannot verify that a person is real, that they are 18 or older, that they live in an allowed country, that they did a session on their phone, or that they completed a real-world task. Reward claims therefore need a stated answer to Sybil abuse (Q-11) and task verification needs stated trust limits (Q-06).
2. A new PoW chain with little hash power is weak against 51 % attacks (Q-15).
3. "No founder authority" also depends on who builds, signs and updates the software (Q-19, Q-20).
4. A phone cannot be promised to run a full node around the clock (C-11, Q-08).

## 5. Relation to the v1.2 documents

Docs 00 to 12 describe a centralized reward app. They are kept as the baseline. Where the new direction conflicts, see section 4 of the [Decision Record](decisions/DECISION_RECORD.md). The v1.2 code (engine, SQL) is not changed by this set and still follows v1.2 tokenomics (four accounts including the Referral Pool).

## 6. Implementation

None yet (C-13). Nothing is built until the owner approves, in order, the open items in [decisions/OPEN_QUESTIONS.md](decisions/OPEN_QUESTIONS.md).
