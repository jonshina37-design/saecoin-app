> **v1.2 NOTICE (draft):** This document belongs to the v1.1 set. Specification v1.2 ([00-Spec-v1.2-Decision-Record.md](00-Spec-v1.2-Decision-Record.md)) changes tokenomics, reward calculation, referral rules and other items. Where the two conflict, the v1.2 record prevails once approved.

SAECOIN — APP ARCHITECTURE SPECIFICATION

Version: 1.1
Project: SAECOIN App
Ticker: SAC (Provisional)
Platforms: Android and iOS
Mobile Technology: React Native + Expo + TypeScript
Architecture: Client–Server
Status: Draft — Updated for Approved Requirements

---

1. PURPOSE

This document defines the software architecture of the SAECOIN mobile application and its supporting backend systems.

The architecture establishes:

- Mobile application structure.
- Backend service responsibilities.
- Communication between application and backend.
- Authentication and authorization.
- Mining session processing.
- Reward calculation and distribution.
- Referral group processing.
- Balance and transaction management.
- Public ledger and Explorer integration.
- Admin operations.
- Security boundaries.
- Data consistency and failure recovery.

This document describes the current SAECOIN App architecture only.

It does not define or implement a decentralized blockchain network.

2. ARCHITECTURE OVERVIEW

SAECOIN will use a centralized client–server architecture.

The mobile application will provide the user interface and communicate with the backend through authenticated API requests.

The backend will remain authoritative for all important application operations.

2.1 High-Level Architecture

                 SAECOIN MOBILE APP
              Android / iOS
       React Native + Expo + TypeScript
                         |
                         |
                   HTTPS / REST API
                         |
                         v
                 API / BACKEND LAYER
                         |
          +--------------+--------------+
          |              |              |
          v              v              v
    Authentication   Mining Engine   Referral Engine
          |              |              |
          v              v              v
    Account Service  Reward Service  Group Service
          |              |              |
          +--------------+--------------+
                         |
                         v
                 LEDGER SERVICE
                         |
             +-----------+-----------+
             |                       |
             v                       v
       Database Layer          Admin Services
             |                       |
             v                       v
       Backup System          Admin Panel / API
             |
             v
       Public Ledger Publisher
             |
             v
          EXPLORER

This diagram represents logical responsibilities. It does not require every component to run as a separate server or process.

3. CORE ARCHITECTURAL PRINCIPLES

The following principles are mandatory:

1. Backend authority: the backend controls all account, mining, reward and referral decisions.
2. Client separation: the mobile application must not independently calculate or approve rewards.
3. Data integrity: balance and transaction changes must be recorded consistently.
4. Idempotency: retrying an operation must not create duplicate activations, rewards or transactions.
5. Security by design: authentication, authorization and input validation are required.
6. Auditability: important administrative and financial operations must be traceable.
7. Recoverability: incomplete operations must be recoverable after failures.
8. Scalability: modules should have clear responsibilities and interfaces.
9. Platform consistency: Android and iOS must follow the same backend rules.
10. Specification consistency: implementation must follow the approved project specifications.

4. MOBILE APPLICATION ARCHITECTURE

4.1 Technology

The mobile application will use:

- React Native.
- Expo.
- TypeScript.
- Shared Android and iOS codebase.
- REST API communication.
- JSON request and response formats.

The project must not switch to Kotlin/Jetpack Compose or another mobile framework without an approved architecture change.

4.2 Mobile Application Layers

Mobile Application
│
├── Presentation Layer
│   ├── Screens
│   ├── Components
│   ├── Navigation
│   └── UI State
│
├── Application Layer
│   ├── Authentication Use Cases
│   ├── Mining Use Cases
│   ├── Referral Use Cases
│   ├── Balance Use Cases
│   └── Notification Use Cases
│
├── Data Layer
│   ├── API Client
│   ├── Repositories
│   ├── DTO Models
│   └── Local Cache
│
└── Platform Integration
    ├── Secure Storage
    ├── Push Notifications
    └── OS Permissions

4.3 Presentation Layer

Responsibilities:

- Display screens.
- Handle user interaction.
- Display backend-provided account status.
- Display mining session status.
- Display reward and balance information.
- Display referral information.
- Display notifications.
- Display API errors and loading states.

The presentation layer must not implement authoritative reward or eligibility rules.

4.4 Application Layer

Responsibilities:

- Coordinate application use cases.
- Validate basic user input.
- Request operations from repositories.
- Manage application state.
- Handle authentication state.
- Interpret backend responses.

