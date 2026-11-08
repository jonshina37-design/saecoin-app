import { test } from "node:test";
import assert from "node:assert/strict";
import { closeSession, Ledger, sac, TASK_POOL, TOTAL_SUPPLY_UNITS, userAccount } from "../src/index.js";

const ids = (n: number) => Array.from({ length: n }, (_, i) => `u${i}`);

test("genesis: four accounts, total exactly 31,000,000 SAC", () => {
  const l = Ledger.genesis();
  assert.equal(l.total(), TOTAL_SUPPLY_UNITS);
  assert.equal(l.balance("FOUNDER"), sac(12_000_000));
  assert.equal(l.balance("TASK_POOL"), sac(1_720_000));
});

test("one session with 100 users moves coins and keeps the total", () => {
  const { ledger } = closeSession(Ledger.genesis(), { regularUserIds: ids(100), referralUserIds: ids(100) });
  assert.equal(ledger.total(), TOTAL_SUPPLY_UNITS);
  assert.equal(ledger.balance(userAccount("u0")), sac(13)); // 10 regular + 3 referral
  assert.equal(ledger.balance(TASK_POOL), sac(1_720_000) + sac(5000) + sac(1700));
  assert.equal(ledger.balance("REGULAR_POOL"), sac(12_960_000 - 6000));
});

test("all 2,160 sessions: both pools end at exactly zero and the total never changes", () => {
  let l = Ledger.genesis();
  for (let s = 1; s <= 2160; s++) {
    // user count grows over time: 50 up to 5,000
    const n = 50 + Math.floor((s / 2160) * 4950);
    l = closeSession(l, { regularUserIds: ids(n), referralUserIds: ids(Math.floor(n / 2)) }).ledger;
  }
  assert.equal(l.balance("REGULAR_POOL"), 0n);
  assert.equal(l.balance("REFERRAL_POOL"), 0n);
  assert.equal(l.total(), TOTAL_SUPPLY_UNITS);
  assert.equal(l.balance("FOUNDER"), sac(12_000_000));
});

test("session 2,161 fails: the pools are empty and nothing changes", () => {
  let l = Ledger.genesis();
  for (let s = 1; s <= 2160; s++) l = closeSession(l, { regularUserIds: ids(10), referralUserIds: [] }).ledger;
  const before = l.accounts();
  assert.throws(() => closeSession(l, { regularUserIds: ids(10), referralUserIds: [] }), /insufficient funds/);
  assert.deepEqual(l.accounts(), before);
});

test("atomic: a failing transfer in the middle leaves the ledger untouched", () => {
  const l = Ledger.genesis();
  const before = l.accounts();
  assert.throws(() =>
    l.apply([
      { type: "TASK_REWARD" as never, from: "TASK_POOL", to: "USER:a", units: sac(10) },
      { type: "TASK_REWARD" as never, from: "TASK_POOL", to: "USER:b", units: sac(2_000_000) }, // more than the pool holds
    ]),
  /insufficient funds/);
  assert.deepEqual(l.accounts(), before);
});

test("rejects zero, negative and self transfers and unknown source accounts", () => {
  const l = Ledger.genesis();
  const t = (from: string, to: string, units: bigint) => [{ type: "SESSION_LEFTOVER" as const, from, to, units }];
  assert.throws(() => l.apply(t("TASK_POOL", "USER:a", 0n)), RangeError);
  assert.throws(() => l.apply(t("TASK_POOL", "USER:a", -1n)), RangeError);
  assert.throws(() => l.apply(t("TASK_POOL", "TASK_POOL", 1n)), /same account/);
  assert.throws(() => l.apply(t("USER:ghost", "TASK_POOL", 1n)), /unknown source/);
});
