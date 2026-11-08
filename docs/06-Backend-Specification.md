> **v1.2 NOTICE (draft):** This document belongs to the v1.1 set. Specification v1.2 ([00-Spec-v1.2-Decision-Record.md](00-Spec-v1.2-Decision-Record.md)) changes tokenomics, reward calculation, referral rules and other items. Where the two conflict, the v1.2 record prevails once approved.

# SAECOIN — BACKEND SPECIFICATION

- **Version:** 1.1
- **Project:** SAECOIN App
- **Ticker:** SAC (Provisional)
- **Architecture:** Centralized Client–Server
- **API:** REST / JSON
- **Status:** Draft — Updated for Approved Requirements

---

## 1. PURPOSE

This document defines the backend requirements and processing rules for the SAECOIN mobile application.

The backend is the authoritative system responsible for:

- User registration and authentication.
- Account status management.
- Mining session scheduling and activation.
- Session validation.
- Regular Mining Reward calculation.
- Referral Bonus calculation.
- Referral group management.
- Balance management.
- Ledger transactions.
- KYC processing.
- Notifications.
- Admin operations.
- Audit logging.
- Backup and recovery.
- Public ledger publication.
- Explorer data services.

The mobile application must never independently approve or create authoritative rewards, balances or account status changes.

## 2. BACKEND ARCHITECTURE

The backend will follow a modular architecture.

```text
SAECOIN BACKEND
│
├── API Layer
│
├── Authentication Module
├── User Account Module
├── Mining Session Module
├── Reward Engine
├── Referral Engine
├── Balance Service
├── Ledger Service
├── KYC Service
├── Notification Service
├── Admin Service
├── Audit Service
├── Backup Service
└── Public Ledger Publisher
       │
       ▼
   Database Layer
```

These are logical modules. They may initially run as one backend application with clearly separated responsibilities.

The architecture must not introduce unnecessary microservices during the initial implementation.

## 3. TECHNOLOGY REQUIREMENTS

The backend technology stack must be finalized before implementation.

The implementation must support:

- Secure HTTPS communication.
- REST APIs.
- JSON request and response formats.
- A relational database.
- Database transactions.
- Background processing.
- Scheduled jobs.
- Secure password hashing.
- Role-based access control.
- Structured application logging.
- Automated backups.
- Monitoring and alerting.

The exact backend language, framework, database engine, hosting environment and dependency versions must be documented in the implementation setup.

No external hosted backend platform is mandatory under this specification.

## 4. API DESIGN

### 4.1 API Base Structure

All application APIs should use versioned routes.

Illustrative base path:

`/api/v1/`

Example endpoint groups:

```text
/api/v1/auth
/api/v1/users
/api/v1/mining
/api/v1/rewards
/api/v1/referrals
/api/v1/balance
/api/v1/transactions
/api/v1/notifications
/api/v1/kyc
/api/v1/explorer
```

Exact endpoint definitions must be maintained in the API documentation.

### 4.2 Request Validation

Every incoming request must be validated by the backend.

Validation must include:

- Authentication.
- Authorization.
- Required fields.
- Data types.
- Field lengths.
- Allowed values.
- Identifier validity.
- Request state.
- Duplicate request detection.
- Rate limits where appropriate.

Client-side validation does not replace backend validation.

### 4.3 Response Structure

API responses should use consistent JSON structures.

Illustrative success response:

```json
{
  "success": true,
  "data": {},
  "request_id": "unique-request-id"
}
```

