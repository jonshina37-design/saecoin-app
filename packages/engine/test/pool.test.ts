import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateReferral, calculateRegular, formatUnits, sac } from "../src/index.js";

// Worked examples from docs/00-Spec-v1.2-Decision-Record.md section 4.5
const regularCases: [number, string, string, string][] = [
  [100, "10.00000000", "1000.00000000", "5000.00000000"],
  [600, "10.00000000", "6000.00000000", "0.00000000"],
  [1000, "6.00000000", "6000.00000000", "0.00000000"],
  [70000, "0.08571428", "5999.99960000", "0.00040000"],
  [100000, "0.06000000", "6000.00000000", "0.00000000"],
];
for (const [n, perUser, paid, leftover] of regularCases) {
  test(`regular pool with ${n} users`, () => {
    const r = calculateRegular(n);
    assert.equal(formatUnits(r.perUser), perUser);
    assert.equal(formatUnits(r.paid), paid);
    assert.equal(formatUnits(r.leftover), leftover);
    assert.equal(r.paid + r.leftover, sac(6000));
  });
}

const referralCases: [number, string, string, string][] = [
  [100, "3.00000000", "300.00000000", "1700.00000000"],
  [1000, "2.00000000", "2000.00000000", "0.00000000"],
];
for (const [n, perUser, paid, leftover] of referralCases) {
  test(`referral pool with ${n} eligible users`, () => {
    const r = calculateReferral(n);
    assert.equal(formatUnits(r.perUser), perUser);
    assert.equal(formatUnits(r.paid), paid);
    assert.equal(formatUnits(r.leftover), leftover);
    assert.equal(r.paid + r.leftover, sac(2000));
  });
}

test("cap binds exactly above 600 regular users and at 667 referral users", () => {
  assert.equal(calculateRegular(600).perUser, sac(10));
  assert.ok(calculateRegular(601).perUser < sac(10));
  assert.ok(calculateReferral(666).perUser === sac(3));
  assert.ok(calculateReferral(667).perUser < sac(3));
});

test("zero participants: nothing paid, whole ceiling is leftover", () => {
  const r = calculateRegular(0);
  assert.equal(r.paid, 0n);
  assert.equal(r.leftover, sac(6000));
});

test("pool is never overspent for any participant count", () => {
  for (const n of [1, 2, 3, 7, 599, 601, 666, 667, 668, 12345, 999_999, 5_000_000]) {
    for (const r of [calculateRegular(n), calculateReferral(n)]) {
      assert.ok(r.paid >= 0n && r.leftover >= 0n);
      assert.ok(r.perUser * BigInt(n) === r.paid);
    }
  }
});

test("rejects invalid participant counts", () => {
  assert.throws(() => calculateRegular(-1), RangeError);
  assert.throws(() => calculateRegular(1.5), RangeError);
  assert.throws(() => calculateRegular(Number.NaN), RangeError);
});
