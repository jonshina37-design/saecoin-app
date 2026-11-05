SAECOIN — TESTING STRATEGY

Document ID: SAECOIN-TEST-011
Version: 1.0
Project: SAECOIN App
Ticker: SAC (Provisional)
Status: Draft
Scope: Android App, Backend, Database, API, Mining, Rewards and Security

---

1. PURPOSE

This document defines the testing strategy for the SAECOIN App.

The objective is to ensure that the application is:

- Functionally correct.
- Secure.
- Reliable.
- Maintainable.
- Compatible with supported Android devices.
- Consistent with approved project specifications.
- Safe against unauthorized reward and account manipulation.

Testing must be performed throughout development rather than only before release.

2. TESTING SCOPE

Testing applies to all major application components.

Component| Testing Scope
Android App| UI, navigation, forms, state and device compatibility.
Backend| Business logic, authentication and application rules.
API| Request validation, response handling and authorization.
Database| Data integrity, relationships and transaction handling.
Mining System| Session activation, completion and daily limits.
Reward System| Mining Power, budget and ledger accuracy.
Referral System| Referral relationships and bonus eligibility.
Security| Authentication, authorization and abuse prevention.
Admin Functions| Permissions and administrative operations.
Release| Build, installation and production readiness.

3. TESTING PRINCIPLES

The project must follow these principles:

1. Test every important feature.
2. Test both valid and invalid inputs.
3. Verify backend-authoritative behavior.
4. Test failure conditions.
5. Prevent regressions.
6. Keep tests reproducible.
7. Use isolated test environments.
8. Never use real production reward data for ordinary testing.
9. Preserve test evidence.
10. Resolve critical defects before release.

4. TESTING LEVELS

4.1 Unit Testing

Unit tests verify individual functions and modules.

Examples:

- Input validation.
- Mining Power calculations.
- Session eligibility.
- Referral qualification.
- Reward calculation.
- Date and time calculations.
- Status transition validation.
- Data transformation.

Unit tests should be fast and independent.

4.2 Integration Testing

Integration tests verify communication between application components.

Examples:

- Android App and backend API.
- Backend and database.
- Authentication and session management.
- Mining session and reward processing.
- Referral qualification and bonus calculation.
- Notification processing.
- Account cancellation and eligibility changes.

4.3 End-to-End Testing

End-to-end tests verify complete user workflows.

Examples:

- Registration to dashboard.
- Login to logout.
- Mining activation to successful completion.
- Referral registration to qualification.
- Reward calculation to history display.
- Account cancellation workflow.

4.4 UI Testing

UI tests verify:

- Screen rendering.
- Navigation.
- Button actions.
- Form validation.
- Loading states.
- Error messages.
- Empty states.
- Dialogs.
- Accessibility.
- Different screen sizes.

4.5 Security Testing

Security testing verifies:

- Authentication protection.
- Authorization enforcement.
- Session security.
- API validation.
- Data protection.
- Mining manipulation prevention.
- Reward integrity.
- Referral abuse prevention.
- Administrative access controls.

4.6 Performance Testing

Performance testing evaluates:

- API response times.
- Database query performance.
- Concurrent requests.
- Background processing.
- Application startup time.
- Memory usage.
- Battery consumption.
- Network behavior.

4.7 Compatibility Testing

Compatibility testing verifies operation across supported:

- Android versions.
- Screen sizes.
- Device manufacturers.
- Network conditions.
- Device performance levels.

The final minimum Android version and supported device requirements are TBD.

5. TEST ENVIRONMENTS

Testing must use separate environments.

5.1 Local Development

Purpose:

- Initial feature development.
- Unit testing.
- Basic integration testing.
- Local database testing.
- Developer debugging.

The backend may run on the developer's own computer.

5.2 Test Environment

Purpose:

- Full integration testing.
- End-to-end testing.
- Security testing.
- Referral testing.
- Reward processing testing.
- Regression testing.

Test data must be isolated from production data.

