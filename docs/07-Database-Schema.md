> **v1.2 NOTICE (draft):** This document belongs to the v1.1 set. Specification v1.2 ([00-Spec-v1.2-Decision-Record.md](00-Spec-v1.2-Decision-Record.md)) changes tokenomics, reward calculation, referral rules and other items. Where the two conflict, the v1.2 record prevails once approved.

# SAECOIN — DATABASE SCHEMA SPECIFICATION

- **Version:** 1.1
- **Project:** SAECOIN App
- **Ticker:** SAC (Provisional)
- **Database Type:** Relational Database
- **Architecture:** Centralized Client–Server
- **Status:** Draft — Updated for Approved Requirements

---

## 1. PURPOSE

This document defines the logical database structure for the SAECOIN application.

The database must securely store and maintain:

- User accounts.
- Authentication sessions.
- User profiles.
- Referral relationships.
- Mining session schedules.
- Session activations.
- Session results.
- Reward records.
- User balances.
- Ledger transactions.
- KYC records.
- Notifications.
- Admin accounts.
- Admin approval requests.
- Audit logs.
- Backup records.
- Public ledger blocks.
- Public ledger transactions.

The database is the persistent data layer. The backend remains responsible for validating and authorizing all operations.

This document defines a logical schema. Exact SQL types, indexes, constraints and migration scripts will be finalized during implementation.

## 2. DATABASE DESIGN PRINCIPLES

The database must follow these principles:

1. Use stable unique identifiers.
2. Maintain referential integrity.
3. Use atomic transactions for related financial operations.
4. Prevent duplicate session activation.
5. Prevent duplicate reward credit.
6. Preserve historical records.
7. Store timestamps in UTC.
8. Store monetary amounts using exact integer or fixed-precision representations.
9. Never use floating-point values for SAC accounting.
10. Maintain an auditable history of administrative operations.
11. Support encrypted backups and recovery.
12. Protect sensitive personal and authentication data.

## 3. ENTITY RELATIONSHIP OVERVIEW

```text
Users
  |
  +---- User Profiles
  |
  +---- Authentication Sessions
  |
  +---- Referral Relationships
  |
  +---- Mining Activations
  |          |
  |          +---- Mining Sessions
  |          |
  |          +---- Session Results
  |                       |
  |                       +---- Reward Records
  |                                  |
  |                                  +---- Ledger Transactions
  |
  +---- User Balance
  |
  +---- KYC Records
  |
  +---- Notifications
```

```text
Admin Accounts
  |
  +---- Admin Requests
  |
  +---- Audit Logs
```

```text
Mining Sessions
  |
  +---- Public Ledger Blocks
               |
               +---- Public Ledger Transactions
```

Backup Records

This is a logical relationship overview. The final relational design must be verified before database migrations are created.

## 4. IDENTIFIER AND DATA TYPE POLICY

### 4.1 Primary Identifiers

Use unique, non-reusable primary identifiers.

Recommended logical identifiers:

- `user_id`
- `session_id`
- `activation_id`
- `session_result_id`
- `reward_id`
- `transaction_id`
- `referral_id`
- `notification_id`
- `admin_id`
- `admin_request_id`
- `audit_id`
- `block_id`
- `backup_id`

UUID or another suitable unique identifier may be used.

The public User Number is separate from the internal database primary key.

### 4.2 SAC Amount Representation

SAC amounts must use an exact representation.

The implementation must define the smallest supported SAC unit before production.

Possible approaches:

- Integer smallest units.
- Fixed-precision decimal database type.

Floating-point types such as `FLOAT` and `DOUBLE` must not be used for financial accounting.

All calculations must be deterministic and reproducible.

### 4.3 Timestamp Policy

All authoritative timestamps must use UTC.

Examples:

- `created_at`
- `updated_at`
- `activated_at`
- `session_start_at`
- `session_end_at`
- `reward_created_at`
- `transaction_created_at`

The mobile application may display localized times, but the backend and database must store authoritative times in UTC.

## 5. USERS TABLE

Table: `users`

Purpose: Store the main user account information.

