# 05 — Security and Legal

This is not legal advice. The owner must get legal review in each relevant country before any public launch.

## 1. Security risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Consensus bug (inflation, chain split) | Fatal to trust | Change as little consensus code as possible; independent review; long public testnet |
| 51% attack on a young chain | Double spends, reorgs | Algorithm choice under D-10 (O-01), fast difficulty algorithm, high confirmation counts |
| Difficulty-adjustment failure | Chain stalls or floods | Use a proven algorithm; simulate hashrate shocks before mainnet |
| Lost reserve keys | Reserve unrecoverable | Multisig / hardware wallet, documented backup (D-13) |
| Stolen reserve keys | Large early sell-off, loss of trust | Multisig; keys in separate places; never on an internet-connected machine |
| Supply-chain attack on releases | Malicious wallet or miner | Reproducible builds, signed releases, published hashes |
| Wallet bugs (key generation, backup) | User fund loss | Use audited libraries; do not write custom cryptography |
| Phishing and fake apps | User fund loss | Single official domain and repo; signed releases |
| Timelock bypass | Breaks D-04 | Protocol test that no path spends a reserve output before its height |

Never commit secrets, keys, or recovery phrases to the repository.

## 2. Legal and regulatory

| Topic | Concern |
| --- | --- |
| Securities law | Selling SAC, promising returns, or marketing it as an investment can bring securities-law exposure. Decision D-14: the founder does not sell SAC. |
| Founder prominence | A 10% reserve and a leading promotional role mean authorities may treat the founder as the key person even without technical control (D-05). |
| Country restrictions | Crypto status differs by country and changes over time. Earlier notes target Bangladesh, India, Pakistan, and Nepal as focus markets. I cannot confirm their current rules; obtain local legal advice for each. |
| Tax | Mining income and reserve releases may be taxable for the owner and for users. |
| Sanctions | The owner should understand sanctions rules; country restrictions in the app need legal framing (O-12). |
| App-store rules | Store distribution must follow each store's crypto and mining policies (see doc 04). |
| Cryptojacking | Mining on users' phones without clear, informed consent is harmful and may be illegal. The miner must be opt-in and visible (doc 04). |
| Consumer claims | No statement about price, returns, listing, or redemption. |

## 3. Required public wording

- "SAC has no guaranteed value, market, listing, or return."
- "The founder holds a disclosed reserve of 10%, locked for 2 years and then released 5% per month by protocol rule."
- Never describe the network as "secure" or "unhackable". Describe the risks of a young chain openly.

## 4. Pre-launch gates (all must pass)

1. Every PROPOSED and OPEN item that affects consensus is resolved by an owner decision.
2. Open-source review of consensus code by at least one person other than the author.
3. Public testnet run long enough to exercise hashrate swings and reorgs.
4. Timelock and issuance invariants verified by tests (doc 02, section 8).
5. Legal review for the owner's country and each target market.
