> **v1.2 NOTICE (draft):** This document belongs to the v1.1 set. Specification v1.2 ([00-Spec-v1.2-Decision-Record.md](00-Spec-v1.2-Decision-Record.md)) changes tokenomics, reward calculation, referral rules and other items. Where the two conflict, the v1.2 record prevails once approved.

# SAECOIN — UI/UX DESIGN SPECIFICATION

- **Document ID:** SAECOIN-APP-UI-002
- **Version:** 1.1
- **Project:** SAECOIN App
- **Status:** Draft — Updated for Approved Requirements
- **Platforms:** Android and iOS
- **Framework:** React Native + Expo
- **Language:** TypeScript

---

## 1. PURPOSE

This document defines the user interface and user experience requirements for the SAECOIN mobile application.

The application must provide a consistent, accessible, secure, and understandable experience on Android and iOS.

The UI must clearly communicate that SAECOIN App Mining is a virtual reward distribution system operated by the application backend.

The interface must not misrepresent virtual mining as actual Proof-of-Work cryptocurrency mining.

## 2. DESIGN PRINCIPLES

The application design must follow these principles:

1. Clean and modern interface.
2. Consistent visual language across Android and iOS.
3. Simple navigation.
4. Clear reward and account information.
5. Accessible typography and controls.
6. Responsive layouts for different screen sizes.
7. Clear loading, success, error, and empty states.
8. Secure handling of sensitive information.
9. No misleading financial or mining claims.
10. Reusable UI components.

The interface should prioritize clarity over unnecessary animations or visual effects.

## 3. PLATFORM REQUIREMENTS

The application must support:

- Android phones.
- iPhones.

Both platforms must use the same React Native + Expo + TypeScript codebase.

Platform-specific UI behavior may be implemented where necessary, but the underlying application rules must remain identical.

Requirements:

- Support different screen sizes.
- Respect operating-system status bars and safe areas.
- Handle Android navigation and iOS safe-area behavior.
- Use platform-appropriate keyboard behavior.
- Support accessible touch targets.
- Handle system font scaling.
- Respect operating-system notification permissions.
- Maintain consistent application branding.

## 4. DESIGN SYSTEM

### 4.1 Color System

The final color palette must be maintained centrally.

Suggested semantic color tokens:

| Token | Purpose |
| --- | --- |
| Primary | Main brand color |
| Primary Variant | Secondary brand emphasis |
| Background | Main application background |
| Surface | Cards and panels |
| Text Primary | Main text |
| Text Secondary | Supporting text |
| Success | Successful operations |
| Warning | Warnings and pending states |
| Error | Failed operations |
| Border | Dividers and outlines |
| Disabled | Disabled controls |

Exact hexadecimal color values must follow the approved SAECOIN branding.

Do not introduce unrelated colors independently in individual screens.

### 4.2 Typography

The application must use a consistent typography system.

Suggested text hierarchy:

- Display: Large dashboard values.
- Heading 1: Main screen headings.
- Heading 2: Section headings.
- Heading 3: Card headings.
- Body: Main content.
- Caption: Supporting information.
- Label: Buttons and form labels.

Typography must remain readable on smaller devices.

### 4.3 Spacing

Use a consistent spacing scale throughout the application.

Suggested spacing values:

- 4 dp: Extra small.
- 8 dp: Small.
- 12 dp: Compact.
- 16 dp: Standard.
- 20 dp: Medium.
- 24 dp: Large.
- 32 dp: Extra large.

Spacing values must be centralized where practical.

### 4.4 Components

Reusable components should include:

- Primary Button.
- Secondary Button.
- Text Input.
- Password Input.
- Status Badge.
- Information Card.
- Reward Card.
- Session Card.
- Transaction Row.
- Notification Item.
- Confirmation Dialog.
- Bottom Sheet.
- Loading Indicator.
- Error Message.
- Empty State.
- Maintenance Banner.

## 5. APPLICATION NAVIGATION

The primary navigation should use a bottom navigation bar.

Suggested navigation:

| Tab | Purpose |
| --- | --- |
| Home | Dashboard and mining session |
| Mining | Session details and history |
| Referral | Referral code and group |
| Explorer | Public ledger and transaction search |
| Profile | Account information and settings |

The navigation must:

- Remain consistent across Android and iOS.
- Clearly indicate the selected tab.
- Preserve relevant screen state when navigating.
- Prevent accidental duplicate actions.
- Respect device safe areas.

Authentication screens must remain separate from the authenticated navigation structure.

## 6. SCREEN SPECIFICATIONS

### 6.1 Splash Screen

Purpose:

- Display SAECOIN branding.
- Provide a brief loading experience.
- Initialize essential application state.

Elements:

- SAECOIN logo.
- Application name.
- Optional loading indicator.

The splash screen must not display unverified balances or session information.

### 6.2 Onboarding Screen

Purpose:

Introduce new users to the application.

Suggested onboarding topics:

1. What SAECOIN App is.
2. How virtual mining sessions work.
3. How reward validation works.
4. How referrals work.
5. How account validity works.

The onboarding must clearly state that the application does not perform actual CPU/GPU Proof-of-Work mining.

Users should be able to continue, skip where permitted, and revisit help information later.

### 6.3 Registration Screen

Elements:

- Username.
- Email or approved account identifier.
- Password.
- Confirm Password.
- Referral Code.
- Terms and Privacy Policy acceptance.
- Register button.
- Login navigation.

Requirements:

- Validate required fields.
- Show clear validation messages.
- Display invalid referral code errors.
- Prevent self-referral.
- Prevent duplicate submission.
- Never display passwords in plain text by default.

### 6.4 Login Screen

Elements:

- Email or username.
- Password.
- Login button.
- Forgot Password.
- Registration navigation.

Requirements:

- Show authentication errors clearly.
- Prevent repeated accidental submissions.
- Provide password visibility control.
- Support secure authentication and session handling.

### 6.5 Account Recovery Screen

Elements:

- Registered account identifier.
- Recovery instructions.
- OTP input where required.
- New password input.
- Confirm password.
- Submit button.

The interface must never reveal whether a private account identifier exists in a way that enables account enumeration.

### 6.6 Home Dashboard

The Home Dashboard is the primary application screen.

It should display:

Account Summary

- Username.
- Unique User ID.
- Account status.
- Current virtual SAC balance.

Mining Summary

- Current session number.
- Current session status.
- Session countdown.
- Activation status.
- Successful session count.
- Remaining effective sessions.

Reward Summary

- Regular Mining rewards.
- Referral Bonus rewards.
- Recent reward activity.

Referral Summary

- Direct referral count.
- Referral group status.
- Referral progress.

Additional Elements

- Notification shortcut.
- Explorer shortcut.
- System announcements.
- Maintenance status.

Important:

All displayed balances and account states must come from backend responses.

The dashboard must not calculate authoritative rewards locally.

### 6.7 Mining Screen

Purpose:

Allow users to activate and monitor scheduled virtual mining sessions.

Elements:

- Current session number.
- UTC session start time.
- UTC session end time.
- Session status.
- Activation button.
- Countdown timer.
- Session information.
- Reward information.

Session States

| State | UI Presentation |
| --- | --- |
| UPCOMING | Session not started |
| AVAILABLE | Activation permitted |
| ACTIVATED | Activation recorded |
| PROCESSING | Backend validation pending |
| SUCCESSFUL | Session validated |
| FAILED | Session unsuccessful |
| MISSED | Session was not activated |
| MAINTENANCE | Session operations paused |

Only backend-confirmed status may be presented as final.

Activation Behavior

Before activation:

- Display the active session window.
- Show the Activate button when eligible.

After activation:

- Disable the activation button.
- Display activation confirmation.
- Show the session status.

After session completion:

- Display processing status until backend validation finishes.
- Show successful or failed status based on the backend response.

The application must not assume that activation alone guarantees a reward.

### 6.8 Session Countdown

The countdown must use backend-provided time information.

The device clock must not determine authoritative session eligibility.

The UI should clearly display UTC session boundaries.

A localized time display may be added as supporting information, but UTC remains the authoritative reference.

