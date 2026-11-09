# SAECOIN Transaction Fee Specification

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

## 1. Principles (CONFIRMED where stated)

- A fee never creates SAC (C-03, C-09).
- Fees are set by protocol rules. No backend or admin can change a fee (C-01).
- A fee change requires a protocol rule change with a public process (Q-19).
- Block producers receive the fee for block production (owner direction).

## 2. Fee types

| Fee | Who pays | Who receives | Amount | Label |
| --- | --- | --- | --- | --- |
| Reward claim fee | Deducted from the gross claim | Producer of the block with the claim | Illustration: 0.10 of 10 SAC | Rule CONFIRMED, amount OPEN |
| Transfer fee | The sender | Producer, or Task Pool | OPEN | OPEN (Q-05). Earlier ideas sent transfer fees to the Task Pool; the latest direction says producers are paid for block production |
| Token creation fee | The creator | OPEN | OPEN | OPEN (Q-09) |
| Task claim fee | OPEN | OPEN | OPEN | OPEN |

## 3. Why fees matter for security (information)

With no block subsidy, fees are the only payment for producers. Illustration: if every coin of the Regular Pool were claimed with a 1 % fee, claim fees would total at most 170,000 SAC (1 % of 17,000,000) over the whole life of the pool. This is arithmetic on an illustrative rate, not a forecast. After the pool is used, only transfer and token fees remain (Q-14). Too low, and miners may leave and the chain becomes weak. Too high, and users avoid the app.

## 4. Spam and dust (PROPOSED)

A minimum fee per transaction and a minimum output size, both defined by the protocol, to stop cheap spam. Values OPEN.

## 5. Fee formula (OPEN, Q-05)

Options to study: a fixed amount per transaction type; an amount by data size; or a percentage with a floor and a ceiling. A percentage needs a rounding rule on 8-decimal integers. Not decided.

## 6. Transparency (CONFIRMED, C-12)

The explorer shows every transaction fee and every block producer fee.
