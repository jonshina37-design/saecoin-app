SAECOIN — PRODUCT REQUIREMENTS DOCUMENT (PRD)

Document ID: SAECOIN-APP-PRD-001
Version: 1.1
Project: SAECOIN App
Product Type: Virtual Mining Reward Application
Status: Draft — Updated for Approved Requirements
Platforms: Android and iOS
Framework: React Native + Expo
Language: TypeScript
Backend: Shared server-authoritative backend
Database: Shared backend database

---

1. PROJECT OVERVIEW

SAECOIN App is a cross-platform mobile application that provides users with a virtual mining reward distribution system.

Users can:

- Create and manage accounts.
- Activate scheduled mining sessions.
- Receive virtual SAC rewards after successful backend validation.
- Invite other users through referral codes.
- Participate in referral groups.
- Track session history and reward balances.
- View public session and reward records through the SAECOIN Explorer.

SAECOIN App Mining is an application-operated virtual reward system. It is not actual Proof-of-Work blockchain mining.

The application does not use mobile-device CPU or GPU resources to mine cryptocurrency.

The application initially operates independently of a decentralized SAECOIN blockchain. Any future independent blockchain implementation will be a separate project phase.

The backend is authoritative for account status, session validation, referral eligibility, reward calculations, reward balances, and public ledger publication.

2. PROJECT OBJECTIVES

The primary objectives are:

1. Develop SAECOIN mobile applications for Android and iOS.
2. Maintain one shared application codebase using React Native, Expo, and TypeScript.
3. Provide a consistent experience across both platforms.
4. Implement a scheduled virtual mining session system.
5. Distribute virtual SAC rewards within the approved allocation.
6. Implement a controlled referral system.
7. Maintain accurate and auditable reward records.
8. Provide a publicly verifiable, application-operated block ledger.
9. Protect user accounts and reward records.
10. Prepare the application architecture for possible future blockchain integration without representing the current system as decentralized.

3. PLATFORM AND TECHNOLOGY REQUIREMENTS

Component| Technology
Android Application| React Native
iOS Application| React Native
Framework| Expo
Programming Language| TypeScript
Development Environment| Android Studio and approved iOS development tooling
Backend| Shared server-authoritative backend
Database| Shared backend database
API| REST API
Authentication| Secure server-side authentication
Version Control| GitHub

3.1 Cross-Platform Requirements

- Android and iOS must use the same backend.
- Both platforms must follow identical business rules.
- Mining session calculations must be performed by the backend.
- Reward calculations must not depend on the mobile platform.
- User balances and account status must remain consistent across devices.
- Platform-specific permissions and notification behavior must be handled appropriately.
- Android and iOS builds must be tested independently.
- iOS signing, release configuration, and App Store requirements must be addressed before iOS launch.

The project must not introduce a separate reward or referral implementation for either platform.

4. PROJECT SCOPE

4.1 Included Features

- User registration and authentication.
- Account recovery.
- User profile and unique User ID.
- Mining dashboard.
- Scheduled eight-hour mining sessions.
- Virtual SAC reward distribution.
- Session history.
- Referral codes and referral groups.
- Referral eligibility validation.
- Account validity and inactivity management.
- KYC workflow after completion of all effective sessions.
- Notifications.
- Public block and transaction explorer.
- Administrative management.
- Security monitoring.
- Backup and recovery.
- Maintenance and operational controls.

4.2 Excluded Features

The initial application does not include:

- Decentralized blockchain full nodes.
- Decentralized consensus.
- SHA-256d Proof-of-Work mining.
- Mobile CPU mining.
- Mobile GPU mining.
- User-controlled blockchain wallet addresses.
- On-chain UTXO creation.
- Exchange trading.
- Guaranteed SAC market price.
- Guaranteed financial returns.
- Guaranteed withdrawal or token listing.
- Decentralized network validation.

These features must not be presented as existing application capabilities.

5. USER REGISTRATION AND AUTHENTICATION

Users must be able to:

- Register an account.
- Log in.
- Log out.
- Recover account access.
- Change account credentials.
- View account status.
- View their unique User ID.
- View their referral username/code.

The system must prevent duplicate accounts according to the finalized account verification and fraud-prevention rules.

Authentication must be handled securely by the backend.

Sensitive authentication data must never be exposed in public records or application logs.

6. USER ID AND REFERRAL IDENTITY

Each user must have:

- A unique username.
- A unique system-generated User ID.
- A permanent referral code based on the username.

