# SAECOIN Blockchain Architecture

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

## 1. Modules (PROPOSED)

Each module has a narrow interface so it can be tested, replaced and reused by the Android app, desktop node and explorer.

| Module | Job | Must not |
| --- | --- | --- |
| Core types | Blocks, transactions, amounts (integer units), hashes | Do I/O |
| Consensus | PoW check, chain selection, difficulty, timestamp rules | Depend on any server or admin |
| Validation | Transaction and block rules, claim rules, supply invariant | Trust the sender |
| P2P | Discovery, relay, synchronization | Decide validity |
| Storage | Blocks, chain state, claimed-session set | Hold keys |
| Wallet core | Keys, signing, addresses | Send keys anywhere |
| Explorer | Read-only view of chain data | Act as an authority (C-12) |
| API | Optional read services for apps | Hold consensus power |

## 2. What the chain records (CONFIRMED, C-12)

Genesis supply and pool allocations; reward claims; task rewards; Founder Reserve and its unlock history; transaction fees and producer fees; wallet transactions; token creation; locked and unlocked balances; circulating supply; remaining pool balances. For every coin the origin and movement history is checkable.

## 3. Ledger model (OPEN, Q-17)

| Model | Fit | Concern |
| --- | --- | --- |
| UTXO with keyless protocol pools | Locked and unlocked coins are natural (time-locked outputs); pools need special consensus handling | Pools are not ordinary outputs |
| Account model | Pools and claim counters are natural | Locked tranches and replay protection need extra rules |

No choice is made. Whichever is chosen, the supply invariant is the same: issued once at Genesis, never increased.

## 4. Supply invariant (PROPOSED)

At every block, the total of all balances, pool balances and locked amounts equals exactly 3,100,000,000,000,000 units. A block that breaks it is invalid. There is no coinbase subsidy.

## 5. Tokens (OPEN, Q-09)

User-created tokens are a later feature, after the main chain is stable. They are separate assets from SAC and do not change SAC supply. Rules (name, symbol, supply, decimals, creator address, fee, anti-spam, anti-impersonation) are not decided. A listing on any exchange is a separate matter and does not follow from creating a token.

## 6. Data to keep small (PROPOSED)

Phones and small computers matter (C-02, C-11). Keep block size and state modest (Q-04), allow pruning, and let light clients verify with headers and proofs.

## 7. Not decided

Language and libraries, serialization format, address format, signature scheme, hash functions beyond PoW. A technology study comes before any code (C-13).
