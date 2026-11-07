> **v1.2 NOTICE (draft):** This document belongs to the v1.1 set. Specification v1.2 ([00-Spec-v1.2-Decision-Record.md](00-Spec-v1.2-Decision-Record.md)) changes tokenomics, reward calculation, referral rules and other items. Where the two conflict, the v1.2 record prevails once approved.

SAECOIN — APP FLOW SPECIFICATION

Document ID: SAECOIN-APP-FLOW-003
Version: 1.1
Project: SAECOIN App
Status: Draft — Updated for Approved Requirements
Platforms: Android and iOS
Framework: React Native + Expo
Language: TypeScript
Backend: Shared server-authoritative backend
Time Standard: UTC

---

1. PURPOSE

This document defines the complete application flow and user interaction requirements for SAECOIN App.

It describes how users navigate the application, interact with mining sessions, receive virtual SAC rewards, manage referrals, complete KYC, and access public ledger information.

It also defines the backend interactions required for each major operation.

The application must use the same business rules and backend services on Android and iOS.

The backend is authoritative for all account, session, reward, referral, and ledger operations.

2. GENERAL APPLICATION FLOW

The main application flow is:

Application Launch
       |
       v
Splash Screen
       |
       v
Check Authentication
       |
       +----------------------+
       |                      |
       v                      v
Not Authenticated       Authenticated
       |                      |
       v                      v
Onboarding/Login        Load Account Status
       |                      |
       v                      v
Registration/Login      Validate Account
       |                      |
       v                      v
Backend Authentication  Load Dashboard
       |                      |
       v                      v
Open Dashboard <--------+

The application must not rely on locally stored account status as the final authority.

Account status must be retrieved or validated through the backend.

3. APPLICATION INITIALIZATION FLOW

3.1 Launch

When the application launches:

1. Display the splash screen.
2. Initialize the application environment.
3. Load essential configuration.
4. Check whether a valid authentication session exists.
5. Validate the session with the backend.
6. Retrieve the current account state.
7. Navigate to the appropriate screen.

3.2 Authentication Validation

If the authentication session is valid:

- Retrieve the user's account information.
- Retrieve account status.
- Load the dashboard.

If authentication has expired:

- Clear invalid authentication state securely.
- Navigate to Login.
- Preserve no sensitive credentials in ordinary application storage.

If the backend is unavailable:

- Display an appropriate connection or maintenance state.
- Do not assume that the user is authenticated or eligible for mining based only on cached data.

4. REGISTRATION FLOW

Open Application
       |
       v
Registration Screen
       |
       v
Enter Registration Details
       |
       v
Enter Referral Code (if applicable)
       |
       v
Validate Input
       |
       v
Submit Registration
       |
       v
Backend Validation
       |
       +------------------------+
       |                        |
       v                        v
Registration Failed      Registration Successful
       |                        |
       v                        v
Show Error               Create Account
                                |
                                v
                         Assign Unique User ID
                                |
                                v
                         Save Referral Relationship
                                |
                                v
                         Registration Confirmation
                                |
                                v
                         Dashboard / Onboarding

4.1 Registration Input

The registration form may contain:

- Username.
- Approved account identifier.
- Password.
- Confirm Password.
- Referral Code.
- Terms and Privacy Policy acceptance.

The exact account identifier and verification process must follow the finalized authentication specification.

4.2 Referral Validation

When a referral code is supplied:

1. The backend checks whether the code exists.
2. The backend checks whether the code is valid.
3. The backend prevents self-referral.
4. The backend checks the direct referral limit.
5. The backend creates the relationship only if validation succeeds.

Invalid referral codes must be rejected visibly.

The system must not create pending relationships for invalid referral codes.

4.3 Registration Completion

After successful registration:

- Assign a unique User ID.
- Store the username as the permanent referral code.
- Save the referral relationship, if valid.
- Initialize the account status.
- Initialize the successful session count to zero.
- Initialize the reward balance according to the approved account rules.

5. LOGIN FLOW

Login Screen
     |
     v
Enter Credentials
     |
     v
Submit Login
     |
     v
Backend Authentication
     |
     +----------------------+
     |                      |
     v                      v
Invalid Credentials    Authentication Successful
     |                      |
     v                      v
Show Error             Create Authentication Session
                            |
                            v
                     Load Account Status
                            |
                            v
                     Open Dashboard