Illustrative error response:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request could not be processed."
  },
  "request_id": "unique-request-id"
}
```

Internal stack traces, passwords, secrets and sensitive database details must never be returned to clients.

### 4.4 Idempotency

Operations that may be retried must support idempotency.

This includes:

- Session activation.
- Session completion.
- Reward credit.
- Referral bonus allocation.
- Ledger transaction creation.
- Public block publication.
- Administrative correction processing.

A repeated request with the same operation identifier must not create a duplicate result.

## 5. AUTHENTICATION AND ACCOUNT MANAGEMENT

### 5.1 Registration

The backend must:

1. Validate registration information.
2. Check username uniqueness.
3. Validate the referral code if supplied.
4. Prevent self-referral.
5. Create a unique User ID.
6. Create the account.
7. Store the password using secure password hashing.
8. Create the initial account status.
9. Record the registration event.
10. Return a safe account response.

An invalid referral code must be visibly rejected. It must not create a pending or temporary referral relationship.

### 5.2 Username and User ID

The username is permanent and also serves as the user's Referral Code.

The backend must generate a unique User ID.

Example:

Username: Emon  
User Number: 00001258

The generated number must be unique and must not be reassigned to another user.

### 5.3 Login

The backend must:

- Verify the account credentials.
- Check account status.
- Apply login rate limits.
- Issue an authenticated session or token.
- Record security-relevant login events.
- Avoid revealing whether a particular username exists in an error response.

### 5.4 Account Status

The backend controls account status.

Supported statuses:

- `PENDING`
- `VALID`
- `SUSPENDED`
- `CANCELLED`

The mobile application may display the status but cannot change it.

### 5.5 Account Cancellation

A CANCELLED account is permanently cancelled.

The backend must:

- Prevent further mining activation.
- Prevent further reward eligibility.
- Preserve required historical records.
- Forfeit the remaining balance to App Reserve according to the approved rules.
- Record the cancellation event.

No reactivation is permitted.

The current application must not provide a user-facing Account Delete feature. Account cancellation and legally required data-retention procedures are separate matters.

## 6. MINING SESSION ENGINE

### 6.1 Session Schedule

The backend must maintain three scheduled UTC sessions per day.

| Session | Start UTC | End UTC |
| --- | --- | --- |
| 1 | 04:00 | 12:00 |
| 2 | 12:00 | 20:00 |
| 3 | 20:00 | 04:00 next day |

The backend clock is authoritative.

The mobile device clock must not determine session eligibility.

### 6.2 Activation Rules

The backend must:

1. Authenticate the user.
2. Identify the current scheduled session.
3. Verify that activation is within the allowed session window.
4. Check account status.
5. Check whether the user has already activated that session.
6. Save the activation record.
7. Return the activation result.

Rules:

- One activation per user per scheduled session.
- Activation is accepted at any time within the entire eight-hour slot.
- A missed session cannot be activated retrospectively.
- A duplicate activation must not create a second record.
- Activation alone does not make the session successful.

### 6.3 Session Completion

A session can be marked successful only after:

1. The scheduled slot ends.
2. The backend confirms an accepted activation.
3. The session validation rules pass.
4. The result is saved successfully.

The backend must maintain a clear processing state for each session.

Suggested internal states:

- `SCHEDULED`
- `OPEN`
- `ACTIVATED`
- `PROCESSING`
- `SUCCESS`
- `FAILED`
- `PENDING_RETRY`

These are backend processing states, separate from account statuses.

### 6.4 Effective Session Counter

The project requires 2,160 effective sessions.

Backend mining downtime must pause effective session progression.

After recovery, the system must resume from the correct effective session state.

The backend must not:

- Skip a required effective session.
- Count a failed processing attempt as successful.
- Create duplicate session records.
- Change historical session results without an approved correction process.

## 7. TOKENOMICS AND REWARD ENGINE

### 7.1 Fixed Supply

The total SAECOIN supply is:

31,000,000 SAC

| Allocation | SAC |
| --- | --- |
| Regular Mining | 12,960,000 |
| Referral Bonus | 4,320,000 |
| Initial App Reserve | 1,000,000 |
| Unused App Mining Allocation transferred to App Reserve | 720,000 |
| Total App Reserve | 1,720,000 |
| Founder/Personal Reserve | 12,000,000 |
| Node Mining | 0 |
| Total Supply | 31,000,000 |

The Founder/Personal Reserve must remain separate from the App Reserve.

Node Mining has no allocation in the current application.

### 7.2 Network-Wide Session Pools

Each effective session has these network-wide distribution pools:

| Pool | SAC |
| --- | --- |
| Regular Mining | 6,000 |
| Referral Bonus | 2,000 |
| Total | 8,000 |

Across 2,160 effective sessions:

- Regular Mining: 12,960,000 SAC.
- Referral Bonus: 4,320,000 SAC.
- Total App Mining Distribution: 17,280,000 SAC.

These are network-wide pools, not guaranteed individual rewards.

### 7.3 Reward Calculation

The Reward Engine must:

1. Receive validated session results.
2. Retrieve the applicable session eligibility.
3. Calculate eligible user participation.
4. Determine each user's allocation.
5. Apply deterministic rounding and remainder rules.
6. Check remaining allocation.
7. Create unique reward records.
8. Submit reward entries to the Ledger Service.
9. Confirm successful credit.
10. Record processing status.

The exact individual allocation formula, rounding method and remainder treatment must be defined consistently in `08-Mining-Reward-Specification.md`.

### 7.4 Budget Protection

The backend must enforce:

- Regular Mining distribution cannot exceed 12,960,000 SAC.
- Referral Bonus distribution cannot exceed 4,320,000 SAC.
- Combined App Mining distribution cannot exceed 17,280,000 SAC.
- Total supply cannot exceed 31,000,000 SAC.

The backend must reject any allocation that would exceed its approved budget.

No reward may be created solely from a client request.

### 7.5 Reward Timing

Under normal operation, reward credit should complete within five minutes after the scheduled session ends.

If processing fails:

- Preserve the pending operation.
- Retry safely.
- Prevent duplicate credits.
- Reconcile the result.
- Alert Admin when manual review is required.

## 8. INITIAL VALIDITY AND INACTIVITY

### 8.1 Initial Validity

A new user requires 21 successful sessions to become VALID.

Regular Mining Reward is paid during these first 21 successful sessions.

Referral Bonus is not available until the account is VALID.

The backend must track successful sessions independently for each user.

### 8.2 Inactivity

After becoming VALID:

- The user must complete at least one successful session within every rolling window of 90 scheduled session slots.
- A successful session resets the inactivity counter.
- Activation alone does not reset the counter.
- If no successful session occurs within the next 90 slots, the account becomes permanently CANCELLED.

This rule applies only to VALID users.

During the 21-session rebuild after a referral group change, the inactivity counter is suspended until validity is regained.

### 8.3 Cancellation

When the inactivity limit is reached:

1. The backend changes the account to CANCELLED.
2. Future activation is blocked.
3. Future reward eligibility is removed.
4. Remaining balance is forfeited to App Reserve.
5. A cancellation transaction or accounting record is created.
6. The event is added to the Audit Log.
7. The user is notified.

Cancellation must be permanent.

## 9. REFERRAL ENGINE

### 9.1 Referral Relationship

The backend must maintain one current Referral Group for each user.

The username is the permanent Referral Code.

The backend must:

- Validate the code at registration or group change.
- Prevent self-referral.
- Enforce the maximum of 10 direct referrals.
- Reject invalid codes.
- Store referral relationship history.
- Prevent duplicate relationship creation.

### 9.2 Referrer Eligibility

A referrer must:

- Be active in the same session.
- Have at least three active direct referrals in that session.

If eligible, the referrer and all active direct referrals participate in the applicable referral distribution.

If a parent group is ineligible, an otherwise eligible child group may still qualify.

One user may receive at most one Referral Bonus share per session.

### 9.3 Group Change

A user may change the referral group once during their lifetime, after completing the initial 21 successful sessions and becoming VALID.

The backend must:

1. Verify the lifetime group-change opportunity remains unused.
2. Validate the new username.
3. Verify the new referrer has capacity.
4. Reject self-referral.
5. Reject selection of the current referrer.
6. Save the group-change history.
7. Mark the lifetime opportunity as used.
8. Apply the new relationship from the next new session.
9. Keep the old relationship for the currently active session.

The user may select any registered username, including a former ancestor in the referral chain. No ancestry-cycle restriction is imposed by this rule.

An invalid attempt must not consume the lifetime opportunity.

After a successful group change:

- The 21-session validity progress resets.
- The account becomes pending validity.
- Regular Mining Reward continues.
- Referral Bonus is disabled until validity is regained.
- Existing balance remains unchanged.
- The inactivity counter is suspended until validity is regained.

The backend must apply all changes atomically.

## 10. BALANCE AND LEDGER SERVICE

### 10.1 Balance Authority

The backend is the only authority allowed to update user balances.

The mobile application can request balance information but cannot submit an arbitrary new balance.

### 10.2 Ledger Requirements

Every balance-changing operation must produce a traceable ledger entry.

Each transaction must have:

- Unique Transaction ID.
- User ID.
- Transaction Type.
- Amount in SAC.
- Related Session ID where applicable.
- Related Reward ID where applicable.
- Timestamp in UTC.
- Processing Status.
- Reference to related transaction where required.

### 10.3 Transaction Integrity

The backend must:

- Use atomic operations for reward and balance updates.
- Prevent duplicate credits.
- Prevent unauthorized debits.
- Preserve transaction history.
- Reconcile balances against ledger entries.
- Maintain audit references.

Existing ledger records must not be silently modified or deleted.

Corrections must be recorded as new approved entries.

## 11. KYC SERVICE

KYC is required only after all 2,160 effective sessions have finished.

KYC must not be required:

- At registration.
- During the first 21 successful sessions.
- During normal mining before completion of all effective sessions.

After the full session program ends:

1. The backend marks KYC as required.
2. The user receives an In-App and Push notification.
3. The user submits the required information.
4. The backend validates the submission.
5. The authorized Admin reviews it.
6. The backend records the final status.

If KYC is not completed, the user's balance becomes temporarily locked.

The balance is not forfeited solely because KYC remains incomplete.

Provider, document types, data retention and jurisdiction-specific requirements remain subject to a separate approved KYC policy.

## 12. NOTIFICATION SERVICE

The backend must support:

- In-App notifications.
- Push notifications.
- Notification history.
- Notification delivery tracking where supported.

Events include:

- Activation accepted.
- Session successful.
- Session failed.
- Reward credited.
- Referral Bonus credited.
- Referral group changed.
- Account became VALID.
- Account suspended.
- Account reactivated.
- Account cancelled.
- KYC required.
- KYC verified.
- Maintenance announcements.

If OS push permission is denied, In-App notification history must remain available.

A user may delete notifications from their own notification history, but this must not delete underlying system or ledger records.

## 13. ADMIN BACKEND

### 13.1 Roles

Main Admin

The Main Admin has final approval authority.

Responsibilities:

- Review security cases.
- Approve or reject protected requests.
- Review reward correction requests.
- Review recovery requests.
- Manage Sub-Admins.
- Review Audit Logs.
- Review system reports.

Sub-Admin

Sub-Admins may:

- Verify information.
- Review submitted evidence.
- Prepare reports.
- Forward requests.

Sub-Admins cannot make final approval or rejection decisions.

### 13.2 Approval Workflow

```text
Request Received
       |
       v