| Column | Logical Type | Description |
| --- | --- | --- |
| user_id | UUID / Unique ID | Internal primary key |
| user_number | Unique String | Public numeric user identifier |
| username | String | Permanent username and referral code |
| password_hash | String | Secure password hash |
| account_status | Enum | PENDING, VALID, SUSPENDED, CANCELLED |
| referral_group_change_used | Boolean | Whether lifetime group change was used |
| successful_session_count | Integer | Current validity progress |
| inactivity_slot_count | Integer | Current inactivity counter |
| kyc_status | Enum | NOT_REQUIRED, REQUIRED, PENDING, VERIFIED, REJECTED |
| created_at | Timestamp | Account creation time |
| updated_at | Timestamp | Last update time |

Constraints:

- `user_id` must be unique.
- `user_number` must be unique.
- "username" must be unique.
- Username must be permanent after registration.
- Password must never be stored in plaintext.
- Account status changes must follow backend rules.

## 6. USER PROFILES TABLE

Table: `user_profiles`

Purpose: Store non-authentication profile information.

| Column | Logical Type | Description |
| --- | --- | --- |
| profile_id | UUID / Unique ID | Primary key |
| user_id | Foreign Key | Associated user |
| display_name | String | Display name |
| avatar_reference | String / Nullable | Profile image reference |
| created_at | Timestamp | Creation time |
| updated_at | Timestamp | Last update time |

Profile information must not be used as an alternative authentication credential.

Sensitive personal information must be stored only when required and protected appropriately.

## 7. AUTHENTICATION SESSIONS TABLE

Table: `auth_sessions`

Purpose: Maintain authenticated user sessions.

| Column | Logical Type | Description |
| --- | --- | --- |
| auth_session_id | UUID | Primary key |
| user_id | Foreign Key | Associated user |
| token_identifier_hash | String | Hashed token identifier where applicable |
| created_at | Timestamp | Session creation time |
| expires_at | Timestamp | Expiration time |
| revoked_at | Timestamp / Nullable | Revocation time |
| device_description | String / Nullable | Limited device information |

Requirements:

- Store only the information necessary to validate sessions.
- Never store reusable plaintext access tokens.
- Revoke sessions after applicable security events.
- Apply expiration and rotation policies.

## 8. REFERRAL RELATIONSHIPS TABLE

Table: `referral_relationships`

Purpose: Maintain referral group relationships and history.

| Column | Logical Type | Description |
| --- | --- | --- |
| referral_id | UUID | Primary key |
| referred_user_id | Foreign Key | User joining the group |
| referrer_user_id | Foreign Key | Referrer |
| relationship_status | Enum | ACTIVE, REPLACED |
| effective_from_session_id | Foreign Key / Nullable | First effective session |
| effective_until_session_id | Foreign Key / Nullable | Last effective session |
| relationship_type | Enum | INITIAL, GROUP_CHANGE |
| created_at | Timestamp | Relationship creation time |

Constraints:

- A user has only one current referral group.
- A referrer may have at most 10 direct referrals.
- Self-referral is prohibited.
- The current referrer cannot be selected again during group change.
- Referral history must be preserved.
- Group changes must follow the one-lifetime-change rule.

The database must support historical referral relationships without overwriting the previous relationship.

## 9. MINING SESSIONS TABLE

Table: `mining_sessions`

Purpose: Store the official scheduled session records.

| Column | Logical Type | Description |
| --- | --- | --- |
| session_id | UUID | Primary key |
| session_number | Integer | Effective session number |
| session_date | Date | Scheduled UTC date |
| session_slot | Integer | Slot 1, 2 or 3 |
| start_at | Timestamp | Scheduled start UTC |
| end_at | Timestamp | Scheduled end UTC |
| processing_status | Enum | SCHEDULED, OPEN, PROCESSING, SUCCESS, FAILED, PENDING_RETRY |
| effective_session | Boolean | Whether it counts toward 2,160 |
| created_at | Timestamp | Creation time |
| completed_at | Timestamp / Nullable | Completion time |

Constraints:

- Effective session numbers must be unique.
- Session slot and schedule must be consistent.
- Session records must not be duplicated.
- Downtime must pause effective session progression.
- Historical session results must remain traceable.

## 10. MINING ACTIVATIONS TABLE

Table: `mining_activations`

