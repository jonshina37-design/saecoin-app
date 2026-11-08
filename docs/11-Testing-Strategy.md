> **v1.2 NOTICE (draft):** This document belongs to the v1.1 set. Specification v1.2 ([00-Spec-v1.2-Decision-Record.md](00-Spec-v1.2-Decision-Record.md)) changes tokenomics, reward calculation, referral rules and other items. Where the two conflict, the v1.2 record prevails once approved.

# SAECOIN — TESTING STRATEGY

- **Document:** 11-Testing-Strategy.md
- **Version:** 1.1
- **Project:** SAECOIN App
- **Ticker:** SAC (Provisional)
- **Status:** Draft — Pending Approval

---

## 1. PURPOSE

This document defines the testing strategy for the SAECOIN App.

The objectives are to ensure that the application is:

- Functionally correct.
- Secure and reliable.
- Consistent across supported mobile platforms.
- Accurate in session and reward processing.
- Safe against duplicate reward credit.
- Consistent with the approved token allocation.
- Recoverable after service failures.
- Ready for public launch only after required testing is completed.

Testing applies to the mobile application, backend services, database, referral system, reward engine, administrative panel, backup system, and public ledger.

## 2. PROJECT TESTING PRINCIPLES

The project must follow these principles:

1. Test important functionality before release.
2. Test both successful and unsuccessful operations.
3. Test security and invalid input conditions.
4. Never treat a successful API response as proof of correct business logic.
5. Test reward calculations independently.
6. Verify database consistency after critical operations.
7. Test retries and duplicate requests.
8. Keep test data separate from production data.
9. Record test results and unresolved defects.
10. Critical bugs and security vulnerabilities must block public launch.

## 3. TESTING SCOPE

Testing must cover the following components:

| Component | Testing Scope |
| --- | --- |
| Mobile Application | Registration, login, navigation, UI, API integration |
| Backend | Business logic, validation, authentication, authorization |
| Database | Schema, constraints, transactions, integrity |
| Mining Sessions | Activation, session timing, completion, validation |
| Reward Engine | Regular Mining, Referral Bonus, allocation limits |
| Referral System | Referral codes, groups, eligibility, group changes |
| Account System | PENDING, VALID, CANCELLED, SUSPENDED |
| KYC | Eligibility, submission, review, access control |
| Admin Panel | Roles, approval workflows, audit records |
| Public Explorer | Block display, hash verification, signatures |
| Backup System | Backup creation, encryption, restoration |
| Notifications | In-App history and Push delivery |

## 4. TESTING ENVIRONMENTS

### 4.1 Development Environment

Used for:

- Developer testing.
- Unit testing.
- Local integration testing.
- API development.
- Database schema testing.
- UI development.

Development data must not contain real production secrets or unnecessary personal information.

### 4.2 Internal Testing Environment

Used for:

- Full application testing.
- Backend integration.
- Reward engine validation.
- Referral testing.
- Security testing.
- Admin workflow testing.
- Backup and recovery testing.

Internal testing is required before public launch.

### 4.3 Production Environment

Production testing must use controlled procedures.

Requirements:

- Do not use arbitrary test rewards in production.
- Do not modify real user balances for testing.
- Do not expose private information.
- Use approved monitoring and health checks.
- Use controlled deployment verification.

No public Testnet or Beta program is required under the current project scope.

## 5. MOBILE APPLICATION TESTING

The mobile application uses React Native + Expo + TypeScript.

Testing must cover supported Android and iOS configurations.

### 5.1 Registration

Test cases:

- Valid registration.
- Missing required fields.
- Invalid username.
- Duplicate username.
- Invalid referral code.
- Self-referral attempt.
- Referral code with 10 direct referrals already registered.
- Network interruption during registration.
- Duplicate registration request.

Expected result:

The backend must create only valid accounts and prevent duplicate or invalid referral relationships.

### 5.2 Login

Test cases:

