> **v1.2 NOTICE (draft):** This document belongs to the v1.1 set. Specification v1.2 ([00-Spec-v1.2-Decision-Record.md](docs/00-Spec-v1.2-Decision-Record.md)) changes tokenomics, reward calculation, referral rules and other items. Where the two conflict, the v1.2 record prevails once approved.

SAECOIN (SAC)

A Virtual Mining Reward Distribution Platform

![Project Status](https://img.shields.io/badge/Status-Planning-orange)
![Platforms](https://img.shields.io/badge/Platforms-Android%20%7C%20iOS-blue)
![License](https://img.shields.io/badge/License-TBD-lightgrey)

---

1. About SAECOIN

SAECOIN is a mobile-based virtual mining reward distribution platform designed to distribute SAC rewards through scheduled user participation sessions and a referral-based reward system.

Users activate scheduled sessions through the mobile application. The backend validates participation and calculates eligible rewards according to the approved project rules.

SAECOIN also includes an application-operated public ledger that allows users to inspect and cryptographically verify published reward records.

Important: SAECOIN's current application does not perform actual Proof-of-Work mining, CPU/GPU mining, or decentralized blockchain mining.

The current platform is a centralized, backend-controlled reward distribution system.

---

2. Project Information

Item| Details
Project Name| SAECOIN
Token Symbol| SAC (Provisional)
Project Type| Virtual Mining Reward Distribution Platform
Mobile Platforms| Android and iOS
Mobile Technology| React Native + Expo + TypeScript
Architecture| Centralized Client-Server
Backend Authority| SAECOIN Backend
Total Token Supply| 31,000,000 SAC
Project Status| Planning

---

3. Tokenomics Overview

**v1.2 note (draft):** the "App Reserve" is renamed Task Pool (1,720,000 SAC). Rewards are paid by transfers between pool accounts, session leftovers move to the Task Pool, and the 12,000,000 SAC owner allocation is locked and released in steps. The figures below are the v1.1 values and stay valid for the totals.

The proposed total SAC supply is 31,000,000 SAC.

Allocation| Amount
Regular Mining Allocation| 12,960,000 SAC
Referral Bonus Allocation| 4,320,000 SAC
Initial App Reserve| 1,000,000 SAC
Unused App Mining Allocation transferred to App Reserve| 720,000 SAC
Founder/Personal Reserve| 12,000,000 SAC
Node Mining Allocation| 0 SAC
Total Supply| 31,000,000 SAC

App Mining Distribution

- Regular Mining: 12,960,000 SAC
- Referral Bonus: 4,320,000 SAC
- Total App Mining Distribution: 17,280,000 SAC
- Total App Reserve: 1,720,000 SAC

Session Reward Pools

Each effective network-wide session has the following proposed reward pools:

Reward Category| Network-Wide Pool
Regular Mining| 6,000 SAC
Referral Bonus| 2,000 SAC
Total| 8,000 SAC

The planned distribution consists of 2,160 effective sessions.

These are network-wide pools, not guaranteed individual rewards.

Individual reward calculation, rounding, smallest SAC unit, and remainder-handling rules require final approval.

---

4. Virtual Mining System

SAECOIN uses three scheduled sessions per day.

Session| UTC Schedule
Session 1| 04:00–12:00
Session 2| 12:00–20:00
Session 3| 20:00–04:00 (Next Day)

Session Rules

- Users can activate once during each scheduled session.
- Activation is permitted throughout the complete eight-hour session window.
- Missed sessions cannot be activated retrospectively.
- Activation alone does not guarantee a successful session.
- The backend validates each session after its scheduled end.
- A successful session is required for reward eligibility.
- Backend time is authoritative.
- Unique session and reward identifiers prevent duplicate processing.

The backend is responsible for validating participation and calculating rewards.

---

5. Account and Referral System

SAECOIN includes a referral-based participation system.

Main features:

- Unique username-based referral codes.
- Direct referral relationships.
- Referral group management.
- One permitted lifetime referral group change after initial validation.
- Referral bonus eligibility based on approved participation rules.
- Maximum of 10 direct referrals.

New users must complete 21 successful sessions to become VALID.

Referral bonuses are available only to eligible VALID users.

Exact individual referral reward allocation rules remain subject to final approval.

---

6. Account Validity and Inactivity

After becoming VALID, an account must maintain participation.

- The inactivity window is 90 scheduled session slots.
- At least one successful session within the next 90 slots resets the inactivity counter.
- If no successful session occurs within that window, the account becomes permanently CANCELLED.
- Cancelled accounts cannot be reactivated.
- Cancelled account balances are forfeited to the App Reserve according to the approved rules.

The inactivity policy applies to VALID users. The rebuild period following an approved referral group change is exempt until the user becomes VALID again.

---

7. KYC Verification

KYC verification is required only after all 2,160 effective sessions have been completed.

- KYC is not required during registration.
- KYC is not required during the initial 21 successful sessions.
- Unverified balances may be temporarily locked.
- A locked balance is not automatically forfeited.

The final KYC provider, verification process, and supported documents will be defined before implementation.

---

8. Public Ledger and Explorer

SAECOIN plans to provide an application-operated public ledger.

The ledger is designed to make published reward records publicly inspectable and cryptographically verifiable.

Planned features:

- Unique block numbers.
- Block hashes.
- Previous block hashes.
- Backend digital signatures.
- UTC timestamps.
- Session confirmation records.
- Reward transaction records.
- Public verification key.
- Correction blocks for approved corrections.

Published historical blocks remain immutable. Corrections are recorded through new correction blocks rather than silently changing old records.

Important: This public ledger is operated by SAECOIN's backend. It is not a decentralized or trustless blockchain.

---

9. Technology Stack

Mobile Application

- React Native
- Expo
- TypeScript
- Android
- iOS

Backend

The backend is the authoritative system for:

- User accounts.
- Session activation and validation.
- Reward calculation.
- Referral eligibility.
- Balance management.
- KYC workflows.
- Administrative approvals.
- Ledger publication.

Database

The database stores user, session, reward, referral, transaction, security, and administrative records.

Final database technology and deployment configuration are defined in the technical specifications.

---

10. Security

Security is a core requirement of SAECOIN.

Planned security controls include:

- Secure authentication.
- Password hashing.
- Admin two-factor authentication.
- Role-based administrative access.
- Backend-side validation.
- Duplicate transaction prevention.
- Append-only reward ledger.
- Audit logs.
- Encrypted backups.
- Recovery procedures.
- Security testing.

Administrative reward corrections and recovery operations must follow the documented approval workflow.

---

11. Documentation

Project documentation is maintained in the repository.

No.| Document
01| App PRD
02| UI/UX Design
03| App Flow Specification
04| Technical Requirements
05| App Architecture
06| Backend Specification
07| Database Schema
08| Mining & Reward Specification
09| Referral Specification
10| Security Specification
11| Testing Strategy
12| Release & Launch Plan

Documentation location:

"docs/"

The documentation is the primary reference for project requirements and implementation decisions.

---

12. Project Status

Current Status: Planning

The project is undergoing specification and architecture preparation.

Implementation and public launch must follow the approved documentation.

Public launch must not proceed until required security, reward, referral, integration, and release tests have passed.

Critical unresolved issues must be addressed before production release.

---

13. Development Principles

SAECOIN development follows these principles:

1. Backend authority for all reward-related operations.
2. Consistent implementation of approved specifications.
3. Secure handling of user and administrative data.
4. Deterministic reward processing.
5. Duplicate-resistant transactions.
6. Transparent public reward records.
7. Auditable administrative actions.
8. Reliable backup and recovery.
9. Thorough testing before public release.

---

14. Future Development

Possible future development areas include:

- Independent blockchain infrastructure.
- Decentralized network architecture.
- Additional wallet functionality.
- Independent public verification tools.
- Additional platform integrations.

These are future possibilities and are not part of the current application's confirmed functionality.

---

15. Disclaimer

SAC is a proposed project token with no guaranteed market value, exchange listing, financial return, or withdrawal availability.

Virtual mining sessions represent participation in the application's reward distribution system. They do not represent actual computational Proof-of-Work mining.

All token distribution and account operations are subject to the finalized project specifications and applicable legal requirements.

---

16. License

License: To Be Determined (TBD).

The project license will be finalized before public source-code distribution.

---

SAECOIN — Project Documentation and Development Repository

Version 1.0 — Planning
