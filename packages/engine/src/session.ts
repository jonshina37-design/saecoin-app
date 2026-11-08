import { calculateReferral, calculateRegular, type PoolResult } from "./pool.js";
import type { Units } from "./units.js";

export type AccountId = string; // "REGULAR_POOL" | "REFERRAL_POOL" | "TASK_POOL" | "FOUNDER" | `USER:<id>`
export const REGULAR_POOL = "REGULAR_POOL";
export const REFERRAL_POOL = "REFERRAL_POOL";
export const TASK_POOL = "TASK_POOL";
export const userAccount = (userId: string): AccountId => `USER:${userId}`;

/**
 * Ledger types. SESSION_LEFTOVER comes from spec section 5. REGULAR_REWARD and REFERRAL_REWARD
 * are working names for the two session reward types and must be aligned with document 07.
 */
export type TransferType = "REGULAR_REWARD" | "REFERRAL_REWARD" | "SESSION_LEFTOVER";

export interface Transfer {
  type: TransferType;
  from: AccountId;
  to: AccountId;
  units: Units;
}

export interface SessionInput {
  /** Users with a validated SUCCESS result and Regular Mining eligibility. */
  regularUserIds: readonly string[];
  /** The set E from eligibleReferralSet(). */
  referralUserIds: readonly string[];
}

export interface SessionResult {
  regular: PoolResult;
  referral: PoolResult;
  /** Deterministic order: regular rewards, referral rewards, then leftovers. */
  transfers: Transfer[];
}

function assertDistinct(label: string, ids: readonly string[]): string[] {
  const sorted = [...ids].sort();
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i - 1]) throw new Error(`${label}: duplicate user id ${sorted[i]}`);
  }
  return sorted;
}

/** Pure function: no I/O, no clock, no randomness. Same input always gives the same transfers. */
export function calculateSession(input: SessionInput): SessionResult {
  const regularIds = assertDistinct("regularUserIds", input.regularUserIds);
  const referralIds = assertDistinct("referralUserIds", input.referralUserIds);

  const regular = calculateRegular(regularIds.length);
  const referral = calculateReferral(referralIds.length);

  const transfers: Transfer[] = [];
  if (regular.perUser > 0n) {
    for (const id of regularIds) {
      transfers.push({ type: "REGULAR_REWARD", from: REGULAR_POOL, to: userAccount(id), units: regular.perUser });
    }
  }
  if (referral.perUser > 0n) {
    for (const id of referralIds) {
      transfers.push({ type: "REFERRAL_REWARD", from: REFERRAL_POOL, to: userAccount(id), units: referral.perUser });
    }
  }
  if (regular.leftover > 0n) {
    transfers.push({ type: "SESSION_LEFTOVER", from: REGULAR_POOL, to: TASK_POOL, units: regular.leftover });
  }
  if (referral.leftover > 0n) {
    transfers.push({ type: "SESSION_LEFTOVER", from: REFERRAL_POOL, to: TASK_POOL, units: referral.leftover });
  }
  return { regular, referral, transfers };
}
