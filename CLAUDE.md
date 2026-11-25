# SAECOIN — rules for working in this repo

Status: design phase. **Documentation only. Do not write implementation code** unless the owner explicitly approves a phase in `docs/06-roadmap.md`.

## Spec precedence

1. `docs/00-decision-record.md` wins over every other document.
2. Only **DECIDED** and **CARRIED** items may be treated as final. **PROPOSED** and **OPEN** items must not be implemented as final; ask the owner first.
3. Do not change a DECIDED item without the owner's explicit approval, and do not add central servers, admin keys, or reward programs that control balances (D-01, D-05).

## Numbers

- Max supply 21,000,000 SAC = 2,100,000,000,000,000 units (1 SAC = 100,000,000 units).
- Mining 18,900,000 SAC; founder reserve 2,100,000 SAC; reserve locked 2 years, then 5% per month (20 releases).
- Block time 10 minutes; halving every 210,000 blocks; initial subsidy 45 SAC (D-09). The mining algorithm must let phones and laptops mine (D-10); do not pick SHA-256d, and do not choose a specific algorithm until the owner approves it (O-01).
- If you change any figure, update `docs/00`, `docs/01`, and `README.md` together, and re-verify the arithmetic by running it.

## Coding rules (for when code is approved)

- Money is an integer in units of 10^-8 SAC. Never use floating point for amounts.
- Consensus code is deterministic. Avoid any dependence on wall-clock time, locale, or unordered iteration.
- No admin keys, backdoors, hidden premine, or any path that bypasses a timelock.
- Change as little consensus logic as possible relative to the codebase being forked.
- Do not write custom cryptography.

## Safety

- Never commit secrets: keys, seeds, recovery phrases, `.env` files. See `.gitignore`.
- Never push to `main` without the owner's approval. Work on a branch.
- Do not make claims about price, returns, or listings in any text.
- Not legal advice: the owner must obtain legal review before launch.
