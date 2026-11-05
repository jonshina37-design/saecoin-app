SAECOIN — BACKEND SPECIFICATION

Version: 1.0
Project: SAECOIN App
Ticker: SAC (Provisional)
Status: Draft
Document Type: Backend Technical Specification

---

1. PURPOSE

This document defines the backend requirements, responsibilities, API behavior, business logic, security controls, and operational requirements for the SAECOIN App.

The backend is responsible for managing:

- User accounts.
- Authentication and authorization.
- Community verification status.
- Mining sessions.
- Mining eligibility.
- Mining Power.
- Reward calculations.
- Reward ledger.
- Referral relationships.
- Account validity.
- Account inactivity and cancellation.
- Notifications.
- Administrative operations.

The backend must remain the authoritative source of truth for all account, mining, and reward-related operations.

2. PROJECT SCOPE

This specification covers the SAECOIN App backend only.

It does not define or implement:

- Blockchain full nodes.
- Proof-of-Work consensus.
- CPU mining.
- GPU mining.
- UTXO processing.
- On-chain transactions.
- Blockchain wallet infrastructure.

App Mining is a virtual reward distribution mechanism.

No real blockchain mining occurs through the mobile application.

The future SAECOIN blockchain will be developed separately.

3. BACKEND ARCHITECTURE

The backend should use a modular architecture.

SAECOIN BACKEND
│
├── API Layer
│   ├── Authentication API
│   ├── User API
│   ├── Mining API
│   ├── Reward API
│   ├── Referral API
│   ├── Community API
│   ├── History API
│   └── Admin API
│
├── Business Logic Layer
│   ├── Authentication Service
│   ├── User Service
│   ├── Mining Service
│   ├── Reward Service
│   ├── Referral Service
│   ├── Community Service
│   ├── Account Validity Service
│   └── Notification Service
│
├── Background Processing
│   ├── Session Processor
│   ├── Reward Processor
│   ├── Inactivity Checker
│   ├── Referral Processor
│   └── Notification Processor
│
├── Data Access Layer
│
└── Database

Each module must have a clearly defined responsibility.

Business rules must not be implemented exclusively inside the mobile application.

4. TECHNOLOGY REQUIREMENTS

The backend must support:

- Self-hosted deployment.
- REST API communication.
- Secure authentication.
- Relational data integrity.
- Background processing.
- Database transactions.
- Automated testing.
- Logging and monitoring.
- Backup and recovery.

The backend framework, programming language, database engine, and authentication implementation remain subject to final technology selection.

A lightweight self-hosted backend is preferred.

The system must not require Firebase, Supabase, or another third-party hosted backend as mandatory infrastructure.

External integrations may be used through isolated adapters where necessary.

5. API DESIGN

The backend will expose versioned REST APIs.

Base path:

"/api/v1/"

All API responses should use a consistent JSON structure.

5.1 Standard Success Response

{
  "success": true,
  "message": "Request completed successfully",
  "data": {},
  "error": null
}

5.2 Standard Error Response

{
  "success": false,
  "message": "Request could not be completed",
  "data": null,
  "error": {
    "code": "INVALID_REQUEST",
    "details": {}
  }
}

Sensitive internal information must never appear in API error responses.

5.3 HTTP Status Codes

Use appropriate HTTP status codes:

- "200" — Successful request.
- "201" — Resource created.
- "204" — Successful request without response body.
- "400" — Invalid request.
- "401" — Authentication required.
- "403" — Operation not permitted.
- "404" — Resource not found.
- "409" — Conflict or duplicate operation.
- "422" — Business rule validation failed.
- "429" — Rate limit exceeded.
- "500" — Internal server error.
- "503" — Service temporarily unavailable.

6. AUTHENTICATION AND AUTHORIZATION

The backend must support secure account authentication.

Required functionality:

- Account registration.
- Login.
- Logout.
- Session invalidation.
- Password recovery.
- Account verification.
- Access token validation.
- Protected API access.

