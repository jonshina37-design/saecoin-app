# SAECOIN Task Reward Specification

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

Task Reward Pool: 2,000,000 SAC (CONFIRMED, C-04).

## 1. Flow (CONFIRMED, C-07)

1. The user completes a task.
2. The user submits evidence or a verification reference.
3. Eligibility is checked.
4. A valid task reward claim transaction is created.
5. After block confirmation the reward is paid from the Task Pool.

## 2. Requirement (CONFIRMED)

The founder or a central backend must not have sole control over verification, and the technical limits of verifying real task completion must be stated.

## 3. Technical limits (stated honestly)

A blockchain can verify data on the chain. It cannot know whether someone watched an advertisement, joined a channel, installed an app or did anything off-chain. Someone must tell the chain, and that someone is trusted. No design removes this trust completely. It can only be spread, limited or priced.

## 4. Verification options (PROPOSED, Q-06)

| Option | Trust | Limits |
| --- | --- | --- |
| A. Central backend decides | Fully trusted party | **Rejected** by C-07 |
| B. Tasks the chain can check itself (for example make a transfer, create a token, hold a balance for N blocks) | Nobody | Fully trustless but only for on-chain tasks |
| C. Threshold of independent verifiers (M of N signatures needed) | Trust that fewer than M verifiers collude | Verifiers must be chosen, rewarded and replaceable; a fixed list is a central point |
| D. Peer voting | Votes of strangers | Easy to fake with many keys (Sybil) |
| E. Mix: B at first, C for approved off-chain task types | Limited | More work, clearer limits |

Proposal P-05: start with B; allow C only for specific task types with a published verifier list and public records of each approval.

## 5. Other rules to define (OPEN)

Per-user and per-task limits, task creation and who may list tasks, evidence format and storage (evidence should not go on the chain if it is personal), expiry, disputes and reversals, what happens to unspent Task Pool coins, and whether transfer fees go to the Task Pool (Q-05). A task budget that anyone can drain through fake keys has the same Sybil problem as claims (Q-11).
