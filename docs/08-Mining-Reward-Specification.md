> **v1.2 NOTICE (draft):** This document belongs to the v1.1 set. Specification v1.2 ([00-Spec-v1.2-Decision-Record.md](00-Spec-v1.2-Decision-Record.md)) changes tokenomics, reward calculation, referral rules and other items. Where the two conflict, the v1.2 record prevails once approved.

SAECOIN — MINING & REWARD SPECIFICATION

Version: 1.1
Project: SAECOIN App
Ticker: SAC (Provisional)
Mining Type: Virtual Mining Reward Distribution
Total Supply: 31,000,000 SAC
Effective Sessions: 2,160
Status: Draft — Updated for Approved Requirements

---

1. PURPOSE

This document defines the mining session and reward distribution rules for the SAECOIN application.

SAECOIN App uses a virtual mining reward distribution system.

It does not perform actual Proof-of-Work mining.

The mobile application does not use CPU or GPU resources to mine cryptocurrency.

All session validation, reward calculation, eligibility checks and reward credits are controlled by the backend.

This specification defines:

- Mining session schedule.
- Session activation.
- Session validation.
- Effective session counting.
- Regular Mining Reward.
- Referral Bonus.
- Reward allocation.
- Fixed supply protection.
- Reward calculation requirements.
- Duplicate prevention.
- Reward processing failures.
- Ledger integration.
- Reconciliation and audit requirements.

2. MINING MODEL

SAECOIN uses a centralized virtual mining model.

Users activate a scheduled mining session through the mobile application.

After the scheduled session ends, the backend validates eligible activations and processes the applicable rewards.

The backend is the sole authority for:

- Session eligibility.
- Successful session confirmation.
- Reward calculation.
- Referral eligibility.
- Reward allocation.
- Balance updates.
- Ledger transactions.

The mobile application only requests activation and displays backend-confirmed results.

3. FIXED TOKENOMICS

3.1 Total Supply

The total SAECOIN supply is fixed at:

31,000,000 SAC

The approved allocation is:

Allocation| Amount
Regular Mining| 12,960,000 SAC
Referral Bonus| 4,320,000 SAC
Initial App Reserve| 1,000,000 SAC
Unused App Mining Allocation transferred to App Reserve| 720,000 SAC
Total App Reserve| 1,720,000 SAC
Founder/Personal Reserve| 12,000,000 SAC
Node Mining| 0 SAC
Total Supply| 31,000,000 SAC

3.2 App Mining Distribution

The total App Mining Distribution is:

17,280,000 SAC

It consists of:

- Regular Mining: 12,960,000 SAC.
- Referral Bonus: 4,320,000 SAC.

The App Reserve and Founder/Personal Reserve are separate allocations.

The Founder/Personal Reserve must not be treated as part of the App Reserve.

3.3 Node Mining

Node Mining allocation is zero in the current application.

No node mining reward may be created under this specification.

4. MINING SESSION SCHEDULE

4.1 Daily Schedule

The backend must maintain three fixed eight-hour UTC sessions every day.

Session| Start UTC| End UTC
Session 1| 04:00| 12:00
Session 2| 12:00| 20:00
Session 3| 20:00| 04:00 next day

The backend clock is authoritative.

The mobile device's local clock must not determine session eligibility.

4.2 Activation Window

A user may activate a session at any time within its complete eight-hour scheduled window.

Examples:

- Activation at 04:01 is accepted if all conditions pass.
- Activation at 08:30 is accepted if all conditions pass.
- Activation at 11:59 is accepted if all conditions pass.
- Activation after the session closes is rejected.

An accepted activation counts for the full scheduled session.

The backend must not calculate a reduced session duration based on activation time.

4.3 Activation Rules

The backend must:

1. Authenticate the user.
2. Identify the current scheduled session.
3. Verify the activation window.
4. Check account status.
5. Check duplicate activation.
6. Save the activation record.
7. Return the activation result.

Rules:

- One activation per user per scheduled session.
- A missed session cannot be activated retrospectively.
- Duplicate requests must not create duplicate activations.
- Activation alone does not guarantee a successful session.
- Only backend-accepted activation records are eligible for session validation.

5. EFFECTIVE SESSION PROGRAM

The application has a total of:

2,160 effective sessions

At three scheduled sessions per day, this represents 720 effective operating days.

The total session count is a network-wide program requirement, not an individual guaranteed reward count.

5.1 Effective Session Counting

The backend must maintain a unique effective session number.

Every effective session must have:

- Unique Session ID.
- Unique Session Number.
- Scheduled Start Time UTC.
- Scheduled End Time UTC.
- Processing Status.
- Completion Record.