- Valid login.
- Incorrect password.
- Unknown username.
- Empty fields.
- Expired session.
- Invalid authentication token.
- Repeated failed login attempts.
- Network interruption.
- Logout.
- Logout from all devices, where supported.

Expected result:

Unauthorized access must be rejected.

### 5.3 Navigation and UI

Verify:

- All navigation destinations.
- Loading states.
- Empty states.
- Error messages.
- Success messages.
- Form validation.
- Screen responsiveness.
- Accessibility basics.
- Text readability.
- Android and iOS layout behavior.

The app must not display unverified balance or reward information as authoritative data.

### 5.4 App Lifecycle

Test:

- App closed after session activation.
- App moved to background.
- Device restart.
- Internet disconnection.
- Internet reconnection.
- App reinstall.
- Authentication expiration.

Expected result:

A previously accepted session activation must remain recorded by the backend. Local application closure or device shutdown must not independently cancel an accepted session.

## 6. BACKEND TESTING

Backend testing must verify all critical business rules independently of the mobile application.

Test categories:

- Request validation.
- Authentication.
- Authorization.
- Rate limiting.
- Session validation.
- Referral validation.
- Reward calculation.
- Database transactions.
- Duplicate request handling.
- Error handling.
- Recovery behavior.

The backend must reject requests that attempt to submit unauthorized account status, session success, reward amount, or balance changes.

## 7. MINING SESSION TESTING

Mining sessions are virtual scheduled reward participation sessions. They are not actual Proof-of-Work mining.

### 7.1 Scheduled Session Windows

The three fixed daily UTC slots are:

| Session | Start UTC | End UTC |
| --- | --- | --- |
| 1 | 04:00 | 12:00 |
| 2 | 12:00 | 20:00 |
| 3 | 20:00 | 04:00 next day |

The backend clock is authoritative.

### 7.2 Activation Tests

Test:

- Activation at the exact session start.
- Activation shortly after session start.
- Activation in the middle of the session.
- Activation shortly before session end.
- Activation at the session end boundary.
- Activation after session end.
- Repeated activation in the same session.
- Activation during backend downtime.
- Activation with an incorrect device clock.

Expected result:

- One activation is accepted per user per scheduled session.
- Activation within the scheduled window counts for the full scheduled session.
- Activation after the session window is rejected.
- Repeated activation does not create another participation record.
- Client device time cannot override backend time.

The exact treatment of requests received at the session boundary must be implemented consistently using the approved backend timestamp policy.

### 7.3 Session Completion Tests

Test:

- Successful activation followed by session end.
- App closed after accepted activation.
- Device shut down after accepted activation.
- Internet lost after accepted activation.
- Backend interruption during session processing.
- Session validation failure.
- Duplicate completion request.
- Delayed reward processing.

Expected result:

A session becomes successful only after the scheduled slot ends and backend validation succeeds.

Activation alone must not be treated as session success.

### 7.4 Effective Session Count

Test:

- Normal session progression.
- Backend downtime.
- Session processing failure.
- Resumption after downtime.
- Duplicate session processing.
- Session history reconciliation.

The system must count 2,160 effective sessions.

Backend or mining downtime must pause effective session progression and resume from the previous valid state.

## 8. ACCOUNT VALIDITY TESTING

The initial VALID requirement is 21 successful sessions.

Test cases:

- 20 successful sessions.
- 21 successful sessions.
- Failed session between successful sessions.
- Activation without successful completion.
- Group change after VALID.
- Rebuild progress after group change.
- Referral bonus before VALID.
- Referral bonus after VALID.

Expected result:

- A user becomes VALID only after 21 successful sessions.
- Failed or merely activated sessions do not count.
- Referral Bonus remains disabled before VALID status.
- After a successful group change, the user must complete 21 new successful sessions.
- Regular Mining Reward continues during the rebuild period.

### 8.1 Inactivity Cancellation

The inactivity period is 90 scheduled session slots for VALID users.

Test:

- Successful session resets the inactivity counter.
- Activation without successful completion does not reset it.
- Failed session does not reset it.
- 89 inactive slots.
- 90 inactive slots.
- Backend downtime and paused effective session count.
- Rebuild period after group change.

Expected result:

If a VALID user completes no successful session within the next 90 scheduled session slots, the account becomes permanently CANCELLED under the approved rules.

The inactivity counter is suspended during the 21-session rebuild period after a group change.

Cancelled users cannot reactivate under the current policy.

## 9. REWARD ENGINE TESTING

The reward engine is a critical component.

All calculations must follow the approved Mining & Reward Specification.

### 9.1 Approved Token Allocation

The approved total supply is 31,000,000 SAC.

| Allocation | SAC |
| --- | --- |
| Regular Mining | 12,960,000 |
| Referral Bonus | 4,320,000 |
| Total App Mining Distribution | 17,280,000 |
| Initial App Reserve | 1,000,000 |
| Unused App Mining Allocation transferred to App Reserve | 720,000 |
| Total App Reserve | 1,720,000 |
| Founder/Personal Reserve | 12,000,000 |
| Node Mining | 0 |
| Total Supply | 31,000,000 |

The network-wide pools per effective session are:

- Regular Mining: 6,000 SAC.
- Referral Bonus: 2,000 SAC.
- Combined session pool: 8,000 SAC.

These are network-wide pools, not guaranteed individual rewards.

### 9.2 Reward Calculation Tests

Test:

- Regular Mining pool allocation.
- Referral Bonus pool allocation.
- Multiple eligible users.
- No eligible users.
- Multiple qualifying referral groups.
- Integer rounding.
- Remaining allocation.
- Allocation near the budget limit.
- Allocation at the budget limit.
- Attempted allocation above the budget.
- Repeated reward processing.

The exact individual reward formula, smallest SAC unit, rounding policy, and remainder policy must be formally approved before final reward engine acceptance.

Testing must use approved test vectors once those decisions are finalized.

Developers must not invent expected individual reward values.

### 9.3 Allocation Integrity Tests

Verify:

- Regular Mining never exceeds 12,960,000 SAC.
- Referral Bonus never exceeds 4,320,000 SAC.
- Combined App Mining Distribution never exceeds 17,280,000 SAC.
- Total App Reserve remains consistent with approved reserve transfers.
- Founder/Personal Reserve remains separate from App Reserve.
- Node Mining allocation remains zero.
- Total supply never exceeds 31,000,000 SAC.

The backend must reject any operation that would exceed an approved allocation.

## 10. REFERRAL SYSTEM TESTING

Referral testing must cover the complete referral specification.

### 10.1 Referral Code Tests

Test:

- Valid username referral code.
- Invalid referral code.
- Duplicate username.
- Self-referral.
- Referrer with 9 direct referrals.
- Referrer with 10 direct referrals.
- Referral registration with network failure.
- Duplicate referral relationship request.

Expected result:

A referrer may have a maximum of 10 current direct referrals.

### 10.2 Referral Group Eligibility

Test:

- Referrer active with 2 active direct referrals.
- Referrer active with 3 active direct referrals.
- Referrer inactive.
- Direct referrals inactive.
- Parent group ineligible.
- Child group independently eligible.
- User still PENDING.
- User VALID.
- Duplicate user participation.

Expected result:

A group qualifies only when the referrer is active and has at least 3 active direct referrals in the same scheduled session.

A user may receive no more than one referral bonus share per session.

### 10.3 Referral Group Change

Test:

- Group change before VALID status.
- Group change after VALID status.
- First successful group change.
- Second successful group change attempt.
- Invalid new referrer.
- New referrer with 10 direct referrals.
- Attempt to select the current referrer.
- Attempt to select a former referrer.
- Attempt to select a former ancestor-chain user.
- Group change during an active session.
- Group change effective from next session.
- Failed group change attempt.

Expected result:

- One successful group change is permitted during a user's lifetime.
- Invalid attempts do not consume that opportunity.
- A successful change resets VALID progress.
- The old relationship remains effective for the current active session.
- The new relationship becomes effective for the next new scheduled session.
- Existing SAC balance is unchanged.
- The user must complete 21 new successful sessions.

The final individual referral allocation formula must be approved before full reward calculation acceptance.

## 11. DATABASE TESTING

Database testing must verify:

- Correct schema creation.
- Primary key constraints.
- Foreign key constraints.
- Unique username constraints.
- Unique session identifiers.
- Unique reward identifiers.
- Referral relationship constraints.
- Maximum direct referral enforcement.
- Transaction atomicity.
- Rollback behavior.
- Concurrent request handling.
- Database recovery.
- Data integrity after restart.

Critical operations must be transactional.

The database must prevent duplicate reward credit even when requests are retried or processed concurrently.

## 12. API SECURITY TESTING

Test:

- Missing authentication.
- Invalid authentication.
- Expired token.
- Unauthorized user access.
- Unauthorized administrative access.
- Invalid request body.
- Unexpected input types.
- Oversized requests.
- Rate-limit enforcement.
- Replay attempts.
- Duplicate idempotency keys.
- Object ownership violations.
- Information leakage through error responses.

Expected result:

Unauthorized requests must be rejected without exposing sensitive information or changing protected data.

## 13. ADMIN PANEL TESTING

The administrative workflow must follow the approved role and approval model.

### 13.1 Role Testing

Test:

- Main Admin login.
- Sub-Admin login.
- Sub-Admin report access.
- Sub-Admin evidence verification.
- Sub-Admin final approval attempt.
- Main Admin approval.
- Main Admin rejection.
- Unauthorized role access.

Expected result:

Sub-Admins cannot perform restricted final approval or rejection actions.

### 13.2 Suspension Review

Test:

- Automatic security suspension.
- User evidence submission.
- Sub-Admin verification.
- Main Admin approval.
- Main Admin rejection.
- Backend reactivation.
- Audit log creation.

### 13.3 Reward Correction

Test:

- Valid correction request.
- Invalid User ID.
- Invalid Session ID.
- Invalid Reward ID.
- Missing reason.
- Duplicate correction request.
- Main Admin approval.
- Main Admin rejection.
- Correction block publication, where applicable.

Expected result:

Historical ledger entries must never be deleted or secretly overwritten.

Corrections must follow the approved backend validation and Main Admin approval workflow.

### 13.4 Admin Recovery

Test:

- Valid recovery email.
- Invalid OTP.
- Expired OTP.
- Reused Backup Recovery Code.
- Invalid Recovery Key.
- Successful Main Admin recovery.
- Existing session revocation.
- Security notification.
- Audit log creation.

Sub-Admins must not recover the Main Admin account.

## 14. KYC TESTING

KYC is required only after completion of all 2,160 effective sessions.

Test:

- User before completion of 2,160 sessions.
- User after completion of 2,160 sessions.
- KYC submission.
- Invalid document type.
- Oversized document.
- Upload interruption.
- Unauthorized document access.
- KYC approval.
- KYC rejection.
- KYC pending status.

Expected result:

- KYC is not required at registration.
- KYC is not required during the initial 21 successful sessions.
- If KYC is not completed after all 2,160 sessions, the balance is temporarily locked.
- The balance is not forfeited merely because KYC is pending.
- KYC documents must not be publicly accessible.

## 15. PUBLIC LEDGER AND EXPLORER TESTING

The public ledger is an app-operated, publicly inspectable and cryptographically verifiable record system.

It is not a decentralized or trustless blockchain.

Testing must cover:

- Block creation.
- Unique block number.
- Block hash calculation.
- Previous block hash reference.
- Backend digital signature.
- UTC timestamp.
- Public verification key.
- Transaction records.
- Session confirmation.
- Total balance display.
- Block publishing failure.
- Automatic retry.
- Duplicate publication prevention.
- Historical block verification.