5.3 Staging Environment

Purpose:

- Release candidate verification.
- Production-like configuration testing.
- Final API integration testing.
- Database migration testing.
- Backup and recovery testing.

Staging must not use production credentials or unrestricted real reward operations.

5.4 Production Environment

Production must not be used for ordinary development tests.

Only approved monitoring, smoke tests and controlled verification may be performed.

Production test accounts and procedures must be explicitly authorized.

6. TEST DATA MANAGEMENT

Test data must be predictable and reproducible.

Requirements:

- Use synthetic test accounts.
- Use clearly identified test referral codes.
- Use controlled mining session records.
- Use test reward budgets.
- Avoid real personal information.
- Avoid real production credentials.
- Reset test data through approved procedures.
- Prevent test rewards from entering production accounting.

Test fixtures should include:

- New account.
- Verified account.
- Suspended account.
- Cancelled account.
- Eligible mining account.
- Ineligible mining account.
- Referrer.
- Referred user.
- Qualified referral.
- Revoked referral.

7. REGISTRATION AND AUTHENTICATION TESTING

Required test cases:

1. Valid registration.
2. Invalid email or identifier.
3. Missing required fields.
4. Invalid password.
5. Duplicate account registration.
6. Successful login.
7. Incorrect password.
8. Expired authentication session.
9. Revoked authentication session.
10. Logout.
11. Unauthorized API request.
12. Account recovery.
13. Repeated login attempts.
14. Account enumeration protection.
15. Access to another user's protected data.

Expected result:

Authentication and authorization decisions must be enforced by the backend.

8. USER ACCOUNT TESTING

Test cases:

- Profile information retrieval.
- Profile update.
- Invalid profile data.
- Account verification.
- Account suspension.
- Account reactivation, if policy permits.
- Account cancellation.
- Cancelled account login restrictions.
- Mining eligibility after suspension.
- Referral eligibility after cancellation.
- Historical record preservation.

The application must display account status based on backend responses.

9. MINING SESSION TESTING

Mining sessions are virtual App Mining activities, not real Proof-of-Work mining.

Each session requires eight hours.

Maximum three sessions are permitted per project-defined day.

9.1 Session Activation

Test cases:

1. Eligible account activates a session.
2. Ineligible account attempts activation.
3. Suspended account attempts activation.
4. Cancelled account attempts activation.
5. Duplicate activation request.
6. Concurrent activation requests.
7. Activation beyond the daily limit.
8. Missing or invalid session data.
9. Unauthorized session activation.
10. Network failure during activation.

Expected result:

The backend creates no more sessions than the approved daily limit.

9.2 Session Completion

Test cases:

1. Valid eight-hour session completion.
2. Completion before eight hours.
3. Completion after the required duration.
4. Repeated completion request.
5. Completion using another user's session ID.
6. Completion after session revocation.
7. Completion after account suspension.
8. Invalid session status.
9. Network failure during completion.
10. Server restart during an active session.

Expected result:

Only backend-validated sessions become successful.

9.3 Time Manipulation Testing

Test cases:

- Change device clock forward.
- Change device clock backward.
- Change device timezone.
- Restart the application.
- Restart the device.
- Reinstall the application.
- Submit an altered client timestamp.

Expected result:

Device time changes must not create early session completion or additional valid sessions.

Backend timestamps remain authoritative.

9.4 Session State Testing

Every implemented session state transition must be tested.

Tests must verify:

- Valid transitions succeed.
- Invalid transitions are rejected.
- Duplicate transitions do not create duplicate records.
- Unauthorized state changes are rejected.
- Historical session information is preserved.

10. REWARD SYSTEM TESTING

Reward calculations must be verified independently from the UI.

10.1 Mining Power Testing

Test cases:

- Valid base Mining Power.
- Invalid Mining Power input.
- Eligible session calculation.
- Ineligible session calculation.
- Referral bonus eligibility.
- Missing referral qualification.
- Inactive participant.
- Boundary values.
- Calculation precision.
- Rounding behavior after policy approval.

