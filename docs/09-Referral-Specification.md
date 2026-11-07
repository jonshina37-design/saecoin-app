SAECOIN — REFERRAL SPECIFICATION

Document: 09-Referral-Specification.md
Version: 1.1
Project: SAECOIN App
Ticker: SAC (Provisional)
Status: Draft — Pending Approval

---

1. PURPOSE

This document defines the referral system for the SAECOIN App.

It establishes the rules for:

- Referral code creation and validation.
- Referral relationships.
- Referral group structure.
- Direct referral limits.
- Referral group eligibility.
- Referral bonus participation.
- Referral group changes.
- Referral progress reset.
- Referral reward validation.
- Fraud prevention and audit records.

The referral system is part of the centralized SAECOIN App reward distribution system.

It does not represent blockchain mining or decentralized consensus.

2. CORE PRINCIPLES

The referral system must follow these principles:

1. Every registered user has a permanent and unique username.
2. The username also functions as the user's Referral Code.
3. A user may have only one current referrer.
4. A user may have a maximum of 10 direct referrals.
5. Referral relationships must be validated by the backend.
6. Referral bonuses are available only to VALID users who meet the applicable session requirements.
7. Referral rewards must remain within the approved network-wide referral allocation.
8. A user may change their referral group only once during their lifetime.
9. Referral group changes must not alter the user's existing SAC balance.
10. All referral-related changes and reward calculations must be recorded and auditable.

3. REFERRAL CODE

3.1 Username as Referral Code

Each registered user receives a unique username.

That username serves as the user's permanent Referral Code.

Example:

- Username: "Emon"
- Referral Code: "Emon"

The referral code must be:

- Unique.
- Permanently associated with its owner.
- Case-handling consistent across registration, lookup and validation.
- Validated by the backend.
- Protected against duplicate registration.

The exact username character rules and case-sensitivity policy must be finalized in the registration specification.

3.2 Referral Code Entry

During registration, a new user may enter an existing user's username as their referral code.

The backend must verify that:

- The referral code exists.
- The referenced account is eligible to receive a direct referral.
- The referenced account has fewer than 10 direct referrals.
- The new user is not attempting self-referral.
- The requested relationship does not violate the one-current-referrer rule.

3.3 Invalid Referral Code

If the entered referral code is invalid:

- The app must display a clear error.
- The referral relationship must not be created.
- No pending referral relationship may be stored.
- The user must correct the code before proceeding with referral registration.

An invalid code must never be silently accepted.

4. REFERRAL RELATIONSHIPS

4.1 One Current Referrer

A user may have only one current referrer at a time.

The backend must maintain one authoritative current referral relationship for each referred user.

4.2 Direct Referrals

A referrer may have a maximum of 10 direct referrals.

Once the limit is reached:

- Additional users cannot register under that referrer.
- The backend must reject the new relationship.
- The app must display a clear explanation.

The limit applies to current direct referrals.

4.3 Self-Referral Prevention

A user cannot use their own username as their referral code.

The backend must reject self-referral attempts even if the app interface is bypassed.

4.4 Referral Group

A referral group consists of:

- One referrer.
- The referrer's direct referrals.

The group is evaluated for each scheduled mining session according to the eligibility rules in this document.

The referral group must not be treated as a permanently eligible reward group. Eligibility can change from one session to another.

5. REFERRAL GROUP ELIGIBILITY

5.1 Basic Eligibility

A referral group can qualify for referral bonus participation only when:

1. The referrer is active in the relevant scheduled session.
2. The referrer has at least 3 active direct referrals in that same session.
3. The participating users satisfy the applicable account and session requirements.
4. The backend successfully validates the group's session records.

The minimum of 3 active direct referrals is required in addition to the referrer.

5.2 Active Direct Referral

A direct referral is considered active for a session only when that user has successfully completed the applicable activation and backend validation requirements for that scheduled session.

Merely registering under a referrer does not make a user active.

A user who has not successfully participated in the relevant session must not be counted as an active direct referral for that session.

5.3 Group Participation

If a referral group qualifies:

- The referrer participates in the group's referral bonus calculation.
- All active direct referrals participate in that group's referral bonus calculation.
- Inactive direct referrals do not participate in that session's group calculation.

The backend must calculate eligibility separately for every scheduled session.

5.4 Parent Group Ineligibility

A parent group's failure to qualify must not automatically disqualify a child referral group.

A child group may qualify independently when its own referrer and active direct referrals satisfy the eligibility requirements.

6. REFERRAL BONUS RULES

6.1 Referral Bonus Allocation

The approved network-wide Referral Bonus allocation is:

4,320,000 SAC

The network-wide referral bonus pool per effective mining session is:

2,000 SAC

These figures are part of the approved SAECOIN token allocation and must remain consistent with:

- "07-Database-Schema.md"
- "08-Mining-Reward-Specification.md"

The 2,000 SAC amount is a network-wide session pool, not a guaranteed individual reward.

