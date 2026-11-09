# SAECOIN Reward Claim Specification (Regular Session Mining)

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

Regular Session Mining is **not** PoW mining. It is a scheduled, session-based reward from the Regular Mining Reward Pool (17,000,000 SAC). Block production is a separate job done by PoW miners.

## 1. Flow (CONFIRMED, C-06)

1. The user starts a session in the app.
2. The user completes the defined session.
3. The user claims the reward.
4. A claim transaction is created and signed by the user's key.
5. The network validates it by the consensus rules.
6. A valid claim is included in a block.
7. The reward is paid from the Regular Mining Reward Pool.
8. The same session reward cannot be claimed twice.

## 2. Claim transaction (PROPOSED, P-04)

| Field | Purpose |
| --- | --- |
| Claimant public key and signature | Only the user can create their claim |
| Session identifier | What is being claimed |
| Gross amount | Must equal the amount the rules allow |
| Producer fee | Deducted by rule (see below) |
| Destination | Claimant's own address |
| Eligibility evidence | **Open** (Q-11): what proves the claimant may claim |

## 3. Validation rules (PROPOSED)

1. Signature valid for the claimant key.
2. The session ID has not been claimed before. Nodes keep a consensus-tracked set of claimed sessions (P-04).
3. The amount is exactly what the rules allow for that session.
4. The Regular Pool balance is enough. A claim never creates SAC.
5. Fee is deducted from the gross amount and paid to the producer of the block.
6. A producer cannot change the amount, destination or claimant (the signature covers them).
7. Reorganization: if the block is replaced, the claim returns to pending and the claimed-session record is undone with it.

## 4. Fee example (illustration only, C-09)

| | SAC | Units |
| --- | --- | --- |
| Gross reward | 10.00 | 1,000,000,000 |
| Illustrative fee | 0.10 | 10,000,000 |
| User net | 9.90 | 990,000,000 |

0.10 SAC is not a decided fee (Q-05). If the fee were a percentage, a rounding rule would also be needed.

## 5. What a chain cannot verify (OPEN)

- **That a session happened.** The chain cannot see the phone. A session is a claim made by the app. Anyone can run a modified client or a script.
- **That a person is unique, adult or in an allowed country.** v1.2 used phone OTP, 18+ and one account per number through a central backend (D-08, D-09). A chain has none of this.
- **Result:** without an answer to Q-11, an attacker can create many keys and claim until the pool is empty. Options to study, none approved: (a) a set of independent attestors whose threshold signatures are required, which brings back trust in the attestors; (b) a rate limit by time per key, which does not stop many keys; (c) a cost or proof of personhood, which is unsolved without a central party; (d) fewer rewards, only for activity the chain itself can verify.

## 6. OPEN points

Amount per claim, session length and schedule, pool lifetime (Q-12); fee amount and rounding (Q-05); confirmations before payout (Q-07).
