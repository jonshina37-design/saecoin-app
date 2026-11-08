> **v1.2 NOTICE (draft):** This document belongs to the v1.1 set. Specification v1.2 ([00-Spec-v1.2-Decision-Record.md](00-Spec-v1.2-Decision-Record.md)) changes tokenomics, reward calculation, referral rules and other items. Where the two conflict, the v1.2 record prevails once approved.

# SAECOIN — RELEASE AND LAUNCH PLAN

- **Document:** 12-Release-and-Launch-Plan.md
- **Version:** 1.1
- **Project:** SAECOIN App
- **Ticker:** SAC (Provisional)
- **Status:** Draft — Pending Approval

---

## 1. PURPOSE

This document defines the release, deployment, launch, maintenance, monitoring, and recovery plan for the SAECOIN App.

The objectives are to ensure that:

- Development progresses through controlled stages.
- Critical functionality is completed before public release.
- Security and reward integrity are verified.
- Production infrastructure is prepared.
- Database and backup systems are operational.
- Administrative access is secured.
- Public launch occurs only after approval.
- Post-launch incidents can be handled safely.
- Existing user balances and historical records remain protected.

## 2. RELEASE PRINCIPLES

The SAECOIN release process must follow these principles:

1. Do not launch before required testing is complete.
2. Do not deploy unreviewed changes to production.
3. Keep development and production environments separate.
4. Protect production secrets and credentials.
5. Verify database migrations before deployment.
6. Maintain reliable backups.
7. Preserve existing reward and ledger records.
8. Require approval for production releases.
9. Monitor critical services after deployment.
10. Keep a rollback or recovery procedure ready.

## 3. RELEASE STAGES

The project should progress through the following stages.

### 3.1 Stage 1 — Documentation Finalization

Required documents:

- `01-App-PRD.md`
- `02-UI-UX-Design.md`
- `03-App-Flow-Specification.md`
- `04-Technical-Requirements.md`
- `05-App-Architecture.md`
- `06-Backend-Specification.md`
- `07-Database-Schema.md`
- `08-Mining-Reward-Specification.md`
- `09-Referral-Specification.md`
- `10-Security-Specification.md`
- `11-Testing-Strategy.md`
- `12-Release-and-Launch-Plan.md`

Before implementation proceeds, the documents must be reviewed for:

- Contradictions.
- Missing requirements.
- Undefined business rules.
- Conflicting token allocations.
- Inconsistent API requirements.
- Inconsistent database definitions.
- Security gaps.
- Unresolved approval decisions.

The documents must be treated as a coordinated specification set.

### 3.2 Stage 2 — Project Foundation

Complete the initial technical foundation:

- React Native + Expo project.
- TypeScript configuration.
- Backend project.
- Database connection.
- Environment configuration.
- Authentication foundation.
- API structure.
- Logging foundation.
- Development documentation.
- Initial CI checks.

The foundation must compile and run in the controlled development environment.

### 3.3 Stage 3 — Core Application Development

Implement the main application features:

- Registration.
- Login.
- User profile.
- Referral code.
- Referral relationships.
- Home dashboard.
- Mining session interface.
- Session history.
- Balance display.
- Reward history.
- Notifications.
- Account status display.

The backend must remain authoritative for all account and reward information.

### 3.4 Stage 4 — Reward and Referral Implementation

Implement:

- Scheduled session management.
- Session activation.
- Session completion validation.
- Initial 21-session validity requirement.
- Regular Mining Reward processing.
- Referral group eligibility.
- Referral Bonus processing.
- One-time referral group change.
- Inactivity tracking.
- Permanent cancellation rules.
- Reward ledger integration.

The individual reward formulas and rounding rules must be formally approved before production reward processing is enabled.

### 3.5 Stage 5 — Administrative System

Implement:

- Main Admin login.
- Sub-Admin access.
- Authenticator App OTP.
- Email OTP recovery.
- Backup Recovery Code.
- User suspension review.
- User evidence submission.
- Reward correction requests.
- Main Admin approval and rejection.
- Audit logs.
- Operational reports.
- Backup management.
- Recovery controls.

Sub-Admins must not receive final approval authority for restricted workflows.

### 3.6 Stage 6 — Public Ledger and Explorer

Implement:

- Block generation.
- Block hash calculation.
- Previous block hash references.
- Backend digital signatures.
- Public verification keys.
- Transaction records.
- Session confirmation.
- Explorer interface.
- Block verification.
- Correction block workflow.

The public ledger is an app-operated, publicly inspectable and cryptographically verifiable record system.

It is not a decentralized or trustless blockchain.

### 3.7 Stage 7 — Security and Recovery Readiness

Complete:

- Authentication security.
- API authorization.
- Database security.
- Backup encryption.
- Recovery testing.
- Admin permission testing.
- Signing key protection.
- Dependency review.
- Security testing.
- Incident response procedures.

Critical security findings must be resolved before public launch.

### 3.8 Stage 8 — Internal Testing

Conduct internal testing only.

Public Testnet or Beta distribution is not required under the current project scope.

Internal testing must cover:

- Mobile application.
- Backend.
- Database.
- Mining sessions.
- Reward calculations.
- Referral rules.
- Admin workflows.
- Public ledger.
- Notifications.
- Backup and recovery.
- Security.

Testing results must be documented.

### 3.9 Stage 9 — Production Preparation

Prepare the production environment:

- Production server.
- Database.
- Domain and HTTPS.
- Environment variables.
- Secret management.
- Monitoring.
- Backup automation.
- Admin access.
- Logging.
- Recovery procedures.
- Application release configuration.

Production credentials must never be included in the source repository or mobile application.

### 3.10 Stage 10 — Public Launch

Public launch may proceed only after the launch approval requirements in this document are satisfied.

## 4. ENVIRONMENT STRATEGY

The project must maintain separate environments.

### 4.1 Development

Purpose:

- Daily development.
- Local debugging.
- Unit testing.
- API development.
- Database development.

Development credentials and data must remain separate from production.

### 4.2 Internal Testing

Purpose:

- Full integration testing.
- Security testing.
- Reward engine testing.
- Referral testing.
- Admin workflow testing.
- Backup and recovery verification.

Internal testing must use controlled test accounts and isolated data.

### 4.3 Production

Purpose:

- Real user access.
- Authoritative account management.
- Scheduled session processing.
- Reward distribution.
- Referral processing.
- KYC.
- Public ledger publishing.

Production must use approved security and operational configurations.

## 5. PRODUCTION INFRASTRUCTURE

The production infrastructure must include:

- Backend application service.
- Database service.
- Secure storage for required files.
- Backup storage.
- Monitoring and alerting.
- Logging.
- HTTPS configuration.
- Administrative access controls.
- Public Explorer hosting.
- Notification delivery integration.

The final hosting provider, server specifications, domain, and infrastructure costs remain deployment decisions.

The architecture must not assume that a development laptop is suitable for production hosting.

## 6. DATABASE AND MIGRATION RELEASE POLICY

Database changes must be managed carefully.

Requirements:

1. Review every production migration.
2. Test migrations in a non-production environment.
3. Back up production data before risky migrations.
4. Use transactions where supported and appropriate.
5. Verify database integrity after migration.
6. Record migration versions.
7. Preserve historical reward and ledger records.
8. Never use destructive migration procedures without explicit review and approval.

A failed migration must trigger the documented recovery procedure.

## 7. RELEASE VERSIONING

The project should use semantic versioning where practical.

Format:

`MAJOR.MINOR.PATCH`

Examples:

- `1.0.0` — First approved public release.
- `1.0.1` — Bug-fix release.
- `1.1.0` — Backward-compatible feature release.
- `2.0.0` — Major release with potentially incompatible changes.

Version numbers must be consistent across:

- Mobile application.
- Backend service.
- API documentation.
- Release notes.

Build numbers must also be tracked for mobile distribution.

## 8. RELEASE APPROVAL

Every production release must receive the required review and approval.

The release review must include:

- Release version.
- Change summary.
- Test results.
- Security review.
- Database migration review.
- Backup verification.
- Known issues.
- Deployment steps.
- Recovery plan.
- Responsible release operator.

No unreviewed production deployment is permitted.

The Main Admin must approve operational changes that fall under the documented Main Admin authority.

## 9. PRE-LAUNCH CHECKLIST

The following requirements must be completed before public launch.

### 9.1 Documentation

- [ ] All 12 specification documents are available.
- [ ] Cross-document consistency review is complete.
- [ ] Unresolved business rules are identified.
- [ ] Token allocation figures are consistent.
- [ ] API and database definitions are consistent.

