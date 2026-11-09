# SAECOIN Project Status

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

**As of 2026-11-09.** Planning stage. No blockchain code exists. No mainnet or testnet exists.

## State of the repository

| Area | State |
| --- | --- |
| Specs v1.2 (docs 00 to 12) | Written. They describe a **centralized** reward app and remain the recorded baseline |
| Reward engine and in-memory ledger (`packages/engine`) | Built for v1.2 tokenomics (four accounts, referral included). Not changed by this work |
| SQL migrations (`packages/db`) | Written for v1.2, **not run on PostgreSQL, untested**. Not changed by this work |
| Theme and branding (`packages/theme`, `assets/branding`) | Done for the app UI |
| Decentralized chain | **Documentation only** (this set) |

Some of the v1.2 work (decision record updates, engine and SQL hardening, branding, role template) exists as uncommitted changes in the working copy of the `audit-and-branding` branch, waiting for the owner. This documentation set does not depend on it, and decision IDs D-15 to D-18 mentioned here refer to that updated record.

## The new direction in one page

Founderless, permissionless PoW chain; 31,000,000 SAC fixed (Regular Pool 17 M, Task Pool 2 M, Founder Reserve 12 M, no Referral Pool); session reward claims and task claims validated by nodes; fee on claims paid to the block producer; one Android app with a swipe-down non-custodial wallet. Details: [MASTER_PROJECT_SPEC.md](MASTER_PROJECT_SPEC.md).

## What is blocked or unresolved

1. **Reward eligibility and Sybil resistance (Q-11).** A chain cannot check phone numbers, age or one-person-one-account. Until this is solved, a reward pool open to anyone can be drained by bots.
2. **PoW parameters (Q-01 to Q-04, Q-07)** and early security of a new chain (Q-15).
3. **Reward amounts under the new pools (Q-12)** and **miner economics (Q-14).**
4. **Founder Release** stays blocked until the owner approves the full schedule and edge cases (D-18 and O-18 in the v1.2 record; Q-13 here).
5. **The v1.2 app, Telegram plan and backend** conflict with the new direction (Q-16).

## Production

Not ready, and nothing in this set claims otherwise. No test of any consensus rule has been run, because none is implemented.

## Where things are

- Decisions: [decisions/DECISION_RECORD.md](decisions/DECISION_RECORD.md), [decisions/OPEN_QUESTIONS.md](decisions/OPEN_QUESTIONS.md)
- Master summary: [MASTER_PROJECT_SPEC.md](MASTER_PROJECT_SPEC.md)
- Roadmap: [development/IMPLEMENTATION_ROADMAP.md](development/IMPLEMENTATION_ROADMAP.md)