### 6.9 Reward History Screen

Purpose:

Allow users to review their virtual SAC reward records.

Suggested fields:

- Reward ID.
- Session ID.
- Reward category.
- Amount.
- Status.
- UTC timestamp.

Reward categories:

- Regular Mining.
- Referral Bonus.
- Approved Correction.

Suggested status labels:

- Pending.
- Processing.
- Confirmed.
- Failed.
- Corrected.

Users must not be able to edit or delete reward records.

### 6.10 Referral Screen

Elements:

- Username.
- Referral Code.
- Copy Referral Code button.
- Share Referral Code button.
- Direct referral count.
- Maximum direct referral limit.
- Referral eligibility status.
- Referral activity.

The maximum direct referral limit is 10.

The UI must clearly explain that referral rewards depend on backend eligibility validation.

The application must not promise a guaranteed referral reward.

### 6.11 Referral Group Screen

Elements:

- Current referrer.
- Current group status.
- Direct referrals.
- Group eligibility information.
- Lifetime group change status.
- Change Referral Group action, when eligible.

The interface must clearly display:

- Whether the user is eligible to change groups.
- Whether the lifetime change opportunity has been used.
- Whether a new group relationship is pending activation for the next session.

A successful group change must show that the user's 21-session validity progress has restarted.

### 6.12 Profile Screen

Elements:

- Username.
- Unique User ID.
- Account status.
- Registration information where appropriate.
- Referral Code.
- Security settings.
- Account recovery options.
- Help and Support.
- Logout.

Private information must not be exposed unnecessarily.

### 6.13 Notification Screen

The notification screen must display:

- Session notifications.
- Reward notifications.
- Referral notifications.
- Account status notifications.
- KYC notifications.
- Maintenance announcements.
- System announcements.

Requirements:

- Display read/unread status.
- Display timestamps.
- Support notification history.
- Allow deletion from the user's own notification history.
- Never delete underlying system records when a notification is deleted.

Push notifications must follow Android and iOS permission requirements.

### 6.14 KYC Screen

KYC must only become available after all 2,160 effective sessions are completed.

Before that point, the KYC screen must not request document submission.

When KYC becomes required, display:

- KYC requirement status.
- Verification instructions.
- Accepted document information.
- Submission status.
- Verification result.

Provider and document requirements remain subject to separate approval.

If KYC is pending, the interface must clearly explain that the eligible balance is temporarily locked rather than forfeited.

### 6.15 Explorer Screen

The Explorer provides access to the public application-operated ledger.

The interface should include:

- Block Number.
- Block Hash.
- Previous Block Hash.
- Digital Signature.
- Block Publishing Time UTC.
- Session Number.
- Session Close Time UTC.
- Transaction ID.
- User ID.
- Transaction Amount.
- Transaction Purpose.
- Session Confirmation.
- Total Balance.

Search options:

- Block Number.
- Transaction ID.
- User ID.

The Explorer should provide a verification interface for public block hashes and digital signatures.

It must clearly explain that the current ledger is operated by the SAECOIN application backend and is not a decentralized blockchain.

### 6.16 Transaction Details Screen

Display:

- Transaction ID.
- Block Number.
- User ID.
- Session ID.
- Transaction Purpose.
- Transaction Amount.
- UTC timestamp.
- Confirmation status.
- Related correction information, if applicable.

Sensitive personal information must never be displayed.

### 6.17 Maintenance Screen

During maintenance, show:

- Maintenance status.
- Reason, where available.
- Start time UTC.
- Expected completion time, if known.
- Relevant service information.

Do not display an estimated completion time unless the backend provides one.

The interface must not allow users to activate new sessions while the backend has disabled session operations.

### 6.18 Account Status Screen

The screen must distinguish:

- PENDING.
- VALID.
- SUSPENDED.
- CANCELLED.

Display:

- Current status.
- Relevant explanation.
- Required user action, if any.
- Appeal or evidence submission process, where applicable.

The application must clearly distinguish temporary suspension from permanent cancellation.

## 7. GLOBAL UI STATES