The backend must enforce authentication and account access restrictions.

The mobile application must not independently approve login attempts.

6. ACCOUNT RECOVERY FLOW

Login Screen
     |
     v
Forgot Password
     |
     v
Enter Account Identifier
     |
     v
Request Recovery
     |
     v
Backend Recovery Validation
     |
     v
Send Approved Verification Method
     |
     v
User Completes Verification
     |
     v
Set New Password
     |
     v
Backend Updates Credentials
     |
     v
Revoke Required Existing Sessions
     |
     v
Recovery Confirmation

Requirements:

- Verification must be performed by the backend.
- OTP must expire.
- Sensitive recovery information must not be exposed.
- Account enumeration must be prevented.
- Recovery operations must be logged where required.

7. DASHBOARD FLOW

After successful authentication:

1. Request current user profile.
2. Request account status.
3. Request current virtual SAC balance.
4. Request current mining session.
5. Request successful session count.
6. Request reward history summary.
7. Request referral summary.
8. Request notification summary.
9. Display dashboard.

The dashboard must show backend-confirmed data.

If any request fails, the application must display an appropriate loading, error, or stale-data indicator.

Cached information must never be presented as a newly confirmed reward or session result.

8. MINING SESSION FLOW

8.1 Daily UTC Schedule

The system uses three fixed eight-hour scheduled sessions.

Session| Start UTC| End UTC
Session 1| 04:00| 12:00
Session 2| 12:00| 20:00
Session 3| 20:00| 04:00 next day

The backend clock is authoritative.

8.2 Session Activation Flow

Open Mining Screen
       |
       v
Request Current Session
       |
       v
Backend Checks Eligibility
       |
       +-----------------------------+
       |                             |
       v                             v
Not Eligible                    Eligible
       |                             |
       v                             v
Show Reason                  Show Activate Button
                                     |
                                     v
                              User Activates
                                     |
                                     v
                              Send Activation Request
                                     |
                                     v
                              Backend Validation
                                     |
                                     +----------------------+
                                     |                      |
                                     v                      v
                                Rejected               Accepted
                                     |                      |
                                     v                      v
                                Show Error           Save Activation
                                                            |
                                                            v
                                                    Show ACTIVATED

8.3 Activation Rules

- One activation per user per scheduled session.
- Activation is permitted at any time during the complete eight-hour session.
- Activation at the beginning or near the end counts for that scheduled session.
- A missed session cannot be activated retrospectively.
- The same session cannot be activated twice.

The backend must enforce all activation restrictions.

8.4 After Activation

After the backend confirms activation:

- Display ACTIVATED.
- Disable the activation button for that session.
- Display the session end time.
- Continue displaying the session status.

Closing the application, shutting down the device, or losing internet connectivity after valid activation does not cancel the session.

8.5 Session Completion

At the scheduled session end:

1. The backend closes the session.
2. The backend validates activation records.
3. The backend validates account eligibility.
4. The backend validates referral eligibility where applicable.
5. The backend calculates eligible rewards.
6. The backend checks reward budget limits.
7. The backend creates reward records.
8. The backend updates the relevant account balances.
9. The backend marks the session result.
10. The backend publishes the corresponding public ledger information.

The mobile application retrieves the confirmed result.

8.6 Reward Processing Flow

Scheduled Session Ends
          |
          v
Backend Session Closure
          |
          v
Validate Session Records
          |
          v
Validate Account Eligibility
          |
          v
Calculate Regular Mining Pool
          |
          v
Calculate Referral Bonus Pool
          |
          v
Check Allocation Limits
          |
          v
Create Unique Reward Records
          |
          v
Update Balances Atomically
          |
          v
Mark Session Successful
          |
          v
Notify User
          |
          v
Publish Public Ledger Records

Reward processing should normally complete within five minutes after session end.

If processing fails:

- Keep the relevant operation pending.
- Record the failure.
- Retry safely after recovery.
- Prevent duplicate rewards through unique IDs and idempotency.

A session activation alone must never be presented as proof of reward completion.

9. SESSION STATUS FLOW

The interface must handle these statuses:

Status| Meaning
UPCOMING| Scheduled session has not started
AVAILABLE| User may activate
ACTIVATED| Backend accepted activation
PROCESSING| Backend validation or reward processing is pending
SUCCESSFUL| Session validation completed successfully
FAILED| Session was unsuccessful
MISSED| User did not activate the session
MAINTENANCE| Relevant session operations are paused

