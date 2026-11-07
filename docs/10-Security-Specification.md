SAECOIN — SECURITY SPECIFICATION

Document: 10-Security-Specification.md
Version: 1.1
Project: SAECOIN App
Ticker: SAC (Provisional)
Status: Draft — Pending Approval

---

1. PURPOSE

This document defines the security requirements and controls for the SAECOIN App.

The objectives are to protect:

- User accounts.
- Authentication credentials.
- User profile information.
- Referral relationships.
- Mining session records.
- SAC reward balances.
- Reward ledger entries.
- KYC information.
- Administrative accounts.
- Backend services.
- Database records.
- Backup files.
- Public ledger signing keys.
- Recovery credentials.

SAECOIN is a centralized client-server application. The backend is the authoritative system for account status, session validation, referral eligibility, reward calculations, balances, and administrative actions.

Security controls must reflect this architecture.

2. SECURITY PRINCIPLES

The project must follow these principles:

1. Backend authority: security-critical decisions must be made by the backend.
2. Least privilege: users and administrators receive only the permissions required for their roles.
3. Defense in depth: sensitive operations must have multiple appropriate security controls.
4. Data minimization: collect and retain only necessary personal information.
5. Secure defaults: new accounts and services must start with restrictive permissions.
6. Auditability: sensitive actions must be recorded.
7. Integrity: reward and ledger records must not be silently altered.
8. Confidentiality: credentials, personal information, and private keys must remain protected.
9. Recoverability: backups and recovery procedures must be tested.
10. Fail safely: security failures must not result in unauthorized reward credit or data modification.

3. THREAT MODEL

The system must consider threats including:

- Unauthorized account access.
- Password theft.
- OTP theft or replay.
- Credential stuffing.
- Brute-force login attempts.
- Account enumeration.
- Fake or duplicate registrations.
- Referral manipulation.
- Session activation manipulation.
- Client-side reward modification.
- API abuse.
- Replay attacks.
- Duplicate reward credit.
- Unauthorized database access.
- Malicious administrator activity.
- Backup theft.
- Signing key compromise.
- Device compromise.
- Malware on user or administrator devices.
- Denial-of-service attacks.
- Data leakage.
- Unauthorized application updates.
- Supply-chain and dependency vulnerabilities.

The threat model must be reviewed as the system evolves.

4. ACCOUNT SECURITY

4.1 Registration

Registration must be processed and validated by the backend.

The backend must:

- Validate all required fields.
- Enforce unique usernames.
- Validate referral codes.
- Reject self-referral.
- Apply registration abuse controls.
- Avoid exposing sensitive account information.
- Create account records atomically.

Client-side validation may improve usability but must never replace backend validation.

4.2 Password Security

Passwords must never be stored in plaintext.

The backend must use a dedicated password-hashing algorithm designed for password storage, such as Argon2id, with appropriately configured parameters.

Requirements:

- Use a unique salt for each password.
- Store only password hashes and required hashing metadata.
- Never log passwords.
- Never include passwords in API responses.
- Protect password reset operations.
- Apply login attempt controls.
- Review hashing parameters as security recommendations evolve.

A general-purpose fast hash such as SHA-256 must not be used alone for password storage.

4.3 Login Protection

Login endpoints must implement appropriate controls against:

- Brute-force attempts.
- Credential stuffing.
- Automated abuse.
- Account enumeration.

Controls should include:

- Rate limiting.
- Progressive delays or temporary restrictions.
- Generic authentication error messages where appropriate.
- Security event logging.
- Session revocation after suspected compromise.

Permanent account cancellation must not be triggered automatically by ordinary failed login attempts.

4.4 Password Reset

Password reset must require a verified recovery method.

Requirements:

- Use short-lived, single-use reset tokens or OTPs.
- Do not expose whether an arbitrary username or email belongs to an account.
- Expire reset credentials after use or timeout.
- Revoke existing sessions when required by the security policy.
- Notify the user after a successful password reset.
- Record the event in the security audit log.

The final email or OTP provider remains subject to implementation approval.

5. AUTHENTICATION AND SESSION SECURITY

5.1 Authentication Tokens

Authentication tokens must be generated and validated by the backend.

Requirements:

- Use cryptographically secure random values or appropriately secured signed tokens.
- Set expiration times.
- Validate issuer, audience, signature, and other required claims when signed tokens are used.
- Never accept expired or invalid tokens.
- Revoke sessions when required.
- Avoid placing credentials in URLs.

5.2 Refresh Tokens

If refresh tokens are implemented:

- Store them securely.
- Rotate them according to the approved session design.
- Detect reuse of revoked or previously rotated tokens.
- Revoke the relevant token family when compromise is suspected.
- Never expose refresh tokens in ordinary application logs.

5.3 Session Management

The backend must support:

- Session creation.
- Session expiration.
- Session revocation.
- Logout.
- Logout from all devices where supported.
- Security event tracking.

Sensitive account changes may require re-authentication.

6. ADMINISTRATOR SECURITY

Administrative accounts have access to sensitive operational information and must receive stronger protection than ordinary accounts.

6.1 Administrator Roles

The initial administrative structure consists of:

- One Main Admin.
- Optional Sub-Admins.

The Main Admin has final approval authority.

Sub-Admins may:

- Verify information.
- Review submitted evidence.
- View permitted reports.
- Prepare investigation records.
- Submit recommendations.

Sub-Admins must not have final approval or rejection authority for restricted administrative workflows.

6.2 Admin Login

Admin login requires:

1. Password.
2. Authenticator App OTP.

OTP requirements:

- OTP must expire after its configured validity period.
- Expired OTPs must be rejected.
- Reused OTPs must be rejected where the selected authentication method supports replay prevention.
- Repeated failed attempts must trigger security controls.
- The OTP secret must be encrypted at rest.

Email OTP recovery is also available under the approved recovery workflow. The email provider and delivery configuration remain implementation decisions.

6.3 Main Admin Recovery

Main Admin recovery requires:

- Recovery Email.
- Email OTP.
- Backup Recovery Code.

The recovery process must:

1. Verify the recovery email.
2. Validate the OTP.
3. Validate the one-time Backup Recovery Code.
4. Securely reset the password.
5. Revoke existing sessions.
6. Record the recovery event.
7. Notify the Main Admin through the recovery channel.

Sub-Admins must not be allowed to recover the Main Admin account.

The Backup Recovery Code must be stored and handled securely. It must not be stored in plaintext in the application database.

6.4 Administrative Action Restrictions

Admins must not directly:

- Delete user accounts.
- Permanently cancel user accounts.
- Directly modify user balances.
- Delete reward ledger entries.
- Secretly alter historical transactions.
- Bypass backend validation.

Administrative requests must follow the documented backend validation and approval workflow.

7. ACCOUNT SUSPENSION AND CANCELLATION

7.1 Automatic Security Suspension

The backend may automatically suspend an account when suspicious activity or a security threat is detected.

Every automatic suspension must record:

- User ID.
- Triggering event.
- Reason.
- Detection timestamp.
- Relevant evidence or references.
- Backend action.
- Current account status.

The user must be able to submit evidence through the approved review process.

7.2 Admin Review

The review workflow is:

1. Request Received.
2. Sub-Admin Verification.
3. Main Admin Review.
4. Approve or Reject.
5. Backend Action.
6. Audit Log Entry.

Main Admin approval reactivates the account.

If the Main Admin rejects the request, the account remains suspended.

7.3 Account Cancellation

Account cancellation is separate from security suspension.

A VALID user's inactivity-based permanent cancellation follows the Mining & Reward Specification.

The system must not provide a user-facing Account Delete option under the current product requirements.

Data retention, privacy rights, and any legally required deletion or anonymization process must be reviewed before public launch.

8. API SECURITY

All backend APIs must enforce security controls.

Requirements:

- Require authentication for protected endpoints.
- Enforce role-based authorization.
- Validate request bodies, query parameters, and headers.
- Apply rate limits.
- Use consistent error responses.
- Avoid exposing internal stack traces.
- Prevent unauthorized object access.
- Enforce ownership checks for user-specific resources.
- Use pagination limits.
- Reject unexpected or oversized input.
- Validate content types.
- Apply appropriate CORS policies to web-facing endpoints.
- Protect administrative endpoints separately.

