import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateSession, sac, TASK_POOL, type Transfer, type Units } from "../src/index.js";

const ids = (n: number, prefix = "u") => Array.from({ length: n }, (_, i) => `${prefix}${String(i).padStart(7, "0")}`);
const out = (t: Transfer[], pool: string): Units => t.filter((x) => x.from === pool).reduce((s, x) => s + x.units, 0n);

test("early phase: 100 users, 100 referral users; leftovers go to the Task Pool", () => {
  const r = calculateSession({ regularUserIds: ids(100), referralUserIds: ids(100) });
  assert.equal(out(r.transfers, "REGULAR_POOL"), sac(6000));
  assert.equal(out(r.transfers, "REFERRAL_POOL"), sac(2000));
  const toTask = r.transfers.filter((t) => t.to === TASK_POOL).reduce((s, t) => s + t.units, 0n);
  assert.equal(toTask, sac(5000) + sac(1700));
});

test("every pool is drained by exactly its ceiling (conservation), across sizes", () => {
  for (const n of [0, 1, 3, 599, 600, 601, 1000, 7001]) {
    const r = calculateSession({ regularUserIds: ids(n), referralUserIds: ids(Math.min(n, 700), "r") });
    assert.equal(out(r.transfers, "REGULAR_POOL"), sac(6000), `regular n=${n}`);
    assert.equal(out(r.transfers, "REFERRAL_POOL"), sac(2000), `referral n=${n}`);
    assert.ok(r.transfers.every((t) => t.units > 0n));
  }
});

test("deterministic: input order does not change the result", () => {
  const a = calculateSession({ regularUserIds: ["b", "a", "c"], referralUserIds: [] });
  const b = calculateSession({ regularUserIds: ["c", "b", "a"], referralUserIds: [] });
  assert.deepEqual(a, b);
});

test("duplicate user ids are rejected", () => {
  assert.throws(() => calculateSession({ regularUserIds: ["a", "a"], referralUserIds: [] }));
  assert.throws(() => calculateSession({ regularUserIds: [], referralUserIds: ["a", "a"] }));
});

test("no participants: the whole 8,000 SAC moves to the Task Pool", () => {
  const r = calculateSession({ regularUserIds: [], referralUserIds: [] });
  assert.equal(r.transfers.length, 2);
  assert.equal(r.transfers.reduce((s, t) => s + t.units, 0n), sac(8000));
});