### 15.1 Signature Verification

Test:

- Valid signature.
- Invalid signature.
- Modified block content.
- Wrong public key.
- Historical block signed with an old key.
- New block signed with a replacement key.
- Signing key replacement workflow.

Historical blocks must remain verifiable with their original public verification keys.

### 15.2 Ledger Correction

Test:

- Valid correction request.
- Invalid correction request.
- Missing Main Admin approval.
- Approved correction.
- Correction block publication.
- Explorer display of original and correction blocks.

Expected result:

The original block must remain unchanged. A correction must be published as a new block referencing the original record.

### 15.3 Privacy Testing

Verify that the public explorer never exposes:

- Passwords.
- Password hashes.
- OTP secrets.
- Recovery codes.
- Private keys.
- KYC documents.
- Sensitive personal information.
- Private API credentials.

## 16. NOTIFICATION TESTING

Test In-App and Push notification events:

- Session activation.
- Session success.
- Session failure.
- Reward credit.
- Referral bonus.
- Referral group change.
- VALID status.
- CANCELLED status.
- SUSPENDED status.
- Reactivation.
- KYC required.
- KYC verified.
- Announcements.
- Planned maintenance.
- Emergency maintenance.
- Maintenance completion.

Verify:

- Correct event association.
- Correct user recipient.
- No duplicate notifications from duplicate processing.
- Appropriate timestamps.
- Notification history.
- User deletion of an individual notification from personal history.
- Underlying system and ledger records remain unchanged.

If OS notification permission is denied, In-App notification history must continue to work.

## 17. BACKUP AND RECOVERY TESTING

Backup and recovery are mandatory test areas.

Test:

- Automatic backup after every mining session.
- Backup encryption.
- Backup integrity verification.
- Laptop backup.
- Google Drive upload.
- Pen Drive download.
- Backup failure alert.
- Recovery Key validation.
- Main Admin recovery approval.
- Database restoration.
- Reward ledger consistency.
- Referral history restoration.
- Public ledger reference restoration.

### 17.1 Monthly Recovery Test

A recovery test must be performed monthly.

The test must verify available backup sources:

- Laptop.
- Pen Drive.
- Google Drive.

The restored data must be checked for:

- User records.
- Session records.
- Reward records.
- Referral records.
- Account statuses.
- Administrative audit history.
- Ledger references.

Testing must use a controlled recovery environment rather than overwrite production data.

## 18. FAILURE AND RECOVERY TESTING

Test:

- Backend unavailable.
- Database unavailable.
- Network interruption.
- Reward processing interruption.
- Block publishing interruption.
- Backup failure.
- Notification delivery failure.
- Partial session processing.
- Server restart.
- Duplicate retry.
- Recovery after maintenance.

Expected result:

- Pending operations remain identifiable.
- Existing records are preserved.
- Duplicate rewards are prevented.
- Failed publishing remains PENDING and retries safely.
- Main Admin is alerted when required.
- Recovery actions are auditable.

For interrupted session or reward processing, backend validation and the required Admin approval must occur before affected rewards are processed.

## 19. PERFORMANCE AND LOAD TESTING

Performance testing must evaluate:

- Registration volume.
- Login volume.
- Concurrent session activations.
- Session completion processing.
- Reward calculation.
- Referral group evaluation.
- API response times.
- Database query performance.
- Explorer queries.
- Notification processing.
- Backup processing.

Tests should include realistic expected user counts and controlled stress scenarios.

The final performance targets must be approved before production launch.

No performance target should be claimed as achieved without recorded test evidence.

## 20. COMPATIBILITY TESTING

The application must be tested on supported Android and iOS versions and representative device configurations.

Testing should include:

- Different screen sizes.
- Different resolutions.
- Slow network connections.
- Unstable network connections.
- Low memory conditions.
- App background and foreground transitions.
- Device restart.
- OS permission denial.
- OS notification settings.
- Application update behavior.

