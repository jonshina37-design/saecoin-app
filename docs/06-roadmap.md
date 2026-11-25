# 06 — Roadmap

Gated by evidence, not by dates. Move to the next phase only when the exit criteria are met. Nothing past Phase 0 starts without the owner's approval.

## Phase 0 — Design freeze (documentation only, no code)

Cost: time only.

- All proposals so far are confirmed (doc 00); only OPEN items remain.
- Choose the PoW algorithm (O-01) by benchmarking candidates on a low-end phone and a laptop against the D-10 requirement, and choose the difficulty algorithm (O-02).
- Write a short whitepaper from docs 00–02.

Exit: no OPEN items remain that block consensus; the supply invariants are written as tests.

## Phase 1 — Reference implementation and private testnet

- Build the node from the chosen codebase with minimal consensus changes.
- Implement genesis, subsidy, halving, and the 20 timelocked reserve outputs.
- Unit and property tests for the invariants in doc 02, section 8.
- Run a small private testnet.

Exit: the issuance and timelock tests pass; a multi-node testnet runs for several weeks without consensus failures.

## Phase 2 — Public testnet and community

- Publish code, docs, and the testnet; invite reviewers and early miners.
- Release a basic wallet and the desktop miner for the testnet.
- Simulate hashrate shocks to test difficulty adjustment.

Checkpoint (suggested): about 6 months after the public testnet opens, check honestly: are people outside the founder running nodes and finding bugs? If not, reconsider the plan before spending more time.

## Phase 3 — Audit and legal

- Independent security review of consensus code and wallet key handling.
- Legal review for the owner's country and each target market.
- Decide the genesis time and announce it publicly well in advance.

## Phase 4 — Mainnet fair launch

- Announced start time, public code, disclosed reserve address and schedule.
- Founder does not mine a dominant share of early blocks.
- Community seed nodes are published.

## Phase 5 — Ecosystem (separate projects)

Explorer, wallets, tools, and any business built on top of the network. These do not control the protocol and may be built by anyone.
