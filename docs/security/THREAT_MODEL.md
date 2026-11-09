# SAECOIN Threat Model

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

Assets: user keys, user balances, the pools (19,000,000 SAC), the Founder Reserve, chain history, the node software, user trust.

Adversaries: anonymous attackers with money, miners, large hash-power renters, malicious peers, bot farms, fake-app publishers, phishers, malware, insiders with release keys, and (for trust) the founder.

## 1. Trust boundaries

| Boundary | Trusted? |
| --- | --- |
| Peers | No |
| Backend or explorer services | No, never an authority |
| The user's phone | Partly; can be rooted or infected |
| Software signing keys | Must be trusted today (Q-20) |
| Verifiers for tasks (if used) | Limited trust (Q-06) |
| Whoever supplies eligibility facts for claims | Trusted by necessity (Q-11) |

## 2. Threats

| # | Threat | Impact | Status |
| --- | --- | --- | --- |
| T1 | 51 % or rented hash power rewrites history | Double spends, reversed claims | OPEN, high on a new chain |
| T2 | Sybil claim farming drains the Regular or Task Pool | Pool empty, honest users get nothing | **OPEN, unresolved (Q-11)** |
| T3 | Fake or scripted sessions | Same as T2 | OPEN |
| T4 | Fake task evidence | Task Pool drained | OPEN (Q-06) |
| T5 | Eclipse attack on a node or phone | Victim sees false chain | Mitigation proposed |
| T6 | Time-warp or timestamp manipulation | Difficulty and lock misuse | Study (Q-03, Q-13) |
| T7 | Replay of a signed transaction | Repeated payment | Mitigation proposed |
| T8 | Key theft, phishing, fake wallet apps | Loss of funds | Mitigation proposed |
| T9 | Seed phrase lost | Permanent loss | User education |
| T10 | Malicious or mistaken software update | Rule change without consent | OPEN (Q-19, Q-20) |
| T11 | Spam and dust flood | Node cost | Minimum fee proposed |
| T12 | Selfish mining, block withholding | Unfair gain | Study |
| T13 | Miners censoring claims | Delay | Open, depends on miner diversity |
| T14 | Founder dumps unlocked coins | Price effect, not a consensus attack | Transparency only |
| T15 | Founder key lost or stolen | Founder coins lost or stolen | Founder's own risk |
| T16 | Phone background limits break sync | Poor experience, light client risk | OPEN (Q-08) |
| T17 | Legal action against distribution or users | Service loss | Legal review (Q-18) |
| T18 | Bugs in new consensus code | Chain split, loss | External review before launch |

## 2. Out of scope for this page

Detailed cryptographic parameters, formal proofs, penetration test results. None exist.
