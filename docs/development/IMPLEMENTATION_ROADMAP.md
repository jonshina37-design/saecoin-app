# SAECOIN Implementation Roadmap

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

PROPOSED (P-07). **No implementation is allowed until the owner approves** (C-13). Existing v1.2 code (engine, SQL, theme) is not changed by this roadmap.

## Order of work

| Step | Output | Gate |
| --- | --- | --- |
| 0 | This documentation set reviewed | Owner reads and approves or edits |
| 1 | Resolve blocking OPEN items: Q-11 (claim eligibility), Q-12 (reward amounts), Q-16 (v1.2 app), Q-17 (ledger model), Q-19 and Q-20 (rules and releases) | Owner decisions |
| 2 | Research reports: PoW algorithm (Q-01), block time, difficulty, fee formula, task verification, Android node feasibility | Owner decision per item |
| 3 | Consensus specification freeze, written rules with test vectors | Owner approval and review |
| 4 | Reference node and wallet core on a local development network | Not a mainnet; tests pass |
| 5 | Public test network | Long soak, attack simulations |
| 6 | Independent security review | Findings fixed |
| 7 | Android integration of the unified app | UX per the UX spec |
| 8 | Mainnet readiness review | MAINNET_LAUNCH_CHECKLIST all met, legal review done |

## Founder Release

Stays blocked until the owner approves the full schedule and edge cases (D-18, Q-13).

## Relation to v1.2

The v1.2 reward engine and ledger simulation are reference material: their tests show the 31,000,000 invariants and reward arithmetic of the old tokenomics. They must not be edited to the new tokenomics until the owner approves (C-13). A conversion would be a separate, reviewed task.

## Migration (planning, no action)

The v1.2 project is in the planning stage with no production ledger. If balances ever exist before the chain, the rules are: one Genesis only; no duplicate SAC; supply reconciliation between the old ledger and the new chain; no user balance or reward changed before migration is complete (GENESIS_SPEC section 4, Q-16).

## Not planned yet

Dates, team, budget, hosting.
