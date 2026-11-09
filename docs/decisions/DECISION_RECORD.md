# SAECOIN Decision Record: Decentralized Direction (v2 direction)

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

This record keeps the decisions of the **owner's direction of 2026-11-09** and shows what happened to each earlier decision. Open items of this direction are numbered **Q-nn** so that they do not clash with the v1.2 open items O-nn. Nothing from the v1.2 record ([00-Spec-v1.2-Decision-Record.md](../00-Spec-v1.2-Decision-Record.md)) is deleted: where the new direction conflicts, the old item is kept and marked here. Where a conflict needs the owner, it is listed in [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md).

## 1. CONFIRMED (stated by the owner on 2026-11-09)

| ID | Decision | Detail document |
| --- | --- | --- |
| C-01 | SAECOIN is a decentralized blockchain network. The founder has no special power over consensus, user balances, block approval, network shutdown or supply. | [DECENTRALIZATION_ARCHITECTURE](../architecture/DECENTRALIZATION_ARCHITECTURE.md) |
| C-02 | Permissionless full-node participation, independent block validation, publicly verifiable chain, non-custodial wallet, P2P network. | [NODE_ARCHITECTURE](../architecture/NODE_ARCHITECTURE.md), [P2P_NETWORK_ARCHITECTURE](../architecture/P2P_NETWORK_ARCHITECTURE.md) |
| C-03 | Maximum supply 31,000,000 SAC. Never exceeded. Genesis records the whole allocation. No new SAC after Genesis. 8 decimal places. Every SAC has a verifiable origin and history. | [TOKENOMICS](../tokenomics/TOKENOMICS.md), [GENESIS_SPEC](../tokenomics/GENESIS_SPEC.md) |
| C-04 | Allocation: Regular Mining Reward Pool 17,000,000; Task Reward Pool 2,000,000; Founder Reserve 12,000,000. **The Referral Pool is removed.** | [TOKENOMICS](../tokenomics/TOKENOMICS.md) |
| C-05 | Founder Reserve is personally owned by the founder. Locked for the first year from Genesis, then 1,000,000 SAC unlock per month for 12 months. The schedule is enforced by protocol rules. Ownership gives no governance or consensus control. | [FOUNDER_RESERVE_SPEC](../tokenomics/FOUNDER_RESERVE_SPEC.md) |
| C-06 | Regular Session Mining is different from PoW mining. A user runs a session, claims the reward, a claim transaction is created, the network validates it, a valid claim enters a block, and the reward comes from the Regular Mining Pool. One session reward can be claimed once. | [REWARD_CLAIM_SPEC](../tokenomics/REWARD_CLAIM_SPEC.md) |
| C-07 | Task Reward: users complete tasks and submit evidence; eligibility is checked; a valid claim is created; the reward is paid after block confirmation. The architecture must avoid single control by the founder or a central backend, and must state the technical limits of verifying real task completion. | [TASK_REWARD_SPEC](../tokenomics/TASK_REWARD_SPEC.md) |
| C-08 | Proof of Work is part of the direction. Block producers solve PoW; full nodes validate; chain selection is the valid chain with the most cumulative work; difficulty adjustment, timestamp validation, double-spend prevention and reorganization handling are required. The algorithm is not final. | [consensus/](../consensus/POW_RESEARCH.md) |
| C-09 | Block Producer Fee: a fixed fee is deducted from the gross claim and goes to the block producer. It creates no new SAC, it is set by consensus rules, and a producer cannot alter another user's claim. The 0.10 SAC of a 10 SAC reward is an illustration only. | [TRANSACTION_FEE_SPEC](../tokenomics/TRANSACTION_FEE_SPEC.md) |
| C-10 | One Android app (not two) with two interfaces: Main (Mining and Task) and a Wallet opened by swiping down from the upper part of the main screen. A visible Wallet button also exists. Swiping up returns to Main. | [UNIFIED_APP_UX_SPEC](../product/UNIFIED_APP_UX_SPEC.md) |
| C-11 | The app contains the needed blockchain modules (wallet core, lightweight node, optional full node, P2P, consensus engine, PoW mining engine, transaction engine, reward claim engine, task verification interface, synchronization, explorer integration). Android background and battery limits must be considered. No claim of a 24/7 full node on an installed phone. | [NODE_ARCHITECTURE](../architecture/NODE_ARCHITECTURE.md) |
| C-12 | Full transparency: Genesis supply, each pool, reward claims, task rewards, founder reserve and unlock history, fees, wallet transactions, token creation, locked and unlocked balance, circulating supply and remaining pool balances are verifiable on chain and in the explorer. | [BLOCKCHAIN_ARCHITECTURE](../architecture/BLOCKCHAIN_ARCHITECTURE.md) |
| C-13 | Work is limited to documentation until the owner approves implementation. | [IMPLEMENTATION_ROADMAP](../development/IMPLEMENTATION_ROADMAP.md) |

## 2. PROPOSED (engineering proposals, not approved)

