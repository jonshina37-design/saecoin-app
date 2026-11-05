SAECOIN — PRODUCT REQUIREMENTS DOCUMENT (PRD)

Document ID: SAECOIN-APP-PRD-001
Version: 1.0
Project: SAECOIN App
Product Type: Android App Mining Application
Status: Draft
Platform: Android
Framework: React Native + Expo
Language: TypeScript

---

1. PROJECT OVERVIEW

SAECOIN is a cryptocurrency ecosystem project.

The SAECOIN App will provide users with an application-based virtual mining reward system.

Users will be able to create accounts, complete mining sessions, earn virtual SAC rewards, invite friends, participate in community activities, and track their mining progress.

The application will initially operate independently of the SAECOIN blockchain.

Actual blockchain integration and decentralized node mining will be developed in a later project phase.

2. PROJECT OBJECTIVES

The primary objectives are:

1. Develop an Android application for SAECOIN App Mining.
2. Provide a simple and user-friendly mining experience.
3. Maintain an accurate virtual mining reward ledger.
4. Encourage community participation.
5. Introduce a referral-based Mining Power system.
6. Distribute rewards from a predefined 5 million SAC allocation.
7. Prevent unauthorized reward creation.
8. Prepare the application for future blockchain integration.

3. PROJECT SCOPE

3.1 Included Features

- User registration.
- User authentication.
- Account verification.
- Mining dashboard.
- Eight-hour mining sessions.
- Virtual SAC reward tracking.
- Mining Power calculation.
- Referral system.
- Community joining requirements.
- Advertisement integration.
- Mining history.
- Referral history.
- Account validity management.
- Notifications.
- User profile.
- Security controls.

3.2 Excluded Features

The following features are outside the initial application scope:

- Blockchain full node.
- Blockchain consensus.
- SHA-256d node mining.
- GPU mining.
- CPU mining.
- On-chain transaction creation.
- Decentralized wallet.
- Blockchain explorer.
- Exchange trading.
- Guaranteed SAC market price.
- Admin-controlled blockchain minting.

These features may be developed in later phases.

4. TECHNOLOGY REQUIREMENTS

Component| Technology
Mobile Application| React Native
Framework| Expo
Programming Language| TypeScript
Development Environment| Android Studio
Runtime| Node.js
Backend| To be finalized
Database| To be finalized
API| REST API
Authentication| Secure server-side authentication
Version Control| GitHub

Technology decisions must remain consistent with the Technical Requirements document.

5. USER REGISTRATION AND AUTHENTICATION

Users must be able to:

- Register a new account.
- Log in.
- Log out.
- Recover account access.
- Change account credentials.
- View account status.

The application must prevent duplicate accounts according to the finalized account verification policy.

Authentication must be handled securely.

6. COMMUNITY JOINING REQUIREMENTS

New users must complete the required community joining process.

Required communities:

- Official Telegram community.
- Official X account.
- Official Facebook page or community.

The application should provide direct links to official community destinations.

Community verification must use legitimate verification methods.

The application must not request social media passwords.

If automatic verification is unavailable, the application must use an approved alternative verification process.

7. MINING SYSTEM

7.1 Mining Concept

SAECOIN App Mining is a virtual reward distribution system.

It is not actual blockchain Proof-of-Work mining.

The mobile application will not use the device CPU or GPU to mine cryptocurrency.

7.2 Mining Session

Each mining session:

- Duration: 8 hours.
- Maximum sessions: 3 per day.
- Maximum active mining time: 24 hours per day.

Users must manually activate each session.

A new session must not begin before the previous session has completed.

7.3 Session Completion

A session is successful only after the required eight-hour period has been completed.

The backend must validate:

- Session start time.
- Session completion time.
- Account status.
- Session eligibility.
- Reward calculation.
- Daily session limit.

Client-side timers must not be treated as authoritative.

7.4 Mining Reward

Users receive virtual SAC rewards according to the finalized Mining Reward Specification.