The backend must never trust client-submitted:

- Account status.
- Session success.
- Reward amount.
- User balance.
- Referral eligibility.
- Referral group eligibility.
- KYC verification status.
- Administrative approval.

These values must be determined or verified by the authoritative backend.

9. REPLAY AND DUPLICATE REQUEST PROTECTION

Sensitive operations must be protected against replay and duplicate processing.

Examples include:

- Session activation.
- Session completion.
- Reward credit.
- Referral bonus credit.
- Group change.
- KYC submission.
- Administrative approval.
- Reward correction.
- Recovery operations.

Requirements:

- Use unique operation identifiers.
- Use idempotency keys where appropriate.
- Validate operation ownership.
- Reject expired or already-used authorization tokens.
- Use database constraints and transactions to prevent duplicate records.
- Preserve processing results for safe retries.

A repeated request must not generate duplicate SAC rewards or duplicate financial ledger entries.

10. MINING SESSION SECURITY

Mining sessions represent scheduled virtual reward participation. They are not actual Proof-of-Work mining.

The backend must:

- Use its authoritative clock.
- Validate scheduled session windows.
- Enforce one activation per user per scheduled session.
- Reject retrospective activation.
- Validate session completion.
- Distinguish activation from successful completion.
- Prevent duplicate session success records.
- Prevent client-side manipulation of session time.
- Preserve session identifiers and validation history.

The mobile device clock must never determine authoritative session eligibility.

App closure, network interruption, or device shutdown after accepted activation must not independently invalidate the session.

11. REWARD AND BALANCE SECURITY

The backend is the sole authority for SAC reward calculations and balances.

Security requirements:

1. Reward calculations must follow the approved Mining & Reward Specification.
2. All reward amounts must be validated against the approved allocation.
3. The backend must prevent negative or unauthorized balances.
4. Integer arithmetic must be used for token amounts.
5. Floating-point arithmetic must not be used for authoritative SAC calculations.
6. Duplicate reward credit must be prevented.
7. Every balance-affecting operation must have a corresponding ledger record.
8. Ledger records must not be silently deleted or overwritten.
9. Reward corrections must follow the approved correction workflow.
10. Every administrative correction must be auditable.

11.1 Allocation Limits

The approved project allocation is:

Allocation| SAC
Regular Mining| 12,960,000
Referral Bonus| 4,320,000
Total App Mining Distribution| 17,280,000
Initial App Reserve| 1,000,000
Unused App Mining Allocation transferred to App Reserve| 720,000
Total App Reserve| 1,720,000
Founder/Personal Reserve| 12,000,000
Node Mining| 0
Total Supply| 31,000,000

The network-wide session pools are:

- Regular Mining: 6,000 SAC.
- Referral Bonus: 2,000 SAC.
- Total: 8,000 SAC.

These are network-wide pools, not guaranteed individual rewards.

The backend must enforce all approved limits and must never exceed the total supply.

12. DATABASE SECURITY

Database security must include:

- Restricted database network access.
- Separate application and administrative credentials where practical.
- Least-privilege database accounts.
- Encrypted backups.
- Secure secret management.
- Parameterized database queries.
- Transactional updates for critical operations.
- Database integrity checks.
- Audit logging.
- Regular dependency and database security reviews.

Production database credentials must never be committed to source control.

Database backups must not be publicly accessible.

13. ENCRYPTION AND DATA PROTECTION

13.1 Data in Transit

All production communication involving authentication, personal information, administrative operations, or reward data must use HTTPS with modern TLS configuration.

Plain HTTP may be used only for controlled local development environments.

13.2 Data at Rest

Sensitive information must be encrypted at rest where appropriate.

This includes:

- Backup files.
- KYC documents.
- Recovery credentials.
- Authenticator secrets.
- Private signing keys.
- Sensitive configuration values.

Encryption keys must be managed separately from the encrypted data.

13.3 Sensitive Data Handling

The system must not expose:

- Passwords.
- Password hashes.
- OTP values.
- OTP secrets.
- Recovery codes.
- Private signing keys.
- API secrets.
- KYC documents.
- Private personal information.

Sensitive information must not appear in ordinary application logs, public explorer records, or error messages.

14. KYC SECURITY