Purpose: Record user activation requests.

| Column | Logical Type | Description |
| --- | --- | --- |
| activation_id | UUID | Primary key |
| user_id | Foreign Key | Activating user |
| session_id | Foreign Key | Scheduled session |
| activation_status | Enum | ACCEPTED, REJECTED |
| idempotency_key | String | Duplicate request protection |
| activated_at | Timestamp | Backend acceptance time |
| request_reference | String / Nullable | Request tracking reference |

Mandatory constraints:

- Unique combination of `user_id` and `session_id`.
- Unique idempotency key within the appropriate operation scope.
- Only one accepted activation per user per scheduled session.
- Missed sessions cannot be activated retrospectively.

## 11. SESSION RESULTS TABLE

Table: `session_results`

Purpose: Store the backend-validated outcome of each user's scheduled session.

| Column | Logical Type | Description |
| --- | --- | --- |
| session_result_id | UUID | Primary key |
| user_id | Foreign Key | User |
| session_id | Foreign Key | Scheduled session |
| activation_id | Foreign Key | Accepted activation |
| result_status | Enum | SUCCESS, FAILED, PENDING_RETRY |
| validation_reference | String / Nullable | Validation record |
| validated_at | Timestamp / Nullable | Validation time |
| created_at | Timestamp | Record creation time |

Constraints:

- A user must not have duplicate final results for the same session.
- SUCCESS requires backend validation.
- Activation alone must not create SUCCESS.
- Failed or pending operations must remain traceable.

## 12. REWARD RECORDS TABLE

Table: `reward_records`

Purpose: Store calculated Regular Mining and Referral Bonus rewards.

| Column | Logical Type | Description |
| --- | --- | --- |
| reward_id | UUID | Primary key |
| user_id | Foreign Key | Reward recipient |
| session_id | Foreign Key | Related session |
| session_result_id | Foreign Key | Validated session result |
| reward_type | Enum | REGULAR_MINING, REFERRAL_BONUS |
| amount | Exact SAC Amount | Reward amount |
| reward_status | Enum | PENDING, APPROVED, CREDITED, FAILED, REVERSED |
| calculation_reference | String | Calculation version/reference |
| created_at | Timestamp | Creation time |
| credited_at | Timestamp / Nullable | Credit time |

Constraints:

- Unique reward allocation per user, session and reward type.
- A reward must reference a valid processing context.
- Reward amount must not be negative.
- Allocation must remain within the approved budget.
- Duplicate reward credits are prohibited.

## 13. USER BALANCES TABLE

Table: `user_balances`

Purpose: Maintain a ledger-consistent balance summary.

| Column | Logical Type | Description |
| --- | --- | --- |
| balance_id | UUID | Primary key |
| user_id | Foreign Key | User |
| available_balance | Exact SAC Amount | Available balance |
| locked_balance | Exact SAC Amount | Temporarily locked balance |
| updated_at | Timestamp | Last update time |

Constraints:

- One balance record per user.
- Amounts must use exact numeric representation.
- Negative balances must be prevented unless a separately approved accounting rule permits them.
- Balance updates must occur through authorized backend operations.
- Balance summaries must reconcile with the ledger.

The balance table is a summary, not an independent source of authority.

## 14. LEDGER TRANSACTIONS TABLE

Table: `ledger_transactions`

Purpose: Maintain the authoritative accounting history of balance-changing operations.

| Column | Logical Type | Description |
| --- | --- | --- |
| transaction_id | UUID | Primary key |
| user_id | Foreign Key | Related user |
| session_id | Foreign Key / Nullable | Related mining session |
| reward_id | Foreign Key / Nullable | Related reward |
| transaction_type | Enum | MINING_REWARD, REFERRAL_BONUS, RESERVE_TRANSFER, CORRECTION, KYC_LOCK, KYC_UNLOCK, OTHER_APPROVED |
| amount | Exact SAC Amount | Transaction amount |
| transaction_status | Enum | PENDING, CONFIRMED, REVERSED |
| reference_transaction_id | Foreign Key / Nullable | Related transaction |
| idempotency_key | String / Nullable | Duplicate protection |
| description | String | Transaction purpose |
| created_at | Timestamp | Creation time |

