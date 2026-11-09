# Unified Android App UX Specification

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

Two interfaces in **one** app (CONFIRMED, C-10). Visual style uses the owner-approved tokens in `packages/theme` and the assets in `assets/branding` (working copy of the `audit-and-branding` branch, not yet pushed); no new colors are invented here.

## 1. Interfaces

| Interface | Content |
| --- | --- |
| Main: Mining and Task | Regular session, mining reward, Task Pool, available tasks, reward claim, session history, reward history, notifications |
| Wallet | SAC balance (locked and unlocked), send, receive, transaction history, token management, token creation, wallet import, seed phrase backup, network status, block explorer, node status, full node mode, optional PoW mining mode |

## 2. Navigation (CONFIRMED)

- Swipe down from the specified upper area of the Main screen opens the Wallet.
- Swipe up from the Wallet returns to Main.
- A **visible Wallet button** also exists and works the same way.

## 3. Interaction rules (PROPOSED)

1. The swipe zone is the upper part of the Main screen only, so scrolling lists does not open the Wallet by accident.
2. The Wallet button and a visible Back/Main control are always reachable without the gesture (accessibility, TalkBack, one-hand use).
3. Opening the Wallet does not require unlocking; sending, revealing the seed phrase and exporting require device authentication.
4. Wallet transition shows an obvious change of context (title, color band) so users know they handle real funds.
5. A session in progress keeps running when the Wallet is open.

## 4. Main screen states

Idle (start session), running (time left), complete (claim), claimed-pending (waiting for confirmation), confirmed, failed or rejected (with the reason from the network). Reward amounts are not shown as final until they are decided (Q-12).

## 5. Wallet states

Syncing, synced, offline, light node, full node, low peers. Balance shows locked and unlocked separately and never as one "spendable" number that includes locked coins. Founder-style tranches show unlock dates.

## 6. Send flow

Address, amount, fee shown, total shown, device authentication, signed on the device, status by confirmations (Q-07). Only unlocked SAC can be sent.

## 7. Honest messaging (CONFIRMED need)

- The app does not say that the phone is a full node unless it is currently running one.
- Light-node limits are explained in plain words.
- Rewards are not promised before the network confirms them.

## 8. Safety

Seed phrase warnings; no screenshots of secrets where the platform allows; fake-app warnings; clear difference between the claim fee and a transfer fee.

## 9. Open

Exact swipe zone size, haptics and animation, Bangla and other languages, screen designs (none exist for this layout), the fate of the v1.2 screens (docs 02 and 03).