The backend determines the final status.

10. EFFECTIVE SESSION COUNT FLOW

The total target is 2,160 effective scheduled sessions.

The effective session counter must advance only when the relevant scheduled session has been processed according to the approved operational rules.

If backend or mining operations are stopped:

- Pause the effective session count.
- Preserve the current effective-session position.
- Resume from the previous state after recovery.

Downtime must not consume effective session allocations.

The application must display remaining effective sessions using backend-confirmed data.

11. ACCOUNT VALIDITY FLOW

11.1 Initial Account Validation

New Account
     |
     v
PENDING
     |
     v
Complete Successful Sessions
     |
     v
Backend Validates Each Session
     |
     v
Increase Successful Session Count
     |
     v
Has User Completed 21 Successful Sessions?
     |
     +------------------------+
     |                        |
     v                        v
No                       Yes
     |                        |
     v                        v
Remain PENDING             Set VALID

Rules:

- The account needs 21 successful sessions.
- Activation alone does not count.
- Failed or missed sessions do not count.
- The backend must validate each successful session.

11.2 After Becoming VALID

After the 21st successful session:

- Set account status to VALID.
- Enable referral reward eligibility when other conditions are satisfied.
- Start the rolling 90 scheduled session-slot inactivity rule.

11.3 Inactivity Flow

Account VALID
      |
      v
Track Scheduled Session Slots
      |
      v
Successful Session?
      |
      +----------------------+
      |                      |
      v                      v
Yes                         No
      |                      |
      v                      v
Reset Counter          Increase Counter
                             |
                             v
                    Has Counter Reached 90?
                             |
                      +------+------+
                      |             |
                      v             v
                     No            Yes
                      |             |
                      v             v
                 Continue      CANCELLED

Rules:

- The counter applies only to VALID users.
- It counts scheduled session slots, not calendar days.
- It resets only after a successful session.
- Activation alone does not reset the counter.
- If no successful session occurs within the next 90 scheduled slots, the account becomes permanently CANCELLED.

11.4 Cancellation Flow

When an account is cancelled:

- Block further normal mining participation.
- Prevent future referral reward eligibility.
- Mark the account permanently CANCELLED.
- Transfer the remaining virtual balance to the App Reserve according to the approved forfeiture rule.
- Preserve required audit and accounting records.

Cancelled accounts cannot be reactivated.

12. REFERRAL FLOW

12.1 Referral Registration

New User Registration
         |
         v
Enter Referral Code
         |
         v
Backend Validates Code
         |
         +-------------------------+
         |                         |
         v                         v
Invalid Code                  Valid Code
         |                         |
         v                         v
Reject Referral             Check Self-Referral
                                   |
                                   v
                           Check Direct Limit
                                   |
                                   v
                           Create Relationship
                                   |
                                   v
                           Registration Complete

12.2 Referral Eligibility

The backend must determine referral bonus eligibility for each session.

The referrer must:

- Be eligible in the same session.
- Have at least three direct referrals active in that session.

If the parent group is not eligible, a qualifying child group may still participate.

One user may receive no more than one Referral Bonus share per session.

The frontend must display the eligibility result provided by the backend.

12.3 Direct Referral Limit

The maximum direct referrals per user is 10.

When the limit is reached:

- Reject additional direct referral relationships.
- Show a clear explanation.
- Do not create an invalid or pending relationship.

13. REFERRAL GROUP CHANGE FLOW

A user may change their Referral Group once during their lifetime.

The change is permitted only after the initial 21 successful sessions and VALID status.

Account VALID
      |
      v
Open Referral Group Screen
      |
      v
Check Lifetime Change Availability
      |
      +---------------------------+
      |                           |
      v                           v
Already Used                  Available
      |                           |
      v                           v
Disable Change               Enter New Referrer
                                  |
                                  v
                           Backend Validates
                                  |
                                  +----------------------+
                                  |                      |
                                  v                      v
                              Invalid                 Valid
                                  |                      |
                                  v                      v
                             Show Error           Save Group Change
                                                         |
                                                         v
                                                  Apply Next New Session
                                                         |
                                                         v
                                               Reset Validity Progress
                                                         |
                                                         v
                                                    PENDING

