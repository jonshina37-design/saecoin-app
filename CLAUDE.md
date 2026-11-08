# SAECOIN — rules for coding

Status: planning stage. The specs in `docs/` are the source of truth.

## Spec precedence
1. `docs/00-Spec-v1.2-Decision-Record.md` (DECIDED items) wins over docs 01–12.
2. PROPOSED / OPEN items must not be implemented as final; ask the owner first.

## Coding rules
- TypeScript everywhere (strict mode).
- SAC amounts are integers in units of 10^-8 SAC (1 SAC = 100,000,000 units). Never use floats for money. Use int64/BigInt-safe types.
- Every SAC lives in exactly one account; a reward is a transfer between accounts. No negative balances. The sum of all accounts is always 31,000,000 SAC (3.1×10^15 units).
- The reward engine is a pure function (inputs → transfers), with no I/O, so it can be unit tested against the worked examples in the decision record.
- Session close order: validate activations → calculate rewards → atomic ledger + balance transfer → sign and publish block.
- Leftovers and dust go to TASK_POOL as SESSION_LEFTOVER; never carry over to the next session's pool.
- Founder allocation (12M) is locked 12 months from Genesis Block 0, then 1,000,000 SAC per month for 12 months (D-11), via `FOUNDER_RELEASE` ledger transfers only.
- Supported countries are config, not hard-coded: every country has its own on/off switch by phone country code, changeable without a release (all enabled by default, per D-09; sanctioned-country default is O-16, ask the owner). Users must be 18+.
- The backend is the only authority; the client never decides rewards.
- Public wording: "verifiable public ledger", not "blockchain".

## Safety
- Never commit secrets (.env, keys, tokens). See `.gitignore`.
- Not legal advice: the owner must get legal review before launch.
