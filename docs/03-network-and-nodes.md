# 03 — Network and Nodes

Status: PROPOSED unless noted. Follows from D-01 (anyone can run a node) and D-06 (no money spent).

## 1. Node roles

| Role | Who runs it | Purpose |
| --- | --- | --- |
| Full node | Anyone | Validates every block and transaction; the source of truth for the user running it |
| Miner | Anyone with a computer | Produces blocks; earns the subsidy and fees |
| Seed / bootstrap node | Founder at first, then the community | Helps new nodes find peers. It has no authority over the chain |
| Light wallet | Anyone | Stores keys, signs transactions; trusts a node for chain data |

No role, including the founder's seed nodes, can change consensus rules. If a node serves bad data, other nodes reject it.

## 2. The honest bootstrap problem

"No money spent" is realistic for the protocol but not for everything around it:

| Need | Cost | Free option |
| --- | --- | --- |
| Seed node that is always online | A small VPS, a few dollars per month | A home computer running 24/7 (fragile; the network is weak when it is off) |
| Website and docs | Free static hosting is enough | GitHub Pages |
| Source code | Free | GitHub |
| Security review | Can be expensive | Open-source review by volunteers; budget for a paid audit before mainnet if possible |
| Legal advice | Not free | None that replaces a lawyer |

Recommendation: treat a small recurring seed-node cost as part of the project, not as a violation of D-06. The chain should publish several community seed nodes as soon as others are willing to run them.

## 3. Mining phases

1. **Founder-run testnet** — a handful of nodes, no value.
2. **Public testnet** — outsiders join, find bugs, test mining and wallets.
3. **Mainnet fair launch** — announced time, public code, reserve disclosed.

## 4. Early-chain security

A new chain with a few miners is fragile:

- With little hashrate, one participant could control more than half of it and rewrite recent history (51% attack).
- Mitigations: a hard-to-rent algorithm (P-04), conservative confirmation counts for exchanges or merchants, a fast difficulty algorithm, and transparent communication about the risk.
- The founder should not mine a dominant share of early blocks. This protects both the chain and the founder's credibility.

## 5. Monitoring (non-authoritative)

An optional public block explorer and status page are useful for the community. They are read-only views and must never be required for the network to function.