Client-side validation is for usability only. The backend must validate every important operation independently.

4.5 Data Layer

Responsibilities:

- Communicate with backend APIs.
- Serialize and deserialize JSON.
- Manage authenticated requests.
- Handle API errors.
- Provide repository interfaces.
- Cache non-sensitive data where appropriate.

The local cache must never become the authoritative source of account balances or mining rewards.

4.6 Platform Integration

Platform-specific integrations may include:

- Secure credential storage.
- Push notification registration.
- OS notification permissions.
- Network connectivity status.
- Application lifecycle handling.

Sensitive data must not be stored in ordinary unencrypted application storage.

5. BACKEND ARCHITECTURE

The backend is the authoritative system for SAECOIN.

It controls:

- Account registration and authentication.
- User status.
- Mining session schedules.
- Session activation.
- Session validation.
- Reward calculation.
- Referral eligibility.
- Referral group relationships.
- Balance changes.
- KYC status.
- Administrative approvals.
- Ledger records.
- Public ledger publication.

5.1 Logical Backend Modules

Backend
│
├── API Gateway / HTTP Layer
│
├── Authentication Module
├── User Account Module
├── Mining Session Module
├── Reward Calculation Module
├── Referral Module
├── Balance Module
├── Ledger Module
├── Notification Module
├── KYC Module
├── Admin Module
├── Audit Module
├── Backup Module
└── Public Ledger Publisher

These are logical modules. Their final deployment arrangement may be a modular monolith or another approved implementation that preserves the same responsibilities and security boundaries.

5.2 API Layer

Responsibilities:

- Receive client requests.
- Authenticate requests.
- Validate request structure.
- Apply authorization checks.
- Call the appropriate backend service.
- Return consistent responses.
- Apply rate limiting where appropriate.

The API layer must not bypass business rules or directly modify balances without the required service and ledger operations.

5.3 Authentication Module

Responsibilities:

- Registration.
- Login.
- Password verification.
- Session or token management.
- Logout.
- Token expiration.
- Account access validation.

The backend must determine whether an account is active, pending, suspended or cancelled.

5.4 User Account Module

Responsibilities:

- User profile.
- Permanent username.
- Unique User ID.
- Account status.
- Referral code.
- Current referral group.
- Account activity information.
- KYC status.

The username is the permanent referral code.

The unique User ID must remain stable even if display information changes.

5.5 Mining Session Module

Responsibilities:

- Maintain the official UTC session schedule.
- Accept session activation.
- Enforce one activation per user per scheduled session.
- Track session processing.
- Validate successful sessions.
- Handle missed sessions.
- Pause effective session progression during backend mining downtime.
- Resume from the correct state.

The backend clock is authoritative.

The three daily session slots are:

Session| UTC Start| UTC End
1| 04:00| 12:00
2| 12:00| 20:00
3| 20:00| 04:00 next day

Activation at any time within the scheduled slot counts for that full session if accepted by the backend.

Activation alone does not make a session successful.

A session becomes successful only after the scheduled slot ends and backend validation is completed.

5.6 Reward Calculation Module

Responsibilities:

- Determine session reward eligibility.
- Calculate regular mining distribution.
- Calculate referral bonus eligibility.
- Apply deterministic budget-safe allocation.
- Prevent duplicate reward allocation.
- Submit approved reward entries to the ledger.

The backend must use the approved tokenomics:

Allocation| SAC
Regular Mining| 12,960,000
Referral Bonus| 4,320,000
App Reserve| 1,720,000
Founder/Personal Reserve| 12,000,000
Node Mining| 0
Total Supply| 31,000,000

The network-wide reward pools per effective session are:

- Regular Mining: 6,000 SAC.
- Referral Bonus: 2,000 SAC.
- Total: 8,000 SAC.

These are network-wide pools, not guaranteed individual rewards.

The backend must ensure that actual distribution never exceeds the approved allocation.

5.7 Referral Module

Responsibilities:

- Validate referral codes.
- Create referral relationships.
- Enforce the maximum of 10 direct referrals.
- Check referrer eligibility.
- Check active direct referrals.
- Determine eligible referral groups.
- Process one lifetime group change.
- Apply the new relationship from the next new session.
- Prevent duplicate referral bonus shares.

A referrer must have at least three active direct referrals in the same session to qualify.

The referral module must follow the approved Referral Specification.

5.8 Balance Module

Responsibilities:

- Retrieve user balances.
- Calculate available and locked balances.
- Apply approved credits and debits.
- Coordinate with the ledger.
- Prevent unauthorized balance changes.
- Support reconciliation.