Example:

- Username: Emon
- User ID: 00001258
- Referral Code: Emon

The username/referral code must remain unique and permanent.

The application must not expose private account information through public User ID searches.

7. MINING SESSION SYSTEM

7.1 Mining Concept

SAECOIN App Mining is a virtual reward distribution system.

It is not actual blockchain Proof-of-Work mining.

The mobile application does not use the device CPU or GPU to mine cryptocurrency.

The backend controls session eligibility, session completion, reward calculation, and reward crediting.

7.2 Daily Session Schedule

The system uses three fixed eight-hour UTC sessions:

Session| Start (UTC)| End (UTC)
Session 1| 04:00| 12:00
Session 2| 12:00| 20:00
Session 3| 20:00| 04:00 next day

The backend clock is authoritative.

7.3 Session Activation

- Users must manually activate each eligible session.
- A user can activate only once per scheduled session.
- Activation is allowed at any time during the complete eight-hour session window.
- Activation at 04:01 UTC or 11:59 UTC counts for the same scheduled session.
- A missed session cannot be activated retrospectively.
- Each scheduled session is independent.
- A user cannot activate the same session more than once.

7.4 Session Completion

A session is successful only after its scheduled eight-hour slot has ended and the backend has validated the session.

The backend must validate:

- User identity.
- Session ID.
- Scheduled session slot.
- Activation record.
- Account status.
- Session eligibility.
- Reward budget availability.
- Duplicate processing status.
- Reward calculation.

Client-side timers and device clocks must never be treated as authoritative.

7.5 Device and Network Interruption

After a valid activation:

- Closing the application does not cancel the session.
- Turning off the device does not cancel the session.
- Losing internet connectivity does not cancel the session.
- The backend remains responsible for session completion and validation.

A session must not be considered successful merely because the user activated it.

7.6 Reward Processing Time

After a successful session ends:

- The backend should complete reward processing within five minutes.
- If a server failure prevents processing, the session must remain pending.
- Processing must resume after recovery and validation.
- Unique session and reward identifiers must prevent duplicate crediting.

7.7 Effective Session Count

The application has a total target of 2,160 effective scheduled sessions.

If mining operations or backend services are stopped, the effective session count must pause.

After recovery, the system resumes from the previous effective-session state.

Downtime must not silently consume effective session allocations.

8. TOKENOMICS AND APP REWARD ALLOCATION

8.1 Total Supply

The approved total SAECOIN supply is:

31,000,000 SAC

The application must operate within the approved allocation and must not create additional SAC.

8.2 Approved Allocation

Category| Allocation
Regular Mining| 12,960,000 SAC
Referral Bonus| 4,320,000 SAC
App Reserve| 1,720,000 SAC
Founder/Personal Reserve| 12,000,000 SAC
Node Mining| 0 SAC
Total| 31,000,000 SAC

8.3 App Mining Distribution

The App Mining Distribution consists of:

- Regular Mining: 12,960,000 SAC.
- Referral Bonus: 4,320,000 SAC.
- Total App Mining Distribution: 17,280,000 SAC.

8.4 App Reserve

The App Reserve consists of:

- Initial App Reserve: 1,000,000 SAC.
- Unused App Mining allocation transferred to App Reserve: 720,000 SAC.
- Total App Reserve: 1,720,000 SAC.

The App Reserve distribution policy remains undecided and must be specified separately before implementation.

The App Reserve must not be confused with the Founder/Personal Reserve.

8.5 Per-Session Reward Pool

Each effective session has a network-wide reward pool:

Category| Per Session
Regular Mining| 6,000 SAC
Referral Bonus| 2,000 SAC
Total| 8,000 SAC

Across 2,160 effective sessions:

- Regular Mining: 12,960,000 SAC.
- Referral Bonus: 4,320,000 SAC.
- Total: 17,280,000 SAC.

These are network-wide session pools, not guaranteed individual rewards.

Individual reward allocations must be calculated deterministically by the backend and must never exceed the available category budget.

9. ACCOUNT VALIDITY

9.1 Initial Validity

A newly registered account must complete 21 successful mining sessions to become VALID.

Only successful sessions count.

An activation alone does not count as a successful session.

9.2 Initial 21 Sessions

During the first 21 successful sessions:

- Regular Mining Reward may be credited according to the approved reward rules.
- Referral Bonus is not available to the user.
- The account remains in its initial validation period.

