# SAECOIN — Specification v1.2 Decision Record

**Document:** 00-Spec-v1.2-Decision-Record.md
**Version:** 1.2 (Draft)
**Project:** SAECOIN App
**Ticker:** SAC (Provisional)
**Status:** Draft for owner review. Not yet applied to documents 01–12.

> **Precedence.** Where this record conflicts with documents 01–12 or the README, this record prevails once the owner approves it. Until approval it is a proposal.

---

## 1. How to read this document

Every item carries one of three labels.

| Label | Meaning |
|---|---|
| **DECIDED** | The owner chose this explicitly. |
| **PROPOSED** | Drafted to close a gap found in the v1.1 review. Needs owner confirmation. |
| **OPEN** | A decision the owner still has to make. Nothing is assumed. |

---

## 2. Decisions taken by the owner

| ID | Decision | Label |
|---|---|---|
| D-01 | Regular Mining reward is **10 SAC per successful user per session**, reduced to *pool ÷ users* when the session pool would otherwise be exceeded. | DECIDED |
| D-02 | Referral Bonus is **3 SAC per eligible participant per session**, reduced to *pool ÷ eligible participants* when the pool would otherwise be exceeded. | DECIDED |
| D-03 | The **12,000,000 SAC owner allocation is locked and released in steps**. The release schedule is not yet fixed (see O-01). | DECIDED |
| D-04 | Balances forfeited by cancelled accounts go to the **Task Pool**. | DECIDED |
| D-05 | Whatever remains in the Task Pool after the 2,160th session **stays locked** and is not spent without a public announcement. | DECIDED |
| D-06 | The smallest SAC unit has **8 decimal places**: 1 SAC = 100,000,000 units. | DECIDED |
| D-07 | Only **VALID** referrals count toward the "at least three active direct referrals" rule. | DECIDED |
| D-08 | Registration uses **phone OTP, one account per phone number**. | DECIDED |
| D-09 | Minimum user age and supported countries: see O-02. | OPEN |
| D-10 | After the 2,160 sessions end, the owner will launch **a separate blockchain of their own**. | DECIDED |

Further statements by the owner that this record builds on:

- Coins left unused in a session are to be given out through tasks, advertisements and similar activities. The details are **not final** and will be added step by step (see section 5).
- The owner decides critical matters personally. A trusted person assists. The backend handles routine decisions (see section 8).
- A separate production server will be set up once the user base grows (see O-03).

---

## 3. Allocation and account model

### 3.1 Total supply

Total supply stays fixed at **31,000,000 SAC**: 12,000,000 SAC for the owner and 19,000,000 SAC for app users.

| Account | SAC | Purpose |
|---|---:|---|
| FOUNDER | 12,000,000 | Owner allocation, locked (D-03) |
| REGULAR_POOL | 12,960,000 | 2,160 sessions × 6,000 SAC |
| REFERRAL_POOL | 4,320,000 | 2,160 sessions × 2,000 SAC |
| TASK_POOL | 1,720,000 | Tasks, advertisements, future rewards |
| **Total** | **31,000,000** | |

User-side total: 12,960,000 + 4,320,000 + 1,720,000 = **19,000,000 SAC**.

The earlier "Initial App Reserve 1,000,000" and "Unused App Mining Allocation 720,000" are merged into the Task Pool opening balance of 1,720,000. The term **App Reserve** is retired. The 720,000 was never "unused"; it is part of the Task Pool.

### 3.2 Accounting rule (PROPOSED)

Every SAC lives in exactly one account. A reward is a **transfer** between accounts, never newly created coins.

- The sum of all account balances must equal 31,000,000 SAC at all times.
- No account balance may be negative.
- Internal amounts are stored as integers in units of 10⁻⁸ SAC (D-06). The total of 3,100,000,000,000,000 units fits in a signed 64-bit integer.
- Floating-point arithmetic is prohibited for SAC amounts.

### 3.3 Genesis block (PROPOSED)