5.2 Backend Downtime

If the backend mining system is unavailable:

- Effective session progression pauses.
- The affected session must not be silently skipped.
- Incomplete processing must remain traceable.
- Processing resumes from the correct state after recovery.

The system must not create extra effective sessions because of retry attempts.

5.3 Session Completion

A session becomes successful only after:

1. The scheduled slot ends.
2. The backend retrieves accepted activations.
3. The backend validates eligibility.
4. The result is saved.
5. The session processing is completed.

App closure, device shutdown or internet disconnection after an accepted activation must not automatically cancel that activation.

6. NETWORK-WIDE REWARD POOLS

Each effective session has two separate network-wide reward pools.

Reward Type| Per Session
Regular Mining| 6,000 SAC
Referral Bonus| 2,000 SAC
Total| 8,000 SAC

These amounts are network-wide maximum distribution pools for each effective session.

They are not fixed individual rewards.

The amount received by an individual user depends on the approved eligibility and allocation rules.

6.1 Total Distribution Calculation

Across 2,160 effective sessions:

Reward Type| Per Session| Total
Regular Mining| 6,000 SAC| 12,960,000 SAC
Referral Bonus| 2,000 SAC| 4,320,000 SAC
Total| 8,000 SAC| 17,280,000 SAC

The backend must never exceed these approved allocations.

6.2 Unused Session Pool

If a session pool is not fully distributed:

- The unused amount must not be automatically redistributed to another reward category.
- The unused amount must remain accounted for.
- Final treatment must follow the approved allocation and reserve policy.

Unused App Mining allocation transferred to App Reserve is limited to the approved 720,000 SAC allocation.

The backend must not independently invent additional supply or reserve allocations.

7. REGULAR MINING REWARD

7.1 Eligibility

A user may receive Regular Mining Reward when:

- The account is eligible under the approved account rules.
- The user has an accepted activation for the session.
- The session is successfully validated.
- No duplicate reward exists.
- Sufficient Regular Mining allocation remains.

Regular Mining Reward is available during the first 21 successful sessions.

It continues during the 21-session validity rebuild after a successful referral group change.

7.2 First 21 Successful Sessions

A new user must complete 21 successful sessions to become VALID.

During these first 21 successful sessions:

- Regular Mining Reward is paid according to the approved allocation formula.
- Referral Bonus is not available.
- Failed sessions do not increase the successful session count.
- Activation alone does not increase the successful session count.

After the 21st successful session is validated, the backend may change the account status to VALID.

7.3 After Validity

After becoming VALID, the user remains eligible for Regular Mining Reward for successful sessions, subject to the normal account, session and budget rules.

7.4 Rebuild After Referral Group Change

After a successful referral group change:

- Validity progress resets.
- Account status returns to pending validity.
- Regular Mining Reward continues.
- Referral Bonus is disabled until validity is regained.
- Existing balance is unchanged.

The user must complete another 21 successful sessions to become VALID.

8. REFERRAL BONUS

8.1 Referral Pool

The Referral Bonus pool is:

2,000 SAC per effective session network-wide.

The total Referral Bonus allocation is:

4,320,000 SAC.

8.2 Eligibility Requirements

A user must:

- Have a VALID account.
- Successfully activate the applicable session.
- Complete the session successfully.
- Belong to an eligible referral group.
- Pass backend referral validation.

A referrer must:

- Be active in the same session.
- Have at least three active direct referrals in that same session.

8.3 Eligible Group

When a referrer qualifies:

- The referrer participates.
- All active direct referrals participate.
- Every participating user must independently satisfy applicable account and session eligibility.
- The backend calculates the eligible group before distributing the referral pool.

If a parent referral group is not eligible, a child group may still qualify independently.

8.4 Duplicate Participation Prevention

One unique user may receive at most one Referral Bonus share per session.

The backend must prevent a user from receiving multiple shares because of overlapping referral-group calculations.

8.5 Group Change Effect

After a successful referral group change:

- The new relationship becomes effective from the next new session.
- The old relationship remains applicable to the currently active session.
- Referral Bonus remains disabled while the user rebuilds 21 successful sessions.
- Referral eligibility is restored only after the user becomes VALID again.

8.6 Referral Formula

The exact individual Referral Bonus allocation formula must be finalized in the Referral Specification and implemented consistently by the backend.

The formula must:

- Use only eligible participants.
- Respect the 2,000 SAC network-wide session pool.
- Prevent duplicate user shares.
- Use deterministic calculations.
- Prevent distribution above the referral allocation.
- Record the calculation version and eligible participant set.

No individual referral amount is guaranteed by this document.