Rules:

- A valid change is automatic.
- No previous referrer approval is required.
- Invalid attempts do not consume the opportunity.
- The user cannot return to the same current referrer.
- The new relationship becomes effective from the next new session.
- An already active session retains the previous group.
- Existing reward balance is not changed.
- The 21-session validity count resets.
- Referral Bonus becomes unavailable until the account becomes VALID again.
- The 90-slot inactivity counter is suspended during the rebuild period.

The backend must enforce the one-lifetime-change rule.

14. KYC FLOW

KYC is required only after all 2,160 effective sessions have been completed.

User Completes Effective Sessions
               |
               v
Backend Confirms Completion
               |
               v
KYC Requirement Activated
               |
               v
Display KYC Instructions
               |
               v
User Submits Required Information
               |
               v
Backend Sends Verification Request
               |
               v
Verification Result
               |
        +------+------+
        |             |
        v             v
    Approved       Pending/Rejected
        |             |
        v             v
Update Status     Show Required Action
        |
        v
Unlock Eligible Balance

If KYC is pending:

- The eligible balance may remain temporarily locked.
- The balance must not be forfeited solely because verification is incomplete.

The provider, accepted documents, and verification process remain subject to separate approval.

15. REWARD HISTORY FLOW

Open Reward History
        |
        v
Request Reward Records
        |
        v
Backend Returns Records
        |
        v
Display Reward List
        |
        v
Select Reward
        |
        v
Display Reward Details

The application must display backend-confirmed records.

Each reward record should include:

- Reward ID.
- Session ID.
- Category.
- Amount.
- Status.
- UTC timestamp.

Users cannot edit or delete reward records.

16. PUBLIC EXPLORER FLOW

Open Explorer
      |
      v
Search Block / Transaction / User ID
      |
      v
Send Search Request
      |
      v
Backend Returns Public Records
      |
      v
Display Results
      |
      v
Open Block or Transaction
      |
      v
Display Hash and Signature
      |
      v
Verify Public Record

The Explorer must support:

- Block search.
- Transaction search.
- User ID search.
- Block details.
- Transaction details.
- Hash verification.
- Digital signature verification.

The public ledger is application-operated, not decentralized.

The Explorer must not expose personal information, KYC records, authentication secrets, or recovery data.

17. PUBLIC LEDGER CORRECTION FLOW

Published records must never be silently edited or deleted.

Correction Request
        |
        v
Backend Validation
        |
        v
Main Admin Review
        |
        +-----------------------+
        |                       |
        v                       v
    Rejected                 Approved
        |                       |
        v                       v
Keep Existing Record      Create Correction Block
                                |
                                v
                       Reference Original Block
                                |
                                v
                       Publish New Correction Block
                                |
                                v
                       Update Explorer Display
                                |
                                v
                       Record Audit Log

The original block must remain visible.

18. NOTIFICATION FLOW

Notifications must support:

- In-App notifications.
- Push notifications.

Notification events include:

- Session availability.
- Activation confirmation.
- Session success or failure.
- Reward crediting.
- Referral bonus.
- Group change.
- Account validity changes.
- Account suspension or reactivation.
- Account cancellation.
- KYC requirement.
- KYC verification.
- Maintenance announcements.

If push permission is denied:

- In-App notification history remains available.
- The user may enable push notifications in operating-system settings.

Deleting a notification must not delete its underlying system record.

19. ACCOUNT SUSPENSION FLOW

The backend may automatically suspend an account when fraud or security concerns are detected.

Administrators must not directly suspend, cancel, or delete accounts.

Backend Detects Security Concern
             |
             v
Automatic Suspension
             |
             v
Record Reason and Evidence
             |
             v
Notify User Where Appropriate
             |
             v
User Submits Evidence
             |
             v
Backend Validates Evidence
             |
             v
Sub-Admin Verification
             |
             v
Main Admin Review
             |
             +--------------------+
             |                    |
             v                    v
          Approved             Rejected
             |                    |
             v                    v
       Reactivate Account     Remain Suspended
             |                    |
             v                    v
        Record Audit Log      Record Audit Log

The user must be able to see the suspension status and relevant next steps.

20. ADMIN APPROVAL FLOW

The standard administrative workflow is:

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
Backend Action
       |
       v
Audit Log

Only the Main Admin has final approval authority.