Every screen that loads backend data must support appropriate states.

### 7.1 Loading State

- Show a loading indicator.
- Prevent duplicate submissions.
- Avoid showing stale information as newly confirmed.

### 7.2 Empty State

Show an explanatory message when no data is available.

Examples:

- No reward history.
- No referral activity.
- No notifications.
- No matching transaction.

### 7.3 Error State

Show:

- A clear error message.
- Retry action where appropriate.
- A safe fallback.

Never expose internal server errors, stack traces, secrets, or database details.

### 7.4 Offline State

When internet connectivity is unavailable:

- Display an offline indicator.
- Do not allow an unconfirmed activation to appear successful.
- Preserve safe locally available information.
- Retry server requests according to the approved network strategy.

### 7.5 Maintenance State

When the backend reports maintenance:

- Display maintenance information.
- Disable affected operations.
- Preserve locally displayed historical information where safe.
- Do not invent session success or reward confirmation.

## 8. INTERACTION REQUIREMENTS

All interactive controls must provide clear feedback.

Examples:

- Button press feedback.
- Form validation.
- Loading indicators.
- Success messages.
- Error messages.
- Confirmation dialogs for important actions.

Actions that may create irreversible changes must require appropriate confirmation.

The interface must prevent accidental repeated activation and duplicate form submission.

## 9. ACCESSIBILITY

The application must support:

- Readable font sizes.
- Adequate contrast.
- Screen readers.
- Accessible labels.
- Logical focus order.
- Touch-friendly controls.
- Dynamic text scaling.
- Clear error descriptions.

Status must not be communicated through color alone.

Use text labels and suitable icons in addition to colors.

## 10. RESPONSIVE DESIGN

The application must support:

- Small Android phones.
- Large Android phones.
- Different iPhone screen sizes.
- Portrait orientation.

Layouts must adapt to different display dimensions.

Avoid fixed-width designs that cause content clipping.

The application must respect device safe areas and operating-system UI elements.

## 11. SECURITY AND PRIVACY IN THE UI

The UI must:

- Avoid exposing passwords.
- Avoid displaying OTP secrets.
- Never show private keys or recovery codes unnecessarily.
- Avoid logging sensitive information.
- Hide sensitive information when appropriate.
- Prevent unauthorized administrative controls from appearing in normal user screens.
- Use secure confirmation flows for sensitive actions.

The public Explorer must not expose KYC documents, personal contact details, authentication data, or recovery information.

## 12. DESIGN IMPLEMENTATION RULES

The UI implementation must follow these rules:

1. Use reusable React Native components.
2. Keep styling centralized.
3. Use TypeScript types for UI data models.
4. Separate API communication from presentation components.
5. Keep business rules in the backend.
6. Avoid duplicating reward calculations in the frontend.
7. Handle loading and error states consistently.
8. Maintain Android and iOS compatibility.
9. Test all interactive screens on both platforms.
10. Follow the approved UI design system.

## 13. UI TESTING REQUIREMENTS

Test the following:

- Splash screen.
- Onboarding.
- Registration.
- Login.
- Account recovery.
- Home dashboard.
- Mining activation.
- Session countdown.
- Session completion.
- Reward history.
- Referral screens.
- Referral group change.
- Profile.
- Notifications.
- KYC.
- Explorer.
- Transaction details.
- Maintenance screen.
- Account status.
- Accessibility.
- Responsive layouts.

Tests must include:

- Loading state.
- Empty state.
- Error state.
- Offline state.
- Backend maintenance.
- Repeated button presses.
- Invalid input.
- Expired session.
- Permission denial.

Android and iOS must be tested independently.

## 14. FINAL DESIGN POLICY

The SAECOIN application interface must remain consistent, understandable, secure, and accessible.

The UI must never become the authority for:

- Session eligibility.
- Reward calculations.
- Referral eligibility.
- Account validity.
- Account cancellation.
- Public ledger confirmation.

All authoritative information must come from the backend.

The application must clearly distinguish virtual application rewards from actual decentralized cryptocurrency assets.

---

END OF DOCUMENT

Next Document: 03 — App Flow Specification
