# 10 — Wallet Architecture (draft)

Status: design proposal (P-15). **Documentation only: no wallet code is written until the owner explicitly approves a phase.** It builds on D-12 (non-custodial wallet), C-04, D-14, D-17, and P-14. Chain-specific parts depend on O-07, O-08, and O-09.

## 1. Principles

1. **Non-custodial.** Keys exist only on the user's device. No server of ours can see, move, or recover them.
2. **No authority.** The wallet works against any compatible node or indexer the user chooses. Nothing in the project can freeze, reverse, or block a transaction.
3. **No tracking.** No analytics, advertising, or attribution SDKs. Crash reports are opt-in and never contain addresses or amounts.
4. **No gatekeeping.** No KYC, no referral codes, no account, no sign-up.
5. **Open and verifiable.** Open-source code, reproducible builds, signed releases, published hashes.
6. **Boring cryptography.** Audited, widely used libraries only. No custom cryptography.
7. **Honest UI.** The wallet never shows prices, earnings projections, or "you could earn" messages.

## 2. Platforms and distribution

| Item | Plan | Tag |
| --- | --- | --- |
| Framework | React Native with TypeScript (one codebase) | PROPOSED |
| First platform | Android | PROPOSED |
| Android distribution | Google Play (wallet only) and a signed direct APK; Google Play may ask for proof of regulatory compliance for wallet apps | PROPOSED |
| iPhone | Later. Apple requires wallet apps from an organization-enrolled developer (verify current wording), so a registered legal entity may be needed (see doc 04) | OPEN |
| Desktop | Wallet ships inside the desktop miner package later | PROPOSED |
| Languages | English and Bangla first; more by community translation | PROPOSED |

## 3. Layers

| Layer | Responsibility | Chain-specific? |
| --- | --- | --- |
| **UI** | Screens, navigation, language | No |
| **Wallet core** (TypeScript library) | Key generation, derivation, transaction building, signing, fee estimation, partially signed transactions | No (chain parameters injected) |
| **Chain adapter** | Address encoding (prefix TBD), network parameters, script types, timelock awareness, testnet/mainnet switch | **Yes** (O-07, O-08, O-09) |
| **Data layer** | Talks to a node or indexer through a documented open protocol; server list; basic header verification where feasible | Partly |
| **Secure storage** | Android Keystore (iOS Keychain later) holding the encrypted seed, gated by biometrics or a PIN | No |

The wallet core is kept as a separate library with its own tests so that the desktop wallet and any future client can reuse it.

### Light-server note

As far as I know, a Bitcoin Core node is not designed to serve mobile wallets directly. Mobile wallets of this kind usually talk to an indexing server (Electrum-style or REST). The project must define that protocol and run a first server (O-21). The wallet must allow adding a custom server, and the user's own server must be a first-class option. A server can learn the addresses it is asked about; this privacy limit must be stated to users.

## 4. Keys and backup

| Item | Proposal |
| --- | --- |
| Recovery phrase | Standard word-list phrase, 12 words by default with a 24-word option |
| Derivation | Standard hierarchical derivation; the coin type is a placeholder until a number is chosen (O-22) |
| Address type | Native segwit-style address by default (if the chosen codebase supports it) |
| Display | Phrase shown once at creation; the user must confirm by re-entering selected words |
| Cloud backup | **Off.** No automatic backup of the phrase to any cloud |
| Optional passphrase | Supported, with a clear warning that losing it means losing the coins |
| Screens with secrets | Screenshots and screen recording blocked (Android secure-screen flag) |
| Clipboard | Seed phrase is never copied; copied addresses are cleared after a short time where the platform allows |
| Restore | Works from the phrase alone, on any wallet that follows the same standards |

## 5. MVP features

Included:
- Create and restore wallet
- Receive: address, QR code, a fresh address for each request
- Send: scan QR, amount, fee choice, a review screen showing the full address and fee, confirmation with biometrics or PIN
- Balance (confirmed and unconfirmed) and transaction history
- Server settings (default list, custom server, show the server in use)
- Backup status reminder and app lock
- Testnet toggle (until mainnet exists)
- "Verify this build": shows the version and hash to compare with the website

Not in the MVP:
- Multiple accounts, hardware-wallet support, multisig (the founder reserve uses separate tooling, doc 09)
- Swaps, fiat on-ramps, price charts, push notifications (privacy)
- Miner management (P-14, phase 2) and the reserve-schedule viewer (read-only, later)

## 6. Threats and mitigations

| Threat | Mitigation |
| --- | --- |
| Fake or look-alike apps | One official domain and repository, signed releases, published hashes, store listing linked from the site |
| Phishing (fake "verify your seed" pages) | The wallet never asks for the phrase except in the restore flow; users are told this plainly |
| Malicious or lying server | Basic header and proof checks where feasible; allow the user's own server; warn when servers disagree |
| Clipboard address swapping | Full address shown on the review screen; verify first and last characters prompt |
| Device compromise | Keystore-protected seed, app lock, no seed export after setup |
| Supply-chain attack on dependencies | Few dependencies, pinned versions and lockfile, review of updates, reproducible builds |
| Backup mistakes | Mandatory confirmation quiz, clear warnings, a visible backup-status indicator |
| Bugs in key handling | Test vectors, review by someone other than the author, external audit before mainnet |

## 7. Testing

1. Unit tests using published test vectors for phrase, derivation, address, and signing.
2. Property and fuzz tests on transaction parsing and serialization.
3. End-to-end tests on a local test network, then the public testnet.
4. Restore tests against an independent implementation.
5. Dependency and build reproducibility checks.
6. External security review before any mainnet release.

## 8. Phases (gated by evidence)

| Phase | Work | Exit |
| --- | --- | --- |
| W0 | This document; owner decisions on O-07, O-08, O-09, O-21, O-22 | Chain-specific inputs fixed |
| W1 | Wallet core library with tests, running against a local test network | All test vectors pass |
| W2 | Android MVP on testnet | A test user can create, receive, send, restore |
| W3 | Closed testing and an independent review | No unresolved high-severity findings |
| W4 | Public testnet release | Outside testers use it for weeks |
| W5 | External audit, legal review, store compliance | Audit complete |
| W6 | Mainnet release (after the chain launches, doc 06) | — |

Nothing before W1 involves code, and W1 needs the owner's approval.

## 9. Open items

| ID | Item |
| --- | --- |
| O-21 | Light-server / indexer protocol, and who runs the first server |
| O-22 | Coin type number for derivation and address prefix choice (with O-08) |
| O-07, O-08, O-09 | Address and signature format, network identity, codebase (see doc 07) |