The supported minimum OS versions and device requirements must be documented before release.

## 21. REGRESSION TESTING

Whenever a bug is fixed or a feature is changed:

1. Reproduce the original issue.
2. Confirm the fix.
3. Add or update an automated test where practical.
4. Run related component tests.
5. Run relevant integration tests.
6. Check for unintended changes to existing functionality.
7. Record the result.

Changes to consensus-like reward rules, session validation, token allocation, or ledger integrity require broader regression testing.

## 22. AUTOMATED TESTING AND CI

The project should gradually introduce automated testing through the approved CI system.

Suggested automated checks:

- TypeScript type checking.
- ESLint.
- Unit tests.
- Backend integration tests.
- API tests.
- Database tests.
- Mobile application builds.
- Dependency vulnerability scanning.
- Secret scanning.
- Release build validation.

CI must use controlled test credentials and isolated test data.

Production secrets must never be exposed in CI logs or build artifacts.

## 23. DEFECT SEVERITY

Defects should be classified as follows:

| Severity | Description | Release Impact |
| --- | --- | --- |
| Critical | Unauthorized access, reward corruption, data loss, signing key compromise, serious security vulnerability | Blocks release |
| High | Major feature failure, incorrect account status, referral or session processing failure | Blocks affected release |
| Medium | Important functionality impaired with a reasonable workaround | Requires review |
| Low | Minor UI or non-critical behavior issue | May be scheduled for later |

A defect must not be marked resolved until the fix has been verified.

## 24. PUBLIC LAUNCH TESTING GATE

Public launch is permitted only after required testing is complete.

The launch gate must verify:

- [ ] Registration and authentication tests pass.
- [ ] Session activation tests pass.
- [ ] Session completion tests pass.
- [ ] Account validity tests pass.
- [ ] Inactivity cancellation tests pass.
- [ ] Regular Mining allocation tests pass.
- [ ] Referral allocation tests pass.
- [ ] Token supply limits are enforced.
- [ ] Duplicate reward tests pass.
- [ ] Database integrity tests pass.
- [ ] API security tests pass.
- [ ] Admin permission tests pass.
- [ ] Admin recovery tests pass.
- [ ] KYC access-control tests pass.
- [ ] Public ledger hash verification passes.
- [ ] Digital signature verification passes.
- [ ] Backup restoration tests pass.
- [ ] Notification tests pass.
- [ ] Critical regression tests pass.
- [ ] Critical security findings are resolved.
- [ ] Release build validation passes.

Any unresolved critical bug or critical security vulnerability blocks public launch.

## 25. TEST REPORT REQUIREMENTS

Each major testing cycle must produce a test report.

The report should include:

- Test cycle identifier.
- Test date.
- Application version.
- Backend version.
- Database version or migration state.
- Environment.
- Test scope.
- Test cases executed.
- Passed tests.
- Failed tests.
- Blocked tests.
- Defect references.
- Security findings.
- Corrective actions.
- Final review status.

Test reports must be retained as project documentation.

## 26. UNRESOLVED TESTING DECISIONS

The following items require approval before final production acceptance:

1. Minimum supported Android version.
2. Minimum supported iOS version.
3. Performance targets.
4. Expected production user volume.
5. Final automated test framework configuration.
6. Test report retention period.
7. Final reward calculation test vectors.
8. Final individual referral allocation test vectors.
9. Production monitoring thresholds.

These items must be finalized before the relevant release gate.

## 27. FINAL TESTING POLICY

SAECOIN must not be released publicly based only on successful application compilation or a visually complete interface.

The backend, reward engine, referral system, database, administrative workflows, security controls, public ledger, and recovery processes must be tested.

Correctness, security, token allocation integrity, and recoverability take priority over release speed.

No public launch may proceed while a critical bug or critical security vulnerability remains unresolved.

---

END OF DOCUMENT