10.2 Daily Reward Budget Testing

The current provisional daily budget is:

Category| Provisional Allocation
Regular Mining| 4,500 SAC
Referral Bonus| 1,000 SAC
Safety Reserve| 500 SAC
Total| 6,000 SAC

Test cases:

1. Reward calculation within the regular mining budget.
2. Regular mining budget exhaustion.
3. Referral budget exhaustion.
4. Total daily budget exhaustion.
5. Concurrent reward settlement.
6. Duplicate reward processing.
7. Invalid reward calculation.
8. Reward adjustment.
9. Daily accounting reset.
10. Reward allocation boundary conditions.

These amounts are provisional and must be configurable according to approved project policy.

10.3 Reward Ledger Testing

Test cases:

- Successful reward entry.
- Duplicate reward entry prevention.
- Unauthorized ledger modification.
- Unauthorized ledger deletion.
- Reward adjustment entry.
- Balance reconciliation.
- Database transaction failure.
- Concurrent settlement.
- Historical reward retrieval.

Expected result:

The reward ledger remains authoritative and historical records are preserved.

11. REFERRAL SYSTEM TESTING

The referral system must follow "09-Referral-Specification.md".

Required tests:

1. Valid referral code.
2. Invalid referral code.
3. Duplicate referral code prevention.
4. Self-referral rejection.
5. Duplicate referral relationship rejection.
6. Maximum 10 accepted referrals.
7. Concurrent attempts to exceed the referral limit.
8. Referral acceptance.
9. Referred user completes fewer than 21 sessions.
10. Referred user completes 21 successful sessions.
11. Referrer active and referred user active.
12. Referrer active and referred user inactive.
13. Referrer inactive and referred user active.
14. Both participants inactive.
15. Inactive bonus is not deferred.
16. Referral bonus budget exhaustion.
17. Duplicate referral bonus processing.
18. Referral revocation.
19. Unauthorized referral modification.
20. Referral history preservation.

The referral bonus percentage must not be assumed by test implementations until formally approved.

12. INACTIVITY AND ACCOUNT CANCELLATION TESTING

The proposed inactivity policy is based on 90 consecutive days without activating a mining session.

The exact policy remains subject to approval.

Required tests:

- Account with recent mining activity.
- Account approaching the inactivity threshold.
- Account crossing the approved inactivity threshold.
- Account with an active session.
- Account with pending reward processing.
- Account with qualified referrals.
- Account cancellation.
- Mining eligibility revocation.
- Referral eligibility revocation.
- Reward handling.
- Historical ledger preservation.
- Duplicate cancellation processing.

The backend must follow the finalized inactivity policy rather than device-local calculations.

13. COMMUNITY VERIFICATION TESTING

The application requires users to join designated official community channels.

Test cases:

- Community verification status retrieval.
- Successful verification through the approved method.
- Failed verification.
- Expired verification.
- Duplicate verification request.
- Unauthorized verification update.
- External service failure.
- Manual review, if supported.

The application must not claim automatic verification unless the selected integration actually supports it.

The verification method remains TBD.

14. API TESTING

Every API endpoint must be tested.

Test categories:

- Valid request.
- Invalid request.
- Missing parameters.
- Incorrect data types.
- Unauthorized access.
- Forbidden access.
- Expired session.
- Repeated request.
- Oversized request.
- Malformed JSON.
- Rate-limit behavior.
- Unexpected server error.
- Database failure.

The API must return consistent status codes and response structures.

Sensitive internal errors must not be exposed.

15. DATABASE TESTING

Database tests must verify:

- Table constraints.
- Foreign-key relationships.
- Unique constraints.
- Index behavior.
- Transaction rollback.
- Concurrent updates.
- Duplicate prevention.
- Migration success.
- Migration failure handling.
- Backup creation.
- Backup restoration.
- Reward ledger consistency.

Database migrations must be tested against representative test data before production use.

16. ANDROID UI TESTING

