SAECOIN — TECHNICAL REQUIREMENTS SPECIFICATION

Version: 1.0
Project: SAECOIN App
Ticker: SAC
Platform: Android
Frontend: React Native + Expo + TypeScript
Backend: Self-hosted backend (technology to be finalized)
Status: Draft

---

1. PURPOSE

This document defines the technical requirements for developing, testing, deploying, and maintaining the SAECOIN App.

The purpose is to establish a consistent technical foundation before application development begins.

This document covers:

- Development environment.
- Frontend technology.
- Android compatibility.
- Backend communication.
- Authentication.
- Mining session processing.
- Reward data handling.
- Referral functionality.
- Database requirements.
- Security.
- Performance.
- Testing.
- Deployment.

This document applies only to the SAECOIN App Mining application.

It does not define the future SAECOIN blockchain node or actual Proof-of-Work mining software.

2. PROJECT TECHNICAL SCOPE

The SAECOIN App will be a mobile application that allows users to:

- Register and log in.
- Complete account verification.
- Join required community channels.
- Activate virtual mining sessions.
- Track mining session progress.
- View virtual App Mining rewards.
- Invite referrals.
- View mining history.
- Manage account settings.
- Receive notifications.

The application will communicate with a separately operated backend.

The backend will be responsible for authoritative account, session, referral, and reward processing.

3. TECHNOLOGY STACK

3.1 Mobile Application

Primary technologies:

- React Native.
- Expo.
- TypeScript.
- React.
- Expo-compatible native modules.

The application will initially target Android.

The architecture should allow future iOS support without requiring a complete rewrite.

3.2 Development Environment

Required development software:

- Windows 11 or another supported development operating system.
- Node.js.
- npm.
- Android Studio.
- Android SDK.
- Android Emulator or physical Android device.
- Git.
- GitHub repository.

VS Code is optional and is not a mandatory development requirement.

Android Studio will be the primary IDE.

3.3 Backend

The backend must run separately from the mobile application.

The initial development environment should support running the backend on the developer's own computer.

The architecture should allow later deployment to an independently controlled server.

The backend technology and framework will be finalized in the Backend Specification.

The backend must not depend on Firebase, Supabase, or another third-party hosted backend as a mandatory application service.

Third-party services may be considered separately for specific optional features, subject to approval.

3.4 Database

A persistent database is required.

It must support:

- User accounts.
- Authentication records.
- Community verification records.
- Mining sessions.
- Reward ledger entries.
- Referral relationships.
- Account status.
- Notifications.
- Audit records.

The final database engine and schema will be defined in the Database Schema document.

4. DEVELOPMENT ENVIRONMENT REQUIREMENTS

The development environment must support:

1. Installing project dependencies.
2. Running the Expo development server.
3. Building the Android application.
4. Connecting the application to a local backend.
5. Running automated tests.
6. Inspecting application logs.
7. Generating release builds.

Development scripts and environment variables must be documented.

Secrets must not be stored in source code or committed to GitHub.

4.1 Local Backend Connectivity

During development, the mobile application must support connecting to a backend running on the developer's computer.

Different connection methods may be required:

- Android Emulator host connection.
- USB-connected physical Android device.
- Local network connection.

The backend base URL must be configurable.

Production and development API addresses must be kept separate.

The application must not contain a permanently hardcoded development server address in its production configuration.

5. ANDROID PLATFORM REQUIREMENTS

The initial release targets Android.

The application must:

- Support the Android versions selected for the release.
- Adapt to different screen sizes.
- Handle backgrounding and foregrounding.
- Handle network interruptions.
- Preserve server-side mining session state.
- Handle application restarts safely.
- Support secure authentication storage.
- Display accessible interface elements.

The final minimum Android version must be selected before release based on the chosen Expo SDK and supported dependencies.

The application must not rely on unsupported or deprecated Android APIs.

6. FRONTEND ARCHITECTURE REQUIREMENTS

The frontend must use a modular structure.

Suggested logical modules:

src/
│
├── app/
├── navigation/
├── components/
├── screens/
│   ├── onboarding/
│   ├── auth/
│   ├── dashboard/
│   ├── mining/
│   ├── referral/
│   ├── history/
│   ├── profile/
│   └── settings/
│
├── services/
├── api/
├── hooks/
├── store/
├── types/
├── utils/
├── constants/
├── theme/
└── assets/

The final physical folder structure may be adjusted during implementation.

Requirements:

1. Keep UI components separate from business logic.
2. Reuse shared components.
3. Keep API communication in dedicated modules.
4. Use TypeScript types for important data structures.
5. Avoid unnecessary duplication.
6. Keep navigation consistent.
7. Handle loading, empty, success, and error states.
8. Keep sensitive operations outside presentation components.

7. BACKEND COMMUNICATION REQUIREMENTS

The mobile application must communicate with the backend through documented APIs.

The API layer must support:

- Authentication.
- Account information.
- Community verification status.
- Mining session activation.
- Mining session status.
- Mining history.
- Virtual reward balance.
- Referral information.
- Notifications.
- Profile management.

Requirements:

1. Use HTTPS in production.
2. Validate API requests on the server.
3. Validate API responses on the client.
4. Use consistent response formats.
5. Use appropriate HTTP status codes.
6. Handle expired authentication.
7. Handle network timeouts.
8. Handle server errors.
9. Prevent duplicate requests where necessary.
10. Version public API routes where appropriate.

The detailed API contracts will be defined in the Backend Specification.

8. AUTHENTICATION REQUIREMENTS

The application must support secure registration and login.

Required functionality:

- Account registration.
- Login.
- Logout.
- Password reset.
- Email or other approved account verification.
- Session expiration.
- Authentication refresh, where supported.

Security requirements:

- Never store plain-text passwords.
- Use secure password hashing on the backend.
- Store authentication tokens using appropriate secure device storage.
- Never include credentials in application logs.
- Validate authorization on every protected backend operation.
- Do not rely on client-side account status for access control.

9. MINING SESSION REQUIREMENTS

The application must support virtual mining sessions.

Approved baseline rules:

- Session duration: 8 hours.
- Maximum sessions: 3 per day.
- Each session must be activated manually.
- A session is successful only after 8 hours and backend validation.
- Backend timestamps are authoritative.
- The mobile countdown is for display only.

Technical requirements:

1. Session activation must be requested from the backend.
2. The backend must validate account eligibility.
3. The backend must enforce the daily session limit.
4. The backend must prevent prohibited concurrent sessions.
5. The backend must record session start and end timestamps.
6. Closing the application must not automatically cancel a valid session.
7. Device clock changes must not affect session validity.
8. Reinstalling the application must not reset session history.
9. Repeated activation requests must not create duplicate sessions.
10. Session completion must be confirmed by the backend.

The application must never calculate a successful session using only a local device timer.

10. REWARD PROCESSING REQUIREMENTS

App Mining rewards are virtual ledger entries.

They are not actual on-chain SAC before the future blockchain distribution process is ready.

The system must:

- Display virtual reward balances clearly.
- Receive reward calculations from the backend.
- Maintain a reward history.
- Prevent unauthorized balance changes.
- Maintain an auditable reward ledger.
- Reconcile total rewards against the App Mining allocation.

The separate App Mining allocation is:

5,000,000 SAC

The provisional daily budget is:

- Regular mining: 4,500 SAC.
- Referral bonus: 1,000 SAC.
- Safety reserve: 500 SAC.
- Total provisional daily budget: 6,000 SAC.

These daily budget figures remain provisional until finalized in the Mining Reward Specification.

The application must not independently create rewards or promise a guaranteed market value.

11. REFERRAL REQUIREMENTS

The application must support referral codes and referral links.

Baseline rules:

- Maximum 10 referred accounts per referrer.
- A referred account becomes valid after 21 successful mining sessions.
- Both eligible participants may receive the approved Mining Power bonus.
- Bonus eligibility is evaluated independently for each participant.
- A participant must be actively mining for their own bonus to apply to that session.
- An inactive participant's missed bonus is not accumulated for later payment.

Technical requirements:

1. Referral codes must be validated by the backend.
2. Referral relationships must be stored persistently.
3. Referral limits must be enforced by the backend.
4. Referral validity must use confirmed successful sessions.
5. Referral bonus calculations must follow the finalized reward rules.
6. Referral records must be auditable.
7. Self-referrals and prohibited referral manipulation must be prevented.

12. ACCOUNT VALIDITY AND INACTIVITY REQUIREMENTS

An account becomes valid after completing 21 successful mining sessions.

The proposed inactivity rule is cancellation after 90 consecutive 8-hour session windows without activating a mining session.

This equals 720 hours, or 30 days, when measured as continuous elapsed time.

The precise inactivity time anchor and evaluation method must be finalized in the Backend Specification.

The backend must:

- Track the last qualifying session activation.
- Evaluate inactivity.
- Update account status.
- Revoke applicable reward eligibility.
- Return unused virtual rewards to the Main Reward Pool when cancellation is confirmed.
- Revoke applicable referral eligibility.
- Preserve minimum required audit records.

The mobile application must display the account status returned by the backend.

13. COMMUNITY VERIFICATION REQUIREMENTS

Required community platforms:

- Telegram.
- X.
- Facebook.

The application must display official community links and the required joining instructions.

Technical requirements:

1. Never request social media passwords.
2. Store verification status on the backend.
3. Record verification timestamps.
4. Use an approved verification method.
5. Do not claim automatic verification unless a supported integration exists.
6. Provide an alternative verification process if direct platform verification is unavailable.

The final verification method must be selected before implementation.

14. ADVERTISEMENT REQUIREMENTS

The proposed application includes:

- Banner advertisements.
- Video advertisements associated with mining activation.

Requirements:

1. Advertisement integration must use an approved provider.
2. Provider policies must be reviewed before implementation.
3. Advertisement failures must not create false mining sessions.
4. The application must not fabricate ad completion.
5. Advertisement loading must not freeze the interface.
6. Ad-related errors must be handled safely.
7. User privacy and consent requirements must be respected.
8. Advertisement revenue must not be treated as guaranteed income.

The final video-ad activation flow must be approved against the selected provider's policies.

15. NOTIFICATION REQUIREMENTS

The application should support notifications for:

- Mining session completion.
- Mining session status.
- Account validity.
- Referral milestones.
- Important security events.
- Project announcements.
- Maintenance.

Notification delivery must not be the only source of truth for account or reward status.

The application must retrieve authoritative information from the backend.

16. PERFORMANCE REQUIREMENTS

The application should:

- Start without unnecessary delays.
- Navigate smoothly between main screens.
- Avoid unnecessary repeated API requests.
- Use efficient list rendering for mining history.
- Avoid excessive background processing.
- Handle low-memory Android devices gracefully.
- Avoid unnecessary battery consumption.

Performance targets must be measured on representative devices before release.

17. RELIABILITY AND ERROR HANDLING

The application must handle:

- No internet connection.
- Slow network connections.
- Backend downtime.
- Authentication expiration.
- Invalid API responses.
- Duplicate requests.
- Database-related service failures.
- Application restarts.
- Interrupted session activation.

The application must not display unconfirmed rewards or session completions as successful.

All important operations must support safe retry behavior.

18. SECURITY REQUIREMENTS

Security must be implemented across the mobile application and backend.

Mandatory requirements:

- HTTPS in production.
- Secure authentication.
- Secure token storage.
- Server-side authorization.
- Input validation.
- Rate limiting.
- Protection against duplicate requests.
- Sensitive-data protection.
- Secure password handling.
- Dependency review.
- Secret management.
- Security logging without exposing credentials.

The backend must be authoritative for rewards, mining sessions, referrals, and account status.

Detailed requirements will be defined in the Security Specification.

19. DATABASE AND DATA INTEGRITY REQUIREMENTS

The database must preserve the integrity of:

- User accounts.
- Mining sessions.
- Reward records.
- Referral relationships.
- Account status.
- Community verification.
- Audit records.

Requirements:

1. Use persistent storage.
2. Use atomic database operations where required.
3. Prevent duplicate reward entries.
4. Maintain consistent session records.
5. Record important state changes.
6. Provide backup and recovery procedures.
7. Restrict unauthorized data modification.
8. Document schema changes.

The complete database design will be defined in the Database Schema document.

20. TESTING REQUIREMENTS

The application must undergo:

- Unit testing.
- Integration testing.
- API testing.
- UI testing.
- Authentication testing.
- Mining session testing.
- Reward calculation testing.
- Referral testing.
- Security testing.
- Performance testing.
- Android device compatibility testing.

Important edge cases must be included.

Examples:

- Repeated mining activation requests.
- Device clock manipulation.
- Application closed during an active session.
- Network interruption during activation.
- Expired authentication.
- Referral limit reached.
- Invalid referral code.
- Account cancellation.
- Duplicate reward processing.

The detailed test plan will be defined in the Testing Strategy document.

21. BUILD AND RELEASE REQUIREMENTS

The project must support:

- Local development builds.
- Android testing builds.
- Release APK generation.
- Android App Bundle generation when required.
- Version management.
- Release notes.
- Build verification.

Production builds must use production API configuration.

Development secrets must never be included in production packages.

Release procedures will be documented in the Release & Launch Plan.

22. DOCUMENTATION AND MAINTENANCE

The project must maintain:

- Setup instructions.
- Environment configuration instructions.
- Build instructions.
- API documentation.
- Database documentation.
- Testing instructions.
- Release instructions.
- Security reporting instructions.

Technical dependencies must be reviewed and updated carefully.

Expo and React Native versions must remain compatible.

Use Expo's dependency validation tools when upgrading packages. For example, "npx expo-doctor" can help identify dependency compatibility problems.

23. FUTURE BLOCKCHAIN COMPATIBILITY

The mobile application must be designed so that future blockchain integration can be added without confusing virtual App Mining records with on-chain assets.

Future integration may include:

- Blockchain account or address association.
- Approved reward distribution.
- Distribution status.
- Transaction reference.
- On-chain confirmation status.

Until the future distribution system is approved and operational:

- The mobile app must not claim that virtual rewards are on-chain SAC.
- The app must not create blockchain transactions.
- The app must not run CPU or GPU mining.
- The app must not claim guaranteed token value.

24. FINAL TECHNICAL POLICY

The SAECOIN App must use a modular, maintainable, and secure architecture.

The backend remains authoritative for all important account, mining, referral, and reward operations.

The mobile application is responsible for user interaction and displaying backend-confirmed information.

Technical implementation must follow the approved project specifications.

Any significant change to the technology stack, mining rules, reward processing, or security model must be documented and reviewed before implementation.

---

END OF DOCUMENT
