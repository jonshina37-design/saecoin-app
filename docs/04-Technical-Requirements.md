> **v1.2 NOTICE (draft):** This document belongs to the v1.1 set. Specification v1.2 ([00-Spec-v1.2-Decision-Record.md](00-Spec-v1.2-Decision-Record.md)) changes tokenomics, reward calculation, referral rules and other items. Where the two conflict, the v1.2 record prevails once approved.

SAECOIN — TECHNICAL REQUIREMENTS SPECIFICATION

Document ID: SAECOIN-APP-TR-004
Version: 1.1
Project: SAECOIN App
Status: Draft — Updated for Approved Requirements
Platforms: Android and iOS
Framework: React Native + Expo
Language: TypeScript
Backend: Shared Server-Authoritative Backend
API Style: REST API
Time Standard: UTC

---

1. PURPOSE

This document defines the technical requirements for developing, operating, securing, and maintaining the SAECOIN mobile application.

It establishes the technical expectations for:

- Android and iOS applications.
- Frontend architecture.
- Backend services.
- Database operations.
- Authentication.
- Mining session processing.
- Reward calculation.
- Referral management.
- Public ledger publishing.
- Administrative workflows.
- Security.
- Backup and recovery.
- Testing and deployment.

All implementation decisions must remain consistent with the approved project specifications.

2. SYSTEM OVERVIEW

SAECOIN App consists of the following major components:

1. Android Application.
2. iOS Application.
3. Shared Backend.
4. Database.
5. Mining Session Processor.
6. Reward Processing Engine.
7. Referral Processing Engine.
8. Public Ledger Publisher.
9. Explorer API.
10. Administrative System.
11. Backup and Recovery System.
12. Notification Services.

The Android and iOS applications share the same backend and business rules.

The backend is the authoritative source for all account, session, reward, referral, and ledger operations.

3. TECHNOLOGY STACK

Component| Technology
Android Application| React Native
iOS Application| React Native
Framework| Expo
Programming Language| TypeScript
API Communication| REST API
Data Format| JSON
Backend| Server-side application
Database| Centralized relational database
Authentication| Backend-managed authentication
Version Control| Git
Repository Hosting| GitHub

Exact backend language, framework, database engine, and infrastructure configuration must follow the approved Backend Specification and Architecture documents.

No alternative mobile framework should be introduced without documented approval.

4. CROSS-PLATFORM REQUIREMENTS

The application must support Android and iOS.

Requirements:

- Maintain one shared React Native codebase.
- Use the same API contracts on both platforms.
- Use identical account and reward rules.
- Support platform-specific permission handling.
- Respect Android and iOS safe areas.
- Support different screen dimensions.
- Handle network interruptions.
- Support secure authentication.
- Provide consistent notifications.
- Test Android and iOS independently.

Platform-specific implementation must not change business rules.

5. FRONTEND REQUIREMENTS

5.1 Application Structure

The frontend must be modular.

Suggested structure:

src/
│
├── app/
│   ├── navigation/
│   ├── providers/
│   └── configuration/
│
├── components/
│   ├── common/
│   ├── buttons/
│   ├── forms/
│   ├── cards/
│   └── status/
│
├── screens/
│   ├── splash/
│   ├── onboarding/
│   ├── authentication/
│   ├── dashboard/
│   ├── mining/
│   ├── rewards/
│   ├── referral/
│   ├── explorer/
│   ├── notifications/
│   ├── profile/
│   ├── kyc/
│   └── maintenance/
│
├── services/
│   ├── api/
│   ├── authentication/
│   └── notifications/
│
├── hooks/
├── types/
├── utils/
├── constants/
├── theme/
└── assets/

This is a proposed organization. The final structure must be aligned with the approved architecture.

5.2 Frontend Responsibilities

The frontend is responsible for:

- Displaying application screens.
- Collecting user input.
- Sending API requests.
- Displaying backend responses.
- Handling navigation.
- Managing temporary UI state.
- Showing loading and error states.
- Managing platform permissions.

The frontend must not independently determine:

- Mining session success.
- Reward eligibility.
- Reward amounts.
- Referral eligibility.
- Account validity.
- Account cancellation.
- Public ledger confirmation.

6. BACKEND REQUIREMENTS

The backend must provide centralized services for:

- User authentication.
- User profile management.
- Account status.
- Mining session management.
- Session validation.
- Reward calculation.
- Reward crediting.
- Referral management.
- Referral eligibility.
- Group changes.
- KYC status.
- Notifications.
- Public ledger publishing.
- Explorer queries.
- Admin workflows.
- Audit logging.
- Backup management.

The backend must enforce all important business rules independently of mobile client behavior.

7. API REQUIREMENTS