The Android application must be tested screen by screen.

Required screens include:

- Splash.
- Onboarding.
- Registration.
- Login.
- Verification.
- Community.
- Dashboard.
- Mining.
- Session Completion.
- Referral.
- History.
- Notifications.
- Profile.
- Settings.
- Help.

For every screen, test:

- Initial rendering.
- Navigation.
- User input.
- Loading state.
- Empty state.
- Success state.
- Error state.
- Network failure.
- Back navigation.
- Screen rotation, where supported.
- Different screen sizes.

The UI must not display unconfirmed backend states as successful operations.

17. NETWORK AND OFFLINE TESTING

Test scenarios:

- Stable internet connection.
- Slow internet connection.
- Temporary disconnection.
- Network timeout.
- Server unavailable.
- Request retry.
- Duplicate request after retry.
- Connection restored after failure.
- Expired authentication during a request.

The application must show clear error messages.

Retry behavior must not duplicate mining sessions or reward processing.

18. SECURITY TESTING

Security tests must follow the requirements in "10-Security-Specification.md".

Required areas:

- Authentication.
- Authorization.
- Session management.
- Local data storage.
- Network communication.
- API security.
- Input validation.
- Database security.
- Secret exposure.
- Mining session manipulation.
- Reward manipulation.
- Referral fraud.
- Admin privilege protection.

Mobile security testing should use the OWASP MASVS and MASTG as references.

Automated scanning alone must not be treated as complete security verification.

19. PERFORMANCE AND LOAD TESTING

Performance testing must evaluate:

- Application startup.
- Dashboard loading.
- Referral list loading.
- Mining status retrieval.
- Reward history retrieval.
- API response time.
- Database query time.
- Concurrent login requests.
- Concurrent mining activation requests.
- Concurrent session completion requests.
- Concurrent reward settlement.
- Background job processing.

Load targets must be established before production launch.

The system must remain consistent under concurrent requests.

Performance tests must never use uncontrolled production reward operations.

20. COMPATIBILITY TESTING

The Android application must be tested on a representative device matrix.

Consider:

- Minimum supported Android version.
- Current supported Android versions.
- Low-memory devices.
- Different screen sizes.
- Different manufacturers.
- Wi-Fi connections.
- Mobile data connections.
- Background and foreground transitions.
- Device restart behavior.

The final supported Android version and device matrix are TBD.

21. NOTIFICATION TESTING

Test cases:

- Correct notification content.
- Correct notification recipient.
- Duplicate notification prevention.
- Delayed notification.
- Failed notification delivery.
- Notification permission denied.
- Notification disabled by user.
- Mining completion notification.
- Referral qualification notification.
- Account status notification.

Notifications must represent confirmed backend events.

22. ADMIN PANEL TESTING

Administrative functions must be tested separately.

Test cases:

- Admin login.
- Invalid admin credentials.
- Role-based access.
- Unauthorized administrative endpoint.
- User suspension.
- Referral revocation.
- Reward adjustment.
- Budget configuration.
- Audit log generation.
- Unauthorized privilege escalation.
- Session expiration.
- Administrative action history.

High-risk operations must follow the approved review and authorization policy.

23. REGRESSION TESTING

Regression tests must be run after important changes.

Examples:

- Authentication changes.
- Database schema changes.
- API changes.
- Mining rule changes.
- Reward formula changes.
- Referral rule changes.
- Account status changes.
- UI navigation changes.
- Security updates.

Existing successful tests must not be removed merely to make a build pass.

Any changed expected behavior must be documented and approved.

24. TEST AUTOMATION AND CI

Automated tests should be integrated gradually into the development workflow.

The CI pipeline should eventually include:

1. Source formatting checks.
2. Static analysis.
3. Type checking.
4. Unit tests.
5. Integration tests.
6. API tests.
7. Database migration tests.
8. Android build verification.
9. UI tests where practical.
10. Dependency vulnerability checks.
11. Secret scanning.
12. Release build verification.

