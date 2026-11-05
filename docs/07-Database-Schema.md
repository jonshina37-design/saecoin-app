SAECOIN — DATABASE SCHEMA

Version: 1.0
Project: SAECOIN App
Ticker: SAC (Provisional)
Status: Draft
Document Type: Database Technical Specification

---

1. PURPOSE

This document defines the proposed database structure for the SAECOIN App.

The database must support:

- User accounts.
- Authentication sessions.
- Community verification.
- Mining sessions.
- Mining eligibility.
- Account validity.
- Mining Power.
- Virtual SAC rewards.
- Reward ledger.
- Referral relationships.
- Referral bonuses.
- Account inactivity.
- Notifications.
- Administrative access.
- Audit records.
- System configuration.

The database must maintain consistency, security, traceability, and reliable financial-style accounting for all virtual reward operations.

2. DATABASE DESIGN PRINCIPLES

The database must follow these principles:

1. Maintain clear relationships between entities.
2. Prevent duplicate records where uniqueness is required.
3. Use transactions for critical operations.
4. Preserve reward ledger history.
5. Store authoritative timestamps on the server.
6. Validate relationships through database constraints.
7. Prevent unauthorized access to sensitive records.
8. Support reliable backup and recovery.
9. Keep application logic separate from database structure.
10. Avoid unnecessary duplication of authoritative data.

The selected database engine remains subject to final approval.

The schema is designed around relational database capabilities.

3. DATABASE OVERVIEW

The proposed database contains the following logical tables:

database/
│
├── users
├── user_auth_sessions
├── user_status_history
├── community_verifications
│
├── mining_sessions
├── mining_daily_usage
│
├── reward_ledger
├── reward_processing
│
├── referrals
├── referral_bonus_records
│
├── notifications
│
├── admin_users
├── admin_roles
├── admin_user_roles
│
├── audit_logs
├── background_jobs
└── system_settings

These are logical table names. Final naming and data types must follow the selected database engine and migration conventions.

4. COMMON DATA RULES

4.1 Primary Keys

Every main entity must have a unique primary key.

UUID-based identifiers are proposed for records that may be created across different services.

4.2 Timestamps

Store authoritative timestamps in UTC.

Suggested timestamp fields:

- "created_at"
- "updated_at"
- "started_at"
- "completed_at"
- "expires_at"
- "cancelled_at"

The application may convert timestamps to the user's display timezone.

The device clock must never determine authoritative mining or reward timestamps.

4.3 Monetary Values

SAC amounts must use exact decimal or integer-based units.

Floating-point database types must not be used for reward accounting.

The final SAC precision and smallest accounting unit must be defined in the Mining Reward Specification.

4.4 Status Fields

Statuses should use controlled values.

The application must reject unknown or invalid status transitions.

4.5 Deletion Policy

Critical accounting records must not be physically deleted through normal application operations.

Use status changes, audit records, and adjustment transactions where appropriate.

Personal information deletion or anonymization must follow applicable legal and privacy requirements.

5. USERS TABLE

Table: "users"

Purpose: Stores user account information.

Field| Suggested Type| Rules
id| UUID| Primary key
username| VARCHAR| Unique, if username login is supported
email| VARCHAR| Unique, if email registration is enabled
phone_number| VARCHAR| Unique, if phone registration is enabled
password_hash| VARCHAR| Secure password hash
display_name| VARCHAR| Optional
profile_image_url| TEXT| Optional
account_status| VARCHAR| Controlled status
successful_sessions| INTEGER| Default 0
is_valid| BOOLEAN| Default false
last_mining_activation_at| TIMESTAMP| Nullable
valid_at| TIMESTAMP| Nullable
cancelled_at| TIMESTAMP| Nullable
created_at| TIMESTAMP| Required
updated_at| TIMESTAMP| Required

5.1 Account Status Values

Suggested values:

- "PENDING_VERIFICATION"
- "ACTIVE"
- "MINING_ELIGIBLE"
- "INVALID"
- "SUSPENDED"
- "CANCELLED"

The exact transition rules must follow the Backend Specification.

5.2 Constraints

- Primary key must be unique.
- Enabled login identifiers must be unique.
- Successful session count cannot be negative.
- Account validity must be determined by backend logic.
- Password hashes must never contain plaintext passwords.