9. ACCOUNT VALIDITY AND INACTIVITY

9.1 Initial Validity

A new account begins with pending validity.

The backend tracks successful sessions.

After 21 successful sessions, the account becomes VALID.

Only successful sessions count.

9.2 Inactivity Rule

After becoming VALID, the user must complete at least one successful session within every rolling window of 90 scheduled session slots.

A successful session resets the inactivity counter.

Activation alone does not reset it.

If no successful session occurs within the next 90 scheduled slots:

- Account status becomes CANCELLED.
- Cancellation is permanent.
- Future activation is blocked.
- Future reward eligibility is removed.
- Remaining balance is forfeited to App Reserve according to the approved rules.

The inactivity rule applies only to VALID users.

The 21-session rebuild after a group change is exempt until validity is regained.

10. REWARD CALCULATION REQUIREMENTS

10.1 Deterministic Calculation

All reward calculations must be deterministic.

The same validated inputs and calculation version must produce the same results.

The backend must record:

- Session ID.
- Reward pool.
- Eligible participant set or protected reference to it.
- Calculation version.
- Individual calculated amounts.
- Rounding result.
- Remaining pool.
- Processing timestamp.

10.2 Exact Numeric Representation

SAC amounts must not use floating-point arithmetic.

The implementation must use an exact representation, such as integer smallest units or an approved fixed-precision decimal representation.

The smallest supported SAC unit must be finalized before production.

10.3 Rounding

The final implementation must define:

- Calculation precision.
- Rounding method.
- Remainder treatment.
- Deterministic tie-breaking.
- Handling of amounts smaller than the smallest supported SAC unit.

If a largest-remainder method is selected, ties must be resolved using a stable, documented identifier so that the result is reproducible.

The same calculation version must not produce different results when retried.

10.4 Allocation Formula Approval

The individual Regular Mining allocation formula and exact Referral Bonus allocation formula must be approved before production.

Until then:

- The network-wide pools remain fixed.
- Individual reward amounts must not be treated as finalized.
- The backend must not invent or silently change a formula.
- Formula changes must be versioned and documented.

11. REWARD PROCESSING FLOW

Scheduled Session Ends
          |
          v
Backend Retrieves Activations
          |
          v
Validate User Eligibility
          |
          v
Validate Session Results
          |
          v
Determine Regular Mining Participants
          |
          v
Determine Referral Bonus Participants
          |
          v
Calculate Reward Allocations
          |
          v
Check Remaining Budgets
          |
          v
Create Reward Records
          |
          v
Create Ledger Transactions
          |
          v
Update Balance Summaries
          |
          v
Confirm Reward Credits
          |
          v
Publish Public Ledger Records

All financial operations must be handled through atomic or safely recoverable backend transactions.

12. REWARD CREDIT TIMING

Under normal operating conditions, reward credit should complete within five minutes after the scheduled session ends.

The backend must not mark a reward as credited before the ledger transaction and balance update are successfully completed.

If processing cannot complete:

- Mark the operation as pending or retryable.
- Preserve the calculation and processing references.
- Retry safely.
- Prevent duplicate credits.
- Reconcile the result.
- Alert Admin when manual review is necessary.

13. DUPLICATE PREVENTION

The backend must prevent:

- Duplicate session activation.
- Duplicate successful session results.
- Duplicate Regular Mining Reward.
- Duplicate Referral Bonus.
- Duplicate ledger transactions.
- Duplicate balance updates.
- Duplicate public ledger records.

Each operation must use unique identifiers and suitable database constraints.

Repeated API requests must return the existing operation result where appropriate instead of creating a second reward.

14. REWARD BUDGET PROTECTION

The backend must enforce the following hard limits:

Budget| Maximum
Regular Mining| 12,960,000 SAC
Referral Bonus| 4,320,000 SAC
Total App Mining Distribution| 17,280,000 SAC
Total SAECOIN Supply| 31,000,000 SAC

Before confirming any reward:

1. Check the applicable remaining allocation.
2. Check the session pool.
3. Check the user's eligibility.
4. Check for duplicate reward records.
5. Validate the calculated amount.
6. Verify that the operation will not exceed any budget.

If a calculation exceeds an approved limit, the backend must reject it and create an operational alert.

The system must never create additional SAC to cover a calculation error.

15. APP RESERVE ACCOUNTING

The App Reserve allocation is:

1,720,000 SAC

It consists of:

- Initial App Reserve: 1,000,000 SAC.
- Unused App Mining allocation transferred to App Reserve: 720,000 SAC.

The App Reserve is separate from the Founder/Personal Reserve.

The backend must record reserve-related accounting operations.

