# SAECOIN P2P Network Architecture

> **Status: DOCUMENTATION ONLY (direction of 2026-11-09).** Nothing here is implemented, tested or production-ready. Labels: **CONFIRMED** = stated by the owner; **PROPOSED** = engineering proposal awaiting approval; **OPEN** = needs research, security review or an owner decision. Registry: [decisions/DECISION_RECORD.md](../decisions/DECISION_RECORD.md). The v1.2 documents (00 to 12) remain the recorded baseline and are not rewritten.

All content is PROPOSED. C-02 requires a P2P network and no single server whose loss stops the network.

## 1. Functions (from the owner's list)

Node discovery, peer connection, transaction propagation, block propagation, synchronization, peer validation, network health monitoring.

## 2. Discovery

| Mechanism | Note |
| --- | --- |
| Built-in seed list of several independent operators | Central point if there are few. Several, run by different people |
| Peer exchange | Nodes share addresses of peers they know |
| Saved peers | Reconnect without seeds |
| Manual peers | A user may add a node |

## 3. Messages

Version and handshake; announce transaction or block by hash; request by hash; headers first; blocks; transactions; peer lists; ping. Format not decided.

## 4. Synchronization

Download headers, check proof of work, then fetch blocks and validate every rule. Light nodes fetch headers and proofs only.

## 5. Peer validation and abuse control

Invalid data earns a score penalty and a temporary ban. Limits on message size and rate. Free relay of valid data only.

## 6. Attacks to design against

Eclipse attacks (all peers belong to one attacker): connect to diverse peers, keep some persistent, limit peers from one network range. Flooding. Fake peers. See THREAT_MODEL.

## 7. Transport security

Encrypted transport between peers is desirable so a network observer cannot tamper with or easily profile traffic. Peer identity is not trusted by default. Choice not made.

## 8. Mobile

Phones are often behind NAT and change networks. Light clients make outgoing connections only. They do not carry the network.

## 9. Network health

Peer count, height compared to peers, last block age, bans. Shown in the wallet. Public statistics in the explorer must come from data and not decide anything.
