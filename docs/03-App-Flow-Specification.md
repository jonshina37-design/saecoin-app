SAECOIN — APP FLOW SPECIFICATION

Version: 1.0
Project: SAECOIN App
Ticker: SAC
Platform: Android (React Native + Expo + TypeScript)
Status: Draft

---

1. PURPOSE

This document defines the complete user navigation and application flow for the SAECOIN App.

It describes how users move through the application, from opening the app and creating an account to activating mining sessions, earning virtual rewards, inviting referrals, and managing their accounts.

This document covers the App Mining application only.

It does not define the future SAECOIN blockchain node, Proof-of-Work mining software, or on-chain transaction system.

2. APPLICATION FLOW OVERVIEW

The main application flow is:

App Launch
    |
    v
Splash Screen
    |
    v
Check Login Session
    |
    +---- Not Logged In
    |         |
    |         v
    |    Onboarding
    |         |
    |         v
    |    Registration / Login
    |         |
    |         v
    |    Account Verification
    |         |
    |         v
    |    Community Joining
    |         |
    |         v
    |    Dashboard
    |
    +---- Logged In
              |
              v
        Check Account Status
              |
              +---- Active
              |       |
              |       v
              |    Dashboard
              |
              +---- Restricted / Cancelled
                      |
                      v
                 Account Status Screen

The backend must determine the authoritative account status.

3. SPLASH SCREEN FLOW

When the user opens the application:

1. Display the SAECOIN logo.
2. Initialize the application.
3. Check network connectivity.
4. Check whether a valid login session exists.
5. Request the latest account status from the backend when authenticated.
6. Navigate to the appropriate screen.

Possible destinations:

- Onboarding.
- Login.
- Dashboard.
- Account verification.
- Community joining.
- Account restricted or cancelled screen.
- Maintenance or connection error screen.

The splash screen must not independently determine account validity.

4. ONBOARDING FLOW

First-time users see the onboarding screens.

Suggested sequence:

Onboarding Screen 1
       |
       v
Onboarding Screen 2
       |
       v
Onboarding Screen 3
       |
       v
Get Started
       |
       v
Registration / Login

Onboarding should explain:

- What SAECOIN App is.
- How App Mining sessions work.
- How virtual rewards are calculated.
- How referral eligibility works.
- That App Mining is not real CPU/GPU mining.
- That virtual rewards do not guarantee future market value.
- That future distribution depends on the approved project policy and blockchain readiness.

Users may skip onboarding where permitted.

5. REGISTRATION FLOW

New users must create an account.

Suggested registration fields:

- Full name or display name.
- Email address.
- Password.
- Confirm password.
- Referral code (optional).
- Acceptance of Terms and Conditions.
- Acceptance of Privacy Policy.

Registration flow:

Registration Screen
       |
       v
Validate Input
       |
       v
Check Existing Account
       |
       v
Create Account
       |
       v
Email / Account Verification
       |
       v
Community Joining
       |
       v
Dashboard

Rules:

1. Validate all required fields.
2. Prevent duplicate accounts according to the approved account policy.
3. Store passwords securely using an approved password-hashing method.
4. Never store plain-text passwords.
5. Referral codes must be validated by the backend.
6. Account creation does not automatically make the account valid for reward eligibility.
7. Every account must complete 21 successful mining sessions to become valid.

6. LOGIN FLOW

Existing users can log in.

Login Screen
     |
     v
Enter Credentials
     |
     v
Backend Authentication
     |
     v
Check Account Status
     |
     +---- Active
     |       |
     |       v
     |    Dashboard
     |
     +---- Verification Required
     |       |
     |       v
     |    Verification Screen
     |
     +---- Cancelled
     |       |
     |       v
     |    Account Status Screen
     |
     +---- Suspended / Restricted
             |
             v
        Account Status Screen

The backend must control authentication and authorization.

The application must not bypass account restrictions through local storage or modified client requests.

7. COMMUNITY JOINING FLOW

Joining the official SAECOIN community channels is a mandatory onboarding requirement.

Required channels:

- Telegram.
- X.
- Facebook.

Flow:

Community Joining Screen
       |
       v
Display Official Links
       |
       v
User Opens Community Links
       |
       v
User Completes Required Joining Actions
       |
       v
Approved Verification Method
       |
       v
Backend Records Status
       |
       v
Continue to Dashboard

Rules:

1. Display official community links.
2. Explain the joining requirements clearly.
3. Do not request social media passwords.
4. Do not claim automatic membership verification unless a supported and approved verification method exists.
5. If direct platform verification is unavailable, use an approved alternative verification process.
6. The backend must store the verification status and timestamp.
7. Users who have not completed the required process must not be treated as fully onboarded.

8. DASHBOARD FLOW

The dashboard is the main screen after successful onboarding and login.

It should display:

- Virtual App Mining balance.
- Account validity status.
- Successful mining session count.
- Daily session progress.
- Current mining status.
- Mining activation button.
- Referral summary.
- Community status.
- Notifications.
- Advertisement area, where permitted.

Suggested dashboard navigation:

Dashboard
   |
   +---- Mining
   |
   +---- Referral
   |
   +---- History
   |
   +---- Profile

The displayed reward balance must be clearly labelled as a virtual App Mining balance.

It must not be presented as an on-chain wallet balance or a guaranteed cash value.

9. MINING FLOW

9.1 Mining Screen

The Mining screen displays:

- Current mining status.
- Session duration.
- Countdown timer.
- Daily session count.
- Successful session count.
- Account validity progress.
- Current applicable Mining Power information.
- Session activation button.

Each session lasts 8 hours.

Users may activate a maximum of 3 sessions per day.

9.2 Session Activation Flow

Mining Screen
     |
     v
Tap Start Mining
     |
     v
Check Login Status
     |
     v
Check Account Eligibility
     |
     v
Check Daily Session Limit
     |
     v
Check Existing Active Session
     |
     v
Request Session From Backend
     |
     v
Check Advertisement Requirements
     |
     v
Session Activation
     |
     v
Mining Countdown

Before activation, the backend must validate:

1. Account status.
2. Community requirement status.
3. Whether the account is permitted to mine.
4. Whether another session is already active.
5. Whether the daily session limit has been reached.
6. Whether the account is cancelled or restricted.
7. Applicable reward budget and Mining Power rules.

The backend must create the session record and return its authoritative start and end timestamps.

9.3 Advertisement Flow

The proposed app design includes:

- Banner advertisements in designated areas.
- Video advertisements associated with session activation.

The final implementation must comply with the selected advertising provider's policies.

A video advertisement must not be treated as a successful mining session by itself.

If the advertising provider does not permit the proposed forced-ad flow, the activation process must be adjusted before release.

9.4 Active Mining Flow

After a successful activation:

Session Activated
       |
       v
Display Active Status
       |
       v
Display Countdown
       |
       v
User May Close App
       |
       v
Backend Continues Session Timing
       |
       v
Session End Time Reached
       |
       v
Backend Validates Session
       |
       v
Calculate Applicable Reward
       |
       v
Record Successful Session

Rules:

- The backend is authoritative for session timing.
- The mobile countdown is only a display.
- Closing the app must not automatically cancel a valid active session.
- Changing the device clock must not affect the session.
- Reinstalling the app must not reset backend session records.
- A session is successful only after the required 8-hour duration and backend validation.

9.5 Session Completion Flow

Active Session
      |
      v
8 Hours Completed
      |
      v
Backend Validation
      |
      +---- Valid
      |       |
      |       v
      |   Calculate Reward
      |       |
      |       v
      |   Update Virtual Balance
      |       |
      |       v
      |   Record Successful Session
      |
      +---- Invalid
              |
              v
        Record Failure / Review

The application must show a completion message only after receiving confirmation from the backend.

A failed or invalid session must not generate a successful-session count or reward.

10. ACCOUNT VALIDITY FLOW

Every account must complete 21 successful mining sessions to become valid.

New Account
     |
     v
0 Successful Sessions
     |
     v
Complete Mining Sessions
     |
     v
