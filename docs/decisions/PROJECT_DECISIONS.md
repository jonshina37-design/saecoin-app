SAECOIN

PROJECT DECISIONS & CONFIRMED SPECIFICATIONS

Document Version: 1.0
Project: SAECOIN
Ticker: SAC (Provisional)
Document Status: Draft — Consolidated Decisions
Purpose: Central Record of Project Decisions
Last Updated: 9 November 2026

---

1. PURPOSE

This document consolidates the decisions made so far concerning the SAECOIN blockchain, tokenomics, mining sessions, reward distribution, verification, advertising revenue, wallet architecture, and development phases.

Its purpose is to:

- Maintain a single source of truth.
- Prevent conflicting project specifications.
- Help developers implement approved decisions.
- Clearly distinguish confirmed decisions from unresolved questions.
- Provide a reference for future architecture and technical documents.

This document does not replace the detailed technical specifications.

2. PROJECT IDENTITY

Item| Decision
Project Name| SAECOIN
Native Coin| SAC
Ticker| SAC (Provisional)
Blockchain Network| SAECOIN Network
Main Application| SAECOIN
Wallet Interface| SAC WALLET
Blockchain Architecture| Decentralized
Development Status| Planning

3. DECENTRALIZATION PRINCIPLES

The SAECOIN Network must operate as a decentralized blockchain.

Confirmed principles:

1. No founder-only consensus authority.
2. No founder-only block approval authority.
3. No founder-only control over user balances.
4. No founder-only authority to mint additional SAC.
5. Anyone should be able to operate a Full Node without special permission.
6. Full Nodes independently validate transactions and blocks.
7. Backend services must not become the authority for blockchain consensus.
8. Network operation must not depend on a single application backend.

The Founder must not receive special consensus or governance privileges.

4. CONSENSUS DIRECTION

Item| Decision
Consensus Direction| Proof of Work (PoW)
Proof of Stake| Not selected
Community Delegation| Not selected
Full Node Validation| Required
Independent Block Validation| Required

The exact PoW algorithm, difficulty adjustment, block interval, and other consensus parameters remain undecided.

5. TOKENOMICS

5.1 Maximum Supply

The maximum supply of SAECOIN is:

31,000,000 SAC

Coin precision:

8 decimal places

No additional SAC may be created beyond the approved maximum supply.

5.2 Supply Allocation

Allocation| Amount
Mining Reward Pool| 17,000,000 SAC
Task Reward Pool| 2,000,000 SAC
Founder Reserve| 12,000,000 SAC
Referral Pool| Removed
Total Supply| 31,000,000 SAC

All allocations must be recorded and independently verifiable.

5.3 Genesis Allocation

The Genesis Block must establish the approved supply allocation.

The blockchain must provide a verifiable record of:

- Initial allocation.
- Locked balances.
- Unlock conditions.
- Reward distributions.
- Transactions.
- Remaining pool balances.

No SAC should be created outside the approved supply rules.

6. FOUNDER RESERVE

The Founder Reserve is:

12,000,000 SAC

Confirmed direction:

1. The reserve belongs personally to the Founder.
2. It is locked for one year from the Genesis timestamp.
3. After the lock period, the planned release is 1,000,000 SAC per month for 12 months.
4. The reserve does not provide consensus authority.
5. The reserve does not provide special control over the network.

Exact unlock timing and edge cases remain to be specified.

7. MINING REWARD POOL

The Mining Reward Pool is:

17,000,000 SAC

7.1 Total Mining Sessions

The approved total number of Mining Sessions is:

3,100 Sessions

7.2 Reward Budget Per Session

Calculation:

17,000,000 SAC ÷ 3,100 Sessions

Reward Budget per Session: approximately 5,483.8709677419 SAC.

This is the maximum total reward budget for one session, not the individual reward for each user.

7.3 Reward Distribution

Confirmed direction:

1. Users who successfully complete and claim a session are eligible for rewards.
2. The session's reward budget is divided equally among all valid claimants for that session.
3. A higher number of successful claimants means a smaller individual reward.
4. The total distributed reward must never exceed the session budget.
5. Unclaimed rewards remain in the locked Mining Reward Pool.
6. Rounding differences remain in the pool.
7. Reward calculations must use deterministic integer arithmetic with 8-decimal SAC precision.

The exact rounding and remainder-allocation algorithm must be specified before implementation.

8. DAILY MINING SESSION RULES

Confirmed decisions:

Item| Decision
Sessions per Day| 3
Duration per Session| 2 Hours
Time Standard| UTC
Claim Method| Manual Claim
Internet Connection| Required
Session Verification| Required
Grace Period| 5 Minutes

Every user may participate in up to three sessions per day.

The exact UTC start and end times of the three daily sessions still need final specification.

9. MINING SESSION VERIFICATION

The Mining Session system will use backend-assisted verification.

9.1 Proposed Verification Flow

1. User starts a Mining Session.
2. Backend creates a unique Session ID.
3. Backend issues a random verification challenge.
4. The application maintains an internet connection.
5. The application periodically communicates with the backend.
6. Backend records session timing and verification activity.
7. The session reaches its two-hour completion time.
8. User presses Claim Reward.
9. Backend checks the available verification evidence.
10. A valid claim is prepared for blockchain submission.
11. Full Nodes independently validate the claim.
12. A Block Producer includes the valid claim in a block.
13. After block confirmation, SAC is released from the locked Mining Reward Pool to the user's wallet.

9.2 Internet Connection

The application must maintain an internet connection during the session.

Mobile Data and Wi-Fi may both be supported.

9.3 Heartbeat Verification

The application will periodically send heartbeat messages to the backend.

The backend will use these records to verify session continuity and detect suspicious activity.

9.4 Random Challenge

The backend may issue random verification challenges during a session.

The application must respond correctly within the specified challenge deadline.

Challenge generation, timing, and verification rules must be documented in the technical specification.

9.5 Grace Period

A maximum network interruption Grace Period of:

5 Minutes

is approved as the proposed rule.

A temporary connection interruption within the allowed period should not automatically invalidate a session.

The exact handling of repeated interruptions, challenge deadlines, and server outages remains to be specified.

10. MANUAL CLAIM SYSTEM

The user must manually press the Claim Reward button after successfully completing a Mining Session.

A completed session does not automatically transfer SAC.

The claim process must include:

- Session identification.
- Wallet address.
- Claim uniqueness.
- Reward calculation.
- Verification evidence.
- Digital signature.
- Pool balance validation.
- Transaction fee validation.

A user must not be able to claim the same session reward more than once.

11. INDEPENDENT BLOCKCHAIN VERIFICATION

The project follows an independent verification direction.

Backend services may:

- Manage session schedules.
- Record session activity.
- Generate verification challenges.
- Prepare reward claims.
- Maintain session history.
- Provide application APIs.

Backend services must not:

- Mint SAC.
- Directly change blockchain balances.
- Approve blocks.
- Override consensus.
- Bypass Full Node validation.
- Have unrestricted authority to release locked funds.

Full Nodes must independently validate all consensus-critical reward claims.

The exact cryptographic proof and verification authority model remains to be finalized.

12. TASK REWARD POOL

The Task Reward Pool is:

2,000,000 SAC

Task rewards must be distributed from this dedicated allocation.

Task verification must not create new SAC.

Task eligibility, evidence requirements, verification authority, and claim rules require a separate specification.

13. ADVERTISING SYSTEM

The project has selected mandatory advertising at two points.

13.1 Advertisement Placement

1. Before a Mining Session starts.
2. When the user presses Claim Reward.

Both advertisement steps are mandatory under the approved proposal.

If the advertising service is unavailable, the corresponding operation may need to wait until the service becomes available.

Advertising completion must be verified by the backend.

Advertising activity does not participate in blockchain consensus.

14. ADVERTISING REVENUE DISTRIBUTION

Advertising revenue is handled separately from the 31,000,000 SAC supply.

The approved distribution method is:

First deduct expenses, fees, charges, and applicable taxes from gross advertising revenue.

Then distribute the remaining net revenue:

Recipient| Percentage
Founder Share| 30%
SAECOIN Liquidity Fund| 70%
Total| 100%

Example:

Item| Amount
Gross Advertising Revenue| $1,000
Expenses and Taxes| $200
Net Revenue| $800
Founder Share (30%)| $240
Liquidity Fund (70%)| $560

The Liquidity Fund must have separate and transparent accounting.

Advertising revenue does not increase the SAC maximum supply.

15. APPLICATION AND WALLET ARCHITECTURE

The project will use one Android application.

The application will contain two main interfaces:

15.1 SAECOIN Main Application

The main application will contain:

- Mining Sessions.
- Task System.
- Reward Claims.
- Session History.
- Notifications.
- Mining and Task information.

15.2 SAC WALLET

The wallet will be a non-custodial wallet interface.

Planned functionality:

- SAC balance.
- Send SAC.
- Receive SAC.
- Transaction history.
- Token management.
- Token creation.
- Seed phrase backup.
- Wallet recovery.
- Network status.
- Block Explorer access.
- Node status.
- Optional Full Node mode.
- Optional PoW Block Mining mode.

Wallet private keys and seed phrases must remain under user control.

They must never be sent to the Mining Backend.

15.3 Unified Application Navigation

Confirmed direction:

- Main Home opens the Mining and Task interface.
- A downward swipe from the top area opens SAC WALLET.
- A visible Wallet button must also be available.
- An upward swipe from the Wallet interface returns to Mining and Task.

Both interfaces use the same SAECOIN blockchain network.

16. NODE ARCHITECTURE

The project will support:

- Full Nodes.
- Block Producers.
- P2P networking.
- Blockchain validation.
- Wallet clients.
- Optional lightweight clients.

A phone may operate as a lightweight client by default.

Full Node mode may be offered where device and operating-system limitations permit.

The exact block production and mining architecture remains to be specified.

17. BACKEND ARCHITECTURE

The initial backend will be self-hosted on the project owner's own PC or server.

No Firebase or Supabase dependency is planned.

The backend will initially manage:

- Mining schedules.
- Session tracking.
- Task management.
- Verification evidence.
- Reward claim preparation.
- Application APIs.
- User session history.

The backend must remain separate from blockchain consensus.

If the backend becomes unavailable:

- Blockchain validation must continue.
- SAC Wallet functionality must remain independent.
- Mining and Task services may temporarily pause.

Future support for multiple independent backend operators may be considered.

18. DEVELOPMENT PHASES

Development will proceed in separate phases.

Phase 1 — Mining and Task System

Scope:

- Mining and Task backend.
- Session verification.
- Reward claim protocol.
- Test infrastructure.
- Mining and Task Android interface.
- Testnet validation.
- SAC WALLET placeholder only.

Phase 2 — SAC WALLET

Scope:

- Non-custodial wallet.
- Key management.
- Send and Receive.
- Transaction history.
- Backup and recovery.
- Blockchain synchronization.
- Node and network status.

Phase 3 — Unified Application Integration

Scope:

- Integrate Mining and Task with SAC WALLET.
- Verify reward delivery.
- Test application navigation.
- Test blockchain synchronization.
- Perform security and compatibility testing.

Each phase must be completed, tested, documented, and reviewed before proceeding to the next phase.

19. SECURITY PRINCIPLES

Mandatory project security principles:

1. Never expose private keys or seed phrases to the backend.
2. Never allow backend services to mint SAC.
3. Never allow backend services to directly change wallet balances.
4. Independently validate reward claims.
5. Prevent duplicate claims.
6. Protect against unauthorized transactions.
7. Validate all external data.
8. Use cryptographic signatures.
9. Maintain auditable reward records.
10. Keep testnet and mainnet configurations separate.
11. Never include test-only keys in production releases.
12. Never allow unrestricted shell or administrative access through application services.

20. OPEN DECISIONS

The following subjects still require formal specification and approval.

ID| Open Subject
O-01| Exact PoW algorithm
O-02| Block interval
O-03| Difficulty adjustment
O-04| Exact daily UTC session schedule
O-05| Heartbeat interval
O-06| Random challenge frequency and deadline
O-07| Repeated network interruption handling
O-08| Exact verification proof mechanism
O-09| Reward calculation and rounding algorithm
O-10| Task verification authority
O-11| Transaction fee formula
O-12| Genesis timestamp and exact Founder Reserve unlock schedule
O-13| Block Producer selection and validation rules
O-14| Security audit and launch requirements
O-15| Advertising provider and ad-completion verification
O-16| Legal and regulatory review

An open decision must not be treated as an approved implementation rule.

21. CHANGE CONTROL POLICY

This document is the central record of approved project decisions.

Any change to a confirmed decision must:

1. Be proposed clearly.
2. Explain the reason for the change.
3. Identify affected documents and components.
4. Be reviewed by the project owner.
5. Receive explicit approval.
6. Be reflected in the relevant technical specifications.
7. Be recorded in the project decision history.

Developers must not silently change confirmed tokenomics, reward rules, or consensus requirements.

22. FINAL PROJECT POLICY

SAECOIN must prioritize:

- Decentralization.
- Security.
- Transparency.
- Independent verification.
- Deterministic consensus.
- Non-custodial wallet ownership.
- Verifiable reward distribution.
- Clear separation between backend services and blockchain authority.

All implementation work must follow approved project specifications.

---

END OF DOCUMENT
