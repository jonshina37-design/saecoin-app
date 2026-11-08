import { calculateSession, type SessionInput, type SessionResult, type Transfer, type AccountId } from "./session.js";
import { FOUNDER_ACCOUNT, GENESIS_BALANCES } from "./genesis.js";
import { TOTAL_SUPPLY_UNITS, type Units } from "./units.js";

/** Immutable account balances. Every operation returns a new Ledger and never changes the old one. */
export class Ledger {
  private constructor(private readonly balances: ReadonlyMap<AccountId, Units>) {}

  /** Spec 3.3: the four opening balances of Block 0. */
  static genesis(): Ledger {
    return new Ledger(new Map(Object.entries(GENESIS_BALANCES))).assertInvariants();
  }

  balance(account: AccountId): Units {
    return this.balances.get(account) ?? 0n;
  }

  total(): Units {
    let sum = 0n;
    for (const v of this.balances.values()) sum += v;
    return sum;
  }

  accounts(): [AccountId, Units][] {
    return [...this.balances.entries()].sort(([a], [b]) => (a < b ? -1 : 1));
  }

  /** Spec 3.2: total is always 31,000,000 SAC and no balance is negative. */
  assertInvariants(): this {
    for (const [id, v] of this.balances) {
      if (v < 0n) throw new Error(`invariant broken: negative balance on ${id}`);
    }
    if (this.total() !== TOTAL_SUPPLY_UNITS) throw new Error("invariant broken: total supply changed");
    return this;
  }

  /**
   * Applies all transfers or none. Fails (and leaves this ledger unchanged) on a non-positive
   * amount, an unknown source account, or if any source would go below zero.
   */
  apply(transfers: readonly Transfer[]): Ledger {
    const next = new Map(this.balances);
    for (const t of transfers) {
      if (t.units <= 0n) throw new RangeError(`transfer amount must be positive (${t.type} ${t.from} -> ${t.to})`);
      if (t.from === t.to) throw new Error(`transfer to the same account: ${t.from}`);
      if (!next.has(t.from)) throw new Error(`unknown source account ${t.from}`);
      const from = next.get(t.from)! - t.units;
      if (from < 0n) throw new Error(`insufficient funds in ${t.from}`);
      next.set(t.from, from);
      next.set(t.to, (next.get(t.to) ?? 0n) + t.units);
    }
    return new Ledger(next).assertInvariants();
  }
}

/**
 * Spec 8.3 order for one session close: validate the input, calculate, then apply all
 * transfers atomically. Signing and publishing the block happen after this and are not here.
 */
export function closeSession(ledger: Ledger, input: SessionInput): { ledger: Ledger; result: SessionResult } {
  const result = calculateSession(input); // validates ids (duplicates throw)
  return { ledger: ledger.apply(result.transfers), result };
}

export { FOUNDER_ACCOUNT };