Sub-Admins may verify records, review evidence, and prepare reports.

21. REWARD CORRECTION FLOW

Reward corrections must not directly modify or delete existing ledger entries.

Required information:

- User ID.
- Session ID.
- Reward ID.
- Existing ledger record.
- Proposed correction.
- Reason.
- Transaction history.

Flow:

1. Create correction request.
2. Backend validates the request.
3. Main Admin reviews the validated request.
4. Main Admin approves or rejects.
5. Backend performs the approved correction.
6. Original record remains available.
7. Audit Log records the operation.

22. MAINTENANCE FLOW

When maintenance is initiated:

1. Backend marks affected services as under maintenance.
2. New activation requests are stopped.
3. Affected reward processing is paused safely.
4. The application displays maintenance information.
5. Users receive appropriate notifications.
6. Existing records and balances remain preserved.

When maintenance ends:

1. Backend checks system integrity.
2. Pending operations are identified.
3. Required validation and approvals are completed.
4. Services resume.
5. Maintenance completion is recorded.
6. Users receive a completion notification.

23. RECOVERY FLOW

After a backend or infrastructure failure:

Service Failure
      |
      v
Mark Affected Operations Pending
      |
      v
Preserve Existing Records
      |
      v
Restore Backup / Recover Database
      |
      v
Verify Data Integrity
      |
      v
Identify Incomplete Sessions and Rewards
      |
      v
Backend Validation
      |
      v
Admin Review and Approval
      |
      v
Resume Approved Processing
      |
      v
Audit Log

Incomplete sessions and reward operations must not be processed twice.

Unique IDs and idempotency must protect recovery operations.

24. BACKUP FLOW

After every effective mining session:

1. Create encrypted backup.
2. Verify backup integrity.
3. Store backup history.
4. Upload to the separate SAECOIN Google Drive backup.
5. Update the laptop backup.
6. Allow manual Pen Drive backup through the Admin Panel.
7. Notify Admin if backup fails.

Monthly recovery testing must be performed.

The recovery key must be stored securely and separately from normal backups.

25. AUTHORITY AND DATA FLOW

The application must follow this authority model:

Android / iOS Application
           |
           v
       REST API
           |
           v
   Backend Validation
           |
           v
   Database / Ledger
           |
           v
   Reward Processing
           |
           v
   Public Ledger Publishing
           |
           v
   Application Response

The mobile application is responsible for:

- Displaying information.
- Collecting user input.
- Sending requests.
- Showing backend responses.
- Managing safe local UI state.

The backend is responsible for:

- Authentication.
- Account status.
- Session eligibility.
- Session validation.
- Reward calculations.
- Referral eligibility.
- Balance updates.
- KYC status.
- Administrative approvals.
- Ledger publication.
- Audit logging.

The frontend must never become the authority for financial or reward-related decisions.

26. ERROR HANDLING

All major flows must support:

- Network failure.
- Backend unavailable.
- Invalid request.
- Expired authentication.
- Duplicate request.
- Unauthorized action.
- Maintenance.
- Pending processing.
- Recovery in progress.

The application must display understandable error messages.

It must not display false success messages when the backend has not confirmed an operation.

27. FINAL FLOW REQUIREMENTS

The implementation must satisfy these rules:

1. Android and iOS follow identical business rules.
2. Backend time is authoritative.
3. Mining sessions use the approved UTC schedule.
4. Activation is limited to once per scheduled session.
5. Session success requires backend validation.
6. Effective sessions total 2,160.
7. Regular Mining pool is 6,000 SAC per session.
8. Referral Bonus pool is 2,000 SAC per session.
9. Total session pool is 8,000 SAC.
10. Initial account validity requires 21 successful sessions.
11. VALID account inactivity is measured over 90 scheduled session slots.
12. Direct referrals are limited to 10.
13. Referral Group change is limited to once per lifetime.
14. KYC is required only after completion of all effective sessions.
15. Public ledger records are signed, hash-linked, and append-only.
16. Corrections require a new Correction Block.
17. Administrative approval and audit rules must be enforced.
18. Backup and recovery must prevent duplicate processing.
19. The mobile application must not independently calculate authoritative rewards.
20. The application must not claim to be a decentralized blockchain.

---

END OF DOCUMENT

Next Document: 04 — Technical Requirements Specification