6. USER AUTHENTICATION SESSIONS TABLE

Table: "user_auth_sessions"

Purpose: Stores active and historical authentication sessions.

Field| Suggested Type| Rules
id| UUID| Primary key
user_id| UUID| Foreign key to users
refresh_token_hash| VARCHAR| Secure token hash
device_identifier| VARCHAR| Optional
expires_at| TIMESTAMP| Required
revoked_at| TIMESTAMP| Nullable
created_at| TIMESTAMP| Required
last_used_at| TIMESTAMP| Nullable

Requirements:

- Store token hashes instead of plaintext refresh tokens.
- Revoke tokens during logout or security events.
- Reject expired and revoked sessions.
- Support multiple devices according to the authentication policy.

7. USER STATUS HISTORY TABLE

Table: "user_status_history"

Purpose: Records account status changes.

Field| Suggested Type| Rules
id| UUID| Primary key
user_id| UUID| Foreign key to users
previous_status| VARCHAR| Nullable
new_status| VARCHAR| Required
reason| VARCHAR| Required
changed_by| UUID| User, admin, or system reference
created_at| TIMESTAMP| Required

Requirements:

- Record every important status transition.
- Do not silently overwrite historical transitions.
- Restrict modification to authorized backend operations.

8. COMMUNITY VERIFICATIONS TABLE

Table: "community_verifications"

Purpose: Stores community participation verification records.

Field| Suggested Type| Rules
id| UUID| Primary key
user_id| UUID| Foreign key to users
platform| VARCHAR| Telegram, X, Facebook
verification_status| VARCHAR| Controlled status
verification_method| VARCHAR| Required
external_reference| VARCHAR| Optional
verified_at| TIMESTAMP| Nullable
expires_at| TIMESTAMP| Nullable
created_at| TIMESTAMP| Required
updated_at| TIMESTAMP| Required

Suggested verification statuses:

- "PENDING"
- "VERIFIED"
- "REJECTED"
- "EXPIRED"
- "REVOKED"

Requirements:

- A user must not have duplicate active verification records for the same platform and verification requirement.
- Never store social media passwords.
- Verification must follow approved platform rules.
- Verification method and evidence must be auditable.

9. MINING SESSIONS TABLE

Table: "mining_sessions"

Purpose: Stores every mining session activation and result.

Field| Suggested Type| Rules
id| UUID| Primary key
user_id| UUID| Foreign key to users
status| VARCHAR| Controlled session status
started_at| TIMESTAMP| Server timestamp
scheduled_end_at| TIMESTAMP| Server-calculated
completed_at| TIMESTAMP| Nullable
mining_day| DATE| Project-defined day
mining_power_snapshot| DECIMAL| Required snapshot
idempotency_key| VARCHAR| Unique within user scope
failure_reason| VARCHAR| Nullable
created_at| TIMESTAMP| Required
updated_at| TIMESTAMP| Required

9.1 Session Statuses

- "ACTIVE"
- "COMPLETED"
- "FAILED"
- "CANCELLED"

9.2 Constraints

- A user cannot have multiple active sessions unless a future policy explicitly permits it.
- Session end time must be later than start time.
- A completed session must have a valid completion timestamp.
- A failed or cancelled session cannot generate a normal mining reward.
- Duplicate activation requests must not create duplicate sessions.
- A session must belong to exactly one user.

9.3 Session Duration

The current session duration is 8 hours.

The backend must calculate the scheduled end time using server time.

The database must preserve the original start and scheduled end timestamps.

The mobile application's countdown must not modify these values.

10. MINING DAILY USAGE TABLE

Table: "mining_daily_usage"

Purpose: Tracks daily mining activation limits.

Field| Suggested Type| Rules
id| UUID| Primary key
user_id| UUID| Foreign key to users
mining_day| DATE| Required
activation_count| INTEGER| Default 0
created_at| TIMESTAMP| Required
updated_at| TIMESTAMP| Required

Constraints:

- Unique combination of "user_id" and "mining_day".
- Activation count cannot be negative.
- Activation count cannot exceed the approved daily limit through normal backend operations.
- The current maximum is 3 activations per project-defined day.

The project timezone and daily reset boundary must be finalized before implementation.

Activation count updates must be transaction-safe to prevent simultaneous requests from exceeding the limit.

