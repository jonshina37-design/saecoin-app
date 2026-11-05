SAECOIN — UI/UX DESIGN SPECIFICATION

Document ID: SAECOIN-APP-UIUX-002
Version: 1.0
Project: SAECOIN App
Platform: Android
Framework: React Native + Expo
Language: TypeScript
Status: Draft — Pending Approval

---

1. PURPOSE

This document defines the user interface and user experience requirements for the SAECOIN Android App.

The objective is to create a modern, premium, intuitive, and consistent application experience.

The design must be:

- Modern and professional.
- Easy to understand.
- Mobile-friendly.
- Consistent across all screens.
- Responsive to different Android screen sizes.
- Accessible and easy to navigate.
- Suitable for a cryptocurrency-related application.

2. DESIGN DIRECTION

2.1 Visual Style

The application will follow a Dark Premium Crypto design.

Design characteristics:

- Dark background.
- Modern cards.
- Clean typography.
- Subtle gradients.
- Rounded corners.
- Minimal visual clutter.
- Smooth animations.
- Clear visual hierarchy.

The interface should feel like a professional cryptocurrency application rather than a generic mobile mining application.

2.2 Color Palette

Proposed primary colors:

Color| Hex Code| Usage
Deep Navy| #080D18| Main background
Dark Navy| #101827| Secondary background
Card Background| #151F30| Cards and panels
Electric Blue| #2878FF| Primary actions
Cyan| #22D3EE| Accent elements
White| #FFFFFF| Main text
Light Gray| #A7B2C3| Secondary text
Success Green| #22C55E| Successful states
Warning Orange| #F59E0B| Warnings
Error Red| #EF4444| Errors

These colors are provisional and may be adjusted during visual design approval.

3. TYPOGRAPHY

The application should use a clean and readable sans-serif font.

Preferred font:

- Inter.

Typography rules:

Element| Style
Main Heading| Bold
Screen Heading| SemiBold
Card Heading| SemiBold
Body Text| Regular
Secondary Text| Regular
Button Text| SemiBold
Numeric Balance| Bold

Text must remain readable on different Android screen sizes.

4. DESIGN SYSTEM

All application screens must use shared design components.

Reusable components include:

- Primary Button.
- Secondary Button.
- Text Input.
- Password Input.
- Information Card.
- Balance Card.
- Mining Status Card.
- Referral Card.
- Navigation Bar.
- Progress Indicator.
- Loading Indicator.
- Dialog.
- Bottom Sheet.
- Notification Item.
- Empty State.
- Error State.

Components must be reusable rather than independently redesigned on every screen.

5. APPLICATION NAVIGATION

The main application should use bottom navigation.

Proposed navigation:

1. Home
2. Mining
3. Referral
4. History
5. Profile

Each navigation item must have:

- Icon.
- Label.
- Selected state.
- Unselected state.

The selected navigation item must be visually distinguishable.

Authentication and onboarding screens must not display the main bottom navigation.

6. SPLASH SCREEN

Purpose:

Introduce the SAECOIN brand when the application starts.

Required elements:

- SAECOIN logo.
- Application name.
- Dark background.
- Optional subtle loading animation.

Design requirements:

- Center the logo.
- Keep the screen visually minimal.
- Avoid unnecessary buttons.
- Do not display advertisements.
- Navigate automatically to the appropriate next screen.

The next screen depends on the user's authentication and onboarding status.

7. ONBOARDING SCREEN

Purpose:

Introduce the application to new users.

The onboarding flow should explain:

1. What SAECOIN App is.
2. How App Mining works.
3. How users complete mining sessions.
4. How referral rewards work.

Required elements:

- Illustration or visual.
- Heading.
- Short description.
- Progress indicator.
- Next button.
- Skip option.
- Get Started button on the final page.

Onboarding must not promise guaranteed financial returns or market value.

8. REGISTRATION SCREEN

Purpose:

Allow new users to create an account.

Required elements:

- SAECOIN logo.
- Username field.
- Email field.
- Password field.
- Confirm Password field.
- Terms and Privacy Policy agreement.
- Create Account button.
- Login navigation.

Design requirements:

- Clear input labels.
- Appropriate validation messages.
- Password visibility control.
- Loading state.
- Error state.
- Success feedback.

9. LOGIN SCREEN

Purpose:

Allow existing users to access their accounts.

Required elements:

- Email field.
- Password field.
- Login button.
- Forgot Password option.
- Registration navigation.

The screen must provide clear feedback for incorrect credentials and network failures.

10. ACCOUNT VERIFICATION SCREEN

Purpose:

Allow users to complete required account verification.

Required elements:

- Verification instructions.
- Verification status.
- Resend verification option where applicable.
- Continue button.

Verification must be performed through approved backend mechanisms.

11. COMMUNITY JOINING SCREEN

Purpose:

Display the official SAECOIN communities.

Required community destinations:

- Telegram.
- X.
- Facebook.

Required elements:

- Community icon.
- Community name.
- Join button.
- Verification status.
- Continue button.

The interface must clearly show which community requirements have been completed.

The application must not request social media passwords.

12. HOME DASHBOARD

Purpose:

Provide an overview of the user's App Mining activity.

Required components:

12.1 Header

- SAECOIN branding.
- User greeting.
- Notification icon.
- Profile shortcut.

12.2 Balance Card

Display:

- Total virtual SAC balance.
- Available virtual reward balance.
- Pending reward balance, if applicable.

The balance must be clearly labelled as virtual App Mining rewards until actual blockchain distribution occurs.

12.3 Mining Status Card

Display:

- Current mining status.
- Current Mining Power.
- Session countdown.
- Completed sessions.
- Start Mining button when eligible.

12.4 Referral Summary

Display:

- Total referrals.
- Valid referrals.
- Referral progress.
- Invite Friends button.

12.5 Recent Activity

Display:

- Recent mining sessions.
- Reward records.
- Referral updates.

12.6 Advertisement Area

A banner advertisement may appear at the designated top area.

It must not obstruct important dashboard information or navigation.

13. MINING SCREEN

Purpose:

Allow users to activate and monitor mining sessions.

Required elements:

- Mining status.
- Mining Power.
- Session timer.
- Session progress indicator.
- Start Mining button.
- Session completion status.
- Daily session count.

Session rules:

- Each session lasts 8 hours.
- Maximum 3 sessions per day.
- A new session cannot begin while another session is active.

The interface must distinguish:

- Not Started.
- Active.
- Completed.
- Failed.
- Temporarily Unavailable.

The countdown must use server-authoritative session timestamps.

The mobile countdown is for display only.

14. MINING SESSION ACTIVATION

When a user activates mining:

1. Check account eligibility.
2. Check session availability.
3. Check daily session limit.
4. Check required advertisement conditions.
5. Request session activation from the backend.
6. Display the active mining session.

If activation fails, show a clear error message.

The interface must never show a successful session when the backend has rejected activation.

15. SESSION COMPLETION SCREEN

Purpose:

Show the result of a completed mining session.

Required elements:

- Session completed message.
- Session duration.
- Virtual SAC reward.
- Mining Power used.
- Completion timestamp.
- Continue button.

Reward values must come from the backend.

16. REFERRAL SCREEN

Purpose:

Help users invite friends.

Required elements:

- Referral code.
- Referral link.
- Copy button.
- Share button.
- Total referral count.
- Valid referral count.
- Referral progress list.

Referral rules:

- Maximum 10 referred accounts per referrer.
- Each referred account must complete 21 successful mining sessions.
- Both eligible participants may receive the approved Mining Power bonus.

Referral bonus percentage and detailed calculations will follow the Referral Specification.

The interface must clearly distinguish pending referrals from valid referrals.

17. MINING HISTORY SCREEN

Purpose:

Display the user's previous mining activity.

Required information:

- Session date.
- Session start time.
- Session completion time.
- Session status.
- Virtual SAC reward.
- Mining Power.

Users should be able to view previous records.

An empty state must be displayed when no history exists.

18. NOTIFICATION SCREEN

Purpose:

Display important account and application notifications.

Notification categories:

- Mining.
- Referral.
- Account.
- Security.
- System announcements.