A failed critical CI check must block the relevant release process.

Exact CI tools and configurations are TBD.

25. DEFECT MANAGEMENT

Every identified defect must be recorded.

Each defect report should include:

- Unique defect ID.
- Title.
- Description.
- Affected component.
- Steps to reproduce.
- Expected result.
- Actual result.
- Severity.
- Priority.
- Test environment.
- Screenshots or logs where appropriate.
- Assigned status.
- Resolution details.

25.1 Severity Levels

Severity| Description
Critical| Causes major security compromise, unauthorized reward manipulation, or severe data corruption.
High| Breaks important functionality or creates a serious security risk.
Medium| Causes partial functionality failure or significant usability problems.
Low| Minor visual, text, or non-critical behavior issue.

25.2 Defect Resolution

A defect should be:

1. Reported.
2. Reproduced.
3. Assigned.
4. Investigated.
5. Fixed.
6. Retested.
7. Regression-tested.
8. Closed after verification.

Critical defects must be resolved before release.

26. TEST EVIDENCE AND REPORTING

Testing must produce verifiable evidence.

Evidence may include:

- Test case results.
- Automated test reports.
- Build logs.
- API response records.
- Screenshots.
- Database validation results.
- Security scan reports.
- Defect reports.
- Release test summaries.

Test reports must identify:

- Tested version.
- Test environment.
- Test date.
- Test scope.
- Passed tests.
- Failed tests.
- Known issues.
- Unresolved risks.

Sensitive data must be removed from shared test evidence.

27. RELEASE ACCEPTANCE CRITERIA

A release candidate may proceed only when:

- Required features pass their tests.
- Critical user workflows work correctly.
- Authentication and authorization tests pass.
- Mining session rules are verified.
- Reward calculations are verified.
- Reward budget limits are enforced.
- Referral rules are verified.
- Database migrations pass.
- Required security tests pass.
- No unresolved critical defects remain.
- High-severity defects are resolved or formally accepted by the project owner.
- Backup and recovery procedures are tested.
- Release build verification succeeds.

A successful build alone does not mean the application is ready for release.

28. OPEN TESTING DECISIONS

The following decisions must be finalized during implementation:

1. Minimum supported Android version.
2. Supported device matrix.
3. Backend framework-specific test tools.
4. Database test environment.
5. API automation framework.
6. UI automation framework.
7. CI platform and configuration.
8. Performance targets.
9. Load testing targets.
10. Security assessment scope.
11. Test data retention policy.
12. Release acceptance thresholds.
13. Test environment hosting.
14. Defect tracking workflow.

No developer should silently treat these decisions as finalized.

29. CROSS-DOCUMENT CONSISTENCY

This document must remain consistent with:

- "01-App-PRD.md"
- "02-UI-UX-Design.md"
- "03-App-Flow-Specification.md"
- "04-Technical-Requirements.md"
- "05-App-Architecture.md"
- "06-Backend-Specification.md"
- "07-Database-Schema.md"
- "08-Mining-Reward-Specification.md"
- "09-Referral-Specification.md"
- "10-Security-Specification.md"
- "12-Release-and-Launch-Plan.md"

Important shared rules:

- Mining sessions last eight hours.
- Maximum three sessions per project-defined day.
- Backend timestamps are authoritative.
- 21 successful sessions are required for referred-user qualification.
- Maximum 10 accepted referrals per referrer.
- Referral bonus eligibility is independent for each active participant.
- Inactive referral bonuses are not deferred.
- Reward ledger records must be preserved.
- Daily reward budgets must be enforced.
- Virtual SAC is not on-chain cryptocurrency.
- Future blockchain mining is outside the scope of this application.

30. FINAL TESTING POLICY

Testing is mandatory throughout SAECOIN App development.

No major feature should be considered complete without appropriate verification.

Correctness, security, data integrity, and reliable user experience take priority over development speed.

All release decisions must be supported by documented test results.

---

END OF DOCUMENT