6.2 Referral Bonus Eligibility

A user may receive a referral bonus only when:

- The user has achieved VALID status.
- The user is eligible for the relevant session.
- The user's referral group qualifies for that session.
- The backend validates the user's participation.
- The referral allocation remains within the approved session and total referral budgets.

Users who are still completing their initial 21 successful sessions are not eligible for referral bonuses.

6.3 Individual Referral Allocation

The exact individual referral bonus formula has not yet been finalized.

The following details require formal approval before implementation:

- How the 2,000 SAC network-wide referral pool is distributed.
- How multiple eligible referral groups share the pool.
- How group members share their group's allocation.
- Whether any weighting is applied.
- How integer rounding is handled.
- How undistributed remainder is handled.
- How the system guarantees that the total allocation never exceeds the approved pool.

No developer may independently invent or introduce an individual referral bonus formula.

The final approved formula must be documented in the Mining & Reward Specification and implemented consistently by the backend.

6.4 Duplicate Participation Prevention

A user must receive no more than one referral bonus share per scheduled session.

If a user appears in multiple eligible referral calculations because of inconsistent or duplicate records, the backend must prevent duplicate allocation.

The backend must resolve the user's participation according to the approved referral rules before generating reward records.

7. REFERRAL GROUP CHANGE

7.1 Lifetime Change Limit

A user is allowed only one referral group change during their lifetime.

This opportunity becomes available only after the user completes the initial 21 successful sessions and achieves VALID status.

A user who has not yet achieved VALID status cannot use the group change feature.

7.2 Selecting a New Referrer

After becoming VALID, the user may select another registered username as their new referrer.

The new referrer must:

- Exist in the system.
- Be eligible to receive another direct referral.
- Have fewer than 10 current direct referrals.
- Not be the user's current referrer.

The user may select a former referrer or a user who previously appeared in their referral ancestry chain.

There is no additional ancestry-cycle restriction under the current approved rules.

The backend must still enforce the direct referral limit and all other relationship constraints.

7.3 Automatic Group Change

If the selected referrer is valid and eligible:

- The backend automatically processes the group change.
- No additional approval from the new referrer is required.
- The old referral relationship is closed.
- The new referral relationship becomes the current relationship.
- The change is recorded in the referral history.

The change must not be completed if the new referrer is invalid or has reached the direct referral limit.

7.4 Invalid Group Change Attempt

An invalid group change attempt must:

- Be rejected.
- Leave the current referral relationship unchanged.
- Leave the user's lifetime change opportunity unused.
- Create an appropriate validation or security record.

An unsuccessful attempt does not consume the one permitted group change.

A user cannot return to the same current referrer through the group change feature.

8. GROUP CHANGE EFFECTIVE TIME

A successful group change becomes effective from the user's next new scheduled mining session.

If the user is already participating in an active session:

- The old referral group remains effective for that active session.
- The new referral group must not affect that session's eligibility or reward calculation.
- The new relationship becomes effective at the start of the next new session.

The backend must preserve the exact effective session identifier for the relationship change.

This prevents a group change from modifying an already active or completed session.

9. VALIDITY RESET AFTER GROUP CHANGE

A successful referral group change resets the user's VALID progress.

After the change:

- The user returns to PENDING status.
- The user must complete 21 new successful sessions.
- Regular Mining Reward continues during the rebuild period.
- Referral Bonus is disabled during the rebuild period.
- Existing SAC balance remains unchanged.
- Existing reward ledger entries remain unchanged.
- The new referral relationship remains active.

The user's previous 21-session progress must not be carried into the new group.

9.1 Inactivity Counter

The 90-session inactivity cancellation counter is suspended while the user is rebuilding VALID status after a group change.

Once the user completes 21 new successful sessions and becomes VALID again, the inactivity monitoring rules resume according to the account validity specification.

10. INITIAL VALIDITY REQUIREMENT

A newly registered user must complete 21 successful scheduled sessions to become VALID.

During this period:

- Regular Mining Reward is available according to the approved reward rules.
- Referral Bonus is not available.
- The backend tracks successful sessions.
- Failed or merely activated sessions do not count toward the 21-session requirement.

The same 21-successful-session requirement applies again after a successful referral group change.

11. REFERRAL REWARD PROCESSING

For every scheduled session, the backend must:

1. Identify the users who successfully completed the session.
2. Retrieve the current referral relationships effective for that session.
3. Identify eligible referrers.
4. Count each referrer's active direct referrals.
5. Validate the minimum of 3 active direct referrals.
6. Identify qualifying referral groups.
7. Ensure users are not counted more than once.
8. Apply the formally approved referral allocation formula.
9. Validate the total allocation against the 2,000 SAC session pool.
10. Generate unique referral reward records.
11. Record the resulting transactions in the reward ledger.
12. Preserve the calculation and validation history.

If any validation fails, the affected referral reward processing must remain pending or be rejected according to the backend error-handling policy.

