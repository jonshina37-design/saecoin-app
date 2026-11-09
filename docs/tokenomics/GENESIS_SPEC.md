# SAECOIN Genesis Specification

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

## 1. Principle (CONFIRMED, C-03; consistent with v1.2 D-17)

Genesis is an **explicit initial supply issuance**. It is the only place SAC is created. It is not a debit-credit transfer between accounts.

## 2. Contents (PROPOSED structure)

| Item | Value | Label |
| --- | --- | --- |
| Total issued | 3,100,000,000,000,000 units (31,000,000 SAC) | CONFIRMED |
| Regular Mining Reward Pool | 1,700,000,000,000,000 units | CONFIRMED |
| Task Reward Pool | 200,000,000,000,000 units | CONFIRMED |
| Founder Reserve | 1,200,000,000,000,000 units, as 12 time-locked tranches of 100,000,000,000,000 units | CONFIRMED amount, tranche layout PROPOSED (P-02) |
| Genesis timestamp | The reference for the founder lock | CONFIRMED use, value OPEN |
| Genesis block hash | Fixed in every node's software | PROPOSED |
| Founder address | The founder's own non-custodial address, published before Genesis | PROPOSED |

## 3. Rules every node enforces (PROPOSED)

1. The chain must start from the exact Genesis block known to the software.
2. The sum of issued amounts must equal exactly 3,100,000,000,000,000 units.
3. No other block may issue SAC. No block subsidy exists.
4. The three allocations are separately identifiable in the explorer.
5. Genesis can exist once; a second Genesis is a different chain.

## 4. Reconciliation with v1.2 (OPEN, Q-16)

The v1.2 Genesis has four accounts (12,000,000 / 12,960,000 / 4,320,000 / 1,720,000). The new one has three. If any v1.2 balance ever exists, how it maps to the new chain is undecided. At the time of writing the v1.2 project is in the planning stage; this document does not assume any user balances exist. Before any migration: no user balance or reward may be changed.

## 5. Open points

Genesis timestamp and block time (Q-02) decide the founder lock in blocks (Q-13); the initial difficulty (Q-03); who produces the first blocks when no subsidy exists (Q-14, Q-15).