KYC is required only after the user completes all 2,160 effective mining sessions, according to the product requirements.

KYC must not be required at registration or during the initial 21 successful sessions.

Security requirements:

- KYC documents must be accessible only to authorized services and personnel.
- Documents must be encrypted at rest.
- Access must be logged.
- Uploads must be validated.
- File size and file type restrictions must be enforced.
- Malware scanning should be applied where practical.
- Documents must not be published in the public explorer.
- KYC data must not be exposed through ordinary user APIs.

The KYC provider, document types, retention period, and data protection process remain subject to approval.

15. PUBLIC LEDGER SECURITY

The public ledger is an app-operated, publicly inspectable and cryptographically verifiable record system.

It is not a decentralized or trustless blockchain.

Security requirements:

- Each block must have a unique identifier.
- Each block must have a cryptographic hash.
- Each block must reference the previous block hash.
- Blocks must be digitally signed by the backend.
- Block timestamps must be recorded in UTC.
- Public verification keys must be available through the Explorer.
- Old public verification keys must remain available for historical verification.
- Historical blocks must remain immutable.

15.1 Signing Key Protection

Private signing keys must be stored securely and must never be published.

Access must be restricted to the authorized backend signing process.

If a signing key is lost or compromised:

1. Main Admin approval is required for replacement.
2. A new signing key must be generated securely.
3. The new public key must be published.
4. The old public key must remain available.
5. Historical blocks must continue to be verified using the old public key.
6. New blocks must use the new signing key.
7. The replacement must be recorded in the Audit Log.

15.2 Ledger Corrections

Historical blocks must not be secretly modified.

A correction must:

- Be submitted as a Backend Correction Request.
- Pass backend validation.
- Receive Main Admin approval.
- Publish a new Correction Block.
- Reference the original block or transaction.
- Include the correction reason.
- Preserve the original block.
- Appear in the Explorer as a correction relationship.

16. BACKUP AND RECOVERY SECURITY

Backups must be encrypted and integrity-verified.

The backup system must support:

- Encrypted laptop database backups.
- Automatic upload to the designated SAECOIN Google Drive.
- Manual backup download to a Pen Drive through the Admin Panel.
- Backup history for all 2,160 effective sessions.
- Backup failure alerts.
- Monthly recovery testing.

16.1 Backup Encryption

Backup encryption must use:

- A strong encryption algorithm.
- A securely generated encryption key.
- A password and a separate encryption key.
- Secure storage of recovery material.

The password and encryption key must not be stored together in the same unprotected location.

16.2 Recovery Key

The Recovery Key must be stored offline and separately from the normal backup files.

If the laptop is lost, restoration requires:

- Recovery Key.
- Main Admin approval.

The approved recovery design allows the Recovery Key to recover or recreate the required encryption key.

If both the required Recovery Key and other valid recovery material are lost, the encrypted backup may become permanently unrecoverable.

This limitation must be clearly communicated to the Main Admin.

16.3 Recovery Testing

A recovery test must be performed monthly using available backup sources:

- Laptop backup.
- Pen Drive backup.
- Google Drive backup.

The test must verify:

- Backup integrity.
- Decryption.
- Database restoration.
- Session history.
- Reward ledger consistency.
- Referral records.
- Public ledger references.

Test results must be recorded.

17. SECURITY LOGGING AND AUDIT

Security-relevant events must be logged.

Examples:

- Successful and failed logins.
- Password changes.
- Password resets.
- OTP failures.
- Session creation and revocation.
- Suspicious API activity.
- Referral changes.
- Reward processing failures.
- Duplicate reward prevention.
- Account suspension.
- Account reactivation.
- KYC access.
- Admin approvals and rejections.
- Backup failures.
- Recovery operations.
- Signing key replacement.
- Ledger correction.
- Permission changes.

Logs must:

- Include timestamps in UTC.
- Identify the responsible account or service.
- Include the relevant operation or event identifier.
- Avoid storing secrets or unnecessary personal data.
- Be protected against unauthorized modification.
- Be retained according to the approved retention policy.

18. DEPENDENCY AND SUPPLY-CHAIN SECURITY

All third-party dependencies must be reviewed before production use.

The review should consider:

- Maintainer reputation.
- Maintenance activity.
- Known vulnerabilities.
- License compatibility.
- Dependency size and complexity.
- Transitive dependencies.
- Update history.

The project should use:

- Dependency lockfiles.
- Automated vulnerability scanning.
- Secret scanning.
- Code review.
- Reproducible build practices where practical.

Untrusted installation scripts and packages must not be executed without review.

19. MOBILE APPLICATION SECURITY

The React Native + Expo mobile application must follow secure development practices.

Requirements:

- Do not embed production secrets in the application.
- Do not store passwords in plaintext.
- Do not store private signing keys in the application.
- Use secure platform storage for sensitive local session credentials.
- Validate all API responses.
- Do not trust local reward or balance values.
- Avoid logging sensitive user information.
- Protect sensitive screens where appropriate.
- Keep dependencies updated.
- Use official, verified application distribution channels.

The mobile application is an untrusted client from the backend's perspective.

Obfuscation or client-side checks must not be treated as substitutes for backend security.

20. SECURITY INCIDENT RESPONSE

The project must maintain an incident response process.

When a security incident is detected:

1. Record the incident.
2. Determine the affected service or data.
3. Assess the potential impact.
4. Contain the incident.
5. Preserve relevant evidence.
6. Stop affected operations if necessary.
7. Investigate the root cause.
8. Apply and verify the fix.
9. Restore operations safely.
10. Document the incident and response.

For critical vulnerabilities or reward-integrity threats, the backend may stop affected operations or place the application into maintenance mode.

The system must preserve existing balances and historical records during incident response.

21. MAINTENANCE AND OUTAGE SECURITY

During planned or emergency maintenance:

- New session activations may be stopped.
- Reward processing may be paused.
- Existing records must remain intact.
- Balances must not be deleted.
- Pending operations must be reconciled.
- The app must show an appropriate maintenance status.
- Maintenance start and end times must be recorded.
- The Main Admin must receive relevant operational alerts.

After restoration, the backend must validate pending sessions and reward operations before processing them.

22. MONTHLY ADMIN SECURITY TESTING

Monthly Admin Security Testing is mandatory under the project operations policy.

The review should cover:

- Admin authentication.
- OTP and recovery procedures.
- Admin role permissions.
- Login abuse protection.
- API authorization.
- Backup integrity.
- Recovery procedures.
- Signing key access.
- Audit log integrity.
- Dependency vulnerabilities.
- Security configuration.

Findings must be documented with:

- Test date.
- Test scope.
- Findings.
- Severity.
- Corrective actions.
- Responsible person.
- Resolution status.

23. SECURITY TESTING REQUIREMENTS

Before public launch, the project must complete appropriate security testing.

Required categories include:

- Authentication testing.
- Authorization testing.
- API security testing.
- Input validation testing.
- Session security testing.
- Replay and duplicate request testing.
- Reward integrity testing.
- Referral abuse testing.
- Database security testing.
- Backup and recovery testing.
- Public ledger signature verification.
- Administrator permission testing.
- Dependency vulnerability scanning.

Critical security findings must block public launch until resolved and verified.

24. UNRESOLVED SECURITY DECISIONS

The following details require formal approval before production deployment:

1. Final authentication token design.
2. Access and refresh token expiration policies.
3. Password hashing parameters.
4. OTP validity period and attempt limits.
5. Email delivery provider.
6. KYC provider and retention policy.
7. Production secret management system.
8. Encryption algorithm and key-management implementation.
9. Backup encryption implementation.
10. Signing key storage and rotation implementation.
11. Security log retention period.
12. Incident notification process.
13. Rate-limit thresholds.
14. Production hosting security configuration.

These items must not be replaced with undocumented assumptions.

25. FINAL SECURITY POLICY

Security is mandatory throughout SAECOIN development and operation.

The backend must remain authoritative for all security-critical account, session, referral, reward, balance, and administrative operations.

No client-side interface or administrator must be able to bypass the approved backend validation and audit process.

Historical reward and public ledger records must remain traceable and must never be secretly altered.

The application must not launch publicly until critical security requirements have been implemented, tested, and reviewed.

---

END OF DOCUMENTDOCUMENT
