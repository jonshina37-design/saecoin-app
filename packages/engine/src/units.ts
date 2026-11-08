/** SAC amounts are bigint integers in units of 10^-8 SAC (spec D-06). Never use floats. */
export type Units = bigint;

export const UNITS_PER_SAC: Units = 100_000_000n;
export const TOTAL_SUPPLY_UNITS: Units = 31_000_000n * UNITS_PER_SAC;

/** Whole SAC to units. Only accepts integers. */
export function sac(whole: number | bigint): Units {
  if (typeof whole === "number" && !Number.isSafeInteger(whole)) {
    throw new RangeError(`sac() needs a safe integer, got ${whole}`);
  }
  return BigInt(whole) * UNITS_PER_SAC;
}

/** Units to a decimal string such as "0.08571428", for display and tests only. */
export function formatUnits(units: Units): string {
  const negative = units < 0n;
  const abs = negative ? -units : units;
  const whole = abs / UNITS_PER_SAC;
  const frac = (abs % UNITS_PER_SAC).toString().padStart(8, "0");
  return `${negative ? "-" : ""}${whole}.${frac}`;
}
