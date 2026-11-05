SAECOIN — SECURITY SPECIFICATION

Document ID: SAECOIN-SEC-010
Version: 1.0
Project: SAECOIN App
Ticker: SAC (Provisional)
Status: Draft
Scope: Android App, Backend, Database, APIs, Rewards and Administration

---

1. PURPOSE

This document defines the security requirements and protection mechanisms for the SAECOIN App.

The objective is to protect:

- User accounts.
- Authentication credentials.
- Personal information.
- Mining sessions.
- Virtual SAC rewards.
- Referral relationships.
- Reward ledger records.
- Backend services.
- Database records.
- Administrative operations.
- Application infrastructure.

Security must be considered throughout development, testing, deployment, and maintenance.

2. SECURITY PRINCIPLES

The project must follow these principles:

1. Security by design.
2. Least privilege.
3. Defense in depth.
4. Secure defaults.
5. Backend-authoritative validation.
6. Data minimization.
7. Separation of responsibilities.
8. Secure error handling.
9. Auditable administrative operations.
10. Regular security testing.

The application must never rely exclusively on client-side security controls.

3. SECURITY SCOPE

Security requirements apply to:

Component| Security Responsibility
Android App| Protect local data and communicate securely.
Backend| Authenticate users and enforce application rules.
Database| Protect user, mining, referral and reward records.
API| Validate requests and enforce authorization.
Admin Panel| Restrict administrative access and operations.
Infrastructure| Protect servers, configuration and secrets.
CI/CD| Protect source code and release processes.

4. TRUST BOUNDARIES

The Android application must be treated as an untrusted client.

Users or attackers may:

- Modify application files.
- Inspect application requests.
- Change local application data.
- Modify device time.
- Replay API requests.
- Use modified application versions.
- Attempt unauthorized API access.
- Automate registration or mining requests.

Therefore:

1. The backend must verify every sensitive operation.
2. The backend must not trust client-provided account status.
3. The backend must not trust client-provided Mining Power.
4. The backend must not trust client-provided reward amounts.
5. The backend must not trust client-provided session completion status.
6. The backend must independently validate referral eligibility.
7. The database must enforce appropriate integrity constraints.

5. AUTHENTICATION SECURITY

Authentication must be implemented and verified by the backend.

Required protections:

- Secure registration.
- Secure login.
- Secure password handling.
- Account verification where required.
- Credential recovery.
- Login attempt protection.
- Session management.
- Logout and session revocation.

The exact authentication framework and verification method remain TBD.

5.1 Password Security

If password-based authentication is used:

- Passwords must never be stored in plaintext.
- Passwords must be hashed using a recognized password-hashing algorithm.
- Use a unique salt for each password.
- Use an appropriately configured password-hashing work factor.
- Do not create custom password-hashing algorithms.
- Do not log passwords.
- Do not return passwords in API responses.
- Do not store user passwords in ordinary app storage.

The final password policy must be documented before implementation.

5.2 Login Protection

The backend must protect login endpoints against:

- Brute-force attempts.
- Credential stuffing.
- Automated login attempts.
- Excessive verification requests.
- Account enumeration.

Possible controls include:

- Rate limiting.
- Temporary request throttling.
- Suspicious activity detection.
- Secure verification challenges where appropriate.

Account lockout behavior must avoid creating an easy denial-of-service mechanism against legitimate users.

5.3 Account Recovery

Account recovery must:

- Verify account ownership.
- Use short-lived recovery tokens or codes.
- Prevent reuse of expired recovery tokens.
- Limit recovery attempts.
- Avoid revealing whether an account exists unnecessarily.
- Revoke affected sessions after a successful credential reset when appropriate.

The exact recovery method is TBD.

6. SESSION SECURITY

Authentication sessions must be controlled by the backend.

Requirements:

1. Generate unpredictable session identifiers or secure tokens.
2. Use HTTPS for authentication and session communication.
3. Set appropriate token expiration.
4. Support server-side session revocation.
5. Revoke sessions after logout.
6. Protect against token replay.
7. Avoid exposing tokens in logs.
8. Support logout from other devices where applicable.
9. Handle expired sessions safely.
10. Do not accept revoked sessions.

The final session architecture is TBD.

6.1 Token Storage

If token-based authentication is selected:

- Store sensitive tokens using appropriate Android secure-storage facilities.
- Do not store authentication tokens in ordinary unprotected preferences.
- Do not hardcode signing secrets in the application.
- Do not embed server-side private keys in the Android package.
- Clear local authentication data after logout.
- Handle token expiration and revocation.

6.2 Sensitive Operations

Sensitive operations may require additional authentication or verification.

Examples:

- Password changes.
- Account recovery.
- Sensitive profile changes.
- Account cancellation.
- Administrative actions.

The exact step-up authentication policy is TBD.

7. AUTHORIZATION SECURITY

Authentication confirms who the user is.

Authorization determines what that user is allowed to do.

The backend must enforce authorization on every protected endpoint.

Required controls:

- Users may access only their own protected information.
- Users must not modify another user's mining sessions.
- Users must not modify another user's reward records.
- Users must not change referral ownership.
- Ordinary users must not access administrative functions.
- Suspended accounts must not perform prohibited operations.
- Cancelled accounts must not regain eligibility through client manipulation.

The backend must not rely on hidden buttons or disabled frontend controls as authorization.

8. ANDROID APPLICATION SECURITY

The Android application must follow secure development practices.

Requirements:

- Request only necessary permissions.
- Protect locally stored sensitive data.
- Avoid unnecessary external components.
- Validate deep links.
- Protect exported components.
- Avoid leaking sensitive information through logs.
- Avoid insecure WebView configurations.
- Use trusted dependencies.
- Protect release signing credentials.
- Review application permissions before release.

8.1 Local Data Protection

Sensitive information must not be stored in ordinary unprotected files.

Examples of sensitive information:

- Authentication tokens.
- Personal account information.
- Recovery data.
- Private configuration values.

Use appropriate Android platform security features.

Do not store:

- User passwords in plaintext.
- Server private keys.
- Database credentials.
- Production API secrets.
- Administrative credentials.

8.2 Application Integrity

The project should consider protection against:

- Modified application packages.
- Debugging in production builds.
- Runtime tampering.
- Unauthorized code modification.
- Malicious application overlays where relevant.

Integrity checks may provide additional risk signals, but they must not replace backend authorization and validation.

9. NETWORK SECURITY

All production communication between the Android application and backend must use HTTPS.

Requirements:

1. Do not use production HTTP endpoints.
2. Validate server certificates.
3. Do not disable TLS certificate validation.
4. Protect authentication tokens in transit.
5. Avoid sending sensitive information through URL query parameters.
6. Do not expose secrets in network error messages.
7. Apply appropriate request timeouts.
8. Validate responses before processing them.

Development environments may use local HTTP where necessary, but such settings must not be included in production builds.

Certificate pinning may be evaluated separately. It must not be implemented without a certificate rotation and recovery plan.

10. API SECURITY

Every API endpoint must validate its input.

Security requirements:

- Authentication for protected operations.
- Authorization for protected resources.
- Input validation.
- Output validation.
- Request size limits.
- Rate limiting.
- Consistent error handling.
- Safe serialization.
- API version control.
- Protection against replay and duplicate requests where necessary.

The backend must not expose stack traces, database errors, internal paths, secrets, or private configuration details to users.

10.1 API Abuse Protection

Apply appropriate limits to:

- Login requests.
- Registration requests.
- Verification requests.
- Referral validation.
- Mining session activation.
- Mining session completion.
- Reward-related requests.
- Administrative endpoints.

Rate limits must be configurable and enforced server-side.

10.2 Idempotency

Sensitive operations must prevent duplicate processing.

Examples:

- Mining session activation.
- Session completion.
- Reward settlement.
- Referral bonus processing.
- Account cancellation.

Use appropriate unique operation identifiers, database constraints, or idempotency mechanisms.

Repeated requests must not create duplicate rewards or duplicate sessions.

11. MINING SESSION SECURITY

Mining sessions are virtual App Mining activities.

They are not real blockchain Proof-of-Work mining.

The backend must be authoritative for all mining session decisions.

Mandatory protections:

1. The backend records the official session start time.
2. The backend determines session completion.
3. The backend validates the required eight-hour duration.
4. The backend enforces the maximum three sessions per project-defined day.
5. The backend prevents duplicate session activation.
6. The backend rejects unauthorized session completion.
7. The backend validates account eligibility.
8. The backend prevents client-side session manipulation.
9. The backend maintains session history.
10. The backend records relevant security events.