21 Successful Sessions?
     |
     +---- No
     |      |
     |      v
     |   Continue Progress
     |
     +---- Yes
            |
            v
      Account Becomes Valid

The backend must maintain the successful-session count.

The client must not be able to manually change the count or account validity status.

The dashboard should display progress, for example:

"12 / 21 Successful Sessions"

11. DAILY SESSION LIMIT FLOW

Users may activate a maximum of 3 sessions per day.

Each session lasts 8 hours.

The backend must define the official daily boundary and timezone.

The application must display:

- Sessions completed today.
- Sessions remaining today.
- Active session status.
- Next eligible activation time, when applicable.

Example:

Daily Limit: 3 Sessions

Session 1: Completed
Session 2: Active
Session 3: Available

Remaining: 1 Activation

The backend must prevent users from exceeding the limit through multiple devices or repeated API requests.

12. REFERRAL FLOW

Users may invite other people using their referral code or referral link.

Maximum referrals per referrer: 10 accounts.

Flow:

Referral Screen
      |
      v
Display Referral Code
      |
      v
Share Referral Link
      |
      v
New User Registers
      |
      v
Referral Code Validated
      |
      v
Referral Relationship Recorded
      |
      v
Referred User Completes 21 Sessions
      |
      v
Referral Becomes Valid
      |
      v
Eligible Mining Power Bonus

Rules:

1. Referral relationships must be recorded by the backend.
2. A referrer may have a maximum of 10 accepted referral accounts.
3. A referred account becomes valid after completing 21 successful sessions.
4. Once the referral becomes valid, both users become eligible for the applicable Mining Power bonus.
5. The bonus is applied only during a session in which the relevant user is actively mining.
6. If a user is not actively mining during a session, that user's bonus is not applied for that session.
7. An inactive user's missed bonus is not banked or paid later.
8. The other participant's bonus eligibility is evaluated independently.
9. The bonus percentage and exact reward calculation must follow the finalized Mining Reward Specification.
10. Referral rewards must remain within the approved App Mining allocation.

13. MINING HISTORY FLOW

Users can review previous mining sessions.

The History screen should display:

- Session date.
- Session start time.
- Session completion time.
- Session status.
- Virtual reward amount.
- Applicable Mining Power information, where appropriate.

Possible statuses:

- Active.
- Completed.
- Failed.
- Under Review.

Flow:

History Screen
      |
      v
Request History From Backend
      |
      v
Display Session Records
      |
      v
Select Session
      |
      v
Display Session Details

History must be retrieved from the backend.

The client must not create or modify historical reward records.

14. NOTIFICATION FLOW

The application may send notifications for:

- Mining session completed.
- Mining session activation confirmed.
- Account becomes valid.
- Referral becomes valid.
- Referral milestone reached.
- Important account security events.
- Project announcements.
- Maintenance notifications.

Notifications must not disclose passwords, seed phrases, private keys, or other sensitive information.

The backend must control important account and reward notifications.

15. PROFILE FLOW

The Profile screen should display:

- Display name.
- Account identifier.
- Email address, where applicable.
- Account validity status.
- Successful mining session count.
- Referral count.
- Community verification status.
- Account creation date.

Users may access:

- Edit profile.
- Settings.
- Security settings.
- Help and support.
- Terms and Conditions.
- Privacy Policy.
- Logout.

Sensitive account changes must require appropriate backend validation.

16. SETTINGS AND LOGOUT FLOW

Settings may include:

- Notification preferences.
- Language preferences.
- Security options.
- Privacy information.
- Help and support.
- Terms and Conditions.
- Privacy Policy.

Logout flow:

Profile
   |
   v
Logout
   |
   v
Confirm Logout
   |
   v
Clear Local Authentication Session
   |
   v
Login Screen

Logging out must not delete valid server-side mining sessions or historical records.

17. ACCOUNT INACTIVITY AND CANCELLATION FLOW

The proposed inactivity policy is:

- An account becomes subject to cancellation after 90 consecutive 8-hour session windows without activating a mining session.
- This represents 720 hours, or 30 days, when measured as continuous elapsed time.

The exact inactivity time anchor and evaluation method must be finalized in the Backend Specification.

