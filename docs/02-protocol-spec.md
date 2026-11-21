# 02 — Protocol Specification (draft)

Status: design draft. Only items tagged DECIDED/CARRIED are fixed. Everything else is PROPOSED or OPEN and must not be implemented as final.

## 1. Goals

1. Permissionless: anyone can run a full node, mine, and validate.
2. No authority: no founder key, no admin override, no central server that decides balances.
3. Simple and conservative: reuse proven Bitcoin-style design where possible.
4. Accessible mining: ordinary computers can take part (P-04).

## 2. Data model

- UTXO model (C-02).
- Amounts are unsigned 64-bit integers in units of 10^-8 SAC (C-01). Floating point is never used for amounts.
- Maximum amount accepted in any output: 2,100,000,000,000,000 units.

## 3. Consensus

| Item | Value | Tag |
| --- | --- | --- |
| Consensus | Proof-of-Work, longest (most-work) chain | CARRIED (C-03) |
| Algorithm | CPU-friendly (RandomX-class) recommended; SHA-256d is the fallback | PROPOSED (P-04), OPEN (O-01) |
| Target block time | 10 minutes | PROPOSED (P-02) |
| Difficulty adjustment | Must react quickly to hashrate swings (see below) | OPEN (O-02) |
| Block subsidy | 45 SAC, halving every 210,000 blocks | PROPOSED (P-03) |
| Coinbase maturity | 100 blocks (as in Bitcoin) | OPEN (O-05) |
| Block size / weight | To be set | OPEN (O-03) |

### Algorithm choice: the trade-off

| | SHA-256d | CPU-friendly (RandomX-class) |
| --- | --- | --- |
| Reuse of Bitcoin Core code | Easiest | More work to integrate |
| ASIC dominance | Yes | Resists ASICs |
| 51% risk for a small new chain | High — hashpower can be rented | Lower — rented hashpower is scarcer, but botnets and cloud CPUs are a risk |
| Fit with "ordinary people can mine" | Poor | Good on PCs; phones are weak and drain the battery |
| Maturity | Very high | Mature in other projects, but its memory needs (about 2 GB) exclude many cheap devices |

Recommendation: CPU-friendly. Final choice requires the owner's confirmation.

### Difficulty adjustment

Bitcoin retargets every 2,016 blocks (about 2 weeks). On a brand-new chain whose hashrate can change by 100x overnight, that is dangerous: a drop in hashrate can stall the chain for weeks. A young chain should retarget every block or every few blocks with a proven rolling-window algorithm. Selecting and reviewing the algorithm is an open item (O-02) and a security-critical design task.

## 4. Genesis

1. A fixed genesis block defines the network.
2. The 20 height-locked reserve outputs (see doc 01) are created at launch. Note: in Bitcoin Core the genesis coinbase output is not spendable, so the reserve outputs must be created in a way the chosen codebase supports (for example, consensus-validated outputs in block 1, or a modified genesis). This is a design task (O-06).
3. The genesis timestamp, message, reserve address and all parameters are published before the network starts.

## 5. Transactions and addresses

- Standard transfers, signature scheme, and address format are OPEN (O-07). Using the well-tested Bitcoin-style scheme (ECDSA/Schnorr on secp256k1) is the conservative default.
- Height timelocks (CLTV-style) are required for the reserve schedule.

## 6. Network protocol

- Peer-to-peer gossip of transactions and blocks, as in Bitcoin.
- A unique network identifier (magic bytes, default ports) so SAC nodes never talk to other chains. OPEN (O-08).

## 7. Implementation approach (OPEN, O-09)

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