The application must communicate with the backend through documented REST APIs.

Requirements:

1. Use HTTPS in production.
2. Use JSON request and response structures.
3. Validate all incoming requests.
4. Authenticate protected endpoints.
5. Apply authorization checks.
6. Use consistent error responses.
7. Apply appropriate rate limits.
8. Support API versioning.
9. Prevent duplicate processing.
10. Avoid exposing internal server details.

7.1 API Response Requirements

Responses should include:

- Success or failure status.
- Relevant data.
- Error code where applicable.
- Human-readable message where appropriate.
- Request or correlation identifier where useful.

Sensitive information must never be included unnecessarily.

7.2 API Idempotency

Operations that may be retried must use appropriate idempotency controls.

Examples:

- Mining activation.
- Reward processing.
- Account recovery.
- Administrative corrections.
- Ledger publishing.
- Recovery operations.

Repeated requests must not create duplicate records or duplicate rewards.

8. AUTHENTICATION REQUIREMENTS

The backend must manage authentication securely.

Requirements:

- Secure password hashing.
- Secure session management.
- Authentication expiration.
- Protected API access.
- Account recovery.
- Logout and session revocation.
- Appropriate login rate limits.
- Protection against brute-force attempts.
- Secure handling of authentication tokens.

The application must not store passwords or OTP secrets in plain text.

Sensitive authentication data must not be written to logs.

9. TIME AND SESSION REQUIREMENTS

9.1 Authoritative Time

The backend clock is authoritative.

All mining session calculations must use UTC.

The mobile device clock must not determine:

- Session eligibility.
- Session activation validity.
- Session completion.
- Reward eligibility.
- Effective session counting.

9.2 Daily Session Schedule

Session| Start UTC| End UTC
Session 1| 04:00| 12:00
Session 2| 12:00| 20:00
Session 3| 20:00| 04:00 next day

Each session lasts eight hours.

9.3 Activation Requirements

- One activation per user per scheduled session.
- Activation permitted during the entire session window.
- Late activation within the window counts for the same session.
- Missed sessions cannot be activated retrospectively.
- Duplicate activation must be rejected or safely treated as an idempotent retry.

9.4 Session Completion

A session becomes successful only after:

1. Its scheduled slot ends.
2. The backend validates activation.
3. The backend validates account eligibility.
4. Required processing succeeds.

Device shutdown or application closure after activation must not cancel a valid activation.

9.5 Effective Session Count

The application has 2,160 effective scheduled sessions.

Mining or backend downtime must pause the effective session counter.

After recovery, processing must resume from the previous effective-session state.

Downtime must not consume effective session allocations.

10. TOKENOMICS REQUIREMENTS

10.1 Total Supply

The approved total supply is:

31,000,000 SAC

The application must not create additional SAC beyond the approved allocation.

10.2 Allocation

Category| Allocation
Regular Mining| 12,960,000 SAC
Referral Bonus| 4,320,000 SAC
App Reserve| 1,720,000 SAC
Founder/Personal Reserve| 12,000,000 SAC
Node Mining| 0 SAC
Total| 31,000,000 SAC

10.3 Mining Distribution

Total App Mining Distribution:

17,280,000 SAC

This consists of:

- Regular Mining: 12,960,000 SAC.
- Referral Bonus: 4,320,000 SAC.

10.4 App Reserve

The App Reserve consists of:

- Initial App Reserve: 1,000,000 SAC.
- Unused App Mining allocation: 720,000 SAC.
- Total App Reserve: 1,720,000 SAC.

The App Reserve distribution policy remains undecided.

It must not be confused with the Founder/Personal Reserve.

10.5 Per-Session Pool

Each effective session has the following network-wide allocation:

Category| Per Session
Regular Mining| 6,000 SAC
Referral Bonus| 2,000 SAC
Total| 8,000 SAC

Across 2,160 effective sessions:

- Regular Mining: 12,960,000 SAC.
- Referral Bonus: 4,320,000 SAC.
- Total: 17,280,000 SAC.

These values are network-wide pools, not guaranteed individual rewards.

The backend must enforce allocation limits.

11. REWARD PROCESSING REQUIREMENTS

The reward engine must:

- Process only eligible sessions.
- Validate account status.
- Validate referral eligibility.
- Calculate rewards deterministically.
- Enforce category-specific budgets.
- Generate unique reward identifiers.
- Prevent duplicate crediting.
- Maintain transaction history.
- Support safe retries.
- Record processing failures.

Reward processing should normally complete within five minutes after session end.

If processing fails, the operation must remain pending until safely reconciled.

11.1 Atomic Processing

Reward record creation and balance updates must be handled atomically where required.

A partial operation must not result in:

- A reward without a corresponding ledger record.
- A balance update without a valid reward record.
- Duplicate reward crediting.
- Exceeding the approved category allocation.

12. ACCOUNT VALIDITY REQUIREMENTS

12.1 Initial Validity

A new account requires 21 successful sessions to become VALID.

Only backend-confirmed successful sessions count.

During this period:

- Regular Mining Reward follows the approved rules.
- Referral Bonus is unavailable to the user.

12.2 Inactivity

After becoming VALID, the account must complete at least one successful session within every rolling window of 90 scheduled session slots.

The counter:

- Applies only to VALID accounts.
- Counts scheduled session slots, not calendar days.
- Resets only after a successful session.
- Does not reset on activation alone.

If no successful session occurs within the next 90 slots, the account becomes permanently CANCELLED.

12.3 Cancellation

Cancelled accounts cannot be reactivated.

The remaining virtual balance is transferred to the App Reserve according to the approved forfeiture rule.

Required accounting and audit records must be preserved.

13. REFERRAL REQUIREMENTS

The referral engine must enforce:

- Unique permanent username-based referral codes.
- No self-referral.
- Maximum 10 direct referrals.
- Valid referral relationship creation.
- Same-session eligibility checks.
- At least three active direct referrals for the referrer.
- Maximum one Referral Bonus share per user per session.
- One lifetime Referral Group change.

13.1 Group Change

Group change is allowed only after the initial 21 successful sessions and VALID status.

A successful change:

- Takes effect from the next new session.
- Does not change existing balances.
- Resets the user's 21-session validity progress.
- Disables Referral Bonus until VALID status is restored.
- Suspends the 90-slot inactivity counter during rebuilding.

The backend must enforce the complete group-change policy.

14. KYC REQUIREMENTS

KYC becomes mandatory only after all 2,160 effective sessions are completed.

Requirements:

- No KYC requirement during registration.
- No KYC requirement during initial 21 sessions.
- No KYC requirement before final effective-session completion.
- Pending KYC may temporarily lock the eligible balance.
- Pending KYC alone must not forfeit the balance.

Provider, accepted documents, and verification workflow remain subject to separate approval.

15. PUBLIC LEDGER REQUIREMENTS

The backend must publish an application-operated public ledger after validating session and transaction records.

The ledger must be:

- Append-only.
- Hash-linked.
- Digitally signed.
- Timestamped.
- Publicly inspectable.
- Cryptographically verifiable.

It is not a decentralized or trustless blockchain.

15.1 Public Record Fields

- Block Number.
- Block Hash.
- Previous Block Hash.
- Backend Digital Signature.
- Block Publishing Time UTC.
- Session Number.
- Session Close Time UTC.
- Transaction ID.
- User ID.
- Transaction Amount SAC.
- Transaction Purpose.
- Session Confirmation.
- Total Balance.

15.2 Public Verification

The Explorer must provide the public verification key.

Users must be able to verify block hashes and digital signatures.

Historical public keys must remain available.

15.3 Correction Requirements

Published blocks must never be silently modified or deleted.

Corrections require:

1. Correction request.
2. Backend validation.
3. Main Admin approval.
4. New Correction Block.
5. Reference to original block.
6. Correction reason.
7. Audit Log entry.

The original block must remain visible.

16. DATABASE REQUIREMENTS

The database must preserve:

- User accounts.
- Authentication-related records.
- Referral relationships.
- Mining sessions.
- Session activations.
- Reward records.
- Balance history.
- Account status history.
- KYC status.
- Public ledger blocks.
- Digital signature metadata.
- Administrative requests.
- Audit logs.
- Notifications.
- Backup history.

Requirements:

- Enforce unique identifiers.
- Enforce foreign-key relationships where appropriate.
- Use atomic transactions for critical operations.
- Prevent duplicate reward records.
- Maintain data integrity.
- Support backup and recovery.
- Record relevant schema changes.

The final database schema is defined in the Database Schema document.

17. ADMINISTRATIVE REQUIREMENTS

The system must support:

- Main Admin.
- Sub-Admin.

Only Main Admin has final approval authority.

Sub-Admins may verify information, inspect evidence, and prepare reports.

Administrative workflows must follow:

Request Received → Sub-Admin Verification → Main Admin Review → Approve/Reject → Backend Action.

Administrators must not directly edit reward balances or delete ledger records.

All important actions must be recorded in the Audit Log.

18. SECURITY REQUIREMENTS

The system must implement:

- Secure authentication.
- Password hashing.
- Authorization.
- API rate limiting.
- Input validation.
- Session integrity checks.
- Referral fraud detection.
- Idempotent reward processing.
- Database access controls.
- Secure key management.
- Encrypted backups.
- Audit logging.
- Admin 2FA.
- Secure recovery procedures.
- Protection against duplicate transactions.
- Public data privacy controls.

