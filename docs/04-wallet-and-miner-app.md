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
| Store version | Google Play / App Store | Wallet, plus **remote management** of a miner that runs on the user's own computer or server (start, stop, hashrate, earnings). No mining on the phone |
| Desktop version | Official website installers (Windows, Linux, macOS) | Wallet plus miner |
| Android direct build (phase 2, D-22) | Direct APK download, open-source channels | Wallet plus on-device mining, only if the benchmarks in doc 08 pass |

### Launch scope (D-22, DECIDED)

Phase 1 (launch): phone wallet in the stores (Android and iPhone) with remote miner management, and the desktop miner. Phase 2: add the Android direct build with on-device mining, only if benchmarks show the minimum phone class (P-12) can mine safely. D-10 stays the long-term requirement and the algorithm is still chosen to be phone-capable (D-16), but phone mining is not part of the launch.

Whether Apple accepts remote management of the user's own miner must be checked with Apple's current review guidelines before relying on it. Apple also requires wallet apps to come from an organization-enrolled developer (verify the current wording), which means a registered legal entity may be needed for the iPhone release.

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