The exact App Reserve distribution and usage policy remains subject to separate approval.

Cancelled-user balance forfeiture must be accounted for according to the approved reserve policy.

No reserve operation may increase total supply beyond 31,000,000 SAC.

16. LEDGER INTEGRATION

Every confirmed reward must create a corresponding ledger transaction.

A reward transaction must contain:

- Unique Transaction ID.
- User ID.
- Session ID.
- Reward ID.
- Reward Type.
- Amount in SAC.
- Transaction Purpose.
- Timestamp UTC.
- Transaction Status.

The ledger must preserve the original record.

A correction must create a new approved transaction referencing the original entry.

Existing confirmed reward records must not be silently deleted or overwritten.

17. PUBLIC LEDGER PUBLICATION

After session validation and reward processing:

1. The backend prepares public transaction records.
2. The Public Ledger Publisher creates a block.
3. The block is hashed.
4. The block is linked to the previous block.
5. The backend signing key signs the block.
6. The block is published to the Explorer.

If publication fails:

- Keep the block in PENDING status.
- Retry safely.
- Prevent duplicate publication.
- Record every attempt.
- Alert Main Admin if failure continues.

The public ledger is app-operated, not decentralized.

18. FAILURE AND RECOVERY

18.1 Reward Processing Failure

If reward processing fails:

- Preserve the session result.
- Preserve the calculated reward data.
- Do not create an unverified balance update.
- Mark the operation pending or failed as appropriate.
- Retry using the same operation identity.
- Reconcile the final result.

18.2 Database Failure

If a database failure occurs during reward credit:

- Do not leave an inconsistent partial transaction.
- Use database transaction rollback where possible.
- Reconcile after database recovery.
- Prevent duplicate credit during retry.

18.3 Backend Downtime

During backend mining downtime:

- Effective session progression pauses.
- Incomplete session operations remain pending.
- No unvalidated reward is credited.
- Processing resumes from the last verified state.

18.4 Administrative Recovery

If recovery requires manual review:

1. Backend prepares the recovery request.
2. Backend validates relevant User ID, Session ID and Reward ID.
3. Admin reviews the evidence.
4. Main Admin approves or rejects.
5. Backend executes only an approved action.
6. Audit Log records the decision and result.

19. REWARD CORRECTIONS

A reward correction must not modify an existing confirmed ledger entry directly.

The correction process must:

1. Create a correction request.
2. Identify the User ID.
3. Identify the Session ID.
4. Identify the Reward ID.
5. Reference the original transaction.
6. Validate the proposed amount.
7. Include the correction reason.
8. Receive Main Admin approval.
9. Create a new correction transaction.
10. Update the verified balance.
11. Record the action in the Audit Log.

The original transaction remains visible in historical records.

20. TESTING REQUIREMENTS

The reward system must include tests for:

- Session activation boundaries.
- Duplicate activation.
- Missed session activation.
- Successful session validation.
- Failed session validation.
- First 21 successful sessions.
- Transition to VALID.
- Referral Bonus eligibility.
- Three-active-direct-referral requirement.
- Maximum 10 direct referrals.
- Referral group change.
- 90-slot inactivity.
- Permanent cancellation.
- Reward pool exhaustion.
- Allocation rounding.
- Remainder handling.
- Duplicate reward prevention.
- Duplicate ledger transaction prevention.
- Database transaction rollback.
- Backend downtime recovery.
- Reward reconciliation.
- Public block publication failure.
- Total supply enforcement.

All tests must be reproducible.

21. UNDECIDED ITEMS REQUIRING APPROVAL

The following must be finalized before production:

1. Individual Regular Mining allocation formula.
2. Exact individual Referral Bonus allocation formula.
3. Smallest supported SAC unit.
4. Rounding method.
5. Remainder allocation method.
6. Deterministic tie-breaking rule.
7. Treatment of unused per-session pools.
8. Exact App Reserve usage policy.
9. Exact accounting treatment of forfeited cancelled-user balances.
10. Reward calculation versioning and migration policy.

These items must not be silently decided during implementation.

22. FINAL MINING AND REWARD POLICY

SAECOIN uses a centralized virtual mining reward distribution system.

The network-wide reward pools are fixed at 6,000 SAC for Regular Mining and 2,000 SAC for Referral Bonus per effective session.

The total App Mining Distribution is limited to 17,280,000 SAC across 2,160 effective sessions.

All individual reward calculations must be deterministic, budget-safe, auditable and controlled by the backend.

No individual reward, market value, financial return, exchange listing or withdrawal is guaranteed by this specification.

The total SAECOIN supply must never exceed 31,000,000 SAC.

---

END OF DOCUMENT
