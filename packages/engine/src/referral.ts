/** Spec section 6.1 and 6.2. */
export const MAX_DIRECT_REFERRALS = 10;
export const MIN_QUALIFYING_REFERRALS = 3;

export interface Participant {
  /** Account status is VALID (verified phone etc., spec D-07 and section 7). */
  valid: boolean;
  /** Validated SUCCESS result in this session. */
  success: boolean;
}

export interface ReferralGroup {
  referrerId: string;
  /** Direct referrals of this referrer (at most 10). */
  referralIds: readonly string[];
}

/** Anyone who is VALID and has a SUCCESS result in the session. */
const active = (p: Participant | undefined): boolean => p !== undefined && p.valid && p.success;

/**
 * Returns the set E of distinct user ids eligible for the Referral Bonus.
 * A group qualifies when its referrer is active and at least 3 direct referrals are active.
 * Members of a qualifying group who are active join E; a user in several groups counts once.
 * A failing parent group does not disqualify a child group (each group is judged alone).
 */
export function eligibleReferralSet(
  participants: ReadonlyMap<string, Participant>,
  groups: readonly ReferralGroup[],
): string[] {
  const eligible = new Set<string>();
  for (const group of groups) {
    if (group.referralIds.length > MAX_DIRECT_REFERRALS) {
      throw new RangeError(
        `referrer ${group.referrerId} has ${group.referralIds.length} direct referrals, max is ${MAX_DIRECT_REFERRALS}`,
      );
    }
    if (!active(participants.get(group.referrerId))) continue;
    const activeReferrals = new Set(group.referralIds.filter((id) => active(participants.get(id))));
    if (activeReferrals.size < MIN_QUALIFYING_REFERRALS) continue;
    eligible.add(group.referrerId);
    for (const id of activeReferrals) eligible.add(id);
  }
  return [...eligible].sort();
}
