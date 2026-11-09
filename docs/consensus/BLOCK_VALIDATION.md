# Block Validation

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

All rules below are PROPOSED unless marked, and none is implemented or tested. Block size is OPEN (Q-04).

## 1. Header checks

1. Proof of work meets the current target.
2. Previous block known; chain work computed.
3. Timestamp: greater than the median of recent blocks and not too far in the future (limits OPEN, Q-07).
4. Version known; unknown rule changes rejected unless activated by the process in Q-19.
5. Merkle root matches the transactions.

## 2. Transaction checks

1. Format and size within limits.
2. Signatures valid for every spent coin.
3. Coins exist and are unspent; no double spend inside the block or the chain.
4. Locked coins (founder tranches and others) are not spent before their lock ends.
5. Amounts are integers, positive, no overflow, inputs cover outputs plus fee.
6. Fee at least the protocol minimum (TRANSACTION_FEE_SPEC).
7. Replay protection: a signed transaction cannot be valid on another chain or twice.

## 3. Claim checks (REWARD_CLAIM_SPEC, TASK_REWARD_SPEC)

Valid signature; session or task not claimed before; amount equals the allowed amount; pool balance sufficient; fee deducted by rule; eligibility rule satisfied (OPEN, Q-11, Q-06).

## 4. Supply invariant

After the block, total supply is still exactly 3,100,000,000,000,000 units. No block creates SAC. The producer receives only the fees of the block.

## 5. Producer payment

The block's producer output may contain at most the sum of fees in the block. Any more makes the block invalid.

## 6. Orphans and invalid blocks

Invalid blocks are dropped and the sender penalized. Valid blocks of a losing branch are kept for a time in case of reorganization.

## 7. Size (Q-04)

Not chosen. Must balance node cost against throughput, with phone and light-node needs in mind.