A balance must be derived from valid ledger transactions or maintained through a verified ledger-consistent accounting process.

The mobile application must not be able to directly set a balance.

5.9 Ledger Module

Responsibilities:

- Record financial transactions.
- Maintain immutable transaction history.
- Generate unique transaction identifiers.
- Maintain transaction references.
- Support reconciliation.
- Record approved corrections as new entries.

Existing ledger entries must never be secretly overwritten or deleted.

5.10 Notification Module

Responsibilities:

- Generate in-app notifications.
- Trigger push notifications.
- Record notification history.
- Track delivery status where supported.
- Handle notification events.

Notification events include:

- Session activation.
- Session success or failure.
- Reward credit.
- Referral bonus.
- Referral group change.
- Account status change.
- KYC status.
- Maintenance announcements.

Deleting a notification from a user's notification history must not delete its underlying transaction or system record.

6. DATABASE ARCHITECTURE

The database will be the persistent storage layer for application data.

The final database engine and deployment configuration must be confirmed in the Backend Specification.

Logical data domains include:

Database
│
├── Users
├── Authentication Sessions
├── User Profiles
├── Referral Relationships
├── Mining Sessions
├── Session Activations
├── Session Results
├── Reward Records
├── Balances
├── Ledger Transactions
├── Notifications
├── KYC Records
├── Admin Accounts
├── Admin Requests
├── Audit Logs
├── Backup Records
└── Public Ledger Blocks

Database requirements:

- Enforce primary and foreign key constraints where appropriate.
- Use unique constraints for critical identifiers.
- Use atomic database transactions for related financial operations.
- Prevent duplicate session activation.
- Prevent duplicate reward credit.
- Maintain immutable transaction history.
- Support backup and recovery.
- Record timestamps in UTC.
- Document schema migrations.

The detailed schema belongs in "07-Database-Schema.md".

7. API COMMUNICATION ARCHITECTURE

The mobile application will communicate with the backend through HTTPS REST APIs.

7.1 Communication Format

- Protocol: HTTPS.
- API style: REST.
- Data format: JSON.
- Authentication: backend-issued credentials or tokens.
- Time standard: UTC.
- API versioning: required for public API evolution.

7.2 Example API Groups

Illustrative endpoint groups:

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

Exact endpoint names and request/response structures must be defined in the API and Backend Specifications.

7.3 API Response Requirements

Responses should use consistent structures.

Successful responses should provide:

- Success status.
- Relevant data.
- Request or correlation identifier where appropriate.

Error responses should provide:

- Stable error code.
- Safe, understandable message.
- Request or correlation identifier where appropriate.

Internal server errors, secrets and sensitive implementation details must not be exposed to clients.

8. MINING SESSION PROCESSING FLOW

The following flow describes the logical session lifecycle.

Scheduled Session Opens
          |
          v
User Requests Activation
          |
          v
Backend Authentication
          |
          v
Activation Eligibility Check
          |
          v
Activation Accepted?
       /       \
     No         Yes
     |           |
     v           v
 Return Error  Save Activation
                 |
                 v
          Scheduled Slot Ends
                 |
                 v
          Backend Validation
                 |
                 v
          Session Successful?
              /       \
            No         Yes
            |           |
            v           v
        Save Failure  Determine Eligibility
                        |
                        v
                 Calculate Rewards
                        |
                        v
                 Ledger Transaction
                        |
                        v
                 Update Verified Balance
                        |
                        v
                 Publish Public Record

The flow is logical and may be implemented through background jobs, queues or database transactions.

8.1 Session Rules

- One activation per user per scheduled session.
- Missed sessions cannot be activated retrospectively.
- Activation does not guarantee success.
- A successful session requires backend validation after the slot ends.
- Application closure after activation does not cancel an accepted activation.
- Internet loss or device shutdown after accepted activation does not cancel it.
- Duplicate requests must not create duplicate activations or rewards.
- Reward credit should complete within five minutes after session end under normal operation.
- If processing fails, the operation must remain pending for safe retry or reconciliation.

8.2 Effective Session Counter

The system has 2,160 effective sessions.

If the backend mining system is unavailable, effective session progression must pause.

After recovery, processing must resume from the correct session state without skipping or duplicating effective sessions.

9. ACCOUNT STATUS ARCHITECTURE

The backend controls account status.

The application only displays the status returned by the backend.

Expected statuses include:

- PENDING.
- VALID.
- SUSPENDED.
- CANCELLED.

9.1 Initial Validity

