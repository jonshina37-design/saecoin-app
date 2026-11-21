# 00 — Decision Record

Status as of 2026-11-21. This is the single source of truth. If any other document disagrees with this one, this one wins.

## How to read this record

| Tag | Meaning | May be implemented as final? |
| --- | --- | --- |
| **DECIDED** | The owner stated it explicitly. | Yes |
| **CARRIED** | Stated by the owner in an earlier decision, not re-confirmed on 2026-11-20. Still assumed. | Yes, but flag if it conflicts with a DECIDED item |
| **PROPOSED** | A recommendation made during the 2026-11-20 design review. The owner has not confirmed it. | **No** — ask the owner first |
| **OPEN** | Nobody has decided. | **No** |

## DECIDED

| ID | Decision | Date |
| --- | --- | --- |
| D-01 | SAECOIN (SAC) is an independent, decentralized Proof-of-Work blockchain. No central backend is an authority over consensus or balances. Anyone can run a full node without permission. | 2026-11-09 |
| D-02 | Maximum supply is **21,000,000 SAC**. | 2026-11-20 |
| D-03 | Founder reserve is **2,100,000 SAC** (10%). The remaining **18,900,000 SAC** (90%) is for mining. | 2026-11-20 |
| D-04 | The founder reserve is locked for **2 years**. After that it unlocks at **5% per month** (20 monthly releases). | 2026-11-20 |
| D-05 | The founder has no control over any SAC other than the reserve, and has no special consensus, governance, minting, or admin privileges. The network runs on its own. | 2026-11-20 |
| D-06 | The project is started with no money spent, bootstrapped from zero in the way Bitcoin was. | 2026-11-20 |
| D-07 | SAECOIN is separate from the SAECOIN AI business. Neither depends on the other. | 2026-11-15 |

## CARRIED (earlier owner decisions)

| ID | Decision | Note |
| --- | --- | --- |
| C-01 | Coin precision is 8 decimal places; all arithmetic is integer. | 1 SAC = 100,000,000 units |
| C-02 | UTXO transaction model. | |
| C-03 | Proof-of-Work consensus; no Proof-of-Stake and no delegation. | Algorithm is OPEN (O-01) |
| C-04 | Wallet is non-custodial. | |
| C-05 | App users must be 18+, and each country has an on/off switch. | Applies to the app only; revisit in doc 04 |

## SUPERSEDED — do not reintroduce

These came from earlier drafts and conflict with the decisions above.

| Superseded item | Replaced by |
| --- | --- |
| 31,000,000 SAC supply | D-02 (21,000,000) |
| 12,000,000 SAC founder reserve; 1-year lock; 1M SAC per month | D-03, D-04 |
| 17,000,000 mining pool, 2,000,000 Task Pool, Referral Pool | D-03 and P-01 (no pools) |
| Centralized "virtual mining" sessions, phone-OTP signup, referral groups, session claims with fee, 2,160 / 3,100 session counts | P-01, P-06 |
| Telegram Mini App as the primary client | P-06 |

The old v1.x specification set (12 documents plus the TypeScript reward engine) is preserved in Git history on `main` and was removed from this branch because it described the centralized design.

## PROPOSED (awaiting owner confirmation)

| ID | Proposal | Why |
| --- | --- | --- |
| P-01 | All 18.9M mining SAC is issued as a **block subsidy** to the miner of each block. No claim pools, no Task Pool, no referral pool, no session claims. | Simplest, most proven. Gives miners a real incentive from block 1, which is what secures a young chain. No sybil problem and no central claim server. |
| P-02 | Target block time **10 minutes**. | Matches Bitcoin, fewer orphans. A shorter time is an alternative (see doc 02). |
| P-03 | Halving every **210,000 blocks**; initial subsidy **45 SAC**. | 2 × 210,000 × 45 = 18,900,000 exactly. |
| P-04 | Use a **CPU-friendly** PoW algorithm rather than SHA-256d. | A young SHA-256d chain can be attacked with rented hashpower. CPU-friendly mining also fits the goal of putting SAC in ordinary people's hands. |
| P-05 | Founder reserve is created as **20 height-locked outputs** at genesis, one per monthly release, with a public address and no override path. | Makes D-04 and D-05 enforced by the protocol, not by promise. |
| P-06 | The app is a **non-custodial wallet** (and optional miner companion), with no reward backend. | Follows from D-01 and D-05. |
| P-07 | The founder holds the reserve keys in a **multisig / hardware-wallet** setup with a documented backup. | A single lost key loses the reserve for good. |
| P-08 | The founder does **not sell** SAC. SAC enters circulation only by mining (and after the lock, by the founder's own released reserve). | Avoids securities-law exposure; consistent with a fair launch. |
| P-09 | **Fair launch**: open-source code, announced start time, public genesis, reserve disclosed in advance. | Trust is the scarce resource for a new chain. |

## OPEN

See [07 — Open Questions](07-open-questions.md).
