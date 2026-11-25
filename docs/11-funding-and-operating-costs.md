# 11 — Funding and Operating Costs (draft)

Status: planning note, documentation only. Nothing here is a DECIDED item except where it cites one. All dollar figures are my rough estimates, not quotes; verify current prices before relying on them. Amounts are in fiat. This document makes no statement about the value, price, or listing of SAC.

## 1. The constraint

- D-06: the project starts with no money spent on the chain itself.
- D-04, D-21: the founder reserve cannot be spent for 2 years (first lock height 103,680, about 720 days after launch at 10-minute blocks).
- D-14: the founder does not sell SAC. D-15: fair launch, with no presale.

So every cost before and during the first 2 years must be paid in fiat, from the owner's pocket or from donations. Nothing may be funded by selling SAC or by any central reward program.

## 2. What actually needs to run

| Item | Needed when | Why | Rough cost (estimate, verify) |
| --- | --- | --- | --- |
| Developer laptop | Now | Docs, then testnet and development | Already owned |
| Source repository (GitHub) | Now | Public code and docs | Free tier |
| Website (static) | Before public testnet | Whitepaper, downloads, hashes, reserve disclosure | Free static hosting; a domain is about $10–20 per year |
| Seed node (1 small VPS) | Public testnet and mainnet | New nodes find peers | About $5–15 per month |
| Light server / indexer (O-21) | Wallet testing | Mobile wallet reads balances and history | Can share the seed node's VPS at first; more as usage grows |
| Test mining devices | Algorithm benchmark (O-01) | A low-end phone and a laptop | Devices the owner or testers already have |
| Mining pool server | Optional, later | Small miners get steadier payouts | Not needed at launch; the community can run pools |
| Explorer | After mainnet | Public verification | Small server; can be community-run |

Estimated recurring infrastructure at the public-testnet stage: roughly $15–30 per month, mostly one or two small VPS plans. Mainnet may need more nodes, but the design (doc 03) does not require the founder to run most of them.

## 3. One-time and periodic costs

| Item | Note | Rough cost (estimate, verify) |
| --- | --- | --- |
| Google Play developer account | One-time registration fee | About $25 |
| Apple Developer Program | Yearly; wallet apps need an organization account (doc 04, verify) | About $99 per year, plus a registered entity |
| Independent security review of consensus code and wallet | Required before mainnet (doc 06, phase 3); the largest cost | Could be thousands of dollars; get quotes |
| Legal review | Required before launch (doc 05); owner's country and target markets | Get quotes |
| Reproducible-build and signing setup | Signing keys for releases | Mostly time |

The audit and the legal review are the real budget items. The servers are small by comparison.

## 4. Funding options

| Option | Fits the principles? | Notes |
| --- | --- | --- |
| Owner pays from savings or income | Yes | Simplest and fully independent. Keep a written cap on what is spent |
| Donations in fiat or crypto, with public accounting | Yes | Publish a donation address and, later, how funds were used. Never promise anything in return |
| Open-source grants and sponsorship | Yes, if there are no strings affecting consensus | Check each grant's conditions |
| Ads on the website or explorer only | Acceptable | Never inside the wallet; no tracking SDKs (doc 10, principle 3) |
| Selling SAC, presale, or private allocation | **No** | Violates D-14 and D-15 |
| Pay-to-mine fee, liquidity-pool payments from miners | **No** | Advised against earlier; looks like a scheme and creates legal exposure |
| Referral or tap-to-earn programs | **No** | Not part of the plan; a known trust problem |
| Spending from the reserve | Not possible for 2 years | After release, the owner may spend released reserve coins under the disclosed schedule; this is not guaranteed to be worth anything, so it must not be the funding plan |

## 5. Keeping costs near zero (phase by phase)

| Phase (doc 06) | Costs | Approach |
| --- | --- | --- |
| 0: design freeze | Time only | Laptop and free GitHub |
| 1: private testnet | Near zero | Local nodes on the laptop and one cheap VPS at most |
| 2: public testnet | Roughly $15–30 per month plus a domain | One seed node, one light server, static website |
| 3: audit and legal | Largest, one-time | Raise or save before starting; do not skip |
| 4: mainnet | Similar to phase 2, plus store fees | Encourage community seed nodes and pools |

## 6. Rules that follow from the principles

1. The founder's servers hold no keys and no balances (doc 10, principle 1). A server compromise can serve false data or go offline but cannot move funds.
2. Anyone can run a node, a light server, a pool, or an explorer. The project should publish how, so the founder's servers become one option among many.
3. Wallets must allow custom servers (doc 10, section 3).
4. Keep a public, simple record of what the founder spends on the project and where the money came from.
5. If funds run out, the chain must still work: no feature may depend on a founder-paid central service.

## 7. Open items

| ID | Item |
| --- | --- |
| O-24 | Who pays for the audit and legal review, and the owner's spending cap before launch |
| O-21 | Who runs the first light server (see doc 07) |
