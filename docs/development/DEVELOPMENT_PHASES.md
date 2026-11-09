# SAECOIN Development Phases

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

PROPOSED. Phases follow the roadmap; each ends with a review by the owner. "Done" means tested, not written.

| Phase | Scope | Exit evidence |
| --- | --- | --- |
| A. Decisions | OPEN items that block design | Updated Decision Record |
| B. Research | PoW, difficulty, fees, task verification, Android feasibility | Research reports with measurements |
| C. Specification | Consensus, transaction, claim, Genesis, founder lock rules and test vectors | Frozen spec |
| D. Core library | Types, validation, supply invariant, storage, no network | Unit and property tests pass |
| E. Node and P2P | Sync, relay, peer scoring | Multi-node local network tests |
| F. Miner | PoW miner, difficulty | Simulations, devnet |
| G. Wallet core | Keys, signing, backup | Review of key handling |
| H. Claims and tasks | Claim engine, task interface | Pool drain tests, replay tests |
| I. Explorer and API | Read-only services | Matches node data |
| J. Android app | Unified app, light node | UX per spec, battery tests |
| K. Testnet | Public test network | Soak, attack drills |
| L. Review | External security review, legal review | Reports, fixes |
| M. Mainnet decision | Checklist | Owner approval |

Rules for every phase: no secrets in the repository; changes in small reviewed commits; documents updated with the code; no claim of readiness without evidence.
