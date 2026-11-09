# SAECOIN Consensus Architecture

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

## 1. Direction (CONFIRMED, C-08)

Proof of Work. Block producers solve PoW. Full nodes validate blocks and transactions. The chain with the most cumulative work among valid chains wins. Required: difficulty adjustment, timestamp validation, double-spend prevention, reorganization handling. Algorithm, block time, difficulty rules, block size and security parameters are OPEN.

## 2. Two separate things (CONFIRMED, C-06)

| | Block production | Reward claim |
| --- | --- | --- |
| Who | PoW miners | Any user with a session or task |
| Work | Hash computation | Running a session in the app |
| Paid by | Fees (no subsidy) | Regular and Task pools |
| Checked by | PoW and block rules | Claim rules |

A miner is paid only the fees of transactions in the block. A user's claim reward comes from a pool. The two must not be mixed in the code or the documents.

## 3. Layers

1. **Proof layer:** header meets the target. See [POW_RESEARCH](../consensus/POW_RESEARCH.md).
2. **Chain layer:** cumulative work, reorganization. See [CHAIN_SELECTION](../consensus/CHAIN_SELECTION.md).
3. **Rule layer:** transactions, claims, supply invariant. See [BLOCK_VALIDATION](../consensus/BLOCK_VALIDATION.md).
4. **Timing layer:** difficulty and timestamps. See [DIFFICULTY_ADJUSTMENT](../consensus/DIFFICULTY_ADJUSTMENT.md).

## 4. Limits of consensus

Consensus makes nodes agree on one history. It does not prove that a session or task was real or that a user is unique (REWARD_CLAIM_SPEC section 5). Those facts enter the chain only through whatever rule the owner approves (Q-11, Q-06).

## 5. Not production ready

No algorithm, parameter or rule has been chosen or tested. A PoW chain with little hash power is not secure (Q-15).