Requirements:

- Every balance-changing operation must be traceable.
- Transaction IDs must be unique.
- Existing confirmed transactions must not be silently modified or deleted.
- Corrections must create new entries.
- Reconciliation must be possible.
- Transaction history must remain auditable.

The implementation must define debit/credit direction and accounting conventions consistently before production.

## 15. KYC RECORDS TABLE

Table: `kyc_records`

Purpose: Store KYC submission and review metadata.

| Column | Logical Type | Description |
| --- | --- | --- |
| kyc_id | UUID | Primary key |
| user_id | Foreign Key | User |
| kyc_status | Enum | REQUIRED, PENDING, VERIFIED, REJECTED |
| provider_reference | String / Nullable | Provider reference |
| submission_reference | String / Nullable | Protected document reference |
| submitted_at | Timestamp / Nullable | Submission time |
| reviewed_by_admin_id | Foreign Key / Nullable | Reviewing Admin |
| reviewed_at | Timestamp / Nullable | Review time |
| rejection_reason | String / Nullable | Safe reason |

Requirements:

- KYC becomes required only after all 2,160 effective sessions finish.
- KYC must not be required at registration.
- KYC documents must not be publicly exposed.
- Access must be restricted.
- Data retention and deletion requirements must follow applicable law and the approved KYC policy.

## 16. NOTIFICATIONS TABLE

Table: `notifications`

Purpose: Maintain user notification history.

| Column | Logical Type | Description |
| --- | --- | --- |
| notification_id | UUID | Primary key |
| user_id | Foreign Key | Recipient |
| notification_type | String / Enum | Event type |
| title | String | Notification title |
| message | String | Notification message |
| delivery_status | Enum | CREATED, PUSH_SENT, PUSH_FAILED |
| read_at | Timestamp / Nullable | Read time |
| deleted_at | Timestamp / Nullable | User history deletion time |
| created_at | Timestamp | Creation time |

Requirements:

- Support In-App notifications.
- Support Push notifications.
- Preserve underlying system and ledger records.
- User deletion must affect only their notification history.
- OS push permission status must not prevent In-App history from working.

## 17. ADMIN ACCOUNTS TABLE

Table: `admin_accounts`

Purpose: Store administrative identities and roles.

| Column | Logical Type | Description |
| --- | --- | --- |
| admin_id | UUID | Primary key |
| username | String | Unique Admin username |
| password_hash | String | Secure password hash |
| admin_role | Enum | MAIN_ADMIN, SUB_ADMIN |
| otp_secret_encrypted | Binary / Protected String | Encrypted OTP secret |
| account_status | Enum | ACTIVE, SUSPENDED |
| created_at | Timestamp | Creation time |
| updated_at | Timestamp | Last update time |

Requirements:

- Main Admin has final approval authority.
- Sub-Admin cannot approve or reject protected requests.
- Admin authentication requires password and Authenticator App OTP.
- OTP recovery and Main Admin recovery must follow the Security Specification.

## 18. ADMIN REQUESTS TABLE

Table: `admin_requests`

Purpose: Store requests requiring administrative review.

| Column | Logical Type | Description |
| --- | --- | --- |
| admin_request_id | UUID | Primary key |
| request_type | Enum | SUSPENSION_REVIEW, REWARD_CORRECTION, RECOVERY, LEDGER_CORRECTION, OTHER |
| related_user_id | Foreign Key / Nullable | Related user |
| related_session_id | Foreign Key / Nullable | Related session |
| related_reward_id | Foreign Key / Nullable | Related reward |
| submitted_by_admin_id | Foreign Key / Nullable | Submitting Admin |
| verified_by_admin_id | Foreign Key / Nullable | Verifying Sub-Admin |
| reviewed_by_admin_id | Foreign Key / Nullable | Main Admin |
| request_status | Enum | RECEIVED, SUB_ADMIN_VERIFICATION, MAIN_ADMIN_REVIEW, APPROVED, REJECTED, EXECUTED |
| reason | String | Request reason |
| evidence_reference | String / Nullable | Protected evidence reference |
| decision_reason | String / Nullable | Approval or rejection reason |
| created_at | Timestamp | Request creation |
| reviewed_at | Timestamp / Nullable | Review time |
| executed_at | Timestamp / Nullable | Execution time |

