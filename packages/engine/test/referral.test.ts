import { test } from "node:test";
import assert from "node:assert/strict";
import { eligibleReferralSet, type Participant } from "../src/index.js";

const ok: Participant = { valid: true, success: true };
const noSuccess: Participant = { valid: true, success: false };
const invalid: Participant = { valid: false, success: true };
const map = (o: Record<string, Participant>) => new Map(Object.entries(o));

test("group with referrer and 3 active referrals qualifies; all 4 join E", () => {
  const p = map({ R: ok, a: ok, b: ok, c: ok });
  assert.deepEqual(eligibleReferralSet(p, [{ referrerId: "R", referralIds: ["a", "b", "c"] }]), ["R", "a", "b", "c"]);
});

test("only 2 active referrals: group does not qualify", () => {
  const p = map({ R: ok, a: ok, b: ok, c: noSuccess });
  assert.deepEqual(eligibleReferralSet(p, [{ referrerId: "R", referralIds: ["a", "b", "c"] }]), []);
});

test("invalid (not VALID) referrals do not count toward the 3", () => {
  const p = map({ R: ok, a: ok, b: ok, c: invalid });
  assert.deepEqual(eligibleReferralSet(p, [{ referrerId: "R", referralIds: ["a", "b", "c"] }]), []);
});

test("referrer without success: group does not qualify", () => {
  const p = map({ R: noSuccess, a: ok, b: ok, c: ok });
  assert.deepEqual(eligibleReferralSet(p, [{ referrerId: "R", referralIds: ["a", "b", "c"] }]), []);
});

test("inactive member of a qualifying group does not join E", () => {
  const p = map({ R: ok, a: ok, b: ok, c: ok, d: noSuccess });
  assert.deepEqual(eligibleReferralSet(p, [{ referrerId: "R", referralIds: ["a", "b", "c", "d"] }]), ["R", "a", "b", "c"]);
});

test("user in two qualifying groups is counted once", () => {
  const p = map({ R1: ok, R2: ok, a: ok, b: ok, c: ok, d: ok, e: ok });
  // R2 is a referral of R1 and also a referrer of its own group
  const groups = [
    { referrerId: "R1", referralIds: ["R2", "a", "b"] },
    { referrerId: "R2", referralIds: ["c", "d", "e"] },
  ];
  assert.deepEqual(eligibleReferralSet(p, groups), ["R1", "R2", "a", "b", "c", "d", "e"]);
});

test("failing parent group does not disqualify a child group", () => {
  const p = map({ R1: ok, R2: ok, a: noSuccess, b: noSuccess, c: ok, d: ok, e: ok });
  const groups = [
    { referrerId: "R1", referralIds: ["R2", "a", "b"] }, // only R2 active: fails
    { referrerId: "R2", referralIds: ["c", "d", "e"] }, // qualifies
  ];
  assert.deepEqual(eligibleReferralSet(p, groups), ["R2", "c", "d", "e"]);
});

test("more than 10 direct referrals is rejected", () => {
  const ids = Array.from({ length: 11 }, (_, i) => `u${i}`);
  assert.throws(() => eligibleReferralSet(new Map(), [{ referrerId: "R", referralIds: ids }]), RangeError);
});
