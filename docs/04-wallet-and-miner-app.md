# 04 — Wallet and Miner App

Status: P-06 is PROPOSED. C-04 (non-custodial) and C-05 (18+, per-country switch) are CARRIED. Needs owner review.

## 1. Role of the app

The earlier design used the app as a centralized reward server's client (virtual sessions, OTP signup, referrals). That is incompatible with D-01 and D-05 and has been removed. In the new design the app is a client of the chain:

| Component | Purpose | Tag |
| --- | --- | --- |
| Wallet | Create and back up keys, show balance, send and receive SAC | PROPOSED (P-06), non-custodial CARRIED |
| Reserve schedule view | Shows the public founder-reserve unlock schedule | PROPOSED |
| Desktop miner | Mines with a CPU on Windows/Linux/macOS | PROPOSED |
| Block explorer link | Read-only, optional | PROPOSED |

## 2. Important constraint: phone mining

Phone-based mining is a poor fit:

- Mining drains the battery and heats the device.
- CPU-friendly algorithms need memory that many budget phones lack.
- As far as I know, both Google Play and the Apple App Store restrict or prohibit apps that mine cryptocurrency on the device itself (remote-controlled mining is treated differently). **Verify the current store policies before planning any mining feature in a mobile app.**

Recommendation: the mobile app is a **wallet only**. Mining is done by desktop software (and optionally dedicated devices).

## 3. Wallet principles

1. Keys are generated and kept on the user's device. No server holds them (C-04).
2. A recovery phrase is shown once and the user is warned plainly that losing it means losing the coins.
3. The wallet talks to any node the user chooses; it ships with a default list but does not depend on a single server.
4. No SAC balances are stored in a company database.

## 4. Onboarding and restrictions (CARRIED, to review)

- 18+ confirmation and a per-country on/off switch were decided for the old app. For a non-custodial wallet and open-source software they may be neither enforceable nor appropriate, because a decentralized protocol cannot block users by country. Whether these apply only to distributed app builds is a legal question (see doc 05) and is OPEN (O-12).

## 5. Out of scope for now

- Exchange or fiat on-ramp.
- Custodial accounts.
- Any central reward program, referral scheme, or advertising-funded payout. (An advertising model was discussed in earlier drafts; it is not part of this design.)
