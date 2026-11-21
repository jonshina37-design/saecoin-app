# 07 — Open Questions

Nothing here may be implemented as final. Items marked **blocking** must be settled before any consensus code is written.

| ID | Question | Options / notes | Blocking |
| --- | --- | --- | :---: |
| O-01 | Final PoW algorithm | CPU-friendly (recommended, P-04) vs SHA-256d; check licensing and maturity | Yes |
| O-02 | Difficulty adjustment algorithm | Per-block or short-window rolling average, simulated against hashrate swings | Yes |
| O-03 | Block size / weight limit | Keep conservative | Yes |
| O-04 | Fee policy and minimum relay fee | Fees go to the miner | No |
| O-05 | Coinbase maturity | 100 blocks as in Bitcoin, or shorter | No |
| O-06 | How reserve outputs are created at genesis | Bitcoin Core's genesis coinbase is unspendable; use block 1 or a modified genesis | Yes |
| O-07 | Signature scheme and address format | Conservative default: Bitcoin-style on secp256k1 | Yes |
| O-08 | Network identity | Magic bytes, ports, address prefixes, seed nodes | No |
| O-09 | Codebase to fork | Bitcoin Core or a smaller derivative; avoid from-scratch | Yes |
| O-10 | Confirm P-01 to P-09 | See doc 00 | Yes |
| O-11 | Genesis timestamp and launch date | Announce well in advance | No |
| O-12 | Legal handling of 18+ and country switches | Likely not enforceable at protocol level; legal advice needed | No |
| O-13 | Open-source license | MIT / Apache-2.0 / other; decide before publishing code | No |
| O-14 | Ticker and name confirmation | SAC is "provisional" in earlier drafts; check for conflicts | No |
| O-15 | Reserve custody setup | Multisig threshold, hardware wallets, backup locations | No |
| O-16 | Whether to disclose the reserve schedule in the whitepaper | Strongly recommended | No |