After the 21st successful session is validated, the account becomes VALID.

9.3 Inactivity After Validity

A VALID account must complete at least one successful session within every rolling window of 90 scheduled session slots.

The inactivity counter:

- Applies only to VALID accounts.
- Counts scheduled session slots, not calendar days.
- Resets only after a successful session.
- Does not reset merely because a user activates a session.

If the user completes no successful session within the next 90 scheduled slots, the account becomes permanently CANCELLED.

9.4 Cancellation

A CANCELLED account:

- Cannot be reactivated.
- Cannot continue normal mining.
- Loses eligibility for future rewards.
- Has its remaining virtual balance handled according to the approved forfeiture policy, with the forfeited amount transferred to the App Reserve.
- Must retain required non-identifying accounting and audit records where legally permitted or required.

The application must clearly distinguish account cancellation from temporary suspension.

10. REFERRAL SYSTEM

10.1 Referral Code

Each username is the user's permanent referral code.

The system must validate referral codes before accepting a referral relationship.

Invalid referral codes must be rejected visibly.

The system must not create pending referral relationships for invalid codes.

Self-referral is prohibited.

10.2 Direct Referral Limit

A user may have a maximum of 10 direct referrals.

The backend must enforce this limit.

10.3 Referral Eligibility

Referral Bonus eligibility depends on the approved referral group rules.

The referrer must:

- Be eligible in the same session.
- Have at least three direct referrals active in that session.

If the parent group is not eligible, a qualifying child group may still participate independently.

Each user may receive at most one Referral Bonus share per session.

10.4 Group Change

A user may change their Referral Group once during their lifetime.

The change is allowed only after the user completes the initial 21 successful sessions and becomes VALID.

Rules:

- A valid change is processed automatically.
- The previous referrer does not need to approve it.
- An invalid attempt does not consume the lifetime opportunity.
- The user cannot return to the same current referrer.
- A new relationship becomes effective from the next new session.
- An already active session retains the previous group relationship.
- A group change does not alter the user's existing reward balance.

After a successful group change:

- The user's 21-session validity progress resets.
- The account returns to the pending validation period.
- Regular Mining Reward continues according to the approved rules.
- Referral Bonus is disabled until the account becomes VALID again.
- The 90-slot inactivity counter is suspended during this rebuild period.

11. KYC REQUIREMENTS

KYC is required only after the user completes all 2,160 effective sessions.

KYC is not required:

- During registration.
- During the initial 21 successful sessions.
- Before completion of all effective sessions.

If KYC is required but not completed:

- The user's eligible balance may be temporarily locked.
- The balance must not be forfeited solely because KYC is pending.
- The application must clearly explain the pending KYC status.

The KYC provider, accepted documents, verification workflow, and data retention policy remain subject to separate approval.

12. PUBLIC BLOCK LEDGER AND EXPLORER

12.1 Ledger Concept

After a session ends, the backend validates the relevant database records and publishes an application-operated public block ledger.

The ledger must be:

- Append-only.
- Hash-linked.
- Digitally signed.
- Timestamped.
- Publicly inspectable.
- Cryptographically verifiable.

This is not a decentralized or trustless blockchain.

The backend remains the authoritative source of application records.

12.2 Public Block Information

The Explorer should display:

- Block Number.
- Block Hash.
- Previous Block Hash.
- Backend Digital Signature.
- Block Publishing Time (UTC).
- Session Number.
- Session Close Time (UTC).
- Transaction ID.
- User ID.
- Transaction Amount (SAC).
- Transaction Purpose.
- Session Confirmation.
- Total Balance.

12.3 Public Verification

The application must publish the relevant public verification key through the Explorer.

Users must be able to verify block hashes and digital signatures.

Historical public keys must remain available so older blocks can continue to be verified.

12.4 Correction Policy

Published blocks must never be silently deleted or modified.

If a correction is required:

1. A correction request must be created.
2. The backend validates the request and supporting records.
3. Main Admin approval is required.
4. A new Correction Block is published.
5. The Correction Block references the original block and explains the correction.
6. The original block remains visible.
7. The correction is recorded in the Audit Log.

12.5 Signing Key Replacement

If a signing key is lost, compromised, or replaced:

- Main Admin approval is required.
- The old public key must remain available.
- Historical blocks remain verifiable with the old key.
- New blocks use the new signing key.
- Key replacement must be recorded in the Audit Log.

12.6 Privacy

Public records must never expose:

- Passwords.
- Authentication secrets.
- Private keys.
- Recovery codes.
- KYC documents.
- Personal contact information.
- Sensitive account data.

13. NOTIFICATION SYSTEM

The application must support:

- In-App notifications.
- Push notifications.

Supported notification events include:

- Mining session availability.
- Mining activation.
- Session success or failure.
- Reward crediting.
- Referral bonus.
- Referral group changes.
- Account validity changes.
- Account cancellation.
- Account suspension.
- Account reactivation.
- KYC requirement and verification.
- System announcements.
- Planned maintenance.
- Emergency maintenance.
- Maintenance completion.

Notification history must remain available in the application.

Users may delete notifications from their own notification history. Deleting a notification must not delete the underlying session, reward, ledger, or audit record.

If operating-system push permission is denied, In-App notification history must continue to work.

Users can manage push permissions through their Android or iOS operating-system settings.

14. APPLICATION SCREENS

The initial application should include:

1. Splash Screen.
2. Onboarding Screen.
3. Registration Screen.
4. Login Screen.
5. Account Recovery Screen.
6. Home Dashboard.
7. Mining Session Screen.
8. Session Completion Screen.
9. Reward History.
10. Referral Screen.
11. Referral Group Screen.
12. Profile Screen.
13. Notification Screen.
14. KYC Screen.
15. Settings Screen.
16. Help and Support Screen.
17. Maintenance Screen.
18. Account Status Screen.

The complete UI layouts will be defined in the UI/UX Design Specification.

15. HOME DASHBOARD

The Home Dashboard should display:

- Current virtual SAC balance.
- Account status.
- Current session status.
- Current session countdown.
- Mining activation control.
- Successful session count.
- Remaining effective sessions.
- Regular Mining reward history.
- Referral Bonus history.
- Referral progress.
- Referral count.
- Recent activity.
- Notifications.
- Explorer access.

The dashboard must clearly distinguish virtual reward balances from actual blockchain assets.

16. ADMINISTRATION

The application requires a restricted administrative system.

Administrative operations must be role-based and auditable.

16.1 Admin Roles

The initial administrative structure includes:

- Main Admin.
- Sub-Admin.

The Main Admin has final approval authority.

Sub-Admins may:

- Verify submitted evidence.
- View user records.
- Prepare reports.
- Review relevant transaction history.
- Submit findings to Main Admin.

Sub-Admins must not have final approval or rejection authority.

16.2 Administrative Approval

The standard workflow is:

Request Received → Sub-Admin Verification → Main Admin Review → Approve/Reject → Backend Action.

The backend must validate requests before the Main Admin receives them for final approval.

16.3 Account Suspension

Administrators must not directly suspend, cancel, or delete user accounts.

The backend may automatically suspend an account when fraud or security concerns are detected.

The system must:

- Record the reason.
- Preserve relevant evidence.
- Notify the user where appropriate.
- Allow the user to submit evidence.
- Require Main Admin review.
- Reactivate the account after approval.
- Keep the account suspended after rejection.

16.4 Reward Corrections

Administrators must not directly edit or delete reward ledger entries.

Reward corrections require:

- User ID.
- Session ID.
- Reward ID.
- Existing ledger record.
- Proposed correction.
- Reason.
- Transaction history.
- Backend validation.
- Main Admin approval.

All corrections must preserve the original record and create an auditable correction entry.

16.5 Admin Authentication

Admin login must use:

- Password.
- Authenticator App OTP.

OTP must expire.

Email OTP recovery may be used according to the approved recovery workflow.

Main Admin recovery must require:

- Recovery Email.
- OTP.
- Backup Recovery Code.

Recovery codes must be one-time-use and securely protected.

All recovery operations must be logged, and existing sessions must be revoked after successful recovery.

17. SECURITY REQUIREMENTS

The application must implement:

- Secure authentication.
- Server-side authorization.
- Secure API communication.
- Rate limiting.
- Input validation.
- Duplicate account detection.
- Referral fraud detection.
- Session integrity checks.
- Idempotent reward processing.
- Secure storage of sensitive data.
- Audit logging.
- Administrative role separation.
- Encrypted backup.
- Recovery procedures.
- Signing-key protection.
- Public ledger verification.

The backend must remain authoritative for account status, session validation, referral eligibility, reward balances, and ledger publication.

No mobile client may independently approve or create rewards.

18. BACKUP, MAINTENANCE AND RECOVERY