The reward system must support:

- Base Mining Power.
- Referral Mining Power.
- Reward calculations.
- Daily reward limits.
- Reward history.
- Reward adjustments with an audit trail.

The exact base reward and Mining Power formula remain subject to approval.

8. APP MINING REWARD RESERVE

Total App Mining allocation:

5,000,000 SAC

This allocation must be maintained separately from:

- Blockchain Node Mining allocation.
- Owner Personal Reserve.
- Ecosystem Development Reserve.
- Security Reserve.
- Community & Network Growth Reserve.

The App Mining system must not create additional SAC beyond its approved allocation.

Before mainnet:

- Mining balances are virtual ledger entries.
- No actual blockchain SAC is created.
- No on-chain UTXO is created through App Mining.

After the blockchain and reserve distribution mechanism are ready, eligible rewards may be distributed according to the finalized conversion and distribution policy.

The application must never promise a guaranteed market value for virtual SAC rewards.

9. REWARD BUDGET MANAGEMENT

The initial working budget model is:

Category| Daily Budget
Regular Mining| 4,500 SAC
Referral Bonus| 1,000 SAC
Safety Reserve| 500 SAC
Total| 6,000 SAC

This is a provisional operational budget, not a separate coin allocation.

Requirements:

1. Total daily distribution must not exceed the approved daily ceiling.
2. Total distribution must never exceed the remaining App Mining allocation.
3. Unused daily budget must not automatically accumulate into a larger future daily allowance.
4. Reward distribution must be calculated by the backend.
5. The system must retain a complete reward audit trail.

The final budget and reward formula will be defined in the Mining Reward Specification.

10. REFERRAL SYSTEM

Users may invite other users through referral links or referral codes.

Requirements:

- Maximum 10 referred accounts per referrer.
- Referral eligibility must be validated.
- Each referred account must complete 21 successful mining sessions.
- Both referrer and referred user become eligible for the approved referral Mining Power bonus after successful validation.
- Referral bonuses must follow the approved Mining Power rules.
- Referral bonuses must not create additional SAC outside the reward budget.

The referral bonus percentage remains undecided.

Detailed rules will be defined in the Referral Specification.

11. ACCOUNT VALIDITY

Every account must complete 21 successful mining sessions to become valid.

After becoming valid:

- The account must remain active through mining activity.
- If no new mining session is activated within 90 consecutive eight-hour session windows, the account becomes inactive and is cancelled.
- Ninety eight-hour windows equal 720 hours, or 30 days.

Cancelled accounts must lose access to normal account login.

Inactive virtual balances and referral eligibility must be handled according to the approved account-expiry and reward-recovery policy.

Personal information should be deleted or anonymized according to applicable privacy requirements.

Necessary non-identifying accounting and anti-fraud records may be retained where legally permitted or required.

12. ADVERTISEMENT SYSTEM

12.1 Banner Advertisement

- Display a banner advertisement at the top of the designated application screen.
- Advertisement placement must not obstruct important controls.
- The UI must adapt to advertisement loading failures.

12.2 Video Advertisement

- Present a video advertisement at the beginning of an eligible mining session.
- Integrate advertisements using an approved advertising provider.
- Follow the advertising provider's policies.
- Never falsely report an advertisement as completed.
- Handle unavailable or failed advertisements safely.

The exact advertising provider and session activation policy must be finalized before implementation.

13. APPLICATION SCREENS

The initial application should contain the following screens:

1. Splash Screen.
2. Onboarding Screen.
3. Registration Screen.
4. Login Screen.
5. Account Verification Screen.
6. Community Joining Screen.
7. Home Dashboard.
8. Mining Screen.
9. Mining Session Completion Screen.
10. Referral Screen.
11. Community Screen.
12. Mining History Screen.
13. Notification Screen.
14. Profile Screen.
15. Settings Screen.
16. Help and Support Screen.