The final authentication mechanism must be selected before implementation.

If token-based authentication is selected:

- Access tokens must have limited lifetimes.
- Refresh tokens must be protected.
- Token rotation and revocation must be supported.
- Sensitive tokens must not appear in application logs.
- Expired or revoked tokens must be rejected.

All protected API endpoints must verify the authenticated user's identity.

A user must not be able to access another user's private information by changing an ID in an API request.

7. USER ACCOUNT API

Suggested endpoints:

Method| Endpoint| Purpose
POST| "/auth/register"| Register account
POST| "/auth/login"| Authenticate user
POST| "/auth/logout"| End session
POST| "/auth/refresh"| Refresh authentication
POST| "/auth/forgot-password"| Request password recovery
POST| "/auth/reset-password"| Reset password
GET| "/users/me"| Get current user
PATCH| "/users/me"| Update permitted profile fields
GET| "/users/me/status"| Get account status

The backend must validate registration data and prevent duplicate accounts according to the finalized account policy.

8. ACCOUNT STATUS MANAGEMENT

The backend must maintain an authoritative account status.

Suggested statuses:

- "PENDING_VERIFICATION"
- "ACTIVE"
- "MINING_ELIGIBLE"
- "INVALID"
- "SUSPENDED"
- "CANCELLED"

The final state transition rules must be documented and implemented consistently.

Only authorized backend operations may change account eligibility.

The mobile application may display account status but must not independently determine it.

9. COMMUNITY VERIFICATION

Community participation is part of the App Mining eligibility requirements.

Required communities:

- Official Telegram.
- Official X.
- Official Facebook.

Suggested endpoints:

Method| Endpoint| Purpose
GET| "/community/status"| Get verification status
POST| "/community/verification/request"| Submit verification request
GET| "/community/requirements"| Get community requirements

The backend must store verification status and relevant audit information.

Important restrictions:

- Never request social media passwords.
- Never store third-party account passwords.
- Do not claim automatic membership verification unless supported by permitted official platform APIs.
- If automatic verification is unavailable, use an approved alternative verification procedure.
- Verification rules must be documented before implementation.

10. MINING SESSION MANAGEMENT

The backend controls all mining sessions.

10.1 Session Rules

Current project rules:

- Each session lasts 8 hours.
- A user can activate a maximum of 3 sessions per day.
- Each session must be activated manually.
- An active session continues even if the application is closed.
- A session becomes successful only after the full 8 hours and backend validation.
- The device clock must not determine session validity.
- Duplicate activation requests must be prevented.

10.2 Suggested Session Statuses

- "ACTIVE"
- "COMPLETED"
- "FAILED"
- "CANCELLED"

10.3 Mining API

Method| Endpoint| Purpose
POST| "/mining/sessions"| Activate mining session
GET| "/mining/sessions/current"| Get current session
GET| "/mining/sessions/history"| Get session history
GET| "/mining/status"| Get mining eligibility and status
GET| "/mining/limits"| Get daily session limits

10.4 Session Activation

When a user requests a new session, the backend must:

1. Authenticate the user.
2. Check account status.
3. Check community eligibility.
4. Check whether the user is allowed to mine.
5. Check whether another session is active.
6. Check the daily activation limit.
7. Create a unique session record.
8. Record the authoritative server start time.
9. Calculate the session end time.
10. Return the session information.

The operation must be atomic.

If activation fails, no partial mining session may be created.

10.5 Server Time Authority

The backend must control:

- Session start time.
- Session end time.
- Completion time.
- Daily activation limits.
- Reward processing time.

The mobile application may display a countdown, but the countdown is informational only.

Changing the device date or time must not change mining eligibility or session validity.

10.6 Duplicate Request Protection

Mining activation must support idempotency.

Repeated requests caused by network retries must not create multiple sessions.

The backend should use an idempotency key or an equivalent duplicate-request protection mechanism.

10.7 Session Completion

The backend must validate:

- Session ownership.
- Session status.
- Server-side start time.
- Server-side end time.
- Required session duration.
- Account status.
- Reward eligibility.

Only a valid session may be marked "COMPLETED".

The mobile application must never be allowed to directly mark a session as successful.

11. DAILY SESSION LIMIT

The maximum number of mining sessions is 3 per user per project-defined day.

The daily boundary must use a fixed server-side project timezone.

The timezone and exact daily reset policy must be finalized before implementation.

The backend must not use the device's local timezone to calculate the daily limit.

All activation attempts must be checked against the same authoritative daily accounting rule.

12. ACCOUNT VALIDITY

An account becomes valid after completing 21 successful mining sessions.

The backend must:

1. Count only successfully validated sessions.
2. Prevent duplicate session counting.
3. Update the account's successful session count.
4. Evaluate account validity.
5. Record the validity transition.
6. Update referral eligibility where applicable.

A failed, cancelled, or incomplete session must not count toward the 21-session requirement.

13. MINING REWARD MANAGEMENT

The backend is responsible for all reward calculations and allocations.

13.1 App Mining Allocation

The current proposed App Mining allocation is:

"5,000,000 SAC"

This allocation is separate from future blockchain mining and other future allocations.

13.2 Provisional Daily Budget

Category| Daily Budget
Regular Mining| 4,500 SAC
Referral Bonus| 1,000 SAC
Safety Reserve| 500 SAC
Total| 6,000 SAC

These figures remain provisional until the Mining Reward Specification is finalized.

13.3 Reward Processing

The backend must:

1. Validate session completion.
2. Obtain the applicable Mining Power.
3. Apply the approved reward formula.
4. Check the applicable daily budget.
5. Check the remaining App Mining allocation.
6. Calculate any eligible referral bonus.
7. Record the reward transaction.
8. Update the user's virtual reward balance.
9. Record the processing result.

All reward operations must be atomic and protected against duplicate processing.

13.4 Reward Ledger

The system must maintain an auditable reward ledger.

Suggested transaction types:

- "MINING_REWARD"
- "REFERRAL_BONUS"
- "REWARD_ADJUSTMENT"
- "REWARD_REVERSAL"
- "ACCOUNT_CANCELLATION_RETURN"

Ledger records must not be silently edited or deleted.

Corrections must use traceable adjustment or reversal records.

The reward ledger must preserve:

- User ID.
- Transaction type.
- Amount.
- Related session ID, where applicable.
- Related referral ID, where applicable.
- Creation timestamp.
- Processing status.
- Audit reference.

13.5 Virtual Reward Balance

The displayed SAC balance is a virtual App Mining balance.

It must not be represented as an on-chain balance.

The app must clearly communicate that virtual rewards are not blockchain transactions and do not guarantee market value.

No withdrawal or transfer functionality may be enabled unless a separate approved distribution policy is implemented.

14. REFERRAL MANAGEMENT

The backend must control all referral relationships and bonus calculations.

Current rules:

- A referrer may have a maximum of 10 accepted referrals.
- A referred account must complete 21 successful sessions to become valid.
- Both parties may qualify for a Mining Power bonus after the referred account becomes valid.
- Each participant must independently be actively mining for their own referral bonus to apply to that session.
- An inactive participant does not receive a banked or deferred bonus.
- One participant's eligibility must not depend on the other participant being active.

Suggested endpoints:

Method| Endpoint| Purpose
GET| "/referrals/me"| Get referral information
GET| "/referrals/me/list"| Get referred users
GET| "/referrals/me/summary"| Get referral summary
POST| "/referrals/validate"| Validate referral code

The backend must prevent:

- Self-referrals.
- Duplicate referral relationships.
- Invalid referral codes.
- Referral limit violations.
- Unauthorized referral changes.

The referral bonus percentage and exact Mining Power formula must follow the finalized Mining Reward Specification.

15. INACTIVITY AND ACCOUNT CANCELLATION

The current proposed inactivity rule is:

An account may be cancelled after 90 consecutive 8-hour session windows without activating a mining session.

This represents 720 hours, or 30 continuous days.

The precise time anchor and cancellation procedure must be finalized before implementation.

The backend must:

1. Track the last qualifying mining activation.
2. Evaluate inactivity using server-side timestamps.
3. Identify accounts reaching the approved inactivity threshold.
4. Apply the approved cancellation process.
5. Record the cancellation event.
6. Revoke applicable mining and referral eligibility.
7. Process unused virtual reward balances according to the approved policy.
8. Preserve required audit records.

Under the current proposed policy, unused virtual reward balances return to the Main Reward Pool.

Cancellation must not silently erase historical accounting records.

Any data deletion or anonymization must follow applicable privacy and legal requirements.

16. NOTIFICATION MANAGEMENT

The backend should support notifications for:

- Mining session activation.
- Mining session completion.
- Mining eligibility changes.
- Account validity.
- Referral qualification.
- Referral bonus events.
- Community verification.
- Security events.
- Account cancellation warnings.

Suggested endpoints:

Method| Endpoint| Purpose
GET| "/notifications"| Get notifications
PATCH| "/notifications/{id}/read"| Mark notification as read
POST| "/notifications/read-all"| Mark all as read

Push notification providers must not control mining or reward validity.

Notification delivery failure must not change a user's mining session or reward record.

17. ADMINISTRATIVE API

Administrative functionality must be protected by role-based access control.

Suggested roles:

- "SUPER_ADMIN"
- "ADMIN"
- "SUPPORT"
- "MODERATOR"
- "AUDITOR"

Suggested endpoints:

Method| Endpoint| Purpose
GET| "/admin/dashboard"| Administrative overview
GET| "/admin/users"| Search users
GET| "/admin/users/{id}"| View user details
PATCH| "/admin/users/{id}/status"| Manage permitted account status
GET| "/admin/mining/sessions"| Review sessions
GET| "/admin/rewards"| Review reward ledger
GET| "/admin/referrals"| Review referrals
GET| "/admin/audit-logs"| Review administrative activity

Administrative permissions must be limited by role.

Every sensitive administrative action must create an audit record.

No administrator should be able to silently alter historical reward records.

18. BACKGROUND PROCESSING

The backend must support reliable background processing.

Required tasks:

- Session completion checks.
- Reward processing.
- Referral eligibility updates.
- Inactivity checks.
- Account cancellation processing.
- Notification delivery.
- Scheduled maintenance.

Background jobs must be safe to retry.

A repeated job must not create duplicate rewards, duplicate session completions, or duplicate cancellation records.

Critical background jobs must record their execution status and errors.

19. DATABASE REQUIREMENTS

The database must support relational integrity and transactional operations.

Core entities should include:

- Users.
- Authentication sessions.
- Community verification records.
- Mining sessions.
- Reward ledger.
- Referral relationships.
- Account status history.
- Notifications.
- Administrative users.
- Audit logs.
- System configuration.

Database schema details will be defined separately in:

"07-Database-Schema.md"

The selected database engine must support the consistency and transaction requirements of mining and reward processing.

20. SECURITY REQUIREMENTS

Mandatory backend security controls:

- Secure password hashing.
- Authentication and authorization.
- Request validation.
- Rate limiting.
- Protection against unauthorized access.
- Protection against replay and duplicate requests.
- Secure secret management.
- Restricted administrative access.
- Audit logging.
- Secure database access.
- Dependency security review.
- Backup protection.
- Transport encryption for production deployments.

Sensitive data must not be exposed through:

- API responses.
- Application logs.
- Error messages.
- Debug endpoints.
- Public configuration files.

21. API RATE LIMITING

Rate limits must protect the backend against abuse.

Higher protection should be applied to:

- Login attempts.
- Registration.
- Password recovery.
- Mining activation.
- Referral validation.
- Administrative endpoints.

Rate limits must be configurable.

The backend should return "429 Too Many Requests" when a limit is exceeded.

