# SAECOIN Attack Analysis

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

How each major attack would work, what the current direction offers against it, and what is unresolved. Analysis only: no simulation or test has been run.

## 1. Hash power attack (T1)

A new PoW chain has little hash power. Rented power can be bought for hours at a cost that grows with the chain's work. The attacker mines a hidden branch, spends coins on the public chain, then publishes the longer branch. Defenses: more hash power over time, more confirmations for large amounts, a chosen algorithm that is hard to rent (Q-01), merge-mining study (P-08). No checkpoints are proposed because they bring central control. **Unresolved while the chain is small.**

## 2. Reward farming (T2, T3)

An attacker creates thousands of keys and claims every session reward, using scripts. The chain checks signatures and uniqueness of a session per key, so each key is valid. Nothing in PoW stops this. The v1.2 phone-number check was in a central backend. Options (REWARD_CLAIM_SPEC section 5) all cost something: attestors bring trust back, limits per key do not stop many keys, proof of personhood is unsolved. **Unresolved.** A reward pool without an answer is open to emptying.

## 3. Task fraud (T4)

Fake evidence for off-chain tasks. See TASK_REWARD_SPEC. On-chain-checkable tasks only avoid it. **Unresolved for off-chain tasks.**

## 4. Eclipse and partition (T5)

An attacker controls a victim's peers and feeds it a private chain. Mitigation: diverse peers, persistent peers, several seed operators. A phone on mobile data with few peers is the most exposed.

## 5. Double spend and replay (T7)

Wait for confirmations (number OPEN). Bind signatures to this chain and to unique inputs or counters.

## 6. Time attacks (T6)

Miners can nudge timestamps. Bounded by median rule and future limit. Affects difficulty and any time-based lock (founder tranches). A block-height lock avoids timestamp games but drifts with block time.

## 7. Software supply chain (T10)

A forked or compromised app build can steal keys or change rules for its users. Mitigation: open source, reproducible builds, multiple signers, store listing checks (Q-20).

## 8. Network failure and backend failure

If the optional backend stops, the chain continues because nodes validate and miners mine. If most nodes go offline, phones with light nodes lose their view of the network. If hash power leaves, blocks slow down and difficulty must recover (Q-03).

## 9. Summary

| Attack | Defense strength today |
| --- | --- |
| Hash power | Weak, depends on growth |
| Reward farming | None defined |
| Task fraud | None for off-chain tasks |
| Eclipse | Moderate on paper |
| Double spend, replay | Standard measures, unproven here |
| Software trust | Open |
