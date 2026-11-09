# Chain Selection and Reorganization

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

## 1. Rule (CONFIRMED, C-08)

Among valid chains, the one with the greatest cumulative work wins.

## 2. Reorganization (required; parameters OPEN, Q-07)

When a better valid chain appears, nodes switch to it. Transactions of the replaced blocks return to the pool if still valid. Claims of the replaced blocks return to pending and their claimed-session records are undone. Rewards and fees in the replaced blocks are not final.

## 3. Finality

PoW finality is probabilistic. The number of confirmations needed for sending, receiving, claims and founder unlocks is not chosen. A larger number is safer and slower.

## 4. Checkpoints (PROPOSED, P-06)

Beyond the Genesis hash, no checkpoints. A checkpoint is a trusted party telling nodes which history is right, which brings back central control. Long-range reorganizations on a weak new chain are a real risk (Q-15) and need another answer than checkpoints. Not chosen.

## 5. Selfish mining and withholding

A miner with a large share can gain by hiding blocks. This needs study with the chosen block time.

## 6. Tests needed

Simulated reorganizations of different depth, including around a founder unlock and a claim.