11. REWARD LEDGER TABLE

Table: "reward_ledger"

Purpose: Maintains the authoritative history of virtual SAC reward transactions.

Field| Suggested Type| Rules
id| UUID| Primary key
user_id| UUID| Foreign key to users
transaction_type| VARCHAR| Controlled type
amount| DECIMAL| Exact SAC amount
related_session_id| UUID| Nullable
related_referral_id| UUID| Nullable
reference_id| UUID| Optional external operation reference
idempotency_key| VARCHAR| Unique where applicable
description| TEXT| Optional
created_at| TIMESTAMP| Required
created_by| UUID| System or authorized admin reference

11.1 Transaction Types

- "MINING_REWARD"
- "REFERRAL_BONUS"
- "REWARD_ADJUSTMENT"
- "REWARD_REVERSAL"
- "ACCOUNT_CANCELLATION_RETURN"

11.2 Ledger Rules

1. Every accepted reward must have a ledger record.
2. Duplicate reward processing must be prevented.
3. Historical ledger records must not be silently edited.
4. Corrections must use adjustment or reversal records.
5. Every record must be traceable to its originating operation.
6. Reward amounts must use exact numeric representation.
7. Ledger entries must be created within the same database transaction as the corresponding balance update, if a cached balance is maintained.

11.3 Balance Calculation

The authoritative virtual reward balance must be calculated from the user's eligible ledger entries.

A cached balance may be maintained for performance, but it must be reconciled against the ledger.

The cache must never become an independent source of truth.

The rules for positive and negative transaction types must be defined explicitly in the reward implementation.

12. REWARD PROCESSING TABLE

Table: "reward_processing"

Purpose: Tracks the processing state of reward operations.

Field| Suggested Type| Rules
id| UUID| Primary key
user_id| UUID| Foreign key to users
session_id| UUID| Foreign key to mining_sessions
processing_status| VARCHAR| Controlled status
calculated_amount| DECIMAL| Exact amount
processing_key| VARCHAR| Unique
processed_at| TIMESTAMP| Nullable
failure_reason| TEXT| Nullable
created_at| TIMESTAMP| Required
updated_at| TIMESTAMP| Required

Suggested statuses:

- "PENDING"
- "PROCESSING"
- "COMPLETED"
- "FAILED"

Requirements:

- Each eligible session must have at most one successful normal reward-processing operation.
- Retry operations must not create duplicate ledger entries.
- Processing and ledger creation must be transaction-safe.
- Failed processing must be traceable.

13. REFERRALS TABLE

Table: "referrals"

Purpose: Stores referral relationships.

Field| Suggested Type| Rules
id| UUID| Primary key
referrer_user_id| UUID| Foreign key to users
referred_user_id| UUID| Foreign key to users
referral_code| VARCHAR| Optional
status| VARCHAR| Controlled status
accepted_at| TIMESTAMP| Nullable
qualified_at| TIMESTAMP| Nullable
revoked_at| TIMESTAMP| Nullable
created_at| TIMESTAMP| Required
updated_at| TIMESTAMP| Required

Suggested statuses:

- "PENDING"
- "ACCEPTED"
- "QUALIFIED"
- "REVOKED"

Constraints:

- A user cannot refer themselves.
- A referred account can have only one accepted referrer.
- A referrer cannot exceed 10 accepted referrals under the current policy.
- Duplicate referral relationships must be prevented.
- Referral status changes must be recorded and auditable.

14. REFERRAL BONUS RECORDS TABLE

Table: "referral_bonus_records"

Purpose: Tracks referral bonus calculations and eligibility.

Field| Suggested Type| Rules
id| UUID| Primary key
referral_id| UUID| Foreign key to referrals
beneficiary_user_id| UUID| Foreign key to users
session_id| UUID| Foreign key to mining_sessions
mining_power_bonus| DECIMAL| Exact configured value
applied| BOOLEAN| Required
reason| VARCHAR| Required
created_at| TIMESTAMP| Required

Requirements:

- Track each participant's bonus independently.
- A participant must be actively mining in the relevant session for their bonus to apply.
- An inactive participant must not receive a banked or deferred bonus.
- One participant's eligibility must not depend on the other participant being active.
- A bonus must not be duplicated for the same beneficiary, referral, and session.
- The final bonus formula must follow the Mining Reward Specification.

