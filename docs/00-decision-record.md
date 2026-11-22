# 00 — Decision Record

Status as of 2026-11-21. This is the single source of truth. If any other document disagrees with this one, this one wins.

## How to read this record

| Tag | Meaning | May be implemented as final? |
| --- | --- | --- |
| **DECIDED** | The owner stated or confirmed it explicitly. | Yes |
| **CARRIED** | Stated by the owner in an earlier decision, not re-confirmed on 2026-11-20/21. Still assumed. | Yes, but flag if it conflicts with a DECIDED item |
| **PROPOSED** | A recommendation not yet confirmed by the owner. | **No** — ask the owner first |
| **OPEN** | Nobody has decided. | **No** |

## DECIDED

| ID | Decision | Date |
| --- | --- | --- |
| D-01 | SAECOIN (SAC) is an independent, decentralized Proof-of-Work blockchain. No central backend is an authority over consensus or balances. Anyone can run a full node without permission. | 2026-11-09 |
| D-02 | Maximum supply is **21,000,000 SAC**. | 2026-11-20 |
| D-03 | Founder reserve is **2,100,000 SAC** (10%). The remaining **18,900,000 SAC** (90%) is for mining. | 2026-11-20 |
| D-04 | The founder reserve is locked for **2 years**, then unlocks at **5% per month** (20 monthly releases). | 2026-11-20 |
| D-05 | The founder has no control over any SAC other than the reserve, and no special consensus, governance, minting, or admin privileges. The network runs on its own. | 2026-11-20 |
| D-06 | The project is started with no money spent, bootstrapped from zero in the way Bitcoin was. | 2026-11-20 |
| D-07 | SAECOIN is separate from the SAECOIN AI business. Neither depends on the other. | 2026-11-15 |
| D-08 *(P-01)* | All 18.9M mining SAC is issued as a **block subsidy** to the miner of each block. No claim pools, no Task Pool, no referral pool, no session claims. | 2026-11-21 |
| D-09 *(P-02, P-03)* | Target block time **10 minutes**; halving every **210,000 blocks**; initial subsidy **45 SAC** (2 × 210,000 × 45 = 18,900,000). | 2026-11-21 |
| D-10 *(replaces P-04)* | **Requirement:** the mining algorithm must let both **phones and laptops** mine. SHA-256d therefore does not qualify. The specific algorithm is still OPEN (O-01). | 2026-11-21 |
| D-11 *(P-05)* | The founder reserve is created as **20 height-locked outputs** at genesis, one per monthly release, with a public address and no override path. | 2026-11-21 |
| D-12 *(P-06)* | The app is a **non-custodial wallet** with an optional miner companion; there is no reward backend. | 2026-11-21 |
| D-13 *(P-07)* | The founder holds the reserve keys in a **multisig / hardware-wallet** setup with a documented backup. | 2026-11-21 |
| D-14 *(P-08)* | The founder does **not sell** SAC. SAC enters circulation by mining and, after the lock, by the founder's released reserve. | 2026-11-21 |
| D-15 *(P-09)* | **Fair launch**: open-source code, announced start time, public genesis, reserve disclosed in advance. | 2026-11-21 |
| D-16 *(P-10)* | Choose a **moderate-memory, CPU-oriented** algorithm with audited **ARM64 and x86-64** implementations, selected by the criteria in doc 02 section 3. The specific algorithm is chosen only after benchmarking on at least one low-end phone and one laptop (O-01). | 2026-11-21 |
| D-17 *(P-11)* | The **mining** build of the mobile client is distributed **outside** the app stores (direct APK / open-source channels); the store version is **wallet-only**, unless current store policies allow mining. Mining is opt-in, visible, and by default runs only while charging. Use one official website, signed releases, and published hashes. | 2026-11-21 |

## CARRIED (earlier owner decisions)

| ID | Decision | Note |
| --- | --- | --- |
| C-01 | Coin precision is 8 decimal places; all arithmetic is integer. | 1 SAC = 100,000,000 units |
| C-02 | UTXO transaction model. | |
| C-03 | Proof-of-Work consensus; no Proof-of-Stake and no delegation. | Algorithm is OPEN (O-01) under D-10 |
| C-04 | Wallet is non-custodial. | Reinforced by D-12 |
| C-05 | App users must be 18+, and each country has an on/off switch. | Applies to the app only; revisit (O-12) |

## SUPERSEDED — do not reintroduce

| Superseded item | Replaced by |
| --- | --- |
| 31,000,000 SAC supply | D-02 (21,000,000) |
| 12,000,000 SAC founder reserve; 1-year lock; 1M SAC per month | D-03, D-04 |
| 17,000,000 mining pool, 2,000,000 Task Pool, Referral Pool | D-03, D-08 |
| Centralized "virtual mining" sessions, phone-OTP signup, referral groups, session claims with fee, 2,160 / 3,100 session counts | D-08, D-12 |
| Telegram Mini App as the primary client | D-12 |
| "CPU-friendly (RandomX-class), SHA-256d as fallback" (P-04) | D-10 |

The old v1.x specification set (12 documents plus the TypeScript reward engine) is preserved in the Git history of `main`.

## PROPOSED (awaiting owner confirmation)

All earlier proposals (P-01 to P-11) were confirmed on 2026-11-21 and are recorded above as D-08 to D-17.

| ID | Proposal | Why |
| --- | --- | --- |
| P-12 | For D-10, define the **minimum mining phone** as mid-range and up: about 6 GB RAM, 64-bit ARM, from roughly the last 5–6 years. Every phone can still use the wallet. Benchmark RandomX on that class first; fall back to a lighter algorithm only if it fails (doc 08, sections 5 and 6). | Phones need roughly 6 GB RAM for RandomX mining in practice; budget 2–4 GB phones are marginal. "Phones can mine" must not be read as "every phone earns." Supports O-18, O-01, and O-09 (Bitcoin Core fork). |

## OPEN

See [07 — Open Questions](07-open-questions.md).