A new user must complete 21 successful sessions to become VALID.

Regular Mining Reward is available during the first 21 successful sessions.

Referral Bonus is available only when the user is VALID and meets the applicable referral rules.

9.2 Inactivity

After becoming VALID, the user must complete at least one successful session within every rolling window of 90 scheduled session slots.

The counter resets only after a successful session.

Activation alone does not reset the counter.

If the user completes no successful session within the next 90 scheduled slots, the account becomes permanently CANCELLED.

A CANCELLED account cannot be reactivated.

The cancelled user's remaining balance is forfeited to App Reserve according to the approved rules.

9.3 Referral Group Change

A user may change their referral group once during their lifetime, after initial validity.

A successful group change:

- Resets the 21-session progress.
- Returns the account to pending validity.
- Continues Regular Mining Reward.
- Disables Referral Bonus until validity is regained.
- Does not change existing balance.
- Suspends the 90-slot inactivity counter until validity is regained.
- Takes effect from the next new session.

The backend must enforce these rules.

10. PUBLIC LEDGER AND EXPLORER ARCHITECTURE

SAECOIN will provide an app-operated public ledger and Explorer.

This ledger is not a decentralized blockchain.

It is a publicly inspectable, cryptographically verifiable record system operated by the SAECOIN backend.

10.1 Publishing Flow

Session Ends
     |
     v
Backend Validation
     |
     v
Database Records Confirmed
     |
     v
Ledger Transactions Prepared
     |
     v
Block Created
     |
     v
Block Hash Generated
     |
     v
Backend Signing Key Signs Block
     |
     v
Public Ledger Publisher
     |
     v
Explorer Makes Block Available

10.2 Block Requirements

Each published block should contain:

- Block Number.
- Block Hash.
- Previous Block Hash.
- Session Number.
- Session Close Time UTC.
- Backend Digital Signature.
- Block Publishing Time UTC.
- Associated transaction records.

Blocks must have unique identifiers and hash-linked history.

10.3 Public Transaction Information

The Explorer may display:

- Transaction ID.
- User ID.
- Transaction Amount in SAC.
- Transaction Purpose.
- Session Confirmation.
- Total Balance where permitted by the approved public data policy.

The public User ID consists of a username and unique generated number.

Example:

Username: Emon
User Number: 00001258

The Explorer must not expose:

- Passwords.
- Authentication tokens.
- Private keys.
- Recovery codes.
- KYC documents.
- Personal identity documents.
- Private contact information.
- Other confidential user data.

10.4 Verification

The Explorer must publish the applicable public verification key.

Users should be able to verify:

- Block hashes.
- Previous block references.
- Digital signatures.
- Transaction references.

Historical public keys must remain available to verify older blocks.

10.5 Corrections

Existing public blocks must remain immutable.

A correction must:

1. Be submitted as a correction request.
2. Be validated by the backend.
3. Receive Main Admin approval.
4. Create a new Correction Block.
5. Reference the original block or transaction.
6. Include the correction reason.
7. Preserve the original record.
8. Appear in the Explorer and Audit Log.

11. ADMIN ARCHITECTURE

Admin operations must be separated from normal user operations.

Admin access must use a protected administrative interface and backend authorization.

11.1 Admin Roles

Main Admin

Responsibilities:

- Final approval or rejection.
- Review security events.
- Review reward correction requests.
- Review account suspension evidence.
- Approve recovery operations.
- Manage Sub-Admins.
- Review audit logs.
- Review backup and system reports.

Sub-Admin

Responsibilities:

- Verify submitted information.
- Review evidence.
- Prepare reports.
- Forward requests to Main Admin.

Sub-Admins must not have final approval or rejection authority.

11.2 Approval Flow

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
Backend Validates Decision
       |
       v
Backend Executes Approved Action
       |
       v
Audit Log Updated

The backend must validate administrative authority before executing any protected operation.

12. SECURITY ARCHITECTURE

Security must be enforced at the backend and infrastructure layers.

Mandatory controls include:

- HTTPS for communication.
- Secure password hashing.
- Secure token handling.
- Role-based authorization.
- Input validation.
- Rate limiting.
- Protection against duplicate requests.
- Encrypted backups.
- Secure secret management.
- Audit logging.
- Protection of signing keys.
- Restricted administrative endpoints.

Admin authentication requires password and Authenticator App OTP.

Email OTP recovery and Main Admin recovery must follow the approved Security Specification.

The mobile application must never contain server-side secrets, private signing keys or administrative credentials.

13. BACKUP AND RECOVERY ARCHITECTURE

