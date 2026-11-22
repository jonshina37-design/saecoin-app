# 08 — Codebase and Algorithm Evaluation

Status: research note, **not a decision**. It supports O-01 (algorithm), O-02 (difficulty), O-09 (codebase) and the D-10 / D-16 requirements. Prepared 2026-11-21 from public sources. I have not benchmarked anything myself, and several sources are project blogs or vendor pages; figures are marked accordingly.

## 1. Summary

| Question | Current lean | Confidence |
| --- | --- | --- |
| Codebase (O-09) | Fork **Bitcoin Core**, keep the transparent UTXO model, replace the PoW check | Medium-high. At least one live project did exactly this (self-reported). |
| Algorithm (O-01) | Benchmark **RandomX** against **yespower** on real devices before choosing. Lean RandomX only if the minimum phone class you define can actually run it. | Medium. Real phone mining of RandomX is documented; budget phones are a problem. |
| Difficulty (O-02) | A **per-block** algorithm (ASERT or LWMA), not Bitcoin's 2016-block retarget | Medium-high. |
| Custom or hybrid PoW | **Do not** | High. Unaudited cryptography is the biggest consensus risk. |

The one decision only you can make: **what counts as a "phone" under D-10** (see section 5). Everything else follows from it.

## 2. Algorithm candidates

| | RandomX | yespower | SHA-256d |
| --- | --- | --- | --- |
| Design target | General-purpose CPUs; GPU-unfriendly by design | "CPU-friendly, GPU-unfriendly, FPGA/ASIC-neutral" (its own page) | ASICs |
| Memory | Light mode (verification) up to **256 MiB**; fast mode (fast mining) **2080 MiB** | Not stated on the page I could read; parameter dependent | Negligible |
| Verification cost | About **14.8 ms per hash** in light mode on a Ryzen 7 1700 core (design doc) | Not found | Negligible |
| ASIC resistance | Strong claim, not quantified; FPGAs not analyzed (Trail of Bits) | Its own page says ASICs "will likely beat CPUs", though by less than for Bitcoin or Litecoin | None |
| Phone evidence | Documented: flagship phones roughly 400–750 H/s vs about 5,000–6,000 H/s on a desktop Ryzen 5 5600 (Kryptex, a mining-pool vendor); budget phones about 250–300 H/s | A mobile-mining project (Scala) says yespower is about 17% more efficient on ARM than yescrypt; this is the project's own claim; I found no phone benchmarks | None |
| Audits | Trail of Bits reviewed it for Arweave (2019): 2 low-severity and 1 informational finding; more audits planned | Not found | Mature |
| Main risks | 47 configurable parameters; unverified VM semantics can split chains if re-implemented; JIT complexity | Thinner phone evidence; weaker ASIC resistance | Fails D-10 |
| Verdict for SAC | **Strong candidate**, if the phone floor allows it | **Fallback candidate** if budget phones must be supported | **Excluded** |

### What the phone numbers mean

- A flagship phone is **roughly 10x slower** than a decent desktop on RandomX. Expect laptops to earn far more than phones.
- Phones throttle: hashrate commonly drops **20–40%** after 10–15 minutes of sustained load (Kryptex). Mine while charging.
- Kryptex lists **6+ GB RAM** and a 64-bit ARM phone from about 2016 or later as requirements for its RandomX mining. That implies many **budget phones with 2–4 GB are marginal or unsuitable**. This matters because earlier notes target Bangladesh, India, Pakistan, and Nepal, where budget phones are common.
- iPhones are not supported (iOS blocks sustained background CPU load).
- Earnings at Monero's scale were quoted at roughly $0.5–1 per month for a phone. SAC is a different network with an unknown value, so treat this only as a reminder that **phone mining is a participation feature, not income**.

### Verification time (my estimate, not from a source)

At about 14.8 ms per light-mode hash on one desktop core, verifying 210,000 headers (about 4 years of 10-minute blocks) takes about 52 minutes. Phones will be slower. Only full nodes need to do this, and wallets can rely on a node, but it argues for checkpoints or assumed-valid snapshots for fast initial sync, and for keeping phone nodes optional.

## 3. Codebase options (O-09)