The backend must never exceed the approved referral budget.

12. REFERRAL HISTORY

The system must maintain referral history for each user.

The history should include:

- User ID.
- Previous referrer ID.
- New referrer ID.
- Referral relationship creation time.
- Referral relationship end time, where applicable.
- Effective session ID.
- Group change count.
- Group change reason or event type.
- Validation result.
- Backend processing timestamp.

Historical referral relationships must not be silently deleted or overwritten.

The current referral relationship must be identifiable without losing previous relationship records.

13. FRAUD PREVENTION

The backend must validate referral operations independently of the mobile app.

Security controls should include:

- Self-referral prevention.
- Unique account and username validation.
- Direct referral limit enforcement.
- Duplicate referral relationship detection.
- Duplicate reward prevention.
- Session participation verification.
- Group change limit enforcement.
- Suspicious repeated registration detection.
- Referral reward calculation validation.
- Audit logging for referral changes.

Suspicious activity may trigger automatic security review or account suspension under the Security Specification.

Referral validation must not rely solely on client-side checks.

14. DATABASE REQUIREMENTS

The backend database must support:

- Permanent referral code association.
- Current referral relationship lookup.
- Historical referral relationships.
- Direct referral count.
- Referral group membership.
- Referral group eligibility by session.
- Lifetime group change count.
- Group change effective session.
- Referral reward records.
- Referral calculation records.
- Duplicate reward prevention.
- Referral audit history.

Database constraints and transactions must prevent:

- More than one current referrer per user.
- More than 10 current direct referrals per referrer.
- More than one successful group change per user.
- Duplicate referral reward records for the same user and session.

The final database implementation must remain consistent with "07-Database-Schema.md".

15. API REQUIREMENTS

The backend should provide authenticated operations for:

- Referral code lookup.
- Referral code validation.
- Current referrer information.
- Direct referral list.
- Referral group information.
- Referral eligibility status.
- Referral bonus history.
- Referral group change request.
- Referral group change result.

The backend must validate the authenticated user and all relevant constraints for every operation.

The mobile application must never determine referral reward eligibility or calculate authoritative referral rewards.

Exact endpoint paths and request/response schemas must be defined in the API implementation documentation.

16. USER INTERFACE REQUIREMENTS

The mobile app should provide:

- A user's Referral Code.
- A copy action for the Referral Code.
- Referral registration input.
- Clear invalid-code messages.
- Current referrer information.
- Direct referral count.
- Referral group status.
- Referral bonus history.
- Group change availability.
- Group change confirmation.
- Group change result.
- Clear information about the 21-session rebuild requirement.

The app must clearly communicate that:

- Referral bonuses are conditional.
- Referral group eligibility is evaluated per session.
- The referral pool is shared.
- Individual referral rewards are not guaranteed.
- A successful group change resets VALID progress.
- Only one successful group change is permitted during the user's lifetime.

17. AUDIT AND ADMINISTRATIVE CONTROLS

All referral-related administrative and backend actions must be auditable.

Audit records should include:

- Referral relationship changes.
- Invalid referral attempts where security-relevant.
- Group change requests.
- Group change validation results.
- Referral group eligibility calculations.
- Referral bonus calculations.
- Reward allocation results.
- Duplicate reward prevention events.
- Administrative investigations and decisions.

Admin users must not directly modify historical referral relationships or reward ledger entries.

Any correction must follow the approved backend correction workflow and Main Admin approval process.

18. FAILURE HANDLING

If referral processing fails:

- Do not issue unvalidated referral rewards.
- Keep affected processing records in a recoverable pending state where appropriate.
- Record the failure reason.
- Prevent duplicate processing during retries.
- Reconcile the affected session before finalizing rewards.
- Alert the responsible administrator when required.

A retry must use the original session and reward identifiers so that the same reward cannot be credited twice.

19. UNRESOLVED ITEMS REQUIRING APPROVAL

The following items must be finalized before production implementation:

1. Exact individual referral bonus allocation formula.
2. Distribution method when multiple referral groups qualify.
3. Group-level and member-level weighting, if any.
4. Integer rounding and remainder policy.
5. Exact referral code character and case-sensitivity rules.
6. Final API endpoint definitions.
7. Final database indexes and constraints.
8. Referral fraud detection thresholds.

Until formally approved, these items must remain configurable or unimplemented as appropriate.

No developer may introduce undocumented token allocation rules.

20. FINAL POLICY

The SAECOIN referral system must be deterministic, auditable, secure, and budget-safe.

Referral relationships must be controlled by the backend.

Referral rewards must follow the approved network-wide allocation and must never exceed the authorized referral pool.

A successful group change is limited to one per user lifetime and requires the user to rebuild VALID status through 21 new successful sessions.

All referral implementation must remain consistent with the PRD, App Flow, Backend Specification, Database Schema, and Mining & Reward Specification.

---

END OF DOCUMENT