The detailed controls are defined in the Security Specification.

19. NOTIFICATION REQUIREMENTS

The system must support In-App and Push notifications.

Notification events include:

- Session availability.
- Activation confirmation.
- Session completion.
- Reward crediting.
- Referral Bonus.
- Group change.
- Account validity.
- Account suspension.
- Account reactivation.
- Account cancellation.
- KYC requirement.
- KYC verification.
- Maintenance.
- System announcements.

If push permission is denied, In-App notification history must remain available.

Deleting a notification must not delete underlying system records.

20. BACKUP AND RECOVERY REQUIREMENTS

An encrypted backup must be created after every effective mining session.

Approved backup destinations:

- Laptop backup.
- Separate SAECOIN Google Drive backup.
- Manual Pen Drive backup through the Admin Panel.

Requirements:

- Encryption.
- Integrity verification.
- Backup history.
- Failure alerts.
- Recovery testing.
- Secure recovery key management.

Monthly recovery testing must be performed.

After an outage, incomplete sessions and rewards must be validated before processing resumes.

Required administrative approval must be completed before recovery reward processing.

21. MAINTENANCE REQUIREMENTS

During maintenance:

- New session activation must stop.
- Affected reward processing must stop safely.
- Existing balances must remain intact.
- Existing ledger records must be preserved.
- The application must display maintenance status.
- Users must receive appropriate notifications.

After maintenance:

- Validate backend integrity.
- Reconcile pending operations.
- Prevent duplicate processing.
- Resume services safely.
- Record maintenance completion.

22. PERFORMANCE REQUIREMENTS

The application and backend should provide:

- Responsive navigation.
- Efficient API communication.
- Pagination for long histories.
- Controlled background processing.
- Efficient database queries.
- Safe retry handling.
- Appropriate caching of non-authoritative data.

Caching must never replace backend validation for session eligibility, reward status, or account status.

Performance targets and capacity limits must be finalized during infrastructure planning and load testing.

23. ERROR HANDLING REQUIREMENTS

The system must handle:

- Network interruption.
- Backend unavailable.
- Database unavailable.
- Authentication expiration.
- Invalid input.
- Duplicate request.
- Unauthorized operation.
- Session processing failure.
- Reward processing failure.
- Ledger publishing failure.
- Backup failure.
- Recovery failure.

Errors must be recorded appropriately.

The frontend must display understandable messages without exposing internal server details.

24. TESTING REQUIREMENTS

Testing must cover:

- Android compatibility.
- iOS compatibility.
- Authentication.
- Registration.
- Session scheduling.
- UTC boundary conditions.
- Session activation.
- Session completion.
- Reward calculations.
- Allocation limits.
- Duplicate processing.
- Referral eligibility.
- Group changes.
- Account validity.
- Inactivity cancellation.
- KYC locking.
- Ledger integrity.
- Digital signature verification.
- Correction blocks.
- Admin approval.
- Backup and recovery.
- Security.
- Performance.
- Maintenance.

Critical failures must block release.

25. DEPLOYMENT REQUIREMENTS

The application must support separate development, testing, and production configurations.

Requirements:

- Environment-specific API configuration.
- Secure production secrets.
- Android build and signing configuration.
- iOS build and signing configuration.
- Release versioning.
- Backend compatibility checks.
- Database migration checks.
- Release validation.
- Rollback and recovery planning.

Production secrets must never be committed to the repository.

26. TECHNICAL CONSTRAINTS

The following constraints are mandatory:

1. React Native + Expo + TypeScript remains the approved mobile stack.
2. Android and iOS use the same backend.
3. Backend time is authoritative.
4. All reward calculations are backend-controlled.
5. Total supply remains 31,000,000 SAC.
6. Total effective sessions remain 2,160.
7. Regular Mining pool remains 6,000 SAC per session.
8. Referral Bonus pool remains 2,000 SAC per session.
9. Total session pool remains 8,000 SAC.
10. Node Mining allocation remains zero.
11. The current application ledger is not a decentralized blockchain.
12. No user-facing blockchain wallet address is required.
13. App Reserve distribution remains undecided.
14. KYC provider and verification details remain undecided.
15. No guaranteed market value or financial return may be promised.

27. FINAL TECHNICAL POLICY

All implementation must follow the approved project specifications.

The backend remains authoritative for all critical operations.

The mobile application must remain a presentation and interaction layer.

Security, data integrity, deterministic reward processing, auditability, and recoverability take priority over development speed.

Any change affecting tokenomics, mining rules, referral rules, account validity, or public ledger behavior must be documented and reviewed before implementation.

---

END OF DOCUMENT

Next Document: 05 — App Architecture Specification
