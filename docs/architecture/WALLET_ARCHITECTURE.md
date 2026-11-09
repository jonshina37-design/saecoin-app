# SAECOIN Wallet Architecture

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

## 1. Non-custodial (CONFIRMED, C-01, C-02, C-10)

The user's private key and seed phrase are created and kept on the user's device. They are never sent to a backend, a server, the founder or an admin. Signing happens on the device.

## 2. Features (CONFIRMED list, C-10)

SAC balance, send, receive, transaction history, token management, token creation, wallet import, seed phrase backup, network status, block explorer, node status, full node mode, optional PoW mining mode. Locked and unlocked balances are both shown (C-12).

## 3. Key management (PROPOSED)

| Topic | Proposal |
| --- | --- |
| Seed | A standard mnemonic seed phrase; recovery from the phrase restores all addresses |
| Storage | Encrypted key material protected by the Android Keystore, hardware-backed where the phone has it |
| Use | Biometric or device credential before signing |
| Backup | The user writes down the phrase; the app must warn that nobody can recover it |
| Import | From seed phrase |
| Screens | No key or phrase in screenshots, logs or clipboard history where the platform allows |

Nothing is implemented. No key generation code exists, and none will be written before approval (C-13).

## 4. Sending (PROPOSED)

1. User enters address and amount.
2. The wallet shows amount, fee and total. Only **unlocked** coins can be sent.
3. The wallet signs locally.
4. The transaction goes to peers.
5. The wallet shows pending, confirmed and final-enough states by confirmation count (Q-07).

## 5. Reward claims from the wallet

A claim is a transaction signed by the same key. See REWARD_CLAIM_SPEC.

## 6. Risks

Lost phrase means lost coins. Phishing and fake apps (SECURITY threat model). Rooted or infected phones. Backup in cloud services. A user who uses the Telegram Mini App from v1.2 cannot hold a non-custodial key safely, which is part of Q-16.
