# 07 — Open Questions

Nothing here may be implemented as final. Items marked **blocking** must be settled before any consensus code is written.

| ID | Question | Options / notes | Blocking |
| --- | --- | --- | :---: |
| O-01 | Final PoW algorithm | Must satisfy D-10 (phones and laptops). Evaluate against the criteria in doc 02 section 3 and the research note in doc 08; benchmark on a low-end phone and a laptop | Yes |
| O-02 | Difficulty adjustment algorithm | Per-block or short-window rolling average, simulated against hashrate swings | Yes |
| O-03 | Block size / weight limit | Keep conservative | Yes |
| O-04 | Fee policy and minimum relay fee | Fees go to the miner | No |
| O-05 | Coinbase maturity | 100 blocks as in Bitcoin, or shorter | No |
| O-06 | How reserve outputs are created at genesis | Bitcoin Core's genesis coinbase is unspendable. Proposal P-13: a consensus rule at block 1; full design in doc 09 | Yes |
| O-07 | Signature scheme and address format | Conservative default: Bitcoin-style on secp256k1 | Yes |
| O-08 | Network identity | Magic bytes, ports, address prefixes, seed nodes | No |
| O-09 | Codebase to fork | Lean: Bitcoin Core fork (see doc 08 section 3); avoid from-scratch | Yes |
| O-10 | *Resolved* — owner confirmation of proposals | P-01 to P-11 were confirmed on 2026-11-21: now D-08 to D-17 in doc 00 | No |
| O-11 | Genesis timestamp and launch date | Announce well in advance | No |
| O-12 | Legal handling of 18+ and country switches | Likely not enforceable at protocol level; legal advice needed | No |
| O-13 | Open-source license | MIT / Apache-2.0 / other; decide before publishing code | No |
| O-14 | Ticker and name confirmation | SAC is "provisional" in earlier drafts; check for conflicts | No |
| O-15 | Reserve custody setup | Multisig threshold, hardware wallets, backup locations | No |
| O-16 | Whether to disclose the reserve schedule in the whitepaper | Strongly recommended | No |
| O-17 | Mobile mining distribution and platform limits | D-17: store version wallet-only, mining build outside stores; verify current Google Play and App Store policies; iOS background mining may be impossible | No |
| O-18 | What counts as a "phone" for D-10 (minimum RAM, CPU, age) | Options and recommendation in doc 08 section 5; decides the algorithm shortlist. Proposed answer: P-12 (mid-range and up, about 6 GB RAM) | Yes |
| O-19 | First reserve lock height | 103,680 (24 x 30 days = 720 days) or 105,120 (730 days); see doc 09 section 3 | No |
| O-20 | Genesis mechanism after the codebase choice | Block-1 consensus rule (P-13) vs modified genesis handling; see doc 09 section 2 | Yes |