The public ledger starts with a signed **Block 0 (Genesis)** that records the four opening balances in section 3.1. This makes the allocation publicly verifiable and gives the future chain (D-10) a clear starting reference.

---

## 4. Reward calculation

### 4.1 Per-session ceilings

Each effective session consumes exactly **6,000 SAC** from REGULAR_POOL and **2,000 SAC** from REFERRAL_POOL. Part of that is paid to users. The rest moves to TASK_POOL at session close (section 4.4).

### 4.2 Regular Mining (D-01)

Let N be the number of users with a validated SUCCESS result and Regular Mining eligibility in the session. All figures are in units.

```
ceiling   = 6,000 × 10^8
per_user  = min( 10 × 10^8 , floor(ceiling / N) )
paid      = per_user × N
leftover  = ceiling − paid
```

The cap binds when N exceeds 600 users.

### 4.3 Referral Bonus (D-02, D-07)

Let E be the set of distinct users who qualify under section 6.2. Each user appears in E once, so no precedence rule between groups is needed.

```
ceiling   = 2,000 × 10^8
per_user  = min( 3 × 10^8 , floor(ceiling / |E|) )
paid      = per_user × |E|
leftover  = ceiling − paid
```

The cap binds when |E| reaches 667 users.

### 4.4 Leftover handling

At session close, `leftover` from each pool is transferred to TASK_POOL as a `SESSION_LEFTOVER` ledger entry. Rounding dust of a few units is handled the same way. No tie-breaking rule is required because every user in a pool receives the identical amount.

The calculation records the **calculation version** (`1.2.0`), the pool, the participant count, `per_user`, `paid` and `leftover`. The participant list or a protected reference to it is stored for audit.

### 4.5 Worked examples

| Case | Users | Per user (SAC) | Paid (SAC) | To Task Pool (SAC) |
|---|---:|---:|---:|---:|
| Regular, early phase | 100 | 10.00000000 | 1,000 | 5,000 |
| Regular, break-even | 600 | 10.00000000 | 6,000 | 0 |
| Regular, growth | 1,000 | 6.00000000 | 6,000 | 0 |
| Regular, large | 70,000 | 0.08571428 | 5,999.9996 | 0.0004 |
| Regular, very large | 100,000 | 0.06000000 | 6,000 | 0 |
| Referral, early phase | 100 | 3.00000000 | 300 | 1,700 |
| Referral, growth | 1,000 | 2.00000000 | 2,000 | 0 |

These show the formula only. They do not promise any individual reward.

---

## 5. Task Pool

The Task Pool funds rewards that are not part of the session pools.

**Sources of funds**

1. Opening balance of 1,720,000 SAC.
2. Session leftovers (section 4.4).
3. Balances forfeited by cancelled accounts (D-04).

**Rules**

- Task and advertisement rewards are paid **only from the Task Pool balance already accumulated**. Leftover is only known after a session closes, so it cannot fund the same session.
- A Task Pool payment may never exceed the pool balance.
- New ledger types: `TASK_REWARD`, `AD_REWARD`, `SESSION_LEFTOVER`, `FORFEITURE`, `GENESIS`.
- Each reward source has its own budget check. Adding a new source must not require changing the core reward engine.
- Per-user daily limits and per-user totals are required for every task or advertisement type (limits are OPEN, see O-04).
- Bot and duplicate-account protection (section 7) applies to tasks and advertisements as well.
- Advertisement networks have their own rules for incentivised ads. Compliance must be checked before any advertisement reward is released.
- After the 2,160th session, remaining Task Pool funds stay locked (D-05).

The concrete task and advertisement program is **OPEN** and will be specified in a separate document.

---

## 6. Referral rules (v1.2)

### 6.1 Structure

- One level only. A group is a referrer plus that referrer's direct referrals.
- A referrer may have at most 10 direct referrals.
- No multi-level commissions.

### 6.2 Group eligibility in a session

A group qualifies for the session when all of these hold:

1. The referrer is VALID and has a SUCCESS result in the session.
2. At least **three direct referrals that are VALID** and have a SUCCESS result in the same session (D-07).

Members of a qualifying group who are themselves VALID and successful in the session join the eligible set E. A user may be in more than one qualifying group but is counted once.

A parent group that fails does not disqualify a child group.

### 6.3 Group change

Unchanged from v1.1: one change per lifetime, only after becoming VALID, effective from the next new session, resets validity progress, disables Referral Bonus until VALID again.

Additions (PROPOSED):

- The new referrer may not be the user, the current referrer, or **any descendant of the user** in the referral tree. This closes referral loops. The backend checks the tree recursively inside the same transaction as the change.
- A user who registered without a referral code may attach to a referrer once later. That action counts as the lifetime change. **Confirm with the owner.**

---

## 7. Identity and multiple-account control

**D-08:** registration requires phone OTP, one account per phone number.

Further controls (PROPOSED):

- Store the phone number encrypted, with a hashed copy for uniqueness checks.
- If email is collected, normalise it before uniqueness checks (for example Gmail dots and `+` suffixes).
- Use device integrity signals (Play Integrity on Android, App Attest on iOS) to flag emulators and modified devices. Expo projects may need a custom development build for this.
- Rate-limit registrations per device and per network.
- Flag suspicious patterns: many accounts created together, identical activation timing, tightly clustered referral groups.
- A high risk score triggers the existing automatic suspension and evidence-review flow. Administrators still cannot suspend or cancel accounts by hand.
- The privacy policy must disclose every signal collected.
- A VALID account requires a verified phone number.

No single control is reliable. The aim is to make fake accounts costly.

---

## 8. Operations and roles

### 8.1 Division of work (PROPOSED)

| Level | Responsible | Examples |
|---|---|---|
| Automatic | Backend | Activation, session validation, reward calculation, VALID status, retries, notifications, backups, routine maintenance mode |
| Verification | Trusted deputy (Sub-Admin) | Check evidence, answer users, prepare reports, propose corrections |
| Decision | Owner (Main Admin) | Reward corrections, recovery approval, signing-key replacement, restoring from backup, reactivating suspended accounts, changing formulas or limits |

Rules:

- Any action that affects money needs a proposal from the deputy and approval from the owner.
- If an invariant fails (account sum is not 31,000,000 SAC, a pool is negative, balances and ledger disagree), the backend enters maintenance mode by itself and alerts the owner.
- If the owner is unreachable for 24 hours, the deputy may perform only safe actions: keep maintenance mode on and retry failed jobs. No money-affecting action.
- Recovery after an outage is split in two. A technical recovery whose reconciliation hashes match may run automatically and is reviewed by the owner afterwards. Any mismatch stops and waits for the owner.
- The owner's Recovery Key and 2FA backup codes are kept in a sealed, secure location separate from the server.

### 8.2 Inactivity and downtime (PROPOSED)

- Each scheduled slot has a `slot_status` of `NORMAL` or `PAUSED`.
- `PAUSED` slots are **excluded** from the 90-slot inactivity count.
- The inactivity counter is **frozen** while an account is SUSPENDED.
- The counter stays suspended during the 21-session rebuild after a group change (unchanged).

### 8.3 Session state order (PROPOSED)

Documents 03, 05 and 08 describe different orders. v1.2 fixes one:

1. The slot ends.
2. The backend validates each activation and saves a per-user result of `SUCCESS` or `FAILED`.
3. The reward engine calculates and records the amounts.
4. Ledger transfers and balance updates run atomically.
5. The public block is created, signed and published.

If step 3 or 4 fails, the user result stays `SUCCESS` and the reward stays `PENDING`. Session-level states (`SCHEDULED`, `OPEN`, `PROCESSING`, `SUCCESS`, `FAILED`, `PENDING_RETRY`) are separate from per-user states. `ACTIVATED` is a per-user state and is removed from the session-level list in document 06.