### 9.2 Application

- [ ] Registration works.
- [ ] Login works.
- [ ] Profile works.
- [ ] Referral code validation works.
- [ ] Session interface works.
- [ ] Session history works.
- [ ] Balance display works.
- [ ] Reward history works.
- [ ] Notification history works.
- [ ] Error and maintenance states work.

### 9.3 Backend

- [ ] Authentication is secure.
- [ ] API authorization works.
- [ ] Session validation works.
- [ ] Reward processing works.
- [ ] Referral processing works.
- [ ] Duplicate reward prevention works.
- [ ] Account status transitions work.
- [ ] Audit logging works.

### 9.4 Token Allocation

- [ ] Regular Mining allocation is validated.
- [ ] Referral Bonus allocation is validated.
- [ ] Total App Mining Distribution is within budget.
- [ ] App Reserve accounting is validated.
- [ ] Founder/Personal Reserve is kept separate.
- [ ] Node Mining allocation remains zero.
- [ ] Total supply does not exceed 31,000,000 SAC.
- [ ] Individual reward formulas are formally approved.
- [ ] Rounding and remainder policies are approved.

### 9.5 Security

- [ ] Password hashing is implemented.
- [ ] OTP authentication works.
- [ ] Main Admin recovery works.
- [ ] Sub-Admin permissions are restricted.
- [ ] API security tests pass.
- [ ] Database security review is complete.
- [ ] Signing keys are protected.
- [ ] No production secrets are committed.

### 9.6 Operations

- [ ] Production database is ready.
- [ ] HTTPS is configured.
- [ ] Backup automation works.
- [ ] Recovery test passes.
- [ ] Monitoring works.
- [ ] Admin alerts work.
- [ ] Incident response process is ready.
- [ ] Maintenance mode works.

### 9.7 Release

- [ ] Android release build is verified.
- [ ] iOS release build is verified.
- [ ] Supported OS versions are documented.
- [ ] Store submission requirements are reviewed.
- [ ] Release notes are prepared.
- [ ] Main Admin launch approval is recorded.

## 10. PUBLIC LAUNCH PROCEDURE

The public launch must follow a controlled sequence.

1. Confirm launch approval.
2. Verify production infrastructure.
3. Verify database backups.
4. Verify environment configuration.
5. Verify HTTPS.
6. Deploy the approved backend version.
7. Apply approved database migrations.
8. Run production health checks.
9. Verify authentication.
10. Verify session scheduling.
11. Verify reward processing configuration.
12. Verify administrative access.
13. Verify monitoring and alerts.
14. Publish the approved mobile application.
15. Enable public user registration.
16. Monitor the system closely after launch.
17. Record the launch time and release version.

If a critical issue is discovered, affected operations must be stopped or the application placed into maintenance mode.

## 11. MOBILE APPLICATION DISTRIBUTION

The mobile application will be distributed through the approved Android and iOS application distribution channels.

The release process must include:

- Application signing.
- Secure build configuration.
- Version and build number.
- Store metadata.
- Privacy information.
- Required permissions.
- Screenshots and store assets.
- Release notes.
- Store review compliance.

The final package identifiers, signing configuration, and store account details must be finalized before release.

Signing keys must be securely backed up and must not be committed to GitHub.

## 12. POST-LAUNCH MONITORING

After public launch, the operational team must monitor:

- Backend availability.
- Database health.
- API error rates.
- Authentication failures.
- Session processing.
- Reward processing.
- Referral calculations.
- Duplicate request detection.
- Block publishing.
- Notification delivery.
- Backup success.
- Storage usage.
- Security alerts.

Monitoring thresholds must be defined and tested before production launch.

Critical failures must alert the Main Admin.

## 13. MAINTENANCE POLICY

Maintenance may be planned or emergency-based.

### 13.1 Planned Maintenance

Before planned maintenance:

- Notify users through Push Notification where permitted.
- Publish an In-App notification.
- Explain the reason when possible.
- Provide the expected maintenance window when known.

### 13.2 Emergency Maintenance

For emergency maintenance:

- Stop affected operations when necessary.
- Display Under Maintenance status.
- Send a notification after the interruption when possible.
- Record the reason and start time.
- Notify the Main Admin.

### 13.3 Maintenance Completion

After maintenance:

- Verify backend health.
- Verify database integrity.
- Reconcile pending sessions.
- Reconcile pending rewards.
- Verify public ledger publishing.
- Restore normal operation.
- Notify users that maintenance has ended.
- Record the maintenance end time.

## 14. CRITICAL BUG AND SECURITY INCIDENT POLICY

If a critical bug or vulnerability is discovered after launch:

1. Assess the affected functionality.
2. Stop the affected operation or the entire application if necessary.
3. Display Under Maintenance status.
4. Preserve all existing user records and balances.
5. Preserve pending session and reward records.
6. Investigate the issue.
7. Implement a reviewed fix.
8. Run relevant regression and security tests.
9. Validate affected records.
10. Obtain required approval.
11. Restore the affected service.
12. Record the incident and resolution.

Critical bugs must not be ignored to maintain service availability.

## 15. REWARD PROCESSING OUTAGE AND RECOVERY

If a session or reward process is interrupted:

- Incomplete sessions must remain identifiable.
- Reward processing must remain pending until validation.
- The backend must reconcile affected records.
- Required Admin approval must be obtained before affected reward processing.
- Unique session and reward IDs must be preserved.
- Duplicate credit must be prevented.
- All recovery actions must be audited.

Existing balances must not be reset or deleted during recovery.

## 16. BACKUP AND RESTORE OPERATIONS

The backup policy must follow the Security Specification.

Required backup sources:

- Encrypted laptop database backup.
- Automatic upload to the designated SAECOIN Google Drive.
- Manual Pen Drive backup through the Admin Panel.

Requirements:

- Backup after every mining session.
- Integrity verification.
- Backup history for all 2,160 effective sessions.
- Backup failure alerts.
- Monthly recovery testing.
- Separate password and encryption key.
- Offline Recovery Key.
- Main Admin approval for laptop-loss restoration.

If required recovery material is lost, the encrypted backup may become unrecoverable. This risk must be clearly understood by the Main Admin.

## 17. RELEASE ROLLBACK POLICY

A release rollback may be necessary if a deployment causes a serious failure.

Rollback must consider:

- Mobile application compatibility.
- Backend API compatibility.
- Database schema changes.
- Pending session records.
- Pending reward records.
- Ledger publication state.
- User balances.
- Authentication sessions.

Database rollback must not delete valid historical transactions or reward records.

If a previous application version cannot safely operate with the current database, the system must use an approved forward-fix or recovery migration rather than performing a destructive rollback.

All rollback or recovery actions must be logged.

## 18. POST-LAUNCH REVIEW

After launch, the project should conduct a formal operational review.

The review should cover:

- Launch stability.
- User registration.
- Authentication reliability.
- Session processing.
- Reward integrity.
- Referral behavior.
- API performance.
- Database performance.
- Security alerts.
- Backup status.
- User-reported issues.
- Administrative workload.

Findings must be documented and prioritized.

## 19. FUTURE RELEASES

Future releases may include:

- Improved dashboards.
- Additional account features.
- Explorer enhancements.
- Better operational reporting.
- Additional security controls.
- Performance improvements.
- Improved notification handling.
- Additional supported mobile platforms.

Future independent blockchain development is a separate project and must not be represented as part of the current centralized SAECOIN App architecture.

## 20. UNRESOLVED RELEASE DECISIONS

The following items require approval before production deployment:

1. Final production hosting provider.
2. Domain and DNS configuration.
3. Production server specifications.
4. Database hosting and backup storage.
5. Monitoring provider or self-hosted monitoring configuration.
6. Android package identifier.
7. iOS bundle identifier.
8. Minimum supported OS versions.
9. Application store accounts.
10. Production deployment method.
11. Release approval procedure.
12. Performance and availability targets.
13. User support process.
14. Privacy policy and legal documentation.
15. Final individual reward and referral allocation formulas.
16. Final KYC provider and process.

These decisions must be documented before the relevant production release activities.

## 21. FINAL LAUNCH POLICY

SAECOIN must launch only after the required implementation, testing, security review, operational preparation, and approval are complete.

The project must prioritize:

- User account security.
- Reward allocation integrity.
- Accurate session validation.
- Referral consistency.
- Database reliability.
- Backup and recovery.
- Public ledger verifiability.
- Transparent maintenance and incident handling.

Public launch must not proceed while critical bugs, critical security vulnerabilities, or unresolved token allocation rules remain.

---

END OF DOCUMENT
