# Proof of Work Research

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

**Nothing is decided (Q-01, Q-02).** This page frames the choice. No benchmark or test was run. Points about other networks are general, widely known properties and should be re-checked with current sources before a decision.

## 1. Requirements from the owner (C-08)

PoW; full nodes validate; most cumulative work wins; difficulty adjustment; CPU and GPU mining support to be decided by research; Bitcoin-like security principles; and the reward system stays separate.

## 2. Candidate algorithms to compare

| Candidate | Hardware | Notes | Concern |
| --- | --- | --- | --- |
| SHA-256d | ASICs dominate | Simple, long studied, cheap to verify, light for phones as verifiers | A new SHA-256d chain competes with a huge existing ASIC base, so hash power can be rented cheaply to attack it |
| Scrypt | ASICs exist | Memory-hard in design, easier to verify than to mine | ASICs exist, so the "ordinary computer" aim is not met |
| RandomX-style (CPU-oriented) | CPUs | Designed to resist ASICs and favor general CPUs | Needs much memory for fast mining; heavier verification; phone suitability unclear |
| Other memory-hard functions | Varies | Possible | Less field experience; risk of unknown shortcuts |

Evaluation criteria: attack cost, ASIC and GPU outlook, verification cost on a phone, maturity of reference code, licence, and ease of independent implementations.

## 3. CPU and GPU support (research item)

Whether ordinary CPUs and GPUs should be able to mine profitably depends on the algorithm. Even then, electricity and hash power from large operators may dominate. The owner's goal of a lightweight chain for ordinary computers and the goal of strong security can pull in different directions.

## 4. Block time (Q-02)

Shorter blocks mean faster confirmation but more orphaned blocks and more data for phones. Longer blocks mean slower use. No value is chosen. The founder unlock schedule depends on it if heights are used (Q-13).

## 5. Bootstrap and security (Q-14, Q-15)

- A new PoW chain starts with almost no hash power. A well-funded attacker can rewrite history until the chain grows.
- There is no block subsidy, so early miners earn only fees, which may be tiny. Who mines first is not explained by the tokenomics.
- Merge-mining with an existing PoW chain (P-08) lends security from an existing chain but only for algorithm-compatible designs and only if that chain's miners choose to take part. A study item, not a plan.
- Honest statement for users: until hash power is large, confirmations are weaker than the headline PoW idea implies.

## 6. Mining by phones (OPEN)

Phones add little hash power and cost battery and heat. The optional mining mode in the wallet (C-10) needs a decision on whether it exists at all, and its warnings.

## 7. Result

No recommendation is final. The study should end with a table of measured results on test hardware, an attack-cost estimate, and an owner decision.