---

## 9. Public ledger and explorer

All items are PROPOSED unless marked.

- Each public transaction has a **TXID**, the hash of its canonical data, and a `CONFIRMED` state once its block is published.
- Each block stores a **Merkle root** of its transactions. A user can verify one transaction with a short proof without downloading the whole block.
- The explorer shows a **public ID** that is random and not derived from the username, for example `SAC-7K2F9Q`. The username is not published. Search by user uses the public ID.
- **Total Balance is hidden by default.** A user can still verify their own balance and transactions through proofs.
- The full ledger can be downloaded so anyone can verify it independently.
- The latest block hash is published once per day on a public channel, so later rewriting would be detectable.
- Public wording is **"verifiable public ledger"**, never "blockchain" or "decentralized" for this ledger.
- Block format and hash method are chosen so this ledger can serve as the starting snapshot for the future chain (D-10).
- Corrections use new blocks of type `CORRECTION` that reference the original block. Original blocks are never changed.

---

## 10. After the 2,160 sessions (D-10)

Planned sequence:

1. Freeze the final ledger.
2. Publish a signed snapshot of final balances, with its Merkle root.
3. Run KYC for users who want to claim.
4. Launch the owner's separate blockchain. The mechanism for carrying balances over is OPEN (see O-05).

Boundaries:

- Nothing here promises market value, an exchange listing or any withdrawal.
- PRD sections 4.2 and 21 stay in force: the future chain is a separate project and must not be presented as a current feature of the app.
- Converting in-app points into a tradable token can create legal obligations in some countries. Obtain legal advice before this step.
- The future chain's total supply should be defined together with the snapshot so that the two figures are consistent with 31,000,000 SAC.

---

## 11. Database schema changes (additions to document 07)

All items are PROPOSED.

### 11.1 New tables

| Table | Purpose |
|---|---|
| `accounts` | One row per account: `account_id`, `account_type` (`USER`, `FOUNDER`, `REGULAR_POOL`, `REFERRAL_POOL`, `TASK_POOL`), `user_id` (nullable), `balance_units` (integer, CHECK ≥ 0). |
| `ledger_entries` | Double-entry lines: `transaction_id`, `debit_account_id`, `credit_account_id`, `amount_units`. |
| `reward_calculations` | `session_id`, `pool_type`, `calc_version`, `participant_count`, `participants_ref`, `per_user_units`, `paid_units`, `leftover_units`, `created_at`. |
| `signing_keys` | `key_id`, `public_key`, `status`, `valid_from`, `valid_to`. Keeps historical keys available. |
| `password_reset_tokens` | Single-use, short-lived reset credentials (stored hashed). |
| `admin_recovery_codes` | One-time Backup Recovery Codes (stored hashed). |
| `push_devices` | Push notification tokens per user device. |
| `account_status_history` | Every status change with reason and time. |
| `maintenance_events` | Start, end, reason and affected services. |

### 11.2 Changes to existing tables

| Table | Change |
|---|---|
| `users` | Add `phone_encrypted`, `phone_hash` (unique), `phone_verified_at`, `public_id` (unique, random), `lifetime_successful_sessions`, `group_change_count`. Keep `successful_session_count` as validity progress only. |
| `mining_sessions` | Add `slot_status` (`NORMAL`, `PAUSED`). `session_number` is null for non-effective slots. |
| `mining_activations` | Store **accepted** activations only, and keep `UNIQUE(user_id, session_id)`. Record rejected attempts in `audit_logs`. In v1.1 a stored `REJECTED` row would block a later accepted activation. |
| `referral_relationships` | Add status `PENDING_EFFECTIVE` for a relationship waiting for the next session. |
| `ledger_transactions` | Add types `SESSION_LEFTOVER`, `FORFEITURE`, `TASK_REWARD`, `AD_REWARD`, `GENESIS`. Allow `user_id` to be null for system accounts. |
| `reward_records` | Add reward types `TASK_REWARD`, `AD_REWARD`. |
| `public_ledger_blocks` | Add `block_type` (`GENESIS`, `NORMAL`, `CORRECTION`), `corrects_block_id` (nullable), `merkle_root`. |
| `public_ledger_transactions` | Add `tx_hash`. Replace `public_user_identifier` with the random public ID. |

