# SAECOIN Open Questions

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

Nothing on this page is decided. IDs are **Q-nn**; the v1.2 record keeps its own O-nn items (for example O-15 and O-18), which are not renumbered. Each item needs research, a security review or an owner decision before it can become CONFIRMED.

## Items the owner listed as OPEN

| ID | Question | Why it is open | Where discussed |
| --- | --- | --- | --- |
| Q-01 | PoW algorithm (SHA-256d, Scrypt, RandomX, others) | Security, ASIC and rental-hash-power risk, phone suitability | [POW_RESEARCH](../consensus/POW_RESEARCH.md) |
| Q-02 | Block time | Trade-off between confirmation speed, orphan rate and phone sync load | [POW_RESEARCH](../consensus/POW_RESEARCH.md) |
| Q-03 | Difficulty adjustment | A new chain has unstable hash power | [DIFFICULTY_ADJUSTMENT](../consensus/DIFFICULTY_ADJUSTMENT.md) |
| Q-04 | Block size | Node cost against throughput | [BLOCK_VALIDATION](../consensus/BLOCK_VALIDATION.md) |
| Q-05 | Transaction fee formula, and where transfer fees go | Producer incentive, spam control; earlier ideas sent transfer fees to the Task Pool | [TRANSACTION_FEE_SPEC](../tokenomics/TRANSACTION_FEE_SPEC.md) |
| Q-06 | Task verification mechanism | Real-world task completion cannot be proven by a chain | [TASK_REWARD_SPEC](../tokenomics/TASK_REWARD_SPEC.md) |
| Q-07 | Consensus security parameters (confirmations, reorg limits, timestamp limits) | Need analysis and simulation | [CHAIN_SELECTION](../consensus/CHAIN_SELECTION.md) |
| Q-08 | Android full node feasibility | Background limits, battery, storage, data | [NODE_ARCHITECTURE](../architecture/NODE_ARCHITECTURE.md) |
| Q-09 | Token creation rules | Spam, naming abuse, fee; the feature comes after the chain is stable | [BLOCKCHAIN_ARCHITECTURE](../architecture/BLOCKCHAIN_ARCHITECTURE.md) |
| Q-10 | Mainnet launch requirements | Depends on all of the above | [MAINNET_LAUNCH_CHECKLIST](../development/MAINNET_LAUNCH_CHECKLIST.md) |

## Items raised by this audit (need an owner decision or research)

| ID | Question | Why it matters |
| --- | --- | --- |
| Q-11 | **Who may claim a reward, and how is one person stopped from claiming many times?** v1.2 used phone OTP, age 18+ and one account per number, all held by a central backend. A chain cannot see them. | Without an answer, anyone can create unlimited keys and drain the 17,000,000 SAC Regular Pool. This is the most serious open problem. |
| Q-12 | **Reward amount and session model for the new pools.** The v1.2 values (6,000 SAC ceiling and 10 SAC cap per session, 2,160 sessions) were built for the old pool and a server-side split. | The new Regular Pool is 17,000,000 SAC. No amount per claim, session schedule or lifetime is decided. |
| Q-13 | **Founder unlock edge cases.** Month definition, time basis (block height or median time), whether the first 1,000,000 unlocks at month 12 or month 13, what happens if blocks are slow or fast. | Same as O-18 in the v1.2 record. Not approved. |
| Q-14 | **Miner economics.** There is no block subsidy, so producers are paid only by fees. With the illustrative numbers, claim fees total at most 170,000 SAC over the whole life of the pool (1 % of 17,000,000). | Long-term security depends on fees from transfers and tokens. Early blocks may pay almost nothing. |
| Q-15 | **Early security.** A new PoW chain has little hash power and is exposed to 51 % attacks and rented hash power. | Needs a bootstrap plan and honest limits on what is claimed. |
| Q-16 | **What happens to the v1.2 centralized app** (Telegram Mini App, Node.js backend, PostgreSQL ledger) and how it relates to the chain, including D-04, D-05, D-10, D-12, D-14. | Prevents two competing sources of truth. |
| Q-17 | **Ledger model:** UTXO outputs with keyless protocol pools, or an account model. | Decides how locked and unlocked balances, pools and claims are represented. |
| Q-18 | **Legal review** of a reward token, PoW mining app and country availability. Not legal advice. | Required before launch. Carried from v1.2 O-02. |
| Q-19 | **Rule-change process** for a founderless chain: who may change consensus rules, and how node operators accept them. | "No founder authority" needs a stated upgrade path, or the founder remains the de facto controller of software. |
| Q-20 | **Software and distribution trust:** who builds and signs the Android app and node software, and how users can verify builds. | The founder holding the signing key would be a hidden central control. |
