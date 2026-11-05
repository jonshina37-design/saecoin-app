SAECOIN — APP ARCHITECTURE

Version: 1.0
Project: SAECOIN App
Ticker: SAC
Mobile Platform: Android
Frontend: React Native + Expo + TypeScript
Backend: Self-hosted
Database: To be finalized
Status: Draft

---

1. PURPOSE

This document defines the software architecture of the SAECOIN App.

It describes how the mobile application, backend services, database, authentication system, mining session processor, referral system, and reward ledger interact.

The architecture must support:

- Secure user authentication.
- Account management.
- Community verification.
- Virtual mining sessions.
- Reward calculation.
- Referral processing.
- Mining history.
- Notifications.
- Administrative operations.
- Future blockchain reward distribution integration.

This architecture applies only to the SAECOIN App.

It does not include implementation of the future SAECOIN blockchain node or actual Proof-of-Work mining.

2. ARCHITECTURAL PRINCIPLES

The system must follow these principles:

1. Backend-authoritative processing.
2. Clear separation of frontend and backend.
3. Modular software design.
4. Secure data handling.
5. Consistent database transactions.
6. Auditable reward processing.
7. Reliable session management.
8. Minimal dependency on external hosted platforms.
9. Maintainable code.
10. Future expansion without unnecessary redesign.

The mobile application must never be the authority for account validity, mining sessions, reward balances, or referral eligibility.

3. HIGH-LEVEL SYSTEM ARCHITECTURE

The system consists of four primary layers:

1. Mobile Application.
2. Backend API.
3. Backend Business Logic.
4. Database.

Proposed architecture:

                  USER
                   |
                   v
        +-----------------------+
        |   SAECOIN ANDROID APP |
        |                       |
        | React Native          |
        | Expo                  |
        | TypeScript            |
        +-----------------------+
                   |
                   | HTTPS / JSON
                   v
        +-----------------------+
        |      BACKEND API      |
        |                       |
        | Authentication        |
        | Request Validation    |
        | Rate Limiting         |
        +-----------------------+
                   |
                   v
        +-----------------------+
        |   BUSINESS SERVICES   |
        |                       |
        | Account Service       |
        | Mining Service        |
        | Reward Service        |
        | Referral Service      |
        | Community Service      |
        | Notification Service  |
        | Admin Service         |
        +-----------------------+
                   |
                   v
        +-----------------------+
        |       DATABASE        |
        |                       |
        | Users                 |
        | Sessions              |
        | Rewards               |
        | Referrals             |
        | Verification          |
        | Audit Records         |
        +-----------------------+

External services, such as advertising providers and notification delivery services, may be connected through dedicated integration modules.

They must not become authoritative sources for account status or reward balances.

4. MOBILE APPLICATION ARCHITECTURE

The mobile application will use React Native, Expo, and TypeScript.

The frontend will be responsible for:

- Displaying application screens.
- Collecting user input.
- Managing navigation.
- Sending API requests.
- Displaying backend responses.
- Managing non-sensitive interface state.
- Handling loading and error states.
- Displaying mining countdowns.
- Displaying reward and referral information.

The frontend must not independently:

- Approve mining sessions.
- Calculate authoritative rewards.
- Change account validity.
- Approve referral eligibility.
- Modify reward balances.
- Cancel accounts.
- Create authoritative mining history.

4.1 Frontend Logical Structure

Proposed structure:

src/
│
├── app/
│   └── App.tsx
│
├── navigation/
│   ├── RootNavigator.tsx
│   ├── AuthNavigator.tsx
│   └── MainNavigator.tsx
│
├── screens/
│   ├── splash/
│   ├── onboarding/
│   ├── auth/
│   ├── verification/
│   ├── community/
│   ├── home/
│   ├── mining/
│   ├── referral/
│   ├── history/
│   ├── notifications/
│   ├── profile/
│   └── settings/
│
├── components/
│   ├── common/
│   ├── buttons/
│   ├── cards/
│   ├── dialogs/
│   └── navigation/
│
├── api/
│   ├── client.ts
│   ├── auth.api.ts
│   ├── account.api.ts
│   ├── mining.api.ts
│   ├── reward.api.ts
│   ├── referral.api.ts
│   └── notification.api.ts
│
├── services/
│   ├── auth.service.ts
│   ├── session.service.ts
│   └── storage.service.ts
│
├── hooks/
├── store/
├── types/
├── utils/
├── constants/
├── theme/
└── assets/

This is a logical baseline. The physical structure may be adjusted during implementation.

4.2 Navigation Architecture

The application will use separate navigation flows.