The existing unique constraint `reward_records(user_id, session_id, reward_type)` is unchanged.

---

## 12. Sections of existing documents superseded by this record

| Document | Section | Superseded content |
|---|---|---|
| README | 3 | Allocation table and "App Reserve" wording |
| 01 PRD | 8, 9.4, 14 | Allocation, forfeiture destination, screen list |
| 04 Technical | 10, 12.3 | Allocation, forfeiture destination |
| 05 Architecture | 5.6, 10.3 | Allocation, public user identifier |
| 06 Backend | 6.3, 7, 8.3 | Session states, allocation, forfeiture destination |
| 07 Database | 5, 10, 14, 20, 21 | Tables changed in section 11 of this record |
| 08 Mining & Reward | 3, 6.2, 10, 15 | Allocation, unused pools, rounding, reserve accounting |
| 10 Security | 11.1 | Allocation |
| 11 Testing | 9.1 | Allocation |

Screen lists: the PRD list is missing Explorer and Transaction Details. The UI/UX document has no specification for Session Completion, Settings, and Help and Support. Both lists must be reconciled.

User ID: v1.1 defines it three ways (PRD, architecture, schema). v1.2 uses `user_number` internally and the random `public_id` publicly.

---

## 13. Open decisions

| ID | Decision needed |
|---|---|
| O-01 | Release schedule for the locked 12,000,000 SAC (start date, step size, interval). |
| O-02 | Minimum user age and the list of supported countries. |
| O-03 | Production server timing. The owner plans a separate server after user growth. The drafting recommendation is a rented server from public launch, with the laptop used only for development and internal testing, because a laptop is exposed to power loss, sleep and home-network risk while handling user rewards. |
| O-04 | Task and advertisement program: types, limits per user, payout rules, ad networks. |
| O-05 | How balances move to the future blockchain (claim, airdrop, swap) and that chain's parameters. |
| O-06 | SMS provider for phone OTP (cost per message to be budgeted), email provider, push provider. |
| O-07 | KYC provider and data-retention policy. |
| O-08 | Admin panel technology. |
| O-09 | Token lifetimes, OTP validity and attempt limits, rate-limit thresholds. |
| O-10 | Username rules: length, case handling, allowed characters. |
| O-11 | Minimum Android and iOS versions, Android package ID, iOS bundle ID. |
| O-12 | Privacy Policy, Terms of Service, support process. |
| O-13 | Brand: colours, logo, fonts. |
| O-14 | Backend language and database. Suggestion: TypeScript with PostgreSQL, so types can be shared with the Expo app. |
| O-15 | Confirm the PROPOSED items in this record, especially section 6.3 and section 9. |

---

## 14. Legal and store notes

This record is not legal advice. Before public launch, obtain legal review of:

- Referral-based reward distribution in each target country.
- The 38.71% owner allocation and its disclosure.
- App store policy. Apple does not allow cryptocurrency mining on the device. This app does its processing on the server, but store reviewers must be able to see that clearly. Use the wording "reward session" in store listings and in the app instead of "mining" wherever possible.
- Advertisement network policies for incentivised ads.
- Privacy law for phone numbers and device signals.

---

## 15. Next steps

1. Owner reviews this record and answers the OPEN items that block implementation (O-01, O-02, O-04, O-05 first).
2. Apply the approved items to documents 01–12 and convert the documents to proper Markdown (headings, table separators, fenced diagrams).
3. Build the reward engine as a pure function with test vectors taken from section 4.5, then the backend, then the app.
4. Run a closed beta of about 100 users before public launch.

---

END OF DOCUMENT
