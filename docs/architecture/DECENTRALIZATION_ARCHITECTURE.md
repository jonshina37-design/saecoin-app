# SAECOIN Decentralization Architecture

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

## 1. Requirements (CONFIRMED, C-01, C-02)

No founder admin authority, no centralized consensus control, permissionless full nodes, independent validation, public verifiability, non-custodial wallet, P2P network. The founder cannot change consensus, balances, approve blocks, shut the network down or change supply.

## 2. What must not exist (PROPOSED checklist)

- No admin key, upgrade key, pause switch or blacklist in the protocol.
- No privileged node whose signature makes a block valid.
- No hard-coded balance edit.
- No server that must be online for the chain to work. Backends may exist for convenience (notifications, caching, explorer API) and must be replaceable.
- No pool controlled by a key (P-01).

## 3. Where decentralization is still weak (stated honestly)

| Weak point | Why | Mitigation to study |
| --- | --- | --- |
| Software control | Whoever publishes and signs the app and node can ship a rule change (Q-19, Q-20) | Open source, reproducible builds, several signers, nodes must opt in to rule changes |
| Founder holds 38.71 % of supply | No consensus power under PoW, but market power after unlocks | Public unlock schedule |
| Bootstrap | First peers come from a seed list; first blocks need miners | Several independent seeds, documented peer exchange (Q-15) |
| Reward eligibility | Needs facts a chain cannot see (Q-11) | Not solved; see REWARD_CLAIM_SPEC |
| Task verification | Off-chain facts (Q-06) | Limit trust, publish verifiers |
| Hash power | A new PoW chain is cheap to attack (Q-15) | Bootstrap plan, merge-mining study |
| Phones as full nodes | Not reliable (Q-08) | Light clients plus desktop and server nodes |

## 4. Role of the backend (PROPOSED)

The v1.2 backend decided rewards. In the new direction it decides nothing. At most it offers convenience services that any user can bypass by talking to nodes directly. If every such service stops, wallets can still send and receive, nodes can still validate and miners can still produce blocks.

## 5. Governance (OPEN, Q-19)

A founderless chain still needs a way to fix bugs and change rules. Options: no governance (frozen rules), rough consensus among node operators and miners, or signalled activation. None is chosen. The founder's Reserve must not become a vote.