18.1 Backup

The system must create an encrypted backup after every effective mining session.

Backup requirements:

- Integrity verification.
- Backup history.
- Secure encryption.
- Backup failure alerts.
- Recovery testing.
- Preservation of all effective session records.

The approved backup destinations include:

- Laptop backup.
- Separate SAECOIN Google Drive backup.
- Manual Pen Drive backup through the Admin Panel.

Monthly recovery testing must be performed.

18.2 Maintenance

During planned or emergency maintenance:

- New session activation must stop.
- Reward processing must stop safely where necessary.
- Existing balances must remain intact.
- Existing ledger records must not be deleted.
- The application must display maintenance status.
- Users must receive appropriate notifications.
- Operations may resume only after backend validation.

18.3 Recovery

After a system failure:

- Incomplete sessions must remain identifiable.
- Unprocessed rewards must remain pending.
- Backend validation must be performed.
- Administrative approval is required before recovery reward processing.
- Unique IDs and idempotency must prevent duplicate rewards.
- Recovery actions must be logged.

19. TESTING REQUIREMENTS

The application must be tested for:

- Android compatibility.
- iOS compatibility.
- Registration and authentication.
- Account recovery.
- Session activation.
- Session completion.
- UTC schedule boundaries.
- Effective session counting.
- Downtime pause and recovery.
- Reward calculations.
- Reward budget limits.
- Referral eligibility.
- Referral group changes.
- Direct referral limits.
- Account validity.
- Inactivity cancellation.
- KYC locking.
- Public ledger integrity.
- Digital signature verification.
- Correction blocks.
- Admin approval workflows.
- Backup and recovery.
- Notification delivery.
- Network interruptions.
- Security vulnerabilities.

Testing must include invalid, abusive, boundary, and recovery scenarios.

20. RELEASE STRATEGY

The application will be developed and validated in stages.

Phase 1 — Foundation

- Project setup.
- Shared React Native and Expo configuration.
- TypeScript configuration.
- Design system.
- Splash screen.
- Onboarding.
- Authentication foundation.

Phase 2 — Core Application

- Home dashboard.
- Mining session interface.
- Reward history.
- Referral interface.
- Profile.
- Notifications.
- Explorer access.

Phase 3 — Backend Integration

- Authentication API.
- Account management.
- Mining session API.
- Reward ledger.
- Referral API.
- Account validity.
- Public ledger API.

Phase 4 — Administration and Security

- Admin authentication.
- Approval workflows.
- Reward correction workflow.
- Security controls.
- Backup and recovery.
- Audit logging.

Phase 5 — Testing

- Android testing.
- iOS testing.
- Backend integration testing.
- Reward validation.
- Referral validation.
- Security testing.
- Performance testing.
- Recovery testing.

Phase 6 — Launch Preparation

- Android release configuration.
- iOS release configuration.
- Application signing.
- Privacy policy.
- Terms and conditions.
- Store listing.
- Production readiness review.

Public Testnet or public Beta is not mandatory. Internal testing must be completed before public launch.

Critical bugs and unresolved security vulnerabilities must block release.

21. FUTURE DEVELOPMENT

After the SAECOIN App is completed and launched, the project may separately consider:

- SAECOIN Blockchain Core.
- Full Node.
- Consensus Implementation.
- UTXO Transaction System.
- P2P Network.
- SHA-256d Node Mining.
- Decentralized Wallet.
- Independent Blockchain Explorer.

These are separate development phases and must not be represented as current application functionality.

22. FINAL REQUIREMENTS

The SAECOIN App must:

1. Support Android and iOS.
2. Use a shared React Native + Expo + TypeScript codebase.
3. Use the approved 31,000,000 SAC total supply allocation.
4. Enforce the approved 2,160 effective session limit.
5. Use the approved 6,000 SAC Regular Mining and 2,000 SAC Referral Bonus session pools.
6. Use backend-authoritative session and reward validation.
7. Enforce account validity and inactivity rules.
8. Enforce referral limits and group-change rules.
9. Maintain accurate and auditable reward records.
10. Publish a signed, hash-linked public application ledger.
11. Protect user information and administrative operations.
12. Support encrypted backup and recovery.
13. Avoid promises of guaranteed market value or financial returns.
14. Remain clearly separate from any future decentralized blockchain implementation.

---

END OF DOCUMENT

Document Status: Draft — Updated for User Review
Next Document: 02 — UI/UX Design SpecificationSpecification