Root Navigator
      |
      +---- Authentication Flow
      |          |
      |          +---- Onboarding
      |          +---- Registration
      |          +---- Login
      |          +---- Verification
      |          +---- Community
      |
      +---- Main Application Flow
                 |
                 +---- Home
                 +---- Mining
                 +---- Referral
                 +---- History
                 +---- Profile

Account restrictions must be handled through a separate status screen.

Navigation permissions must not replace backend authorization.

4.3 Frontend State Management

The frontend may maintain:

- Authentication display state.
- User profile information.
- Current screen state.
- Mining countdown display.
- Cached history.
- Notification display state.
- Loading and error states.

The backend remains authoritative.

Cached data must be refreshed when necessary.

The application must not treat outdated cached information as a confirmed account or reward state.

5. BACKEND ARCHITECTURE

The backend will operate independently from the mobile application.

It will expose documented APIs and process all authoritative business operations.

The backend must support:

- Authentication.
- User management.
- Account verification.
- Community verification.
- Mining sessions.
- Reward calculation.
- Referral processing.
- Reward ledger management.
- Mining history.
- Notifications.
- Administrative operations.

5.1 Backend Logical Modules

Proposed module structure:

backend/
│
├── src/
│   ├── main/
│   │
│   ├── api/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── responses/
│   │
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── verification/
│   │   ├── community/
│   │   ├── mining/
│   │   ├── rewards/
│   │   ├── referrals/
│   │   ├── history/
│   │   ├── notifications/
│   │   └── admin/
│   │
│   ├── database/
│   │   ├── migrations/
│   │   ├── repositories/
│   │   └── connection/
│   │
│   ├── security/
│   ├── config/
│   ├── jobs/
│   ├── integrations/
│   ├── shared/
│   └── tests/
│
├── .env.example
├── README.md
└── package.json

This is a logical organization, not a finalized framework-specific directory structure.

5.2 Backend Module Responsibilities

Authentication Module

Responsibilities:

- Registration.
- Login.
- Logout.
- Password reset.
- Token management.
- Authentication validation.

User Module

Responsibilities:

- User profile.
- Account status.
- Account information.
- User preferences.

Verification Module

Responsibilities:

- Account verification.
- Verification status.
- Verification history.

Community Module

Responsibilities:

- Official community links.
- Membership verification status.
- Verification records.
- Verification timestamps.

Mining Module

Responsibilities:

- Session activation.
- Session validation.
- Session timestamps.
- Daily session limits.
- Session completion.
- Session history.

Reward Module

Responsibilities:

- Reward calculation.
- Mining Power application.
- Virtual reward ledger.
- Reward balance.
- Reward budget tracking.
- Reward reconciliation.

Referral Module

Responsibilities:

- Referral code generation.
- Referral code validation.
- Referral relationships.
- Referral limits.
- Referral validity.
- Mining Power bonus eligibility.

Notification Module

Responsibilities:

- Notification creation.
- Notification history.
- Delivery status.
- User notification preferences.

Admin Module

Responsibilities:

- Administrative authentication.
- Account review.
- Account status management.
- Reward monitoring.
- Referral monitoring.
- Audit history.
- System configuration management.

Administrative access must use role-based permissions.

6. API ARCHITECTURE

The mobile application will communicate with the backend through REST APIs.

Production communication must use HTTPS.

Proposed API base path:

/api/v1/

Proposed endpoint groups:

/api/v1/auth
/api/v1/users
/api/v1/account
/api/v1/verification
/api/v1/community
/api/v1/mining
/api/v1/rewards
/api/v1/referrals
/api/v1/history
/api/v1/notifications
/api/v1/admin

The exact endpoint definitions will be documented in the Backend Specification.

6.1 API Request Flow

Mobile Application
        |
        v
API Request
        |
        v
Authentication Middleware
        |
        v
Request Validation
        |
        v
Business Logic
        |
        v
Database Operation
        |
        v
API Response
        |
        v
Mobile Application

All protected operations must validate the user's authorization.

6.2 API Response Standards

Responses should use a consistent structure.

Example:

{
  "success": true,
  "data": {},
  "message": "Request completed successfully"
}

Error responses should provide safe, meaningful error codes and messages.

Internal database details, secrets, and stack traces must not be exposed to users.

7. DATABASE ARCHITECTURE

The system requires persistent database storage.

The final database engine will be selected in the Database Schema document.

The database architecture must support:

- Relational data integrity.
- Transactions.
- Unique constraints.
- Foreign keys where appropriate.
- Indexing.
- Backup and recovery.
- Migration management.
- Audit records.

7.1 Logical Database Domains