15. NOTIFICATIONS TABLE

Table: "notifications"

Purpose: Stores user notifications.

Field| Suggested Type| Rules
id| UUID| Primary key
user_id| UUID| Foreign key to users
notification_type| VARCHAR| Required
title| VARCHAR| Required
message| TEXT| Required
is_read| BOOLEAN| Default false
related_reference_id| UUID| Nullable
created_at| TIMESTAMP| Required
read_at| TIMESTAMP| Nullable

Requirements:

- Notifications must belong to a valid user.
- Read status must be tracked.
- Notification delivery failure must not affect mining or reward records.

16. ADMIN USERS TABLE

Table: "admin_users"

Purpose: Stores administrative accounts separately from normal user accounts.

Field| Suggested Type| Rules
id| UUID| Primary key
email| VARCHAR| Unique
password_hash| VARCHAR| Secure password hash
status| VARCHAR| Controlled status
created_at| TIMESTAMP| Required
updated_at| TIMESTAMP| Required
last_login_at| TIMESTAMP| Nullable

Administrative accounts must use stronger security controls than ordinary user accounts.

17. ADMIN ROLES TABLE

Table: "admin_roles"

Purpose: Defines administrative roles.

Field| Suggested Type| Rules
id| UUID| Primary key
role_name| VARCHAR| Unique
description| TEXT| Optional
created_at| TIMESTAMP| Required

Suggested roles:

- "SUPER_ADMIN"
- "ADMIN"
- "SUPPORT"
- "MODERATOR"
- "AUDITOR"

18. ADMIN USER ROLES TABLE

Table: "admin_user_roles"

Purpose: Connects administrators with their assigned roles.

Field| Suggested Type| Rules
id| UUID| Primary key
admin_user_id| UUID| Foreign key to admin_users
admin_role_id| UUID| Foreign key to admin_roles
assigned_at| TIMESTAMP| Required
assigned_by| UUID| Nullable

Constraints:

- Prevent duplicate assignment of the same role to the same administrator.
- Only authorized administrators may assign or revoke roles.
- Role changes must be auditable.

19. AUDIT LOGS TABLE

Table: "audit_logs"

Purpose: Maintains records of sensitive system and administrative operations.

Field| Suggested Type| Rules
id| UUID| Primary key
actor_type| VARCHAR| User, admin, or system
actor_id| UUID| Nullable
action| VARCHAR| Required
entity_type| VARCHAR| Required
entity_id| UUID| Nullable
old_values| JSON| Optional
new_values| JSON| Optional
ip_address| VARCHAR| Optional
created_at| TIMESTAMP| Required

Requirements:

- Record sensitive operations.
- Restrict access to audit records.
- Prevent ordinary users from modifying audit records.
- Avoid storing passwords, tokens, and other secrets.
- Preserve sufficient information to investigate reward and account disputes.

20. BACKGROUND JOBS TABLE

Table: "background_jobs"

Purpose: Tracks scheduled and asynchronous processing.

Field| Suggested Type| Rules
id| UUID| Primary key
job_type| VARCHAR| Required
job_status| VARCHAR| Controlled status
reference_id| UUID| Nullable
attempts| INTEGER| Default 0
scheduled_at| TIMESTAMP| Required
started_at| TIMESTAMP| Nullable
completed_at| TIMESTAMP| Nullable
last_error| TEXT| Nullable
created_at| TIMESTAMP| Required
updated_at| TIMESTAMP| Required

Suggested job types:

- "SESSION_COMPLETION"
- "REWARD_PROCESSING"
- "REFERRAL_QUALIFICATION"
- "INACTIVITY_CHECK"
- "ACCOUNT_CANCELLATION"
- "NOTIFICATION_DELIVERY"

Requirements:

- Jobs must support safe retries.
- Duplicate execution must not duplicate business operations.
- Failed jobs must be observable.
- Critical job results must be traceable.

21. SYSTEM SETTINGS TABLE

Table: "system_settings"

Purpose: Stores controlled application configuration.

Field| Suggested Type| Rules
id| UUID| Primary key
setting_key| VARCHAR| Unique
setting_value| JSON| Required
description| TEXT| Optional
updated_by| UUID| Nullable
updated_at| TIMESTAMP| Required

Possible settings:

- Session duration.
- Daily session limit.
- Required successful session count.
- Maximum accepted referrals.
- Inactivity threshold.
- Project timezone.
- Daily reward budget.
- Mining reward parameters.
- Referral bonus parameters.
- App Mining allocation.

Sensitive credentials and private secrets must not be stored as ordinary application settings.

Changes to critical settings must require authorization and create audit records.

22. TABLE RELATIONSHIPS

The main relationships are:

users
  │
  ├── user_auth_sessions
  ├── user_status_history
  ├── community_verifications
  ├── mining_sessions
  │      ├── reward_processing
  │      └── referral_bonus_records
  │
  ├── mining_daily_usage
  ├── reward_ledger
  ├── referrals
  │      └── referral_bonus_records
  │
  └── notifications

admin_users
  └── admin_user_roles
         └── admin_roles

audit_logs
background_jobs
system_settings

Foreign keys must enforce valid relationships.

Deleting a parent record must not accidentally erase critical accounting history.

23. DATABASE INDEXING

Indexes should be added for frequently queried fields.

Suggested indexes:

Table| Indexed Fields
users| email, phone_number, account_status
mining_sessions| user_id, status, started_at
mining_daily_usage| user_id, mining_day
reward_ledger| user_id, created_at, transaction_type
reward_processing| session_id, processing_status
referrals| referrer_user_id, referred_user_id, status
referral_bonus_records| beneficiary_user_id, session_id
notifications| user_id, is_read, created_at
audit_logs| actor_id, entity_type, entity_id, created_at
background_jobs| job_status, scheduled_at

Unique indexes must be used where duplicate records are prohibited.

The final indexing strategy must be reviewed using actual query patterns and performance tests.

24. TRANSACTION AND DATA INTEGRITY RULES

The following operations require database transaction protection:

1. Mining session activation.
2. Daily mining usage updates.
3. Session completion.
4. Reward calculation and ledger insertion.
5. Cached balance updates, if maintained.
6. Referral qualification.
7. Referral bonus processing.
8. Account cancellation and reward return.
9. Administrative reward adjustments.

If a critical operation fails, the database must not be left in a partially updated state.

Concurrent requests must not bypass session limits, referral limits, or reward allocation limits.

Use appropriate database locking, unique constraints, isolation levels, and transaction boundaries.

25. DATA RETENTION AND PRIVACY

The system must distinguish between personal data and accounting records.

Requirements:

- Restrict access to personal information.
- Retain only necessary personal information.
- Define retention periods.
- Protect backups.
- Support applicable data deletion or anonymization requirements.
- Preserve legally required audit and accounting records.
- Avoid exposing private data through logs or analytics.

The final retention policy must be approved before production launch.

26. MIGRATION MANAGEMENT

Database schema changes must use version-controlled migrations.

Rules:

- Every schema change must have a migration.
- Migrations must be reviewed.
- Destructive migrations require additional review.
- Production migrations must be backed up and planned.
- Migration failures must be handled safely.
- Migration history must be maintained.

Do not manually modify production database schemas without a documented migration.

27. BACKUP AND RECOVERY

The database must support:

- Scheduled backups.
- Protected backup storage.
- Backup integrity verification.
- Recovery procedures.
- Recovery testing.
- Ledger reconciliation after restoration.

Backup frequency and retention periods remain subject to final operational policy.

28. OPEN DECISIONS

The following items must be finalized before implementation:

1. Database engine.
2. UUID and identifier implementation.
3. SAC precision and smallest accounting unit.
4. Project timezone and daily reset boundary.
5. Exact inactivity time anchor.
6. Final mining reward formula.
7. Referral bonus formula.
8. Cached balance strategy.
9. Data retention policy.
10. Backup frequency and retention.
11. Final migration tooling.
12. Database indexing based on real query patterns.

These decisions must remain consistent with the Backend Specification, Mining Reward Specification, Security Specification, and App Architecture.

29. FINAL DATABASE POLICY

The database must preserve accurate account, mining, referral, and reward information.

Reward accounting must remain traceable and resistant to duplicate processing.

Critical operations must be transaction-safe.

The reward ledger must remain the authoritative record of virtual SAC credits and debits.

The database must support the current App Mining system without depending on future blockchain functionality.

---

END OF DOCUMENT
