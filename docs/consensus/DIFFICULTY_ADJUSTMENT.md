# Difficulty Adjustment

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

**OPEN (Q-03).** Required by the owner (C-08); the method is not chosen.

## 1. The problem

Hash power on a new chain can rise and fall sharply (rented hash power, miners moving). Too slow an adjustment can freeze the chain when miners leave or flood it with fast blocks when they arrive.

## 2. Options to study

| Option | Idea | Concern |
| --- | --- | --- |
| Periodic retarget (Bitcoin-style, every N blocks) | Simple, well studied | Slow reaction on a small chain |
| Per-block rolling windows (several known designs) | React quickly | More complex, timestamp manipulation matters more |
| Emergency rule when blocks stop | Lets the chain restart | Can be abused |

## 3. Things every option must handle

Timestamp manipulation by miners, large swings of hash power, an initial difficulty at Genesis, limits on how much difficulty may change per step, and clear behavior after a long gap with no blocks.

## 4. Testing needed

Simulation with extreme hash power patterns before any choice is final.