| ID | Proposal | Detail |
| --- | --- | --- |
| P-01 | Pools are **keyless protocol accounts**: no private key exists, and their balance can only move by a consensus-validated claim rule. | [TOKENOMICS](../tokenomics/TOKENOMICS.md) |
| P-02 | Founder Reserve is created at Genesis as 12 separate time-locked tranches of 1,000,000 SAC. | [FOUNDER_RESERVE_SPEC](../tokenomics/FOUNDER_RESERVE_SPEC.md) |
| P-03 | Phones run a light client by default. A full node on a phone is optional (foreground, charging, Wi-Fi). Always-on full nodes run on desktops and servers. | [NODE_ARCHITECTURE](../architecture/NODE_ARCHITECTURE.md) |
| P-04 | Claim transaction structure and double-claim prevention by a consensus-tracked set of claimed session IDs. | [REWARD_CLAIM_SPEC](../tokenomics/REWARD_CLAIM_SPEC.md) |
| P-05 | First task types are those that the chain itself can verify; off-chain tasks use a threshold of independent verifiers, with the trust limits stated. | [TASK_REWARD_SPEC](../tokenomics/TASK_REWARD_SPEC.md) |
| P-06 | No checkpoints beyond the Genesis hash; fixed minimum fees for spam control. | [CHAIN_SELECTION](../consensus/CHAIN_SELECTION.md) |
| P-07 | Phased roadmap: approval, research, specification freeze, devnet, testnet, external security review, Android integration, mainnet readiness. | [IMPLEMENTATION_ROADMAP](../development/IMPLEMENTATION_ROADMAP.md) |
| P-08 | Evaluate merge-mining with an existing PoW chain as one way to start with real hash power. A research item, not a plan. | [POW_RESEARCH](../consensus/POW_RESEARCH.md) |
| P-09 | The v1.2 centralized app and engine stay as a reference simulation and are not modified; the new chain is specified separately. | [MASTER_PROJECT_SPEC](../MASTER_PROJECT_SPEC.md) |

## 3. OPEN (not decided, listed in full in OPEN_QUESTIONS.md)

The ten items the owner listed: Q-01 PoW algorithm, Q-02 block time, Q-03 difficulty adjustment, Q-04 block size, Q-05 transaction fee formula, Q-06 task verification mechanism, Q-07 consensus security parameters, Q-08 Android full node feasibility, Q-09 token creation rules, Q-10 mainnet launch requirements. Items Q-11 to Q-20 were raised by this documentation audit.

## 4. What happened to the earlier decisions (history kept)

The v1.2 record is unchanged. This table shows how each item relates to the new direction. "Superseded" means the owner's new direction contradicts it; the old text is still in the v1.2 record and the existing code and SQL still follow it until the owner approves any change.

| v1.2 item | Relation to the new direction |
| --- | --- |
| D-01 Regular reward 10 SAC per user per session, pool divided when short | **Open.** It was built on the old 12,960,000 pool and a per-session split that a server computes. The new pool is 17,000,000 and the split mechanism is not defined (Q-12). |
| D-02, D-07, D-16 Referral bonus and referral rules | **Superseded by C-04** (Referral Pool removed). The referral code and rules in v1.2 stay untouched until the owner approves removing them. |
| D-03, D-11 Founder 12 M locked 12 months, then 1 M per month | **Consistent with C-05.** Edge cases are still O-18 in the v1.2 record and Q-13 here. |
| D-04 Forfeited balances of cancelled accounts go to Task Pool | **Open.** A permissionless chain has no account cancellation (Q-16). |
| D-05 Task Pool leftover stays locked after 2,160 sessions | **Open.** The new Task Pool is 2,000,000 and the 2,160-session model is not carried over (Q-12). |
| D-06 8 decimal places | **Consistent with C-03.** |
| D-08 Phone OTP, one account per number | **Conflict** with permissionless claims. Identity and Sybil resistance are open (Q-11). |
| D-09, D-13 Per-country switches, sanctioned countries off | **Conflict:** a chain cannot switch countries off; only the app and any services can. Legal review is open (Q-18). |
| D-10 Separate blockchain after the 2,160 sessions | **Superseded in direction:** the chain is now the platform itself. Timing and transition are open (Q-16). |
| D-12 Backend Node.js and PostgreSQL | **Role changes:** a backend may still serve app features but has no consensus authority (C-01). Backend stack for non-authoritative services is open. |
| D-14 Telegram Mini App first | **Conflict** with the unified Android app (C-10). A Mini App cannot hold a non-custodial wallet or run a node. Open (Q-16). |
| D-15 Reward eligibility by status | **Open** (Q-11). Status data lives in the centralized backend. |
| D-17 Genesis is an issuance, not a transfer | **Consistent**, now with three allocations instead of four. |
| D-18 and v1.2 O-18 Founder Release blocked until approved | **Still in force.** C-05 restates the headline schedule; edge cases need approval. |
| v1.2 O-15 PROPOSED accounting and ledger rules | **Still OPEN** and tied to the centralized ledger. They do not apply to a consensus chain unless re-approved. |

## 5. History of the direction itself

- Earlier on 2026-11-09 the owner sent a vision brief that excluded Proof of Work, Proof of Stake and delegation. That brief is **superseded** by C-08 (PoW included). Its findings, in short: no known mechanism gives a permissionless, stake-free, delegation-free, PoW-free chain with sound Sybil resistance; this was reported to the owner before the change.
- The owner's earlier separate PoW (UTXO) chain documentation set was not part of this repository and was not read for this consolidation. Any conflict with it is not assessed here.