The complete UI layouts will be defined in the UI/UX Design Specification.

14. HOME DASHBOARD

The Home Dashboard should display:

- Current virtual SAC balance.
- Mining status.
- Current Mining Power.
- Session countdown.
- Mining activation control.
- Completed sessions.
- Referral progress.
- Community access.
- Recent mining activity.

The dashboard must clearly distinguish virtual rewards from actual blockchain assets.

15. USER PROFILE

The profile section should contain:

- User ID.
- Username.
- Account creation date.
- Account validity status.
- Total successful sessions.
- Referral count.
- Mining statistics.
- Account settings.

Sensitive account information must not be exposed publicly.

16. NOTIFICATION SYSTEM

The application should support notifications for:

- Mining session completion.
- Mining session availability.
- Referral validation.
- Account status changes.
- Security events.
- Important system announcements.

Notifications must not expose sensitive authentication information.

17. SECURITY REQUIREMENTS

The application must implement:

- Secure authentication.
- Server-side reward validation.
- API authorization.
- Rate limiting.
- Input validation.
- Abuse prevention.
- Duplicate account detection.
- Referral fraud detection.
- Session integrity checks.
- Secure communication.
- Sensitive information protection.
- Audit logging.

The backend must remain authoritative for account status, mining sessions, referral eligibility, and reward balances.

18. ADMINISTRATION

The application will require a restricted administrative system for legitimate operational tasks.

Possible administrative responsibilities:

- User support.
- Account investigation.
- Fraud investigation.
- Community management.
- Advertisement monitoring.
- Reward ledger monitoring.
- System announcements.

Administrative permissions must be role-based and auditable.

Administrators must not have the ability to create unlimited SAC or bypass the approved reward allocation.

The detailed administrative design will be specified separately when the backend and operations architecture are finalized.

19. TESTING REQUIREMENTS

The application must be tested for:

- Registration.
- Authentication.
- Account verification.
- Mining activation.
- Eight-hour session completion.
- Daily session limits.
- Reward calculations.
- Referral eligibility.
- Referral limits.
- Account expiry.
- Reward budget limits.
- Advertisement failures.
- API failures.
- Security vulnerabilities.
- UI compatibility.
- Network interruptions.

Testing must include invalid and abusive scenarios, not only normal usage.

20. RELEASE STRATEGY

The application should be developed in stages.

Phase 1 — Foundation

- Project setup.
- Design system.
- Splash screen.
- Onboarding.
- Authentication UI.

Phase 2 — Core UI

- Home dashboard.
- Mining screen.
- Referral screen.
- Profile.
- History.

Phase 3 — Backend Integration

- Authentication API.
- Account management.
- Mining session API.
- Reward ledger.
- Referral API.

Phase 4 — Security and Testing

- Integration testing.
- Reward validation.
- Security testing.
- Performance testing.
- Bug fixing.

Phase 5 — Launch Preparation

- Release configuration.
- Application signing.
- Privacy policy.
- Terms and conditions.
- Store listing.
- Production readiness review.

21. FUTURE DEVELOPMENT

After the SAECOIN App is completed and launched, the project may proceed to:

- SAECOIN Blockchain Core.
- Full Node.
- Consensus Implementation.
- UTXO Transaction System.
- P2P Network.
- SHA-256d Node Mining.
- Decentralized Wallet.
- Blockchain Explorer.

These are separate development phases and must not delay the initial App development.

22. FINAL REQUIREMENTS

The SAECOIN App must:

1. Operate within the approved 5 million SAC App Mining allocation.
2. Never create unauthorized blockchain coins.
3. Use server-authoritative mining session validation.
4. Maintain accurate reward records.
5. Enforce referral and account validity rules.
6. Protect user information.
7. Provide a clear and understandable user experience.
8. Remain compatible with future SAECOIN blockchain integration.

---

END OF DOCUMENT

Document Status: Draft — Pending User Approval
Next Document: 02 — UI/UX Design Specification
