SAECOIN — MINING REWARD SPECIFICATION

Version: 1.0
Project: SAECOIN App
Ticker: SAC (Provisional)
Status: Draft
Document Type: Reward Economics Specification

---

1. PURPOSE

This document defines the proposed virtual reward distribution system for SAECOIN App Mining.

It establishes the rules for:

- App Mining allocation.
- Daily reward budget.
- Regular mining rewards.
- Mining Power.
- Referral bonuses.
- Safety reserve.
- Reward calculations.
- Reward ledger processing.
- Reward pool accounting.
- Reward limits.
- Reward adjustments.
- Future distribution considerations.

The purpose is to create a transparent, auditable, and controlled reward system.

2. IMPORTANT DISTINCTION

SAECOIN App Mining is a virtual reward distribution system.

It is not Proof-of-Work blockchain mining.

The mobile application does not perform:

- CPU mining.
- GPU mining.
- Hash-based Proof-of-Work.
- Blockchain consensus.
- On-chain transaction validation.

The app records eligible mining activity and calculates virtual SAC rewards through the backend.

Virtual SAC rewards are not automatically cryptocurrency, transferable tokens, or on-chain assets.

3. APP MINING ALLOCATION

The proposed total App Mining allocation is:

5,000,000 SAC

This allocation is reserved for the SAECOIN App Mining reward program.

It is separate from:

- Future blockchain mining allocation.
- Future ecosystem allocation.
- Other future project allocations.

The backend must prevent the total amount of App Mining rewards from exceeding the approved allocation.

The allocation must be tracked independently from future blockchain balances.

4. PROVISIONAL DAILY REWARD BUDGET

The current proposed daily budget is:

Category| Daily Budget
Regular Mining Rewards| 4,500 SAC
Referral Bonus Rewards| 1,000 SAC
Safety Reserve| 500 SAC
Total| 6,000 SAC

These figures are provisional and require final approval before production launch.

4.1 Regular Mining Budget

The regular mining budget is reserved for eligible users who complete valid mining sessions.

Daily allocation:

"4,500 SAC"

4.2 Referral Bonus Budget

The referral bonus budget is reserved for eligible referral-related Mining Power rewards.

Daily allocation:

"1,000 SAC"

4.3 Safety Reserve

The safety reserve is intended to protect the reward system against unexpected accounting requirements and approved operational adjustments.

Daily allocation:

"500 SAC"

The safety reserve must not automatically become an additional user reward.

Its use requires an approved policy and an auditable backend operation.

5. ALLOCATION ACCOUNTING

The backend must maintain separate accounting for:

- Total App Mining allocation.
- Cumulative regular mining rewards.
- Cumulative referral bonuses.
- Remaining regular mining budget.
- Remaining referral budget.
- Safety reserve.
- Total distributed virtual rewards.
- Remaining App Mining allocation.

The system must never allocate more rewards than the approved limits.

A reward operation must check both:

1. The applicable daily category budget.
2. The remaining total App Mining allocation.

Both checks must occur within a protected transaction.

6. DAILY BUDGET RULES

The daily reward budget is controlled by the backend.

Current proposed limits:

- Regular Mining: 4,500 SAC per day.
- Referral Bonus: 1,000 SAC per day.
- Safety Reserve: 500 SAC per day.

Rules:

1. Each category must have its own budget accounting.
2. One category must not consume another category's budget without an approved policy change.
3. Unused daily budget does not automatically roll over.
4. Daily budget limits must be enforced server-side.
5. The project timezone and daily reset boundary must be finalized.
6. The backend must prevent concurrent processing from exceeding the daily budget.
7. All budget changes must be authorized and audited.

7. MINING SESSION REQUIREMENTS

The current App Mining session rules are:

- Each session lasts 8 hours.
- A user may activate a maximum of 3 sessions per project-defined day.
- Each session must be activated manually.
- A session remains active if the application is closed.
- A session is successful only after 8 hours and backend validation.
- Device time cannot determine session validity.
- Duplicate session activation must be prevented.

Only successfully validated sessions qualify for normal mining rewards.

8. MINING POWER

Mining Power is the measurement used to calculate a user's share of the regular mining reward budget.

The backend must maintain the authoritative Mining Power value.

Mining Power may be influenced by approved factors such as:

- Base Mining Power.
- Referral bonus.
- Other future approved bonuses.

Unapproved bonuses must not affect reward calculations.

8.1 Base Mining Power

Every eligible user must have a defined Base Mining Power.

The exact Base Mining Power value remains TBD.

The value must be finalized before production reward calculations are enabled.

8.2 Mining Power Snapshot

The backend must record a Mining Power snapshot for every eligible mining session.

The snapshot ensures that historical reward calculations remain reproducible.

Changes to a user's current Mining Power must not silently change previously recorded session values.

9. REGULAR MINING REWARD FORMULA

The proposed regular reward model uses proportional distribution.

The daily regular mining budget is distributed according to the eligible Mining Power recorded for successful sessions.

Let:

- "R" = Daily regular mining budget.
- "Pᵢ" = Eligible Mining Power of a user's successful session.
- "Pₜ" = Total eligible Mining Power for all successful sessions in the same reward accounting period.
- "Wᵢ" = User's regular reward share.

The proposed calculation is:

"Wᵢ = R × (Pᵢ / Pₜ)"

Where:

- "R" is limited to 4,500 SAC per day.
- "Pᵢ" is the user's eligible session Mining Power.
- "Pₜ" is the total eligible Mining Power for the same period.

9.1 Important Calculation Conditions

1. Only successfully validated sessions are included.
2. Failed or cancelled sessions are excluded.
3. Each successful session must be counted once.
4. Duplicate reward processing must be prevented.
5. The total regular reward distribution must not exceed the daily regular budget.
6. Exact SAC precision and rounding rules must be finalized.
7. All calculations must use deterministic numeric operations.

9.2 Reward Settlement

The proportional model requires a clearly defined accounting period.

The final implementation must specify:

- Which project-defined day receives a session's reward.
- When the daily eligible Mining Power total is finalized.
- When rewards become available in user balances.
- How late session completion is handled.
- How failed or delayed background processing is handled.

These settlement details remain open decisions until the reward implementation is approved.

10. REFERRAL REWARD SYSTEM

Referral rewards are based on Mining Power bonuses, not a fixed direct SAC payment for each referral.

Current referral rules:

1. A referrer may have up to 10 accepted referrals.
2. A referred user must complete 21 successful mining sessions to become valid.
3. Once the referred user becomes valid, both parties may qualify for referral Mining Power bonuses.
4. Each participant must independently be actively mining for their own bonus to apply.
5. An inactive participant does not receive a banked or deferred bonus.
6. One participant's eligibility does not depend on the other participant being active.

10.1 Referral Bonus Percentage

The referral bonus percentage is TBD.

A 5% bonus has been discussed as a possible proposal but has not been approved.

It must not be treated as a final protocol rule.

The final percentage must be approved before implementation.

10.2 Referral Bonus Calculation

The proposed model is:

"Referral Bonus Mining Power = Base Mining Power × Approved Referral Bonus Percentage"

"Total Mining Power = Base Mining Power + Eligible Referral Bonus Mining Power"

The exact formula must be finalized in accordance with the approved referral policy.

10.3 Independent Eligibility

The backend must evaluate each participant separately.

Example:

- Referrer has an active successful mining session.
- Referred user is not mining.

Result:

- The referrer may receive their eligible referral Mining Power bonus.
- The referred user receives no referral bonus for that inactive session.
- No inactive bonus is stored for later use.

The reverse situation must follow the same rule.

11. REFERRAL BUDGET CONTROL

The daily referral bonus budget is:

"1,000 SAC"

The backend must:

- Track referral reward usage separately.
- Prevent the referral budget from being exceeded.
- Apply the approved referral formula.
- Prevent duplicate referral bonuses.
- Record each beneficiary independently.
- Preserve the related referral and session references.

If eligible referral rewards exceed the available referral budget, the backend must follow an approved distribution or limiting policy.

The exact handling of excess demand is an open decision.

The system must not silently exceed the referral budget.

12. MINING POWER AND REWARD CALCULATION EXAMPLE

The following example is illustrative only.

Assume:

- Daily regular budget: 4,500 SAC.
- User A eligible Mining Power: 10.
- User B eligible Mining Power: 20.
- User C eligible Mining Power: 30.
- Total eligible Mining Power: 60.

The proportional shares would be:

User| Mining Power| Share| Illustrative Reward
User A| 10| 16.67%| 750 SAC
User B| 20| 33.33%| 1,500 SAC
User C| 30| 50%| 2,250 SAC
Total| 60| 100%| 4,500 SAC

This example demonstrates the proposed proportional model.

It does not establish the final Base Mining Power or guarantee any particular reward amount.

13. SAC PRECISION AND ROUNDING

Reward accounting must use deterministic numeric calculations.

Floating-point arithmetic must not be used for authoritative reward balances.

The final implementation must define:

- SAC decimal precision.
- Smallest accounting unit.
- Rounding mode.
- Residual allocation policy.
- Maximum supported amount.

The rounding method must ensure that the sum of distributed rewards never exceeds the applicable budget.

14. REWARD LEDGER

Every accepted reward must create an auditable ledger entry.

Supported transaction types:

- "MINING_REWARD"
- "REFERRAL_BONUS"
- "REWARD_ADJUSTMENT"
- "REWARD_REVERSAL"
- "ACCOUNT_CANCELLATION_RETURN"

Each record must contain:

- Unique transaction ID.
- User ID.
- Transaction type.
- Exact SAC amount.
- Related session ID, if applicable.
- Related referral ID, if applicable.
- Processing reference.
- Creation timestamp.

Ledger entries must not be silently modified or deleted.

Corrections must use separate adjustment or reversal transactions.

15. VIRTUAL REWARD BALANCE

The app may display a user's accumulated virtual SAC reward balance.

This balance:

- Is maintained by the backend.
- Must be supported by ledger records.
- Is not an on-chain balance.
- Is not proof of cryptocurrency ownership.
- Does not guarantee market value.
- Cannot be treated as a confirmed withdrawal balance.

A cached balance may be used for performance, but the ledger remains authoritative.

16. MAIN REWARD POOL

The Main Reward Pool represents the remaining unallocated App Mining reward reserve.

The proposed initial allocation is:

"5,000,000 SAC"

The backend must track:

- Initial allocation.
- Total regular rewards.
- Total referral rewards.
- Approved adjustments.
- Returned virtual rewards.
- Remaining allocation.

The Main Reward Pool must not be confused with a blockchain wallet or on-chain treasury.

17. ACCOUNT CANCELLATION AND REWARD RETURN

The current proposed inactivity policy may cancel an account after 90 consecutive 8-hour session windows without activating a mining session.

This represents 720 hours or 30 continuous days.

The exact inactivity time anchor remains subject to final approval.

Under the current proposed policy:

- The account loses normal login access.
- Mining eligibility is revoked.
- Applicable referral eligibility is revoked.
- Unused virtual reward balances return to the Main Reward Pool.
- Historical reward records are preserved.

Any returned reward must be recorded using an auditable "ACCOUNT_CANCELLATION_RETURN" ledger entry.

The backend must not silently delete or erase the original reward history.

18. SAFETY RESERVE POLICY

The proposed daily safety reserve is:

"500 SAC"

The reserve is not automatically distributed.

Potential approved uses may include:

- Accounting corrections.
- Authorized reward adjustments.
- Approved operational contingencies.

Every reserve usage must:

1. Have an approved reason.
2. Be authorized.
3. Be recorded in the reward ledger or reserve accounting.
4. Create an audit record.
5. Remain within the total App Mining allocation.

The final reserve policy must be approved separately.

19. REWARD PROCESSING WORKFLOW

The backend must follow this general workflow:

MINING SESSION COMPLETED
          │
          ▼
SESSION VALIDATION
          │
          ▼
ACCOUNT ELIGIBILITY CHECK
          │
          ▼
MINING POWER SNAPSHOT CHECK
          │
          ▼
DAILY BUDGET CHECK
          │
          ▼
REGULAR REWARD CALCULATION
          │
          ▼
REFERRAL ELIGIBILITY CHECK
          │
          ▼
REFERRAL REWARD CALCULATION
          │
          ▼
ALLOCATION LIMIT CHECK
          │
          ▼
LEDGER TRANSACTION
          │
          ▼
VIRTUAL BALANCE UPDATE
          │
          ▼
PROCESSING COMPLETED

The operation must be transaction-safe and protected against duplicate execution.

20. REWARD SECURITY RULES

Mandatory requirements:

- Only the backend may calculate authoritative rewards.
- Users cannot modify their Mining Power.
- Users cannot create ledger entries.
- Users cannot modify daily budgets.
- Users cannot approve their own adjustments.
- Duplicate session rewards must be prevented.
- Duplicate referral bonuses must be prevented.
- Budget limits must be enforced transactionally.
- All administrative adjustments must be audited.
- Reward processing must be reproducible.

21. REWARD HISTORY AND TRANSPARENCY

Users should be able to view:

- Total virtual SAC balance.
- Regular mining rewards.
- Referral bonuses.
- Reward adjustments.
- Reward reversals.
- Mining session history.
- Relevant reward processing status.

The application must clearly distinguish pending, approved, and reversed rewards where applicable.

22. TESTING REQUIREMENTS

The reward system must include automated tests for:

- Daily budget limits.
- Total allocation limits.
- Proportional reward calculation.
- Mining Power snapshots.
- Referral bonus eligibility.
- Independent referral activity.
- Duplicate reward processing.
- Rounding behavior.
- Reward ledger integrity.
- Reward reversals.
- Account cancellation returns.
- Concurrent reward processing.
- Background job retries.
- Daily budget reset behavior.

Tests must use deterministic input data and expected outputs.

23. OPEN DECISIONS

The following items require approval before production implementation:

1. Base Mining Power.
2. Referral bonus percentage.
3. Final referral Mining Power formula.
4. Exact reward accounting period.
5. Daily reward settlement time.
6. Project timezone.
7. Daily budget reset boundary.
8. SAC decimal precision.
9. Rounding and residual allocation method.
10. Excess referral budget handling.
11. Safety reserve usage policy.
12. Exact inactivity time anchor.
13. Reward adjustment approval process.
14. Final virtual reward distribution policy.

No unresolved item should be silently converted into a final production rule.

24. FINAL REWARD POLICY

The SAECOIN App Mining reward system must remain controlled, transparent, and auditable.

The proposed App Mining allocation is 5,000,000 SAC.

The proposed daily budget is 6,000 SAC, divided into regular mining rewards, referral bonuses, and a safety reserve.

The backend must enforce all reward limits and preserve a complete accounting history.

All reward formulas and unresolved parameters must be approved before production launch.

Virtual App Mining rewards must remain clearly distinguished from future on-chain SAC.

---

END OF DOCUMENT