Rate limiting must not accidentally prevent legitimate session completion or reward processing.

22. LOGGING AND AUDIT TRAILS

The backend must record important operational events.

Required logging categories:

- Authentication events.
- Account status changes.
- Mining activation.
- Mining completion.
- Reward processing.
- Referral qualification.
- Account cancellation.
- Administrative actions.
- Security events.
- Background job failures.

Logs must not contain passwords, access tokens, seed phrases, or other sensitive credentials.

Audit records must be protected against unauthorized modification.

23. DEPLOYMENT REQUIREMENTS

The backend must support local development and future self-hosted production deployment.

Development requirements:

- Local backend startup.
- Local database setup.
- Environment-based configuration.
- Database migrations.
- Test data support.
- Health-check endpoint.

Suggested health endpoint:

"GET /health"

Suggested readiness endpoint:

"GET /ready"

Health checks must distinguish between application availability and dependency readiness.

Production requirements:

- HTTPS.
- Secure environment configuration.
- Restricted database access.
- Monitoring.
- Backup and recovery.
- Controlled deployment.
- Database migration procedures.
- Error monitoring.

Production secrets must never be committed to GitHub.

24. BACKUP AND RECOVERY

The backend must support:

- Scheduled database backups.
- Backup integrity verification.
- Protected backup storage.
- Documented recovery procedures.
- Recovery testing.
- Reward ledger consistency checks.

Backup frequency and retention periods must be finalized before production launch.

Recovery procedures must prevent duplicate reward processing after restoration.

25. TESTING REQUIREMENTS

Backend testing must include:

- API unit tests.
- Authentication tests.
- Authorization tests.
- Mining session tests.
- Session duration validation.
- Duplicate activation tests.
- Daily session limit tests.
- Account validity tests.
- Reward calculation tests.
- Reward ledger consistency tests.
- Referral eligibility tests.
- Inactivity tests.
- Cancellation tests.
- Database transaction tests.
- Background job retry tests.
- Security tests.
- API integration tests.

Critical business rules must have automated tests.

26. EXTERNAL INTEGRATIONS

External services must be isolated behind dedicated integration modules.

Possible integrations:

- Email delivery.
- Push notifications.
- Advertising providers.
- Community platforms.
- Analytics.

External services must not become the authoritative source for:

- Account validity.
- Mining session completion.
- Reward calculation.
- Reward balances.
- Referral eligibility.

If an external service is unavailable, core accounting and mining data must remain consistent.

27. FUTURE BLOCKCHAIN INTEGRATION

The current backend manages virtual App Mining rewards only.

Future blockchain integration may introduce:

- On-chain distribution.
- Blockchain account mapping.
- Distribution eligibility checks.
- Distribution records.
- Transaction references.

These capabilities must be designed and implemented separately after the blockchain protocol and distribution policy are finalized.

The current backend must not pretend that virtual reward credits are already blockchain transactions.

28. OPEN DECISIONS

The following items require final approval before implementation:

1. Backend programming language and framework.
2. Database engine.
3. Authentication and token strategy.
4. Project-wide timezone and daily reset boundary.
5. Exact inactivity time anchor.
6. Community verification method.
7. Advertising provider and permitted ad flow.
8. Background job implementation.
9. Administrative interface technology.
10. Reward formula and referral bonus calculation.
11. Backup frequency and retention policy.
12. Production hosting and deployment approach.

These decisions must remain consistent with the PRD, Technical Requirements, App Architecture, Database Schema, Mining Reward Specification, and Security Specification.

29. FINAL BACKEND POLICY

The backend is the authoritative system for SAECOIN App account status, mining eligibility, session validation, reward calculations, referral eligibility, and virtual reward balances.

The mobile application must never independently approve mining sessions or create authoritative reward credits.

All critical operations must be secure, auditable, transactional, and protected against duplicate processing.

The App Mining backend must remain separate from the future SAECOIN blockchain implementation.

---

END OF DOCUMENT