Sub-Admin Verification
       |
       v
Main Admin Review
       |
       v
Approve / Reject
       |
       v
Backend Validation
       |
       v
Approved Backend Action
       |
       v
Audit Log
```

The backend must verify the authorized role before applying an administrative decision.

### 13.3 Account Suspension

The backend may automatically suspend an account when suspected fraud or a security issue is detected.

It must:

- Record the reason.
- Preserve relevant evidence.
- Record the triggering event.
- Notify the user where appropriate.
- Allow the user to submit evidence.
- Send the case for Admin review.

Admin cannot directly suspend, cancel or delete an account through an arbitrary manual status change.

The Main Admin reviews the evidence and approves or rejects the proposed outcome.

### 13.4 Reward Correction

A reward correction request must include:

- User ID.
- Session ID.
- Reward ID.
- Existing ledger entry.
- Proposed correction amount.
- Reason.
- Relevant transaction history.

The backend must validate all supplied information.

Main Admin approval is required before execution.

The original ledger entry must remain unchanged. A correction must be recorded as a new transaction with an audit reference.

## 14. AUDIT LOG SERVICE

The backend must maintain audit records for important actions.

Audit events include:

- Login and security events.
- Account status changes.
- Session processing.
- Reward calculation.
- Reward correction.
- Referral group changes.
- KYC decisions.
- Admin approvals and rejections.
- Backup operations.
- Recovery operations.
- Public signing key replacement.
- Ledger correction.
- Maintenance operations.

Audit records must include:

- Event ID.
- Event type.
- Actor or system identity.
- Related User ID where applicable.
- Related Session ID or Transaction ID where applicable.
- Timestamp in UTC.
- Action result.
- Reason or reference where required.

Audit history must not be silently deleted or altered.

## 15. PUBLIC LEDGER PUBLISHER

The Public Ledger Publisher creates app-operated public blocks from validated backend records.

### 15.1 Publishing Process

1. Wait for the session to end.
2. Validate session and transaction records.
3. Prepare public transaction data.
4. Create a uniquely identified block.
5. Calculate the block hash.
6. Link it to the previous block.
7. Sign the block with the backend signing key.
8. Publish it to the Explorer.
9. Record publication status.

### 15.2 Publishing Failure

If publication fails:

- Preserve the prepared block.
- Mark publication as `PENDING`.
- Retry safely.
- Prevent duplicate block publication.
- Record every attempt.
- Alert Main Admin if failure continues beyond the configured threshold.

### 15.3 Public Verification

The Explorer must provide the applicable public verification key.

Users must be able to verify block hashes and signatures.

Historical public keys must remain available for historical blocks.

### 15.4 Signing Key Replacement

If a signing key is lost, compromised or replaced:

- Main Admin approval is required.
- The new key must be securely generated and stored.
- The old public key must remain available.
- Existing blocks remain associated with the old key.
- New blocks use the new signing key.
- The replacement must be recorded in the Audit Log.

The public ledger is app-operated and is not decentralized or trustless.

## 16. BACKUP AND RECOVERY SERVICE

### 16.1 Backup Schedule

A backup must be created after every Mining Session.

The system must preserve backup history for all 2,160 effective sessions.

### 16.2 Backup Destinations

Approved destinations:

1. Encrypted Laptop backup.
2. Automatic SAECOIN Google Drive upload.
3. Manual Pen Drive backup through the Admin Panel.

Backups must not overwrite the only available historical copy.

### 16.3 Encryption

Backup encryption must use:

- A secure password.
- A separate encryption key.
- Secure key management.
- Integrity verification.

The Recovery Key must be stored offline and separately from ordinary backup files.

### 16.4 Recovery

If the primary laptop is lost or damaged:

- Restore from an available encrypted backup.
- Require the Recovery Key.
- Require Main Admin approval.
- Verify database integrity.
- Verify the latest valid backup.
- Reconcile session and reward records.
- Confirm ledger consistency.
- Record the recovery operation.

If both the required Recovery Key and encryption key material are lost, the backup may be unrecoverable.

### 16.5 Backup Failure

The backend must:

- Record backup failure.
- Alert Admin.
- Preserve the previous valid backup.
- Retry according to the recovery policy.
- Record successful recovery.

Monthly recovery tests must verify the Laptop, Pen Drive and Drive backup sources.

## 17. MAINTENANCE AND OUTAGE HANDLING

### 17.1 Maintenance Mode

During critical maintenance:

- Display an Under Maintenance state.
- Stop affected activation operations.
- Stop affected reward processing.
- Preserve all records.
- Preserve all balances.
- Prevent affected financial operations.
- Notify users where possible.
- Record maintenance start and end times.

### 17.2 Backend Downtime

When the mining backend is unavailable:

- Effective session progression pauses.
- Incomplete operations remain pending.
- No unvalidated session becomes successful.
- No duplicate rewards may be created.
- Processing resumes from the last verified state.

### 17.3 Recovery Approval

If a failure creates incomplete session or reward operations:

1. Backend validates the affected records.
2. A recovery request is prepared.
3. Admin reviews the request.
4. Main Admin approves or rejects.
5. Backend processes approved operations.
6. Unique identifiers prevent duplicate processing.
7. Audit Log records the final outcome.

## 18. LOGGING AND MONITORING

The backend must support structured logging and operational monitoring.

Monitor:

- API availability.
- Authentication failures.
- Database health.
- Mining session processing.
- Reward processing.
- Referral calculations.
- Ledger consistency.
- Public block publication.
- Backup completion.
- Storage capacity.
- Security events.

Logs must not contain:

- Plaintext passwords.
- Seed phrases.
- Private keys.
- Recovery codes.
- Authentication tokens.
- Unnecessary KYC information.

## 19. PERFORMANCE AND RELIABILITY

The backend must be designed to:

- Handle concurrent API requests.
- Prevent race conditions.
- Process session results consistently.
- Protect database integrity.
- Avoid duplicate reward allocation.
- Support safe background retries.
- Recover from temporary service failures.

Performance targets and load limits must be established during testing.

The system must not sacrifice financial or ledger correctness for speed.

## 20. IMPLEMENTATION DEPENDENCIES

Backend implementation must remain consistent with:

- `01-App-PRD.md`
- `02-UI-UX-Design.md`
- `03-App-Flow-Specification.md`
- `04-Technical-Requirements.md`
- `05-App-Architecture.md`
- `07-Database-Schema.md`
- `08-Mining-Reward-Specification.md`
- `09-Referral-Specification.md`
- `10-Security-Specification.md`
- `11-Testing-Strategy.md`
- `12-Release-and-Launch-Plan.md`

If conflicting rules are discovered, implementation must pause until the conflict is resolved and the affected documents are updated.

## 21. FINAL BACKEND POLICY

The backend is the single authoritative system for SAECOIN App operations.

All session validation, reward calculation, referral eligibility, balance changes, account status decisions, administrative approvals and ledger operations must be controlled by backend rules.

Every important operation must be traceable, recoverable and protected against duplicate execution.

The backend must preserve the approved tokenomics and must never exceed the fixed 31,000,000 SAC total supply.

The current system is a centralized application with an app-operated public ledger. It must not be represented as a decentralized blockchain.

---

END OF DOCUMENT
