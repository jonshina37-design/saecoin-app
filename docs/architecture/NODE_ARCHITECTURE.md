# SAECOIN Node Architecture

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

## 1. Node types (PROPOSED)

| Type | Stores | Validates | Typical host |
| --- | --- | --- | --- |
| Full node | Whole chain and state | Everything | Desktop, server |
| Pruned full node | Recent blocks and state | Everything it keeps | Desktop, small server |
| Light node | Block headers plus proofs for its own addresses | Proof of work and inclusion | Phone |
| Mining node | A full node plus a PoW miner | Everything | Desktop, rig |

Anyone may run any type without permission (C-02).

## 2. Android reality (CONFIRMED need, C-11; OPEN feasibility, Q-08)

- Android limits background work, network access and battery use. A phone that sleeps cannot serve the network.
- A full chain download and verification costs storage, data and battery.
- It is therefore **not claimed** that installing the app makes a phone a 24/7 full node.
- Proposal P-03: the app runs a light node by default; an optional full-node mode runs while the phone is charging and on Wi-Fi, as a foreground service with a visible notification; permanent full nodes are expected on desktops and servers.
- Optional PoW mining on a phone is a research item. Heat, battery and the low hash rate of phones make it unlikely to matter for security (see POW_RESEARCH).

## 3. Modules inside the app (CONFIRMED list, C-11)

Wallet core, lightweight node, optional full node, P2P network, consensus engine, PoW mining engine, transaction engine, reward claim engine, task verification interface, blockchain synchronization, explorer integration. All PROPOSED as separate modules with the interfaces in BLOCKCHAIN_ARCHITECTURE.

## 4. Light node trust (information)

A light node trusts that the chain with the most work is valid, because it does not check every rule. A dishonest majority of hash power could mislead it. Light clients ask several peers and compare. This is a real limit and must be shown honestly in the app.

## 5. Network health for users (CONFIRMED need)

The wallet screen shows node status: type, sync height, peer count, last block time (UNIFIED_APP_UX_SPEC).

## 6. Not decided

Storage engine, minimum hardware, pruning depth, mobile data limits, whether phones may mine at all.