Proposed flow:

Valid Account
      |
      v
No Mining Session Activated
      |
      v
Inactivity Period Begins
      |
      v
User Activates Mining?
      |
      +---- Yes
      |       |
      |       v
      |   Reset Inactivity Timer
      |
      +---- No
              |
              v
       90 Windows Reached?
              |
              +---- No
              |      |
              |      v
              |   Continue Monitoring
              |
              +---- Yes
                     |
                     v
              Backend Cancellation
                     |
                     v
              Revoke Reward Eligibility
                     |
                     v
              Return Virtual Balance
              To Main Reward Pool
                     |
                     v
              Account Status Updated

Cancellation rules:

1. The backend must evaluate inactivity.
2. The mobile app must not independently cancel accounts.
3. Cancelled accounts lose normal login access according to the approved policy.
4. Unused virtual App Mining rewards return to the Main Reward Pool.
5. Applicable referral eligibility and bonuses are revoked.
6. Minimal audit records may be retained where legally necessary.
7. Personal data must be handled according to the Privacy Policy and applicable law.

The final policy must clearly explain the cancellation process to users before they participate.

18. ERROR AND EXCEPTION FLOWS

The application must handle common failures.

18.1 Network Failure

User Action
    |
    v
Network Request
    |
    v
Connection Failed
    |
    v
Display Error
    |
    v
Retry Option

Do not display an unconfirmed mining activation or reward as successful.

18.2 Server Error

- Display a clear error message.
- Preserve the user's local interface state where safe.
- Allow retry where appropriate.
- Do not create duplicate sessions after a timeout.
- Use idempotency controls for session activation requests.

18.3 Authentication Expiration

- Detect expired authentication.
- Clear invalid local authentication state.
- Redirect to Login.
- Preserve server-side mining sessions and history.

18.4 Duplicate Session Request

If the user taps the activation button repeatedly:

- Prevent duplicate activation requests in the interface.
- Validate requests on the backend.
- Return the existing active session where appropriate.
- Never create multiple active sessions in violation of the rules.

19. BOTTOM NAVIGATION FLOW

The main application navigation contains five tabs:

1. Home.
2. Mining.
3. Referral.
4. History.
5. Profile.

The bottom navigation should remain consistent across the main application screens.

Authentication, onboarding, verification, and account restriction screens may use a separate navigation layout.

20. DATA AUTHORITY AND FLOW RULES

The backend is authoritative for:

- Account status.
- Authentication.
- Community verification status.
- Mining session creation.
- Session start and end timestamps.
- Successful-session count.
- Mining Power.
- Reward calculation.
- Virtual App Mining balance.
- Referral relationships.
- Referral eligibility.
- Inactivity evaluation.
- Account cancellation.
- Reward ledger and history.

The mobile application is responsible for:

- Displaying information.
- Collecting user input.
- Sending authorized requests.
- Showing loading, success, and error states.
- Displaying backend-confirmed results.

The mobile application must never independently approve rewards or change authoritative account data.

21. FUTURE BLOCKCHAIN DISTRIBUTION FLOW

App Mining rewards are virtual ledger entries before the future blockchain distribution process is ready.

The proposed future process is:

App Mining Completed
        |
        v
Virtual Reward Recorded
        |
        v
Reward Eligibility Review
        |
        v
Approved Distribution Policy
        |
        v
Blockchain Distribution System Ready
        |
        v
Eligible Reward Distribution

Important rules:

- Virtual App Mining rewards are not on-chain SAC.
- No actual SAC UTXO is created by the mobile application.
- No guaranteed market value or cash redemption is promised.
- Future distribution must follow the approved project policy.
- The distribution system must reconcile against the separate 5,000,000 SAC App Mining allocation.

22. FINAL POLICY

This document defines the proposed SAECOIN App navigation and user-flow baseline.

All important actions must be validated by the backend.

The application must clearly distinguish virtual App Mining rewards from actual blockchain assets.

Any change to mining limits, account validity, referral eligibility, reward calculation, or cancellation rules must be reviewed against the relevant specifications before implementation.

---

END OF DOCUMENT
