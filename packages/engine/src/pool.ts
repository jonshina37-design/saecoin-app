import { type Units, sac } from "./units.js";

/** Spec section 4.1: each effective session consumes these amounts from the two pools. */
export const REGULAR_CEILING: Units = sac(6000);
export const REFERRAL_CEILING: Units = sac(2000);

/** Spec D-01 and D-02: per-user caps. */
export const REGULAR_CAP: Units = sac(10);
export const REFERRAL_CAP: Units = sac(3);

export interface PoolResult {
  participants: number;
  perUser: Units;
  paid: Units;
  leftover: Units;
}

/**
 * Spec 4.2 / 4.3:
 *   per_user = min(cap, floor(ceiling / n)); paid = per_user * n; leftover = ceiling - paid
 * Integer maths only. n = 0 pays nothing and the whole ceiling is leftover.
 */
export function splitPool(ceiling: Units, cap: Units, participants: number): PoolResult {
  if (!Number.isSafeInteger(participants) || participants < 0) {
    throw new RangeError(`participants must be a non-negative integer, got ${participants}`);
  }
  if (participants === 0) {
    return { participants, perUser: 0n, paid: 0n, leftover: ceiling };
  }
  const n = BigInt(participants);
  const share = ceiling / n; // bigint division floors for positive values
  const perUser = share < cap ? share : cap;
  const paid = perUser * n;
  return { participants, perUser, paid, leftover: ceiling - paid };
}

export const calculateRegular = (n: number): PoolResult => splitPool(REGULAR_CEILING, REGULAR_CAP, n);
export const calculateReferral = (n: number): PoolResult => splitPool(REFERRAL_CEILING, REFERRAL_CAP, n);