| Option | Pros | Cons |
| --- | --- | --- |
| **Bitcoin Core fork** (lean) | Most reviewed codebase; transparent UTXO (C-02); timelocks available; a public example exists | Changing PoW touches many places. The Brisvia write-up says RandomX needed changes across block creation, header validation, initial sync, P2P header handling, mining, difficulty, and reorg handling, plus a deterministic seed schedule by block height |
| Monero codebase | RandomX is native | Privacy-by-default design differs from the transparent UTXO model in C-02 (as far as I know); likely heavier legal and listing implications. Not recommended |
| Litecoin or Dogecoin fork | Simpler than Bitcoin Core in places | No advantage for this algorithm requirement; same PoW-swap work |
| From scratch | Full control | Highest consensus-bug risk for a solo developer. Not recommended |

Evidence that Bitcoin Core plus RandomX works: Brisvia (a fair-launch, CPU-mineable network built on Bitcoin Core v30.2 with RandomX) describes the approach, keeps the 80-byte header, and publishes its testing scope. This is a self-reported project write-up that I have not verified, and the project's maturity is unknown. Treat it as a design reference to study, not proof.

Rule for SAC: **reuse the reference RandomX implementation as is.** Trail of Bits warned that a clean-room re-implementation that differs from the reference could split the chain.

## 4. Difficulty adjustment (O-02)

- Bitcoin's 2016-block retarget is too slow for a young chain with volatile hashrate.
- Per-block algorithms such as **ASERT** (used by Brisvia, per its write-up) and **LWMA** (widely used among small CPU-mined coins) respond smoothly. Either needs a reference implementation and a simulation against sudden hashrate swings before mainnet.
- **Initial difficulty is the hardest part**: no algorithm can correct the first blocks. Set it conservatively and plan for a quick adjustment period at launch.

## 5. The question only you can answer: what is a "phone"?

D-10 says phones and laptops must be able to mine. Define the **minimum phone**:

| Option | Meaning | Likely algorithm |
| --- | --- | --- |
| A. Mid-range and up (about 6 GB RAM, 64-bit ARM, last 5–6 years) | Most modern Android phones | RandomX (fast mode) is realistic |
| B. Budget phones too (about 3–4 GB RAM) | Reaches more of the target markets | Needs a lighter algorithm (yespower-class) or RandomX light mode with very low speed; benchmark needed |
| C. Any phone | Not realistic with any serious PoW | Not recommended |

My recommendation: **choose A** for the mining requirement and make **every phone a full wallet user** regardless. Budget-phone owners still take part through the wallet, and they can mine if their device qualifies. Say this openly so that "phones can mine" is not misread as "every phone earns."

## 6. Benchmark plan (before any algorithm is frozen)

Devices (at least): one budget phone (3–4 GB), one mid-range phone (6 GB), one flagship phone, one low-end laptop (8 GB), one mid laptop.

Measure for each algorithm and mode:

1. Sustained hashrate over 30 minutes, and the drop after throttling.
2. Peak RAM, and any out-of-memory crashes.
3. Surface temperature and battery drain per hour while charging and not charging.
4. Light-mode verification time per hash.
5. Phone-to-laptop speed ratio.
6. ARM64 build stability using the reference implementation.

Acceptance criteria (proposed; the owner decides): the chosen minimum phone class sustains mining for 30 minutes without crash or unsafe temperature, and verification is cheap enough for optional phone nodes.

Decision rule: if the minimum phone class in section 5 passes with RandomX, choose RandomX. If not, evaluate yespower or a smaller RandomX-class configuration, accepting weaker ASIC resistance, and have the owner accept that trade-off explicitly.

## 7. Risks to state publicly

- A young CPU chain can still be attacked with rented cloud CPUs or botnets. Reduce the risk with per-block difficulty, high confirmation counts, and monitoring; it cannot be removed.
- ASIC or FPGA development for any CPU algorithm remains possible if the chain gains value.
- Re-implementing RandomX or changing its parameters without expert review can fork the chain.

## Sources

- [RandomX design document](https://raw.githubusercontent.com/tevador/RandomX/master/doc/design.md)
- [Trail of Bits — State of the art proof-of-work: RandomX](https://blog.trailofbits.com/2019/07/02/state/)
- [Openwall — yespower](https://openwall.com/yespower/)
- [Kryptex — Mining on phones: hashrate, earnings, FAQ](https://pool.kryptex.com/ms/articles/phone-mining-hashrate-en)
- [Scala — Mobile mining: the whys and hows](https://scala.network/blog/mobile-mining-the-whys-and-hows)
- [Brisvia — fair-launch CPU-mineable PoW network with Bitcoin Core and RandomX](https://dev.to/brisvia/building-brisvia-a-fair-launch-cpu-mineable-pow-network-with-bitcoin-core-and-randomx-5ad4)