Each notification should display:

- Title.
- Description.
- Timestamp.
- Read or unread status.

19. PROFILE SCREEN

Purpose:

Display user information and account statistics.

Required information:

- Username.
- User ID.
- Account creation date.
- Account status.
- Successful mining sessions.
- Referral count.
- Mining statistics.

Available actions:

- Edit Profile.
- Account Settings.
- Security Settings.
- Help and Support.
- Privacy Policy.
- Terms and Conditions.
- Logout.

Sensitive personal information must not be publicly exposed.

20. SETTINGS SCREEN

Settings should include:

- Account preferences.
- Notification preferences.
- Security options.
- Language settings, when supported.
- Privacy information.
- Application information.
- Logout.

Settings must use consistent layouts and controls.

21. HELP AND SUPPORT SCREEN

Purpose:

Provide users with assistance.

Required sections:

- Frequently Asked Questions.
- Mining Guide.
- Referral Guide.
- Account Support.
- Contact Support.

Support channels must use official project destinations.

22. UI STATES

Every screen that loads remote data must support:

Loading State

Display a loading indicator while data is being retrieved.

Empty State

Explain when no data is available.

Error State

Display a clear error message and an appropriate retry action.

Success State

Provide confirmation when an operation completes successfully.

Offline State

Inform users when network connectivity is unavailable.

23. ANIMATION REQUIREMENTS

Animations should be smooth and lightweight.

Recommended animations:

- Splash logo appearance.
- Button press feedback.
- Card transitions.
- Navigation transitions.
- Progress indicators.
- Mining status transitions.
- Loading animations.

Animations must not unnecessarily consume battery or reduce performance.

24. RESPONSIVE DESIGN

The application must support:

- Different Android screen sizes.
- Different screen densities.
- Portrait orientation.
- System navigation areas.
- Safe areas.
- Different font scaling settings.

Important content must not be clipped or hidden.

25. ACCESSIBILITY

The application should support:

- Readable font sizes.
- Sufficient color contrast.
- Accessible button labels.
- Touch-friendly controls.
- Screen reader descriptions.
- Clear error messages.

Color alone must not communicate important status information.

26. PERFORMANCE REQUIREMENTS

The UI must:

- Load screens efficiently.
- Avoid unnecessary rendering.
- Use optimized images.
- Avoid heavy animations.
- Handle slow networks gracefully.
- Remain responsive during API requests.

27. UI SECURITY REQUIREMENTS

The UI must:

- Avoid displaying private credentials.
- Never expose passwords.
- Avoid logging sensitive information.
- Hide sensitive information where appropriate.
- Display virtual balances accurately.
- Never fabricate mining rewards.
- Never trust client-side reward calculations.

28. DESIGN IMPLEMENTATION RULES

Development requirements:

1. Use React Native components.
2. Use TypeScript.
3. Use reusable components.
4. Maintain a centralized design system.
5. Separate UI from business logic.
6. Keep navigation consistent.
7. Avoid duplicated styles.
8. Use consistent spacing.
9. Test all screens on Android.
10. Follow the approved PRD.

The initial implementation must begin with a blank screen and add components incrementally.

29. DESIGN DEVELOPMENT ORDER

The UI will be implemented in the following order:

1. Blank Splash Screen.
2. Splash Background.
3. SAECOIN Logo.
4. Splash Animation.
5. Onboarding Screens.
6. Registration Screen.
7. Login Screen.
8. Account Verification Screen.
9. Community Joining Screen.
10. Home Dashboard.
11. Mining Screen.
12. Referral Screen.
13. Mining History.
14. Notifications.
15. Profile.
16. Settings.
17. Help and Support.

Each screen must be reviewed before proceeding to the next screen.

30. FINAL DESIGN POLICY

The SAECOIN App must maintain a consistent, premium, and user-friendly design.

UI components must be reusable and maintainable.

The interface must accurately represent backend data and must never mislead users about virtual rewards or blockchain assets.

The visual design must remain separate from blockchain consensus and mining implementation.

---

END OF DOCUMENT

Document Status: Draft — Pending User Approval
Next Document: 03 — App Flow Specification