11.1 Device Clock Manipulation

The device clock must never determine whether a mining session is valid.

Changing the phone's date or time must not:

- Complete a session early.
- Create additional sessions.
- Bypass the daily limit.
- Change reward eligibility.
- Modify the official session duration.

Use backend timestamps as the authoritative time source.

11.2 Session Replay Protection

The backend must reject:

- Repeated activation requests that create duplicate sessions.
- Repeated completion requests that create duplicate rewards.
- Requests referencing another user's session.
- Requests using invalid session identifiers.
- Requests for already-finalized sessions.

11.3 Session State Protection

Only approved state transitions are allowed.

The client must not directly set a session to SUCCESSFUL or COMPLETED.

The backend must validate the session before changing its authoritative status.

12. REWARD SECURITY

Virtual SAC rewards are sensitive application records.

The backend must control:

- Reward eligibility.
- Mining Power calculations.
- Daily reward budgets.
- Reward settlement.
- Reward adjustments.
- Reward history.
- Main Reward Pool accounting.

12.1 Reward Calculation Protection

The client must never be authoritative for reward calculations.

The backend must:

1. Validate successful mining sessions.
2. Calculate eligible Mining Power.
3. Apply approved reward formulas.
4. Enforce daily reward budgets.
5. Enforce the total App Mining allocation.
6. Apply approved rounding rules.
7. Record reward results.
8. Prevent duplicate settlement.

12.2 Reward Ledger Security

The reward ledger must be treated as an authoritative financial-style audit record, even though SAC is a virtual application reward.

Requirements:

- Preserve historical entries.
- Prevent unauthorized edits.
- Prevent silent deletion.
- Record adjustments as separate entries.
- Maintain transaction integrity.
- Prevent duplicate reward entries.
- Restrict administrative access.
- Reconcile cached balances against the ledger.

A displayed balance must not be treated as more authoritative than the reward ledger.

12.3 Reward Budget Protection

The backend must prevent:

- Exceeding the approved daily regular mining budget.
- Exceeding the approved daily referral budget.
- Exceeding the total daily budget.
- Exceeding the approved App Mining allocation.
- Concurrent settlement from exceeding available limits.

Budget checks and reward recording must be performed safely under concurrent requests.

The provisional allocation remains subject to the Mining Reward Specification.

13. REFERRAL SECURITY

The referral system must prevent:

- Self-referral.
- Duplicate referral relationships.
- Referral limit bypass.
- Unauthorized referral changes.
- Fake account creation.
- Referral bonus manipulation.
- Duplicate referral reward processing.

The backend must verify:

- Referral code ownership.
- Referral relationship validity.
- The 10 accepted referral limit.
- The referred user's 21 successful sessions.
- Each participant's active mining eligibility.
- Referral bonus budget availability.

Referral bonus eligibility must remain independent for the referrer and referred user.

The exact referral bonus percentage remains TBD.

14. ACCOUNT STATUS AND CANCELLATION SECURITY

The backend must control account status.

The client must not be able to change:

- Account validity.
- Account suspension.
- Mining eligibility.
- Referral eligibility.
- Cancellation status.

Account cancellation must follow an approved workflow.

If an account is cancelled:

- Normal login access must be restricted according to policy.
- Mining eligibility must be revoked.
- Referral eligibility must be revoked.
- Reward handling must follow the approved reward policy.
- Historical ledger records must be preserved.
- Relevant actions must be audited.

The proposed 90-consecutive-day inactivity policy remains subject to final approval.

15. DATABASE SECURITY

The database must be protected against unauthorized access and modification.

Requirements:

- Use restricted database accounts.
- Apply least-privilege permissions.
- Do not expose database ports publicly without an approved secure design.
- Protect database credentials.
- Use encrypted connections where supported and appropriate.
- Validate database inputs through safe parameterized queries.
- Maintain appropriate constraints and indexes.
- Protect backups.
- Monitor database access.
- Test recovery procedures.

15.1 Database Credentials

Database credentials must:

- Never be committed to GitHub.
- Never be embedded in mobile application code.
- Never be exposed through public APIs.
- Be supplied through protected server configuration.
- Be rotated when compromise is suspected.

15.2 Data Integrity

Important operations must use appropriate database transactions.

Examples:

- Referral acceptance.
- Mining session creation.
- Session completion.
- Reward settlement.
- Reward adjustments.
- Account cancellation.

The database must prevent duplicate records and inconsistent reward states.

16. SECRET MANAGEMENT

The following are considered secrets:

- Database passwords.
- Authentication signing keys.
- API credentials.
- Email provider credentials.
- Admin credentials.
- Encryption keys.
- Production environment secrets.

Mandatory rules:

1. Never commit secrets to the repository.
2. Never place secrets in Android source code.
3. Never include secrets in application assets.
4. Never print secrets in logs.
5. Restrict access to production secrets.
6. Rotate compromised credentials.
7. Separate development and production configuration.
8. Use an approved secret-management approach.

The final secret-management implementation is TBD.

17. ADMINISTRATIVE SECURITY

Administrative functions require stronger protection than ordinary user functions.

Requirements:

- Separate admin authentication.
- Role-based authorization.
- Least-privilege permissions.
- Strong credential policy.
- Additional authentication for sensitive actions where appropriate.
- Administrative activity logging.
- Session expiration.
- Protection against unauthorized privilege escalation.

17.1 Administrative Actions

Sensitive actions include:

- Suspending accounts.
- Cancelling accounts.
- Revoking referrals.
- Adjusting rewards.
- Changing reward budgets.
- Modifying mining rules.
- Changing system configuration.
- Managing administrator accounts.

Every sensitive action must record:

- Administrator identity.
- Action type.
- Target record.
- Timestamp.
- Reason.
- Relevant before-and-after values where appropriate.

17.2 Separation of Duties

Where practical, high-risk operations should require an additional review or approval.

The exact approval policy is TBD.

Administrators must not use ordinary user endpoints to bypass administrative controls.

18. AUDIT LOGGING AND MONITORING

The backend must record important security events.

Examples:

- Login success and failure.
- Account recovery.
- Password changes.
- Session creation and revocation.
- Suspicious mining activity.
- Referral changes.
- Reward processing.
- Reward adjustments.
- Account suspension and cancellation.
- Administrative actions.
- Configuration changes.

Audit records must be protected from unauthorized modification.

Logs must not contain:

- Plaintext passwords.
- Authentication tokens.
- Private keys.
- Recovery secrets.
- Unnecessary sensitive personal information.

Monitoring and alert thresholds are TBD.

19. PRIVACY AND PERSONAL DATA

The project must collect only information necessary for application functionality, security, and approved operations.

Requirements:

- Explain why personal data is collected.
- Limit access to personal data.
- Avoid unnecessary data retention.
- Protect personal information in transit and at rest.
- Avoid exposing user information through referral endpoints.
- Avoid collecting private social media credentials.
- Do not scrape private contact lists without explicit consent and approved design.
- Provide an appropriate account and data-request process.

The final privacy policy and retention periods must be approved before public launch.

Applicable Malaysian privacy requirements must be reviewed before production deployment.

20. THIRD-PARTY DEPENDENCY SECURITY

All external libraries and services must be reviewed before use.

Review:

- Maintenance status.
- Known vulnerabilities.
- License.
- Package source.
- Required permissions.
- Security update history.
- Data access requirements.

Do not install untrusted packages or execute unreviewed installation scripts.

Remove unused dependencies.

Maintain dependency lock files where supported.

21. ADVERTISEMENT AND EXTERNAL SERVICE SECURITY

Any advertisement or external service integration must follow its provider's official security and privacy requirements.

Rules:

- Do not expose user credentials to advertisement providers.
- Do not send unnecessary personal information.
- Validate external callbacks.
- Do not trust client-reported ad completion without approved verification.
- Do not award rewards based solely on an unverified client event.
- Protect external service credentials.
- Document third-party data sharing.

The final advertisement provider and reward verification method are TBD.

22. BACKUP AND RECOVERY SECURITY

The backend must maintain a documented backup and recovery process.

Requirements:

- Protect backup files.
- Restrict backup access.
- Encrypt sensitive backups where appropriate.
- Keep production credentials separate from backups.
- Test restoration procedures.
- Preserve reward ledger integrity.
- Document recovery responsibilities.
- Monitor backup failures.

Backup frequency, retention period, recovery time objective, and recovery point objective are TBD.

23. SECURITY INCIDENT RESPONSE

The project must establish an incident response process.