Requirements:

- Every request must be traceable.
- Main Admin approval is required for protected actions.
- Backend validation must occur before execution.
- Approval decisions must be recorded.
- Existing financial records must remain preserved.

## 19. AUDIT LOG TABLE

Table: `audit_logs`

Purpose: Maintain traceable records of important system and Admin actions.

| Column | Logical Type | Description |
| --- | --- | --- |
| audit_id | UUID | Primary key |
| actor_type | Enum | USER, ADMIN, SYSTEM |
| actor_id | String / Nullable | Actor identifier |
| event_type | String | Event name |
| related_user_id | Foreign Key / Nullable | Related user |
| related_transaction_id | Foreign Key / Nullable | Related transaction |
| related_session_id | Foreign Key / Nullable | Related session |
| action_result | String | Result |
| reason | String / Nullable | Reason |
| metadata_reference | String / Nullable | Protected metadata reference |
| created_at | Timestamp | Event time |

Requirements:

- Audit records must not be silently deleted.
- Sensitive information must not be copied into logs unnecessarily.
- Important administrative actions must always generate audit entries.
- Audit access must be restricted.

## 20. PUBLIC LEDGER BLOCKS TABLE

Table: `public_ledger_blocks`

Purpose: Store published app-operated public ledger blocks.

| Column | Logical Type | Description |
| --- | --- | --- |
| block_id | UUID | Internal primary key |
| block_number | Integer | Public block number |
| session_id | Foreign Key | Related mining session |
| block_hash | String | Cryptographic block hash |
| previous_block_hash | String / Nullable | Previous block hash |
| signature | Binary / String | Backend digital signature |
| signing_key_id | String | Public signing key reference |
| session_close_at | Timestamp | Session close time UTC |
| published_at | Timestamp / Nullable | Publication time UTC |
| publishing_status | Enum | PENDING, PUBLISHED, FAILED |
| created_at | Timestamp | Block creation time |

Constraints:

- Block number must be unique.
- Block hash must be unique.
- Previous block references must be valid.
- Published blocks must not be overwritten.
- Corrections must create new correction records or blocks.
- Historical signing key references must remain available.

## 21. PUBLIC LEDGER TRANSACTIONS TABLE

Table: `public_ledger_transactions`

Purpose: Store the public transaction records associated with published blocks.

| Column | Logical Type | Description |
| --- | --- | --- |
| public_transaction_id | UUID | Primary key |
| block_id | Foreign Key | Related public block |
| transaction_id | Foreign Key | Internal ledger transaction |
| public_user_identifier | String | Public User ID |
| amount | Exact SAC Amount | Public transaction amount |
| transaction_purpose | String | Public purpose |
| session_confirmation | String | Session reference |
| total_balance | Exact SAC Amount / Nullable | Balance according to approved public policy |
| created_at | Timestamp | Record creation time |

Only approved public fields may be exposed through the Explorer.

Passwords, KYC information, authentication data and other private information must never be published.

## 22. BACKUP RECORDS TABLE

Table: `backup_records`

Purpose: Track backup creation and verification.

| Column | Logical Type | Description |
| --- | --- | --- |
| backup_id | UUID | Primary key |
| backup_type | Enum | LAPTOP, GOOGLE_DRIVE, PEN_DRIVE |
| session_id | Foreign Key / Nullable | Related session |
| backup_reference | String | Protected backup location/reference |
| backup_status | Enum | STARTED, COMPLETED, FAILED, VERIFIED |
| checksum | String / Nullable | Integrity checksum |
| created_at | Timestamp | Backup creation time |
| verified_at | Timestamp / Nullable | Verification time |

Requirements:

- A backup must be created after every Mining Session.
- Backup history must be preserved.
- Backup files must be encrypted.
- Integrity must be verified.
- Failures must be reported to Admin.
- Monthly recovery tests must be recorded.

## 23. REQUIRED UNIQUE CONSTRAINTS

The final database implementation must enforce suitable uniqueness constraints.

At minimum:

| Table | Unique Constraint |
| --- | --- |
| users | user_id |
| users | user_number |
| users | username |
| referral_relationships | Current relationship per referred user |
| mining_sessions | session_number |
| mining_activations | user_id + session_id |
| mining_activations | idempotency key within operation scope |
| session_results | user_id + session_id |
| reward_records | user_id + session_id + reward_type |
| user_balances | user_id |
| ledger_transactions | transaction_id |
| public_ledger_blocks | block_number |
| public_ledger_blocks | block_hash |

The implementation must also enforce appropriate foreign key constraints.

## 24. TRANSACTION AND CONCURRENCY REQUIREMENTS

The backend must use database transactions for related operations.

Examples:

### 24.1 Reward Credit

The following operations must be consistent:

1. Validate reward eligibility.
2. Check duplicate reward status.
3. Create reward record.
4. Create ledger transaction.
5. Update balance summary.
6. Mark reward credited.
7. Commit the operation.

If any required step fails, the operation must not leave a partially credited balance.

### 24.2 Referral Group Change

The following must be processed atomically:

1. Validate user eligibility.
2. Validate new referrer.
3. Check referral capacity.
4. Close the old relationship.
5. Create the new relationship.
6. Mark the lifetime group-change opportunity as used.
7. Reset validity progress.
8. Record the audit event.

### 24.3 Cancellation

Cancellation must coordinate:

- Account status.
- Balance forfeiture.
- App Reserve accounting.
- Ledger entry.
- Audit event.
- Notification event.

The database must not leave the account cancelled while the required accounting operation is silently incomplete.

## 25. DATA RETENTION AND DELETION

The following records require protected retention:

- Ledger transactions.
- Mining session results.
- Reward records.
- Referral relationship history.
- Public ledger blocks.
- Audit logs.
- Administrative approval history.

Deleting a notification must not delete its source event.

Account cancellation must not automatically delete historical financial records.

Any personal data retention or deletion procedure must comply with applicable law and the approved privacy policy.

## 26. DATABASE MIGRATIONS

Every schema change must use a documented migration.

Migration requirements:

- Versioned migration files.
- Reviewed schema changes.
- Backup before production migration.
- Rollback or recovery strategy.
- Migration testing.
- Referential integrity verification.
- Data consistency checks.

Production schema changes must not be performed through undocumented manual edits.

## 27. DATABASE SECURITY

Mandatory requirements:

- Restrict database access.
- Use separate application and administrative permissions where appropriate.
- Encrypt backups.
- Protect database credentials.
- Avoid exposing the database directly to mobile clients.
- Use parameterized queries or safe ORM operations.
- Validate all inputs.
- Restrict access to KYC and Admin data.
- Avoid logging secrets.
- Monitor unusual database activity.

## 28. UNDECIDED IMPLEMENTATION DETAILS

The following must be finalized before production:

1. Database engine and version.
2. Exact SQL data types.
3. Smallest supported SAC unit.
4. Individual reward allocation formula.
5. Rounding and remainder policy.
6. Final transaction debit/credit convention.
7. Public total-balance disclosure policy.
8. KYC provider and document storage design.
9. Data retention periods.
10. Final index and query optimization strategy.
11. Database replication and disaster recovery configuration.

These decisions must be documented before the production schema is frozen.

## 29. FINAL DATABASE POLICY

The database must preserve the integrity of SAECOIN account, session, reward, referral, balance and ledger records.

All authoritative changes must be validated by the backend and recorded through controlled operations.

Financial records must use exact numeric representations, and duplicate processing must be prevented.

The database must support complete auditability, encrypted backup, recovery and reconciliation.

The database is part of a centralized application architecture. It does not independently establish a decentralized blockchain.

## 30. V1.2 SCHEMA ADDITIONS (DRAFT)

Schema additions and changes proposed for v1.2 are listed in section 11 of [00-Spec-v1.2-Decision-Record.md](00-Spec-v1.2-Decision-Record.md). They add account and double-entry ledger tables, reward calculation records, signing keys, phone and public-ID columns, slot status, and correction-block fields. They also change the activation table so that only accepted activations are stored, because the v1.1 combination of a REJECTED status and a unique (user_id, session_id) constraint is contradictory.

---

END OF DOCUMENT
