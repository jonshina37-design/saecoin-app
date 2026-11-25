# 02 — Protocol Specification (draft)

Status: design draft. Only items tagged DECIDED/CARRIED are fixed. Everything else is PROPOSED or OPEN and must not be implemented as final.

## 1. Goals

1. Permissionless: anyone can run a full node, mine, and validate.
2. No authority: no founder key, no admin override, no central server that decides balances.
3. Simple and conservative: reuse proven Bitcoin-style design where possible.
4. Accessible mining: ordinary phones and laptops can both take part (D-10).

## 2. Data model

- UTXO model (C-02).
- Amounts are unsigned 64-bit integers in units of 10^-8 SAC (C-01). Floating point is never used for amounts.
- Maximum amount accepted in any output: 2,100,000,000,000,000 units.

## 3. Consensus

| Item | Value | Tag |
| --- | --- | --- |
| Consensus | Proof-of-Work, longest (most-work) chain | CARRIED (C-03) |
| Algorithm | Must be minable on both phones and laptops; SHA-256d does not qualify. Specific algorithm not chosen | DECIDED requirement (D-10); OPEN choice (O-01) |
| Target block time | 10 minutes | DECIDED (D-09) |
| Difficulty adjustment | Must react quickly to hashrate swings (see below) | OPEN (O-02) |
| Block subsidy | 45 SAC, halving every 210,000 blocks | DECIDED (D-09) |
| Coinbase maturity | 100 blocks (as in Bitcoin) | OPEN (O-05) |
| Block size / weight | To be set | OPEN (O-03) |

### Algorithm: requirement and trade-offs

**Requirement (D-10):** both phones and laptops must be able to mine. SHA-256d is excluded: a phone cannot compete with ASICs, and a young SHA-256d chain is also easy to attack with rented hashpower.

The requirement creates a real tension that the owner should understand before choosing:

| Trade-off | Consequence |
| --- | --- |
| **Memory is the dial.** An algorithm that needs little memory runs on cheap phones, but is also cheaper to accelerate with GPUs, FPGAs, or ASICs. A memory-hungry algorithm resists those, but excludes low-end phones. | There is no perfect setting. The choice must be made deliberately and tested on real devices. |
| **Per-device speed differs.** A laptop will mine many times faster than a phone. | Phone miners will earn small amounts. This is normal for any CPU-oriented PoW; it should be stated openly to users. |
| **Heat and battery.** Sustained mining throttles and drains phones. | Client-side policy (not consensus): mine only while charging and cool, opt-in, visible to the user. |
| **Verification cost.** Every node must verify each block's proof of work. | An algorithm that is slow to verify makes phone nodes and light clients impractical. |
| **Rented and stolen CPUs.** Cloud CPUs and botnets can attack any CPU-oriented chain. | Reduce with a fast difficulty algorithm, high confirmation counts, and monitoring; cannot be eliminated. |

### Algorithm selection criteria (for O-01; see D-16)

An algorithm qualifies only if all of these are satisfied:

1. Audited, openly licensed implementations exist for **ARM64 and x86-64**.
2. Memory per hash is moderate and testable on a typical low-end phone (target to be set by benchmark, not guesswork).
3. Measured **phone-to-laptop speed ratio** is reasonable on real devices.
4. Block verification is cheap enough for phones and light clients.
5. It has a track record in other live networks and a known list of weaknesses.

Candidates to evaluate (no choice made; I have not benchmarked any of them, and their properties should be verified before use):

- Memory-moderate CPU algorithms in the Yespower and Argon2 families, which are generally designed for small to medium memory and ARM-friendly.
- RandomX-class algorithms: strong ASIC resistance, but good mining speed normally needs about 2 GB of memory, with a slower light mode of about 256 MB. That may exclude many phones and needs testing.

Decision (D-16): pick a moderate-memory, CPU-oriented algorithm that passes the criteria above, then confirm with a benchmark on at least one low-end phone and one laptop before freezing it.

### Difficulty adjustment

Bitcoin retargets every 2,016 blocks (about 2 weeks). On a brand-new chain whose hashrate can change by 100x overnight, that is dangerous: a drop in hashrate can stall the chain for weeks. A young chain should retarget every block or every few blocks with a proven rolling-window algorithm. Selecting and reviewing the algorithm is an open item (O-02) and a security-critical design task.

## 4. Genesis

1. A fixed genesis block defines the network.
2. The 20 height-locked reserve outputs (see doc 01) are created at launch. Note: in Bitcoin Core the genesis coinbase output is not spendable, so the reserve outputs must be created in a way the chosen codebase supports (for example, consensus-validated outputs in block 1, or a modified genesis). This is a design task (O-06).
3. The genesis timestamp, message, reserve address and all parameters are published before the network starts.

## 5. Transactions and addresses

- Signature scheme and address format are DECIDED (D-19): Bitcoin-style signatures on secp256k1 and segwit-style addresses; the address prefix is OPEN (O-08). Using the well-tested Bitcoin-style scheme (ECDSA/Schnorr on secp256k1) is the conservative default.
- Height timelocks (CLTV-style) are required for the reserve schedule.

## 6. Network protocol

- Peer-to-peer gossip of transactions and blocks, as in Bitcoin.
- A unique network identifier (magic bytes, default ports) so SAC nodes never talk to other chains. OPEN (O-08).

## 7. Implementation approach (DECIDED, D-18: Bitcoin Core fork)

| Option | Pros | Cons |
| --- | --- | --- |
| Fork Bitcoin Core | Most proven code, fastest to a working node | C++; easy to keep SHA-256d, harder to change PoW; inherits Bitcoin's complexity |
| Fork a smaller, simpler Bitcoin-derived codebase | Easier to read | Less audited |
| Write from scratch | Full control | Highest risk of consensus bugs; not recommended for a solo developer |

Recommendation: fork a proven codebase and change as little consensus logic as possible. Any consensus change needs review by someone other than the author.

## 8. Invariants (must always hold)

1. The sum of all unspent outputs never exceeds the cumulative issued supply.
2. Cumulative issuance never exceeds 18,900,000 SAC for mining plus 2,100,000 SAC for the reserve.
3. No rule lets any key bypass a timelock.
4. All consensus-relevant arithmetic is deterministic integer arithmetic.
