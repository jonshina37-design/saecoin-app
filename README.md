# SAECOIN (SAC)

An independent, decentralized Proof-of-Work cryptocurrency, started from zero in the way Bitcoin was. No central authority, no founder control over the network.

**Status: design phase. Documentation only — no code yet.**

## At a glance

| Item | Value | Status |
| --- | --- | --- |
| Maximum supply | 21,000,000 SAC | Decided |
| Mining (block subsidy) | 18,900,000 SAC (90%) | Decided amount; mechanism proposed |
| Founder reserve | 2,100,000 SAC (10%) | Decided |
| Reserve lock | 2 years, then 5% per month (20 releases) | Decided |
| Precision | 8 decimals | Carried |
| Consensus | Proof-of-Work, UTXO | Carried; algorithm open |
| Block time / halving / initial subsidy | 10 min / 210,000 blocks / 45 SAC | Proposed |

"Proposed" means a recommendation awaiting the owner's confirmation. See the [Decision Record](docs/00-decision-record.md).

## Principles

1. **No authority.** Nobody, including the founder, can mint coins, change balances, or override the rules.
2. **Founder limits.** The founder holds only a disclosed 10% reserve, time-locked by protocol rules, with no extra privileges.
3. **Fair launch.** Open-source code, announced start, public genesis, disclosed reserve.
4. **Conservative engineering.** Reuse proven designs; change as little consensus code as possible.
5. **Honest communication.** No promises of price or returns; risks of a young chain are stated openly.

## Documentation

Start with [docs/README.md](docs/README.md). The decision record is [docs/00-decision-record.md](docs/00-decision-record.md).

## Related projects

SAECOIN AI (an AI API aggregation business) is a separate project and is independent of this blockchain.

## History

An earlier centralized design (31M supply, virtual mining sessions, referrals, TypeScript reward engine) was replaced on 2026-11-21. It remains available in the Git history of the `main` branch.

## Disclaimer

SAC has no guaranteed market value, exchange listing, financial return, or redemption. Nothing in this repository is financial or legal advice. Legal review is required before any public launch.

## License

To be decided (open question O-13).