Potential incidents include:

- Account compromise.
- Credential exposure.
- Database compromise.
- Unauthorized reward modification.
- Mining session manipulation.
- Referral fraud.
- Server compromise.
- Leaked API credentials.
- Malicious application release.

The response process should include:

1. Detect and report.
2. Assess severity.
3. Contain the incident.
4. Revoke affected credentials or sessions.
5. Preserve relevant evidence.
6. Investigate the cause.
7. Restore secure operation.
8. Notify affected parties where required.
9. Document corrective actions.

The final incident response contacts and reporting channels are TBD.

24. SECURITY TESTING REQUIREMENTS

Security testing must be performed during development and before production release.

Required testing categories:

- Authentication testing.
- Authorization testing.
- Session management testing.
- API security testing.
- Input validation testing.
- Database security testing.
- Android local storage testing.
- Network security testing.
- Mining session manipulation testing.
- Reward integrity testing.
- Referral abuse testing.
- Admin privilege testing.
- Dependency vulnerability scanning.
- Backup and recovery testing.

Security testing should use the OWASP Mobile Application Security Verification Standard and the relevant Mobile Application Security Testing Guide as references.

The backend API should also be assessed against an appropriate server-side security verification standard.

25. SECURITY ACCEPTANCE CRITERIA

The application must not be considered production-ready until:

- Authentication is enforced server-side.
- Authorization checks protect all sensitive endpoints.
- Session revocation works.
- Production network communication uses HTTPS.
- Secrets are not exposed in source code or application packages.
- Database access is restricted.
- Mining session validation is backend-authoritative.
- Duplicate reward processing is prevented.
- Reward budgets cannot be bypassed through concurrent requests.
- Referral abuse protections are implemented.
- Administrative permissions are tested.
- Audit logging is operational.
- Backup restoration has been tested.
- Critical and high-severity security findings have been resolved or formally accepted by the responsible project owner.

26. DEVELOPMENT AND RELEASE SECURITY

Development and production environments must be separated.

Production release requirements:

- Review application permissions.
- Review dependencies.
- Protect release signing keys.
- Use production HTTPS endpoints.
- Remove development-only configurations.
- Disable unnecessary debugging features.
- Verify secret scanning.
- Run required security tests.
- Review administrative access.
- Prepare a rollback and recovery plan.

Production credentials must never be included in public repository files.

27. OPEN SECURITY DECISIONS

The following decisions must be finalized before implementation or production release:

1. Authentication method.
2. Account verification method.
3. Password policy.
4. Session architecture.
5. Access token and refresh token policy, if applicable.
6. Token expiration and revocation rules.
7. Sensitive-operation re-authentication policy.
8. Account recovery method.
9. Admin multi-factor authentication policy.
10. Secret-management implementation.
11. Database encryption and connection policy.
12. Backup frequency and retention.
13. Log retention period.
14. Incident response contacts.
15. Privacy and personal-data retention policy.
16. Advertisement provider security requirements.
17. Production infrastructure security configuration.

No developer may silently treat these open decisions as finalized.

28. CROSS-DOCUMENT CONSISTENCY

This document must remain consistent with:

- "01-App-PRD.md"
- "03-App-Flow-Specification.md"
- "04-Technical-Requirements.md"
- "05-App-Architecture.md"
- "06-Backend-Specification.md"
- "07-Database-Schema.md"
- "08-Mining-Reward-Specification.md"
- "09-Referral-Specification.md"
- "11-Testing-Strategy.md"
- "12-Release-and-Launch-Plan.md"

Important shared rules:

- The Android application is an untrusted client.
- Backend validation is authoritative.
- Device time cannot determine mining session validity.
- Mining sessions require backend verification.
- Reward calculations must be protected.
- Reward ledger history must be preserved.
- Referral eligibility must be independently verified.
- Account cancellation must follow an approved policy.
- Virtual SAC must not be represented as guaranteed monetary value or on-chain cryptocurrency.

29. FINAL SECURITY POLICY

Security is a mandatory requirement for every SAECOIN App component.

No user, administrator, or application client may bypass backend security controls.

Sensitive account, mining, referral, and reward operations must be authenticated, authorized, validated, and auditable.

Security issues must be resolved before production release according to their severity and risk.

The project must continuously review and improve its security controls as the application evolves.

---

END OF DOCUMENT
