# SAECOIN Security Architecture

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

PROPOSED principles. Nothing is implemented or tested. No part of the design may be called secure or production ready.

## 1. Principles

1. Consensus rules live in the node software only. No API or admin panel can change them (C-01).
2. Keys never leave the user's device (C-02).
3. Validate everything received from peers.
4. Integer arithmetic only for SAC. The supply invariant is checked for every block.
5. Small, separate modules, each tested alone (BLOCKCHAIN_ARCHITECTURE).
6. No secrets, keys, wallet files, databases or build artifacts in the repository.
7. Reproducible, signed releases (Q-20).

## 2. Required controls (from the owner's list)

Signed transactions, double-spend protection, replay protection, Sybil resistance, secure P2P, consensus validation, supply integrity, genesis integrity, transaction and block validation, secure wallet key management, network attack resistance, database integrity.

## 3. Status of each control

| Control | Design | Status |
| --- | --- | --- |
| Transaction signing | Wallet signs locally | Proposed |
| Double spend | Spent-coin tracking, confirmations | Proposed, parameters OPEN |
| Replay | Chain-bound signatures, unique claims | Proposed |
| Sybil resistance for **block production** | PoW | Direction CONFIRMED, strength OPEN (Q-15) |
| Sybil resistance for **rewards** | None defined | **OPEN (Q-11)** |
| Secure P2P | Encrypted transport, peer scoring | Proposed |
| Supply and genesis integrity | Hard-coded Genesis hash, invariant check | Proposed |
| Wallet keys | Keystore, seed phrase | Proposed |
| Database integrity | Chain state derived from blocks, rebuildable | Proposed |

## 4. Interaction with v1.2

The v1.2 security document (10) and the SQL role and trigger work apply to the centralized ledger only. They do not secure a PoW chain.
