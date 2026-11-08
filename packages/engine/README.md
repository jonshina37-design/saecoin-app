# @saecoin/engine

Pure reward engine for SAECOIN (spec v1.2, `docs/00-Spec-v1.2-Decision-Record.md` sections 4 and 6).
No I/O, no database, no floats: all amounts are `bigint` units of 10^-8 SAC.

- `pool.ts`: per-user amount, paid and leftover for the regular and referral pools
- `referral.ts`: which users are eligible for the referral bonus
- `session.ts`: turns one session's participants into ledger transfers (rewards and leftovers to TASK_POOL)

Run the tests: `npm install && npm test` (inside this folder). The tests include the worked examples of section 4.5.