Database
   |
   +---- Identity
   |       +---- Users
   |       +---- Authentication Records
   |       +---- Verification Records
   |
   +---- Mining
   |       +---- Mining Sessions
   |       +---- Mining Status
   |
   +---- Rewards
   |       +---- Reward Ledger
   |       +---- Reward Budget
   |
   +---- Referral
   |       +---- Referral Codes
   |       +---- Referral Relationships
   |
   +---- Community
   |       +---- Community Verification
   |
   +---- System
           +---- Notifications
           +---- Audit Logs
           +---- Configuration

7.2 Data Integrity

Important operations must use database transactions where necessary.

Examples:

- Session completion and reward ledger creation.
- Referral validity and bonus eligibility updates.
- Account cancellation and reward balance reconciliation.
- Reward budget reservation and allocation.

The system must prevent duplicate reward entries.

Reward ledger entries must be traceable and auditable.

8. MINING SESSION ARCHITECTURE

The mining system is a virtual session and reward-processing system.

It is not a CPU/GPU mining process.

8.1 Session Activation

User
 |
 v
Mobile App
 |
 v
Mining API
 |
 v
Eligibility Validation
 |
 v
Daily Limit Validation
 |
 v
Active Session Check
 |
 v
Database Transaction
 |
 v
Create Session
 |
 v
Return Session Details

The backend must:

1. Verify authentication.
2. Check account eligibility.
3. Check community requirements.
4. Check daily activation limits.
5. Check for an existing active session.
6. Reserve or validate the required session state.
7. Create the session record.
8. Return authoritative timestamps.

8.2 Session Completion

The backend must evaluate the session using server-controlled timestamps.

Proposed flow:

Session Created
      |
      v
Server Start Timestamp
      |
      v
8-Hour Duration
      |
      v
Completion Evaluation
      |
      v
Validate Session
      |
      v
Calculate Reward
      |
      v
Create Reward Ledger Entry
      |
      v
Mark Session Completed

The exact ordering and atomic database transaction must be defined in the implementation.

The session must not be marked completed if reward processing fails.

Repeated completion processing must not create duplicate rewards.

8.3 Daily Limit Enforcement

The backend must enforce the maximum of 3 session activations per official day.

The official timezone and daily boundary must be defined in the Backend Specification.

Multiple devices and repeated requests must not bypass this limit.

9. REWARD ARCHITECTURE

The reward system must maintain a virtual reward ledger.

The ledger records reward events rather than relying only on a mutable displayed balance.

Each reward entry should include:

- User identifier.
- Related session identifier.
- Reward category.
- Reward amount.
- Mining Power information.
- Creation timestamp.
- Processing status.
- Reference information.

The displayed balance should be derived from valid ledger entries or maintained through a safely reconciled balance system.

9.1 Reward Categories

Proposed categories:

- Regular Mining Reward.
- Referral Mining Power Bonus.
- Reward Adjustment.
- Reward Reversal.

The final category definitions and calculations must follow the Mining Reward Specification.

9.2 Reward Budget

The separate App Mining allocation is 5,000,000 SAC.

The provisional daily budget is:

- Regular mining: 4,500 SAC.
- Referral bonus: 1,000 SAC.
- Safety reserve: 500 SAC.

Total provisional daily budget: 6,000 SAC.

These figures are not final until approved in the Mining Reward Specification.

The backend must prevent total reward processing from exceeding the remaining approved allocation.

Unused daily budget must not automatically increase the next day's maximum budget unless a revised policy explicitly permits it.

10. REFERRAL ARCHITECTURE

The referral system must operate through backend-controlled relationships.

Proposed flow:

Referrer
   |
   v
Referral Code
   |
   v
New User Registration
   |
   v
Backend Code Validation
   |
   v
Referral Relationship Created
   |
   v
21 Successful Sessions
   |
   v
Referral Validity Confirmed
   |
   v
Bonus Eligibility

The backend must enforce:

- Maximum 10 accepted referrals per referrer.
- No self-referral.
- 21 successful sessions for referred account validity.
- Independent bonus eligibility for each participant.
- Bonus application only during the relevant participant's active session.
- No banking of missed inactive-session bonuses.

The bonus percentage and formula remain subject to final approval.

11. ACCOUNT INACTIVITY ARCHITECTURE

The proposed inactivity policy cancels an account after 90 consecutive 8-hour session windows without a mining session activation.

This is equivalent to 720 hours or 30 continuous days.

The exact time anchor and evaluation method remain to be finalized.

The backend must:

1. Track the last qualifying session activation.
2. Evaluate inactivity.
3. Update account status.
4. Revoke applicable reward eligibility.
5. Reconcile unused virtual rewards with the Main Reward Pool.
6. Revoke applicable referral eligibility.
7. Record the cancellation event.

Account cancellation must be performed through a controlled backend process.

12. ADMINISTRATIVE ARCHITECTURE

Administrative functions must be isolated from normal user functionality.

The admin system should support:

- Secure administrator login.
- Role-based access control.
- Account status review.
- Referral monitoring.
- Reward monitoring.
- Reward budget monitoring.
- Community verification review.
- System announcements.
- Audit history.

Sensitive operations must require appropriate authorization.

All important administrative changes must be logged.

The system must not allow ordinary administrators to create arbitrary reward balances outside the approved reward policy.

13. EXTERNAL INTEGRATION ARCHITECTURE

External services may include:

- Advertisement providers.
- Email delivery providers.
- Push notification services.
- Community platform verification integrations.

Each integration must use a dedicated adapter or service module.

External providers must not directly control:

- Account validity.
- Mining session completion.
- Reward calculations.
- Reward balances.
- Referral eligibility.

Integration failures must be handled safely.

No provider integration should be treated as guaranteed until its technical and policy requirements are verified.

14. SECURITY ARCHITECTURE

Security must exist at every system layer.

14.1 Mobile Security

- Secure token storage.
- No hardcoded secrets.
- No sensitive data in logs.
- Input validation.
- Safe application configuration.

14.2 API Security

- HTTPS.
- Authentication middleware.
- Authorization checks.
- Request validation.
- Rate limiting.
- Safe error responses.
- Duplicate request protection.

14.3 Backend Security

- Secure password hashing.
- Environment-based secrets.
- Restricted administrative access.
- Database access controls.
- Audit logging.
- Dependency review.

14.4 Reward Security

- Server-side calculations.
- Atomic ledger processing.
- Duplicate reward prevention.
- Allocation limits.
- Reconciliation.
- Auditability.

Detailed security controls will be defined in the Security Specification.

15. DEPLOYMENT ARCHITECTURE

The initial development environment should allow the backend to run on the developer's own computer.

Proposed environments:

Development
    |
    +---- Android Emulator
    |
    +---- Physical Android Device
    |
    +---- Local Backend
    |
    +---- Development Database

Future production architecture:

Android Application
        |
        v
HTTPS
        |
        v
Self-Controlled Server
        |
        +---- Backend API
        |
        +---- Background Jobs
        |
        +---- Database
        |
        +---- Backup System

The production server may be deployed separately when the project is ready.

Development and production environments must remain isolated.

16. BACKUP AND RECOVERY ARCHITECTURE

The backend must support database backup and recovery.

Requirements:

- Scheduled backups.
- Protected backup storage.
- Documented recovery procedures.
- Backup integrity verification.
- Restricted backup access.
- Recovery testing.

Reward ledger records and mining session records require particular protection.

The project must define backup frequency and retention periods before production launch.

17. MONITORING AND AUDIT ARCHITECTURE

The backend should record important operational events.

Monitoring should cover:

- API availability.
- API errors.
- Authentication failures.
- Mining activation failures.
- Session completion failures.
- Reward processing failures.
- Database failures.
- Referral processing errors.
- Administrative actions.

Logs must not expose passwords, authentication tokens, private keys, or other sensitive data.

Audit records should be protected from unauthorized modification.

18. FUTURE BLOCKCHAIN INTEGRATION

The App Architecture should allow future integration with the SAECOIN blockchain distribution system.

Future functionality may include:

- Wallet address association.
- Reward eligibility review.
- Approved distribution requests.
- Distribution transaction references.
- On-chain confirmation status.

However:

1. The mobile application does not implement blockchain consensus.
2. The mobile application does not perform Proof-of-Work mining.
3. Virtual reward entries are not on-chain SAC.
4. The future blockchain distribution process must be separately approved.
5. Distribution must reconcile with the 5,000,000 SAC App Mining allocation.

The future blockchain node remains a separate project component.

19. ARCHITECTURAL DECISIONS TO FINALIZE

The following implementation decisions remain open:

Item| Current Direction| Finalization
Mobile framework| React Native + Expo| Selected
Mobile language| TypeScript| Selected
Primary IDE| Android Studio| Selected
Backend framework| Self-hosted backend| Pending
Backend language| To be selected| Pending
Database engine| Persistent relational database| Pending
API style| REST| Selected
API versioning| "/api/v1"| Proposed
Authentication strategy| Secure token-based authentication| Pending
Background job system| Backend-controlled| Pending
Hosting| Self-controlled server| Later
Admin interface| Separate administrative interface| Pending

Final technology choices must be documented before implementation.

20. FINAL ARCHITECTURE POLICY

The SAECOIN App must use a modular architecture with clear separation between the mobile application, backend services, and database.

All authoritative mining, reward, referral, and account operations must be controlled by the backend.

The database must preserve the integrity and traceability of all important records.

The architecture must support future expansion while keeping the current App Mining application independent from the future blockchain node.

Any significant architectural change must be documented and reviewed before implementation.

---

END OF DOCUMENT
