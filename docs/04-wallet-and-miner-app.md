# 04 — Wallet and Miner App

Status: D-12 (non-custodial wallet with optional miner companion), D-10 (phones and laptops can mine) and D-17 (how the mining build is distributed) are DECIDED. C-05 (18+, per-country switch) is CARRIED and under review.

## 1. Role of the app

The earlier design used the app as a client of a centralized reward server (virtual sessions, OTP signup, referrals). That is incompatible with D-01 and D-05 and has been removed. The app is now a client of the chain:

| Component | Purpose | Tag |
| --- | --- | --- |
| Wallet | Create and back up keys, show balance, send and receive SAC | DECIDED (D-12, C-04) |
| Miner companion | Mines SAC on the device (phone and laptop), opt-in | DECIDED (D-10 requirement, D-17 distribution) |
| Reserve schedule view | Shows the public founder-reserve unlock schedule | PROPOSED |
| Block explorer link | Read-only, optional | PROPOSED |

## 2. Mining on phones and laptops (D-10)

The owner wants both to be able to mine. What that means in practice:

- **Algorithm:** the choice is constrained by D-10; see doc 02 section 3 for the memory trade-off.
- **Expectations:** a laptop will earn much more than a phone. Phone mining yields small amounts. The app must say this plainly and never advertise earnings.
- **Heat and battery:** sustained mining throttles and drains phones. Default client behavior (D-17): opt-in, visible status, runs only while charging and below a temperature limit, with a one-tap stop.
- **No hidden mining:** mining must never start without the user's clear consent. Hidden or silent mining is "cryptojacking": it harms users, gets apps flagged as malware, and creates legal exposure.

### App-store constraint (verify before building)

As far as I know, both Google Play and the Apple App Store restrict or prohibit apps that mine cryptocurrency on the device itself (remote-controlled mining is treated differently). Current policies must be checked before planning any distribution.

Decision D-17 (the current store policies must still be verified at build time):

| Build | Channel | Contents |
| --- | --- | --- |
| Store version | Google Play / App Store | **Wallet only** |
| Mining version | Direct APK download, open-source channels, and desktop installers | Wallet plus miner |

iOS in particular is unlikely to allow background mining at all, so mining on iPhones may not be possible; this is a platform limit, not a protocol limit.

## 3. Wallet principles

1. Keys are generated and kept on the user's device. No server holds them (C-04, D-12).
2. A recovery phrase is shown once, and the user is warned plainly that losing it means losing the coins.
3. The wallet talks to any node the user chooses; it ships with a default list but does not depend on a single server.
4. No SAC balances are stored in a company database.
5. Use audited cryptographic libraries; no custom cryptography.

## 4. Onboarding and restrictions (CARRIED, under review)

18+ confirmation and per-country on/off switches were decided for the old, centralized app. For a non-custodial wallet and open-source software they may be neither enforceable nor appropriate, because a decentralized protocol cannot block users by country. Whether these apply only to officially distributed app builds is a legal question (see doc 05) and is OPEN (O-12).

## 5. Out of scope for now

- Exchange or fiat on-ramp.
- Custodial accounts.
- Any central reward program, referral scheme, or advertising-funded payout.
