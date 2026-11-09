# SAECOIN Product Requirements (decentralized direction)

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

This is the product view of the CONFIRMED direction. The v1.2 PRD ([01-App-PRD.md](../01-App-PRD.md)) remains the baseline for the centralized app; this page records what changes.

## 1. Product

One Android app for earning SAC through scheduled sessions and tasks, and for holding and sending SAC in a non-custodial wallet, on a decentralized PoW chain with a fixed supply of 31,000,000 SAC.

## 2. Users and needs

| User | Need |
| --- | --- |
| Earner | Run a session, claim the reward, see history |
| Task user | Find tasks, submit evidence, get paid |
| Holder | Keep SAC safely, send and receive, see locked and unlocked balance |
| Verifier of the network | See supply, pools, fees, founder unlocks in the explorer |
| Node operator | Run a full node on a computer |
| Miner (optional) | Produce blocks |

## 3. Requirements

| ID | Requirement | Label |
| --- | --- | --- |
| PR-01 | One app, two interfaces (Main and Wallet) | CONFIRMED |
| PR-02 | Session start, completion and reward claim | CONFIRMED flow, amounts OPEN |
| PR-03 | Task list, evidence submission, reward claim | CONFIRMED flow, verification OPEN |
| PR-04 | Session and reward history, notifications | CONFIRMED |
| PR-05 | Wallet: balance, send, receive, history, tokens, import, seed backup | CONFIRMED |
| PR-06 | Block explorer and node status inside the app | CONFIRMED |
| PR-07 | Full node mode and optional PoW mining mode | CONFIRMED as options, feasibility OPEN |
| PR-08 | Non-custodial keys, no key leaves the device | CONFIRMED |
| PR-09 | Public transparency of supply, pools, fees and unlocks | CONFIRMED |
| PR-10 | Age 18+, country rules, one person one account | **Cannot be enforced by the chain**; open (Q-11, Q-18) |
| PR-11 | Referral program | **Removed** with the Referral Pool (C-04) |

## 4. Non-goals for now

Exchange or DEX listing; token features before the chain is stable; iOS; a Telegram Mini App (D-14 is in conflict, Q-16).

## 5. Wording rule

The v1.2 rule says to write "verifiable public ledger", not "blockchain", while the product is a centralized ledger. That rule belongs to the v1.2 app. The word "blockchain" may be used only for a real chain that exists and has been independently checked. Until then no public text may call SAECOIN decentralized, secure or production ready.

## 6. Success is not defined yet

No targets for users, nodes or hash power are set by the owner.