The backup system must preserve application and ledger consistency.

Backups must:

- Run after every Mining Session.
- Be encrypted.
- Include integrity verification.
- Preserve the history of all 2,160 effective sessions.
- Record backup status.
- Alert Admin when backup fails.

Approved backup destinations:

1. Laptop backup.
2. SAECOIN Google Drive backup.
3. Manual Pen Drive backup through the Admin Panel.

Monthly recovery tests must verify restoration from the available backup sources.

The detailed encryption and recovery process belongs in "10-Security-Specification.md" and "06-Backend-Specification.md".

14. ERROR HANDLING AND RECOVERY

The system must handle failures without corrupting balances or transaction history.

Important failure scenarios include:

- Mobile network interruption.
- API timeout.
- Backend downtime.
- Database failure.
- Mining session processing failure.
- Reward processing failure.
- Duplicate request.
- Public ledger publishing failure.
- Backup failure.
- Admin service failure.

14.1 Retry Requirements

Retryable operations must use unique operation identifiers or idempotency keys.

Retries must not create:

- Duplicate activations.
- Duplicate successful sessions.
- Duplicate reward credits.
- Duplicate ledger transactions.
- Duplicate public blocks.

14.2 Pending Operations

If a session or reward operation cannot complete:

- Preserve its processing state.
- Do not mark it successful without validation.
- Do not silently discard it.
- Allow safe retry or reconciliation.
- Record the final result.
- Notify the relevant Admin when manual review is required.

14.3 Maintenance Mode

During critical maintenance:

- Display an Under Maintenance state.
- Stop new activations when required.
- Stop reward processing when required.
- Preserve all balances and records.
- Prevent transfers or withdrawals if those features are later introduced and are affected.
- Resume only after backend validation.
- Record maintenance start and end times.

15. SCALABILITY AND DEPLOYMENT

The architecture should allow future growth without changing the core business rules.

Potential scaling measures include:

- Horizontal API scaling.
- Database indexing.
- Background job processing.
- Queue-based event processing.
- Read-only Explorer services.
- Caching of non-sensitive public data.
- Separate backup workers.
- Monitoring and alerting.

These are implementation options, not mandatory separate services from the beginning.

The first implementation should remain manageable and avoid unnecessary infrastructure complexity.

16. ARCHITECTURAL BOUNDARIES

The following boundaries are mandatory:

1. Mobile clients cannot approve rewards.
2. Mobile clients cannot change account status.
3. Mobile clients cannot directly modify balances.
4. Admin UI cannot bypass backend approval rules.
5. Explorer cannot modify ledger records.
6. Public ledger publication cannot become the source of truth over the backend database.
7. Notification deletion cannot delete financial records.
8. A user cannot activate a missed session.
9. A user cannot obtain duplicate rewards through repeated requests.
10. No CPU/GPU Proof-of-Work mining is performed by the mobile application.
11. The current app-operated ledger must not be described as decentralized.
12. Future independent blockchain development must remain separate from this app architecture.

17. FUTURE EXTENSIBILITY

The architecture may later support:

- Additional mobile features.
- A web-based Explorer.
- Improved Admin Panel.
- Additional monitoring services.
- Independent blockchain integration.
- External wallet integration.
- Additional verification tools.

Any future independent blockchain must have its own protocol, consensus, node, security and deployment specifications.

It must not be treated as an existing feature of the current SAECOIN App.

18. IMPLEMENTATION REQUIREMENTS

Implementation must follow these documents:

- "01-App-PRD.md"
- "02-UI-UX-Design.md"
- "03-App-Flow-Specification.md"
- "04-Technical-Requirements.md"
- "06-Backend-Specification.md"
- "07-Database-Schema.md"
- "08-Mining-Reward-Specification.md"
- "09-Referral-Specification.md"
- "10-Security-Specification.md"
- "11-Testing-Strategy.md"
- "12-Release-and-Launch-Plan.md"

If a conflict is found between documents, implementation must pause for clarification rather than silently choosing a different rule.

19. FINAL ARCHITECTURE POLICY

The SAECOIN App will use a centralized client–server architecture with React Native, Expo and TypeScript for the mobile application.

The backend remains the authoritative system for all account, session, reward, referral, balance, administrative and ledger operations.

The public ledger is an app-operated, append-only and cryptographically verifiable record system. It is not a decentralized blockchain.

Security, consistency, auditability and recoverability take priority over unnecessary technical complexity.

Any significant architectural change must be documented, reviewed and approved before implementation.

---

END OF DOCUMENT
