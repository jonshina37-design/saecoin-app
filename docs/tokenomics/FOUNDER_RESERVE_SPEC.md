# SAECOIN Founder Reserve Specification

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

> **Founder Release stays blocked.** Per v1.2 D-18 the full schedule and edge cases need the owner's approval before anything is built. This page records the confirmed headline rules and lists the edge cases as OPEN. It contains options, not decisions.

## 1. Confirmed rules (C-05)

| Rule | Value |
| --- | --- |
| Allocation | 12,000,000 SAC |
| Owner | The founder's personal wallet |
| Lock | Fully locked for the first year from Genesis |
| Release | After one year, 1,000,000 SAC unlock each month |
| Duration | 12 months of release; the whole reserve is unlocked at the end |
| Enforcement | By protocol rules, not by a person or a server |
| Control | Ownership gives no governance, consensus or network control |

## 2. Proposed design (P-02)

At Genesis, create 12 separate outputs of 1,000,000 SAC each, each spendable only by the founder's key and only after its own absolute time lock. Locked coins cannot be sent. No key, admin or vote can shorten a lock. Nodes verify the locks themselves.

| Tranche | Unlock | SAC |
| --- | --- | --- |
| 1 | Genesis + lock end (reading A: month 12; reading B: month 13) | 1,000,000 |
| 2 to 12 | One month after the previous | 1,000,000 each |
| Total | | 12,000,000 |

## 3. OPEN edge cases (Q-13)

1. **First unlock:** exactly when the year completes (month 12), or one month after (month 13)? Under reading A the last tranche unlocks at month 23, under B at month 24.
2. **Definition of a month:** 30 days, calendar month, or a fixed number of blocks.
3. **Time basis:** block height or median time past. Block-height locks depend on the real average block time (Q-02) and drift if hash power changes. Time-based locks depend on block timestamps, which miners can move a little.
4. **Founder key loss:** the tranche is lost forever. No recovery exists in a founderless design. A multi-signature or backup scheme is a founder decision.
5. **Founder key theft after unlock:** nothing the protocol can do.
6. **Partial sends and consolidation** of unlocked tranches.
7. **Reorganization** around a tranche boundary.
8. **Public reporting** of unlock history in the explorer (CONFIRMED need, C-12).
9. **Genesis timestamp** value (GENESIS_SPEC).

## 4. Tests that must exist before approval (PROPOSED)

The v1.2 repository already has a blocked test plan (FR-01 to FR-19) for the centralized implementation: `docs/founder-release-test-plan.md` in the working copy of the `audit-and-branding` branch (not yet pushed). A chain version would need equivalent tests: locked coins unspendable, unlock at the exact boundary, no early or double unlock, total always 12,000,000, behavior during reorganization.
